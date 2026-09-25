import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Inbox,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Building,
  FileText,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

import { useEffect } from "react";
import { AdminDataStore, type ApplicationItem } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplicationsPage,
});

export function AdminApplicationsPage() {
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [filterType, setFilterType] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const loadApps = () => {
    setApps(AdminDataStore.getApplications());
  };

  useEffect(() => {
    loadApps();
    const handleUpdate = () => loadApps();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const types = [
    "All",
    "Innovation Grant",
    "Incubation Suite",
    "Mentorship Request",
    "Partnership Inquiry",
    "General Application",
  ];

  const filtered = apps.filter((a) => filterType === "All" || a.type === filterType);

  const handleStatus = (id: string, newStatus: ApplicationItem["status"]) => {
    AdminDataStore.updateApplicationStatus(id, newStatus);
    setToast(`Application status updated to ${newStatus}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AdminLayout
      title="Intake & Applications Queue"
      actions={
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          Pending Actions: <strong>{apps.filter((a) => a.status === "Pending").length}</strong>
        </span>
      }
    >
      {toast && (
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
          {toast}
        </div>
      )}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: filterType === t ? "#2563eb" : "#e2e8f0",
                background: filterType === t ? "#eff6ff" : "#ffffff",
                color: filterType === t ? "#1e40af" : "#475569",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant / Entity</th>
                <th>Application Track</th>
                <th>Request Summary</th>
                <th>Date Received</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Review Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div>
                      <strong style={{ color: "#0f172a", fontSize: "14px", display: "block" }}>
                        {a.applicant}
                      </strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>
                        {a.organization} • {a.email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#1e40af",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {a.type}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", color: "#334155" }}>{a.summary}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>{a.date}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        background:
                          a.status === "Approved"
                            ? "#ecfdf5"
                            : a.status === "Rejected"
                              ? "#fef2f2"
                              : "#fef3c7",
                        color:
                          a.status === "Approved"
                            ? "#065f46"
                            : a.status === "Rejected"
                              ? "#991b1b"
                              : "#92400e",
                      }}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {a.status === "Pending" ? (
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          onClick={() => handleStatus(a.id, "Approved")}
                          className="btn btn-primary btn-sm"
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatus(a.id, "Rejected")}
                          className="btn btn-outline btn-sm"
                          style={{
                            padding: "4px 8px",
                            fontSize: "12px",
                            color: "#ef4444",
                            borderColor: "#fca5a5",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStatus(a.id, "Pending")}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "4px 8px", fontSize: "11px" }}
                      >
                        Re-evaluate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
