import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FlaskConical,
  ExternalLink,
  Cpu,
  Plane,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  CalendarDays,
  FileCheck,
  AlertCircle,
  ArrowRight,
  User,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/lab-booking")({
  head: () => ({
    meta: [
      { title: "Lab & Prototyping Booking — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Book specialized prototyping laboratories, Param Shavak Supercomputing slots, Advanced Drone UAV arena, and 3D printing equipment at GUIITAR Council.",
      },
      { property: "og:title", content: "Lab & Prototyping Booking — GUIITAR Council" },
      {
        property: "og:description",
        content: "Official slot reservation portal for GSFC University makerspaces and testing labs.",
      },
    ],
  }),
  component: LabBookingPage,
});

export function LabBookingPage() {
  const labFormUrl = "https://forms.gle/EM81FwAN5i4S3FmcA";

  const labs = [
    {
      id: "param-shavak",
      name: "Param Shavak Supercomputer Lab",
      icon: Cpu,
      desc: "High-performance parallel computing cluster dedicated to neural network training, molecular dynamics, computational fluid dynamics (CFD), and finite element modeling.",
      equipment: "PARAM Shavak Supercomputing System, GPU acceleration nodes, Linux HPC environment",
      inCharge: "Mr. Dev Patel (Tech Associate 3) / Mr. Hemant Rajput",
      slots: "Monday – Friday (09:00 AM – 06:00 PM)",
    },
    {
      id: "maker-lab",
      name: "Makers & Rapid Prototyping Lab",
      icon: Layers,
      desc: "Precision additive manufacturing, fused deposition modeling (FDM), stereolithography (SLA) resin 3D printing, and mechanical prototyping.",
      equipment: "Industrial Dual-Extruder 3D Printers, Laser Engraving & Cutting, Silhouette Cutters",
      inCharge: "Ms. Lavanya Jain (Tech Associate 2) / Mr. Tirth Darji",
      slots: "Monday – Saturday (09:00 AM – 06:00 PM)",
    },
    {
      id: "drone-lab",
      name: "Advanced Drone & UAV Testing Arena",
      icon: Plane,
      desc: "Indoor multi-rotor test benches, autonomous flight controller flashing (Pixhawk / ArduPilot), motor thrust dynamometer, and avionics workbench.",
      equipment: "Garuda Aerospace Drone Kits, Telemetry transceivers, LiPo charging lockers, Spectrum analyzers",
      inCharge: "Mr. Krishay Shah (Tech Associate 1) / Mr. Amit Duggal",
      slots: "Tuesday – Saturday (10:00 AM – 05:00 PM)",
    },
    {
      id: "iot-lab",
      name: "IoT & Embedded Electronics Bench",
      icon: Cpu,
      desc: "Hardware-level embedded electronics debugging, RF telemetry test suites (LoRa, BLE, Zigbee), SMD soldering/rework stations, and digital oscilloscopes.",
      equipment: "Mixed Signal Oscilloscopes, Function Generators, Logic Analyzers, SMD Soldering Stations",
      inCharge: "Mr. Krishay Shah (Tech Associate 1)",
      slots: "Monday – Friday (09:30 AM – 05:30 PM)",
    },
    {
      id: "chemistry-lab",
      name: "Wet Chemistry & Bioprocess Labs",
      icon: FlaskConical,
      desc: "Specialized analytical chemistry and life sciences bench space supporting herbal extraction, microbial fermentation, HPLC, and spectrophotometry.",
      equipment: "Rotary evaporators, UV-Vis Spectrophotometer, Laminar Air Flow, Centrifuges",
      inCharge: "Ms. Chaitali Karpe (Lab Assistant — Chemistry)",
      slots: "Prior Approval Required (Mon – Fri)",
    },
    {
      id: "srujan-arena",
      name: "Srujan Ideation & Pitch Arena",
      icon: Sparkles,
      desc: "Multi-functional design thinking workspace, modular seating, interactive digital whiteboards, and AV projection for demo days and sprint presentations.",
      equipment: "12-seater conference video conferencing, 4K digital display, breakout ideation boards",
      inCharge: "Ms. Nishita Navlani (Tech Associate 5)",
      slots: "Reservation via slot booking (09:00 AM – 08:00 PM)",
    },
  ];

  return (
    <>
      <PageHero
        badge="Prototyping & Makerspace Booking"
        title="Reserve Laboratory & Compute Slots"
        text="Access state-of-the-art innovation infrastructure at Anviksha Innovation Hub. Enrolled university innovators, faculty researchers, and officially incubated startups can reserve dedicated workbench slots and equipment."
      >
        <div className="button-row">
          <a
            href={labFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Open Google Booking Form</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#lab-directory" className="btn btn-outline btn-md">
            <span>Explore Lab Directory</span>
          </a>
        </div>
      </PageHero>

      {/* LAB DIRECTORY */}
      <section id="lab-directory" style={{ padding: "48px 0 20px" }}>
        <div className="container">
          <SectionTitle
            badge="Infrastructure Capacity"
            title="Specialized Laboratory Facilities"
            subtitle="Review facility specifications, equipment availability, and lab in-charges before submitting your requisition."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="plain-card"
                style={{
                  padding: "28px",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(37, 99, 235, 0.1)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <lab.icon className="w-5 h-5" />
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                      {lab.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "16px" }}>
                    {lab.desc}
                  </p>

                  <div
                    style={{
                      background: "var(--surface-muted, #f8fafc)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      marginBottom: "16px",
                      fontSize: "12.5px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div>
                      <strong style={{ color: "var(--text)" }}>Primary Equipment:</strong>{" "}
                      <span style={{ color: "var(--muted-foreground)" }}>{lab.equipment}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text)" }}>Standard Timings:</strong>{" "}
                      <span style={{ color: "var(--muted-foreground)" }}>{lab.slots}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "5px" }}>
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{lab.inCharge}</span>
                  </span>
                  <a
                    href={labFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <span>Book Slot</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED BOOKING FRAME */}
      <section className="section-muted" style={{ padding: "48px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Online Reservation"
            title="Official Lab Booking Form"
            subtitle="Fill out the official requisition form below to request workbench time, compute credits, or prototyping assistance."
          />

          <div
            style={{
              maxWidth: "840px",
              margin: "24px auto 0",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                background: "var(--surface-muted, #f8fafc)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlaskConical className="w-4 h-4 text-primary" />
                <span style={{ fontSize: "13.5px", fontWeight: 700 }}>
                  GUIITAR Council — Prototyping Lab Requisition Portal
                </span>
              </div>
              <a
                href={labFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Open in New Window</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div style={{ minHeight: "800px", position: "relative" }}>
              <iframe
                src={`${labFormUrl}?embedded=true`}
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="GUIITAR Lab Booking Form"
                style={{ display: "block", border: "none" }}
              >
                Loading booking form…
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* LAB BOOKING SOP & POLICIES */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container" style={{ maxWidth: "840px" }}>
          <div
            className="amber-notice-box"
            style={{
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>
              Official Laboratory Standard Operating Procedure (SOP)
            </h4>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13.5px", lineHeight: 1.6 }}>
              <li>
                <strong>Advance Booking:</strong> Lab requests must be submitted at least <strong>24 hours in advance</strong> for standard equipment, and <strong>48 hours in advance</strong> for Param Shavak compute jobs.
              </li>
              <li>
                <strong>Safety Gear Mandatory:</strong> Closed-toe shoes and safety glasses are mandatory inside Makers Lab and Chemistry benches. LiPo batteries must only be handled inside fire-retardant charge lockers.
              </li>
              <li>
                <strong>Material Procurement:</strong> Standard 3D printer PLA filament and basic electronics are covered under SSIP PoC allowances; specialized filaments, resins, and chemicals must be requisitioned with mentor approval.
              </li>
              <li>
                <strong>Assistance & Verification:</strong> All machines must be inspected by the duty Technical Associate before and after each working sprint.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

