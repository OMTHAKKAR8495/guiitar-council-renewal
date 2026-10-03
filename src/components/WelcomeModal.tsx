import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  X,
  Building2,
  Lightbulb,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { GuiitarEmblem } from "./GuiitarBrand";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Don't show on admin panel
    if (pathname.startsWith("/admin")) return;

    try {
      const hasSeen = sessionStorage.getItem("guiitar_welcome_popup_seen");
      if (!hasSeen) {
        // Small delay for smooth entrance after initial page hydration
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [pathname]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
      try {
        sessionStorage.setItem("guiitar_welcome_popup_seen", "true");
      } catch {
        // Ignore
      }
    }, 280);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="no-print"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(15, 23, 42, 0.32)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        transition: "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isAnimatingOut ? 0 : 1,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "580px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "24px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.8)",
          overflow: "hidden",
          border: "1px solid rgba(226, 232, 240, 0.9)",
          transform: isAnimatingOut ? "scale(0.95) translateY(12px)" : "scale(1) translateY(0)",
          transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease",
        }}
        className="welcome-card-theme"
      >
        {/* Top Decorative Ambient Glow Bar */}
        <div
          style={{
            height: "6px",
            background: "linear-gradient(90deg, #1e3a8a 0%, #ea580c 50%, #3b82f6 100%)",
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close welcome popup"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(203, 213, 225, 0.7)",
            background: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#475569",
            cursor: "pointer",
            transition: "all 0.15s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.color = "#0f172a";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
            e.currentTarget.style.color = "#475569";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <div style={{ padding: "32px 28px 26px 28px", textAlign: "center" }}>
          {/* Logo & Emblem Hero Presentation */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              marginBottom: "20px",
            }}
          >
            <img
              src="/guiitar-council-logo.png"
              alt="GUIITAR Council Logo"
              style={{ height: "24px", width: "auto", objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#1e40af",
              }}
            >
              GUIITAR COUNCIL
            </span>
          </div>

          {/* Primary Welcome Title */}
          <h2
            id="welcome-modal-title"
            style={{
              fontSize: "26px",
              fontWeight: 900,
              lineHeight: "1.25",
              color: "#0f172a",
              margin: "0 0 6px 0",
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to GSFC University
          </h2>

          {/* Subtitle / GUIITAR Council Branding */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span>GUIITAR Council</span>
          </div>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#475569",
              maxWidth: "480px",
              margin: "0 auto 24px auto",
            }}
          >
            GU Incubation Innovation Technology and Applied Research Council —
            empowering student innovators, researchers, and startups from ideation to commercialization.
          </p>

          {/* Value Highlights Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "26px",
              textAlign: "left",
            }}
          >
            <div
              className="welcome-highlight-box"
              style={{
                padding: "12px",
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <div
                className="welcome-highlight-title"
                style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}
              >
                SSIP & Grants
              </div>
              <div
                className="welcome-highlight-desc"
                style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.3" }}
              >
                Up to ₹2.5 Lakh
              </div>
            </div>

            <div
              className="welcome-highlight-box"
              style={{
                padding: "12px",
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                <Rocket className="w-4 h-4 text-orange-600" />
              </div>
              <div
                className="welcome-highlight-title"
                style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}
              >
                Incubation
              </div>
              <div
                className="welcome-highlight-desc"
                style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.3" }}
              >
                Makers & AI labs
              </div>
            </div>

            <div
              className="welcome-highlight-box"
              style={{
                padding: "12px",
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div
                className="welcome-highlight-title"
                style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}
              >
                Mentorship
              </div>
              <div
                className="welcome-highlight-desc"
                style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.3" }}
              >
                Industry & IPR clinics
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 28px",
                background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.4)",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 14px 24px -5px rgba(37, 99, 235, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px -5px rgba(37, 99, 235, 0.4)";
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/apply"
              onClick={handleClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                background: "#ffffff",
                color: "#0f172a",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                textDecoration: "none",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#94a3b8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
            >
              Submit Startup Idea
            </Link>
          </div>
        </div>

        {/* Footer Info Strip */}
        <div
          className="welcome-footer-strip"
          style={{
            padding: "10px 24px",
            background: "#f1f5f9",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            GSFC University Campus, Vigyan Bhavan
          </span>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "11px",
              padding: 0,
            }}
          >
            Don't show again
          </button>
        </div>
      </div>
    </div>
  );
}
