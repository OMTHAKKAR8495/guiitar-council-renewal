import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getDb } from "@/lib/db";

// GET & POST /api/ideas
export const Route = createAPIFileRoute("/api/ideas")({
  GET: async () => {
    const sql = getDb();
    if (!sql) {
      return json({ error: "Database not configured" }, { status: 500 });
    }

    try {
      const rows = await sql`
        SELECT * FROM ideas 
        ORDER BY created_at DESC;
      `;
      return json(rows);
    } catch (err: any) {
      return json({ error: err.message }, { status: 500 });
    }
  },
  POST: async ({ request }: { request: Request }) => {
    const sql = getDb();
    if (!sql) {
      return json({ error: "Database not configured" }, { status: 500 });
    }

    try {
      const body = await request.json();
      const id = body.id || `idea-${Date.now()}`;
      const team = Array.isArray(body.teamMembers || body.team_members)
        ? (body.teamMembers || body.team_members)
        : [];

      const result = await sql`
        INSERT INTO ideas (
          id, ref_id, slug, title, innovator, team_members, email, phone, stage, 
          category, sector, "desc", problem_statement, solution_desc, novelty, 
          patent_status, funding_required, trl_level, status, views
        ) VALUES (
          ${id},
          ${body.refId || body.ref_id || `GUI-IDEA-${Date.now()}`},
          ${body.slug || `idea-${Date.now()}`},
          ${body.title},
          ${body.innovator || body.name || "Innovator"},
          ${team},
          ${body.email || ""},
          ${body.phone || ""},
          ${body.stage || "Ideation"},
          ${body.category || "DeepTech"},
          ${body.sector || "Engineering"},
          ${body.desc || body.description || ""},
          ${body.problemStatement || body.problem_statement || ""},
          ${body.solutionDesc || body.solution_desc || ""},
          ${body.novelty || ""},
          ${body.patentStatus || body.patent_status || "Not Filed"},
          ${body.fundingRequired || body.funding_required || "₹2.5 Lakhs"},
          ${body.trlLevel || body.trl_level || "TRL-3"},
          ${body.status || "Published"},
          ${Number(body.views) || 0}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          innovator = EXCLUDED.innovator,
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
          updated_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      return json(result[0]);
    } catch (err: any) {
      return json({ error: err.message }, { status: 500 });
    }
  },
});

