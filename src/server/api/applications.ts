import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getDb } from "@/lib/db";

// GET & POST /api/applications
export const Route = createAPIFileRoute("/api/applications")({
  GET: async () => {
    const sql = getDb();
    if (!sql) {
      return json({ error: "Database not configured" }, { status: 500 });
    }

    try {
      const rows = await sql`
        SELECT * FROM applications 
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
      const id = body.id || `app-${Date.now()}`;

      const result = await sql`
        INSERT INTO applications (
          id, project_name, applicant_name, email, phone, track, stage, status, 
          submitted_date, pitch_summary, team_size, notes
        ) VALUES (
          ${id},
          ${body.project_name || body.projectTitle || "New Innovation"},
          ${body.applicant_name || body.applicant || body.fullName || "Applicant"},
          ${body.email || ""},
          ${body.phone || ""},
          ${body.track || body.type || "SSIP 2.0 Grant"},
          ${body.stage || "Ideation"},
          ${body.status || "New"},
          ${body.submitted_date || new Date().toISOString().split("T")[0]},
          ${body.pitch_summary || body.summary || ""},
          ${Number(body.team_size) || 1},
          ${body.notes || body.organization || ""}
        )
        ON CONFLICT (id) DO UPDATE SET
          project_name = EXCLUDED.project_name,
          applicant_name = EXCLUDED.applicant_name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          track = EXCLUDED.track,
          stage = EXCLUDED.stage,
          status = EXCLUDED.status,
          submitted_date = EXCLUDED.submitted_date,
          pitch_summary = EXCLUDED.pitch_summary,
          team_size = EXCLUDED.team_size,
          notes = EXCLUDED.notes
        RETURNING *;
      `;

      return json(result[0]);
    } catch (err: any) {
      return json({ error: err.message }, { status: 500 });
    }
  },
});

