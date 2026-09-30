import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Lightbulb,
  Cpu,
  Plane,
  Layers,
  Leaf,
  Bot,
  Dna,
  ShieldCheck,
  Zap,
  HeartPulse,
  Wifi,
  Factory,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import {
  SHOWCASE_PROJECTS,
  LAB_FACILITIES,
  INNOVATION_JOURNEY,
  type ShowcaseProject,
} from "@/lib/data";
import { AdminDataStore, type IdeaItem } from "@/lib/adminStore";

export const Route = createFileRoute("/innovation")({
  head: () => ({
    meta: [
      { title: "Innovation & Research Hub — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Explore student innovations, 13 thrust areas, advanced prototyping laboratories, patents, and deep-tech research breakthroughs at GUIITAR Council.",
      },
      { property: "og:title", content: "Innovation & Research Hub — GUIITAR Council" },
      {
        property: "og:description",
        content: "From laboratory proof-of-concept to patented technology solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InnovationPage,
});

const thrust = [
  ["Agriculture & Allied Fields", Leaf],
  ["Artificial Intelligence & Robotics", Bot],
  ["Biotechnology & Life Sciences", Dna],
  ["Clean-Tech & Circular Economy", Leaf],
  ["Cyber Security & Network Defense", ShieldCheck],
  ["Renewable Energy & Power Systems", Zap],
  ["Environmental Engineering Solutions", Leaf],
  ["Healthcare & Biomedical Devices", HeartPulse],
  ["Information & Communication Tech (ICT)", Wifi],
  ["Internet of Things (IoT) & Embedded", Cpu],
  ["Advanced Manufacturing & Materials", Factory],
  ["Deep-Tech Services & Automation", Bot],
  ["Water & Wastewater Treatment Tech", Droplets],
] as const;

export function InnovationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLabId, setActiveLabId] = useState("makers-lab");
  const [publishedIdeas, setPublishedIdeas] = useState<IdeaItem[]>([]);

  const reloadPublished = () => {
    setPublishedIdeas(AdminDataStore.getPublishedIdeas());
  };

  useEffect(() => {
    reloadPublished();
    const handleUpdate = () => reloadPublished();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const categories = ["All", "AI", "Robotics", "IoT", "Biotech", "CleanTech"];

  // Combined published ideas and legacy showcase projects
  const allProjects = useMemo(() => {
    // Map published ideas to unified item
    const fromStore = publishedIdeas.map((i) => ({
      id: i.id,
      slug: i.slug,
      name: i.title,
      category: i.category,
      technology: i.technology,
      stage: i.stage,
      creator: i.creatorName,
      description: i.shortDescription || i.detailedDescription,
      impact: i.expectedImpact,
      fundingSanctioned: i.fundingSanctioned || "SSIP 2.0 Evaluated",
      isFromStore: true,
    }));

    // Legacy projects that aren't duplicate slugs
    const fromLegacy = SHOWCASE_PROJECTS.filter(
      (p) => !fromStore.some((s) => s.slug === p.id || s.name === p.name),
    ).map((p) => ({
      ...p,
      slug: p.id,
      isFromStore: false,
    }));

    return [...fromStore, ...fromLegacy];
  }, [publishedIdeas]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchCat =
        selectedCategory === "All" ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchQuery = `${p.name} ${p.description} ${p.technology} ${p.creator}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const currentLab = useMemo(
    () => LAB_FACILITIES.find((l) => l.id === activeLabId) || LAB_FACILITIES[0],
    [activeLabId],
  );

  return (
    <>
      <PageHero
        badge="Innovation & Research"
        title="Where Breakthroughs are Engineered"
        text="Discover cutting-edge student inventions, laboratory research projects, patented technologies, and specialized prototyping infrastructure at GSFC University."
      >
        <div className="button-row">
          <ButtonLink to="/submit-idea" size="md" variant="primary">
            <span>Submit Your Innovation</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
          <a href="#showcase" className="btn btn-outline btn-md">
            <span>Browse Project Showcase</span>
          </a>
        </div>
      </PageHero>

      {/* 13 THRUST AREAS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Strategic Domains"
            title="13 Focus Thrust Areas"
            subtitle="GUIITAR Council prioritizes applied technological innovation across 13 critical industrial and societal sectors."
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

      {/* PROTOTYPING LABS & SUPERCOMPUTER */}
      <section className="section-muted" id="labs">
        <div className="container">
          <SectionTitle
            badge="Infrastructure & R&D"
            title="Prototyping Labs & High-Compute Facilities"
            subtitle="Access state-of-the-art supercomputers, drone flight cells, precision laser cutters, and IoT sensor workbenches."
          />

          <div className="tabs">
            {LAB_FACILITIES.map((lab) => (
              <button
                key={lab.id}
                className={`tab ${activeLabId === lab.id ? "active" : ""}`}
                onClick={() => setActiveLabId(lab.id)}
              >
                {lab.name.split(" (")[0]}
              </button>
            ))}
          </div>

          <div className="lab-showcase-split">
            <div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}
              >
                <span className="pill">{currentLab.zone}</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>
                  GSFC University Official Facility
                </span>
              </div>

              <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px" }}>
                {currentLab.name}
              </h3>
              <p
                style={{ fontSize: "16px", fontWeight: 600, color: "var(--primary)", margin: "0 0 16px" }}
              >
                {currentLab.headline}
              </p>

              <p
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                {currentLab.description}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    marginBottom: "10px",
                  }}
                >
                  Available Equipment & Infrastructure:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "20px", fontSize: "14.5px" }}
                >
                  {currentLab.equipment.map((eq) => (
                    <li key={eq}>{eq}</li>
                  ))}
                </ul>
              </div>

              <ButtonLink to="/contact" size="md">
                <span>Request Laboratory Session</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>

            <div>
              <div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    marginBottom: "12px",
                  }}
                >
                  Target Use Cases:
                </h4>
                <ul
                  className="list"
                  style={{
                    paddingLeft: "18px",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }}
                >
                  {currentLab.useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Authorized Users:
                </span>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13.5px",
                    fontWeight: 600,
                  }}
                >
                  {currentLab.whoCanAccess}
                </p>

                {currentLab.sources && currentLab.sources.length > 0 && (
                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "10px",
                      borderTop: "1px dashed #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b" }}>
                      Verified Sources:
                    </span>
                    {currentLab.sources.map((src, idx) => (
                      <a
                        key={src.url}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "#2563eb",
                          textDecoration: "underline",
                        }}
                      >
                        <span>[{idx + 1}] {src.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCHABLE PROJECT SHOWCASE */}
      <section id="showcase">
        <div className="container">
          <SectionTitle
            badge="Innovations Database"
            title="Project & Prototype Showcase"
            subtitle="Search through student and researcher inventions developed at GUIITAR Council across various stages of maturity."
          />

          <div className="search-box-wrap">
            <Search />
            <input
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, technology, or creator..."
              aria-label="Search innovation projects"
            />
          </div>

          <div className="tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`tab ${selectedCategory === c ? "active" : ""}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredProjects.map((p) => (
              <article
                key={p.id}
                className="plain-card"
                style={{
                  padding: "30px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
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
                    <span className="pill amber">{p.category}</span>
                    <span className="startup-grant-tag">{p.fundingSanctioned}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      margin: "0 0 8px",
                      color: "var(--text)",
                    }}
                  >
                    <Link
                      to="/innovation/$slug"
                      params={{ slug: p.slug }}
                      style={{ color: "var(--text)", textDecoration: "none" }}
                    >
                      {p.name}
                    </Link>
                  </h3>

                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--primary)",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    {p.technology}
                  </span>

                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      marginBottom: "18px",
                    }}
                  >
                    {p.description}
                  </p>

                  <div
                    style={{
                      background: "var(--surface-muted)",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      fontSize: "13px",
                      color: "var(--text)",
                      marginBottom: "18px",
                    }}
                  >
                    <strong style={{ color: "var(--text)", display: "block", marginBottom: "2px" }}>
                      Impact Milestone:
                    </strong>
                    {p.impact}
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{p.creator}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="pill emerald" style={{ fontSize: "11px" }}>
                      {p.stage}
                    </span>
                    <Link
                      to="/innovation/$slug"
                      params={{ slug: p.slug }}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="center" style={{ padding: "60px 20px", color: "#64748b" }}>
              <p style={{ fontSize: "18px", fontWeight: 600 }}>
                No innovations found matching "{searchQuery}"
              </p>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: "14px" }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
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
          <span className="section-badge light">Student & Researcher Intake</span>
          <h2>Have an Innovation You Want to Build or Protect?</h2>
          <p>
            Submit your concept to GUIITAR Council. Receive grant funding up to ₹2.5 Lakhs,
            laboratory access, and complete patent filing support.
          </p>
          <div className="button-row">
            <ButtonLink to="/submit-idea" size="lg" variant="dark">
              <span>Submit Innovation Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
