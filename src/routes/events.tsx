import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

import { useEffect } from "react";
import { AdminDataStore, type EventItem } from "@/lib/adminStore";
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
  const [registered, setRegistered] = useState<string | null>(null);
  const [eventsList, setEventsList] = useState<EventItem[]>(() =>
    typeof window !== "undefined" ? AdminDataStore.getEvents() : [],
  );

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

  const allEvents = eventsList.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    time: e.time,
    location: e.location,
    category: e.category,
    isUpcoming:
      e.status === "Upcoming" || e.status === "Registration Open" || e.isUpcoming !== false,
    seats: e.seats || `${e.capacity - e.registered} Seats Available`,
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
  }));

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
                <span className="pill emerald" style={{ marginBottom: "10px" }}>
                  {featured.seats}
                </span>
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

                {registered === featured.id ? (
                  <div className="success-banner">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      You are registered! A confirmation email with workshop venue passes has been
                      sent.
                    </span>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => setRegistered(featured.id)}>
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
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span className={`pill ${e.isUpcoming ? "emerald" : "blue"}`}>{e.category}</span>
                  <span className="date">{e.date}</span>
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
                      <Users /> {e.seats}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                  {e.isUpcoming ? (
                    registered === e.id ? (
                      <span className="pill emerald">✓ Registered</span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setRegistered(e.id)}
                      >
                        <span>Register Now</span>
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
    </>
  );
}
