import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  Award,
  Globe,
  Github,
  Video,
  ExternalLink,
  Users,
  Building,
  CheckCircle2,
  Share2,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero, ButtonLink } from "@/components/site";
import { AdminDataStore, type IdeaItem } from "@/lib/adminStore";
import { SHOWCASE_PROJECTS } from "@/lib/data";

export const Route = createFileRoute("/innovation/$slug")({
  component: InnovationSlugPage,
});

export function InnovationSlugPage() {
  const { slug } = Route.useParams();
  const [idea, setIdea] = useState<IdeaItem | null>(null);

  useEffect(() => {
    const found = AdminDataStore.getIdeaById(slug);
    if (found) {
      setIdea(found);
    } else {
      // Check fallback in SHOWCASE_PROJECTS
      const fallback = SHOWCASE_PROJECTS.find(
        (p) =>
          p.id === slug ||
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .includes(slug),
      );
      if (fallback) {
        setIdea({
          id: fallback.id,
          refId: `GUI-IDEA-${fallback.id.toUpperCase()}`,
          slug: fallback.id,
          title: fallback.name,
          shortDescription: fallback.description,
          detailedDescription: fallback.description,
          category: fallback.category,
          technology: fallback.technology,
          stage: fallback.stage as any,
          creatorType: "Student",
          creatorName: fallback.creator,
          creatorEmail: "innovator@gsfcuniversity.ac.in",
          creatorPhone: "",
          department: "GSFC University R&D",
          university: "GSFC University, Vadodara",
          teamMembers: [fallback.creator],
          problemStatement:
            "Unaddressed industrial and technological challenges requiring institutional research validation.",
          proposedSolution: fallback.description,
          innovationUsp: "Sub-system optimization with measurable institutional testing.",
          technologyUsed: fallback.technology,
          targetUsers: "Industrial and commercial partners.",
          industry: fallback.category,
          thrustArea: `${fallback.category} Systems`,
          coverImage:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
          galleryImages: [],
          expectedImpact: fallback.impact,
          sdgAlignment: ["SDG 9: Industry, Innovation & Infrastructure"],
          supportRequired: ["Mentorship", "Funding"],
          visibility: "Public",
          status: "Published",
          isFeatured: true,
          fundingSanctioned: fallback.fundingSanctioned,
          submittedAt: "2026-01-01",
          updatedAt: "2026-09-01",
          comments: [],
          activities: [],
        });
      }
    }
  }, [slug]);

  const relatedIdeas = useMemo(() => {
    return AdminDataStore.getPublishedIdeas()
      .filter((i) => i.id !== idea?.id && i.slug !== idea?.slug)
      .slice(0, 3);
  }, [idea]);

  if (!idea) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
          Innovation Showcase Record Not Found
        </h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          The requested innovation project has not yet been published or has been moved.
        </p>
        <Link to="/innovation" className="btn btn-primary btn-md">
          Browse All Innovations
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* TOP HEADER */}
      <section
        style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "60px 0 40px" }}
      >
        <div className="container">
          <Link
            to="/innovation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13.5px",
              fontWeight: 700,
              color: "#2563eb",
              textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Innovation Showcase
          </Link>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "14px",
              flexWrap: "wrap",
            }}
          >
            <span className="pill amber">{idea.category}</span>
            <span className="pill emerald">Stage: {idea.stage}</span>
            {idea.fundingSanctioned && (
              <span className="startup-grant-tag">{idea.fundingSanctioned}</span>
            )}
            <span style={{ fontSize: "12.5px", color: "#64748b", marginLeft: "auto" }}>
              Ref: <strong>{idea.refId}</strong>
            </span>
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 16px",
              lineHeight: 1.25,
            }}
          >
            {idea.title}
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              lineHeight: 1.6,
              maxWidth: "840px",
              margin: "0 0 24px",
            }}
          >
            {idea.shortDescription}
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {idea.creatorName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <strong style={{ fontSize: "14px", color: "#0f172a", display: "block" }}>
                  {idea.creatorName}
                </strong>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  {idea.creatorType} Innovator
                </span>
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "#475569" }}>
              <span
                style={{
                  color: "#64748b",
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Department
              </span>
              <strong>{idea.department}</strong>
            </div>

            <div style={{ fontSize: "13px", color: "#475569" }}>
              <span
                style={{
                  color: "#64748b",
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Institution
              </span>
              <strong>{idea.university}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section style={{ padding: "48px 0" }}>
        <div className="container">
          <div className="split" style={{ alignItems: "flex-start", gap: "36px" }}>
            {/* LEFT COLUMN: SPECS, PROBLEM, SOLUTION */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", minWidth: 0 }}>
              {/* COVER IMAGE */}
              {idea.coverImage && (
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <img
                    src={idea.coverImage}
                    alt={idea.title}
                    style={{
                      width: "100%",
                      maxHeight: "420px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* DETAILED OVERVIEW */}
              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: "0 0 14px",
                  }}
                >
                  Project Overview & Abstract
                </h2>
                <p style={{ color: "#334155", fontSize: "15.5px", lineHeight: 1.7, margin: 0 }}>
                  {idea.detailedDescription || idea.shortDescription}
                </p>
              </div>

              {/* PROBLEM & SOLUTION */}
              <div className="form-row-2" style={{ gap: "20px", marginBottom: 0 }}>
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "14px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#dc2626",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Identified Problem
                  </span>
                  <p style={{ color: "#7f1d1d", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {idea.problemStatement}
                  </p>
                </div>

                <div
                  style={{
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    borderRadius: "14px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#059669",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Engineered Solution
                  </span>
                  <p style={{ color: "#064e3b", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {idea.proposedSolution}
                  </p>
                </div>
              </div>

              {/* USP */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "24px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#2563eb",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Innovation / Unique Selling Proposition (USP)
                </span>
                <p
                  style={{
                    color: "#0f172a",
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {idea.innovationUsp}
                </p>
              </div>

              {/* GALLERY & MEDIA */}
              {idea.galleryImages && idea.galleryImages.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "14px",
                    }}
                  >
                    Laboratory Prototype Gallery
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {idea.galleryImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${idea.title} gallery ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: TECHNICAL METRICS & SUPPORT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {/* TECH & INDUSTRY */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: "16px",
                  }}
                >
                  Technical Architecture
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    fontSize: "13.5px",
                  }}
                >
                  <div>
                    <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                      Primary Technology
                    </span>
                    <strong style={{ color: "#2563eb" }}>{idea.technology}</strong>
                  </div>

                  <div>
                    <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                      Tools / Frameworks
                    </span>
                    <span style={{ color: "#0f172a", fontWeight: 600 }}>
                      {idea.technologyUsed || idea.technology}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                      Target Thrust Area
                    </span>
                    <span style={{ color: "#0f172a", fontWeight: 600 }}>{idea.thrustArea}</span>
                  </div>

                  <div>
                    <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                      Impact Milestone
                    </span>
                    <span style={{ color: "#059669", fontWeight: 700 }}>{idea.expectedImpact}</span>
                  </div>
                </div>
              </div>

              {/* SDG ALIGNMENT */}
              {idea.sdgAlignment && idea.sdgAlignment.length > 0 && (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "24px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "12px",
                    }}
                  >
                    UN Sustainable Development Goals
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {idea.sdgAlignment.map((sdg) => (
                      <span
                        key={sdg}
                        style={{
                          background: "#eff6ff",
                          color: "#1e40af",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          padding: "6px 12px",
                          borderRadius: "8px",
                        }}
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TEAM MEMBERS */}
              {idea.teamMembers && idea.teamMembers.length > 0 && (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "24px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Users className="w-4 h-4 text-blue-600" />
                    Innovator Team
                  </h3>
                  <ul
                    style={{ paddingLeft: "18px", margin: 0, fontSize: "13.5px", color: "#334155" }}
                  >
                    {idea.teamMembers.map((m) => (
                      <li key={m} style={{ marginBottom: "4px" }}>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* EXTERNAL LINKS */}
              {(idea.githubUrl || idea.demoUrl || idea.videoUrl) && (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "24px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "14px",
                    }}
                  >
                    Project Artifacts & Links
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {idea.githubUrl && (
                      <a
                        href={idea.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#2563eb",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <Github className="w-4 h-4" /> Open Source Codebase
                      </a>
                    )}
                    {idea.demoUrl && (
                      <a
                        href={idea.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#2563eb",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <Globe className="w-4 h-4" /> Live Working Demo
                      </a>
                    )}
                    {idea.videoUrl && (
                      <a
                        href={idea.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#2563eb",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <Video className="w-4 h-4" /> Video Presentation
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED INNOVATIONS */}
      {relatedIdeas.length > 0 && (
        <section className="section-muted">
          <div className="container">
            <h2
              style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "24px" }}
            >
              More Institutional Innovations
            </h2>
            <div className="grid-3">
              {relatedIdeas.map((rel) => (
                <article
                  key={rel.id}
                  className="plain-card"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span className="pill amber" style={{ marginBottom: "10px" }}>
                      {rel.category}
                    </span>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        margin: "8px 0 6px",
                        color: "#0f172a",
                      }}
                    >
                      {rel.title}
                    </h3>
                    <p
                      style={{
                        color: "#475569",
                        fontSize: "13.5px",
                        lineHeight: 1.5,
                        marginBottom: "16px",
                      }}
                    >
                      {rel.shortDescription}
                    </p>
                  </div>

                  <Link
                    to="/innovation/$slug"
                    params={{ slug: rel.slug }}
                    className="btn btn-outline btn-sm"
                    style={{ alignSelf: "flex-start" }}
                  >
                    View Innovation Profile
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Have an idea of your own?</span>
          <h2>Your Concept Could Be the Next Innovation on This Showcase</h2>
          <p>
            Submit your prototype proposal to GUIITAR Council. Receive up to ₹2.5 Lakhs in SSIP 2.0
            grant funding, laboratory access, and patent assistance.
          </p>
          <div className="button-row">
            <ButtonLink to="/submit-idea" size="lg" variant="dark">
              <span>Submit Your Idea</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
