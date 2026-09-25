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
                          style={{
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            color: "#1e293b",
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
            Join 83+ incubated ventures. Get furnished workspace, non-dilutive grant capital up to
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
