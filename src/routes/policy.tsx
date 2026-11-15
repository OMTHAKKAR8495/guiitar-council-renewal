import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  ExternalLink,
  Layers,
  Scale,
  Award,
  Sparkles,
  ChevronDown,
  Building2,
  Banknote,
  Users,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/policy")({
  head: () => ({
    meta: [
      { title: "Official Startup Policy & Incubation SOP — GUIITAR Council" },
      {
        name: "description",
        content:
          "Official 4-stage incubation procedure (Spark-up, Grooming, Incubation, Graduation), seed loan terms, 18-month tenure rules, monthly reporting, and governance SOP at GUIITAR Council, GSFC University.",
      },
      { property: "og:title", content: "Official Startup Policy — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Standard Operating Procedures governing idea admission, technical screening, entity incorporation, milestone evaluation, and venture graduation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PolicyPage,
});

const FOUR_STAGES = [
  {
    stage: "Stage 1",
    name: "Spark-up (Idea Intake & Screening)",
    timeline: "Illustrative: Months 1–2 (Intake)",
    badge: "Evaluation & Intake",
    accent: "#2563eb",
    summary:
      "Intake of raw technological or business concepts, preliminary screening by the Technical Screening Committee, and formal admission into the GUIITAR ecosystem.",
    keySteps: [
      "Submission of formal innovation proposal / idea application through online portal.",
      "Evaluation based on technical novelty, feasibility, commercial sustainability, and societal impact.",
      "Business proposal formulation and milestone scoping.",
      "Formal presentation before the Technical Screening Committee & University Startup Committee.",
      "Execution of the preliminary Stage 1 Pre-Incubation Agreement with GUIITAR Council.",
    ],
    deliverables: "Validated Problem Statement, Technical Feasibility Report, Preliminary Project Milestone Plan.",
  },
  {
    stage: "Stage 2",
    name: "Grooming (PoC & Prototype Development)",
    timeline: "Illustrative: Months 2–6 (Post-Clearance)",
    badge: "Benchwork & Proof of Concept",
    accent: "#ea580c",
    summary:
      "Hands-on laboratory fabrication, hardware/software prototype construction, market customer discovery, and preparation for legal incorporation.",
    keySteps: [
      "Bench access to Makers Lab (3D printing, laser cutting), Supercomputer Lab, or IoT Tinkering facilities.",
      "Execution of prototype experimentation under appointed faculty and technical mentors.",
      "Rigorous market research, competitive benchmark analysis, and potential customer interviews.",
      "Detailed business plan development including unit economics and preliminary supply chain.",
      "Pilot test plan evaluation and preparation for angel investment / state seed grant pitch.",
      "Mandatory monthly progress report submission to GUIITAR Incubation Management.",
    ],
    deliverables: "Working Proof of Concept (PoC) / Alpha Prototype, Validated Business Plan, Monthly Progress Dossier.",
  },
  {
    stage: "Stage 3",
    name: "Incubation (Entity Incorporation & Scale)",
    timeline: "Illustrative: Months 6–18 (Post-Clearance)",
    badge: "Enterprise Acceleration",
    accent: "#059669",
    summary:
      "Formal legal entity registration, comprehensive incubation agreement execution, dedicated co-working allotment, pilot testing, and seed loan access.",
    keySteps: [
      "Mandatory entity incorporation (Private Limited Company, LLP, or registered partnership under Indian laws).",
      "Signing of the comprehensive Formal Incubation Agreement with GUIITAR Council.",
      "Allotment of dedicated co-working desks, meeting rooms, and high-speed network infrastructure.",
      "Application for seed loan / SSIP 2.0 / Nodal Institute grants (subject to fund availability and committee sanction).",
      "Corporate pilot deployments (such as industrial testing at GSFC Ltd facilities).",
      "Regular monthly progress reporting and quarterly review presentations before the Advisory Board.",
    ],
    deliverables: "Certificate of Incorporation, Registered Entity Bank Account, Beta Pilot Deployments, Statutory Compliance.",
  },
  {
    stage: "Stage 4",
    name: "Graduation (Milestone Exit & Scaling)",
    timeline: "Up to 18 Months post-Stage 1 clearance",
    badge: "Commercial Independence",
    accent: "#7c3aed",
    summary:
      "Formal exit and graduation from university incubation based on predetermined financial, market, or tenure completion milestones.",
    keySteps: [
      "Evaluation against official graduation and exit criteria under Section 3.4 (satisfying any one of the alternative milestones):",
      "• Alternative A: Raising external angel investment, venture capital funding, or commercial debt.",
      "• Alternative B: Achieving commercial revenue milestones, space independence, and establishing external corporate premises.",
      "• Alternative C: Completion of permitted incubation tenure (standard maximum of 18 months beginning from the date of Stage 1 clearance, with or without external capital).",
      "Required Settlement Actions: Clearance of physical premises/labs, settlement of any availed seed loans or dues, and execution of applicable IPR revenue sharing agreements.",
      "Transition into the GUIITAR Alumni Founder Network for ongoing mentorship and peer collaboration.",
    ],
    deliverables: "Incubation Completion Certificate, Independent Commercial Operations, Alumni Founder Roster Enrolment.",
  },
];

const POLICY_SECTIONS = [
  {
    title: "Eligibility Criteria",
    desc: "Open to enrolled students, alumni, faculty members, research scholars of GSFC University, as well as external grassroots innovators and registered early-stage technology startups across Gujarat.",
  },
  {
    title: "Permitted Incubation Tenure",
    desc: "The standard incubation tenure is 18 months from the date of clearing Stage 1 (Spark-up). Any extension beyond 18 months requires written justification and approval by the Board of Directors.",
  },
  {
    title: "Seed Loan & Capital Provisions",
    desc: "Seed loans and financial disbursements are subject to fund availability and committee recommendation. Admission into incubation DOES NOT guarantee automatic funding. Funding is strictly milestone-linked and disbursed in tranches.",
  },
  {
    title: "Mandatory Monthly Reporting",
    desc: "Incubatees in Stage 2 (Grooming) and Stage 3 (Incubation) must submit monthly technical and financial progress reports to evaluate milestones and continued incubation support.",
  },
  {
    title: "Infrastructure & Lab Permissions",
    desc: "Access to specialized equipment (Param Shavak GPU, SLA 3D printers, laser cutters, drone fields) is subject to lab safety clearance, booking through official channels, and pay-as-you-go material consumables billing.",
  },
  {
    title: "Conflict of Interest & Disclaimers",
    desc: "Innovators must formally disclose any academic, employment, or commercial conflict of interest. GSFC University and GUIITAR Council bear no commercial liability for product performance or financial debts of incubated companies.",
  },
];

export function PolicyPage() {
  const [activeTab, setActiveTab] = useState<"procedure" | "terms">("procedure");

  return (
    <>
      <PageHero
        badge="Official Institutional Governance"
        title="Official GUIITAR Startup Policy & Procedures"
        text="The authoritative standard operating procedure governing idea intake, technical screening, laboratory grooming, venture incubation, seed funding rules, and graduation milestones."
      >
        <div className="button-row">
          <a
            href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Download className="w-4 h-4" />
            <span>Download Official Policy PDF (12 Pages)</span>
          </a>
          <Link to="/resources" className="btn btn-outline btn-md">
            <span>Explore All Resources</span>
          </Link>
        </div>
      </PageHero>

      {/* STATUTORY HIGHLIGHTS BANNER */}
      <section style={{ padding: "36px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "#fff7ed",
              border: "1.5px solid #f97316",
              borderRadius: "18px",
              padding: "24px 28px",
              display: "flex",
              alignItems: "flex-start",
              gap: "18px",
              boxShadow: "0 6px 20px -4px rgba(249, 115, 22, 0.12)",
            }}
          >
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" style={{ marginTop: "2px" }} />
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px 0", color: "#9a3412" }}>
                Important Institutional Notice on Funding &amp; Procedures
              </h3>
              <p style={{ fontSize: "14px", color: "#7c2d12", margin: 0, lineHeight: 1.6 }}>
                Under official GUIITAR Council governance, funding (seed loans or grants) is <strong>never guaranteed upon admission</strong>. All capital assistance is strictly subject to institutional screening, statutory fund availability, and milestone verification. The 8-stage innovation roadmap displayed elsewhere is a visitor-friendly conceptual guide; the <strong>four-stage SOP below represents the officially binding legal procedure</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div className="tabs" style={{ marginBottom: "36px" }}>
            <button
              className={`tab ${activeTab === "procedure" ? "active" : ""}`}
              onClick={() => setActiveTab("procedure")}
            >
              Official 4-Stage Incubation Procedure
            </button>
            <button
              className={`tab ${activeTab === "terms" ? "active" : ""}`}
              onClick={() => setActiveTab("terms")}
            >
              Key Policy Rules &amp; Operational Regulations
            </button>
          </div>

          {/* TAB 1: FOUR STAGES */}
          {activeTab === "procedure" && (
            <div>
              <SectionTitle
                badge="Binding Institutional Process"
                title="The 4 Official Incubation Stages"
                subtitle="Source: Official GUIITAR Startup Policy and Procedures Document (Pages 3–5)."
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "32px" }}>
                {FOUR_STAGES.map((s, index) => (
                  <article
                    key={s.stage}
                    className="plain-card"
                    style={{
                      padding: "32px 28px",
                      borderRadius: "20px",
                      border: "1px solid var(--border-color, #e2e8f0)",
                      borderLeft: `6px solid ${s.accent}`,
                      background: "var(--card-bg, #ffffff)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            background: s.accent,
                            color: "#ffffff",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontWeight: 800,
                            fontSize: "12px",
                            textTransform: "uppercase",
                          }}
                        >
                          {s.stage}
                        </span>
                        <h3 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "var(--text)" }}>
                          {s.name}
                        </h3>
                      </div>
                      <span className="pill" style={{ fontSize: "12px", fontWeight: 700 }}>
                        <Clock className="w-3.5 h-3.5 inline mr-1" />
                        {s.timeline}
                      </span>
                    </div>

                    <p style={{ fontSize: "15px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "20px" }}>
                      {s.summary}
                    </p>

                    <div style={{ marginBottom: "20px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#64748b",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        Mandatory Operational Steps:
                      </span>
                      <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "var(--text)", lineHeight: 1.65 }}>
                        {s.keySteps.map((step, idx) => (
                          <li key={idx} style={{ marginBottom: "6px" }}>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        background: "var(--surface-muted, #f8fafc)",
                        padding: "14px 18px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-color, #e2e8f0)",
                        fontSize: "13px",
                      }}
                    >
                      <strong style={{ color: "#2563eb", marginRight: "6px" }}>Stage Deliverables:</strong>
                      <span>{s.deliverables}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: POLICY RULES */}
          {activeTab === "terms" && (
            <div>
              <SectionTitle
                badge="Operational Guidelines"
                title="Policy Definitions, Tenure &amp; Compliance"
                subtitle="Essential operational provisions extracted from the 12-page official policy."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "24px",
                  marginTop: "32px",
                }}
              >
                {POLICY_SECTIONS.map((sec) => (
                  <div
                    key={sec.title}
                    style={{
                      background: "var(--card-bg, #ffffff)",
                      padding: "26px",
                      borderRadius: "18px",
                      border: "1px solid var(--border-color, #e2e8f0)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <h4 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "var(--text)" }}>
                          {sec.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                        {sec.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DETAILED PDF VIEWER LINK */}
              <div
                style={{
                  marginTop: "40px",
                  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  borderRadius: "20px",
                  padding: "32px",
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px 0" }}>
                    Access Full 12-Page Policy Document
                  </h4>
                  <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", maxWidth: "600px" }}>
                    Covers complete articles on Intellectual Property assignments, seed loan repayment schedules, exit clauses, and University Startup Committee bylaws.
                  </p>
                </div>
                <a
                  href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light btn-md"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", color: "#0f172a", fontWeight: 800 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Policy (PDF)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

