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
  FileText,
  Download,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { AdminDataStore, type EventItem, type RegistrationItem } from "@/lib/adminStore";
import { SupabaseDbClient } from "@/lib/supabaseClient";

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
  const [archiveYear, setArchiveYear] = useState<string>("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; title: string; category: string } | null>(null);
  const [eventsList, setEventsList] = useState<EventItem[]>(() =>
    AdminDataStore.getEvents(),
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
    SupabaseDbClient.getEvents().then((remoteEvents) => {
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
      // 1. Save registration into AdminDataStore + automatically syncs to live Supabase DB
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
                  <span className="pill blue" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                    <Users className="w-3.5 h-3.5" />
                    <span>Official University Cohort</span>
                  </span>
                  <span className="pill emerald" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Registration Open • Prior Reservation Required</span>
                  </span>
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
                    <Users /> Open Registration • Prior Reservation Required
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
                    <span className="pill emerald" style={{ fontSize: "11.5px", fontWeight: 700, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle2 className="w-3 h-3" />
                      Registration Open
                    </span>
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
                      <Users /> Open Registration • Limited Capacity
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
                        <span>Register for Event</span>
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

      {/* OFFICIAL EVENT REPORTS & PROCEEDINGS ARCHIVE */}
      <section style={{ padding: "70px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <SectionTitle
            badge="Official Institutional Records"
            title="Event Reports & Proceedings Archive"
            subtitle="Download verified official event reports, attendee rosters, and technical workshop summaries published by GUIITAR Council."
          />

          {/* YEAR FILTER TABS FOR EVENT ARCHIVE */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "24px",
              marginBottom: "8px",
            }}
          >
            {["All", "2026", "2025", "2024", "2023", "2019-2022"].map((yr) => (
              <button
                key={yr}
                onClick={() => setArchiveYear(yr)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "1px solid",
                  borderColor: archiveYear === yr ? "var(--primary, #2563eb)" : "var(--border)",
                  background: archiveYear === yr ? "var(--primary, #2563eb)" : "var(--surface)",
                  color: archiveYear === yr ? "#ffffff" : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {yr === "All" ? "All Years (2019–2026)" : yr}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {[
              // 2026
              {
                title: "TOD FOD JOD (TFJ) Workshop Report",
                date: "12 August 2026",
                year: "2026",
                category: "Prototyping & Making",
                pdfUrl: "/documents/events/2026-tod-fod-jod-workshop.pdf",
                size: "592 KB",
                pages: "6 Pages",
                desc: "Hands-on engineering deconstruction and reconstruction workshop for high school and diploma students.",
              },
              {
                title: "NCC National Drone Training Camp",
                date: "10-16 July 2026",
                year: "2026",
                category: "Drone & Aerospace",
                pdfUrl: "/documents/events/2026-ncc-drone-camp.pdf",
                size: "4.6 MB",
                pages: "12 Pages",
                desc: "Intensive 10-day drone assembly, calibration, telemetry, and flight training camp for NCC Air Wing cadets.",
              },
              {
                title: "Central Gujarat Startup Ecosystem Seminar (Vibrant Gujarat)",
                date: "29 June 2026",
                year: "2026",
                category: "Policy & Funding",
                pdfUrl: "/documents/events/2026-central-gujarat-startup-seminar.pdf",
                size: "1.4 MB",
                pages: "8 Pages",
                desc: "Regional stakeholder consultation and startup promotion summit leading up to Vibrant Gujarat Global Summit.",
              },
              {
                title: "Corporate Business Simulation Game Workshop",
                date: "17 June 2026",
                year: "2026",
                category: "Business Modeling",
                pdfUrl: "/documents/events/2026-corporate-business-simulation.pdf",
                size: "1.4 MB",
                pages: "7 Pages",
                desc: "Interactive gamified corporate strategy, balance sheet, and financial decision-making simulation.",
              },
              {
                title: "Venture Creation & Validation Bootcamp",
                date: "08-10 June 2026",
                year: "2026",
                category: "Incubation Track",
                pdfUrl: "/documents/events/2026-venture-creation-bootcamp.pdf",
                size: "804 KB",
                pages: "6 Pages",
                desc: "Comprehensive 3-day founder sprint covering customer discovery, lean canvas, and proof-of-concept testing.",
              },
              {
                title: "Orientation on Laser Cutting & 3D Scanning",
                date: "05 June 2026",
                year: "2026",
                category: "Maker Lab",
                pdfUrl: "/documents/events/2026-orientation-laser-3d.pdf",
                size: "961 KB",
                pages: "5 Pages",
                desc: "Technical safety certification and hands-on tooling workshop on industrial laser engravers and 3D scanners.",
              },
              {
                title: "National Technology Day Innovation Showcase",
                date: "05 May 2026",
                year: "2026",
                category: "Institutional",
                pdfUrl: "/documents/events/2026-national-technology-day.pdf",
                size: "1.1 MB",
                pages: "8 Pages",
                desc: "Commemoration of indigenous technology milestones with prototype demos and student research exhibition.",
              },
              {
                title: "Intellectual Property Rights, Values, Ethics & Standards",
                date: "09 April 2026",
                year: "2026",
                category: "Legal & IPR",
                pdfUrl: "/documents/events/2026-ipr-values-ethics.pdf",
                size: "1.0 MB",
                pages: "6 Pages",
                desc: "Intellectual property rights framework, patent filing procedures, and corporate governance compliance norms.",
              },
              {
                title: "Garuda Aerospace Drone Masterclass Phase II",
                date: "19 March 2026",
                year: "2026",
                category: "Aerospace",
                pdfUrl: "/documents/events/2026-drone-workshop-ii.pdf",
                size: "3.7 MB",
                pages: "10 Pages",
                desc: "DGCA compliance, autonomous waypoint navigation, and multi-spectral sensor integration for precision farming.",
              },
              {
                title: "Shark Tank GSFCU — Ananta National Techfest",
                date: "07 March 2026",
                year: "2026",
                category: "Pitch Competition",
                pdfUrl: "/documents/events/2026-shark-tank-gsfcu-ananta.pdf",
                size: "4.2 MB",
                pages: "14 Pages",
                desc: "Flagship startup pitching competition featuring 24 shortlisted ventures presenting to angel investors and CXOs.",
              },
              {
                title: "How to Register Industrial Design & Copyrights",
                date: "13 February 2026",
                year: "2026",
                category: "Legal & IPR",
                pdfUrl: "/documents/events/2026-register-industrial-design.pdf",
                size: "1.2 MB",
                pages: "7 Pages",
                desc: "Practical walkthrough on preparing design patent drawings, novel aesthetic claims, and statutory filings.",
              },
              {
                title: "ABC of Entrepreneurship: From Idea to Incorporation",
                date: "31 January 2026",
                year: "2026",
                category: "Startup 101",
                pdfUrl: "/documents/events/2026-abc-entrepreneurship.pdf",
                size: "1.6 MB",
                pages: "9 Pages",
                desc: "Foundational masterclass on enterprise structuring, GST compliance, banking, and early traction metrics.",
              },
              // 2025
              {
                title: "Faculty Entrepreneurship Development (TIDES, IIT Roorkee)",
                date: "22-23 January 2025",
                year: "2025",
                category: "Faculty Program",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_c2c0878843c94098916b60f2b3a69470.pdf",
                size: "2.1 MB",
                pages: "11 Pages",
                desc: "National level faculty empowerment program on academic spin-offs, patent commercialization, and incubation.",
              },
              {
                title: "TIDES Ignition Incubation Programme (IIT Roorkee)",
                date: "15-30 December 2025",
                year: "2025",
                category: "Incubation Track",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_7188c495c0704d4ba61c303cad01b588.pdf",
                size: "1.8 MB",
                pages: "9 Pages",
                desc: "Joint acceleration sprint with TIDES, IIT Roorkee for seed-stage deep-tech university ventures.",
              },
              {
                title: "Advanced CAD & 3D Prototyping Workshop",
                date: "25 November 2025",
                year: "2025",
                category: "Maker Lab",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_395ed8b460cc4d3f882ab902801ebe30.pdf",
                size: "1.3 MB",
                pages: "6 Pages",
                desc: "Hands-on SolidWorks CAD modeling, mesh repair, and precision FDM slicing for student mechanical projects.",
              },
              // 2024
              {
                title: "Bio-pigments & Sustainable Microbial Colorants Masterclass",
                date: "18 October 2024",
                year: "2024",
                category: "Biotechnology",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_2744adac028240fd8c431ca57fdbdd17.pdf",
                size: "1.5 MB",
                pages: "8 Pages",
                desc: "Technical exploration of microbial synthesis, bio-fermentation, and replacing synthetic toxic dyes in textiles.",
              },
              {
                title: "National Science Day Innovation & Prototyping Exhibition",
                date: "28 February 2024",
                year: "2024",
                category: "Showcase",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_0b4cf211ba604617a22df6655c697843.pdf",
                size: "3.2 MB",
                pages: "14 Pages",
                desc: "University-wide showcase of 40+ student working prototypes evaluated by GSFC Ltd corporate scientists.",
              },
              // 2023
              {
                title: "Patenting in Chemical & Life Sciences Masterclass",
                date: "14 September 2023",
                year: "2023",
                category: "Legal & IPR",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf",
                size: "1.7 MB",
                pages: "10 Pages",
                desc: "Prior-art search strategies, Indian Patent Act Section 3(d) compliance, and patent prosecution clinic.",
              },
              // 2019-2022
              {
                title: "Industrial Safety & Hazardous Materials Prototyping Protocol",
                date: "11 November 2022",
                year: "2019-2022",
                category: "Industrial Safety",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf",
                size: "2.4 MB",
                pages: "12 Pages",
                desc: "Guidelines for chemical handling, ventilation safety, and lab hygiene during hardware prototype assembly.",
              },
              {
                title: "Inaugural Foundation Workshop on Start-up Incubation & IP Protection",
                date: "15 October 2019",
                year: "2019-2022",
                category: "Ecosystem Inception",
                pdfUrl: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_8653460f7dfb49c0bdfd4bab4e9e2892.pdf",
                size: "2.8 MB",
                pages: "16 Pages",
                desc: "Inaugural workshop marking the inception of GSFC University's innovation & incubation council.",
              },
            ]
              .filter((rep) => archiveYear === "All" || rep.year === archiveYear)
              .map((rep) => (
              <article
                key={rep.title}
                className="plain-card"
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="pill blue" style={{ fontSize: "11px" }}>
                      {rep.category}
                    </span>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        background: "var(--surface-muted, #f1f5f9)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {rep.size} • {rep.pages}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px", lineHeight: "1.35" }}>
                    {rep.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#059669",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{rep.date}</span>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      lineHeight: "1.5",
                      margin: "0 0 16px",
                    }}
                  >
                    {rep.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "14px",
                  }}
                >
                  <a
                    href={rep.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Report</span>
                  </a>
                  <a
                    href={rep.pdfUrl}
                    download
                    className="btn btn-outline btn-sm"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    title="Download Report PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL INSTITUTIONAL PHOTOGRAPHIC GALLERIES */}
      <section style={{ padding: "60px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <SectionTitle
            badge="Visual Documentation"
            title="Official Institutional Galleries"
            subtitle="Verified photographs capturing student achievements, startup prototypes, academic alliances, and founder bootcamps."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {[
              {
                title: "Student Achievement Gallery",
                tag: "Awards & Hackathons",
                desc: "Photographs of GSFC University student innovators winning national hackathons, State SSIP awards, and patent grant felicitations.",
                link: "https://drive.google.com/drive/folders/1JXvxN1ys5SzgwIUpajSl8wWqYnuGjkkT?usp=sharing",
                badge: "Verified Archives",
                linkLabel: "Open Drive Archive",
                photos: [
                  { url: "/images/achievements/sih-2023.jpg", caption: "Smart India Hackathon 2023 Winners" },
                  { url: "/images/achievements/student-achievement-nih-2023.jpg", caption: "National Innovation Hackathon 2023" },
                  { url: "/images/achievements/drone-pilot-license.jpg", caption: "DGCA Drone Pilot Certification" },
                ],
              },
              {
                title: "Student/Startup Incubated Gallery",
                tag: "Prototype Deployments",
                desc: "Hardware prototypes, chemical bioreactors, aerial inspection drones, and MVP trial deployments built in GUIITAR labs.",
                link: "https://drive.google.com/drive/folders/1EspgxXUoavBlETSnxstEfpMGsI_fCFma",
                badge: "15+ Ventures",
                linkLabel: "Open SSIP PoC Repository",
                photos: [
                  { url: "/images/incubated/sagiros-eir.jpg", caption: "Sagiros - Incubated Technology Venture" },
                  { url: "/images/incubated/nerosil-ai-techno.jpeg", caption: "Nerosil AI Techno LLP - Machine Vision" },
                  { url: "/images/incubated/morphica-naturals.jpg", caption: "Morphica Naturals - Herbal Cosmetics" },
                ],
              },
              {
                title: "Association & Linkages Gallery",
                tag: "Institutional MoUs",
                desc: "High-level delegations, bilateral MoU signings with DST, NASSCOM, Garuda Aerospace, iCreate, and corporate partners.",
                link: "https://www.guiitarstartupcouncil.org/",
                badge: "20+ MoUs",
                linkLabel: "Open Official MoUs Portal",
                photos: [
                  { url: "/partners/association-and-linkages.png", caption: "Institutional Association Grid" },
                  { url: "/images/original/leadership/provost-gr-sinha-team.jpg", caption: "Executive Council Delegation" },
                  { url: "/images/original/banners/startup-lecture-cultural-center.jpg", caption: "Corporate Ecosystem Assembly" },
                ],
              },
              {
                title: "E-Club Innovation Gallery",
                tag: "Campus Culture",
                desc: "Student-led ideation sprints, peer design-thinking workshops, weekend bootcamps, and Maker Lab after-hours build sessions.",
                link: "https://forms.gle/sUvSDHDubWQVdLHi8",
                badge: "Dec 2024–Present",
                linkLabel: "Open E-Club Portal",
                photos: [
                  { url: "/images/original/banners/guiitar-hero-banner.jpg", caption: "Ideation & Innovation Sprint" },
                  { url: "/images/original/infrastructure/coworking-space.jpg", caption: "Collaborative Workspace Lounge" },
                  { url: "/images/original/infrastructure/srujan-lab.jpg", caption: "Srujan Prototyping Suite" },
                ],
              },
            ].map((gal) => (
              <div
                key={gal.title}
                className="plain-card"
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span className="pill blue" style={{ fontSize: "11px" }}>{gal.tag}</span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--text-muted)" }}>{gal.badge}</span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px 0" }}>
                    {gal.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                    {gal.desc}
                  </p>

                  {/* 3-Photo Lightbox Previews */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
                    {gal.photos.map((p) => (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => setLightboxPhoto({ url: p.url, title: p.caption, category: gal.title })}
                        style={{
                          background: "var(--surface-muted, #f1f5f9)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          padding: 0,
                          overflow: "hidden",
                          cursor: "zoom-in",
                          height: "64px",
                          position: "relative",
                        }}
                        title={`Click to view ${p.caption}`}
                      >
                        <img
                          src={p.url}
                          alt={p.caption}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={gal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <span>{gal.linkLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
                background: "var(--surface-muted, #f1f5f9)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--foreground, #64748b)",
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

                  {/* Official Registration Banner */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      background: "var(--surface-muted, #f8fafc)",
                      border: "1px solid var(--border, #e2e8f0)",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      marginTop: "12px",
                      fontSize: "12.5px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ color: "var(--primary, #2563eb)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <Users className="w-3.5 h-3.5" />
                      Official GSFC University Cohort Registration
                    </span>
                    <span style={{ color: "#059669", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Seat Allocation
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

      {/* PHOTO LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 15, 26, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface, #ffffff)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              maxWidth: "800px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#2563eb", letterSpacing: "0.05em" }}>
                  {lightboxPhoto.category}
                </span>
                <h4 style={{ margin: "2px 0 0", fontSize: "16px", fontWeight: 800 }}>{lightboxPhoto.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  padding: "6px",
                  borderRadius: "8px",
                  display: "flex",
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div style={{ background: "#050811", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px", maxHeight: "65vh", overflow: "hidden" }}>
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

