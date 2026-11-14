import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
  Lightbulb,
  Building2,
  Users,
  ShieldCheck,
  Presentation,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  CalendarDays,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";
import { AdminDataStore, type IncubationProgram } from "@/lib/adminStore";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Incubation & Acceleration Programs — GUIITAR Council" },
      {
        name: "description",
        content:
          "Explore specialized incubation programs, Student Innovation E-Club, IPR grants, 1-on-1 mentorship, and tech bootcamps at GSFC University.",
      },
      { property: "og:title", content: "Incubation & Acceleration Programs — GUIITAR Council" },
      {
        property: "og:description",
        content: "Structured incubation tracks for students, researchers, and scalable ventures.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});

export function ProgramsPage() {
  const [storePrograms, setStorePrograms] = useState<IncubationProgram[]>([]);

  const loadPrograms = () => {
    setStorePrograms(AdminDataStore.getPrograms());
  };

  useEffect(() => {
    loadPrograms();
    const handleUpdate = () => loadPrograms();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const programsList = useMemo(() => {
    if (storePrograms.length === 0) return [];
    return storePrograms.map((p) => ({
      id: p.id,
      name: p.name,
      badge: p.duration,
      tagline: p.tagline || p.description,
      whoCanApply:
        p.eligibility && p.eligibility.length > 0
          ? p.eligibility.join(" • ")
          : "Students, faculty researchers, and innovators.",
      whatYouReceive:
        p.features && p.features.length > 0
          ? p.features
          : [
              `Grant funding: ${p.grantSupport}`,
              "Access to specialized prototyping labs and Param Shavak compute",
              "Direct 1-on-1 industry mentorship",
              "Assistance for patent search and attorney filings",
            ],
      process: [
        "Online submission",
        "Technical screening review",
        "Institutional pitch",
        "Onboarding & tranche release",
      ],
      timeline: `${p.duration} structured incubation cycle`,
      cta: "Apply for Track",
      grantSupport: p.grantSupport,
      targetCohort: p.targetCohort,
      description: p.description,
    }));
  }, [storePrograms]);

  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  useEffect(() => {
    if (
      programsList.length > 0 &&
      (!selectedProgramId || !programsList.some((p) => p.id === selectedProgramId))
    ) {
      setSelectedProgramId(programsList[0].id);
    }
  }, [programsList, selectedProgramId]);

  const activeProgram = programsList.find((p) => p.id === selectedProgramId) ||
    programsList[0] || {
      id: "default",
      name: "Genesis Incubation Track",
      badge: "3 Months",
      tagline: "From hypothesis to working proof of concept.",
      whoCanApply: "Students and innovators.",
      whatYouReceive: ["Prototyping Grant", "Lab access"],
      process: ["Apply", "Review", "Incubate"],
      timeline: "3 Months",
      cta: "Apply",
    };

  return (
    <>
      <PageHero
        badge="Structured Incubation Tracks"
        title="Programs Built to Accelerate Your Venture"
        text="From campus ideation clinics to multi-lakh grant disbursals and corporate pilot trials — find the exact incubation track for your stage."
      >
        <div className="button-row">
          <ButtonLink to="/apply" size="md" variant="primary">
            <span>Apply for Program Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* PROGRAM TRACK SELECTOR TABS */}
      <section>
        <div className="container">
          <div className="tabs">
            {programsList.map((p) => (
              <button
                key={p.id}
                className={`tab ${selectedProgramId === p.id ? "active" : ""}`}
                onClick={() => setSelectedProgramId(p.id)}
              >
                {p.name.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* ACTIVE PROGRAM DETAILED DOSSIER */}
          <div className="program-dossier-grid">
            <div>
              <span className="pill emerald" style={{ marginBottom: "12px" }}>
                {activeProgram.badge}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 4vw, 32px)",
                  fontWeight: 900,
                  margin: "8px 0 10px",
                }}
              >
                {activeProgram.name}
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  fontWeight: 600,
                  color: "var(--primary)",
                  margin: "0 0 24px",
                  lineHeight: 1.5,
                }}
              >
                {activeProgram.tagline}
              </p>

              <div style={{ marginBottom: "28px" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.04em",
                    marginBottom: "12px",
                  }}
                >
                  What You Receive:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "20px", fontSize: "15px" }}
                >
                  {activeProgram.whatYouReceive.map((item) => (
                    <li key={item} style={{ marginBottom: "8px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.04em",
                    marginBottom: "12px",
                  }}
                >
                  4-Stage Process:
                </h4>
                <div className="form-row-2" style={{ gap: "10px", marginBottom: 0 }}>
                  {activeProgram.process.map((step, idx) => (
                    <div
                      key={step}
                      style={{
                        background: "var(--card)",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        fontSize: "13.5px",
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ color: "var(--primary)", fontWeight: 800, marginRight: "6px" }}>
                        0{idx + 1}.
                      </span>{" "}
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <ButtonLink to="/apply" size="lg">
                <span>{activeProgram.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>

            <div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginBottom: "10px",
                  }}
                >
                  Target Beneficiaries:
                </h4>
                <p
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 600,
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {activeProgram.whoCanApply}
                </p>

                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginBottom: "8px",
                  }}
                >
                  Typical Program Timeline:
                </h4>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: "24px",
                  }}
                >
                  ⏱ {activeProgram.timeline}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "18px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#059669",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  ✓ Non-Profit Institutional Commitment
                </span>
                <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                  Administered under GSFC University non-profit Section 8 governance with zero
                  equity dilution on student prototyping grants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL COUNCILS & SPECIALIZED TRACKS */}
      <section style={{ padding: "60px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <SectionTitle
            badge="Institutional Pillars"
            title="Specialized Councils &amp; Programs"
            subtitle="Explore dedicated student societies, national innovation councils, drone flight schools, and official incubation policies."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                borderRadius: "18px",
                padding: "26px",
                border: "1.5px solid #ea580c",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(234, 88, 12, 0.08)",
              }}
            >
              <div>
                <span className="pill amber" style={{ fontSize: "11px", marginBottom: "8px" }}>
                  Est. Dec 2024
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px 0" }}>
                  Entrepreneurship Club (E-Club)
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "18px" }}>
                  Official student-led innovation society under GUIITAR Council. Monthly hackathons, maker workshops, ideathons, and founder networking.
                </p>
              </div>
              <ButtonLink to="/e-club" size="sm" variant="outline">
                <span>Explore E-Club Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ButtonLink>
            </div>

            <div
              style={{
                background: "var(--card)",
                borderRadius: "18px",
                padding: "26px",
                border: "1.5px solid #2563eb",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(37, 99, 235, 0.08)",
              }}
            >
              <div>
                <span className="pill blue" style={{ fontSize: "11px", marginBottom: "8px" }}>
                  MoE / AICTE Mandate
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px 0" }}>
                  Institution's Innovation Council (IIC)
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "18px" }}>
                  Established under the Ministry of Education's Innovation Cell. Oversees idea scouting, design thinking, NISP implementation, and mentor pools.
                </p>
              </div>
              <ButtonLink to="/iic" size="sm" variant="outline">
                <span>Explore IIC Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ButtonLink>
            </div>

            <div
              style={{
                background: "var(--card)",
                borderRadius: "18px",
                padding: "26px",
                border: "1.5px solid #0284c7",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(2, 132, 199, 0.08)",
              }}
            >
              <div>
                <span className="pill cyan" style={{ fontSize: "11px", marginBottom: "8px" }}>
                  Garuda Aerospace Alliance
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px 0" }}>
                  Drone Training &amp; Research Program
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "18px" }}>
                  Advanced aeronautical lab, multi-rotor assembly, flight avionics, DGCA airspace rules, and outdoor flight proving grounds.
                </p>
              </div>
              <ButtonLink to="/drone-program" size="sm" variant="outline">
                <span>Explore Drone Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ButtonLink>
            </div>

            <div
              style={{
                background: "var(--card)",
                borderRadius: "18px",
                padding: "26px",
                border: "1.5px solid #059669",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(5, 150, 105, 0.08)",
              }}
            >
              <div>
                <span className="pill emerald" style={{ fontSize: "11px", marginBottom: "8px" }}>
                  18-Month SOP
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px 0" }}>
                  Official Startup Incubation Policy
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", marginBottom: "18px" }}>
                  Binding 4-stage incubation procedure (Spark-up, Grooming, Incubation, Graduation), seed loan norms, and monthly reporting.
                </p>
              </div>
              <ButtonLink to="/policy" size="sm" variant="outline">
                <span>Read Official Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PROGRAMS GRID */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Program Portfolio"
            title="All Incubation & Skill-Building Tracks"
            subtitle="Explore our full spectrum of student, founder, and researcher development programs."
          />

          <div className="grid-2">
            {programsList.map((p) => (
              <article key={p.id} className="plain-card" style={{ padding: "32px 28px" }}>
                <span className="pill" style={{ marginBottom: "12px" }}>
                  {p.badge}
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 8px" }}>{p.name}</h3>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {p.tagline}
                </p>
                <div
                  style={{
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#64748b" }}>{p.timeline}</span>
                  <ButtonLink to="/apply" variant="outline" size="sm">
                    <span>Apply for Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Start Here</span>
          <h2>Not Sure Which Program Fits Your Stage?</h2>
          <p>
            Use our interactive Funding Navigator or connect directly with our incubation managers
            for an exploratory consultation.
          </p>
          <div className="button-row">
            <ButtonLink to="/funding" size="lg" variant="dark">
              <span>Launch Funding Navigator</span>
              <ArrowRight className="w-4 h-4" />
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
