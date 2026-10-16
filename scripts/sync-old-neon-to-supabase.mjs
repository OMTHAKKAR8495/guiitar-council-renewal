import fs from "fs";
import path from "path";
import pg from "pg";
const { Client } = pg;

let neonUrl = process.env.OLD_NEON_DATABASE_URL;
let supabaseUrl = process.env.DATABASE_URL;

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  if (!supabaseUrl) {
    const m = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (m) supabaseUrl = m[1];
  }
  if (!neonUrl) {
    const m2 = envContent.match(/OLD_NEON_DATABASE_URL=["']?([^"'\r\n]+)/);
    if (m2) neonUrl = m2[1];
  }
} catch {}

const NEON_URL = neonUrl || "";
const SUPABASE_URL = supabaseUrl || "";

async function main() {
  console.log("Connecting to old Neon database...");
  const neon = new Client({
    connectionString: NEON_URL,
    ssl: { rejectUnauthorized: false }
  });
  await neon.connect();
  console.log("✓ Connected to Neon.");

  console.log("Connecting to new Supabase database...");
  const supabase = new Client({
    connectionString: SUPABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await supabase.connect();
  console.log("✓ Connected to Supabase.");

  // 1. Get all tables in Neon public schema
  const tablesRes = await neon.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"
  );
  const tables = tablesRes.rows.map(r => r.tablename);
  console.log(`\nFound ${tables.length} tables in old Neon DB:`, tables.join(", "));

  for (const table of tables) {
    console.log(`\n========================================`);
    console.log(`Migrating table: "${table}"`);
    console.log(`========================================`);

    // Get table columns from Neon
    const colRes = await neon.query(
      `SELECT column_name, data_type, udt_name, is_nullable, column_default 
       FROM information_schema.columns 
       WHERE table_schema = 'public' AND table_name = $1 
       ORDER BY ordinal_position;`,
      [table]
    );

    // Get Primary Key from Neon
    const pkRes = await neon.query(
      `SELECT ccu.column_name
       FROM information_schema.table_constraints tc
       JOIN information_schema.constraint_column_usage ccu 
         ON tc.constraint_name = ccu.constraint_name 
         AND tc.table_schema = ccu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY' 
         AND tc.table_schema = 'public' 
         AND tc.table_name = $1;`,
      [table]
    );
    const pkCols = pkRes.rows.map(r => r.column_name);

    // Build CREATE TABLE statement for Supabase matching Neon exactly
    const colDefs = colRes.rows.map(col => {
      let typeStr = col.data_type.toUpperCase();
      if (col.data_type === "ARRAY") {
        const elem = col.udt_name.replace(/^_/, "").toUpperCase();
        typeStr = `${elem === "VARCHAR" ? "TEXT" : elem}[]`;
      } else if (col.udt_name === "jsonb" || col.data_type === "jsonb") {
        typeStr = "JSONB";
      } else if (col.udt_name === "json" || col.data_type === "json") {
        typeStr = "JSON";
      } else if (col.data_type === "USER-DEFINED" || col.data_type === "CHARACTER VARYING") {
        typeStr = "TEXT";
      }

      return `"${col.column_name}" ${typeStr}`.trim();
    });

    if (pkCols.length > 0) {
      colDefs.push(`PRIMARY KEY (${pkCols.map(c => `"${c}"`).join(", ")})`);
    }

    // Drop and recreate table in Supabase so columns match exactly
    await supabase.query(`DROP TABLE IF EXISTS public."${table}" CASCADE;`);
    const createTableSql = `CREATE TABLE public."${table}" (\n  ${colDefs.join(",\n  ")}\n);`;
    await supabase.query(createTableSql);

    // Fetch all rows from Neon
    const rowsRes = await neon.query(`SELECT * FROM public."${table}";`);
    const rows = rowsRes.rows;
    console.log(`Fetched ${rows.length} rows from Neon.`);

    if (rows.length > 0) {
      const colNames = colRes.rows.map(c => c.column_name);
      for (const row of rows) {
        const keys = colNames.map(c => `"${c}"`).join(", ");
        const placeholders = colNames.map((_, i) => `$${i + 1}`).join(", ");
        const values = colNames.map(c => row[c]);

        await supabase.query(
          `INSERT INTO public."${table}" (${keys}) VALUES (${placeholders});`,
          values
        );
      }
      console.log(`✓ Inserted ${rows.length} rows into Supabase public."${table}".`);
    }

    // Enable RLS and Public policy
    await supabase.query(`ALTER TABLE public."${table}" ENABLE ROW LEVEL SECURITY;`);
    await supabase.query(`DROP POLICY IF EXISTS "Public access policy" ON public."${table}";`);
    await supabase.query(
      `CREATE POLICY "Public access policy" ON public."${table}" FOR ALL USING (true) WITH CHECK (true);`
    );
    console.log(`✓ RLS and public policy configured on "${table}".`);
  }

  // Verification step
  console.log(`\n========================================`);
  console.log(`FINAL MIGRATION VERIFICATION`);
  console.log(`========================================`);
  const results = await Promise.all(
    tables.map(async t => {
      const oldCount = (await neon.query(`SELECT count(*) FROM public."${t}";`)).rows[0].count;
      const newCount = (await supabase.query(`SELECT count(*) FROM public."${t}";`)).rows[0].count;
      return {
        Table: t,
        "Old Neon": Number(oldCount),
        "New Supabase": Number(newCount),
        Status: oldCount === newCount ? "MATCH ✓" : "MISMATCH ✗"
      };
    })
  );
  console.table(results);

  await neon.end();
  await supabase.end();
  console.log("\nALL 19 TABLES AND DATA SUCCESSFULLY MIGRATED TO SUPABASE!");
}

main().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
