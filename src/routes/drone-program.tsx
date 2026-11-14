import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plane,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Download,
  Award,
  Sparkles,
  Cpu,
  Target,
  Wrench,
  BookOpen,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/drone-program")({
  head: () => ({
    meta: [
      { title: "Advanced Drone Lab & Training Program — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Official Drone Training & Research Program at GUIITAR Council, GSFC University in collaboration with Garuda Aerospace Pvt. Ltd. UAV assembly, flight avionics, and DGCA regulations.",
      },
      { property: "og:title", content: "Drone Training Program — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Advanced Drone Lab, aeronautical research, and industrial UAV training at GSFC University Vadodara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DroneProgramPage,
});

const CURRICULUM_MODULES = [
  {
    title: "Aerodynamics & Multi-Rotor Physics",
    desc: "Principles of multi-rotor lift, thrust-to-weight optimization, propeller sizing, brushless DC motor dynamics, and battery discharge curves.",
    badge: "Module 1",
  },
  {
    title: "Flight Controllers & Avionics Rigging",
    desc: "Hands-on assembly of Pixhawk, ArduPilot, and Betaflight micro-controllers, electronic speed controllers (ESC), and radio receivers.",
    badge: "Module 2",
  },
  {
    title: "Autonomous Mission Planning & Telemetry",
    desc: "Configuring autonomous waypoints, geofencing, fail-safe RTL (Return to Launch) routines using Mission Planner and QGroundControl software.",
    badge: "Module 3",
  },
  {
    title: "Sensor Payload Integration",
    desc: "Mounting and calibrating multispectral cameras, optical zoom gimbals, thermal sensors, and agricultural pesticide spraying nozzles.",
    badge: "Module 4",
  },
  {
    title: "DGCA Compliance, Airspace Rules & Safety",
    desc: "Understanding Directorate General of Civil Aviation (DGCA) regulations, DigitalSky portal registration, green/yellow/red airspace zones, and pilot logbooks.",
    badge: "Module 5",
  },
  {
    title: "Hands-on Flight Testing & Proving Grounds",
    desc: "Supervised outdoor flight testing on the dedicated GSFC University SOT grounds, obstacle avoidance practice, and payload drop testing.",
    badge: "Module 6",
  },
];

const RESEARCH_APPLICATIONS = [
  {
    title: "Precision Agriculture",
    desc: "Crop health indexing (NDVI mapping), targeted fertilizer spraying, and soil moisture assessment in collaboration with GSFC Ltd agricultural scientists.",
  },
  {
    title: "Industrial & Pipeline Inspection",
    desc: "Automated visual and thermal inspection of chemical plant storage spheres, flare stacks, pipelines, and industrial rooftops without human risk.",
  },
  {
    title: "Disaster Management & Emergency Delivery",
    desc: "Autonomous emergency medical kit delivery, flood mapping, and rapid survey drones with long-range telemetry links.",
  },
  {
    title: "Surveillance & Perimeter Security",
    desc: "AI-powered real-time object tracking, perimeter boundary monitoring, and nighttime thermal surveillance drones.",
  },
];

export function DroneProgramPage() {
  return (
    <>
      <PageHero
        badge="Aerospace & UAV Center of Excellence"
        title="Drone Training & Research Program"
        text="A premier technological initiative hosted at the Advanced Drone Lab of GUIITAR Council, GSFC University, in strategic institutional partnership with Garuda Aerospace Pvt. Ltd."
      >
        <div className="button-row">
          <a
            href="https://forms.gle/sUvSDHDubWQVdLHi8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Register for Next Drone Cohort</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <ButtonLink to="/contact" size="md" variant="outline">
            <span>Enquire for Research Collaborations</span>
          </ButtonLink>
        </div>
      </PageHero>

      {/* STRATEGIC PARTNERSHIP CALLOUT */}
      <section style={{ padding: "40px 0 20px" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
              borderRadius: "20px",
              padding: "36px 32px",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "center",
              boxShadow: "0 16px 36px -8px rgba(15, 23, 42, 0.3)",
            }}
          >
            <div>
              <span className="pill blue" style={{ marginBottom: "12px", display: "inline-block" }}>
                Industry Alliance
              </span>
              <h2 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 14px 0", color: "#ffffff" }}>
                In Strategic Partnership with Garuda Aerospace Pvt. Ltd.
              </h2>
              <p style={{ fontSize: "14.5px", color: "#cbd5e1", lineHeight: "1.7", margin: 0 }}>
                Garuda Aerospace Pvt. Ltd. is one of India's leading drone manufacturing and precision technology enterprises. Under this official association, GUIITAR Council and Garuda Aerospace collaborate on drone design curriculum, technical student training, industrial research validation, and certification programs aligned with national DGCA civil aviation standards.
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#60a5fa", margin: "0 0 12px 0" }}>
                Key Pillars of the Partnership:
              </h4>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "#e2e8f0", lineHeight: "1.65" }}>
                <li>Industry-certified drone assembly and flight piloting curriculum.</li>
                <li>Access to state-of-the-art agricultural and industrial drone frames.</li>
                <li>Joint student internships, live field training, and placement pathways.</li>
                <li>Collaboration on DGCA Type Certified payload testing benches.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED DRONE LAB INFRASTRUCTURE */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Laboratory Capabilities"
            title="The Advanced Drone Lab at GSFC University"
            subtitle="Equipped with complete aeronautical fabrication and flight simulation workstations."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {[
              {
                title: "Thrust & Dynamic Testbenches",
                desc: "High-accuracy load cells and RPM tachometers for measuring brushless motor thrust curves, voltage efficiency, and thermal performance.",
                icon: Wrench,
              },
              {
                title: "Avionics Assembly & Soldering Suites",
                desc: "ESD-safe workstations with digital temperature-controlled soldering irons, hot-air reflow, and oscilloscope debugging benches.",
                icon: Cpu,
              },
              {
                title: "Flight Simulator Stations",
                desc: "RealFlight and custom aerodynamic flight simulators enabling students to master manual piloting and emergency recovery without crash risk.",
                icon: Plane,
              },
              {
                title: "Dedicated Outdoor Flight Field",
                desc: "Enclosed flight test zone on the university campus with high-tension safety nets for safe autonomous waypoint calibration.",
                icon: Target,
              },
            ].map((lab) => {
              const IconComp = lab.icon;
              return (
                <div
                  key={lab.title}
                  className="plain-card"
                  style={{
                    padding: "26px",
                    borderRadius: "18px",
                    border: "1px solid var(--border-color, #e2e8f0)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                      color: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 8px 0", color: "var(--text)" }}>
                    {lab.title}
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                    {lab.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAINING CURRICULUM */}
      <section className="section-muted" style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Comprehensive Training Modules"
            title="Curriculum &amp; Hands-on Modules"
            subtitle="Structured to take students from aerodynamic fundamentals to autonomous waypoint missions."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {CURRICULUM_MODULES.map((mod) => (
              <div
                key={mod.title}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "18px",
                  padding: "26px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span className="pill blue" style={{ fontSize: "11px", marginBottom: "8px" }}>
                    {mod.badge}
                  </span>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 8px 0", color: "var(--text)" }}>
                    {mod.title}
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH APPLICATIONS */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Industrial Impact"
            title="Translational Research &amp; Applications"
            subtitle="Developing deep-tech drone solutions solving challenges in chemical plants, agriculture, and public safety."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {RESEARCH_APPLICATIONS.map((res) => (
              <div
                key={res.title}
                className="plain-card"
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                }}
              >
                <h4 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 8px 0", color: "var(--text)" }}>
                  {res.title}
                </h4>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                  {res.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENROLLMENT CTA */}
      <section className="section-blue cta" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)" }}>
        <div className="container">
          <span className="section-badge light">Take to the Skies</span>
          <h2>Enroll in the Upcoming Drone Engineering Batch</h2>
          <p>
            Learn drone assembly, autonomous navigation, and DGCA flight regulations from certified pilots and aeronautical researchers.
          </p>
          <div className="button-row">
            <a
              href="https://forms.gle/sUvSDHDubWQVdLHi8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
            >
              <span>Apply for Drone Training</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/coworking" size="lg" variant="glass">
              <span>View Drone Lab Facilities</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

