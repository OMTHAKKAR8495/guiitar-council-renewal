import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  ShieldAlert,
  Search,
  Filter,
  Clock,
  User,
  FileText,
  CheckCircle2,
  Calendar,
  Activity,
  Layers,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type AuditLogEntry } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/audit-log")({
  component: AdminAuditLogPage,
});

export function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const loadLogs = () => {
    setLogs(AdminDataStore.getAuditLogs());
  };

  useEffect(() => {
    loadLogs();
    const handleUpdate = () => loadLogs();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const recordTypes = ["All", "Idea", "Funding", "Infrastructure", "Startup", "User", "System"];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchType = typeFilter === "All" || log.recordType === typeFilter;
      const matchSearch = `${log.adminName} ${log.action} ${log.targetRecord} ${log.details}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [logs, searchQuery, typeFilter]);

  return (
    <AdminLayout
      title="Institutional Audit Trail & Governance"
      actions={
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Showing <strong>{filteredLogs.length}</strong> logged transactions
          </span>
        </div>
      }
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* CONTROLS */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{ display: "flex", gap: "12px", flex: 1, minWidth: "280px", maxWidth: "400px" }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail by admin, action or record..."
                style={{
                  width: "100%",
                  padding: "9px 12px 9px 36px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13.5px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {recordTypes.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid",
                  borderColor: typeFilter === t ? "#2563eb" : "#e2e8f0",
                  background: typeFilter === t ? "#eff6ff" : "#ffffff",
                  color: typeFilter === t ? "#1e40af" : "#475569",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* AUDIT LOG TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Action Executed</th>
                <th>Target Record / Entity</th>
                <th>Category</th>
                <th>Audit Timestamp</th>
                <th>Technical Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: "#f1f5f9",
                          color: "#0f172a",
                          fontSize: "11px",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {log.adminName.slice(0, 2).toUpperCase()}
                      </div>
                      <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>
                        {log.adminName}
                      </strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: "#2563eb", fontWeight: 600, fontSize: "13px" }}>
                      {log.targetRecord}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        color: "#475569",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      {log.recordType}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>{log.timestamp}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "12.5px", color: "#475569", fontStyle: "italic" }}>
                      {log.details}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
            <Activity className="w-10 h-10 text-slate-300" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: "16px", fontWeight: 600 }}>
              No audit log transactions match your query
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
