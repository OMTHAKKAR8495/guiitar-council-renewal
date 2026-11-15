import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Rocket,
  Search,
  Filter,
  Building2,
  Users,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Award,
  Layers,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { AdminDataStore, type StartupItem } from "@/lib/adminStore";

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Startup Ecosystem & Incubation — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Explore startups incubated at GUIITAR Council, incubation services, co-working suites, venture acceleration, and grant support.",
      },
      { property: "og:title", content: "Startup Ecosystem & Incubation — GUIITAR Council" },
      {
        property: "og:description",
        content: "From campus prototypes to high-growth scalable companies in Vadodara, Gujarat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StartupsPage,
});

export function StartupsPage() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);
  const [startupsList, setStartupsList] = useState<StartupItem[]>([]);

  const loadStartups = () => {
    setStartupsList(AdminDataStore.getStartups());
  };

  useEffect(() => {
    loadStartups();
    const handleUpdate = () => loadStartups();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const industries = ["All", "Biotech", "CleanTech", "Robotics", "Ayurveda", "DeepTech"];

  const filtered = useMemo(() => {
    return startupsList.filter((s) => {
      const matchInd =
        industryFilter === "All" || s.industry.toLowerCase().includes(industryFilter.toLowerCase());
      const matchQuery = `${s.name} ${s.description} ${s.technology} ${s.tagline}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchInd && matchQuery;
    });
  }, [industryFilter, search, startupsList]);

  return (
    <>
      <PageHero
        badge="Venture Incubation"
        title="From Campus to Company"
        text="Discover the next generation of scalable tech enterprises founded by GSFC University students, alumni, and regional innovators."
      >
        <div className="button-row">
          <ButtonLink to="/apply" size="md" variant="primary">
            <span>Apply for Incubation Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
          <a href="#directory" className="btn btn-outline btn-md">
            <span>Search Startup Directory</span>
          </a>
        </div>
      </PageHero>

      {/* OFFICIAL FOUR-STAGE INCUBATION PROCEDURE */}
      <section style={{ padding: "60px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <SectionTitle
            badge="Official Incubation SOP"
            title="Official GUIITAR Incubation Procedure (4 Stages)"
            subtitle="The officially approved institutional standard operating procedure governing idea intake, laboratory grooming, incubation residency, and graduation."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            {[
              {
                step: "01",
                name: "Stage 1 — Spark-up",
                timeline: "Illustrative: M1–M2 (Intake)",
                points: [
                  "Idea submission & online evaluation",
                  "Technical uniqueness & feasibility review",
                  "Business proposal preparation",
                  "Presentation to University Startup Committee",
                  "Agreement execution with GUIITAR Council",
                ],
                accent: "#2563eb",
              },
              {
                step: "02",
                name: "Stage 2 — Grooming",
                timeline: "Illustrative: M2–M6 (Post-Clearance)",
                points: [
                  "Proof of Concept (PoC) & prototype build",
                  "Maker Lab & Supercomputer access",
                  "Customer discovery & market research",
                  "Business plan & unit economics refinement",
                  "Periodic monthly progress reporting",
                ],
                accent: "#ea580c",
              },
              {
                step: "03",
                name: "Stage 3 — Incubation",
                timeline: "Illustrative: M6–M18 (Post-Clearance)",
                points: [
                  "Legal entity incorporation (Pvt Ltd / LLP)",
                  "Formal Incubation Agreement signing",
                  "Dedicated co-working desk allotment",
                  "Seed loan & grant disbursement review",
                  "Corporate pilot trials with GSFC Ltd",
                ],
                accent: "#059669",
              },
              {
                step: "04",
                name: "Stage 4 — Graduation",
                timeline: "Up to 18M post-Stage 1 clearance",
                points: [
                  "Exit via alternative Section 3.4 criteria",
                  "Alternative A: External investment or capital raise",
                  "Alternative B: Commercial space independence",
                  "Alternative C: Tenure completion (up to 18 months)",
                  "Dues/loan settlement & alumni network transition",
                ],
                accent: "#7c3aed",
              },
            ].map((st) => (
              <div
                key={st.name}
                className="plain-card"
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  borderTop: `4px solid ${st.accent}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: st.accent }}>{st.step}</span>
                    <span className="pill" style={{ fontSize: "11px" }}>{st.timeline}</span>
                  </div>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 12px 0", color: "var(--text)" }}>
                    {st.name}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    {st.points.map((pt) => (
                      <li key={pt} style={{ marginBottom: "4px" }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div
            className="amber-notice-box"
            style={{
              marginTop: "24px",
              borderRadius: "14px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "13px" }}>
              <strong>Policy Note:</strong> Standard incubation tenure is <strong>18 months</strong> after Stage 1 clearance. Seed funding is milestone-linked, subject to fund availability, and never guaranteed upon admission. Monthly reports are mandatory during Grooming and Incubation.
            </div>
            <Link
              to="/policy"
              className="btn btn-outline btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
            >
              <span>Read Full Policy Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* INCUBATION SUPPORT PILLARS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Full-Lifecycle Incubation"
            title="Comprehensive Support for Founders"
            subtitle="Everything you need to derisk technical development, establish commercial operations, and acquire customers."
          />

          <div className="grid-3">
            {[
              {
                title: "Furnished Co-Working Suites",
                desc: "Ergonomic dedicated workstations, 12-seater multimedia conference room, and high-speed enterprise Wi-Fi at Anviksha Innovation Hub.",
                icon: Building2,
                badge: "Infrastructure",
              },
              {
                title: "Non-Dilutive Seed Grants",
                desc: "Direct access to SSIP 2.0 (up to ₹2.5 Lakhs) and Gujarat Industrial Policy 2020 assistance (up to ₹30 Lakhs) with 0% equity dilution.",
                icon: Banknote,
                badge: "Capital",
              },
              {
                title: "1-on-1 Industry Mentorship",
                desc: "Continuous sprint coaching from corporate CXOs, chemical industry veterans from GSFC Ltd, and serial entrepreneurs.",
                icon: Users,
                badge: "Advisory",
              },
              {
                title: "IPR & Patent Support Cell",
                desc: "Complete prior-art patentability searching, attorney drafting subsidies, and official patent office filing grants up to ₹1.5 Lakhs.",
                icon: ShieldCheck,
                badge: "Legal & IP",
              },
              {
                title: "Corporate Pilots with GSFC Ltd",
                desc: "Opportunities to test industrial chemistry, drone surveillance, and IoT telemetry solutions inside active industrial facilities.",
                icon: Layers,
                badge: "Market Access",
              },
              {
                title: "Investor Demo Days",
                desc: "Curated pitch sessions before regional Angel Networks, Seed VC funds, and Gujarat State Innovation Council leadership.",
                icon: Rocket,
                badge: "Growth & Scale",
              },
            ].map((p) => (
              <article key={p.title} className="icon-card">
                <div className="icon-box">
                  <p.icon />
                </div>
                <span className="pill" style={{ marginBottom: "12px" }}>
                  {p.badge}
                </span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STARTUP DIRECTORY */}
      <section className="section-muted" id="directory">
        <div className="container">
          <SectionTitle
            badge="Portfolio Ventures"
            title="Official Startup Directory"
            subtitle="Search and explore ventures actively incubated and accelerated under GUIITAR Council."
          />

          {/* Search Box */}
          <div className="search-box-wrap">
            <Search />
            <input
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startups by name, industry, or technology..."
              aria-label="Search startups"
            />
          </div>

          {/* Industry Filter Tabs */}
          <div className="tabs">
            {industries.map((ind) => (
              <button
                key={ind}
                className={`tab ${industryFilter === ind ? "active" : ""}`}
                onClick={() => setIndustryFilter(ind)}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Startup Cards Grid */}
          <div className="grid-2">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="plain-card"
                style={{
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                    <span className="pill emerald">{s.stage}</span>
                    <span className="startup-grant-tag">{s.fundingReceived}</span>
                  </div>

                  <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>{s.name}</h3>
                  <span
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: "#2563eb",
                      display: "block",
                      marginBottom: "14px",
                    }}
                  >
                    {s.tagline}
                  </span>

                  <p
                    style={{
                      color: "#475569",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {s.description}
                  </p>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#64748b",
                      }}
                    >
                      Key Milestones & Achievements:
                    </span>
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}
                    >
                      {s.achievements.map((a) => (
                        <span
                          key={a}
                          className="achievement-tag"
                          style={{
                            background: "var(--surface-muted, #f8fafc)",
                            border: "1px solid var(--border, #cbd5e1)",
                            color: "var(--text-body, #1e293b)",
                            fontSize: "12px",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontWeight: 600,
                          }}
                        >
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    {s.team} • Founded {s.foundedYear}
                  </span>
                  <ButtonLink to="/contact" variant="outline" size="sm">
                    <span>Connect With Founder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="center" style={{ padding: "60px 20px", color: "#64748b" }}>
              <p style={{ fontSize: "18px", fontWeight: 600 }}>
                No startups found matching "{search}"
              </p>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: "14px" }}
                onClick={() => {
                  setSearch("");
                  setIndustryFilter("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Incubation Onboarding</span>
          <h2>Ready to Launch Your Startup from Vadodara?</h2>
          <p>
            Join 15+ officially incubated startups and 1,800+ mentored innovators. Get furnished workspace, non-dilutive grant capital up to
            ₹30 Lakhs, and senior industry mentorship.
          </p>
          <div className="button-row">
            <ButtonLink to="/apply" size="lg" variant="dark">
              <span>Apply for Incubation</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
