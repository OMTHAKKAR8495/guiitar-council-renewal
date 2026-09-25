import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Lightbulb,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle2,
  XCircle,
  Archive,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type IdeaItem, type IdeaStatus } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/ideas/")({
  head: () => ({
    meta: [{ title: "Idea Management — GUIITAR Admin Console" }],
  }),
  component: AdminIdeasPage,
});

export function AdminIdeasPage() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showConfirmModal, setShowConfirmModal] = useState<{
    action: string;
    targetId?: string;
    isBulk?: boolean;
  } | null>(null);

  const statuses = [
    "All",
    "Pending Review",
    "Under Review",
    "Approved",
    "Published",
    "Draft",
    "Rejected",
    "Archived",
  ];

  useEffect(() => {
    const load = () => setIdeas(AdminDataStore.getIdeas());
    load();
    window.addEventListener("guiitar_store_update", load);
    return () => window.removeEventListener("guiitar_store_update", load);
  }, []);

  const filtered = useMemo(() => {
    return ideas.filter((item) => {
      const matchStatus = statusFilter === "All" || item.status === statusFilter;
      const matchSearch =
        `${item.title} ${item.creatorName} ${item.refId} ${item.category} ${item.technology} ${item.department}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [ideas, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginated.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleStatusChange = (id: string, newStatus: IdeaStatus) => {
    AdminDataStore.updateIdeaStatus(id, newStatus, "KiranKumar Parmar");
  };

  const handleBulkAction = (action: IdeaStatus | "Delete") => {
    if (action === "Delete") {
      selectedIds.forEach((id) => AdminDataStore.deleteIdea(id));
    } else {
      selectedIds.forEach((id) => AdminDataStore.updateIdeaStatus(id, action, "KiranKumar Parmar"));
    }
    setSelectedIds([]);
    setShowConfirmModal(null);
  };

  const exportCSV = () => {
    const headers = [
      "Ref ID",
      "Title",
      "Creator",
      "Category",
      "Stage",
      "Status",
      "Submitted Date",
      "Funding",
    ];
    const rows = filtered.map((i) => [
      i.refId,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.creatorName}"`,
      i.category,
      i.stage,
      i.status,
      new Date(i.submittedAt).toLocaleDateString(),
      i.fundingSanctioned || "N/A",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `guiitar_innovations_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusPillStyle = (status: IdeaStatus) => {
    switch (status) {
      case "Published":
        return { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" };
      case "Approved":
        return { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" };
      case "Pending Review":
      case "Under Review":
        return { bg: "#fffbeb", text: "#d97706", border: "#fde68a" };
      case "Draft":
        return { bg: "#f1f5f9", text: "#475569", border: "#cbd5e1" };
      case "Rejected":
        return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
      case "Archived":
        return { bg: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" };
    }
  };

  return (
    <AdminLayout
      title="Idea Management"
      subtitle="Manage, review, evaluate, and publish innovations submitted to GUIITAR Council."
      breadcrumbs={[
        { label: "Admin", href: "/admin/dashboard" },
        { label: "Innovation Engine" },
        { label: "Ideas" },
      ]}
      actions={
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={exportCSV}
            className="btn btn-outline btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/admin/ideas/new"
            className="btn btn-primary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Innovation</span>
          </Link>
        </div>
      }
    >
      {/* FILTER TABS & SEARCH BAR */}
      <div className="plain-card" style={{ padding: "20px 24px", marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {statuses.map((st) => {
              const isSelected = statusFilter === st;
              const count =
                st === "All" ? ideas.length : ideas.filter((i) => i.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => {
                    setStatusFilter(st);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: isSelected ? 700 : 500,
                    border: `1px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                    background: isSelected ? "#eff6ff" : "#ffffff",
                    color: isSelected ? "#2563eb" : "#475569",
                    cursor: "pointer",
                  }}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", width: "280px" }}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ideas, creators, ref ID..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 34px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Bulk Action Toolbar when items selected */}
        {selectedIds.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              padding: "10px 16px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#1d4ed8" }}>
              {selectedIds.length} innovation(s) selected
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleBulkAction("Approved")}
                className="btn btn-outline btn-sm"
                style={{ background: "#ffffff", color: "#2563eb", height: "32px" }}
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction("Published")}
                className="btn btn-primary btn-sm"
                style={{ height: "32px" }}
              >
                Publish Live
              </button>
              <button
                onClick={() => handleBulkAction("Rejected")}
                className="btn btn-outline btn-sm"
                style={{ background: "#ffffff", color: "#dc2626", height: "32px" }}
              >
                Reject
              </button>
              <button
                onClick={() => handleBulkAction("Delete")}
                className="btn btn-outline btn-sm"
                style={{ background: "#ffffff", color: "#dc2626", height: "32px" }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DATA TABLE */}
      <div className="plain-card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13.5px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <th style={{ padding: "14px 16px", width: "40px" }}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginated.length > 0 && selectedIds.length === paginated.length}
                  />
                </th>
                <th style={{ padding: "14px 16px" }}>Idea & Ref ID</th>
                <th style={{ padding: "14px 16px" }}>Creator</th>
                <th style={{ padding: "14px 16px" }}>Category</th>
                <th style={{ padding: "14px 16px" }}>Stage</th>
                <th style={{ padding: "14px 16px" }}>Status</th>
                <th style={{ padding: "14px 16px" }}>Submitted</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => {
                const pill = statusPillStyle(item.status);
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: isSelected ? "#f8fafc" : "#ffffff",
                      transition: "background 0.15s",
                    }}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(item.id)}
                      />
                    </td>

                    <td style={{ padding: "14px 16px", maxWidth: "280px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#2563eb",
                          }}
                        >
                          {item.refId}
                        </span>
                        {item.isFeatured && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 800,
                              background: "#fef3c7",
                              color: "#d97706",
                              padding: "1px 5px",
                              borderRadius: "4px",
                            }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/admin/ideas/${item.id}`}
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          textDecoration: "none",
                          display: "block",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.title}
                      </Link>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <strong style={{ display: "block", color: "#0f172a" }}>
                        {item.creatorName}
                      </strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{item.department}</span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span className="pill" style={{ fontSize: "12px" }}>
                        {item.category}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#334155" }}>
                        {item.stage}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          background: pill.bg,
                          color: pill.text,
                          border: `1px solid ${pill.border}`,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        color: "#64748b",
                        fontSize: "12.5px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <Link
                          to={`/admin/ideas/${item.id}`}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "4px 8px", height: "30px" }}
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {item.status !== "Published" && (
                          <button
                            onClick={() => handleStatusChange(item.id, "Published")}
                            className="btn btn-primary btn-sm"
                            style={{
                              padding: "4px 10px",
                              height: "30px",
                              background: "#059669",
                              borderColor: "#059669",
                            }}
                            title="Publish Live"
                          >
                            <span>Publish</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginated.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
            <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>
              No innovations found
            </h4>
            <p style={{ fontSize: "13.5px", margin: 0 }}>
              Try clearing filters or add a new innovation record.
            </p>
          </div>
        )}

        {/* Pagination Bar */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>
              Showing {paginated.length} of {filtered.length} innovations
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "12px",
                background: "#ffffff",
              }}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="btn btn-outline btn-sm"
              style={{ padding: "4px 10px", height: "32px" }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 8px",
                fontWeight: 600,
              }}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="btn btn-outline btn-sm"
              style={{ padding: "4px 10px", height: "32px" }}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
