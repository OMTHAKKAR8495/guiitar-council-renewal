import type { EventItem, IdeaItem, StartupItem, ApplicationItem, MentorItem } from "./adminStore";

/**
 * Neon Client-side API sync wrapper
 */
export const NeonClient = {
  // 1. Events
  async getEvents(): Promise<EventItem[] | null> {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) return null;
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((r: any) => ({
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
          isUpcoming: r.is_upcoming,
          seats: r.seats,
          desc: r.desc,
          topics: r.topics || [],
        }));
      }
      return null;
    } catch {
      return null;
    }
  },

  async saveEvent(event: Partial<EventItem> & { title: string }): Promise<EventItem | null> {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        speaker: data.speaker,
        category: data.category,
        capacity: Number(data.capacity),
        registered: Number(data.registered),
        status: data.status,
        isUpcoming: data.is_upcoming,
        seats: data.seats,
        desc: data.desc,
        topics: data.topics || [],
      };
    } catch {
      return null;
    }
  },
};
