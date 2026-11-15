import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Wifi,
  Users,
  ShieldCheck,
  Clock,
  Printer,
  Sparkles,
  ArrowRight,
  Download,
  ExternalLink,
  CheckCircle2,
  FileText,
  Monitor,
  Laptop,
  Compass,
  Phone,
  Mail,
  MapPin,
  Flame,
  Layers,
  BookOpen,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/coworking")({
  head: () => ({
    meta: [
      { title: "Co-Working Space & Infrastructure — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Official Co-working Space at GUIITAR Council, GSFC University Vadodara. Dedicated & flexible desks, high-speed Wi-Fi, conference suites, prototyping labs, 3D printing, laser cutting, and 24/7 security.",
      },
      { property: "og:title", content: "Co-Working Space & Labs — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "High-tech incubation infrastructure, Maker Lab, Supercomputing, and flexible co-working suites for student and startup founders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoworkingPage,
});

const FACILITIES_LIST = [
  {
    title: "Dedicated & Flexible Work Desks",
    desc: "Ergonomic furniture with private lockers, modular flex hot-desks, power hubs, and dedicated pod allotments for registered incubatees.",
    icon: Laptop,
    badge: "Workstations",
  },
  {
    title: "High-Speed Enterprise Wi-Fi",
    desc: "Dual gigabit redundant fiber connectivity across Anviksha Innovation Hub with uninterrupted power backup and IT network support.",
    icon: Wifi,
    badge: "Connectivity",
  },
  {
    title: "Multimedia Meeting & Conference Rooms",
    desc: "12-seater acoustically treated presentation conference room equipped with 4K interactive presentation display, teleconferencing, and glass whiteboards.",
    icon: Users,
    badge: "Collaboration",
  },
  {
    title: "Prototyping Laboratory Access",
    desc: "Direct access to Maker Lab, Tinkering Lab, Design IoT Lab, and Supercomputer suites located within the same university innovation complex.",
    icon: Sparkles,
    badge: "Prototyping",
  },
  {
    title: "3D Printers & Laser Cutter (Pay-as-you-go)",
    desc: "State-of-the-art SLA and FDM 3D printers, precision CO2 laser cutting, and vinyl plotters available on subsidized institutional pay-as-you-go billing.",
    icon: Printer,
    badge: "Fabrication",
  },
  {
    title: "All-Time Access with 24/7 Security",
    desc: "RFID and biometric access control, full CCTV surveillance, security personnel, and safe after-hours working permissions for intensive development sprints.",
    icon: ShieldCheck,
    badge: "Security & Safety",
  },
  {
    title: "Mentorship & Corporate Networking",
    desc: "Weekly office hours with technical executives, patent attorneys, GSFC Ltd industry specialists, and venture capital advisors.",
    icon: Compass,
    badge: "Mentorship",
  },
  {
    title: "Entrepreneurship & IPR Library (Till 11 PM)",
    desc: "Specialized collection of books on startup formation, venture finance, patent search, and technology transfer, open until 11:00 PM for incubatees.",
    icon: BookOpen,
    badge: "Library Access",
  },
];

const COMPLETE_INFRA_FACILITIES = [
  {
    name: "GUIITAR Lab",
    zone: "Incubation Core",
    location: "2nd Floor, Anviksha Building",
    desc: "The central nervous system of incubation at GSFC University. Coordinates screening, legal onboarding, mentorship sprints, and project tracking.",
  },
  {
    name: "Co-Working Space",
    zone: "Venture Suites",
    location: "2nd Floor, Anviksha Building",
    desc: "Dedicated and flexible desks, private discussion pods, conference facilities, and collaborative brainstorming stations for student and startup teams.",
  },
  {
    name: "Tinkering Lab",
    zone: "Electronics & Hardware",
    location: "Anviksha Technical Wing",
    desc: "Rapid electronics experimentation benches with digital oscilloscopes, function generators, soldering stations, microcontrollers, and hardware toolkits.",
  },
  {
    name: "Maker Lab / Prototyping Lab",
    zone: "Digital Fabrication",
    location: "Ground Floor Workshop Complex",
    desc: "Equipped with FDM and SLA industrial 3D printers, precision laser cutters, CNC profiling tables, and finishing tools for proof-of-concept builds.",
  },
  {
    name: "Super Computer Lab (Param Shavak DL)",
    zone: "AI & High-Performance Compute",
    location: "Anviksha Supercomputing Center",
    desc: "Powered by the Param Shavak DL GPU Supercomputing system to accelerate deep learning training, computer vision models, and compute-intensive simulations.",
  },
  {
    name: "Design IoT Lab",
    zone: "IoT & Telemetry",
    location: "School of Technology Wing",
    desc: "Advanced embedded electronics bench, RF communication analyzers (LoRa, BLE, Zigbee), wireless sensor arrays, and telemetry prototyping gear.",
  },
  {
    name: "Surjan Ideation Arena",
    zone: "Design Thinking",
    location: "Anviksha Central Atrium",
    desc: "An open, flexible design-thinking and collaborative ideation space for multidisciplinary hackathons, brainstorming circles, and demo sessions.",
  },
  {
    name: "Advanced Drone & UAV Lab",
    zone: "Aerospace & Flight Rigs",
    location: "SOT Flight Hangar & Drone Field",
    desc: "Aeronautical test benches, autonomous flight avionics (Pixhawk/ArduPilot), payload calibration, and flight proving grounds in partnership with Garuda Aerospace.",
  },
  {
    name: "Specialized Innovation Library",
    zone: "Knowledge & IPR",
    location: "University Library Hub (Accessible till 11 PM)",
    desc: "Exhaustive repositories of literature on intellectual property rights, patent case studies, entrepreneurship biographies, venture finance, and technology laws.",
  },
];

const ELIGIBLE_COHORTS = [
  {
    title: "Enrolled Students",
    desc: "Undergraduate, postgraduate, and diploma students of GSFC University or regional universities working on verified innovations or SSIP 2.0 projects.",
  },
  {
    title: "University Alumni",
    desc: "Recent graduates (within 5 years of graduation) developing early-stage commercial ventures, tech prototypes, or service platforms.",
  },
  {
    title: "Faculty Innovators & Researchers",
    desc: "Professors, research scholars, and PhD fellows pursuing translational research, technology transfer, or spin-off enterprises.",
  },
  {
    title: "External Early-Stage Startups",
    desc: "Regional startups registered under DPIIT or incorporated under Companies Act / LLP seeking institutional incubation and lab testing access.",
  },
];

export function CoworkingPage() {
  return (
    <>
      <PageHero
        badge="World-Class Incubation Infrastructure"
        title="Co-Working Space & Laboratories"
        text="A modern, fully equipped innovation hub in Vadodara providing dedicated workstations, rapid prototyping labs, supercomputing compute, and 24/7 security for visionary founders."
      >
        <div className="button-row">
          <Link
            to="/apply"
            search={{ track: "incubation" }}
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Apply for Co-Working Space</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <span>Co-Working Guidelines (PDF)</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </PageHero>

      {/* THREE ESSENTIAL DOCUMENTS CALLOUT */}
      <section style={{ padding: "36px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "var(--card-bg, #ffffff)",
                border: "1.5px solid #2563eb",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 8px 24px -4px rgba(37, 99, 235, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="pill blue" style={{ fontSize: "11px" }}>Official Document</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>
                Co-Working Policy Guidelines
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.5", marginBottom: "16px" }}>
                Official SOP governing desk allotment rules, code of conduct, lab bench access timings, safety regulations, and tenure terms.
              </p>
              <a
                href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Download className="w-4 h-4" />
                <span>Download Policy Guidelines (PDF)</span>
              </a>
            </div>

            <div
              style={{
                background: "var(--card-bg, #ffffff)",
                border: "1.5px solid #059669",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 8px 24px -4px rgba(5, 150, 105, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <Laptop className="w-5 h-5 text-emerald-600" />
                <span className="pill emerald" style={{ fontSize: "11px" }}>Online Intake</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>
                Co-Working Space Application Form
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.5", marginBottom: "16px" }}>
                Submit your team information, required number of desks, incubation stage, and laboratory requirements directly to the allotment committee.
              </p>
              <Link
                to="/apply"
                search={{ track: "incubation" }}
                className="btn btn-primary btn-sm"
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Apply for Desk Allotment Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div
              style={{
                background: "var(--card-bg, #ffffff)",
                border: "1.5px solid #ea580c",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 8px 24px -4px rgba(234, 88, 12, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <Building2 className="w-5 h-5 text-orange-600" />
                <span className="pill amber" style={{ fontSize: "11px" }}>Brochure &amp; Specs</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>
                GUIITAR Council Infrastructure Specs
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.5", marginBottom: "16px" }}>
                Complete brochure covering photo walkthroughs, lab equipment specifications, Param Shavak compute details, and fee structure.
              </p>
              <Link
                to="/innovation"
                className="btn btn-outline btn-sm"
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Explore Full Infrastructure Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED ACTUAL FACILITIES */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Actual Co-Working Amenities"
            title="Designed for Deep-Tech & Student Founders"
            subtitle="Everything needed for rapid prototype iterations, team collaboration, and professional stakeholder meetings."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {FACILITIES_LIST.map((fac) => {
              const IconComp = fac.icon;
              return (
                <article
                  key={fac.title}
                  className="plain-card"
                  style={{
                    padding: "28px 24px",
                    borderRadius: "18px",
                    border: "1px solid var(--border-color, #e2e8f0)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="pill" style={{ fontSize: "11px", marginBottom: "8px", display: "inline-block" }}>
                      {fac.badge}
                    </span>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px", color: "var(--text)" }}>
                      {fac.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                      {fac.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL FACILITY-BY-FACILITY INVENTORY (9 FACILITIES) */}
      <section className="section-muted" style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Complete Infrastructure Inventory"
            title="All 9 Official Facilities at GSFC University"
            subtitle="Verified against official institutional records. No simulated capabilities; only real lab infrastructure."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "22px",
              marginTop: "32px",
            }}
          >
            {COMPLETE_INFRA_FACILITIES.map((f, i) => (
              <div
                key={f.name}
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span className="pill emerald" style={{ fontSize: "11px" }}>{f.zone}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b" }}>Facility #{i + 1}</span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 4px", color: "var(--text)" }}>
                    {f.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#2563eb", fontWeight: 600, marginBottom: "12px" }}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{f.location}</span>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.6", margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Eligibility & Cohorts"
            title="Who is Eligible for Co-Working Allotment?"
            subtitle="Open across all university faculties, regional engineering colleges, and verified regional innovators."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {ELIGIBLE_COHORTS.map((c) => (
              <div
                key={c.title}
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 style={{ fontSize: "16px", fontWeight: 800, margin: 0 }}>{c.title}</h4>
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: "1.55", margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / BOOK LAB */}
      <section className="section-blue cta" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)" }}>
        <div className="container">
          <span className="section-badge light">Ready to Move In?</span>
          <h2>Secure Your Co-Working Workstation & Lab Slots</h2>
          <p>
            Whether you are assembling a drone, training deep neural nets, or scaling an incorporated venture, GUIITAR Council provides the workspace and ecosystem you need.
          </p>
          <div className="button-row">
            <a
              href="https://forms.gle/EM81FwAN5i4S3FmcA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
            >
              <span>Submit Co-Working Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Schedule Campus Lab Visit</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

