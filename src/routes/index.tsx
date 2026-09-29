import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Lightbulb,
  Banknote,
  Users,
  Presentation,
  Network,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Plane,
  Award,
  ShieldCheck,
  Building2,
  Layers,
  FileCheck,
  TrendingUp,
  Sparkles,
  Compass,
  Search,
  Filter,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Clock,
  CalendarDays,
  MapPin,
  Flame,
} from "lucide-react";
import { ButtonLink, SectionTitle } from "@/components/site";
import { GuiitarEmblem, GuiitarFullLogo } from "@/components/GuiitarBrand";
import { ProgramsSupportSection } from "@/components/ProgramsSupportSection";
import { AnnualReturnSection, AssociationLinkagesSection } from "@/components/TransparencyPartnersSection";
import {
  VERIFIED_METRICS,
  INNOVATION_JOURNEY,
  ECOSYSTEM_NODES,
  SHOWCASE_PROJECTS,
  STARTUP_DIRECTORY,
  LAB_FACILITIES,
  MENTOR_NETWORK,
  OFFICIAL_FAQS,
  type ShowcaseProject,
} from "@/lib/data";
import hero from "@/assets/home-hero.jpg.asset.json";
import impact from "@/assets/impact.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GUIITAR Council — Innovation, Incubation & Entrepreneurship | GSFC University" },
      {
        name: "description",
        content:
          "GUIITAR Council is GSFC University's premier Section 8 non-profit incubation hub. Empowering students, innovators, and deep-tech startups from Idea to Market Impact.",
      },
      { property: "og:title", content: "GUIITAR Council — The Digital Home of Innovation" },
      {
        property: "og:description",
        content:
          "Where Ideas Become Impact. Access supercomputing labs, drone facilities, 1-on-1 mentorship, and non-dilutive seed funding up to ₹30 Lakhs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

export function HomePage() {
  // 1. Innovation Journey Stage State
  const [activeStageId, setActiveStageId] = useState("ideate");
  const currentStage = useMemo(
    () => INNOVATION_JOURNEY.find((s) => s.id === activeStageId) || INNOVATION_JOURNEY[0],
    [activeStageId],
  );

  // 2. Ecosystem Map Selected Node State
  const [activeEcoNode, setActiveEcoNode] = useState(ECOSYSTEM_NODES[0]);

  // 3. Showcase Filter State
  const [projectCategory, setProjectCategory] = useState<string>("All");
  const projectCategories = ["All", "AI", "Robotics", "IoT", "Biotech", "CleanTech"];
  const filteredProjects = useMemo(() => {
    if (projectCategory === "All") return SHOWCASE_PROJECTS;
    return SHOWCASE_PROJECTS.filter((p) => p.category === projectCategory);
  }, [projectCategory]);

  // 4. Funding Navigator Interactive State
  const [navRole, setNavRole] = useState<"Student" | "Innovator" | "Startup" | "Researcher">(
    "Student",
  );
  const [navStage, setNavStage] = useState<"Idea" | "Prototype" | "MVP" | "Growth">("Idea");
  const [navNeed, setNavNeed] = useState<"Prototype Funding" | "IPR" | "Mentorship" | "Scaling">(
    "Prototype Funding",
  );

  const matchedFunding = useMemo(() => {
    if (navRole === "Student" || navStage === "Idea" || navStage === "Prototype") {
      return {
        name: "SSIP 2.0 Grant Scheme",
        badge: "Student Innovation Policy",
        amount: "Up to ₹2.5 Lakhs (Non-Dilutive)",
        desc: "Ideal for student innovators, diploma, UG, PG, PhD scholars and recent alumni under 35 years building functional proof-of-concepts.",
        cta: "Apply for SSIP 2.0",
        to: "/funding",
      };
    } else if (navNeed === "IPR") {
      return {
        name: "GUIITAR IPR Support Grant",
        badge: "Patent & IP Subsidy",
        amount: "Up to ₹1.5 Lakhs per Filing",
        desc: "Comprehensive prior-art search, patent attorney drafting, and statutory fee coverage for novel inventions.",
        cta: "Apply for IPR Grant",
        to: "/funding",
      };
    } else {
      return {
        name: "Gujarat Industrial Policy 2020",
        badge: "Venture Acceleration",
        amount: "Up to ₹30 Lakhs (Milestone Tranches)",
        desc: "Substantial fiscal and operational grant assistance for registered startups with working prototypes entering commercial production.",
        cta: "Apply for Growth Grant",
        to: "/funding",
      };
    }
  }, [navRole, navStage, navNeed]);

  // 5. Virtual Spaces Active Facility
  const [activeLabId, setActiveLabId] = useState("makers-lab");
  const currentLab = useMemo(
    () => LAB_FACILITIES.find((l) => l.id === activeLabId) || LAB_FACILITIES[0],
    [activeLabId],
  );

  // 6. Mentor Network Domain Filter
  const [mentorDomain, setMentorDomain] = useState<string>("All");
  const mentorDomains = ["All", "Governance", "Technology", "Business", "Research", "Legal & IPR", "Industry"];
  const filteredMentors = useMemo(() => {
    if (mentorDomain === "All") return MENTOR_NETWORK;
    return MENTOR_NETWORK.filter((m) => m.domain === mentorDomain);
  }, [mentorDomain]);

  return (
    <div className="home-container">
      {/* 1. CINEMATIC HERO SECTION */}
      <section
        className="home-hero-editorial"
        style={{
          background: "linear-gradient(135deg, #070a12 0%, #0c1322 50%, #0f1c3f 100%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          padding: "110px 0 90px",
        }}
      >
        {/* Subtle geometric dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.25,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Subtle deep blue ambient glow behind center-right graphic */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translate(20%, -50%)",
            width: "650px",
            height: "650px",
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(30, 58, 138, 0.06) 50%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(40px)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-grid-split">
            {/* Left Hero Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "rgba(37, 99, 235, 0.15)",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  borderRadius: "9999px",
                  color: "#93c5fd",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "24px",
                  letterSpacing: "0.02em",
                }}
              >
                <span className="pulse-dot" />
                <span>GSFC UNIVERSITY • SECTION 8 INCUBATION HUB</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(42px, 5.5vw, 68px)",
                  lineHeight: 1.05,
                  fontWeight: 900,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  margin: "0 0 24px",
                }}
              >
                Where Ideas <br />
                <span className="text-gradient-light">Become Impact.</span>
              </h1>

              <p
                style={{
                  fontSize: "18.5px",
                  lineHeight: 1.65,
                  color: "#cbd5e1",
                  maxWidth: "600px",
                  margin: "0 0 36px",
                }}
              >
                GUIITAR Council empowers students, innovators, and startups with the ecosystem,
                mentorship, infrastructure, and non-dilutive funding needed to turn bold ideas into
                meaningful ventures.
              </p>

              <div className="hero-btn-row">
                <ButtonLink to="/apply" size="lg" variant="primary">
                  <span>Start Your Innovation Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </ButtonLink>
                <ButtonLink to="/about" size="lg" variant="glass">
                  <span>Explore GUIITAR</span>
                </ButtonLink>
              </div>

              {/* Verified Institutional Endorsement Pills */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "40px",
                  paddingTop: "28px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#64748b",
                    letterSpacing: "0.06em",
                  }}
                >
                  Institutional Linkages:
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>
                  GSFC Limited
                </span>
                <span style={{ color: "#475569" }}>•</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>
                  DST Gujarat
                </span>
                <span style={{ color: "#475569" }}>•</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>
                  SSIP 2.0
                </span>
                <span style={{ color: "#475569" }}>•</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>NASSCOM</span>
              </div>
            </div>

            {/* Right Hero: Dynamic Interactive Innovation Ecosystem Visualization */}
            <div
              className="hero-ecosystem-visual"
              style={{
                position: "relative",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "24px",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "440px",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Central Glowing IDEA Node */}
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                  boxShadow: "0 0 35px rgba(234, 88, 12, 0.6)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "15px",
                  letterSpacing: "0.05em",
                  zIndex: 3,
                }}
              >
                <Lightbulb className="w-6 h-6 mb-1" />
                <span>IDEA</span>
              </div>

              {/* Orbiting Ecosystem Nodes */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {/* Visual Orbit Track Ring */}
                <div
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(96, 165, 250, 0.25)",
                    position: "absolute",
                  }}
                />
              </div>

              {/* Orbiting Nodes Grid around center */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                  gap: "10px",
                  width: "100%",
                  marginTop: "28px",
                  zIndex: 3,
                }}
              >
                {[
                  { name: "RESEARCH", icon: Cpu },
                  { name: "PROTOTYPE", icon: Layers },
                  { name: "IPR", icon: ShieldCheck },
                  { name: "MENTOR", icon: Users },
                  { name: "FUNDING", icon: Banknote },
                  { name: "INCUBATE", icon: Building2 },
                  { name: "STARTUP", icon: Rocket },
                  { name: "IMPACT", icon: Award },
                ].map((node) => (
                  <div
                    key={node.name}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "10px",
                      padding: "8px 6px",
                      textAlign: "center",
                      color: "#e2e8f0",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <node.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span>{node.name}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>
                  Active Innovation Loop • 83+ Startups in Flight
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE NUMBERS (Full-Width Enormous Impact Section) */}
      <section
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "50px 0",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
        }}
      >
        <div className="container">
          <div className="stats-counter-grid">
            {VERIFIED_METRICS.map((m) => (
              <div key={m.label} style={{ textAlign: "center", padding: "8px" }}>
                <strong
                  style={{
                    display: "block",
                    fontSize: "clamp(32px, 3.5vw, 44px)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    color: "#1d4ed8",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {m.value}
                </strong>
                <span
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginTop: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "4px",
                  }}
                >
                  {m.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FIND YOUR PATH ("What brings you here?") */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Tailored Pathways"
            title="What Brings You Here?"
            subtitle="Choose your profile to discover the exact resources, grant programs, and next steps tailored to your goals."
          />

          <div className="grid-3">
            {[
              {
                role: "STUDENT",
                quote: "I have an idea.",
                desc: "Access the E-Club innovation wing, participate in hackathons, and apply for student prototyping grants up to ₹2.5 Lakhs.",
                btnText: "Explore Innovation",
                to: "/innovation",
                badge: "Ideation & E-Club",
                icon: Lightbulb,
              },
              {
                role: "INNOVATOR",
                quote: "I want to build a prototype.",
                desc: "Utilize the Param Shavak Supercomputer, Drone Testing Center, and Makers 3D Lab with hardware assistance.",
                btnText: "Build With Us",
                to: "/innovation",
                badge: "Prototyping Labs",
                icon: Cpu,
              },
              {
                role: "STARTUP",
                quote: "I want to grow my venture.",
                desc: "Secure dedicated co-working suites at Anviksha, legal incorporation guidance, and seed capital up to ₹30 Lakhs.",
                btnText: "Explore Incubation",
                to: "/startups",
                badge: "Incubation Suites",
                icon: Rocket,
              },
              {
                role: "RESEARCHER",
                quote: "I want to transform research into impact.",
                desc: "Commercialize laboratory discoveries, file patents with ₹1.5L IPR grants, and secure industry pilot validation.",
                btnText: "Explore Research",
                to: "/programs",
                badge: "IPR & Patents",
                icon: ShieldCheck,
              },
              {
                role: "MENTOR",
                quote: "I want to guide the next generation.",
                desc: "Join our advisory network of corporate CXOs, scientists, and angel investors mentoring top university innovators.",
                btnText: "Become a Mentor",
                to: "/ecosystem",
                badge: "Advisory Network",
                icon: Users,
              },
              {
                role: "INDUSTRY",
                quote: "I want to collaborate with innovators.",
                desc: "Deploy corporate challenge statements, sponsor CSR startup grants, and scout pre-vetted deep-tech talent.",
                btnText: "Partner With Us",
                to: "/partner",
                badge: "Corporate CSR & MOUs",
                icon: Network,
              },
            ].map((p) => (
              <article
                key={p.role}
                className="plain-card"
                style={{
                  padding: "32px 28px",
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
                    <span className="pill">{p.badge}</span>
                    <p.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "#64748b",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.role}
                  </span>
                  <h3
                    style={{
                      fontSize: "21px",
                      fontWeight: 800,
                      margin: "4px 0 10px",
                      color: "#0f172a",
                    }}
                  >
                    "{p.quote}"
                  </h3>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "14.5px",
                      lineHeight: 1.6,
                      marginBottom: "24px",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <ButtonLink
                  to={p.to}
                  variant="outline"
                  size="sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>{p.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION A: PROGRAMS & SUPPORT (SSIP, IPR Centre, Nodal Institute) */}
      <ProgramsSupportSection />

      {/* ANNUAL STATUTORY RETURN COMPLIANCE */}
      <AnnualReturnSection />

      {/* 4. THE INNOVATION JOURNEY ("From First Thought to Real-World Impact") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="The 8-Stage Roadmap"
            title="From First Thought to Real-World Impact"
            subtitle="Click any stage below to explore what happens, what support GUIITAR provides, eligibility, and direct actions."
          />

          {/* Horizontal Interactive Stepper Bar */}
          <div className="journey-stepper-bar">
            {INNOVATION_JOURNEY.map((s) => {
              const isActive = s.id === activeStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStageId(s.id)}
                  style={{
                    background: isActive ? "var(--primary)" : "var(--card)",
                    color: isActive ? "#ffffff" : "var(--foreground)",
                    border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                    borderRadius: "12px",
                    padding: "14px 10px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isActive ? "0 4px 14px rgba(37, 99, 235, 0.3)" : "none",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: 800,
                      opacity: isActive ? 0.9 : 0.6,
                    }}
                  >
                    STAGE {s.step}
                  </span>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "13.5px",
                      fontWeight: 800,
                      marginTop: "2px",
                    }}
                  >
                    {s.name}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Panel */}
          <div className="journey-detail-panel">
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}
              >
                <span className="pill emerald">Stage {currentStage.step} of 08</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                  {currentStage.name} PHASE
                </span>
              </div>

              <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 14px" }}>
                {currentStage.headline}
              </h3>
              <p
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "16px",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                {currentStage.whatHappens}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    marginBottom: "10px",
                  }}
                >
                  What GUIITAR Unlocks at this Stage:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "20px", fontSize: "14.5px" }}
                >
                  {currentStage.supportProvided.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <ButtonLink to={currentStage.ctaLink} size="md">
                <span>{currentStage.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                Stage Specifications
              </h4>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Eligibility
                  </span>
                  <p style={{ margin: "2px 0 0", fontWeight: 600 }}>
                    {currentStage.eligible}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Key Programs
                  </span>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                    {currentStage.programs.map((p) => (
                      <span
                        key={p}
                        style={{
                          background: "var(--accent-glow, rgba(37, 99, 235, 0.1))",
                          color: "var(--primary)",
                          padding: "3px 9px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Key Resource
                  </span>
                  <p style={{ margin: "2px 0 0", fontWeight: 600 }}>
                    {currentStage.resources}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE UNLOCK (Interactive Ecosystem Node Map) */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Full-Stack Capabilities"
            title="What We Unlock"
            subtitle="GUIITAR sits at the center of a high-leverage matrix providing funding, prototyping labs, IPR protection, and industry access."
          />

          <div className="eco-node-tabs">
            {ECOSYSTEM_NODES.map((node) => {
              const isSelected = activeEcoNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveEcoNode(node)}
                  style={{
                    background: isSelected ? "#1d4ed8" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#1e293b",
                    border: `1px solid ${isSelected ? "#1d4ed8" : "#e2e8f0"}`,
                    borderRadius: "12px",
                    padding: "20px 14px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 6px 18px rgba(37, 99, 235, 0.3)"
                      : "var(--shadow-sm)",
                    transition: "all 0.2s",
                  }}
                >
                  <strong style={{ display: "block", fontSize: "14px", fontWeight: 800 }}>
                    {node.name}
                  </strong>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11.5px",
                      opacity: isSelected ? 0.9 : 0.6,
                      marginTop: "4px",
                    }}
                  >
                    {node.metrics}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Ecosystem Node Spotlight */}
          <div className="eco-spotlight-box">
            <div>
              <span className="pill">{activeEcoNode.metrics}</span>
              <h3 style={{ fontSize: "26px", fontWeight: 800, margin: "12px 0 10px" }}>
                {activeEcoNode.name} Ecosystem Support
              </h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "16px", lineHeight: 1.65, margin: 0 }}>
                {activeEcoNode.description}
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "12px",
                }}
              >
                Key Offerings & Deliverables:
              </h4>
              <ul
                className="list"
                style={{ paddingLeft: "18px", fontSize: "14px" }}
              >
                {activeEcoNode.keyOfferings.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
              <div style={{ marginTop: "16px" }}>
                <ButtonLink to="/apply" size="sm">
                  <span>Access {activeEcoNode.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INNOVATION SHOWCASE ("Built Here") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Innovation Showcase"
            title="Built Here."
            subtitle="Explore groundbreaking student inventions, deep-tech research breakthroughs, and funded commercial prototypes developed at GUIITAR."
          />

          {/* Category Filter Pills */}
          <div className="tabs">
            {projectCategories.map((c) => (
              <button
                key={c}
                className={`tab ${projectCategory === c ? "active" : ""}`}
                onClick={() => setProjectCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Large Editorial Showcase Cards */}
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
                      color: "#0f172a",
                    }}
                  >
                    {p.name}
                  </h3>

                  <span
                    style={{
                      fontSize: "12.5px",
                      color: "#2563eb",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    Tech: {p.technology}
                  </span>

                  <p
                    style={{
                      color: "#475569",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      marginBottom: "18px",
                    }}
                  >
                    {p.description}
                  </p>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      color: "#334155",
                      marginBottom: "18px",
                    }}
                  >
                    <strong style={{ color: "#0f172a", display: "block", marginBottom: "2px" }}>
                      Verified Impact:
                    </strong>
                    {p.impact}
                  </div>
                </div>

                <Link
                  to="/innovation"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: 700,
                    color: "#2563eb",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  <span>View Project Details</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="center spaced">
            <ButtonLink to="/innovation" size="lg">
              <span>View All 50+ Projects & Research Showcases</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 7. STARTUP ECOSYSTEM ("From Campus to Company") */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Startup Directory"
            title="From Campus to Company."
            subtitle="Meet the trailblazing student and alumni startup ventures officially incubated and accelerated at GUIITAR."
          />

          <div className="grid-2">
            {STARTUP_DIRECTORY.map((s) => (
              <article
                key={s.id}
                className="plain-card"
                style={{
                  padding: "32px 28px",
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
                      marginBottom: "12px",
                    }}
                  >
                    <span className="pill emerald">{s.stage}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
                      Founded {s.foundedYear}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 6px" }}>{s.name}</h3>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#2563eb",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {s.tagline}
                  </span>

                  <p
                    style={{
                      color: "#475569",
                      fontSize: "14.5px",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {s.description}
                  </p>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}
                  >
                    {s.achievements.map((a) => (
                      <span
                        key={a}
                        style={{
                          background: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          color: "#334155",
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#64748b" }}>{s.team}</span>
                  <Link
                    to="/startups"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 700,
                      color: "#2563eb",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    <span>View Venture Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="center spaced">
            <ButtonLink to="/startups" size="lg">
              <span>Explore Complete Startup Directory</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 8. FUNDING NAVIGATOR ("Find the Support That Fits Your Idea") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Interactive Grant Matcher"
            title="Find the Support That Fits Your Idea"
            subtitle="Answer 3 simple questions to instantly match with official non-dilutive grant schemes, eligibility criteria, and disbursement caps."
          />

          <div
            style={{
              background: "linear-gradient(135deg, #090d16, #1e3a8a)",
              borderRadius: "24px",
              padding: "44px 40px",
              color: "#ffffff",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.2)",
            }}
            className="funding-nav-card"
          >
            <div className="funding-nav-grid" style={{ marginBottom: "36px" }}>
              {/* Question 1: Who are you? */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#93c5fd",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  1. Who are you?
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(["Student", "Innovator", "Startup", "Researcher"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setNavRole(role)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        textAlign: "left",
                        background: navRole === role ? "#2563eb" : "rgba(255, 255, 255, 0.08)",
                        border: `1px solid ${navRole === role ? "#60a5fa" : "rgba(255, 255, 255, 0.15)"}`,
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: What stage are you at? */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#93c5fd",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  2. What stage are you at?
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(["Idea", "Prototype", "MVP", "Growth"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setNavStage(st)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        textAlign: "left",
                        background: navStage === st ? "#2563eb" : "rgba(255, 255, 255, 0.08)",
                        border: `1px solid ${navStage === st ? "#60a5fa" : "rgba(255, 255, 255, 0.15)"}`,
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: What do you need? */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#93c5fd",
                    letterSpacing: "0.05em",
                    marginBottom: "12px",
                  }}
                >
                  3. What do you need?
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(["Prototype Funding", "IPR", "Mentorship", "Scaling"] as const).map((need) => (
                    <button
                      key={need}
                      onClick={() => setNavNeed(need)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        textAlign: "left",
                        background: navNeed === need ? "#2563eb" : "rgba(255, 255, 255, 0.08)",
                        border: `1px solid ${navNeed === need ? "#60a5fa" : "rgba(255, 255, 255, 0.15)"}`,
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched Scheme Output Banner */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "28px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    background: "#2563eb",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    color: "#ffffff",
                  }}
                >
                  Recommended Match
                </span>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "8px 0 4px",
                  }}
                >
                  {matchedFunding.name}
                </h3>
                <strong
                  style={{
                    fontSize: "20px",
                    color: "#38bdf8",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {matchedFunding.amount}
                </strong>
                <p style={{ color: "#cbd5e1", fontSize: "14px", margin: 0, maxWidth: "600px" }}>
                  {matchedFunding.desc}
                </p>
              </div>

              <ButtonLink to={matchedFunding.to} variant="primary" size="lg">
                <span>{matchedFunding.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EXPLORE OUR SPACES ("Build Where Ideas Come Alive") */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="World-Class Infrastructure"
            title="Build Where Ideas Come Alive"
            subtitle="Explore our specialized computing clusters, drone testbenches, prototyping suites, and co-working floors."
          />

          {/* Facility Exploration Switcher Tabs */}
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

          {/* Active Lab Spotlight Showcase */}
          <div className="lab-showcase-split">
            <div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}
              >
                <span className="pill">{currentLab.zone}</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }}>
                  Verified GSFC University Facility
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
                  Available Equipment & Toolkits:
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

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="https://forms.gle/EM81FwAN5i4S3FmcA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <span>Book Lab / Request Access</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
                  Primary Use Cases:
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
                  Who Can Access:
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

      {/* 10. MENTOR NETWORK ("Don't Build Alone.") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Advisory Power"
            title="Don't Build Alone."
            subtitle="Get guidance from seasoned corporate CXOs, university research guides, patent attorneys, and venture builders."
          />

          {/* Domain Filter Pills */}
          <div className="tabs">
            {mentorDomains.map((d) => (
              <button
                key={d}
                className={`tab ${mentorDomain === d ? "active" : ""}`}
                onClick={() => setMentorDomain(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid-4">
            {filteredMentors.slice(0, 8).map((m) => (
              <article
                key={m.id}
                className="plain-card"
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {m.avatar ? (
                    <img
                      src={m.avatar}
                      alt={m.name}
                      style={{
                        margin: "0 auto 16px",
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #3b82f6",
                        display: "block",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="avatar"
                      style={{
                        margin: "0 auto 16px",
                        width: "64px",
                        height: "64px",
                        fontSize: "20px",
                      }}
                    >
                      {m.name
                        .split(" ")
                        .filter(
                          (x) =>
                            x.length > 2 &&
                            !x.includes("Dr.") &&
                            !x.includes("Mr.") &&
                            !x.includes("Prof."),
                        )
                        .slice(0, 2)
                        .map((x) => x[0])
                        .join("") || "GM"}
                    </div>
                  )}

                  <span className="pill" style={{ marginBottom: "8px", fontSize: "11px" }}>
                    {m.domain}
                  </span>

                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "6px 0 2px" }}>
                    {m.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#2563eb",
                      fontWeight: 600,
                      margin: "0 0 10px",
                    }}
                  >
                    {m.designation}
                  </p>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "14px",
                    }}
                  >
                    {m.experience}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    {m.expertise.slice(0, 2).map((exp) => (
                      <span
                        key={exp}
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          fontSize: "11px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <ButtonLink
                  to="/apply"
                  variant="outline"
                  size="sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>Connect With Mentor</span>
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EVENTS DISCOVERY PLATFORM */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Live Ecosystem"
            title="Workshops, Hackathons & Masterclasses"
            subtitle="Hands-on deep-tech bootcamps, autonomous drone flying workshops, and investor demo days."
          />

          <div className="featured-event">
            <div className="event-date-box">
              <CalendarDays />
              <b>October 17, 2026</b>
              <span>Hardware & UAV Masterclass</span>
            </div>

            <div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}
              >
                <span className="pill emerald">45 Seats Available</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb" }}>
                  Free for GSFC Students & Incubatees
                </span>
              </div>

              <h2>Autonomous Drone Technology & Aerodynamics Workshop</h2>
              <p
                style={{
                  color: "#475569",
                  fontSize: "15.5px",
                  lineHeight: 1.6,
                  margin: "10px 0 16px",
                }}
              >
                Hands-on multi-rotor drone assembly, electronic speed controller (ESC) rigging,
                ArduPilot autonomous waypoint mission planning, and DGCA airspace regulations.
              </p>

              <div className="event-meta">
                <span>
                  <Clock /> 10:00 AM – 4:30 PM IST
                </span>
                <span>
                  <MapPin /> Drone Research Lab & SOT Proving Ground
                </span>
              </div>

              <ButtonLink to="/events" size="md">
                <span>Register for Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 12. SUCCESS STORIES ("Proof That Ideas Can Move.") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Case Studies"
            title="Proof That Ideas Can Move."
            subtitle="Real student founders who translated raw laboratory research into funded commercial solutions with GUIITAR Council."
          />

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "44px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <span className="pill emerald">Featured Venture Case Study</span>
                <h3 style={{ fontSize: "28px", fontWeight: 900, margin: "8px 0 4px" }}>
                  Ayurtrix Healthcare — Three Folding Life
                </h3>
                <span style={{ fontSize: "14px", color: "#2563eb", fontWeight: 700 }}>
                  Founded by GSFC University Student Innovators • ₹2,50,000 SSIP 2.0 Sanction
                </span>
              </div>
              <ButtonLink to="/startups" variant="outline" size="sm">
                <span>View Full Venture Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ButtonLink>
            </div>

            <div className="case-study-grid" style={{ marginTop: "28px" }}>
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#ea580c",
                  }}
                >
                  The Problem
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "14px",
                    color: "#334155",
                    lineHeight: 1.55,
                  }}
                >
                  Widespread inconsistency, heavy metal adulteration, and lack of standardized
                  botanical bioactive markers in commercial herbal formulations.
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#2563eb",
                  }}
                >
                  The Solution & GUIITAR Support
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "14px",
                    color: "#334155",
                    lineHeight: 1.55,
                  }}
                >
                  Utilized GSFC University chemistry labs and ₹2.5L SSIP grant to isolate botanical
                  bio-markers and file 3 institutional patent disclosures.
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "#059669",
                  }}
                >
                  The Outcome & Impact
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "14px",
                    color: "#334155",
                    lineHeight: 1.55,
                  }}
                >
                  Successfully developed 3 standardized therapeutic formulations ready for
                  commercial pilot production and institutional transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. EDITORIAL LEADERSHIP & GOVERNANCE */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Institutional Governance"
            title="Guided by Visionary Leaders"
            subtitle="Steered by former senior administrative leaders, academic scholars, and veteran industrial engineers."
          />

          <div className="grid-2">
            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Create an environment of excellence through innovation for you will forever be
                remembered for your contribution to the world. Innovation is a journey in which you
                have to say no to thousands of things which already exist while embracing the
                one which is yet to come.
              </p>
              <div className="leader-footer">
                <img
                  src="/leaders/pk-taneja.png"
                  alt="Shri P. K. Taneja, IAS (Retd.)"
                  className="leader-avatar-photo"
                  width={68}
                  height={68}
                  loading="lazy"
                />
                <div className="leader-info">
                  <span className="leader-desk-badge">Message from President's Desk</span>
                  <h3>Shri P. K. Taneja, IAS (Retd.)</h3>
                  <p>President, GSFC University & Director, GUIITAR Council</p>
                </div>
              </div>
            </article>

            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Innovation is not to repeat a success story but to celebrate a failure. Pick-up and
                never Give-up is an attitude towards innovation.
              </p>
              <div className="leader-footer">
                <img
                  src="/leaders/gr-sinha.png"
                  alt="Dr G R Sinha"
                  className="leader-avatar-photo"
                  width={68}
                  height={68}
                  loading="lazy"
                />
                <div className="leader-info">
                  <span className="leader-desk-badge">Message from Provost's Desk</span>
                  <h3>Dr G R Sinha</h3>
                  <p>Provost, GSFC University & CEO, GUIITAR Council</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 14. PARTNERS ("An Ecosystem Is Stronger Together") */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Strategic Alliances"
            title="An Ecosystem Is Stronger Together"
            subtitle="Proudly collaborating with leading industrial corporations, state government departments, and premier national incubators."
          />

          <div className="linkages">
            {[
              { name: "GSFC LTD", type: "Parent Industrial Body" },
              { name: "GSFC UNIVERSITY", type: "Academic Foundation" },
              { name: "DST GUJARAT", type: "Department of Science & Tech" },
              { name: "NASSCOM", type: "Tech Industry Council" },
              { name: "iCreate", type: "National Innovation Hub" },
              { name: "AIC-GISC", type: "Atal Incubation Center" },
            ].map((p) => (
              <div key={p.name} className="linkage-item">
                <strong>{p.name}</strong>
                <span>{p.type}</span>
              </div>
            ))}
          </div>

          <div className="center spaced">
            <ButtonLink to="/partner" variant="outline" size="md">
              <span>Explore Partnership Opportunities & MOUs</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 15. INSIGHTS ("Inside the Ecosystem") */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Ecosystem Editorial"
            title="Inside the Ecosystem"
            subtitle="Technology breakthroughs, patent analysis, and startup founder journeys from GUIITAR Council."
          />

          <div className="grid-3">
            {[
              {
                title: "How Bio-Lastic Upcycles Temple Flowers into Degradable Polymers",
                category: "CleanTech & Materials",
                readTime: "4 min read",
                desc: "A look into the chemical compounding process converting organic waste into packaging films.",
              },
              {
                title: "Accelerating AI Vision Models with the Param Shavak DL GPU Cluster",
                category: "High-Performance Computing",
                readTime: "5 min read",
                desc: "How university research cohorts benchmark PyTorch neural networks for agri-diagnostics.",
              },
              {
                title: "A Founder’s Step-by-Step Guide to Securing SSIP 2.0 Prototyping Grants",
                category: "Funding & Grants",
                readTime: "6 min read",
                desc: "Everything student innovators need to know before pitching to the Institutional Screening Committee.",
              },
            ].map((ins) => (
              <article
                key={ins.title}
                className="plain-card"
                style={{
                  padding: "28px",
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
                      marginBottom: "12px",
                    }}
                  >
                    <span className="pill">{ins.category}</span>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>{ins.readTime}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      margin: "0 0 10px",
                      lineHeight: 1.35,
                    }}
                  >
                    {ins.title}
                  </h3>
                  <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.55 }}>{ins.desc}</p>
                </div>
                <Link
                  to="/resources"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#2563eb",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    textDecoration: "none",
                    marginTop: "16px",
                  }}
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ASSOCIATION & LINKAGES (COLLABORATIVE NETWORK) */}
      <AssociationLinkagesSection />

      {/* 16. FINAL CTA BANNER */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">The Digital Home of Innovation</span>
          <h2>Turn Your Bold Idea Into Gujarat's Next High-Impact Venture.</h2>
          <p>
            Whether you are a student with an idea, an innovator building hardware prototypes, or an
            established startup seeking acceleration — GUIITAR Council is your launchpad.
          </p>
          <div className="button-row">
            <ButtonLink to="/apply" size="lg" variant="dark">
              <span>Start Your Application</span>
              <ArrowRight className="w-5 h-5" />
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Visit Incubation Hub</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
