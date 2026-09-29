import { Sparkles, ArrowUpRight, ShieldCheck, Lightbulb, Building2 } from "lucide-react";
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
    ctaLink: "https://www.guiitarstartupcouncil.org/guiitarcouncil-ssip",
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
    ctaText: "Apply for IPR Support",
    ctaLink: "https://www.guiitarstartupcouncil.org/guiitarcouncil-ipr",
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
    ctaText: "Apply for Start-Up Support under Nodal Institute",
    ctaLink: "https://www.guiitarstartupcouncil.org/guiitarcouncil-nodalinstitute",
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
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginTop: "40px",
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

            return (
              <div
                key={prog.id}
                className="program-support-card"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
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
                        padding: "5px 12px",
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
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--text-heading, #0f172a)",
                      lineHeight: "1.35",
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "var(--text-muted, #475569)",
                      marginBottom: "20px",
                    }}
                  >
                    {prog.description}
                  </p>

                  {/* Features List */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 28px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {prog.features.map((feat, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.5",
                          color: "var(--text-body, #334155)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: badgeColor,
                            marginTop: "7px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Action */}
                <div style={{ marginTop: "auto" }}>
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
                      padding: "11px 16px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 700,
                      textAlign: "center",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      lineHeight: "1.35",
                      minHeight: "46px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ flex: "1 1 auto" }}>{prog.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ marginLeft: "2px" }} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
