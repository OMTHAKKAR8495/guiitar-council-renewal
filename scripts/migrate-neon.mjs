import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

// Read .env.local if present
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
    const match = envFile.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (match) {
      dbUrl = match[1];
    }
  } catch (e) {
    // Ignore error
  }
}

if (!dbUrl) {
  console.error("ERROR: No DATABASE_URL found in environment or .env.local");
  process.exit(1);
}

console.log("Connecting to Neon Postgres...");
const sql = neon(dbUrl);

async function main() {
  try {
    console.log("Creating tables in Neon database...");

    // 1. Events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT DEFAULT '10:00 AM – 04:00 PM IST',
        location TEXT DEFAULT 'GSFC University Campus',
        speaker TEXT DEFAULT 'GUIITAR Faculty & Experts',
        category TEXT DEFAULT 'Workshop',
        capacity INTEGER DEFAULT 50,
        registered INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Registration Open',
        is_upcoming BOOLEAN DEFAULT TRUE,
        seats TEXT DEFAULT '50 Seats Available',
        "desc" TEXT DEFAULT '',
        topics TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'events' created or verified");

    // 2. Ideas table
    await sql`
      CREATE TABLE IF NOT EXISTS ideas (
        id TEXT PRIMARY KEY,
        ref_id TEXT UNIQUE,
        slug TEXT UNIQUE,
        title TEXT NOT NULL,
        innovator TEXT NOT NULL,
        team_members TEXT[] DEFAULT '{}',
        email TEXT NOT NULL,
        phone TEXT,
        stage TEXT DEFAULT 'Ideation',
        category TEXT DEFAULT 'DeepTech',
        sector TEXT DEFAULT 'Engineering',
        "desc" TEXT NOT NULL,
        problem_statement TEXT,
        solution_desc TEXT,
        novelty TEXT,
        patent_status TEXT DEFAULT 'Not Filed',
        funding_required TEXT DEFAULT '₹2.5 Lakhs',
        trl_level TEXT DEFAULT 'TRL-3',
        status TEXT DEFAULT 'Published',
        pitch_deck_url TEXT,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'ideas' created or verified");

    // 3. Startups table
    await sql`
      CREATE TABLE IF NOT EXISTS startups (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        founders TEXT[] NOT NULL DEFAULT '{}',
        domain TEXT NOT NULL,
        batch TEXT DEFAULT 'Cohort 2026',
        funding_raised TEXT DEFAULT 'Bootstrapped',
        description TEXT,
        website_url TEXT,
        logo_url TEXT,
        status TEXT DEFAULT 'Incubated',
        patents INTEGER DEFAULT 0,
        valuation TEXT DEFAULT 'Pre-Seed',
        tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'startups' created or verified");

    // 4. Applications table
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        project_name TEXT NOT NULL,
        applicant_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        track TEXT DEFAULT 'SSIP 2.0 Grant',
        stage TEXT DEFAULT 'Prototype',
        status TEXT DEFAULT 'New',
        submitted_date TEXT NOT NULL,
        pitch_summary TEXT NOT NULL,
        team_size INTEGER DEFAULT 1,
        notes TEXT DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'applications' created or verified");

    // 5. Mentors table
    await sql`
      CREATE TABLE IF NOT EXISTS mentors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        domain TEXT NOT NULL,
        organization TEXT NOT NULL,
        experience TEXT DEFAULT '5+ Years',
        expertise TEXT[] DEFAULT '{}',
        avatar TEXT,
        email TEXT,
        status TEXT DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'mentors' created or verified");

    // 6. Programs table
    await sql`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT,
        duration TEXT DEFAULT '6 Months',
        grant_support TEXT DEFAULT 'Up to ₹2.5 Lakhs',
        target_cohort TEXT DEFAULT 'Students & Faculty',
        description TEXT,
        features TEXT[] DEFAULT '{}',
        eligibility TEXT[] DEFAULT '{}',
        status TEXT DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'programs' created or verified");

    // 7. Audit logs table
    await sql`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        admin_name TEXT NOT NULL DEFAULT 'Admin',
        action TEXT NOT NULL,
        target_record TEXT NOT NULL,
        record_type TEXT NOT NULL,
        details TEXT DEFAULT '',
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Table 'audit_logs' created or verified");

    console.log("\nAll tables successfully created in your Neon Postgres Database!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
