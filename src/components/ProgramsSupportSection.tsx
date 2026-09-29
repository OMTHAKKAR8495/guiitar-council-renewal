import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Lightbulb, Building2, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "./site";

export interface ProgramSupportCard {
  id: string;
  title: string;
  badge: string;
  icon: typeof Lightbulb;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  accentColor: "blue" | "orange" | "emerald";
}

export const PROGRAMS_SUPPORT_DATA: ProgramSupportCard[] = [
  {
    id: "ssip",
    title: "SSIP (Student Start-up & Innovation Policy)",
    badge: "Govt. of Gujarat Initiative",
    icon: Lightbulb,
    description:
      "Financial assistance and mentorship for student innovators, diploma, UG, PG, PhD scholars, and recent alumni to build functional proof-of-concepts.",
    features: [
      "Up to ₹2.5 Lakhs non-dilutive grant per innovative project",
      "Prototyping support, raw material procurement & lab access",
      "Pre-incubation guidance from faculty & industry mentors",
    ],
    ctaText: "Explore SSIP Support",
    ctaLink: "/ssip",
    accentColor: "blue",
  },
  {
    id: "ipr",
    title: "IPR Centre",
    badge: "Intellectual Property Cell",
    icon: ShieldCheck,
    description:
      "End-to-end facilitation for patent drafting, prior-art searches, trademark registrations, and intellectual property rights protection for research breakthroughs.",
    features: [
      "Reimbursement up to ₹1.5 Lakhs per domestic patent filing",
      "Assistance with patent attorneys and legal documentation",
      "Copyright, design registration, and commercial licensing",
    ],
    ctaText: "Explore IPR Support",
    ctaLink: "/ipr",
    accentColor: "orange",
  },
  {
    id: "nodal",
    title: "Nodal Institute",
    badge: "Startup Gujarat Recognized",
    icon: Building2,
    description:
      "Official institutional gateway under the Industries Commissionerate, Government of Gujarat, providing scale-up seed funding and operational support for registered startups.",
    features: [
      "Sustenance allowance & seed funding assistance up to ₹30 Lakhs",
      "Institutional validation & market access opportunities",
      "Plug-and-play coworking infrastructure and pilot deployment",
    ],
    ctaText: "Explore Nodal Institute",
    ctaLink: "/nodal-institute",
    accentColor: "emerald",
  },
];

export function ProgramsSupportSection() {
  return (
    <section
      id="programs-support"
      className="programs-support-section"
      style={{
        padding: "80px 0",
        background: "var(--background-alt, #f8fafc)",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1360px",
          width: "100%",
          padding: "0 24px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <SectionTitle
          badge="Flagship Institutional Initiatives"
          title="Programs & Support"
          subtitle="Explore government-backed grant schemes, intellectual property facilitation, and nodal startup acceleration provided through GUIITAR Council."
          align="center"
        />

        <div
          className="programs-support-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            marginTop: "48px",
            alignItems: "stretch",
          }}
        >
          {PROGRAMS_SUPPORT_DATA.map((prog) => {
            const IconComponent = prog.icon;
            const badgeBg =
              prog.accentColor === "blue"
                ? "#eff6ff"
                : prog.accentColor === "orange"
                ? "#fff7ed"
                : "#ecfdf5";
            const badgeBorder =
              prog.accentColor === "blue"
                ? "#bfdbfe"
                : prog.accentColor === "orange"
                ? "#fed7aa"
                : "#a7f3d0";
            const badgeColor =
              prog.accentColor === "blue"
                ? "#1e40af"
                : prog.accentColor === "orange"
                ? "#c2410c"
                : "#047857";
            const iconBg =
              prog.accentColor === "blue"
                ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
                : prog.accentColor === "orange"
                ? "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)"
                : "linear-gradient(135deg, #047857 0%, #10b981 100%)";
            const buttonBg =
              prog.accentColor === "blue"
                ? "#1e40af"
                : prog.accentColor === "orange"
                ? "#c2410c"
                : "#047857";

            return (
              <div
                key={prog.id}
                className="program-support-card"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "22px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "22px",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        background: iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.15)",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        padding: "6px 12px",
                        borderRadius: "9999px",
                        background: badgeBg,
                        border: `1px solid ${badgeBorder}`,
                        color: badgeColor,
                      }}
                    >
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "21px",
                      fontWeight: 800,
                      color: "var(--text-heading, #0f172a)",
                      lineHeight: "1.35",
                      marginBottom: "14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.65",
                      color: "var(--text-muted, #475569)",
                      marginBottom: "24px",
                    }}
                  >
                    {prog.description}
                  </p>

                  {/* Features List */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 32px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {prog.features.map((feat, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "13.5px",
                          lineHeight: "1.5",
                          color: "var(--text-body, #334155)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: badgeColor, marginTop: "2px" }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Action */}
                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  {prog.ctaLink.startsWith("/") ? (
                    <Link
                      to={prog.ctaLink}
                      className="btn btn-primary program-cta-btn"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "13px 18px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        lineHeight: "1.35",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        textDecoration: "none",
                        background: buttonBg,
                        borderColor: buttonBg,
                        color: "#ffffff",
                      }}
                    >
                      <span style={{ flex: "1 1 auto" }}>{prog.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ marginLeft: "2px" }} />
                    </Link>
                  ) : (
                    <a
                      href={prog.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary program-cta-btn"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "13px 18px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        lineHeight: "1.35",
                        minHeight: "48px",
                        boxSizing: "border-box",
                        textDecoration: "none",
                        background: buttonBg,
                        borderColor: buttonBg,
                        color: "#ffffff",
                      }}
                    >
                      <span style={{ flex: "1 1 auto" }}>{prog.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ marginLeft: "2px" }} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
