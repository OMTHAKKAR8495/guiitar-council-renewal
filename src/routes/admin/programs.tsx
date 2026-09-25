import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layers, Plus, Trash2, CheckCircle, Clock, Award, Users } from "lucide-react";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type IncubationProgram } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/programs")({
  component: AdminProgramsPage,
});

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState<IncubationProgram[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadPrograms = () => {
    setPrograms(AdminDataStore.getPrograms());
  };

  useEffect(() => {
    loadPrograms();
    const handleUpdate = () => loadPrograms();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    duration: "6 Months",
    grantSupport: "Up to ₹2.5 Lakhs",
    targetCohort: "Students & Faculty",
    description: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    AdminDataStore.saveProgram({
      name: formData.name,
      tagline: formData.tagline,
      duration: formData.duration,
      grantSupport: formData.grantSupport,
      targetCohort: formData.targetCohort,
      description: formData.description,
      features: ["Mentorship Access", "Lab Workbenches", "IPR Filing Support"],
      eligibility: ["Enrolled students, alumni, or research fellows"],
      status: "Active",
    });

    setModalOpen(false);
    setFormData({
      name: "",
      tagline: "",
      duration: "6 Months",
      grantSupport: "Up to ₹2.5 Lakhs",
      targetCohort: "Students & Faculty",
      description: "",
    });
    setToast(`Created incubation track "${formData.name}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete program track "${name}"?`)) {
      AdminDataStore.deleteProgram(id);
      setToast(`Deleted "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Incubation & Acceleration Program Tracks"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add Program Track
        </button>
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {programs.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <span className="pill blue">{p.duration}</span>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
              </div>

              <h3
                style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}
              >
                {p.name}
              </h3>
              <p
                style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, margin: "0 0 12px" }}
              >
                {p.tagline}
              </p>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#475569",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                {p.description}
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "#0f172a",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  Financial Grant: <span style={{ color: "#059669" }}>{p.grantSupport}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Target: {p.targetCohort}</div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #f1f5f9",
                paddingTop: "12px",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Active Track • GSFC University Ecosystem
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
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
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>
              Add Incubation Track
            </h3>

            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Track Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., DeepTech Acceleration Sprint"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div className="form-row-2" style={{ gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    Grant Support
                  </label>
                  <input
                    type="text"
                    value={formData.grantSupport}
                    onChange={(e) => setFormData({ ...formData, grantSupport: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13.5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
