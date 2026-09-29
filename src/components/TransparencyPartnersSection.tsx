import { FileText, Download, ExternalLink, Handshake, ShieldCheck, Building, Users } from "lucide-react";
import { SectionTitle } from "./site";

// PLACEHOLDER PARTNERS: Users can easily customize or add their official partner logos/names here
export interface PartnerLinkageItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  logoUrl?: string; // Optional image URL
}

export const PLACEHOLDER_ASSOCIATIONS_LINKAGES: PartnerLinkageItem[] = [
  {
    id: "p1",
    name: "GSFC Limited",
    category: "Anchor Industry Partner",
    description: "Joint industrial research, pilot testing facilities, and chemical incubation support.",
    badge: "Parent Industry",
  },
  {
    id: "p2",
    name: "Government of Gujarat — Industries Commissionerate",
    category: "Government Agency",
    description: "Nodal Institute recognition, grant disbursement, and state startup incentives.",
    badge: "State Nodal",
  },
  {
    id: "p3",
    name: "SSIP (Education Department, GoG)",
    category: "Academic Innovation",
    description: "Student innovation grants, prototyping allowances, and university hub coordination.",
    badge: "Policy Grant",
  },
  {
    id: "p4",
    name: "Partner Organization Placeholder #1",
    category: "Industry Association",
    description: "Collaboration on technology transfer, co-incubation, and industry mentorship.",
    badge: "Placeholder",
  },
  {
    id: "p5",
    name: "Partner Organization Placeholder #2",
    category: "Research Institution",
    description: "Joint patent development, academic labs access, and faculty research linkages.",
    badge: "Placeholder",
  },
  {
    id: "p6",
    name: "Partner Organization Placeholder #3",
    category: "Venture / Ecosystem Linkage",
    description: "Angel network connections, investor demo days, and market expansion.",
    badge: "Placeholder",
  },
];

export function TransparencyPartnersSection() {
  return (
    <section
      id="transparency-partners"
      className="transparency-partners-section"
      style={{
        padding: "80px 0",
        background: "var(--background, #ffffff)",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          badge="Governance & Collaborations"
          title="Transparency & Partners"
          subtitle="Committed to rigorous non-profit governance, public statutory disclosures, and active industrial-academic alliances."
          align="center"
        />

        {/* 1. STATUTORY COMPLIANCE & ANNUAL RETURN STRIP */}
        <div
          className="annual-return-card"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
            borderRadius: "20px",
            padding: "28px 32px",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.25)",
            marginBottom: "48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px", maxWidth: "680px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText className="w-6 h-6 text-blue-300" />
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#93c5fd",
                  marginBottom: "4px",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Annual Compliance</span>
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  margin: "0 0 6px 0",
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                Annual Return (FY 2024-25)
              </h3>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#cbd5e1",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Official audited annual statutory return filing for GUIITAR Council (Section 8 Non-Profit
                Organization) by GSFC University.
              </p>
            </div>
          </div>

          <div>
            <a
              href="https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_36db0b5ca7c64cdca278b62636d850e6.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Annual Return FY 2024-25 in PDF format"
              className="btn"
              style={{
                background: "#ffffff",
                color: "#1e3a8a",
                fontWeight: 700,
                fontSize: "13.5px",
                padding: "12px 22px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download PDF (FY 2024-25)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 2. ASSOCIATION & LINKAGES SUB-BLOCK */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ea580c",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                }}
              >
                <Handshake className="w-4 h-4" />
                <span>Collaborative Network</span>
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "var(--text-heading, #0f172a)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Association & Linkages
              </h3>
            </div>
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted, #64748b)",
                background: "var(--card-bg-alt, #f1f5f9)",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: "1px solid var(--border-color, #e2e8f0)",
              }}
            >
              Industry • Academia • Government
            </span>
          </div>

          {/* PARTNER / LINKAGE GRID PLACEHOLDER */}
          <div
            className="association-linkages-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {PLACEHOLDER_ASSOCIATIONS_LINKAGES.map((partner) => (
              <div
                key={partner.id}
                className="partner-linkage-card"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1e3a8a",
                      }}
                    >
                      <Building className="w-4 h-4" />
                    </div>

                    {partner.badge && (
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background:
                            partner.badge === "Placeholder"
                              ? "#fef3c7"
                              : "#eff6ff",
                          color:
                            partner.badge === "Placeholder"
                              ? "#92400e"
                              : "#1e40af",
                          border: `1px solid ${
                            partner.badge === "Placeholder" ? "#fde68a" : "#bfdbfe"
                          }`,
                        }}
                      >
                        {partner.badge}
                      </span>
                    )}
                  </div>

                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--text-heading, #0f172a)",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {partner.name}
                  </h4>

                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#ea580c",
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    {partner.category}
                  </span>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted, #475569)",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
