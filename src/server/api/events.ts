import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getDb } from "@/lib/db";

// API handler for /api/events
export const Route = createAPIFileRoute("/api/events")({
  GET: async () => {
    const sql = getDb();
    if (!sql) {
      return json({ error: "Database not configured" }, { status: 500 });
    }

    try {
      const rows = await sql`
        SELECT * FROM events 
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
      const id = body.id || `ev-${Date.now()}`;
      const topics = Array.isArray(body.topics) ? body.topics : [];

      const result = await sql`
        INSERT INTO events (
          id, title, date, time, location, speaker, category, 
          capacity, registered, status, is_upcoming, seats, "desc", topics
        ) VALUES (
          ${id},
          ${body.title},
          ${body.date || "TBD"},
          ${body.time || "10:00 AM – 04:00 PM IST"},
          ${body.location || "GSFC University Campus"},
          ${body.speaker || "GUIITAR Faculty & Experts"},
          ${body.category || "Workshop"},
          ${Number(body.capacity) || 50},
          ${Number(body.registered) || 0},
          ${body.status || "Registration Open"},
          ${body.isUpcoming !== undefined ? body.isUpcoming : true},
          ${body.seats || "50 Seats Available"},
          ${body.desc || ""},
          ${topics}
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

      return json(result[0]);
    } catch (err: any) {
      return json({ error: err.message }, { status: 500 });
    }
  },
});

