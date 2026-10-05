import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Network,
  Users,
  Building2,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  Landmark,
  Layers,
  FileText,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { GuiitarEmblem } from "@/components/GuiitarBrand";
import { AdminDataStore, type MentorItem } from "@/lib/adminStore";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Innovation Ecosystem Map & Mentors — GUIITAR Council" },
      {
        name: "description",
        content:
          "Explore GUIITAR Council’s innovation ecosystem map connecting students, faculty, industry, government bodies, and 50+ domain mentors in Vadodara.",
      },
      { property: "og:title", content: "Innovation Ecosystem Map — GUIITAR Council" },
      {
        property: "og:description",
        content: "Connected innovation network linking academia, industry, and venture capital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EcosystemPage,
});

const ecosystemClusters = [
  {
    id: "students",
    title: "Students & E-Club",
    desc: "School, Diploma, UG, PG & PhD students driving grassroot idea generation and hackathon participation.",
    icon: GraduationCap,
    color: "#2563eb",
  },
  {
    id: "startups",
    title: "Incubated Startups",
    desc: "83+ early-stage ventures building working prototypes, filing patents, and running commercial pilots.",
    icon: RocketIcon,
    color: "#059669",
  },
  {
    id: "faculty",
    title: "Faculty & Researchers",
    desc: "Senior engineering and biotechnology professors providing technical validation and R&D support.",
    icon: Cpu,
    color: "#7c3aed",
  },
  {
    id: "mentors",
    title: "Mentor Network",
    desc: "50+ verified corporate CXOs, patent attorneys, and venture architects providing 1-on-1 sprint coaching.",
    icon: Users,
    color: "#ea580c",
  },
  {
    id: "industry",
    title: "Industry Partners (GSFC Ltd)",
    desc: "Parent chemical enterprise and regional manufacturing corporations providing pilot test proving beds.",
    icon: Building2,
    color: "#d97706",
  },
  {
    id: "government",
    title: "Government Bodies (DST / SSIP)",
    desc: "State of Gujarat innovation nodal bodies providing SSIP 2.0 and Industrial Policy grant funding.",
    icon: Landmark,
    color: "#0891b2",
  },
];

function RocketIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function EcosystemPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [searchMentor, setSearchMentor] = useState("");
  const [mentorList, setMentorList] = useState<MentorItem[]>([]);

  const loadMentors = () => {
    setMentorList(AdminDataStore.getMentors());
  };

  useEffect(() => {
    loadMentors();
    const handleUpdate = () => loadMentors();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const domains = ["All", "Technology", "Business", "Research", "Legal & IPR", "Industry"];

  const filteredMentors = useMemo(() => {
    return mentorList.filter((m) => {
      const matchDom = selectedDomain === "All" || m.domain === selectedDomain;
      const matchQuery =
        `${m.name} ${m.designation || m.role} ${m.organization} ${(m.expertise || []).join(" ")}`
          .toLowerCase()
          .includes(searchMentor.toLowerCase());
      return matchDom && matchQuery;
    });
  }, [selectedDomain, searchMentor, mentorList]);

  return (
    <>
      <PageHero
        badge="Connected Network"
        title="Innovation Ecosystem Map"
        text="A visual representation of how GUIITAR Council serves as the central catalyst linking students, researchers, industry, government bodies, and investors."
      />

      {/* INTERACTIVE ECOSYSTEM MAP CANVAS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Interactive Matrix"
            title="The Hub & Spoke Innovation Matrix"
            subtitle="GUIITAR sits at the epicenter of Gujarat's technological translation ecosystem."
          />

          <div
            style={{
              background: "linear-gradient(135deg, #090d16 0%, #0f1c3f 100%)",
              borderRadius: "24px",
              padding: "48px 36px",
              color: "#ffffff",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Center GUIITAR Node */}
            <div
              style={{ textAlign: "center", marginBottom: "40px", position: "relative", zIndex: 2 }}
            >
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                  boxShadow: "0 0 45px rgba(234, 88, 12, 0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#ffffff",
                }}
              >
                <GuiitarEmblem className="w-14 h-14" />
              </div>
              <h3
                style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", margin: "0 0 4px" }}
              >
                GUIITAR COUNCIL (GSFC UNIVERSITY)
              </h3>
              <p style={{ color: "#93c5fd", fontSize: "14px", margin: 0, fontWeight: 600 }}>
                Central Innovation, Incubation & Patent Translation Engine
              </p>
            </div>

            {/* Orbiting Ecosystem Cluster Cards */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
              }}
              className="eco-clusters-grid"
            >
              {ecosystemClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "16px",
                    padding: "24px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.12)",
                        display: "grid",
                        placeItems: "center",
                        color: cluster.color,
                      }}
                    >
                      <cluster.icon className="w-5 h-5" />
                    </div>
                    <strong style={{ fontSize: "16px", color: "#ffffff" }}>{cluster.title}</strong>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>
                    {cluster.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENTOR NETWORK DISCOVERY */}
      <section className="section-muted" id="mentors">
        <div className="container">
          <SectionTitle
            badge="Advisory Roster"
            title="Official Mentor & Advisory Network"
            subtitle="Search and connect with experienced corporate leaders, academic researchers, and legal counsel."
          />

          <div className="search-box-wrap" style={{ maxWidth: "600px" }}>
            <Search />
            <input
              className="search"
              value={searchMentor}
              onChange={(e) => setSearchMentor(e.target.value)}
              placeholder="Search mentors by name, organization, or domain..."
              aria-label="Search mentors"
            />
          </div>

          <div className="tabs">
            {domains.map((d) => (
              <button
                key={d}
                className={`tab ${selectedDomain === d ? "active" : ""}`}
                onClick={() => setSelectedDomain(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredMentors.map((m) => (
              <article
                key={m.id}
                className="plain-card"
                style={{
                  padding: "30px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Mentor photo — hidden gracefully when the image file is not yet available */}
                  {m.imagePath && (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginBottom: "16px",
                        border: "2px solid #e2e8f0",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={m.imagePath}
                        alt={`Photo of ${m.name}`}
                        width={80}
                        height={80}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        onError={(e) => {
                          // Hide the entire photo container when the file is not yet available
                          const el = e.currentTarget.parentElement;
                          if (el) el.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <span className="pill">{m.domain}</span>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>{m.organization}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      margin: "0 0 4px",
                      color: "#0f172a",
                    }}
                  >
                    {m.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "#2563eb",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {m.designation}
                  </span>

                  <p style={{ fontSize: "13px", color: "#475569", marginBottom: "16px" }}>
                    {m.experience}
                  </p>

                  <div
                    style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}
                  >
                    {m.expertise.map((exp) => (
                      <span
                        key={exp}
                        style={{
                          background: "#f1f5f9",
                          color: "#334155",
                          fontSize: "11.5px",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <ButtonLink
                    to="/apply"
                    variant="outline"
                    size="sm"
                    style={{ flex: 1, justifyContent: "center", minWidth: "140px" }}
                  >
                    <span>Request Advisory Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ButtonLink>

                  {/* View Profile document link — only shown once the PDF asset exists */}
                  {m.documentPath && (
                    <a
                      href={m.documentPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View profile document for ${m.name}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "7px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#475569",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        background: "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                        e.currentTarget.style.borderColor = "#94a3b8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ffffff";
                        e.currentTarget.style.borderColor = "#cbd5e1";
                      }}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Join the Network</span>
          <h2>Want to Become an Official GUIITAR Mentor or Partner?</h2>
          <p>
            Share your industry expertise with high-potential student founders or explore CSR
            collaboration opportunities.
          </p>
          <div className="button-row">
            <ButtonLink to="/apply" size="lg" variant="dark">
              <span>Apply to Join Mentor Roster</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
            <ButtonLink to="/partner" size="lg" variant="glass">
              <span>Explore Corporate MOUs</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
