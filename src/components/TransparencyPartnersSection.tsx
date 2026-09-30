import { FileText, Download, ExternalLink, Handshake, ShieldCheck, Building, Sparkles } from "lucide-react";
import { SectionTitle } from "./site";

export interface PartnerLinkageItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  logoType?: "gsfc" | "gujarat-gov" | "ssip" | "nasscom" | "icreate" | "aic" | "custom";
  logoUrl?: string;
  logoBg?: string;
}

/**
 * Partner Brand Logo Vector Renderers
 */
function PartnerLogoRenderer({ partner }: { partner: PartnerLinkageItem }) {
  if (partner.logoUrl) {
    return (
      <img
        src={partner.logoUrl}
        alt={partner.name}
        style={{
          maxHeight: "36px",
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    );
  }

  switch (partner.logoType) {
    case "gsfc":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: "0.05em",
              boxShadow: "0 2px 6px rgba(30, 58, 138, 0.3)",
            }}
          >
            GSFC
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#1e3a8a", lineHeight: "1.1" }}>
              GSFC LIMITED
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Fertilizers & Chemicals</div>
          </div>
        </div>
      );

    case "gujarat-gov":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #991b1b 0%, #ea580c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "11px",
              boxShadow: "0 2px 6px rgba(153, 27, 27, 0.3)",
            }}
          >
            GoG
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#991b1b", lineHeight: "1.1" }}>
              GOVT OF GUJARAT
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Industries Commissionerate</div>
          </div>
        </div>
      );

    case "ssip":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: "0.05em",
              boxShadow: "0 2px 6px rgba(234, 88, 12, 0.3)",
            }}
          >
            SSIP
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#c2410c", lineHeight: "1.1" }}>
              SSIP 2.0 GUJARAT
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Education Department</div>
          </div>
        </div>
      );

    case "nasscom":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "0.04em",
              boxShadow: "0 2px 6px rgba(30, 64, 175, 0.3)",
            }}
          >
            NASS
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#1e40af", lineHeight: "1.1" }}>
              NASSCOM
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Tech Industry Council</div>
          </div>
        </div>
      );

    case "icreate":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "11px",
              boxShadow: "0 2px 6px rgba(2, 132, 199, 0.3)",
            }}
          >
            iCreate
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#0369a1", lineHeight: "1.1" }}>
              iCREATE
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Innovation & Incubation</div>
          </div>
        </div>
      );

    case "aic":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "11px",
              boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)",
            }}
          >
            AIC
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#047857", lineHeight: "1.1" }}>
              AIC-GISC
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontWeight: 600 }}>Atal Incubation Center</div>
          </div>
        </div>
      );

    default:
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1e3a8a",
            }}
          >
            <Building className="w-4 h-4" />
          </div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>{partner.name}</div>
        </div>
      );
  }
}

export const OFFICIAL_ASSOCIATIONS_LINKAGES: PartnerLinkageItem[] = [
  {
    id: "p1",
    name: "GSFC Limited",
    category: "Anchor Industry Partner",
    description: "Joint industrial research, pilot testing facilities, chemical labs, and startup scale-up mentorship.",
    badge: "Parent Industry",
    logoType: "gsfc",
    logoBg: "#eff6ff",
  },
  {
    id: "p2",
    name: "Government of Gujarat — Industries Commissionerate",
    category: "State Government Agency",
    description: "Official Nodal Institute recognition, grant disbursements, sustenance allowances, and institutional validation.",
    badge: "State Nodal",
    logoType: "gujarat-gov",
    logoBg: "#fef2f2",
  },
  {
    id: "p3",
    name: "SSIP (Education Department, GoG)",
    category: "Student Innovation Policy",
    description: "Student innovation grants up to ₹2.5L, proof-of-concept allowances, and state university coordination.",
    badge: "Policy Grant",
    logoType: "ssip",
    logoBg: "#fff7ed",
  },
  {
    id: "p4",
    name: "NASSCOM",
    category: "National Tech Industry Council",
    description: "Technology entrepreneurship enablement, deep-tech masterclasses, and global industry linkages.",
    badge: "Industry Council",
    logoType: "nasscom",
    logoBg: "#eff6ff",
  },
  {
    id: "p5",
    name: "iCreate (Autonomous Center of Excellence)",
    category: "National Innovation Hub",
    description: "Next-generation tech incubation, investor pitch days, and prototype validation pipelines.",
    badge: "Incubation Co-Partner",
    logoType: "icreate",
    logoBg: "#f0fdfa",
  },
  {
    id: "p6",
    name: "AIC-GISC Foundation",
    category: "Atal Innovation Mission",
    description: "NITI Aayog supported incubation network, sector-specific bootcamps, and patent support.",
    badge: "AIM Partner",
    logoType: "aic",
    logoBg: "#ecfdf5",
  },
];

/**
 * 1. Annual Return Statutory Compliance Section (Placed below Programs & Support)
 */
export function AnnualReturnSection() {
  return (
    <section
      id="annual-return-compliance"
      className="annual-return-section"
      style={{
        padding: "60px 0 70px 0",
        background: "var(--background, #ffffff)",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
      </div>
    </section>
  );
}

/**
 * 2. Association & Linkages Section (Original placement above final CTA/Partners area)
 */
export function AssociationLinkagesSection() {
  return (
    <section
      id="association-linkages"
      className="association-linkages-section"
      style={{
        padding: "80px 0",
        background: "var(--background, #ffffff)",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          badge="Collaborative Network"
          title="Association & Linkages"
          subtitle="Committed to rigorous non-profit governance and active industrial, academic, and government alliances."
          align="center"
        />

        {/* EXACT ASSOCIATION & LINKAGES IMAGE DISPLAY */}
        <div
          style={{
            maxWidth: "1080px",
            margin: "36px auto 0",
            background: "#ffffff",
            border: "1px solid var(--border-color, #e2e8f0)",
            borderRadius: "24px",
            padding: "32px 28px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              borderBottom: "1px solid var(--border-color, #f1f5f9)",
              paddingBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(37, 99, 235, 0.1)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                  Official Association &amp; Linkages Network
                </h4>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  Government • PSUs • Incubators • Accelerators • Academic Partners
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a
                href="/partners/association-and-linkages.png"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Full Resolution</span>
              </a>
              <a
                href="/partners/association-and-linkages.png"
                download="GUIITAR_Association_and_Linkages.png"
                className="btn btn-primary btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Chart</span>
              </a>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/partners/association-and-linkages.png"
              alt="Official Association and Linkages of GUIITAR Council"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const TransparencyPartnersSection = AssociationLinkagesSection;
