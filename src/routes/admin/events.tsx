import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Plus,
  Search,
  MapPin,
  Users,
  Clock,
  Trash2,
  Edit2,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type EventItem } from "@/lib/adminStore";

function toISODateString(str: string): string {
  if (!str) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const parsed = Date.parse(str);
  if (isNaN(parsed)) return "";
  const d = new Date(parsed);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatReadableDate(isoStr: string): string {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split("-").map(Number);
  if (!y || !m || !d) return isoStr;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const Route = createFileRoute("/admin/events")({
  component: AdminEventsPage,
});

export function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(() =>
    typeof window !== "undefined" ? AdminDataStore.getEvents() : [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadEvents = () => {
    const list = AdminDataStore.getEvents();
    setEvents([...list]);
  };

  useEffect(() => {
    loadEvents();
    const handleUpdate = () => loadEvents();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const defaultForm = {
    title: "",
    date: "",
    time: "10:00 AM – 01:00 PM",
    location: "GSFC University Campus",
    speaker: "",
    category: "Workshop",
    capacity: 50,
    registered: 0,
    status: "Registration Open" as EventItem["status"],
    desc: "",
    topics: "",
  };

  const [formData, setFormData] = useState(defaultForm);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const filteredEvents = events.filter((e) =>
    `${e.title} ${e.speaker} ${e.location} ${e.category} ${e.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (ev: EventItem) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      speaker: ev.speaker,
      category: ev.category,
      capacity: ev.capacity,
      registered: ev.registered,
      status: ev.status,
      desc: ev.desc || "",
      topics: ev.topics ? ev.topics.join(", ") : "",
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const topicsArray = formData.topics
      ? formData.topics.split(",").map((t) => t.trim()).filter(Boolean)
      : undefined;

    const eventPayload: Partial<EventItem> & { title: string } = {
      id: editingId || undefined,
      title: formData.title,
      date: formData.date || "TBD",
      time: formData.time,
      location: formData.location || "GSFC University Campus",
      speaker: formData.speaker || "GUIITAR Faculty & Experts",
      category: formData.category || "Workshop",
      capacity: Number(formData.capacity) || 50,
      registered: Number(formData.registered) || 0,
      status: formData.status,
      desc: formData.desc,
      topics: topicsArray,
      seats: `${(Number(formData.capacity) || 50) - (Number(formData.registered) || 0)} Seats Available`,
      isUpcoming: formData.status === "Registration Open" || formData.status === "Upcoming",
    };

    AdminDataStore.saveEvent(eventPayload);
    loadEvents();

    const titleSaved = formData.title;
    setModalOpen(false);
    setEditingId(null);
    setFormData(defaultForm);

    setToast(editingId ? `Updated event "${titleSaved}"` : `Published event "${titleSaved}"`);
    setTimeout(() => setToast(null), 3500);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      AdminDataStore.deleteEvent(id);
      loadEvents();
      setToast(`Deleted event "${title}"`);
      setTimeout(() => setToast(null), 3500);
    }
  };

  return (
    <AdminLayout
      title="Event & Workshop Management"
      subtitle="Organize, publish, and monitor hands-on bootcamps, workshops, and startup pitching sessions."
      actions={
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      }
    >
      {toast && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "12px 18px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.12)",
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      <div
        className="plain-card"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(226, 232, 240, 0.85)",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div style={{ position: "relative", width: "min(340px, 100%)" }}>
            <Search
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, speakers, venues..."
              style={{
                width: "100%",
                padding: "9px 12px 9px 36px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                boxSizing: "border-box",
                background: "rgba(255, 255, 255, 0.9)",
              }}
            />
          </div>

          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Total Events: <strong>{events.length}</strong> active & scheduled
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Details</th>
                <th>Schedule</th>
                <th>Venue / Lead</th>
                <th>Registrations</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
                    No events matching your search query. Click "+ Create Event" to schedule one.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((ev) => (
                  <tr key={ev.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            background: "rgba(37, 99, 235, 0.1)",
                            color: "#2563eb",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <strong style={{ color: "#0f172a", fontSize: "14px", display: "block", marginBottom: "2px" }}>
                            {ev.title}
                          </strong>
                          <span
                            style={{
                              background: "#f1f5f9",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "11.5px",
                              color: "#475569",
                              fontWeight: 700,
                            }}
                          >
                            {ev.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "13px" }}>
                        <strong style={{ color: "#0f172a", display: "block" }}>{ev.date}</strong>
                        <span style={{ color: "#64748b", fontSize: "12px" }}>{ev.time}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "13px" }}>
                        <span style={{ color: "#0f172a", fontWeight: 600, display: "block" }}>
                          {ev.location}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "12px" }}>
                          Speaker: {ev.speaker}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "13px" }}>
                        <strong style={{ color: "#2563eb" }}>{ev.registered}</strong> / {ev.capacity} Seats
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 700,
                          background:
                            ev.status === "Registration Open"
                              ? "#ecfdf5"
                              : ev.status === "Completed"
                                ? "#f1f5f9"
                                : "#eff6ff",
                          color:
                            ev.status === "Registration Open"
                              ? "#065f46"
                              : ev.status === "Completed"
                                ? "#64748b"
                                : "#1e40af",
                        }}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "6px 10px", color: "#2563eb", borderColor: "#bfdbfe" }}
                          title="Edit Event"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ev.id, ev.title)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT EVENT MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "28px",
              maxWidth: "560px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 18px" }}>
              {editingId ? "Edit Event Details" : "Publish New Event or Workshop"}
            </h3>

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., DeepTech Acceleration Bootcamp 2026"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div className="form-row-2" style={{ gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--foreground, #0f172a)",
                      marginBottom: "6px",
                    }}
                  >
                    Event Date *
                  </label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g., November 28, 2026"
                      style={{
                        width: "100%",
                        padding: "10px 42px 10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border, #cbd5e1)",
                        background: "var(--card, #ffffff)",
                        color: "var(--foreground, #0f172a)",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                    <button
                      type="button"
                      title="Select date from calendar"
                      onClick={() => {
                        if (datePickerRef.current) {
                          if (typeof datePickerRef.current.showPicker === "function") {
                            datePickerRef.current.showPicker();
                          } else {
                            datePickerRef.current.focus();
                          }
                        }
                      }}
                      style={{
                        position: "absolute",
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--primary, #2563eb)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <input
                      type="date"
                      ref={datePickerRef}
                      value={toISODateString(formData.date)}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData({ ...formData, date: formatReadableDate(e.target.value) });
                        }
                      }}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: 0,
                        width: "20px",
                        height: "20px",
                        pointerEvents: "none",
                      }}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--foreground, #0f172a)",
                      marginBottom: "6px",
                    }}
                  >
                    Time Schedule
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 10:00 AM – 04:00 PM IST"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border, #cbd5e1)",
                      background: "var(--card, #ffffff)",
                      color: "var(--foreground, #0f172a)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div className="form-row-2" style={{ gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--foreground, #0f172a)",
                      marginBottom: "6px",
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Workshop, Hackathon, Masterclass"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border, #cbd5e1)",
                      background: "var(--card, #ffffff)",
                      color: "var(--foreground, #0f172a)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--foreground, #0f172a)",
                      marginBottom: "6px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as EventItem["status"] })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border, #cbd5e1)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      background: "var(--card, #ffffff)",
                      color: "var(--foreground, #0f172a)",
                    }}
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Registration Closed">Registration Closed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2" style={{ gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--foreground, #0f172a)",
                      marginBottom: "6px",
                    }}
                  >
                    Venue / Room Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Anviksha Hub / Drone Lab"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border, #cbd5e1)",
                      background: "var(--card, #ffffff)",
                      color: "var(--foreground, #0f172a)",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    Capacity (Seats)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Speaker / Keynote Lead
                </label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  placeholder="e.g., Prof. G. R. Sinha & Industrial Drone Pilots"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Key Highlights / Topics (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  placeholder="Hands-on prototyping, SLURM batch jobs, DGCA rules"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingId(null);
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingId ? "Save Changes" : "Publish Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

