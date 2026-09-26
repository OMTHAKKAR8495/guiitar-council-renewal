import { neon } from "@neondatabase/serverless";
import type { EventItem, IdeaItem, StartupItem, ApplicationItem, MentorItem } from "./adminStore";

export const NEON_CONNECTION_STRING =
  "postgresql://neondb_owner:npg_kLqQz3DsX1rc@ep-twilight-brook-b4c0f74u-pooler.c-6.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

function getConnectionString(): string {
  try {
    if (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_DATABASE_URL) {
      return (import.meta as any).env.VITE_DATABASE_URL;
    }
  } catch {}
  try {
    if (typeof process !== "undefined" && process.env?.DATABASE_URL) {
      return process.env.DATABASE_URL;
    }
  } catch {}
  return NEON_CONNECTION_STRING;
}

function getSql() {
  try {
    const url = getConnectionString();
    return neon(url);
  } catch (err) {
    console.error("Failed to initialize Neon SQL client:", err);
    return null;
  }
}

/**
 * Neon Postgres Client-side & Server-side Database Service
 */
export const NeonClient = {
  // 1. Events
  async getEvents(): Promise<EventItem[] | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const rows = await sql`
        SELECT * FROM events 
        ORDER BY created_at DESC;
      `;
      return rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        date: r.date,
        time: r.time,
        location: r.location,
        speaker: r.speaker,
        category: r.category,
        capacity: Number(r.capacity),
        registered: Number(r.registered),
        status: r.status,
        isUpcoming: Boolean(r.is_upcoming),
        seats: r.seats,
        desc: r.desc,
        topics: Array.isArray(r.topics) ? r.topics : [],
      }));
    } catch (err) {
      console.warn("Neon getEvents error, falling back to local store:", err);
      return null;
    }
  },

  async saveEvent(event: Partial<EventItem> & { title: string }): Promise<EventItem | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const id = event.id || `ev-${Date.now()}`;
      const topics = Array.isArray(event.topics) ? event.topics : [];
      const capacity = Number(event.capacity) || 50;
      const registered = Number(event.registered) || 0;
      const isUpcoming =
        event.isUpcoming !== undefined
          ? event.isUpcoming
          : event.status === "Registration Open" || event.status === "Upcoming";

      const rows = await sql`
        INSERT INTO events (
          id, title, date, time, location, speaker, category,
          capacity, registered, status, is_upcoming, seats, "desc", topics, updated_at
        ) VALUES (
          ${id},
          ${event.title},
          ${event.date || "TBD"},
          ${event.time || "10:00 AM – 04:00 PM IST"},
          ${event.location || "GSFC University Campus"},
          ${event.speaker || "GUIITAR Faculty & Experts"},
          ${event.category || "Workshop"},
          ${capacity},
          ${registered},
          ${event.status || "Registration Open"},
          ${isUpcoming},
          ${event.seats || `${Math.max(0, capacity - registered)} Seats Available`},
          ${event.desc || ""},
          ${topics},
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          date = EXCLUDED.date,
          time = EXCLUDED.time,
          location = EXCLUDED.location,
          speaker = EXCLUDED.speaker,
          category = EXCLUDED.category,
          capacity = EXCLUDED.capacity,
          registered = EXCLUDED.registered,
          status = EXCLUDED.status,
          is_upcoming = EXCLUDED.is_upcoming,
          seats = EXCLUDED.seats,
          "desc" = EXCLUDED."desc",
          topics = EXCLUDED.topics,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          title: r.title,
          date: r.date,
          time: r.time,
          location: r.location,
          speaker: r.speaker,
          category: r.category,
          capacity: Number(r.capacity),
          registered: Number(r.registered),
          status: r.status,
          isUpcoming: Boolean(r.is_upcoming),
          seats: r.seats,
          desc: r.desc,
          topics: Array.isArray(r.topics) ? r.topics : [],
        };
      }
      return null;
    } catch (err) {
      console.error("Neon saveEvent error:", err);
      return null;
    }
  },

  async deleteEvent(id: string): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;
    try {
      await sql`DELETE FROM events WHERE id = ${id};`;
      return true;
    } catch (err) {
      console.error("Neon deleteEvent error:", err);
      return false;
    }
  },

  // 2. Ideas
  async getIdeas(): Promise<IdeaItem[] | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const rows = await sql`
        SELECT * FROM ideas 
        ORDER BY created_at DESC;
      `;
      return rows.map((r: any) => ({
        id: r.id,
        refId: r.ref_id,
        slug: r.slug,
        title: r.title,
        innovator: r.innovator,
        teamMembers: Array.isArray(r.team_members) ? r.team_members : [],
        email: r.email,
        phone: r.phone || "",
        stage: r.stage,
        category: r.category,
        sector: r.sector,
        desc: r.desc,
        problemStatement: r.problem_statement || "",
        solutionDesc: r.solution_desc || "",
        novelty: r.novelty || "",
        patentStatus: r.patent_status || "Not Filed",
        fundingRequired: r.funding_required || "₹2.5 Lakhs",
        trlLevel: r.trl_level || "TRL-3",
        status: r.status,
        submittedAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        pitchDeckUrl: r.pitch_deck_url,
        views: Number(r.views) || 0,
      }));
    } catch (err) {
      console.warn("Neon getIdeas error:", err);
      return null;
    }
  },

  async saveIdea(idea: Partial<IdeaItem> & { title: string; innovator: string; desc: string }): Promise<IdeaItem | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const id = idea.id || `idea-${Date.now()}`;
      const refId = idea.refId || `GIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const slug = idea.slug || idea.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const teamMembers = Array.isArray(idea.teamMembers) ? idea.teamMembers : [];

      const rows = await sql`
        INSERT INTO ideas (
          id, ref_id, slug, title, innovator, team_members, email, phone,
          stage, category, sector, "desc", problem_statement, solution_desc,
          novelty, patent_status, funding_required, trl_level, status, pitch_deck_url, views, updated_at
        ) VALUES (
          ${id},
          ${refId},
          ${slug},
          ${idea.title},
          ${idea.innovator},
          ${teamMembers},
          ${idea.email || "innovator@gsfcuniversity.ac.in"},
          ${idea.phone || ""},
          ${idea.stage || "Ideation"},
          ${idea.category || "DeepTech"},
          ${idea.sector || "Engineering"},
          ${idea.desc},
          ${idea.problemStatement || ""},
          ${idea.solutionDesc || ""},
          ${idea.novelty || ""},
          ${idea.patentStatus || "Not Filed"},
          ${idea.fundingRequired || "₹2.5 Lakhs"},
          ${idea.trlLevel || "TRL-3"},
          ${idea.status || "Published"},
          ${idea.pitchDeckUrl || ""},
          ${idea.views || 0},
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          innovator = EXCLUDED.innovator,
          team_members = EXCLUDED.team_members,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          stage = EXCLUDED.stage,
          category = EXCLUDED.category,
          sector = EXCLUDED.sector,
          "desc" = EXCLUDED."desc",
          problem_statement = EXCLUDED.problem_statement,
          solution_desc = EXCLUDED.solution_desc,
          novelty = EXCLUDED.novelty,
          patent_status = EXCLUDED.patent_status,
          funding_required = EXCLUDED.funding_required,
          trl_level = EXCLUDED.trl_level,
          status = EXCLUDED.status,
          pitch_deck_url = EXCLUDED.pitch_deck_url,
          views = EXCLUDED.views,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          refId: r.ref_id,
          slug: r.slug,
          title: r.title,
          innovator: r.innovator,
          teamMembers: Array.isArray(r.team_members) ? r.team_members : [],
          email: r.email,
          phone: r.phone || "",
          stage: r.stage,
          category: r.category,
          sector: r.sector,
          desc: r.desc,
          problemStatement: r.problem_statement || "",
          solutionDesc: r.solution_desc || "",
          novelty: r.novelty || "",
          patentStatus: r.patent_status || "Not Filed",
          fundingRequired: r.funding_required || "₹2.5 Lakhs",
          trlLevel: r.trl_level || "TRL-3",
          status: r.status,
          submittedAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
          pitchDeckUrl: r.pitch_deck_url,
          views: Number(r.views) || 0,
        };
      }
      return null;
    } catch (err) {
      console.error("Neon saveIdea error:", err);
      return null;
    }
  },

  async deleteIdea(id: string): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;
    try {
      await sql`DELETE FROM ideas WHERE id = ${id};`;
      return true;
    } catch (err) {
      console.error("Neon deleteIdea error:", err);
      return false;
    }
  },

  // 3. Startups
  async getStartups(): Promise<StartupItem[] | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const rows = await sql`
        SELECT * FROM startups 
        ORDER BY created_at DESC;
      `;
      return rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        founders: Array.isArray(r.founders) ? r.founders : [],
        domain: r.domain,
        batch: r.batch,
        fundingRaised: r.funding_raised,
        description: r.description,
        websiteUrl: r.website_url,
        logoUrl: r.logo_url,
        status: r.status,
        patents: Number(r.patents) || 0,
        valuation: r.valuation,
        tags: Array.isArray(r.tags) ? r.tags : [],
      }));
    } catch (err) {
      console.warn("Neon getStartups error:", err);
      return null;
    }
  },

  async saveStartup(startup: Partial<StartupItem> & { name: string; domain: string }): Promise<StartupItem | null> {
    const sql = getSql();
    if (!sql) return null;
    try {
      const id = startup.id || `st-${Date.now()}`;
      const founders = Array.isArray(startup.founders) ? startup.founders : [];
      const tags = Array.isArray(startup.tags) ? startup.tags : [];

      const rows = await sql`
        INSERT INTO startups (
          id, name, founders, domain, batch, funding_raised,
          description, website_url, logo_url, status, patents, valuation, tags
        ) VALUES (
          ${id},
          ${startup.name},
          ${founders},
          ${startup.domain},
          ${startup.batch || "Cohort 2026"},
          ${startup.fundingRaised || "Bootstrapped"},
          ${startup.description || ""},
          ${startup.websiteUrl || ""},
          ${startup.logoUrl || ""},
          ${startup.status || "Incubated"},
          ${Number(startup.patents) || 0},
          ${startup.valuation || "Pre-Seed"},
          ${tags}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          founders = EXCLUDED.founders,
          domain = EXCLUDED.domain,
          batch = EXCLUDED.batch,
          funding_raised = EXCLUDED.funding_raised,
          description = EXCLUDED.description,
          website_url = EXCLUDED.website_url,
          logo_url = EXCLUDED.logo_url,
          status = EXCLUDED.status,
          patents = EXCLUDED.patents,
          valuation = EXCLUDED.valuation,
          tags = EXCLUDED.tags
        RETURNING *;
      `;

      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          name: r.name,
          founders: Array.isArray(r.founders) ? r.founders : [],
          domain: r.domain,
          batch: r.batch,
          fundingRaised: r.funding_raised,
          description: r.description,
          websiteUrl: r.website_url,
          logoUrl: r.logo_url,
          status: r.status,
          patents: Number(r.patents) || 0,
          valuation: r.valuation,
          tags: Array.isArray(r.tags) ? r.tags : [],
        };
      }
      return null;
    } catch (err) {
      console.error("Neon saveStartup error:", err);
      return null;
    }
  },

  async deleteStartup(id: string): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;
    try {
      await sql`DELETE FROM startups WHERE id = ${id};`;
      return true;
    } catch (err) {
      console.error("Neon deleteStartup error:", err);
      return false;
    }
  },
};
