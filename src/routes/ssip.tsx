import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lightbulb,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  FileSpreadsheet,
  FolderOpen,
  Sparkles,
  Zap,
  Cpu,
  Bot,
  Car,
  Recycle,
  Globe,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Building2,
  Calendar,
  Layers,
  ChevronDown,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";

export const Route = createFileRoute("/ssip")({
  head: () => ({
    meta: [
      { title: "Student Start-up & Innovation Policy (SSIP 2.0) — GUIITAR Council" },
      {
        name: "description",
        content:
          "Official SSIP 2.0 portal at GUIITAR Council, GSFC University. Access non-dilutive grants up to ₹2.5 Lakhs for proof-of-concept development, ₹75k domestic IPR support, official guidelines, and application links.",
      },
      {
        property: "og:title",
        content: "SSIP 2.0 — Student Start-up & Innovation Policy | GUIITAR Council",
      },
      {
        property: "og:description",
        content:
          "Government of Gujarat initiative to empower student innovators and startups with non-dilutive prototype grants, IPR facilitation, and state-of-the-art incubation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SSIPPage,
});

const SSIP_THRUST_AREAS = [
  {
    title: "Clean & Green Energy",
    desc: "Renewables, solar-thermal, hydrogen tech, and climate solutions towards India's net-zero 2070 pledge.",
    icon: Zap,
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    title: "Semiconductors & VLSI",
    desc: "Chip design, microelectronics, embedded architecture, and sensor fabrication breakthroughs.",
    icon: Cpu,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    title: "Robotics & Automation",
    desc: "Autonomous mobile robots, industrial automation, drones, and smart mechatronic assemblies.",
    icon: Bot,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    title: "Electric Vehicles (EV)",
    desc: "Battery management systems (BMS), motor controllers, fast charging, and lightweight EV components.",
    icon: Car,
    color: "#0284c7",
    bg: "#f0f9ff",
  },
  {
    title: "Waste Management & Circularity",
    desc: "Plastic alternatives, industrial sludge upcycling, agricultural residue valorization, and zero-waste tech.",
    icon: Recycle,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    title: "AI, ML & IoT Systems",
    desc: "Predictive analytics, computer vision, smart edge computing, and industrial IoT monitoring.",
    icon: Sparkles,
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    title: "Sector-Agnostic Innovations",
    desc: "Healthcare, biotechnology, agri-tech, advanced materials, fintech, and novel consumer solutions.",
    icon: Globe,
    color: "#db2777",
    bg: "#fdf2f8",
  },
];

const SSIP_MISSIONS = [
  {
    num: "01",
    title: "Student-Centric Incubation Ecosystem",
    desc: "Create a vibrant, hands-on innovation and incubation ecosystem across higher education academia.",
  },
  {
    num: "02",
    title: "Multi-Tier Ecosystems",
    desc: "Establish innovation infrastructure across all levels: Schools (Class 9-12), Institutes, and Universities.",
  },
  {
    num: "03",
    title: "Functional University Incubators",
    desc: "Develop and scale fully operational technology business incubators across universities in Gujarat.",
  },
  {
    num: "04",
    title: "Mind-to-Market Commercialization",
    desc: "Scout and nurture innovations to deliver maximum real-world value to industry, society, and the State.",
  },
  {
    num: "05",
    title: "Institutional Capacity & Mentorship",
    desc: "Build internal capacity of educational institutions and strengthen structured 1-on-1 mentor networks.",
  },
  {
    num: "06",
    title: "IPR Awareness & Patent Grants",
    desc: "Promote intellectual property awareness, prior-art search mechanisms, and filing reimbursements.",
  },
  {
    num: "07",
    title: "Common Digital Governance",
    desc: "Operate a transparent digital tracking platform for seamless application, review, and milestone disbursals.",
  },
  {
    num: "08",
    title: "Integrated KPI Analytics",
    desc: "Measure quantifiable outcomes through predetermined Key Performance Indicators for continuous progress.",
  },
  {
    num: "09",
    title: "Sunrise & Disruptive Technologies",
    desc: "Target high-growth frontier sectors including semiconductors, robotics, green hydrogen, and AI.",
  },
  {
    num: "10",
    title: "Best-Practice Interventions",
    desc: "Formulate policy mandates from empirical learnings to fast-track prototype-to-enterprise journeys.",
  },
  {
    num: "11",
    title: "Gujarat Startup Evolution",
    desc: "Accelerate Gujarat’s startup ecosystem through emergence, activation, integration, and maturity.",
  },
];

const SSIP_BENEFITS = [
  {
    title: "Proof of Concept (PoC) Grant",
    grant: "Up to ₹2,50,000",
    badge: "For Higher Ed / Alumni",
    desc: "Financial grant per innovative project to procure raw materials, fabricate working prototypes, conduct lab trials, and build minimum viable products (MVPs).",
    points: [
      "100% non-dilutive — zero equity surrender required",
      "Direct milestone disbursal based on verifiable progress",
      "Full coverage for testing, tooling, and component sourcing",
    ],
    accent: "blue",
  },
  {
    title: "School Level Innovation Support",
    grant: "Up to ₹20,000",
    badge: "Class 9 to 12",
    desc: "Encouraging early-stage tinkering, STEM projects, and creative scientific inventions for school-level innovators across foundational and secondary education.",
    points: [
      "Tinkering lab support & consumable procurement",
      "University faculty mentorship & guided lab tours",
      "Fast-track review by student incubation cell",
    ],
    accent: "emerald",
  },
  {
    title: "Domestic IPR & Patent Support",
    grant: "Average ₹75,000",
    badge: "Per Filing",
    desc: "End-to-end patenting, design registration, and trademark assistance through empaneled IP attorneys and patent examiners.",
    points: [
      "Prior-art search, patent drafting & provisional filing",
      "Coverage of statutory government filing fees",
      "Protection of student & institutional intellectual property",
    ],
    accent: "orange",
  },
  {
    title: "Incubation Infrastructure & Labs",
    grant: "Free Access",
    badge: "Ecosystem Perks",
    desc: "Comprehensive access to GSFC University engineering labs, wet-chemistry suites, 3D printing stations, Param Shavak supercompute, and co-working spaces.",
    points: [
      "High-performance compute & CAD workstation access",
      "Industry mentor clinics and legal consultation",
      "Travel subsidies for hackathons and demo days",
    ],
    accent: "purple",
  },
];

const SSIP_DOCS = [
  {
    title: "SSIP 2.0 PoC / Prototype Application Form",
    type: "Google Form",
    tag: "Online Application",
    url: "https://forms.gle/NcBxPA97S1jvkxE17",
    icon: FileText,
    desc: "Direct submission form to pitch your proof-of-concept for up to ₹2.5 Lakhs SSIP 2.0 grant support.",
    primary: true,
  },
  {
    title: "SSIP IPR & Patent Support Application",
    type: "Google Form",
    tag: "IP Intake",
    url: "https://forms.gle/sUvSDHDubWQVdLHi8",
    icon: ShieldCheck,
    desc: "Apply for patent search, attorney drafting, and domestic IPR filing grant assistance.",
    primary: true,
  },
  {
    title: "SSIP Approved PoC / Prototype Directory",
    type: "Spreadsheet",
    tag: "Public Directory",
    url: "https://docs.google.com/spreadsheets/d/1IIHQyvxN0XNBtMGctU2yRD826zVSxbx3/edit?usp=sharing&ouid=106640023809987366179&rtpof=true&sd=true",
    icon: FileSpreadsheet,
    desc: "Official roster of approved innovation projects and sanction disbursals under GUIITAR SSIP Cell.",
    primary: false,
  },
  {
    title: "SSIP Process, Policy & Guidelines Repository",
    type: "Google Drive Folder",
    tag: "Official Documentation",
    url: "https://drive.google.com/drive/folders/1EspgxXUoavBlETSnxstEfpMGsI_fCFma",
    icon: FolderOpen,
    desc: "Download complete SSIP 2.0 policy manual, expenditure norms, reporting formats, and evaluation rubrics.",
    primary: false,
  },
  {
    title: "Official Gujarat State SSIP 2.0 Portal",
    type: "State Government Website",
    tag: "Government Portal",
    url: "http://www.ssipgujarat.in/",
    icon: Globe,
    desc: "Central State portal by the Education Department, Government of Gujarat.",
    primary: false,
  },
];

const SSIP_FAQS = [
  {
    q: "What is SSIP 2.0 and who administers it at GSFC University?",
    a: "SSIP 2.0 (Student Start-up & Innovation Policy 2022–2027) is a flagship initiative of the Education Department, Government of Gujarat. At GSFC University, it is implemented and managed by GUIITAR Council (a registered Section 8 non-profit incubation council).",
  },
  {
    q: "Do I have to give away equity or repay the grant?",
    a: "No. SSIP 2.0 grants are 100% non-dilutive. You do not surrender any equity or shares in your company, and it is not a loan. The funding is intended to support prototyping, testing, raw material acquisition, and intellectual property protection.",
  },
  {
    q: "Who is eligible to apply for SSIP 2.0 grant support?",
    a: "Any person up to 35 years of age who is: (1) A school student from Class 9 to 12; (2) A Diploma, Vocational, Undergraduate, Postgraduate, or PhD scholar; (3) An alumna/alumnus of an educational institution; or (4) A school/college dropout with an innovative, scalable product or process.",
  },
  {
    q: "What expenses are covered under the ₹2.5 Lakhs PoC grant?",
    a: "Eligible expenses include raw materials, specialized electronic/mechanical components, 3D printing & machining costs, lab testing & characterization fees, cloud/server compute charges, and fabrication tooling directly needed to build the functional MVP.",
  },
  {
    q: "How does the evaluation and approval process work?",
    a: "After online submission, projects undergo an initial technical desk review followed by a presentation before the Institutional Screening Committee (ISC) comprising industry veterans, patent experts, and faculty mentors. Sanctions are approved based on technical novelty, feasibility, and market relevance.",
  },
  {
    q: "How are grant tranches disbursed?",
    a: "Grant amounts are disbursed in milestone-based tranches. The initial advance is released for raw materials, and subsequent tranches are unlocked upon submitting component purchase vouchers, utilization certificates, and functional milestone demonstrations.",
  },
];

export function SSIPPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "eligibility" | "missions" | "docs">("overview");

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        badge="Govt. of Gujarat Initiative • 2022 – 2027"
        title="Student Start-up & Innovation Policy (SSIP 2.0)"
        text="Empowering student innovators, researchers, and early-stage founders with non-dilutive prototype grants up to ₹2.5 Lakhs, IPR patent funding, mentorship, and high-tech incubation at GUIITAR Council."
      >
        {/* KEY HIGHLIGHT METRICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginTop: "32px",
            marginBottom: "24px",
            width: "100%",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              padding: "18px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#1e40af" }}>₹2.50 Lakhs</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Max PoC / Prototype Grant
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              padding: "18px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#ea580c" }}>₹75,000</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Avg. Domestic IPR Grant
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              padding: "18px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#059669" }}>100%</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Non-Dilutive / 0% Equity
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              padding: "18px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#7c3aed" }}>Up to 35 Yrs</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Age Eligibility Window
            </div>
          </div>
        </div>

        <div className="button-row" style={{ marginTop: "12px" }}>
          <a
            href="https://forms.gle/NcBxPA97S1jvkxE17"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Apply for PoC Grant</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://forms.gle/sUvSDHDubWQVdLHi8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Apply for IPR Support</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://docs.google.com/spreadsheets/d/1IIHQyvxN0XNBtMGctU2yRD826zVSxbx3/edit?usp=sharing&ouid=106640023809987366179&rtpof=true&sd=true"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Approved PoC List</span>
            <FileSpreadsheet className="w-4 h-4" />
          </a>
        </div>
      </PageHero>

      {/* POLICY VISION & MISSION SPOTLIGHT */}
      <section style={{ padding: "64px 0", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)",
              borderRadius: "24px",
              padding: "40px",
              color: "#ffffff",
              boxShadow: "0 20px 40px -10px rgba(30, 64, 175, 0.25)",
              marginBottom: "48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1, maxWidth: "850px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.2)",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "16px",
                }}
              >
                SSIP 2.0 Vision Statement
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 3.5vw, 30px)",
                  fontWeight: 900,
                  lineHeight: "1.4",
                  marginBottom: "16px",
                  color: "#ffffff",
                }}
              >
                &ldquo;Empowering the young population of the State to unlock their creative
                potential through Startup and Innovation to enable them to contribute to sustainable
                development and inclusive growth towards the realisation of Aatmanirbhar
                Gujarat.&rdquo;
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  fontSize: "13.5px",
                  color: "#bfdbfe",
                  marginTop: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    <strong>Tenure:</strong> January 11, 2022 to March 31, 2027
                  </span>
                </div>
                <div>•</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Building2 className="w-4 h-4" />
                  <span>
                    <strong>Executing Body:</strong> GUIITAR Council, GSFC University
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB CONTROLS */}
          <div className="tabs" style={{ marginBottom: "36px" }}>
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Benefits & Funding
            </button>
            <button
              className={`tab ${activeTab === "eligibility" ? "active" : ""}`}
              onClick={() => setActiveTab("eligibility")}
            >
              Eligibility & Thrust Areas
            </button>
            <button
              className={`tab ${activeTab === "missions" ? "active" : ""}`}
              onClick={() => setActiveTab("missions")}
            >
              11 Core Mission Pillars
            </button>
            <button
              className={`tab ${activeTab === "docs" ? "active" : ""}`}
              onClick={() => setActiveTab("docs")}
            >
              Official Links & Forms
            </button>
          </div>

          {/* TAB 1: BENEFITS & FUNDING BREAKDOWN */}
          {activeTab === "overview" && (
            <div>
              <SectionTitle
                badge="Grant Breakdown"
                title="Financial Assistance & Incubation Privileges"
                subtitle="Explore direct monetary support, lab access, patent subsidies, and zero-equity terms available under SSIP 2.0."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginTop: "32px",
                }}
              >
                {SSIP_BENEFITS.map((item) => {
                  const borderCol =
                    item.accent === "blue"
                      ? "#bfdbfe"
                      : item.accent === "emerald"
                      ? "#a7f3d0"
                      : item.accent === "orange"
                      ? "#fed7aa"
                      : "#e9d5ff";
                  const badgeBg =
                    item.accent === "blue"
                      ? "#eff6ff"
                      : item.accent === "emerald"
                      ? "#ecfdf5"
                      : item.accent === "orange"
                      ? "#fff7ed"
                      : "#faf5ff";
                  const badgeText =
                    item.accent === "blue"
                      ? "#1e40af"
                      : item.accent === "emerald"
                      ? "#047857"
                      : item.accent === "orange"
                      ? "#c2410c"
                      : "#7e22ce";

                  return (
                    <div
                      key={item.title}
                      style={{
                        background: "var(--card)",
                        borderRadius: "20px",
                        border: `1px solid var(--border)`,
                        padding: "32px 26px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              background: badgeBg,
                              border: `1px solid ${borderCol}`,
                              color: badgeText,
                            }}
                          >
                            {item.badge}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: "26px",
                            fontWeight: 900,
                            color: badgeText,
                            marginBottom: "8px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {item.grant}
                        </div>

                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: 800,
                            color: "var(--foreground)",
                            marginBottom: "10px",
                          }}
                        >
                          {item.title}
                        </h3>

                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: "var(--muted-foreground)",
                            marginBottom: "20px",
                          }}
                        >
                          {item.desc}
                        </p>

                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {item.points.map((pt, idx) => (
                            <li
                              key={idx}
                              style={{
                                fontSize: "13px",
                                color: "var(--foreground)",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                              }}
                            >
                              <CheckCircle2
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: badgeText, marginTop: "2px" }}
                              />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4-STAGE MIND-TO-MARKET TIMELINE */}
              <div
                style={{
                  background: "var(--muted-bg, #f8fafc)",
                  borderRadius: "20px",
                  padding: "36px 30px",
                  border: "1px solid var(--border)",
                  marginTop: "48px",
                }}
              >
                <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 32px" }}>
                  <span className="pill blue" style={{ marginBottom: "8px" }}>
                    Standard Operating Procedure
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 900 }}>The SSIP 2.0 Journey: Mind to Market</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
                    How student innovators transition from raw laboratory hypotheses to funded prototypes.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                  }}
                >
                  <div
                    style={{
                      background: "var(--card)",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#1e40af",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      1
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>
                      Online Intake
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>
                      Submit your innovation proposal, problem statement, technical bill of materials, and budget estimate via Google Form.
                    </p>
                  </div>

                  <div
                    style={{
                      background: "var(--card)",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#059669",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      2
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>
                      ISC Committee Review
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>
                      Present your prototype design before the Institutional Screening Committee (ISC) and external industry evaluators.
                    </p>
                  </div>

                  <div
                    style={{
                      background: "var(--card)",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#ea580c",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      3
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>
                      Sanction & Fabrication
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>
                      Receive formal grant sanction, gain lab/machinery access, and build functional prototypes with milestone advances.
                    </p>
                  </div>

                  <div
                    style={{
                      background: "var(--card)",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#7c3aed",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      4
                    </div>
                    <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>
                      IP Filing & Scale-up
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>
                      File domestic patents with ₹75k IPR support, graduate to Nodal Institute seed funding up to ₹30L, and launch commercial trials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY & THRUST AREAS */}
          {activeTab === "eligibility" && (
            <div>
              <SectionTitle
                badge="Who Can Apply"
                title="Eligibility Criteria & Thrust Areas"
                subtitle="SSIP 2.0 covers school tinkerers to PhD researchers up to 35 years old across key sunrise sectors and sector-agnostic ideas."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "24px",
                  marginTop: "32px",
                  marginBottom: "48px",
                }}
              >
                {/* ELIGIBILITY CARD */}
                <div
                  style={{
                    background: "var(--card)",
                    borderRadius: "20px",
                    border: "1px solid var(--border)",
                    padding: "32px 28px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "#eff6ff",
                        color: "#1e40af",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0 }}>
                      Eligibility Criteria
                    </h3>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#2563eb" }} />
                      <span>
                        <strong>Age Limit:</strong> Any individual or team member up to the age of <strong>35 years</strong>.
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#2563eb" }} />
                      <span>
                        <strong>School Students:</strong> Foundational, Preparatory, Middle, or Secondary levels (up to Class 12).
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#2563eb" }} />
                      <span>
                        <strong>Higher Education:</strong> Diploma, Vocational, Undergraduate (B.Tech, B.Sc, BBA, BCA), Postgraduate (M.Tech, M.Sc, MBA), or Doctoral (PhD) scholars.
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#2563eb" }} />
                      <span>
                        <strong>Alumni & Dropouts:</strong> Recent alumni or dropouts of recognized schools, institutes, or universities with a verifiable innovation.
                      </span>
                    </li>
                  </ul>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#475569",
                    }}
                  >
                    💡 <strong>Core Requirement:</strong> The innovation must contribute to the development or improvement of a product, process, or service, or represent a scalable business model capable of generating employment or wealth.
                  </div>
                </div>

                {/* POLICY SCOPE CARD */}
                <div
                  style={{
                    background: "var(--card)",
                    borderRadius: "20px",
                    border: "1px solid var(--border)",
                    padding: "32px 28px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "#ecfdf5",
                        color: "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0 }}>
                      Scope & Sectors
                    </h3>
                  </div>

                  <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "16px" }}>
                    While SSIP 2.0 maintains a dedicated focus on national climate goals (net-zero by 2070) and high-tech sunrise domains, the policy is <strong>strictly sector-agnostic</strong>.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#059669" }} />
                      <span>Clean & Green Energy & Climate Resilience</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb" }} />
                      <span>Semiconductors, Chips & Embedded Hardware</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7c3aed" }} />
                      <span>Robotics, Drones & Smart Industrial Automation</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ea580c" }} />
                      <span>Electric Mobility, Battery Tech & Smart Charging</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#db2777" }} />
                      <span>BioTech, AgriTech, MedTech & Advanced Materials</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* THRUST AREAS GRID */}
              <h3 style={{ fontSize: "20px", fontWeight: 900, marginBottom: "18px" }}>
                Thrust Areas in Focus
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                }}
              >
                {SSIP_THRUST_AREAS.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.title}
                      style={{
                        background: "var(--card)",
                        padding: "24px 20px",
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: area.bg,
                          color: area.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>
                        {area.title}
                      </h4>
                      <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5", margin: 0 }}>
                        {area.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 11 CORE MISSIONS */}
          {activeTab === "missions" && (
            <div>
              <SectionTitle
                badge="Policy Directives"
                title="11 Strategic Mission Objectives"
                subtitle="The foundational mandates established by the Government of Gujarat to transform higher education into a powerhouse of innovation."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                  marginTop: "32px",
                }}
              >
                {SSIP_MISSIONS.map((m) => (
                  <div
                    key={m.num}
                    style={{
                      background: "var(--card)",
                      borderRadius: "16px",
                      border: "1px solid var(--border)",
                      padding: "24px 20px",
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: "#1e40af",
                        background: "#eff6ff",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {m.num}
                    </span>
                    <div>
                      <h4 style={{ fontSize: "15.5px", fontWeight: 800, margin: "0 0 6px 0" }}>
                        {m.title}
                      </h4>
                      <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.55", margin: 0 }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL LINKS & DOCUMENTATION */}
          {activeTab === "docs" && (
            <div>
              <SectionTitle
                badge="Intake & Documentation"
                title="Official Application Links & Repositories"
                subtitle="Direct links to online application forms, approved project registries, and state government guideline repositories."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  marginTop: "32px",
                }}
              >
                {SSIP_DOCS.map((doc) => {
                  const DocIcon = doc.icon;
                  return (
                    <div
                      key={doc.title}
                      style={{
                        background: "var(--card)",
                        borderRadius: "18px",
                        border: doc.primary ? "1.5px solid #3b82f6" : "1px solid var(--border)",
                        padding: "26px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: doc.primary ? "0 8px 24px -4px rgba(59, 130, 246, 0.15)" : "none",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "14px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "10px",
                              background: doc.primary ? "#eff6ff" : "#f1f5f9",
                              color: doc.primary ? "#1e40af" : "#475569",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <DocIcon className="w-5 h-5" />
                          </div>

                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              background: doc.primary ? "#eff6ff" : "#f1f5f9",
                              color: doc.primary ? "#1e40af" : "#64748b",
                            }}
                          >
                            {doc.tag}
                          </span>
                        </div>

                        <h4 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px 0" }}>
                          {doc.title}
                        </h4>

                        <p
                          style={{
                            fontSize: "13.5px",
                            color: "var(--muted-foreground)",
                            lineHeight: "1.5",
                            marginBottom: "20px",
                          }}
                        >
                          {doc.desc}
                        </p>
                      </div>

                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${doc.primary ? "btn-primary" : "btn-outline"} btn-sm`}
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>Access {doc.type}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* INTERNAL SUBMISSION CALLOUT */}
              <div
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  border: "1px solid #86efac",
                  borderRadius: "18px",
                  padding: "28px 24px",
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#166534", margin: "0 0 4px 0" }}>
                    Prefer submitting directly through GUIITAR Council portal?
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "#15803d", margin: 0 }}>
                    You can also submit your startup idea, prototype deck, or incubation application directly to our online intake system.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <ButtonLink to="/submit-idea" size="sm" variant="primary">
                    <span>Submit Innovation Idea</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ButtonLink>
                  <ButtonLink to="/apply" size="sm" variant="outline">
                    <span>Incubation Application</span>
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="section-muted">
        <div className="container" style={{ maxWidth: "880px" }}>
          <SectionTitle
            badge="Frequently Asked Questions"
            title="SSIP 2.0 Grants & Policy Queries"
            subtitle="Common questions regarding equity terms, allowable expenses, disbursement timelines, and eligibility."
            align="center"
          />

          <Accordion items={SSIP_FAQS} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Ready to Build?</span>
          <h2>Convert Your Academic Project into a Scalable Venture</h2>
          <p>
            Visit the SSIP Cell at GUIITAR Council, 2nd Floor Anviksha Building, GSFC University,
            or speak directly with our incubation team for guidance on your proposal.
          </p>
          <div className="button-row">
            <a
              href="https://forms.gle/NcBxPA97S1jvkxE17"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                background: "#ffffff",
                color: "#1e3a8a",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Apply for SSIP 2.0 Grant</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/funding" size="lg" variant="glass">
              <span>View All Funding Schemes</span>
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Contact SSIP Desk</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
