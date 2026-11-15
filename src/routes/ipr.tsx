import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
  Percent,
  AlertTriangle,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";

export const Route = createFileRoute("/ipr")({
  head: () => ({
    meta: [
      { title: "Intellectual Property Rights (IPR) Centre & Policy — GUIITAR Council" },
      {
        name: "description",
        content:
          "Official IPR Centre at GUIITAR Council, GSFC University. Access 70:30 revenue sharing framework, patent filing reimbursements up to ₹1.5L (domestic) and ₹5L (international), official definitions glossary, and 46-page IPR policy document.",
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
    title: "70:30 Revenue Sharing Model",
    desc: "Under GSFC University IPR Policy, up to 70% of commercial net royalties are shared with the Inventor/Creator, subject to policy conditions.",
  },
  {
    icon: Globe,
    title: "Technology Transfer & Licensing",
    desc: "Facilitating commercial licensing deals, corporate pilot integrations with GSFC Ltd, and spin-off startup formation.",
  },
];

const IPR_DOCS = [
  {
    title: "GSFC University IPR Policy (Version 01)",
    desc: "Comprehensive 46-page institutional policy approved by President, effective 26 September 2025. Covers definitions, ownership, 70:30 revenue distribution, and tech transfer.",
    type: "PDF Document",
    tag: "Official Policy",
    url: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf",
    icon: FileText,
    primary: true,
  },
  {
    title: "Invention Disclosure Form (IDF) — Online Portal",
    desc: "Standard university disclosure intake for novel inventions, chemical formulations, hardware devices, and software code.",
    type: "Google Form",
    tag: "Online Submission",
    url: "https://forms.gle/sUvSDHDubWQVdLHi8",
    icon: ExternalLink,
    primary: true,
  },
  {
    title: "SSIP 2.0 IPR Facilitation Guidelines",
    desc: "Official Government of Gujarat circular outlining funding caps, allowable legal expenses, and reimbursement procedures for patents.",
    type: "PDF Document",
    tag: "Government Circular",
    url: "/resources",
    icon: FileCheck,
    primary: false,
  },
];

const IPR_GLOSSARY = [
  {
    term: "Intellectual Property (IP)",
    category: "Core Definition",
    definition:
      "Creations of the mind, including inventions, literary and artistic works, designs, symbols, names, and images used in commerce. IP grants exclusive legal rights to creators to prevent unauthorized commercial exploitation.",
  },
  {
    term: "Patent",
    category: "IP Types",
    definition:
      "An exclusive statutory right granted for an invention (a product or a process) that is novel, involves an inventive step, and is capable of industrial application. In exchange, the applicant publicly discloses full technical specifications.",
  },
  {
    term: "Copyright",
    category: "IP Types",
    definition:
      "Legal protection granted to creators for original literary, dramatic, musical, artistic works, cinematographic films, sound recordings, and computer programs/software source code, protecting expression rather than ideas.",
  },
  {
    term: "Industrial Design",
    category: "IP Types",
    definition:
      "The ornamental or aesthetic aspect of an article. A design may consist of three-dimensional features (such as the shape or surface of an article) or two-dimensional features (such as patterns, lines, or color configurations).",
  },
  {
    term: "Trademark",
    category: "IP Types",
    definition:
      "A distinctive sign, design, phrase, or symbol that distinguishes the goods or services of one enterprise from those of other enterprises, protecting consumer trust and commercial goodwill.",
  },
  {
    term: "Inventor",
    category: "Parties",
    definition:
      "The individual or group of individuals who contribute substantially to the intellectual conception of an invention. Merely executing instructions or laboratory routines without inventive conception does not confer inventor status.",
  },
  {
    term: "Creator",
    category: "Parties",
    definition:
      "A person who creates eligible intellectual property other than patentable inventions, such as software source code, artistic designs, industrial models, or written training literature.",
  },
  {
    term: "IP Ownership",
    category: "Governance",
    definition:
      "The legal entitlement, title, and bundle of proprietary rights over intellectual property. Under university policy, ownership depends on whether the IP was created as part of assigned employment duties, substantial university resource use, or independent student innovation.",
  },
  {
    term: "IP Assignment",
    category: "Governance",
    definition:
      "The formal, legally binding instrument by which an owner transfers all or part of their intellectual property rights and title to another individual, institution, or commercial enterprise.",
  },
  {
    term: "Licensing",
    category: "Commercialization",
    definition:
      "A contractual agreement where the IP owner (licensor) grants another party (licensee) permission to use, manufacture, distribute, or sell the intellectual property under specified terms, geographic scope, and royalty consideration.",
  },
  {
    term: "Commercialization",
    category: "Commercialization",
    definition:
      "The complete process of translating protected intellectual property, research findings, or technical prototypes into commercially viable products or services introduced to the marketplace.",
  },
  {
    term: "Startup",
    category: "Enterprise",
    definition:
      "An entity incorporated or registered in India not prior to ten years, with annual turnover not exceeding ₹100 crore in any financial year, working towards innovation, development, or improvement of products or processes, or scalable business models with high employment/wealth creation.",
  },
  {
    term: "Startup Incubation",
    category: "Ecosystem",
    definition:
      "A structured institutional support program providing early-stage ventures with shared office infrastructure, prototyping laboratories, mentorship, seed grant access, and corporate pilot linkages to accelerate survival and commercial scaling.",
  },
  {
    term: "Incubatee",
    category: "Ecosystem",
    definition:
      "An innovator, student founder, researcher, or incorporated startup entity formally admitted and actively enrolled in an incubation program under executed agreements with GUIITAR Council.",
  },
  {
    term: "Incubation Period",
    category: "Ecosystem",
    definition:
      "The permitted duration of residency and support (under GUIITAR Council policy, an initial tenure of 18 months from clearing Stage 1), subject to monthly milestone reporting and performance reviews.",
  },
  {
    term: "Pre-Incubation",
    category: "Ecosystem",
    definition:
      "The nascent phase of startup development focusing on problem definition, ideation, proof-of-concept (PoC) prototyping, and market validation prior to formal company incorporation.",
  },
  {
    term: "Post-Incubation / Graduation",
    category: "Ecosystem",
    definition:
      "The formal exit stage when an incubated venture reaches self-sufficiency, achieves revenue/investment milestones, or completes permitted residency, transitioning into the alumni network.",
  },
  {
    term: "Seed Funding",
    category: "Finance",
    definition:
      "Early-stage capital provided to support initial venture operations, prototype development, market testing, and regulatory clearances before securing institutional venture capital.",
  },
  {
    term: "Grant",
    category: "Finance",
    definition:
      "Non-dilutive financial assistance disbursed by government or institutional bodies (e.g., SSIP 2.0 or Nodal Institute grants) that does not require equity surrender or loan interest repayment, provided milestones are satisfied.",
  },
  {
    term: "Mentorship",
    category: "Advisory",
    definition:
      "Strategic technical, business, financial, or legal coaching provided by industry practitioners and senior academicians to guide student founders through operational bottlenecks.",
  },
  {
    term: "Technology Transfer",
    category: "Commercialization",
    definition:
      "The formal conveyance of academic research inventions, laboratory formulations, or university patents to industry or spin-off enterprises for commercial application and widespread societal adoption.",
  },
  {
    term: "Proof of Concept (PoC)",
    category: "Development",
    definition:
      "Tangible evidence, laboratory experiment, or preliminary functional prototype verifying that a technological concept, mathematical algorithm, or chemical formulation is technically feasible in practice.",
  },
  {
    term: "Minimum Viable Product (MVP)",
    category: "Development",
    definition:
      "A functioning product version containing just enough core features to satisfy early adopters and gather validated user feedback for iterative commercial engineering.",
  },
  {
    term: "Startup Eligibility",
    category: "Compliance",
    definition:
      "Institutional and statutory criteria (e.g., enrolled student/alumni status, age up to 35, innovative merit, DPIIT compliance) required to qualify for incubator admission or grant schemes.",
  },
  {
    term: "DPIIT Recognition",
    category: "Statutory",
    definition:
      "Official certificate of recognition issued by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India, entitling eligible startups to tax exemptions, public procurement relaxations, and fast-track patent processing.",
  },
  {
    term: "Technology Business Incubator (TBI)",
    category: "Institutional",
    definition:
      "A specialized institutional organization established to nurture technology-based and knowledge-driven startup enterprises by providing integrated workspace, seed loans, advanced R&D labs, and business networks.",
  },
];

const IPR_FAQS = [
  {
    q: "How does the 70:30 revenue sharing framework work?",
    a: "Under the GSFC University IPR Policy (Version 01, effective 26 September 2025), commercial net revenues and royalties earned from university-facilitated IP are shared 70% in favor of the Innovator/Creator/Inventor and 30% for GSFC University. However, individual cases are governed by specific ownership categories, assignment contracts, external grant covenants, and separate licensing agreements executed with the university.",
  },
  {
    q: "Who owns the intellectual property created by students?",
    a: "Generally, students own the intellectual property they conceive independently or through self-directed classwork. However, if the innovation utilizes substantial university resources, sponsored grant funding, or confidential industrial know-how, ownership and assignment are governed by formal university agreements.",
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
  const [activeTab, setActiveTab] = useState<
    "schemes" | "revenue" | "glossary" | "roadmap" | "categories" | "docs"
  >("schemes");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState("All");

  const glossaryCategories = useMemo(
    () => ["All", ...Array.from(new Set(IPR_GLOSSARY.map((item) => item.category)))],
    []
  );

  const filteredGlossary = useMemo(() => {
    return IPR_GLOSSARY.filter((item) => {
      const matchCat =
        selectedGlossaryCategory === "All" || item.category === selectedGlossaryCategory;
      const matchText = `${item.term} ${item.definition} ${item.category}`
        .toLowerCase()
        .includes(glossarySearch.toLowerCase());
      return matchCat && matchText;
    });
  }, [glossarySearch, selectedGlossaryCategory]);

  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        badge="Intellectual Property Cell • GSFC University"
        title="Intellectual Property Rights (IPR) Centre"
        text="Empowering researchers, student innovators, and startup founders with patent drafting subsidies, global novelty searches, copyright protection, and a transparent 70:30 revenue sharing framework."
      >
        <div className="button-row">
          <a
            href="https://forms.gle/sUvSDHDubWQVdLHi8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Submit Invention Disclosure (IDF)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Download className="w-4 h-4" />
            <span>Download IPR Policy (PDF)</span>
          </a>
        </div>
      </PageHero>

      {/* 70:30 STATUTORY REVENUE SHARING HIGHLIGHT */}
      <section style={{ padding: "36px 0 10px", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
              borderRadius: "20px",
              padding: "32px",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px",
              alignItems: "center",
              boxShadow: "0 16px 36px -8px rgba(30, 58, 138, 0.3)",
            }}
          >
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", marginBottom: "10px" }}>
                <Percent className="w-3.5 h-3.5 text-orange-400" />
                <span>Official Policy Formula</span>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 10px 0" }}>
                70:30 Net Revenue Sharing Framework
              </h3>
              <p style={{ fontSize: "14.5px", color: "#cbd5e1", lineHeight: "1.65", margin: "0 0 14px 0" }}>
                Verified against the <strong>GSFC University Intellectual Property Rights (IPR) Policy Version 01 (effective 26 September 2025, 46 pages)</strong>. Net commercial royalties and licensing proceeds are shared:
              </p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "14px" }}>
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "12px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#f97316" }}>70%</div>
                  <div style={{ fontSize: "12px", color: "#e2e8f0", fontWeight: 700 }}>Innovator / Inventor / Creator</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "12px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#60a5fa" }}>30%</div>
                  <div style={{ fontSize: "12px", color: "#e2e8f0", fontWeight: 700 }}>GSFC University</div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "13px",
                color: "#e2e8f0",
                lineHeight: "1.6",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: "#fb923c", marginBottom: "8px" }}>
                <AlertTriangle className="w-4 h-4" />
                <span>Important Institutional Condition:</span>
              </div>
              <p style={{ margin: 0 }}>
                The 70:30 formula is not an unconditional rule for every IP scenario. The official policy specifies that <strong>ownership, assignment, licensing agreements, and whether university facilities/grants were substantially utilized</strong> dictate the exact terms of each case. Formal agreements must be executed prior to commercial exploitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN IPR FEATURES */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Institutional Capabilities"
            title="Comprehensive IP Safeguards for Founders"
            subtitle="From the first laboratory disclosure to national grant patent issuance and commercial transfer."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginTop: "32px",
              marginBottom: "50px",
            }}
          >
            {IPR_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  style={{
                    background: "var(--card)",
                    padding: "24px 20px",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(234, 88, 12, 0.12)",
                      color: "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px", color: "var(--text)" }}>
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
              Grants &amp; Financial Support
            </button>
            <button
              className={`tab ${activeTab === "revenue" ? "active" : ""}`}
              onClick={() => setActiveTab("revenue")}
            >
              70:30 Revenue Sharing Policy
            </button>
            <button
              className={`tab ${activeTab === "glossary" ? "active" : ""}`}
              onClick={() => setActiveTab("glossary")}
            >
              Institutional Definitions Glossary ({IPR_GLOSSARY.length})
            </button>
            <button
              className={`tab ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              5-Stage Patent Roadmap
            </button>
            <button
              className={`tab ${activeTab === "categories" ? "active" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              IP Classification &amp; Scope
            </button>
            <button
              className={`tab ${activeTab === "docs" ? "active" : ""}`}
              onClick={() => setActiveTab("docs")}
            >
              Official Policy &amp; Forms
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
                      padding: "28px 24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span className={`pill ${g.accent}`} style={{ fontSize: "11px", marginBottom: "8px" }}>
                        {g.badge}
                      </span>
                      <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px" }}>{g.title}</h3>
                      <div style={{ fontSize: "24px", fontWeight: 900, color: "#ea580c", marginBottom: "14px" }}>
                        {g.grant}
                      </div>
                      <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "18px" }}>
                        {g.desc}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--text)", lineHeight: "1.6" }}>
                        {g.points.map((pt) => (
                          <li key={pt} style={{ marginBottom: "6px" }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REVENUE SHARING DETAILS */}
          {activeTab === "revenue" && (
            <div>
              <SectionTitle
                badge="Institutional Governance"
                title="Revenue Sharing & Commercialization Framework"
                subtitle="Detailed breakdown from Section 10 of the GSFC University IPR Policy Version 01."
              />

              <div style={{ maxWidth: "920px", margin: "32px auto 0" }}>
                <div style={{ background: "var(--card)", borderRadius: "18px", padding: "32px", border: "1px solid var(--border)", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 14px 0", color: "#ea580c" }}>
                    Net Royalty Distribution Provisions
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
                    When intellectual property created at GSFC University or through GUIITAR Council support is licensed or commercialized, the cumulative net earnings (after deduction of direct patent prosecution, maintenance, and administrative expenses) are distributed as follows:
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ background: "var(--surface-muted, #f8fafc)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "32px", fontWeight: 900, color: "#2563eb" }}>70%</div>
                      <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "4px 0" }}>Inventor / Creator Share</h4>
                      <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                        Distributed directly among contributing innovators according to their agreed invention disclosure shares.
                      </p>
                    </div>
                    <div style={{ background: "var(--surface-muted, #f8fafc)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "32px", fontWeight: 900, color: "#059669" }}>30%</div>
                      <h4 style={{ fontSize: "15px", fontWeight: 800, margin: "4px 0" }}>GSFC University Fund</h4>
                      <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                        Reinvested into the university research fund and GUIITAR Council innovation seed reserves.
                      </p>
                    </div>
                  </div>

                  <h4 style={{ fontSize: "16px", fontWeight: 800, margin: "20px 0 10px 0" }}>
                    Governing Policy Conditions:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "var(--text)", lineHeight: "1.7" }}>
                    <li><strong>Formal Agreement Required:</strong> Revenue distribution is contingent upon the execution of a formal licensing and royalty assignment agreement.</li>
                    <li><strong>Sponsored / Consultative Research:</strong> Where research is sponsored by external industries or government bodies, the terms of the specific tripartite contract take precedence.</li>
                    <li><strong>Multiple Inventors:</strong> If multiple inventors or student co-creators are involved, the 70% inventor portion is divided per the ratios recorded on the original Invention Disclosure Form (IDF).</li>
                    <li><strong>Commercial Independence:</strong> Incubated ventures operating as independent corporate entities (Private Limited) acquire commercial licenses through GUIITAR Council under mutually negotiated equity or milestone arrangements.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEFINITIONS GLOSSARY */}
          {activeTab === "glossary" && (
            <div>
              <SectionTitle
                badge="Authoritative Terminology"
                title="Institutional IPR &amp; Incubation Glossary"
                subtitle="Precise institutional definitions extracted from the official GUIITAR Council Startup Policy and GSFC University IPR Policy."
              />

              {/* Glossary Search & Filters */}
              <div style={{ maxWidth: "860px", margin: "28px auto 0" }}>
                <div className="search-box-wrap" style={{ marginBottom: "16px" }}>
                  <Search />
                  <input
                    className="search"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search terminology (e.g., Patent, PoC, Incubatee, Seed Funding)..."
                    aria-label="Search IPR definitions"
                  />
                </div>

                <div className="tabs" style={{ marginBottom: "24px" }}>
                  {glossaryCategories.map((c) => (
                    <button
                      key={c}
                      className={`tab ${selectedGlossaryCategory === c ? "active" : ""}`}
                      onClick={() => setSelectedGlossaryCategory(c)}
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Glossary Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {filteredGlossary.map((item) => (
                    <div
                      key={item.term}
                      style={{
                        background: "var(--card)",
                        padding: "20px 24px",
                        borderRadius: "14px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <h4 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "#2563eb" }}>
                          {item.term}
                        </h4>
                        <span className="pill" style={{ fontSize: "10.5px" }}>{item.category}</span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: "1.6", margin: 0 }}>
                        {item.definition}
                      </p>
                    </div>
                  ))}

                  {filteredGlossary.length === 0 && (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted-foreground)" }}>
                      <p>No definitions matching "{glossarySearch}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROADMAP */}
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

          {/* TAB 5: CATEGORIES */}
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

          {/* TAB 6: FORMS & DOWNLOADS */}
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
            title="IPR Protection &amp; Subsidies"
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
