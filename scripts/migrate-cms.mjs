import fs from "fs";
import path from "path";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
const { Client } = pg;

let dbUrl = process.env.DATABASE_URL;
let supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  if (!dbUrl) {
    const m = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (m) dbUrl = m[1];
  }
  if (!supabaseUrl) {
    const m = envContent.match(/VITE_SUPABASE_URL=["']?([^"'\r\n]+)/) || envContent.match(/SUPABASE_URL=["']?([^"'\r\n]+)/);
    if (m) supabaseUrl = m[1];
  }
  if (!serviceRoleKey) {
    const m = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=["']?([^"'\r\n]+)/);
    if (m) serviceRoleKey = m[1];
  }
} catch {}

if (!dbUrl) {
  console.error("Error: DATABASE_URL not found in environment or .env.local");
  process.exit(1);
}

async function run() {
  console.log("=== Running CMS Database & Security Migration ===");

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const sqlFilePath = path.resolve(process.cwd(), "supabase/migrations/20261017000000_cms_schema.sql");
  const sql = fs.readFileSync(sqlFilePath, "utf8");

  console.log("Applying schema DDL & RLS policies...");
  await client.query(sql);
  console.log("✓ CMS Schema & RLS policies successfully applied.");

  await client.end();

  // Storage bucket check via Supabase client
  if (supabaseUrl && serviceRoleKey) {
    console.log("Ensuring 'site-media' storage bucket exists via Supabase API...");
    try {
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      if (!listError) {
        const found = buckets?.some((b) => b.name === "site-media");
        if (!found) {
          const { error: createError } = await supabase.storage.createBucket("site-media", {
            public: true,
            fileSizeLimit: 10485760, // 10MB
          });
          if (createError) {
            console.warn("Storage bucket create notice:", createError.message);
          } else {
            console.log("✓ 'site-media' public storage bucket created.");
          }
        } else {
          console.log("✓ 'site-media' bucket already exists.");
        }
      }
    } catch (err) {
      console.warn("Storage API notice:", err.message);
    }
  }

  console.log("=== Migration completed successfully ===");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
