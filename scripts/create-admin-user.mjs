import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import pg from "pg";
const { Client } = pg;

// Read credentials from .env.local or process.env
let supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let dbUrl = process.env.DATABASE_URL;

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  if (!supabaseUrl) {
    const m = envContent.match(/VITE_SUPABASE_URL=["']?([^"'\r\n]+)/) || envContent.match(/SUPABASE_URL=["']?([^"'\r\n]+)/);
    if (m) supabaseUrl = m[1];
  }
  if (!serviceRoleKey) {
    const m = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=["']?([^"'\r\n]+)/);
    if (m) serviceRoleKey = m[1];
  }
  if (!dbUrl) {
    const m = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (m) dbUrl = m[1];
  }
} catch {}

const ADMIN_EMAIL = process.argv[2] || "admin@guiitar.org";
const ADMIN_PASSWORD = process.argv[3] || "guiitar2026";
const ADMIN_NAME = "KiranKumar Parmar";
const ADMIN_ROLE = "Super Admin";

async function main() {
  console.log(`\n--- Provisioning Admin User in Supabase ---`);
  console.log(`Email: ${ADMIN_EMAIL}`);

  if (supabaseUrl && serviceRoleKey) {
    try {
      console.log("Connecting via Supabase Admin Auth API...");
      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Check if user already exists
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      if (!listError && usersData?.users) {
        const existing = usersData.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
        if (existing) {
          console.log(`User already exists (ID: ${existing.id}). Updating password and metadata...`);
          const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
            password: ADMIN_PASSWORD,
            email_confirm: true,
            user_metadata: {
              full_name: ADMIN_NAME,
              role: ADMIN_ROLE,
              department: "Incubation Management",
            },
          });
          if (updateError) {
            console.error("Failed to update user:", updateError);
          } else {
            console.log("Admin user password and profile updated successfully.");
          }
          return;
        }
      }

      // Create new user
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: ADMIN_NAME,
          role: ADMIN_ROLE,
          department: "Incubation Management",
        },
      });

      if (error) {
        console.error("Error creating user via Supabase Auth API:", error.message);
      } else {
        console.log(`Admin user created successfully! ID: ${data.user.id}`);
        return;
      }
    } catch (err) {
      console.warn("Supabase Auth API encountered an issue:", err.message);
    }
  }

  // Fallback: Check if we can connect via direct DB
  if (dbUrl) {
    console.log("Connecting via PostgreSQL direct connection to verify/provision tables...");
    const client = new Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });
    try {
      await client.connect();
      console.log("PostgreSQL connection verified.");
      await client.end();
    } catch (err) {
      console.error("Database connection error:", err.message);
    }
  }
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
