import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/authStore";
import { GuiitarEmblem } from "@/components/GuiitarBrand";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — GUIITAR Council Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@guiitar.org");
  const [password, setPassword] = useState("guiitar2026");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect safely via useEffect
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = login(email.trim(), password);
      if (res.success) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setIsLoading(false);
        setError(res.error || "Authentication failed.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #090d16 0%, #0c1322 50%, #0f1c3f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px 36px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          color: "#0f172a",
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <GuiitarEmblem className="w-14 h-14 mx-auto mb-3" />
          <h1 style={{ fontSize: "24px", fontWeight: 900, margin: 0, color: "#0f172a" }}>
            GUIITAR Admin Portal
          </h1>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: "4px 0 0" }}>
            GSFC University Innovation Management Console
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "12px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <AlertCircle className="w-4 h-4 flex-none" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSignIn}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Admin Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@guiitar.org"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 38px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 38px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#475569",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a
              href="mailto:guiitar@gsfcuniversity.ac.in"
              style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", height: "46px", marginTop: "6px" }}
          >
            <span>{isLoading ? "Verifying Session..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick-Fill Credentials Helper Box for Institutional Evaluation */}
        <div
          style={{
            marginTop: "24px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "12px",
            color: "#475569",
          }}
        >
          <strong style={{ color: "#0f172a", display: "block", marginBottom: "4px" }}>
            Demo Admin Credentials:
          </strong>
          <div>
            Email: <code style={{ color: "#2563eb", fontWeight: 700 }}>admin@guiitar.org</code>
          </div>
          <div>
            Password: <code style={{ color: "#2563eb", fontWeight: 700 }}>guiitar2026</code>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/"
            style={{ color: "#64748b", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
