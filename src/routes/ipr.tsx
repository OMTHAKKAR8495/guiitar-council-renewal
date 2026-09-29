import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
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
  Building2,
  Calendar,
  Layers,
  Scale,
  Search,
  BookOpen,
  Lock,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";

export const Route = createFileRoute("/ipr")({
  head: () => ({
    meta: [
      { title: "Intellectual Property Rights (IPR) Centre — GUIITAR Council" },
      {
        name: "description",
        content:
          "Official IPR Centre at GUIITAR Council, GSFC University. Access patent filing reimbursements up to ₹1.5L (domestic) and ₹5L (international), free prior-art searches, trademark support, and expert attorney facilitation.",
      },
      {
        property: "og:title",
        content: "Intellectual Property Rights (IPR) Centre | GUIITAR Council",
      },
      {
        property: "og:description",
        content:
          "Facilitating patent drafting, novelty validation, copyright, trademark, and tech transfer for student innovators, researchers, and startups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IPRPage,
});

const IPR_GRANTS = [
  {
    title: "Domestic Patent Filing Grant",
    grant: "Up to ₹1,50,000",
    badge: "Per Domestic Patent",
    desc: "Comprehensive financial reimbursement covering prior-art novelty searches, patent specification drafting by empaneled attorneys, and statutory filing fees at the Indian Patent Office.",
    points: [
      "100% attorney fee coverage through empaneled IP law firms",
      "Provisional and complete specification drafting support",
      "First Examination Report (FER) response assistance",
    ],
    accent: "orange",
  },
  {
    title: "International / PCT Patent Support",
    grant: "Up to ₹5,00,000",
    badge: "Per International Filing",
    desc: "Substantial grant facilitation for deep-tech innovations seeking global patent protection via Patent Cooperation Treaty (PCT) and individual foreign jurisdiction entries (US, Europe, Japan).",
    points: [
      "PCT application drafting & international search analysis",
      "Statutory fee reimbursement for multi-country filings",
      "Global commercialization and IP valuation advisory",
    ],
    accent: "blue",
  },
  {
    title: "Industrial Design & Trademark",
    grant: "Up to ₹50,000",
    badge: "Brand & Design",
    desc: "Protection for unique product aesthetics, 3D geometric configurations, brand names, enterprise logos, and proprietary taglines against infringement.",
    points: [
      "Design classification & CAD drawing formalization",
      "Comprehensive trademark availability search",
      "Filing and registration certificates under Indian Trade Marks Registry",
    ],
    accent: "emerald",
  },
  {
    title: "Copyright & Software Protection",
    grant: "Full Coverage",
    badge: "Code & Content",
    desc: "Statutory copyright registration for novel software source code, proprietary algorithms, training manuals, artistic designs, and audio-visual assets.",
    points: [
      "Source code deposit and cryptographic hashing support",
      "Commercial licensing agreements and NDA drafting",
      "Open-source vs proprietary dual-licensing strategies",
    ],
    accent: "purple",
  },
];

const IPR_PILLARS = [
  {
    icon: Search,
    title: "Prior-Art & Novelty Assessment",
    desc: "Comprehensive search across USPTO, EPO, WIPO, and Indian Patent databases to verify novelty before committing resources.",
  },
  {
    icon: Scale,
    title: "Empaneled Patent Attorneys",
    desc: "Direct access to premier intellectual property law firms for high-quality claims drafting and technical specifications.",
  },
  {
    icon: Lock,
    title: "100% Founder Ownership",
    desc: "Under GUIITAR Council governance, student and founder innovators retain principal rights and commercial royalties on their discoveries.",
  },
  {
    icon: Globe,
    title: "Technology Transfer & Licensing",
    desc: "Institutional brokerage connecting patent holders with industrial partners for royalty-based technology licensing and spin-offs.",
  },
];

const IPR_DOCS = [
  {
    title: "Online IPR & Patent Support Application",
    type: "Google Form",
    tag: "Direct Application",
    url: "https://forms.gle/sUvSDHDubWQVdLHi8",
    icon: FileCheck,
    desc: "Submit your invention disclosure, novelty description, and prior-art details directly to the GUIITAR IPR Cell.",
    primary: true,
  },
  {
    title: "GSFC University IPR Policy Document",
    type: "PDF Policy",
    tag: "Official Policy",
    url: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf",
    icon: FileText,
    desc: "Download the complete university policy manual governing intellectual property ownership, royalties, and commercialization.",
    primary: false,
  },
  {
    title: "Invention Disclosure Form (IDF) Template",
    type: "Intake Document",
    tag: "Standard Template",
    url: "/resources",
    icon: Download,
    desc: "Structured template to outline invention technical claims, working diagrams, and comparative advantages.",
    primary: false,
  },
  {
    title: "Indian Patent Office (IPO) Portal",
    type: "Government Portal",
    tag: "Statutory Office",
    url: "https://ipindia.gov.in/",
    icon: Globe,
    desc: "Official portal of the Controller General of Patents, Designs and Trade Marks, Government of India.",
    primary: false,
  },
];

const IPR_FAQS = [
  {
    q: "Who owns the Intellectual Property created by student innovators at GUIITAR Council?",
    a: "Innovators and student researchers retain ownership of their intellectual property. GUIITAR Council and GSFC University operate under a non-profit Section 8 mandate designed to encourage founder ownership and long-term commercialization.",
  },
  {
    q: "When should I approach the IPR Centre to file a patent?",
    a: "You should approach the IPR Centre BEFORE presenting your invention publicly, publishing research papers, or participating in open exhibitions. Disclosing the invention publicly prior to filing can destroy novelty and compromise patentability.",
  },
  {
    q: "Are the attorney fees and government filing fees completely covered?",
    a: "Yes. For approved proposals under SSIP 2.0 and GUIITAR IPR grant schemes, expenses including prior-art searches, drafting by empaneled attorneys, and statutory filing fees (up to ₹1.5 Lakhs for domestic patents) are reimbursed or borne directly.",
  },
  {
    q: "Can faculty members and alumni also apply for IPR support?",
    a: "Yes. Faculty members, research scholars, students, and university alumni are eligible to apply through the IPR Centre for institutional facilitation and grant sponsorship.",
  },
  {
    q: "How long does it take from filing an Invention Disclosure Form (IDF) to provisional filing?",
    a: "Typically, novelty evaluation takes 1–2 weeks, followed by attorney consultation and specification drafting within 2–3 weeks, enabling provisional filing within 3 to 5 weeks from IDF approval.",
  },
];

export function IPRPage() {
  const [activeTab, setActiveTab] = useState<"schemes" | "roadmap" | "categories" | "docs">("schemes");

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        badge="Intellectual Property Cell • GSFC University"
        title="Intellectual Property Rights (IPR) Centre"
        text="End-to-end facilitation for patent drafting, prior-art searches, trademark registrations, copyright protection, and technology commercialization for student innovators and startups."
      >
        {/* KEY STATS */}
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#c2410c" }}>₹1.50 Lakhs</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Domestic Patent Grant
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#1e40af" }}>₹5.00 Lakhs</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              International / PCT Grant
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#059669" }}>145+</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              IP Disclosures & Filings
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
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#7c3aed" }}>100%</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
              Attorney & Search Support
            </div>
          </div>
        </div>

        <div className="button-row" style={{ marginTop: "12px" }}>
          <a
            href="https://forms.gle/sUvSDHDubWQVdLHi8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Apply for IPR Support</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Download IPR Policy (PDF)</span>
            <Download className="w-4 h-4" />
          </a>

          <ButtonLink to="/submit-idea" size="md" variant="secondary">
            <span>Submit Invention Disclosure</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* CORE HIGHLIGHT CARDS */}
      <section style={{ padding: "64px 0", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "48px",
            }}
          >
            {IPR_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  style={{
                    background: "var(--card)",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "#fff7ed",
                      color: "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px 0" }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.55", margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* TAB CONTROLS */}
          <div className="tabs" style={{ marginBottom: "36px" }}>
            <button
              className={`tab ${activeTab === "schemes" ? "active" : ""}`}
              onClick={() => setActiveTab("schemes")}
            >
              Grants & Financial Support
            </button>
            <button
              className={`tab ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              5-Stage Patent Filing Roadmap
            </button>
            <button
              className={`tab ${activeTab === "categories" ? "active" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              IP Classification & Scope
            </button>
            <button
              className={`tab ${activeTab === "docs" ? "active" : ""}`}
              onClick={() => setActiveTab("docs")}
            >
              Forms & Downloads
            </button>
          </div>

          {/* TAB 1: GRANTS & SCHEMES */}
          {activeTab === "schemes" && (
            <div>
              <SectionTitle
                badge="Financial Facilitation"
                title="IP Subsidies & Attorney Assistance"
                subtitle="Reimbursements covering novelty searches, attorney fees, drafting costs, and statutory filing duties."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginTop: "32px",
                }}
              >
                {IPR_GRANTS.map((g) => (
                  <div
                    key={g.title}
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
                          background: "#fff7ed",
                          border: "1px solid #fed7aa",
                          color: "#c2410c",
                          display: "inline-block",
                          marginBottom: "16px",
                        }}
                      >
                        {g.badge}
                      </span>

                      <div
                        style={{
                          fontSize: "26px",
                          fontWeight: 900,
                          color: "#c2410c",
                          marginBottom: "8px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {g.grant}
                      </div>

                      <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px" }}>
                        {g.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "var(--muted-foreground)",
                          marginBottom: "20px",
                        }}
                      >
                        {g.desc}
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
                        {g.points.map((pt, idx) => (
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
                              style={{ color: "#c2410c", marginTop: "2px" }}
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

          {/* TAB 2: ROADMAP */}
          {activeTab === "roadmap" && (
            <div>
              <SectionTitle
                badge="Process"
                title="5-Stage IP Commercialization Roadmap"
                subtitle="From first ideation to international patent publication and commercial licensing."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "18px",
                  marginTop: "32px",
                }}
              >
                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>1</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Invention Disclosure (IDF)</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Submit technical details, claimed novel aspects, and experimental data to the IPR Cell.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>2</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Prior-Art Search</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Empaneled attorneys conduct multi-database searches to determine patentability and inventive step.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>3</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Specification Drafting</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Attorney writes legal claims, technical descriptions, and engineering patent drawings.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>4</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Statutory Filing</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Provisional / Complete application filed with Indian Patent Office (IPO) or PCT international bureau.</p>
                </div>

                <div style={{ background: "var(--card)", padding: "22px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", marginBottom: "12px" }}>5</div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>Grant & Licensing</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.5" }}>Examination clearance, patent grant issuance, and corporate technology licensing agreements.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === "categories" && (
            <div>
              <SectionTitle
                badge="Coverage"
                title="Protected Intellectual Property Domains"
                subtitle="GUIITAR IPR Centre facilitates statutory registrations across all recognized forms of intellectual assets."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  marginTop: "32px",
                }}
              >
                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#c2410c", marginBottom: "8px" }}>Patents</h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                    Novel products, industrial machines, chemical processes, biotechnological formulations, electronics hardware, and technical computer-implemented mechanisms with industrial applicability.
                  </p>
                </div>

                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#1e40af", marginBottom: "8px" }}>Industrial Designs</h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                    Visual design, physical ornamentation, ergonomic chassis styling, and 3D surface patterns of consumer hardware, IoT enclosures, and industrial equipment.
                  </p>
                </div>

                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#059669", marginBottom: "8px" }}>Trademarks</h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                    Distinctive brand names, corporate symbols, product logos, catchphrases, and sound marks establishing distinct enterprise goodwill in commerce.
                  </p>
                </div>

                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#7c3aed", marginBottom: "8px" }}>Copyrights & Software</h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                    Original computer software source code, instruction manuals, training curriculums, graphical UI assets, database architectures, and technical literature.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FORMS & DOWNLOADS */}
          {activeTab === "docs" && (
            <div>
              <SectionTitle
                badge="Resources"
                title="Official IPR Forms & Document Repositories"
                subtitle="Access online intake forms, university policy PDFs, and official patent portal links."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                  marginTop: "32px",
                }}
              >
                {IPR_DOCS.map((doc) => {
                  const DocIcon = doc.icon;
                  return (
                    <div
                      key={doc.title}
                      style={{
                        background: "var(--card)",
                        borderRadius: "18px",
                        border: doc.primary ? "1.5px solid #ea580c" : "1px solid var(--border)",
                        padding: "26px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: doc.primary ? "0 8px 24px -4px rgba(234, 88, 12, 0.15)" : "none",
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
                              background: doc.primary ? "#fff7ed" : "#f1f5f9",
                              color: doc.primary ? "#ea580c" : "#475569",
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
                              background: doc.primary ? "#fff7ed" : "#f1f5f9",
                              color: doc.primary ? "#ea580c" : "#64748b",
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
                            background: doc.primary ? "#ea580c" : undefined,
                            borderColor: doc.primary ? "#ea580c" : undefined,
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
            title="IPR Protection & Subsidies"
            subtitle="Understand ownership rights, confidentiality protocols, and prior-art validation."
            align="center"
          />

          <Accordion items={IPR_FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta" style={{ background: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)" }}>
        <div className="container">
          <span className="section-badge light">Protect Your Research</span>
          <h2>Have an Inventive Breakthrough or Novel Algorithm?</h2>
          <p>
            Connect directly with the GUIITAR IPR Cell before public disclosure to secure patent priority and grant assistance.
          </p>
          <div className="button-row">
            <a
              href="https://forms.gle/sUvSDHDubWQVdLHi8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                background: "#ffffff",
                color: "#9a3412",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Apply for IPR Support</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/funding" size="lg" variant="glass">
              <span>View Grant Schemes</span>
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Contact IPR Desk</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
