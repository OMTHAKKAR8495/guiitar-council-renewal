import { neon } from "@neondatabase/serverless";

// Helper to get Neon SQL client in SSR / API endpoints
export function getDb() {
  const dbUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!dbUrl) {
    return null;
  }
  return neon(dbUrl);
}
