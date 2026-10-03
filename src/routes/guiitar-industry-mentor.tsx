import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Users,
  Briefcase,
  Building,
  Award,
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { AdminDataStore, type MentorItem } from "@/lib/adminStore";
import { PageHero, SectionTitle } from "@/components/site";

export const Route = createFileRoute("/guiitar-industry-mentor")({
  component: IndustryMentorsPage,
  head: () => ({
    meta: [
      { title: "GUIITAR Industry Mentors — GSFC University Innovation Council" },
      {
        name: "description",
        content:
          "Explore official GUIITAR Industry Mentors connecting innovators with leaders in Technology, Finance, IPR, Startup Strategy, and Manufacturing.",
      },
    ],
  }),
});

export function IndustryMentorsPage() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState<MentorItem | null>(null);

  const loadMentors = () => {
    // Only display active and published mentors
    const all = AdminDataStore.getMentors();
    setMentors(all.filter((m) => m.published !== false));
  };

  useEffect(() => {
    loadMentors();
    const handleUpdate = () => loadMentors();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMentor(null);
      }
    };
    if (selectedMentor) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedMentor]);

  const categories = [
    "All",
    "Technology",
    "Startup & Strategy",
    "Finance & Investment",
    "IPR & Legal",
    "Business & Strategy",
    "Academia & Research",
    "Manufacturing & Industry",
  ];

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const matchCategory =
        selectedCategory === "All" ||
        m.domain?.toLowerCase() === selectedCategory.toLowerCase() ||
        m.expertise?.some((e) => e.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        m.name.toLowerCase().includes(query) ||
        (m.designation && m.designation.toLowerCase().includes(query)) ||
        (m.organization && m.organization.toLowerCase().includes(query)) ||
        (m.domain && m.domain.toLowerCase().includes(query));

      return matchCategory && matchQuery;
    });
  }, [mentors, selectedCategory, searchQuery]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHero
        badge="Official Mentor Directory"
        title="GUIITAR Industry Mentors"
        text="Connect with experienced industry executives, serial entrepreneurs, venture investors, patent attorneys, and domain experts empowering Gujarat's startup ecosystem."
      />

      {/* FILTER & SEARCH BAR SECTION */}
      <section style={{ padding: "40px 0 20px 0" }}>
        <div className="container">
          <div
            style={{
              background: "var(--card, #ffffff)",
              borderRadius: "20px",
              padding: "24px 28px",
              border: "1px solid var(--border, #e2e8f0)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ position: "relative", flex: "1 1 320px", maxWidth: "480px" }}>
                <Search
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    color: "#94a3b8",
                  }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mentors by name, designation, organization..."
                  aria-label="Search industry mentors"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: "12px",
                    border: "1px solid var(--border, #cbd5e1)",
                    background: "var(--background, #f8fafc)",
                    color: "inherit",
                    fontSize: "14.5px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13.5px",
                  color: "var(--muted-foreground, #64748b)",
                  fontWeight: 600,
                }}
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>
                  Showing <strong style={{ color: "var(--foreground, #0f172a)" }}>{filteredMentors.length}</strong> of{" "}
                  {mentors.length} Mentors
                </span>
              </div>
            </div>

            {/* CATEGORY FILTER PILLS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#94a3b8",
                  marginRight: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Filter className="w-3.5 h-3.5" /> Domain:
              </span>
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? mentors.length
                    : mentors.filter(
                        (m) =>
                          m.domain?.toLowerCase() === cat.toLowerCase() ||
                          m.expertise?.some((e) => e.toLowerCase() === cat.toLowerCase()),
                      ).length;

                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "12.5px",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: isSelected
                        ? "1px solid #2563eb"
                        : "1px solid var(--border, #e2e8f0)",
                      background: isSelected
                        ? "#2563eb"
                        : "var(--background, #ffffff)",
                      color: isSelected
                        ? "#ffffff"
                        : "var(--foreground, #475569)",
                      boxShadow: isSelected ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
                    }}
                  >
                    {cat} {count > 0 && <span style={{ opacity: 0.8, fontSize: "11px" }}>({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MENTOR GRID */}
          {filteredMentors.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "var(--card, #ffffff)",
                borderRadius: "20px",
                border: "1px solid var(--border, #e2e8f0)",
              }}
            >
              <Users className="w-12 h-12 text-slate-400" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                No mentors found matching &quot;{searchQuery}&quot;
              </h3>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                Try adjusting your search criteria or domain filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn btn-outline btn-sm"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px",
                marginBottom: "60px",
              }}
            >
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedMentor(mentor);
                    }
                  }}
                  style={{
                    background: "var(--card, #ffffff)",
                    borderRadius: "18px",
                    border: "1px solid var(--border, #e2e8f0)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#93c5fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.03)";
                    e.currentTarget.style.borderColor = "var(--border, #e2e8f0)";
                  }}
                >
                  <div>
                    {/* PORTRAIT IMAGE CONTAINER */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#f1f5f9",
                        marginBottom: "16px",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}
                    >
                      <img
                        src={mentor.avatar || "/images/mentors/sudhir-gupta.jpeg"}
                        alt={`${mentor.name} — Industry Mentor`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          transition: "transform 0.4s ease",
                        }}
                        onError={(e) => {
                          // Clean fallback placeholder
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                          background: "rgba(15, 23, 42, 0.8)",
                          backdropFilter: "blur(6px)",
                          color: "#ffffff",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          letterSpacing: "0.03em",
                          textTransform: "uppercase",
                        }}
                      >
                        {mentor.domain || "Industry Mentor"}
                      </div>
                    </div>

                    {/* MENTOR DETAILS */}
                    <h3
                      style={{
                        fontSize: "16.5px",
                        fontWeight: 800,
                        lineHeight: 1.3,
                        color: "var(--foreground, #0f172a)",
                        marginBottom: "6px",
                      }}
                    >
                      {mentor.name}
                    </h3>

                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#2563eb",
                        lineHeight: 1.4,
                        marginBottom: "4px",
                      }}
                    >
                      {mentor.designation || mentor.role}
                    </p>

                    <p
                      style={{
                        fontSize: "12.5px",
                        color: "var(--muted-foreground, #64748b)",
                        lineHeight: 1.4,
                        marginBottom: "16px",
                      }}
                    >
                      {mentor.organization}
                    </p>
                  </div>

                  {/* BOTTOM ACTION */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border, #f1f5f9)",
                      paddingTop: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#2563eb",
                    }}
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* JOIN MENTOR ROSTER CTA BANNER */}
          <div
            style={{
              background: "linear-gradient(135deg, #090d16 0%, #0f1c3f 100%)",
              borderRadius: "24px",
              padding: "48px 36px",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "28px",
              marginBottom: "80px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#93c5fd",
                  marginBottom: "16px",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" /> Mentor Onboarding
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1.2, marginBottom: "12px" }}>
                Empower the Next Generation of Innovators
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                Are you an industry veteran, technical leader, investor, or patent specialist? Partner with GUIITAR
                Council to guide high-impact student startups, prototypes, and applied research projects.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/partner"
                className="btn btn-primary btn-lg"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 700,
                  background: "#2563eb",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "12px",
                }}
              >
                <span>Join Mentor Roster</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/submit-idea"
                className="btn btn-outline btn-lg"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 700,
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.3)",
                  padding: "14px 28px",
                  borderRadius: "12px",
                }}
              >
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL PROFESSIONAL MENTOR DETAIL MODAL (NO EXTERNAL REDIRECT) */}
      {selectedMentor && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mentor-modal-title"
          onClick={() => setSelectedMentor(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card, #ffffff)",
              borderRadius: "24px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid var(--border, #e2e8f0)",
              overflow: "hidden",
              position: "relative",
              animation: "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedMentor(null)}
              aria-label="Close mentor details"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--background, #f1f5f9)",
                border: "1px solid var(--border, #e2e8f0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--foreground, #475569)",
                zIndex: 10,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--background, #f1f5f9)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <X className="w-5 h-5" />
            </button>

            <div style={{ padding: "32px 28px 28px 28px", textAlign: "center" }}>
              {/* LARGE PROFILE PHOTO */}
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  margin: "0 auto 20px auto",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #3b82f6",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
                  background: "#f8fafc",
                }}
              >
                <img
                  src={selectedMentor.avatar || "/images/mentors/sudhir-gupta.jpeg"}
                  alt={selectedMentor.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>

              {/* BADGE */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1e40af",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Industry Mentor
              </div>

              {/* NAME & ROLE */}
              <h2
                id="mentor-modal-title"
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--foreground, #0f172a)",
                  margin: "0 0 8px 0",
                }}
              >
                {selectedMentor.name}
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#2563eb",
                  margin: "0 0 4px 0",
                }}
              >
                {selectedMentor.designation || selectedMentor.role}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted-foreground, #64748b)",
                  margin: "0 0 20px 0",
                }}
              >
                {selectedMentor.organization}
              </p>

              {/* MENTOR META SPECIFICATIONS */}
              <div
                style={{
                  background: "var(--background, #f8fafc)",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1px solid var(--border, #e2e8f0)",
                  textAlign: "left",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <span style={{ color: "#94a3b8", display: "block", fontSize: "11px", fontWeight: 700 }}>
                      DOMAIN EXPERTISE
                    </span>
                    <strong style={{ color: "var(--foreground, #0f172a)" }}>
                      {selectedMentor.domain || "Industry Specialization"}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: "#94a3b8", display: "block", fontSize: "11px", fontWeight: 700 }}>
                      ESTIMATED EXPERIENCE
                    </span>
                    <strong style={{ color: "var(--foreground, #0f172a)" }}>
                      {selectedMentor.experience || "10+ Years"}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border, #e2e8f0)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12.5px",
                    color: "#166534",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Mentor & Institutional ISC Committee Member</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="btn btn-outline btn-md"
                  style={{ borderRadius: "10px", padding: "10px 20px", fontWeight: 600 }}
                >
                  Close
                </button>

                <Link
                  to="/submit-idea"
                  onClick={() => setSelectedMentor(null)}
                  className="btn btn-primary btn-md"
                  style={{
                    borderRadius: "10px",
                    padding: "10px 22px",
                    fontWeight: 700,
                    background: "#2563eb",
                    color: "#ffffff",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Request Mentorship</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
