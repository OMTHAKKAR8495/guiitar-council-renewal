import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Users,
  Lightbulb,
  Rocket,
  CalendarDays,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Heart,
  Share2,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/e-club")({
  head: () => ({
    meta: [
      { title: "Entrepreneurship Club (E-Club) — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Official Entrepreneurship Club (E-Club) established in December 2024 under GUIITAR Council at GSFC University. Student-led innovation hackathons, ideathons, workshops, and startup networking.",
      },
      { property: "og:title", content: "Entrepreneurship Club (E-Club) — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Empowering student founders, fostering peer innovation, and building hands-on startup culture at GSFC University.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EClubPage,
});

const ECLUB_OBJECTIVES = [
  {
    title: "Cultivate Entrepreneurial Mindset",
    desc: "Inspire and nurture the spirit of entrepreneurship among students across all schools (Technology, Science, Management, and Design).",
  },
  {
    title: "Facilitate Idea Generation & Hackathons",
    desc: "Organize campus-wide ideathons, 36-hour hackathons, prototype challenges, and multidisciplinary design clinics.",
  },
  {
    title: "Bridge Classroom Learning & Industry Practice",
    desc: "Connect students with successful startup founders, corporate leaders from GSFC Ltd, and angel investors through masterclasses.",
  },
  {
    title: "Peer-to-Peer Innovation Support",
    desc: "Create cross-departmental teams combining software coders, mechanical fabricators, biotech researchers, and business pitch designers.",
  },
  {
    title: "Pre-Incubation Pipeline to GUIITAR Council",
    desc: "Channel promising student prototypes directly into the GUIITAR Stage 1 (Spark-up) and SSIP 2.0 grant screening pathways.",
  },
  {
    title: "Exhibitions & Startup Showcases",
    desc: "Provide public platforms for student innovators to showcase working prototypes before faculty, industry visitors, and media.",
  },
];

const ECLUB_ACTIVITIES = [
  {
    title: "Ideathon & Problem-Solving Sprints",
    frequency: "Monthly",
    desc: "Rapid brainstorming sessions solving real industrial challenges posed by chemical, robotics, and environmental sectors.",
  },
  {
    title: "E-Summit & Founder Keynotes",
    frequency: "Annual Flagship",
    desc: "Full-day celebration of entrepreneurship featuring keynote addresses, investor panels, and startup demo alleys.",
  },
  {
    title: "Hands-on Maker Bootcamps",
    frequency: "Bi-weekly",
    desc: "Direct workbench workshops on 3D printing slicing, laser cutting enclosures, and drone avionics assembly in the Maker Lab.",
  },
  {
    title: "Investor Pitch Clinics",
    frequency: "Quarterly",
    desc: "Mock pitch sessions before faculty mentors and empaneled angels to refine slides, financial projections, and delivery.",
  },
];

const OFFICE_BEARERS = [
  {
    name: "Dr. Rahul Sharma",
    role: "Faculty Coordinator (Management)",
    affiliation: "School of Management, GSFC University",
  },
  {
    name: "Dr. Chandra Has",
    role: "Faculty Coordinator (Technical)",
    affiliation: "School of Technology, GSFC University",
  },
  {
    name: "Mr. Kirankumar Parmar",
    role: "Mentor & Institutional Advisor",
    affiliation: "Senior Manager (Incubation), GUIITAR Council",
  },
  {
    name: "Student President & Executive Council",
    role: "Student Leadership Team",
    affiliation: "Elected from B.Tech, M.Tech, and BBA/MBA Cohorts",
  },
];

export function EClubPage() {
  return (
    <>
      <PageHero
        badge="Established December 2024"
        title="Entrepreneurship Club (E-Club)"
        text="The official student-led innovation and entrepreneurship society functioning under the aegis of GUIITAR Council at GSFC University. Fostering bold ideas, peer collaboration, and campus-wide founder culture."
      >
        <div className="button-row">
          <a
            href="https://forms.gle/sUvSDHDubWQVdLHi8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Join E-Club as Student Member</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link to="/events" className="btn btn-outline btn-md">
            <span>Explore Upcoming Events</span>
          </Link>
        </div>
      </PageHero>

      {/* ESTABLISHMENT & ABOUT SECTION */}
      <section style={{ padding: "60px 0 20px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
              alignItems: "center",
            }}
          >
            <div>
              <span className="pill amber" style={{ marginBottom: "12px", display: "inline-block" }}>
                Established December 2024 • Under GUIITAR Council
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 16px 0", color: "var(--text)" }}>
                Igniting the Entrepreneurial Spirit on Campus
              </h2>
              <p style={{ fontSize: "15px", color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
                Formally established in <strong>December 2024</strong>, the Entrepreneurship Club (E-Club) of GSFC University is the vibrant heartbeat of student innovation on campus. Operating under the strategic mentorship of the GUIITAR Council, the E-Club is run by passionate student leaders for student innovators.
              </p>
              <p style={{ fontSize: "15px", color: "var(--muted-foreground)", lineHeight: "1.7", margin: 0 }}>
                Whether you have a scribbled idea on a napkin, an engineering project that solved a lab dilemma, or a full prototype ready for seed funding, the E-Club provides the peer circle, mentor hours, and event stages to take it forward.
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
                borderRadius: "20px",
                padding: "32px",
                border: "1.5px solid #fed7aa",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <Rocket className="w-6 h-6 text-orange-600" />
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#9a3412", margin: 0 }}>
                  Why Join the E-Club?
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "#7c2d12", lineHeight: "1.7" }}>
                <li>Direct pipeline to GUIITAR Council SSIP 2.0 grants up to ₹2.5 Lakhs.</li>
                <li>Exclusive after-hours access to the Makers Lab and IoT Tinkering Lab.</li>
                <li>Participate in national hackathons and inter-university startup battles.</li>
                <li>Collaborate with interdisciplinary teams from engineering, science, and business.</li>
                <li>Executive leadership certificate and official institutional credentials.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES */}
      <section className="section-muted" style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Foundational Purpose"
            title="Core Objectives of E-Club"
            subtitle="Guiding the transformation of student curiosity into real-world commercial solutions."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {ECLUB_OBJECTIVES.map((obj, i) => (
              <div
                key={obj.title}
                className="plain-card"
                style={{
                  padding: "26px",
                  borderRadius: "18px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c" }}>
                    Objective #{i + 1}
                  </span>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "6px 0 10px 0", color: "var(--text)" }}>
                    {obj.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                    {obj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE ACTIVITIES */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Year-Round Calendar"
            title="Workshops, Hackathons, Seminars &amp; Exhibitions"
            subtitle="Engaging student innovators throughout every semester with hands-on events."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {ECLUB_ACTIVITIES.map((act) => (
              <div
                key={act.title}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "18px",
                  padding: "26px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                }}
              >
                <span className="pill amber" style={{ fontSize: "11px", marginBottom: "8px" }}>
                  {act.frequency}
                </span>
                <h4 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 8px 0" }}>
                  {act.title}
                </h4>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE BEARERS & COORDINATORS */}
      <section className="section-muted" style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Club Governance"
            title="Office Bearers &amp; Faculty Coordinators"
            subtitle="Advising and guiding the E-Club executive committee under GUIITAR Council administration."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {OFFICE_BEARERS.map((ob) => (
              <div
                key={ob.name}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "16px",
                  padding: "22px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                }}
              >
                <span className="pill blue" style={{ fontSize: "11px", marginBottom: "6px" }}>
                  {ob.role}
                </span>
                <h4 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 4px 0", color: "var(--text)" }}>
                  {ob.name}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                  {ob.affiliation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="section-blue cta" style={{ background: "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)" }}>
        <div className="container">
          <span className="section-badge light">Be Part of the Movement</span>
          <h2>Join the E-Club &amp; Launch Your Startup Journey</h2>
          <p>
            Open to all registered GSFC University students. Connect with co-founders, get early lab access, and pitch for prototype grant funding.
          </p>
          <div className="button-row">
            <a
              href="https://forms.gle/sUvSDHDubWQVdLHi8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
            >
              <span>Join E-Club Today</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/submit-idea" size="lg" variant="glass">
              <span>Submit a Startup Idea</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

