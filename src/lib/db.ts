import pg from "pg";
const { Pool } = pg;

// Singleton pool for server-side endpoints
let pool: pg.Pool | null = null;

export function getDbPool(): pg.Pool | null {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

// SQL query helper compatible with tagged template literals or client execution
export function getDb() {
  const p = getDbPool();
  if (!p) return null;

  // Tagged template literal helper: sql`SELECT ... ${var}`
  return async function sql(strings: TemplateStringsArray, ...values: any[]) {
    let queryText = "";
    for (let i = 0; i < strings.length; i++) {
      queryText += strings[i];
      if (i < values.length) {
        queryText += `$${i + 1}`;
      }
    }
    const result = await p.query(queryText, values);
    return result.rows;
  };
}
