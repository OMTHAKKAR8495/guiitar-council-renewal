import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  UploadCloud,
  Archive,
  Edit,
  ExternalLink,
  MessageSquare,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Award,
  Globe,
  Github,
  Video,
  FileText,
  Send,
  Trash2,
  Share2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type IdeaItem, type IdeaStatus, type IdeaComment } from "@/lib/adminStore";
import { useAdminAuth } from "@/lib/authStore";

export const Route = createFileRoute("/admin/ideas/$id")({
  component: AdminIdeaDetailPage,
});

export function AdminIdeaDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAdminAuth();

  const [idea, setIdea] = useState<IdeaItem | null>(null);
  const [newComment, setNewComment] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const reloadIdea = () => {
    const found = AdminDataStore.getIdeaById(id);
    if (found) {
      setIdea(found);
    }
  };

  useEffect(() => {
    reloadIdea();
    const handleUpdate = () => reloadIdea();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, [id]);

  const handleStatusChange = (status: IdeaStatus, reason?: string) => {
    if (!idea) return;
    const updated = AdminDataStore.updateIdeaStatus(idea.id, status, user?.name || "Admin", reason);
    if (updated) {
      setIdea(updated);
      setActionSuccess(`Idea status updated to ${status}`);
      setTimeout(() => setActionSuccess(null), 4000);
      setRejectModalOpen(false);
      setPublishModalOpen(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea || !newComment.trim()) return;

    AdminDataStore.addIdeaComment(idea.id, user?.name || "Administrator", newComment.trim(), true);
    setNewComment("");
    reloadIdea();
    setActionSuccess("Internal review note added");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleDelete = () => {
    if (!idea) return;
    if (window.confirm(`Are you sure you want to delete "${idea.title}"? This cannot be undone.`)) {
      AdminDataStore.deleteIdea(idea.id);
      navigate({ to: "/admin/ideas" });
    }
  };

  if (!idea) {
    return (
      <AdminLayout title="Idea Not Found">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <AlertTriangle className="w-12 h-12 text-amber-500" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Innovation Record Not Found
          </h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            The requested innovation dossier could not be located in the database.
          </p>
          <Link
            to="/admin/ideas"
            className="btn btn-outline btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Idea Management
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const getStatusBadge = (status: IdeaStatus) => {
    switch (status) {
      case "Published":
        return <span className="status-badge badge-published">Published</span>;
      case "Approved":
        return <span className="status-badge badge-approved">Approved</span>;
      case "Pending Review":
        return <span className="status-badge badge-pending">Pending Review</span>;
      case "Under Review":
        return <span className="status-badge badge-review">Under Review</span>;
      case "Rejected":
        return <span className="status-badge badge-rejected">Rejected</span>;
      case "Archived":
        return <span className="status-badge badge-archived">Archived</span>;
      default:
        return <span className="status-badge badge-draft">Draft</span>;
    }
  };

  return (
    <AdminLayout
      title={`${idea.refId} — ${idea.title}`}
      actions={
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            to="/admin/ideas"
            className="btn btn-outline btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link
            to="/innovation/$slug"
            params={{ slug: idea.slug }}
            target="_blank"
            className="btn btn-outline btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <ExternalLink className="w-4 h-4" />
            Preview Public Page
          </Link>
        </div>
      }
    >
      {actionSuccess && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "12px 18px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          {actionSuccess}
        </div>
      )}

      {/* TOP DOSSIER BANNER */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#2563eb",
                  background: "#eff6ff",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  letterSpacing: "0.5px",
                }}
              >
                {idea.refId}
              </span>
              {getStatusBadge(idea.status)}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#475569",
                  background: "#f1f5f9",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                Stage: {idea.stage}
              </span>
              {idea.isFeatured && (
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#b45309",
                    background: "#fef3c7",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  Featured #{idea.featuredOrder || 1}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
              {idea.title}
            </h1>
            <p style={{ color: "#475569", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
              {idea.shortDescription}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "220px" }}>
            {idea.status !== "Published" && (
              <button
                onClick={() => setPublishModalOpen(true)}
                className="btn btn-primary btn-sm"
                style={{
                  background: "#059669",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <UploadCloud className="w-4 h-4" />
                Publish to Showcase
              </button>
            )}

            {idea.status !== "Approved" && idea.status !== "Published" && (
              <button
                onClick={() => handleStatusChange("Approved")}
                className="btn btn-outline btn-sm"
                style={{
                  borderColor: "#2563eb",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Approve Innovation
              </button>
            )}

            {idea.status === "Pending Review" && (
              <button
                onClick={() => handleStatusChange("Under Review")}
                className="btn btn-outline btn-sm"
                style={{
                  borderColor: "#8b5cf6",
                  color: "#8b5cf6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Clock className="w-4 h-4" />
                Mark Under Review
              </button>
            )}

            {idea.status !== "Rejected" && (
              <button
                onClick={() => setRejectModalOpen(true)}
                className="btn btn-outline btn-sm"
                style={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <XCircle className="w-4 h-4" />
                Reject Submission
              </button>
            )}

            {idea.status !== "Archived" && (
              <button
                onClick={() => handleStatusChange("Archived")}
                className="btn btn-outline btn-sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Archive className="w-4 h-4" />
                Archive Record
              </button>
            )}

            <button
              onClick={handleDelete}
              className="btn btn-outline btn-sm"
              style={{
                borderColor: "#cbd5e1",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Trash2 className="w-4 h-4" />
              Delete Record
            </button>
          </div>
        </div>

        {idea.rejectionReason && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#991b1b",
              fontSize: "13.5px",
            }}
          >
            <strong>Rejection Reason:</strong> {idea.rejectionReason}
          </div>
        )}
      </div>

      {/* TWO COLUMN GRID */}
      <div className="admin-dashboard-split">
        {/* LEFT COLUMN: DOSSIER CONTENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* OVERVIEW & PROBLEM / SOLUTION */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
            }}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "18px" }}
            >
              Innovation Specifications
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#64748b",
                  textTransform: "uppercase",
                }}
              >
                Detailed Description
              </span>
              <p
                style={{ color: "#334155", fontSize: "14.5px", lineHeight: 1.6, margin: "6px 0 0" }}
              >
                {idea.detailedDescription || "No extended description provided."}
              </p>
            </div>

            <div className="form-row-2">
              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#dc2626",
                    textTransform: "uppercase",
                  }}
                >
                  Problem Statement
                </span>
                <p
                  style={{
                    color: "#1e293b",
                    fontSize: "13.5px",
                    lineHeight: 1.5,
                    margin: "6px 0 0",
                  }}
                >
                  {idea.problemStatement}
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#059669",
                    textTransform: "uppercase",
                  }}
                >
                  Proposed Solution
                </span>
                <p
                  style={{
                    color: "#1e293b",
                    fontSize: "13.5px",
                    lineHeight: 1.5,
                    margin: "6px 0 0",
                  }}
                >
                  {idea.proposedSolution}
                </p>
              </div>
            </div>

            <div
              style={{
                background: "#eff6ff",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid #bfdbfe",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#2563eb",
                  textTransform: "uppercase",
                }}
              >
                Innovation / Unique Selling Proposition (USP)
              </span>
              <p
                style={{
                  color: "#1e3a8a",
                  fontSize: "13.5px",
                  lineHeight: 1.5,
                  margin: "6px 0 0",
                  fontWeight: 500,
                }}
              >
                {idea.innovationUsp}
              </p>
            </div>
          </div>

          {/* TECHNOLOGY & IMPACT */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
            }}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "18px" }}
            >
              Technical Architecture & Impact
            </h3>

            <div className="form-row-2">
              <div>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#64748b" }}>
                  TECHNOLOGY STACK / HARDWARE
                </span>
                <p
                  style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "4px 0 0" }}
                >
                  {idea.technologyUsed || idea.technology}
                </p>
              </div>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#64748b" }}>
                  TARGET INDUSTRY & USERS
                </span>
                <p
                  style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "4px 0 0" }}
                >
                  {idea.industry} ({idea.targetUsers || "Industrial & Consumer"})
                </p>
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#64748b" }}>
                EXPECTED IMPACT
              </span>
              <p style={{ fontSize: "14px", color: "#334155", margin: "4px 0 0" }}>
                {idea.expectedImpact}
              </p>
            </div>

            {idea.sdgAlignment && idea.sdgAlignment.length > 0 && (
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#64748b",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  UN SUSTAINABLE DEVELOPMENT GOALS (SDG) ALIGNMENT
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {idea.sdgAlignment.map((sdg) => (
                    <span
                      key={sdg}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MEDIA & ATTACHMENTS */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
            }}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "18px" }}
            >
              Media & Attachments
            </h3>

            <div className="form-row-2">
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Cover Image
                </span>
                <img
                  src={idea.coverImage}
                  alt={idea.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#64748b",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Links & Repositories
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {idea.githubUrl && (
                    <a
                      href={idea.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      <Github className="w-4 h-4" /> GitHub Repository
                    </a>
                  )}
                  {idea.demoUrl && (
                    <a
                      href={idea.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      <Globe className="w-4 h-4" /> Live Working Demo
                    </a>
                  )}
                  {idea.videoUrl && (
                    <a
                      href={idea.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      <Video className="w-4 h-4" /> Project Video Walkthrough
                    </a>
                  )}
                  {!idea.githubUrl && !idea.demoUrl && !idea.videoUrl && (
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                      No external links provided.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* INTERNAL NOTES & COMMENTS */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Internal Committee Notes
              </h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Private to administrators</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {idea.comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#2563eb",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {c.avatar}
                      </div>
                      <strong style={{ fontSize: "13px", color: "#0f172a" }}>{c.author}</strong>
                    </div>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                      {new Date(c.createdAt).toLocaleDateString()}{" "}
                      {new Date(c.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "#334155", lineHeight: 1.5 }}>
                    {c.text}
                  </p>
                </div>
              ))}

              {idea.comments.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  No internal notes added yet. Use the field below to document committee decisions
                  or review remarks.
                </div>
              )}
            </div>

            <form onSubmit={handleAddComment} style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add review feedback or internal note..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13.5px",
                }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Send className="w-3.5 h-3.5" />
                Post Note
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: METADATA & TIMELINE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* CREATOR CARD */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <User className="w-4 h-4 text-blue-600" />
              Creator Information
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px" }}
            >
              <div>
                <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                  Innovator / Lead
                </span>
                <strong style={{ color: "#0f172a" }}>{idea.creatorName}</strong> ({idea.creatorType}
                )
              </div>

              {idea.creatorEmail && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569" }}
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a
                    href={`mailto:${idea.creatorEmail}`}
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    {idea.creatorEmail}
                  </a>
                </div>
              )}

              {idea.creatorPhone && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569" }}
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{idea.creatorPhone}</span>
                </div>
              )}

              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                  Department / School
                </span>
                <span style={{ color: "#0f172a", fontWeight: 600 }}>{idea.department}</span>
              </div>

              <div>
                <span style={{ color: "#64748b", fontSize: "12px", display: "block" }}>
                  Institution
                </span>
                <span style={{ color: "#0f172a", fontWeight: 600 }}>{idea.university}</span>
              </div>

              {idea.teamMembers && idea.teamMembers.length > 0 && (
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Team Members
                  </span>
                  <ul style={{ paddingLeft: "18px", margin: 0, color: "#334155" }}>
                    {idea.teamMembers.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* SUPPORT & GRANTS */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Award className="w-4 h-4 text-amber-500" />
              Support & Funding
            </h4>

            <div style={{ marginBottom: "14px" }}>
              <span
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Funding Sanctioned
              </span>
              <span
                style={{
                  display: "inline-block",
                  background: "#fef3c7",
                  color: "#92400e",
                  fontSize: "13px",
                  fontWeight: 800,
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {idea.fundingSanctioned || "Pending Committee Evaluation"}
              </span>
            </div>

            <div>
              <span
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Support Required
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {idea.supportRequired.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: "#eff6ff",
                      color: "#1e40af",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AUDIT & ACTIVITY TIMELINE */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Clock className="w-4 h-4 text-purple-600" />
              Activity & Review Timeline
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
              }}
            >
              {idea.activities.map((act, idx) => (
                <div key={act.id} style={{ display: "flex", gap: "12px", position: "relative" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: idx === 0 ? "#2563eb" : "#94a3b8",
                      marginTop: "5px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <strong style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>
                      {act.action}
                    </strong>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                      By {act.admin} • {act.timestamp}
                    </div>
                    {act.details && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#475569",
                          marginTop: "2px",
                          fontStyle: "italic",
                        }}
                      >
                        "{act.details}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REJECT MODAL */}
      {rejectModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
              Reject Innovation Submission
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px" }}>
              Please provide constructive feedback or reasons for rejection. This will be logged in
              the audit record.
            </p>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Lacks scientific validation, does not meet eligibility criteria, duplicate submission..."
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setRejectModalOpen(false)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange("Rejected", rejectionReason)}
                className="btn btn-primary btn-sm"
                style={{ background: "#ef4444", borderColor: "#ef4444" }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH CONFIRMATION MODAL */}
      {publishModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#ecfdf5",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Publish this innovation?
              </h3>
            </div>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px" }}>
              Once published, this innovation will become publicly visible across the GUIITAR
              Innovation Showcase at{" "}
              <code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                /innovation/{idea.slug}
              </code>
              .
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setPublishModalOpen(false)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange("Published")}
                className="btn btn-primary btn-sm"
                style={{ background: "#059669", borderColor: "#059669" }}
              >
                Publish Innovation
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
