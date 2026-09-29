import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  FileCheck,
  Sparkles,
  Zap,
  Globe,
  HelpCircle,
  Calendar,
  Layers,
  Banknote,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
  Percent,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";

export const Route = createFileRoute("/nodal-institute")({
  head: () => ({
    meta: [
      { title: "Nodal Institute — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Official Nodal Institute under Industries Commissionerate, Govt. of Gujarat. Access seed funding up to ₹30 Lakhs, monthly sustenance allowance up to ₹25k/mo, Pre-Series A up to ₹3 Crore from GVFL, and MSME interest subsidies.",
      },
      {
        property: "og:title",
        content: "Nodal Institute | GUIITAR Council — Govt. of Gujarat Recognized",
      },
      {
        property: "og:description",
        content:
          "Government of Gujarat recognized Nodal Institute supporting startups under Gujarat Industrial Policy with seed capital, sustenance, and acceleration grants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NodalInstitutePage,
});

const NODAL_INCENTIVES = [
  {
    title: "Seed Support Grant",
    grant: "Up to ₹30.00 Lakhs",
    badge: "Scale-Up Capital",
    desc: "Direct milestone-based fiscal assistance for registered startups to procure machinery, conduct pilot trials, manufacture product batches, and acquire initial customers.",
    points: [
      "Milestone-linked tranches verified by Nodal Committee",
      "Coverage for raw materials, testing, certifications & tools",
      "Zero institutional equity dilution on grant portion",
    ],
    accent: "emerald",
  },
  {
    title: "Founder Sustenance Allowance",
    grant: "Up to ₹25,000 / Month",
    badge: "Monthly Living Support",
    desc: "Monthly living stipend for 1 year to enable founders to focus 100% full-time on building their venture without personal financial distress.",
    points: [
      "₹20,000 per month (up to ₹2.40 Lakhs/year) for standard startups",
      "₹25,000 per month (up to ₹3.00 Lakhs/year) with ≥1 woman founder",
      "Disbursed directly to founder bank accounts on monthly review",
    ],
    accent: "purple",
  },
  {
    title: "Pre-Series A Funding (GVFL)",
    grant: "₹50 Lakhs to ₹3.00 Cr",
    badge: "Venture Equity",
    desc: "Institutional equity financing facilitated in partnership with Gujarat Venture Finance Limited (GVFL) for high-growth tech ventures scaling commercial operations.",
    points: [
      "Direct recommendation from GUIITAR Nodal Committee to GVFL",
      "Co-investment opportunities with angel syndicates & VCs",
      "Institutional validation and strategic board guidance",
    ],
    accent: "blue",
  },
  {
    title: "Social Impact Assistance",
    grant: "Up to ₹10.00 Lakhs",
    badge: "Impact Startups",
    desc: "Specialized fiscal grant for startups demonstrating significant, quantifiable positive impact on rural development, healthcare access, sanitation, or environment.",
    points: [
      "Dedicated social impact evaluation matrix",
      "Pilot deployment support in Gujarat civic and rural areas",
      "CSR linkage facilitation with GSFC Limited & corporate partners",
    ],
    accent: "orange",
  },
  {
    title: "Acceleration Program Grant",
    grant: "Up to ₹3.00 Lakhs",
    badge: "Cohort Support",
    desc: "Financial assistance to enroll and participate in recognized national and international acceleration programs (Y Combinator, Techstars, iCreate, etc.).",
    points: [
      "Covers program enrollment fees, travel, and cohort residency",
      "Access to global mentor networks and demo days",
      "Fast-track institutional sponsorship",
    ],
    accent: "teal",
  },
  {
    title: "Skill Development & Interest Subsidy",
    grant: "Up to ₹1 Lakh + 9% Sub.",
    badge: "Operational Subsidy",
    desc: "Grant up to ₹1.00 Lakh for team technical upskilling plus an additional 1% interest subsidy (maximum up to 9%) on bank term loans under MSME provisions.",
    points: [
      "Certifications and specialized advanced technical training",
      "Additional 1% interest subsidy on bank commercial term loans",
      "Maximum up to 9% effective interest rate relief",
    ],
    accent: "slate",
  },
];

const NODAL_SECTORS = [
  "Agriculture & Allied Tech",
  "AI & Advanced Robotics",
  "Biotechnology & Life Sciences",
  "Clean-Tech & Circular Economy",
  "Cyber Security & Defense",
  "Energy & Power Systems",
  "Environment & Waste Tech",
  "Healthcare & Biomedical",
  "ICT & Software Platforms",
  "IoT & Smart Sensor Systems",
  "Advanced Manufacturing",
  "Services & Consumer Tech",
  "Water & Wastewater Treatment",
];

const NODAL_DOCS = [
  {
    title: "Apply for Start-Up Support under Nodal Institute",
    type: "Application Portal",
    tag: "Direct Application",
    url: "https://bit.ly/guiitar",
    icon: FileCheck,
    desc: "Submit your startup deck, operational milestones, and funding requirements to the GUIITAR Nodal Institute desk.",
    primary: true,
  },
  {
    title: "Official Gujarat Startup Government Portal",
    type: "State Government Website",
    tag: "Industries Commissionerate",
    url: "https://www.startup.gujarat.gov.in",
    icon: Globe,
    desc: "Central State government portal for Gujarat Industrial Policy startup registration and verification.",
    primary: false,
  },
  {
    title: "Internal Incubation Application (GUIITAR)",
    type: "Internal Portal",
    tag: "Fast Track",
    url: "/apply",
    icon: ArrowRight,
    desc: "Apply directly through GUIITAR Council's online platform for incubation, co-working, and mentoring.",
    primary: false,
  },
  {
    title: "Funding Schemes & Navigator",
    type: "Interactive Tool",
    tag: "Eligibility Tool",
    url: "/funding",
    icon: Banknote,
    desc: "Explore all matching funding schemes, eligibility rubrics, and application checklists.",
    primary: false,
  },
];

const NODAL_FAQS = [
  {
    q: "What is the role of GUIITAR Council as a Nodal Institute?",
    a: "GUIITAR Council (promoted by GSFC University) is officially recognized by the Industries Commissionerate, Government of Gujarat. As a Nodal Institute, GUIITAR evaluates, validates, nurtures, and officially recommends startup proposals to the state government for disbursal of seed capital, sustenance allowances, and scaling subsidies.",
  },
  {
    q: "Can a startup receive both SSIP 2.0 and Nodal Institute funding?",
    a: "Yes! Typically, early-stage student innovators begin with SSIP 2.0 prototype grants (up to ₹2.5 Lakhs) to build functional MVPs. Once the product is validated and a formal company entity is registered, the startup can graduate to the Nodal Institute track for up to ₹30 Lakhs seed capital and monthly sustenance allowances.",
  },
  {
    q: "What are the eligibility requirements for the ₹25,000/month sustenance allowance?",
    a: "Startups approved under the Nodal Institute scheme receive ₹20,000/month (up to ₹2.40 Lakhs/year) for 1 year. If the startup has at least one woman founder or co-founder, the allowance is elevated to ₹25,000/month (up to ₹3.00 Lakhs/year).",
  },
  {
    q: "Who evaluates and recommends the startup proposals?",
    a: "Project proposals are evaluated by the GSFC University Startup Committee and GUIITAR Nodal Committee comprising seasoned entrepreneurs, domain specialists, financial evaluators, and state representatives before submission to the Industries Commissioner.",
  },
  {
    q: "How does the GVFL Pre-Series A funding facilitation work?",
    a: "High-potential startups with demonstrated market traction, revenue growth, and scalable unit economics are recommended directly to Gujarat Venture Finance Limited (GVFL) for equity financing ranging from ₹50 Lakhs up to ₹3.00 Crores.",
  },
];

export function NodalInstitutePage() {
  const [activeTab, setActiveTab] = useState<"incentives" | "sectors" | "process" | "docs">("incentives");

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        badge="Industries Commissionerate, Govt. of Gujarat"
        title="GUIITAR Council — Nodal Institute"
        text="Official institutional gateway under the Scheme for Assistance for Startups/Innovation (Gujarat Industrial Policy 2020) providing up to ₹30 Lakhs seed capital, sustenance allowances, and scale-up backing."
      >
        {/* METRICS */}
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#047857" }}>₹30.00 Lakhs</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Max Seed Support Grant
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#7c3aed" }}>₹25,000 / Mo</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Founder Sustenance (1 Yr)
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#1e40af" }}>Up to ₹3.00 Cr</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Pre-Series A via GVFL
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#ea580c" }}>Up to 9%</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Term Loan Interest Subsidy
            </div>
          </div>
        </div>

        <div className="button-row" style={{ marginTop: "12px" }}>
          <a
            href="https://bit.ly/guiitar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#047857",
              borderColor: "#047857",
            }}
          >
            <span>Apply under Nodal Institute</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://www.startup.gujarat.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Gujarat Startup Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <ButtonLink to="/funding" size="md" variant="secondary">
            <span>Funding Navigator</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* POLICY SPOTLIGHT */}
      <section style={{ padding: "64px 0", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)",
              borderRadius: "24px",
              padding: "40px",
              color: "#ffffff",
              boxShadow: "0 20px 40px -10px rgba(4, 120, 87, 0.25)",
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
                Institutional Mandate
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
                Promoting High-Growth Commercial Startups & Innovators Across Gujarat
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.65",
                  color: "#d1fae5",
                  margin: "0 0 20px 0",
                }}
              >
                GUIITAR Council has been recognized by the Industries Commissionerate, Government of Gujarat, as an official Nodal Institute under the Scheme for Assistance for Startups/Innovation under the Gujarat Industrial Policy 2020. Startups in and around Vadodara and across Gujarat benefit from state subsidies, seed capital, sustenance allowances, and pilot deployments.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  fontSize: "13.5px",
                  color: "#a7f3d0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Building2 className="w-4 h-4" />
                  <span>
                    <strong>Recognized by:</strong> Industries Commissionerate, Govt. of Gujarat
                  </span>
                </div>
                <div>•</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    <strong>Administered by:</strong> GUIITAR Council (Section 8 Company)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB CONTROLS */}
          <div className="tabs" style={{ marginBottom: "36px" }}>
            <button
              className={`tab ${activeTab === "incentives" ? "active" : ""}`}
              onClick={() => setActiveTab("incentives")}
            >
              All 7 Incentive Schemes
            </button>
            <button
              className={`tab ${activeTab === "sectors" ? "active" : ""}`}
              onClick={() => setActiveTab("sectors")}
            >
              13 Focus Sectors
            </button>
            <button
              className={`tab ${activeTab === "process" ? "active" : ""}`}
              onClick={() => setActiveTab("process")}
            >
              Evaluation & Approval Process
            </button>
            <button
              className={`tab ${activeTab === "docs" ? "active" : ""}`}
              onClick={() => setActiveTab("docs")}
            >
              Application & Links
            </button>
          </div>

          {/* TAB 1: ALL 7 INCENTIVE SCHEMES */}
          {activeTab === "incentives" && (
            <div>
              <SectionTitle
                badge="Government Schemes"
                title="Comprehensive State Assistance for Startups"
                subtitle="All fiscal grants, allowances, venture match-funding, and interest subsidies available through the Nodal Institute."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginTop: "32px",
                }}
              >
                {NODAL_INCENTIVES.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "var(--card)",
                      borderRadius: "20px",
                      border: "1px solid var(--border)",
                      padding: "32px 26px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          background: "#ecfdf5",
                          border: "1px solid #a7f3d0",
                          color: "#047857",
                          display: "inline-block",
                          marginBottom: "16px",
                        }}
                      >
                        {item.badge}
                      </span>

                      <div
                        style={{
                          fontSize: "26px",
                          fontWeight: 900,
                          color: "#047857",
                          marginBottom: "8px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.grant}
                      </div>

                      <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px" }}>
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
                              style={{ color: "#047857", marginTop: "2px" }}
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 13 FOCUS SECTORS */}
          {activeTab === "sectors" && (
            <div>
              <SectionTitle
                badge="Domain Scope"
                title="Primary Focus Areas for Nodal Incubation"
                subtitle="GUIITAR Council actively nurtures innovative products, services, and business models across 13 core domains."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "32px",
                }}
              >
                {NODAL_SECTORS.map((sector, idx) => (
                  <div
                    key={sector}
                    style={{
                      background: "var(--card)",
                      padding: "20px 18px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "#ecfdf5",
                        color: "#047857",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "12px",
                        flexShrink: 0,
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span style={{ fontSize: "14.5px", fontWeight: 700 }}>{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EVALUATION & PROCESS */}
          {activeTab === "process" && (
            <div>
              <SectionTitle
                badge="Workflow"
                title="Nodal Evaluation & Approval Pipeline"
                subtitle="How startup proposals are screened, recommended, and sanctioned by the state government."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "18px",
                  marginTop: "32px",
                }}
              >
                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#047857", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>1</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Online Submission</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Submit pitch deck, business model canvas, and financial projections via `bit.ly/guiitar`.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#047857", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>2</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Technical Validation</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Nodal desk conducts novelty checks, market feasibility analysis, and technical due diligence.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#047857", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>3</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Committee Pitch</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Present before the GSFC University Startup Committee and industry evaluators.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#047857", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>4</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>State Recommendation</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>GUIITAR Council forwards recommendation to the Office of the Industries Commissioner.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#047857", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>5</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Sanction & Tranches</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>State sanction order issued and milestone grants released with periodic monitoring.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCS & LINKS */}
          {activeTab === "docs" && (
            <div>
              <SectionTitle
                badge="Portals & Intakes"
                title="Official Portals & Submission Gateways"
                subtitle="Access direct application channels and state government resources."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  marginTop: "32px",
                }}
              >
                {NODAL_DOCS.map((doc) => {
                  const DocIcon = doc.icon;
                  return (
                    <div
                      key={doc.title}
                      style={{
                        background: "var(--card)",
                        borderRadius: "18px",
                        border: doc.primary ? "1.5px solid #047857" : "1px solid var(--border)",
                        padding: "26px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: doc.primary ? "0 8px 24px -4px rgba(4, 120, 87, 0.15)" : "none",
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
                              background: doc.primary ? "#ecfdf5" : "#f1f5f9",
                              color: doc.primary ? "#047857" : "#475569",
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
                              background: doc.primary ? "#ecfdf5" : "#f1f5f9",
                              color: doc.primary ? "#047857" : "#64748b",
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

                      {doc.url.startsWith("/") ? (
                        <Link
                          to={doc.url}
                          className="btn btn-outline btn-sm"
                          style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          <span>Access {doc.type}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
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
                            background: doc.primary ? "#047857" : undefined,
                            borderColor: doc.primary ? "#047857" : undefined,
                            color: doc.primary ? "#ffffff" : undefined,
                          }}
                        >
                          <span>Access {doc.type}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQS */}
      <section className="section-muted">
        <div className="container" style={{ maxWidth: "880px" }}>
          <SectionTitle
            badge="Frequently Asked Questions"
            title="Nodal Institute Scheme Queries"
            subtitle="Details on sustenance allowances, seed capital, and state recommendation protocols."
            align="center"
          />

          <Accordion items={NODAL_FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta" style={{ background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)" }}>
        <div className="container">
          <span className="section-badge light">Ready to Scale?</span>
          <h2>Accelerate Your Startup with State Government Grant Backing</h2>
          <p>
            Connect with the Incubation Nodal Manager at GUIITAR Council, GSFC University Campus, Vadodara.
          </p>
          <div className="button-row">
            <a
              href="https://bit.ly/guiitar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: 800,
              }}
            >
              <span>Apply for Nodal Support</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/funding" size="lg" variant="glass">
              <span>Explore All Funding Tracks</span>
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Contact Incubation Desk</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
