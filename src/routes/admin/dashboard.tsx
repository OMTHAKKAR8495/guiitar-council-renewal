import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Lightbulb,
  Rocket,
  Calendar,
  Users,
  Banknote,
  FileText,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type IdeaItem } from "@/lib/adminStore";
import { useAuth } from "@/lib/authStore";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — GUIITAR Admin Console" }],
  }),
  component: AdminDashboardPage,
});

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(AdminDataStore.getStats());
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);

  useEffect(() => {
    const refreshData = () => {
      setStats(AdminDataStore.getStats());
      setIdeas(AdminDataStore.getIdeas());
    };
    refreshData();
    window.addEventListener("guiitar_store_update", refreshData);
    return () => window.removeEventListener("guiitar_store_update", refreshData);
  }, []);

  const pendingIdeas = ideas.filter(
    (i) => i.status === "Pending Review" || i.status === "Under Review",
  );
  const publishedIdeas = ideas.filter((i) => i.status === "Published");

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <AdminLayout
      title={`${greeting()}, ${user?.name || "Admin"}`}
      subtitle="Here's what's happening across GUIITAR Council innovation and incubation ecosystem today."
      actions={
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/admin/ideas/new"
            className="btn btn-primary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Innovation</span>
          </Link>
          <Link
            to="/admin/events"
            className="btn btn-outline btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Calendar className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </div>
      }
    >
      {/* 1. OVERVIEW METRICS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div className="plain-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
              Total Innovations
            </span>
            <Lightbulb className="w-5 h-5 text-blue-600" />
          </div>
          <strong
            style={{
              fontSize: "32px",
              fontWeight: 900,
              color: "#0f172a",
              fontFamily: "var(--font-heading)",
            }}
          >
            {stats.totalIdeas}
          </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "6px",
              fontSize: "12px",
              color: "#059669",
              fontWeight: 600,
            }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{stats.pendingIdeas} pending review</span>
          </div>
        </div>

        <div className="plain-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
              Published Showcase
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <strong
            style={{
              fontSize: "32px",
              fontWeight: 900,
              color: "#059669",
              fontFamily: "var(--font-heading)",
            }}
          >
            {stats.publishedIdeas}
          </strong>
          <span style={{ display: "block", fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
            Live on public showcase
          </span>
        </div>

        <div className="plain-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
              Incubated Startups
            </span>
            <Rocket className="w-5 h-5 text-indigo-600" />
          </div>
          <strong
            style={{
              fontSize: "32px",
              fontWeight: 900,
              color: "#4338ca",
              fontFamily: "var(--font-heading)",
            }}
          >
            {stats.totalStartups}
          </strong>
          <span style={{ display: "block", fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
            Active ventures in cohort
          </span>
        </div>

        <div className="plain-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>
              Direct Grants Disbursed
            </span>
            <Banknote className="w-5 h-5 text-amber-600" />
          </div>
          <strong
            style={{
              fontSize: "32px",
              fontWeight: 900,
              color: "#d97706",
              fontFamily: "var(--font-heading)",
            }}
          >
            {stats.totalGrantsDisbursed}
          </strong>
          <span style={{ display: "block", fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
            SSIP 2.0 & Policy 2020
          </span>
        </div>
      </div>

      {/* 2. PENDING REVIEW QUEUE & RECENT SUBMISSIONS */}
      <div className="admin-dashboard-split">
        {/* Left: Pending Review Innovations Action Table */}
        <div className="plain-card" style={{ padding: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                Innovations Requiring Review ({pendingIdeas.length})
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0" }}>
                Recent student and researcher ideas submitted through public portal.
              </p>
            </div>
            <Link
              to="/admin/ideas"
              style={{
                fontSize: "13px",
                color: "#2563eb",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View All Ideas →
            </Link>
          </div>

          {pendingIdeas.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pendingIdeas.map((idea) => (
                <div
                  key={idea.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 18px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    gap: "16px",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#2563eb",
                          background: "#eff6ff",
                          padding: "1px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {idea.refId}
                      </span>
                      <span className="pill amber" style={{ fontSize: "11px" }}>
                        {idea.status}
                      </span>
                      <span className="pill" style={{ fontSize: "11px" }}>
                        {idea.category}
                      </span>
                    </div>
                    <strong style={{ fontSize: "15px", color: "#0f172a", display: "block" }}>
                      {idea.title}
                    </strong>
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                      By {idea.creatorName} ({idea.department}) • Submitted on{" "}
                      {new Date(idea.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <Link
                      to={`/admin/ideas/${idea.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ padding: "0 14px" }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "4px 0" }}>
                All clear!
              </p>
              <p style={{ fontSize: "13px" }}>No innovation proposals pending review right now.</p>
            </div>
          )}
        </div>

        {/* Right: Quick Action Shortcuts & Ecosystem Health */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="plain-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 14px", color: "#0f172a" }}>
              Quick Action Shortcuts
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                to="/admin/ideas/new"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "#0f172a",
                  fontSize: "13.5px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Add New Innovation</span>
                </div>
                <Plus className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/events"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "#0f172a",
                  fontSize: "13.5px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Manage Events & Workshops</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/applications"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "#0f172a",
                  fontSize: "13.5px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Rocket className="w-4 h-4 text-indigo-600" />
                  <span>Applications Queue</span>
                </div>
                <span className="pill emerald" style={{ fontSize: "10px" }}>
                  Active
                </span>
              </Link>
            </div>
          </div>

          {/* Public Portal Sync Monitor */}
          <div
            style={{
              background: "linear-gradient(135deg, #090d16, #1e3a8a)",
              borderRadius: "16px",
              padding: "24px",
              color: "#ffffff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="pulse-dot" />
              <strong style={{ fontSize: "14px", letterSpacing: "0.02em" }}>
                Live Showcase Sync
              </strong>
            </div>
            <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5, margin: "0 0 16px" }}>
              All innovations marked with <strong>Published</strong> status are automatically
              syndicated to the public Innovation Showcase.
            </p>
            <Link
              to="/innovation"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#60a5fa",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <span>Preview Public Innovation Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
