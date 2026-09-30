import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Leaf,
  Bot,
  Dna,
  ShieldCheck,
  Zap,
  HeartPulse,
  Wifi,
  Factory,
  Droplets,
  Cpu,
  Plane,
  Layers,
  BookOpen,
  Monitor,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Quote,
  Briefcase,
  Building2,
  FileText,
  Download,
  ExternalLink,
  FileCheck,
  FlaskConical,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Learn about GUIITAR Council's mission, vision, leadership, 13 thrust areas, and state-of-the-art incubation infrastructure at GSFC University.",
      },
      { property: "og:title", content: "About Us — GUIITAR Council" },
      {
        property: "og:description",
        content: "Innovation, entrepreneurship, and technological advancement in Vadodara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const objectives = [
  "To establish, manage and operate a business incubator.",
  "To promote entrepreneurship and to incubate individuals, groups of individuals, and convert their efforts into enterprises by collaborating with similar institutions.",
  "To catalyse the process of incubation.",
  "To manage technology, applied research, knowledge networks, and human resource development.",
  "To offer mentoring services to help with enterprise growth.",
  "To encourage new ventures for the benefit of society and to undertake all related activities to achieve the GUIITAR Council's vision.",
];

const thrust = [
  ["Agriculture and allied fields", Leaf],
  ["Artificial Intelligence and Robotics", Bot],
  ["Biotechnology", Dna],
  ["Clean-Tech", Leaf],
  ["Cyber Security", ShieldCheck],
  ["Energy", Zap],
  ["Environmental Challenges & Solutions", Leaf],
  ["Healthcare", HeartPulse],
  ["Information & Communication Technology (ICT)", Wifi],
  ["Internet of Things (IoT)", Cpu],
  ["Manufacturing", Factory],
  ["Services", Briefcase],
  ["Water (Drinking Water, Wastewater and Storm Water Utilities)", Droplets],
] as const;

const teams: { [k: string]: [string, string, string?][] } = {
  "Board of Directors": [
    [
      "Shri P. K. Taneja, IAS (Retd.)",
      "President, GSFC University & Chairman, GUIITAR Council",
      "Former Additional Chief Secretary (Home / Forest & Environment), Govt. of Gujarat.",
    ],
    [
      "Prof. G. R. Sinha",
      "Provost, GSFC University & CEO, GUIITAR Council",
      "Distinguished Academician, Researcher, and IEEE Senior Member with 25+ years in engineering leadership.",
    ],
  ],
  "Core Team": [
    [
      "Mr. Kirankumar Parmar",
      "Senior Manager",
      "Incubation operations, startup cohorts & grant administration",
    ],
    [
      "Mr. Bhuvan Vyas",
      "Manager-Incubation",
      "Ecosystem linkages, mentor network & corporate relations",
    ],
    [
      "Mr. Amit Duggal",
      "Senior Executive (Technical)",
      "Prototyping laboratories, hardware rigs & testing infrastructure",
    ],
  ],
  "Technical Associates": [
    ["Ms. Foram Mistry", "Technical Associate 1", "Makers & Fabrication Lab support"],
    ["Ms. Lavanya Jain", "Technical Associate 2", "Prototyping & hardware assistance"],
    ["Mr. Krish Shah", "Technical Associate 3", "Hardware rig testing & IoT support"],
    ["Mr. Chandraveer Singh", "Technical Associate 4", "Lab operations & technical assistance"],
  ],
  "SoT Team (Technology)": [
    ["Dr. Chandra Has", "Assistant Professor", "Mechanical Engineering & rapid prototyping"],
    ["Mr. Abidhusain Lodha", "Assistant Professor", "Robotics, UAV/Drone systems & CAD modeling"],
    ["Mr. Anup Upadhyay", "Lab Assistant Workshop", "Fabrication, machining & 3D printing"],
    ["Mr. Hemant M Rajput", "IT Coordinator", "Computing infrastructure & network systems"],
  ],
  "SoS Team (Science)": [
    ["Ms. Charmi Mehta", "Assistant Professor", "Applied sciences & research documentation"],
    ["Dr. Mihir Trivedi", "Assistant Professor", "Computer Science, AI/ML & supercomputing"],
    ["Dr. Akhilesh Prajapati", "Associate Professor", "Chemical engineering & industrial process design"],
    ["Ms. Chaitali Karpe", "Lab Assistant", "Science laboratories & instrumentation"],
  ],
  "SoM&E Team (Management)": [
    ["Dr. Rahul Sharma", "Sr. Assistant Professor", "Business model design, IoT & economics"],
    ["Dr. Jignesh Valand", "Assistant Professor", "Biotechnology ventures & commercialization"],
  ],
};

const infra = [
  {
    name: "Supercomputer Lab (Param Shavak)",
    desc: "Equipped with the Param Shavak DL GPU Supercomputing system, designed to accelerate training and development of deep learning models, computer vision, and compute-intensive simulations.",
    icon: Monitor,
    tone: "tone-0",
  },
  {
    name: "Advanced Drone & UAV Lab",
    desc: "A dedicated aeronautical innovation center supporting multi-rotor assembly, autonomous flight path programming, payload testing, and drone regulations research.",
    icon: Plane,
    tone: "tone-1",
  },
  {
    name: "Makers & 3D Prototyping Lab",
    desc: "Spacious fabrication space outfitted with high-precision Laser Cutting machines, FDM & Resin 3D Printers, Vinyl Cutters, and rapid PoC assembly workbenches.",
    icon: Layers,
    tone: "tone-2",
  },
  {
    name: "Design & IoT Tinkering Lab",
    desc: "Dedicated hardware benches with oscilloscope suites, microcontrollers (ESP32, STM32, Arduino, Raspberry Pi), sensor arrays, and soldering stations.",
    icon: Cpu,
    tone: "tone-3",
  },
  {
    name: "Anviksha Co-Working Hub",
    desc: "Ergonomic, high-speed furnished workstation suites and private conference booths tailored for incubated student founders and early-stage startup teams.",
    icon: BookOpen,
    tone: "tone-0",
  },
  {
    name: "Surjan Open Collaboration Arena",
    desc: "A vibrant open-air campus amphitheater and amphitheater pod designed for casual brainstorming, startup meetups, pitch practice, and peer ideation.",
    icon: Sparkles,
    tone: "tone-1",
  },
];

function About() {
  const [team, setTeam] = useState("Board of Directors");
  const [slide, setSlide] = useState(0);

  const members = teams[team] ?? [];
  const pageSize = 3;
  const visible = members.slice(slide, slide + pageSize);

  return (
    <>
      <PageHero
        badge="About GUIITAR Council"
        title="GU Incubation Innovation Technology and Applied Research"
        text="GU Incubation Innovation Technology and Applied Research (GUIITAR) Council has been established by GSFC University (GSFCU) at Vadodara, dedicated to promoting and supporting creativity, innovation and the spirit of enterprise among young minds and innovators. GUIITAR Council is registered under section 8 of the Companies Act, 2013."
      />

      {/* INSTITUTIONAL COMMITMENT & ECOSYSTEM CALLOUT */}
      <section style={{ padding: "40px 0 0", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)",
              borderRadius: "22px",
              padding: "36px 32px",
              color: "#ffffff",
              boxShadow: "0 16px 36px -8px rgba(30, 64, 175, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Building2 className="w-7 h-7" />
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#93c5fd",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Our Institutional Commitment
              </span>
              <p
                style={{
                  fontSize: "15.5px",
                  lineHeight: "1.65",
                  color: "#ffffff",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                GUIITAR Council is committed to nurturing and developing startups through shared
                resources, Infrastructure, cutting-edge laboratories, tailored mentorship, extended
                networking and other standard services such as Co-working space, Equipment, Business
                support, and Intellectual Property Protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL POLICY DOCUMENTS */}
      <section style={{ padding: "28px 0 0", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {/* STARTUP POLICY CARD */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                }}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      background: "rgba(37, 99, 235, 0.08)",
                      color: "#2563eb",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Official Policy Document
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      background: "var(--surface-muted, #f1f5f9)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    12 Pages • PDF
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "19px",
                    fontWeight: 800,
                    color: "var(--text)",
                    margin: "0 0 8px",
                    lineHeight: "1.3",
                  }}
                >
                  GUIITAR Startup Policy &amp; Procedures
                </h3>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-muted)",
                    margin: 0,
                    lineHeight: "1.55",
                  }}
                >
                  Comprehensive Standard Operating Procedures (SOP) governing eligibility, 4 incubation stages (Spark-up, Grooming, Incubation, Graduation), seed loan assistance, lab infrastructure access, and grant funding norms.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-light, #e2e8f0)",
                }}
              >
                <a
                  href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Startup Policy</span>
                </a>
                <a
                  href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
                  download="GUIITAR_Startup_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* IPR POLICY CARD */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #10b981, #06b6d4)",
                }}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      background: "rgba(16, 185, 129, 0.08)",
                      color: "#059669",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    GSFC University IPR Policy
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      background: "var(--surface-muted, #f1f5f9)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Version-01 • 46 Pages • PDF
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "19px",
                    fontWeight: 800,
                    color: "var(--text)",
                    margin: "0 0 8px",
                    lineHeight: "1.3",
                  }}
                >
                  Intellectual Property Rights (IPR) Policy
                </h3>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-muted)",
                    margin: 0,
                    lineHeight: "1.55",
                  }}
                >
                  Structured framework for patents, designs, trademarks, and copyright protection with a 70:30 net revenue sharing model in favor of inventors, IDF filing protocols, and NDA frameworks.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-light, #e2e8f0)",
                }}
              >
                <a
                  href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#059669", borderColor: "#059669" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View IPR Policy</span>
                </a>
                <a
                  href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf"
                  download="GSFCU_IPR_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* BOOK PROTOTYPING LAB & TESTING FACILITIES CARD */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #f59e0b, #ea580c)",
                }}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      background: "rgba(245, 158, 11, 0.1)",
                      color: "#d97706",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Prototyping Labs &amp; Testing
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      background: "var(--surface-muted, #f1f5f9)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Online Booking • Form
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "19px",
                    fontWeight: 800,
                    color: "var(--text)",
                    margin: "0 0 8px",
                    lineHeight: "1.3",
                  }}
                >
                  Book Prototyping Lab &amp; Facilities
                </h3>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-muted)",
                    margin: 0,
                    lineHeight: "1.55",
                  }}
                >
                  Requisition testing slots for Param Shavak Supercomputing cluster, Advanced Drone UAV proving arena, 3D Prototyping &amp; Makers Lab, and IoT workbenches.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-light, #e2e8f0)",
                }}
              >
                <a
                  href="https://forms.gle/EM81FwAN5i4S3FmcA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#d97706", borderColor: "#d97706" }}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Book Lab Slot</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <ButtonLink
                  to="/innovation"
                  variant="outline"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Explore Facilities
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section>
        <div className="container">
          <div className="grid-2">
            <article className="mission-card vision">
              <span
                className="section-badge"
                style={{ color: "#d97706", borderColor: "rgba(245, 158, 11, 0.3)" }}
              >
                Our Horizon
              </span>
              <h2>VISION</h2>
              <p>
                To nurture young minds by providing a platform to explore and showcase their
                potential, along with the generation of high added value, with a focus on innovation
                as well as marketing of technologies for the betterment of the Scientific,
                Engineering, Science &amp; Management Communities and the Society.
              </p>
            </article>

            <article className="mission-card">
              <span className="section-badge">Our Purpose</span>
              <h2>MISSION</h2>
              <p>
                To produce success stories in innovations and startups that will make the young
                minds confident, freestanding and financially viable.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Strategic Goals"
            title="OBJECTIVES"
            subtitle="The foundational pillars that guide our daily operations, incubation curriculum, and grant disbursement processes."
          />
          <div className="objective-list">
            {objectives.map((x, i) => (
              <div className="objective-item" key={x}>
                <span>{i + 1}</span>
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 THRUST AREAS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Focus Domains"
            title="THRUST AREA"
            subtitle="GUIITAR Council prioritizes interdisciplinary research and startup incubation across 13 high-impact sectors."
          />
          <div className="thrust-grid">
            {thrust.map(([name, Icon]) => (
              <div className="thrust-item" key={name}>
                <div className="thrust-icon-box">
                  <Icon />
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP MESSAGES */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Guiding Vision"
            title="Message from Leadership"
            subtitle="Insights and encouragement from the visionary leaders steering GSFC University and GUIITAR Council."
          />
          <div className="grid-2">
            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Create an environment of excellence through innovation for you will forever be
                remembered for your contribution to the world. Innovation is a journey in which you
                have to say no to thousands of things which already exist while embracing the
                one which is yet to come.
              </p>
              <div className="leader-footer">
                <img
                  src="/leaders/pk-taneja.png"
                  alt="Shri P. K. Taneja, IAS (Retd.)"
                  className="leader-avatar-photo"
                  width={68}
                  height={68}
                  loading="lazy"
                />
                <div className="leader-info">
                  <span className="leader-desk-badge">Message from President's Desk</span>
                  <h3>Shri P. K. Taneja, IAS (Retd.)</h3>
                  <p>President, GSFC University & Director, GUIITAR Council</p>
                </div>
              </div>
            </article>

            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Innovation is not to repeat a success story but to celebrate a failure. Pick-up and
                never Give-up is an attitude towards innovation.
              </p>
              <div className="leader-footer">
                <img
                  src="/leaders/gr-sinha.png"
                  alt="Dr G R Sinha"
                  className="leader-avatar-photo"
                  width={68}
                  height={68}
                  loading="lazy"
                />
                <div className="leader-info">
                  <span className="leader-desk-badge">Message from Provost's Desk</span>
                  <h3>Dr G R Sinha</h3>
                  <p>Provost, GSFC University & CEO, GUIITAR Council</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GUIITAR COUNCIL TEAM HIERARCHY / ORG CHART */}
      <section style={{ padding: "60px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <SectionTitle
            badge="Institutional Structure"
            title="GUIITAR COUNCIL TEAM"
            subtitle="The official leadership hierarchy and operational council overseeing incubation programs, School of Technology, School of Science, and School of Management & Economics."
          />

          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto 40px",
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "28px 24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                borderBottom: "1px solid var(--border-light, #f1f5f9)",
                paddingBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                    Official Team Organizational Chart
                  </h4>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    President • Provost &amp; CEO • Core Team • SoT • SoS • SoM&amp;E
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <a
                  href="/team/guiitar-council-team-hierarchy.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Full Image</span>
                </a>
                <a
                  href="/team/guiitar-council-team-hierarchy.png"
                  download="GUIITAR_Council_Team_Hierarchy.png"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Chart</span>
                </a>
              </div>
            </div>

            {/* Exact Team Hierarchy Chart Image */}
            <div
              style={{
                width: "100%",
                background: "#ffffff",
                borderRadius: "16px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/team/guiitar-council-team-hierarchy.png"
                alt="GUIITAR Council Team Organizational Hierarchy Chart"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCE & TEAM */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Leadership & Mentors"
            title="Council Directory & Profiles"
            subtitle="Explore detailed profiles, responsibilities, and research domains across the council leadership."
          />

          <div className="tabs">
            {Object.keys(teams).map((tabName) => (
              <button
                key={tabName}
                className={`tab ${team === tabName ? "active" : ""}`}
                onClick={() => {
                  setTeam(tabName);
                  setSlide(0);
                }}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className="team-wrap">
            <button
              aria-label="Previous team members"
              className="slide-btn"
              disabled={slide === 0}
              style={{ opacity: slide === 0 ? 0.3 : 1 }}
              onClick={() => setSlide(Math.max(0, slide - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="team-grid">
              {visible.map(([n, t, desc]) => {
                const leaderPhotos: Record<string, string> = {
                  "Shri P. K. Taneja, IAS (Retd.)": "/leaders/pk-taneja.png",
                  "Prof. G. R. Sinha": "/leaders/gr-sinha.png",
                  "Dr G R Sinha": "/leaders/gr-sinha.png",
                };
                const photo = leaderPhotos[n];

                return (
                  <article className="team-card" key={n}>
                    {photo ? (
                      <img
                        src={photo}
                        alt={n}
                        className="avatar"
                        style={{ objectFit: "cover", border: "2px solid #3b82f6" }}
                        width={56}
                        height={56}
                        loading="lazy"
                      />
                    ) : (
                      <div className="avatar">
                        {n
                          .split(" ")
                          .filter((x) => x.length > 2 && !x.includes("Dr.") && !x.includes("Mr."))
                          .slice(0, 2)
                          .map((x) => x[0])
                          .join("") || "GC"}
                      </div>
                    )}
                    <h3>{n}</h3>
                    <p>{t}</p>
                    {desc && (
                      <span
                        style={{
                          fontSize: "12.5px",
                          color: "#64748b",
                          display: "block",
                          marginBottom: "16px",
                        }}
                      >
                        {desc}
                      </span>
                    )}
                    <div className="team-socials">
                      <a
                        href="https://www.linkedin.com/company/guiitarcouncil/posts/?feedView=all"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GUIITAR Council LinkedIn"
                        title="GUIITAR Council LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              aria-label="Next team members"
              className="slide-btn"
              disabled={slide + pageSize >= members.length}
              style={{ opacity: slide + pageSize >= members.length ? 0.3 : 1 }}
              onClick={() => setSlide(Math.min(members.length - pageSize, slide + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* STATE OF THE ART INFRASTRUCTURE */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Prototyping & Labs"
            title="State-of-the-Art Infrastructure"
            subtitle="Explore our advanced research laboratories, fabrication workshops, and computing suites available for incubated startups."
          />
          <div className="grid-2">
            {infra.map((item) => (
              <article className="infra-card" key={item.name}>
                <div className={`infra-badge-cover ${item.tone}`}>
                  <item.icon />
                  <span>{item.name}</span>
                </div>
                <div className="infra-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="center spaced" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="https://forms.gle/EM81FwAN5i4S3FmcA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>Book Lab Access (Google Form)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <ButtonLink to="/contact" size="lg" variant="outline">
              <span>Contact Incubation Desk</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
