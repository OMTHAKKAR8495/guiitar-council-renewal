import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  Building2,
  Users,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  ExternalLink,
  Sparkles,
  BookOpen,
  CalendarDays,
  Target,
  Compass,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/iic")({
  head: () => ({
    meta: [
      { title: "Institution's Innovation Council (IIC) — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Ministry of Education (MoE) Innovation Cell & AICTE established Institution's Innovation Council (IIC) at GSFC University. Idea scouting, design thinking, hackathons, and pre-incubation.",
      },
      { property: "og:title", content: "Institution's Innovation Council (IIC) — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Fostering a culture of innovation, startup creation, and IP generation under the aegis of the Ministry of Education, Government of India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IICPage,
});

const IIC_FUNCTIONS = [
  {
    title: "Local Innovation Ecosystem Development",
    desc: "Creating an active campus ecosystem that bridges academic coursework, lab discoveries, and commercial enterprise creation.",
    icon: Building2,
  },
  {
    title: "Startup & Entrepreneurship Support",
    desc: "Providing seed mentoring, workspace, pre-incubation grants, and legal incorporation guidance to student and faculty founders.",
    icon: Sparkles,
  },
  {
    title: "Idea Scouting & Pre-Incubation",
    desc: "Systematically identifying novel technological concepts from classrooms, final-year engineering projects, and research papers.",
    icon: Lightbulb,
  },
  {
    title: "Design Thinking & PoC Validation",
    desc: "Conducting intensive masterclasses on human-centered design, problem validation, and translating hypotheses into functional prototypes.",
    icon: Target,
  },
  {
    title: "Intellectual Property Rights (IPR) Awareness",
    desc: "Organizing workshops on prior-art search protocols, patent filing subsidies, and software copyright registrations.",
    icon: ShieldCheck,
  },
  {
    title: "Hackathons & Innovation Competitions",
    desc: "Hosting institutional hackathons, Smart India Hackathon internal selections, and cross-university ideathons.",
    icon: Award,
  },
  {
    title: "Workshops, Seminars & Leadership Talks",
    desc: "Inviting corporate CXOs, venture capitalists, and technical specialists to inspire and train emerging founders.",
    icon: CalendarDays,
  },
  {
    title: "Mentor Pool Development & Network",
    desc: "Curating a dedicated panel of internal faculty mentors and external industrial experts across diverse technological thrust areas.",
    icon: Users,
  },
  {
    title: "Innovation Showcase Portal & Showcases",
    desc: "Publishing and tracking university prototypes, student patents, and early-stage startup ventures for state and national visibility.",
    icon: Compass,
  },
  {
    title: "Active Industry Participation",
    desc: "Connecting student projects with industrial challenges from GSFC Ltd, Gujarat State PSUs, and regional MSMEs for live validation.",
    icon: BookOpen,
  },
];

const IIC_COUNCIL_MEMBERS = [
  {
    name: "Prof. G. R. Sinha",
    role: "President, IIC",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    category: "Institutional Head",
  },
  {
    name: "Mr. Kirankumar Parmar",
    role: "Convener, IIC",
    designation: "Senior Manager (Incubation), GUIITAR Council",
    category: "Incubation Operations",
  },
  {
    name: "Dr. Chandra Has",
    role: "Innovation Activity Coordinator",
    designation: "Assistant Professor, School of Technology",
    category: "Faculty Coordinator",
  },
  {
    name: "Dr. Mihir Trivedi",
    role: "Start-up Activity Coordinator",
    designation: "Assistant Professor, Computer Science Dept.",
    category: "Faculty Coordinator",
  },
  {
    name: "Dr. Akhilesh Prajapati",
    role: "IPR Activity Coordinator",
    designation: "Associate Professor, Chemical Engineering",
    category: "Faculty Coordinator",
  },
  {
    name: "Dr. Rahul Sharma",
    role: "Social Media & Internship Coordinator",
    designation: "Sr. Assistant Professor, School of Management",
    category: "Faculty Coordinator",
  },
];

export function IICPage() {
  return (
    <>
      <PageHero
        badge="Ministry of Education (MoE) Initiative"
        title="Institution's Innovation Council (IIC)"
        text="Established in collaboration with the Ministry of Education's Innovation Cell (MIC) and AICTE to systematically foster a culture of innovation, startup creation, and IP generation at GSFC University."
      >
        <div className="button-row">
          <a
            href="https://iic.mic.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>MoE Innovation Cell (MIC) Portal</span>
          </a>
          <Link to="/events" className="btn btn-outline btn-md">
            <span>View IIC Calendar &amp; Activities</span>
          </Link>
        </div>
      </PageHero>

      {/* ABOUT IIC SECTION */}
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
              <span className="pill blue" style={{ marginBottom: "12px", display: "inline-block" }}>
                National Mandate Since 2018
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 16px 0", color: "var(--text)" }}>
                About the MoE Innovation Cell &amp; AICTE IIC Framework
              </h2>
              <p style={{ fontSize: "15px", color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
                In the year 2018, the Ministry of Education (MoE), Government of India, through its Innovation Cell (MIC), launched the Institution’s Innovation Council (IIC) program in collaboration with AICTE for Higher Educational Institutions (HEIs).
              </p>
              <p style={{ fontSize: "15px", color: "var(--muted-foreground)", lineHeight: "1.7", margin: 0 }}>
                At GSFC University, the IIC operates in direct coordination with the GUIITAR Council to organize round-the-year activities, design-thinking workshops, hackathons, and ideathons, guiding students from initial conceptualization to formal incubation and IP filing.
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid #bfdbfe",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e40af", margin: "0 0 14px 0" }}>
                Core Mandates of GSFC University IIC:
              </h3>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "#1e3a8a", lineHeight: "1.7" }}>
                <li>Implement MoE Innovation Cell prescribed calendar activities.</li>
                <li>Conduct self-driven entrepreneurship and innovation workshops.</li>
                <li>Identify and nurture novel proof-of-concept projects through SSIP 2.0.</li>
                <li>Facilitate National Innovation and Startup Policy (NISP) implementation.</li>
                <li>Establish formal linkages with industry mentors and venture financiers.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10 CORE FUNCTIONS */}
      <section className="section-muted" style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Institutional Scope"
            title="Core Functions &amp; Objectives of IIC"
            subtitle="Ten strategic operational pillars defined by the official Ministry of Education framework."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {IIC_FUNCTIONS.map((fn, index) => {
              const IconComp = fn.icon;
              return (
                <article
                  key={fn.title}
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
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "14px",
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                      Pillar #{index + 1}
                    </span>
                    <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "4px 0 8px 0", color: "var(--text)" }}>
                      {fn.title}
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                      {fn.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IIC COUNCIL MEMBERS ROSTER */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Governance Roster"
            title="GSFC University IIC Council Members"
            subtitle="Official institutional faculty coordinators appointed under the Ministry of Education framework."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {IIC_COUNCIL_MEMBERS.map((m) => (
              <div
                key={m.name}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "16px",
                  padding: "22px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {m.name.charAt(0)}
                </div>
                <div>
                  <span className="pill blue" style={{ fontSize: "10.5px", padding: "1px 6px", marginBottom: "3px" }}>
                    {m.role}
                  </span>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--text)" }}>
                    {m.name}
                  </h4>
                  <span style={{ fontSize: "12.5px", color: "var(--muted-foreground)", display: "block" }}>
                    {m.designation}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
            }}
          >
            <a
              href="https://iic.mic.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-md"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Verify Institution Listing on MoE IIC Portal</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

