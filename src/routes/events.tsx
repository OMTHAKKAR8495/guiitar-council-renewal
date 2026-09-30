import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Video,
  ExternalLink,
  X,
  Ticket,
  GraduationCap,
  Mail,
  Phone,
  Building,
  Check,
  Copy,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { AdminDataStore, type EventItem, type RegistrationItem } from "@/lib/adminStore";
import { NeonClient } from "@/lib/neonClient";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Workshops & Events — GUIITAR Council" },
      {
        name: "description",
        content:
          "Join hands-on tech workshops, hackathons, drone masterclasses, and investor demo days hosted by GUIITAR Council, GSFC University.",
      },
      { property: "og:title", content: "Workshops & Events — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Enhance your tech & founder skills and expand your entrepreneurial network in Vadodara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

function Events() {
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>(() =>
    typeof window !== "undefined" ? AdminDataStore.getEvents() : [],
  );

  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<RegistrationItem | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Registration Form State
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentNo: "",
    email: "",
    phone: "",
    department: "Computer Science & Eng",
    semester: "6th Sem",
    notes: "",
  });

  const loadEvents = () => {
    setEventsList(AdminDataStore.getEvents());
  };

  useEffect(() => {
    loadEvents();
    NeonClient.getEvents().then((remoteEvents) => {
      if (remoteEvents && remoteEvents.length > 0) {
        setEventsList(remoteEvents);
        AdminDataStore.setEvents(remoteEvents);
      }
    });
    const handleUpdate = () => loadEvents();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const openRegistrationModal = (event: EventItem) => {
    setSelectedEvent(event);
    setConfirmedTicket(null);
    setFormError(null);
    setCopiedTicket(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setConfirmedTicket(null);
    setFormError(null);
  };

  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!formData.studentName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!formData.enrollmentNo.trim()) {
      setFormError("Please enter your student enrollment / roll number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Please enter your WhatsApp / phone number.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      // 1. Save registration into AdminDataStore + automatically syncs to live Neon DB
      const newReg = AdminDataStore.saveRegistration({
        studentName: formData.studentName.trim(),
        enrollmentNo: formData.enrollmentNo.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        department: formData.department,
        semester: formData.semester,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        notes: formData.notes.trim(),
        status: "Registered",
      });

      // 2. Increment registered count for the event
      const currentEv = eventsList.find((ev) => ev.id === selectedEvent.id);
      if (currentEv) {
        const newRegistered = (Number(currentEv.registered) || 0) + 1;
        const newCapacity = Number(currentEv.capacity) || 100;
        const newAvailable = Math.max(0, newCapacity - newRegistered);
        const updated = AdminDataStore.saveEvent({
          ...currentEv,
          registered: newRegistered,
          capacity: newCapacity,
          seats: `${newAvailable} Seats Available`,
        });
        setEventsList((prev) =>
          prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, ...updated } : ev))
        );
      }

      // 3. Mark as registered locally for immediate feedback
      setRegisteredIds((prev) => [...prev, selectedEvent.id]);
      setConfirmedTicket(newReg);

      // Reset form
      setFormData({
        studentName: "",
        enrollmentNo: "",
        email: "",
        phone: "",
        department: "Computer Science & Eng",
        semester: "6th Sem",
        notes: "",
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      setFormError("Failed to complete registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const allEvents = eventsList.map((e) => {
    const capacity = Number(e.capacity) || 100;
    const registered = Number(e.registered) || 0;
    const available = Math.max(0, capacity - registered);
    return {
      raw: e,
      id: e.id,
      title: e.title,
      date: e.date,
      time: e.time,
      location: e.location,
      category: e.category,
      capacity,
      registered,
      available,
      isUpcoming:
        e.status === "Upcoming" || e.status === "Registration Open" || e.isUpcoming !== false,
      seats: `${available} Seats Available`,
      desc:
        e.desc ||
        `Led by ${e.speaker}. Designed for innovators and technical founders looking to build practical expertise.`,
      topics:
        e.topics && e.topics.length > 0
          ? e.topics
          : [
              "Interactive hands-on methodology",
              "Technical rigging & live benchmarking",
              "Direct Q&A with domain mentors",
              "Certificate of participation from GUIITAR Council",
            ],
    };
  });

  const displayed = allEvents.filter((e) => (tab === "Upcoming" ? e.isUpcoming : !e.isUpcoming));
  const featured = allEvents.find((e) => e.isUpcoming);

  return (
    <>
      <PageHero
        badge="Events & Ecosystem"
        title="Workshops, Hackathons & Masterclasses"
        text="Level up your technical craft, pitch to investors, and build alongside fellow visionaries through GUIITAR Council's curated events."
      />

      {/* FEATURED UPCOMING EVENT */}
      {featured && tab === "Upcoming" && (
        <section style={{ paddingBottom: "0" }}>
          <div className="container">
            <SectionTitle
              badge="Featured Workshop"
              title="Next Flagship Hands-On Workshop"
              subtitle="Limited cohort size with hands-on hardware rigging and personal instructor guidance."
            />

            <article className="featured-event">
              <div className="event-date-box">
                <CalendarDays />
                <b>{featured.date}</b>
                <span>{featured.category}</span>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                  <span className="pill blue" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                    <Users className="w-3.5 h-3.5" />
                    <span><b>{featured.registered}</b> Students Registered</span>
                  </span>
                  <span className={`pill ${featured.available > 10 ? "emerald" : "amber"}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span><b>{featured.available}</b> Seats Available ({featured.capacity} Total)</span>
                  </span>
                </div>

                {/* Live Seats Progress Bar */}
                <div style={{ background: "#f1f5f9", borderRadius: "9999px", height: "8px", width: "100%", maxWidth: "380px", marginBottom: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, Math.max(6, Math.round(((featured.registered || 0) / (featured.capacity || 100)) * 100)))}%`,
                      background: "linear-gradient(90deg, #2563eb, #10b981)",
                      borderRadius: "9999px",
                      transition: "width 0.4s ease-in-out",
                    }}
                  />
                </div>

                <h2>{featured.title}</h2>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "15.5px",
                    lineHeight: "1.6",
                    margin: "10px 0 16px",
                  }}
                >
                  {featured.desc}
                </p>

                <div className="event-meta">
                  <span>
                    <Clock /> {featured.time}
                  </span>
                  <span>
                    <MapPin /> {featured.location}
                  </span>
                  <span>
                    <Users /> <b>{featured.registered}</b> Registered • <b>{featured.available}</b> Seats Available
                  </span>
                </div>

                <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "18px 0 8px" }}>
                  Core Workshop Modules:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "18px", fontSize: "14px", marginBottom: "24px" }}
                >
                  {featured.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                {registeredIds.includes(featured.id) ? (
                  <div className="success-banner">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      You are registered! A confirmation email with workshop venue passes has been
                      issued.
                    </span>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => openRegistrationModal(featured.raw)}
                  >
                    <span>Reserve Your Free Seat Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ALL EVENTS LIST WITH TABS */}
      <section>
        <div className="container">
          <div className="tabs">
            {(["Upcoming", "Past"] as const).map((t) => (
              <button
                key={t}
                className={`tab ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t} Events (
                {allEvents.filter((e) => (t === "Upcoming" ? e.isUpcoming : !e.isUpcoming)).length})
              </button>
            ))}
          </div>

          <div className="grid-2">
            {displayed.map((e) => (
              <article className="plain-card event-card" key={e.id} style={{ padding: "30px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
                >
                  <span className={`pill ${e.isUpcoming ? "blue" : "muted"}`}>{e.category}</span>
                  {e.isUpcoming ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span className="pill blue" style={{ fontSize: "11.5px", fontWeight: 700, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Users className="w-3 h-3" />
                        <b>{e.registered}</b> Registered
                      </span>
                      <span className={`pill ${e.available > 5 ? "emerald" : "amber"}`} style={{ fontSize: "11.5px", fontWeight: 700, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle2 className="w-3 h-3" />
                        <b>{e.available}</b> Seats Left
                      </span>
                    </div>
                  ) : (
                    <span className="date">{e.date}</span>
                  )}
                </div>

                <h3>{e.title}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 16px" }}>{e.desc}</p>

                <div className="event-card-details">
                  <span>
                    <Clock /> {e.time}
                  </span>
                  <span>
                    <MapPin /> {e.location}
                  </span>
                  {e.isUpcoming && (
                    <span>
                      <Users /> <b>{e.registered}</b> Registered • <b>{e.available}</b> Available ({e.capacity} Cap)
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                  {e.isUpcoming ? (
                    registeredIds.includes(e.id) ? (
                      <span className="pill emerald">✓ Registered</span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openRegistrationModal(e.raw)}
                      >
                        <span>Register Now ({e.available} Left)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  ) : (
                    <ButtonLink to="/contact" variant="outline" size="sm">
                      <span>View Session Archive</span>
                    </ButtonLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOST AN EVENT CTA */}
      <section className="section-muted">
        <div className="container split">
          <div className="prose">
            <span className="section-badge">Community & Ecosystem</span>
            <h2>Want to Host an Event or Workshop with Us?</h2>
            <p>
              Are you an industry expert, tech evangelist, or community leader looking to run a
              hackathon, expert talk, or technical bootcamp for Vadodara's top innovators?
            </p>
            <ButtonLink to="/contact" size="lg">
              <span>Partner to Host an Event</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
          <div className="plain-card" style={{ padding: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>What We Provide:</h3>
            <ul
              className="list"
              style={{ paddingLeft: "18px", fontSize: "14.5px", color: "#475569" }}
            >
              <li>150-seater multimedia Auditorium & Anviksha Conference Hall</li>
              <li>Param Shavak Supercomputer Lab & High-Speed Wi-Fi connectivity</li>
              <li>Live streaming, AV rigging & promotional outreach to 5,000+ students</li>
              <li>Institutional certificate co-branding with GSFC University</li>
            </ul>
          </div>
        </div>
      </section>

      {/* POPUP REGISTRATION MODAL */}
      {isModalOpen && selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #e2e8f0",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748b",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
                e.currentTarget.style.color = "#0f172a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedTicket ? (
              /* REGISTRATION SUCCESS TICKET VIEW */
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "#ecfdf5",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    border: "2px solid #a7f3d0",
                  }}
                >
                  <Check className="w-8 h-8" />
                </div>

                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Registration Confirmed!
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                  Your seat has been reserved and your details are recorded in the GUIITAR Council
                  roster.
                </p>

                {/* Digital Ticket Card */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #0b1528 0%, #1e293b 100%)",
                    borderRadius: "16px",
                    padding: "24px",
                    color: "#ffffff",
                    textAlign: "left",
                    marginBottom: "24px",
                    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderBottom: "1px dashed rgba(255, 255, 255, 0.2)",
                      paddingBottom: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: "#38bdf8",
                        }}
                      >
                        GUIITAR Pass
                      </span>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#ffffff",
                          margin: "2px 0 0",
                        }}
                      >
                        {confirmedTicket.eventTitle}
                      </h4>
                    </div>
                    <span
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        color: "#34d399",
                        border: "1px solid rgba(52, 211, 153, 0.4)",
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {confirmedTicket.status}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Student Name
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc" }}>
                        {confirmedTicket.studentName}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Enrollment No.
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc" }}>
                        {confirmedTicket.enrollmentNo}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Department
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#cbd5e1",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {confirmedTicket.department}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Registered Date
                      </div>
                      <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
                        {confirmedTicket.registrationDate}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "12px",
                      borderTop: "1px dashed rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "10px", color: "#94a3b8", textTransform: "uppercase" }}>
                        Ticket ID
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: "#38bdf8",
                        }}
                      >
                        {confirmedTicket.ticketId}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyTicket(confirmedTicket.ticketId)}
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "none",
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {copiedTicket ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={closeModal}
                >
                  <span>Done & Return to Events</span>
                </button>
              </div>
            ) : (
              /* REGISTRATION FORM */
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Event Registration</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: "0 0 6px",
                    }}
                  >
                    {selectedEvent.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "13px",
                      color: "#64748b",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>📅 {selectedEvent.date}</span>
                    <span>⏰ {selectedEvent.time}</span>
                    <span>📍 {selectedEvent.location}</span>
                  </div>

                  {/* Live Registration & Seat Availability Banner */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      marginTop: "12px",
                      fontSize: "12.5px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ color: "#2563eb", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <Users className="w-3.5 h-3.5" />
                      <b>{selectedEvent.registered || 0}</b> Students Registered
                    </span>
                    <span style={{ color: "#059669", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <b>{Math.max(0, (selectedEvent.capacity || 100) - (selectedEvent.registered || 0))}</b> Seats Available ({selectedEvent.capacity || 100} Total)
                    </span>
                  </div>
                </div>

                {formError && (
                  <div
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#b91c1c",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "18px",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitRegistration}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ gridColumn: "span 2" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Om Thakkar"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({ ...formData, studentName: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
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
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Enrollment / Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 210103001"
                        value={formData.enrollmentNo}
                        onChange={(e) =>
                          setFormData({ ...formData, enrollmentNo: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
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
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div style={{ gridColumn: "span 2" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Institutional / University Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. student@gsfcuniversity.ac.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
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
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Department / Branch
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
                          background: "#ffffff",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="Computer Science & Eng">Computer Science & Eng</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Fire & Safety Engineering">Fire & Safety Engineering</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="School of Management / MBA">School of Management / MBA</option>
                        <option value="School of Science / Chemistry">School of Science / Chemistry</option>
                        <option value="Other / External Institution">Other / External</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Semester / Level
                      </label>
                      <select
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
                          background: "#ffffff",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="1st / 2nd Sem">1st / 2nd Sem (1st Year)</option>
                        <option value="3rd / 4th Sem">3rd / 4th Sem (2nd Year)</option>
                        <option value="5th / 6th Sem">5th / 6th Sem (3rd Year)</option>
                        <option value="7th / 8th Sem">7th / 8th Sem (4th Year)</option>
                        <option value="PG / Masters">Postgraduate / Masters</option>
                        <option value="Faculty / Researcher">Faculty / Researcher</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: "span 2" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1e293b",
                          marginBottom: "6px",
                        }}
                      >
                        Special Interests or Questions for the Mentor (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any specific topic you're excited to learn or build..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #cbd5e1",
                          borderRadius: "10px",
                          fontSize: "14px",
                          outline: "none",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "12px",
                      marginTop: "20px",
                      paddingTop: "16px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#475569",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                      style={{ minWidth: "150px", justifyContent: "center" }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Seat</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

