import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DollarSign,
  Plus,
  Trash2,
  CheckCircle,
  Award,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type FundingScheme } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/funding")({
  component: AdminFundingPage,
});

export function AdminFundingPage() {
  const [schemes, setSchemes] = useState<FundingScheme[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadFunding = () => {
    setSchemes(AdminDataStore.getFundingSchemes());
  };

  useEffect(() => {
    loadFunding();
    const handleUpdate = () => loadFunding();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    agency: "Government of Gujarat",
    maxGrant: "₹2,50,000",
    type: "PoC & Prototyping Grant",
    description: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    AdminDataStore.saveFundingScheme({
      title: formData.title,
      agency: formData.agency,
      maxGrant: formData.maxGrant,
      type: formData.type,
      description: formData.description,
      eligibility: "Student innovators & incubated founders",
      stagesCovered: ["Prototype", "MVP"],
      timeline: "Annual Scrutiny Cycle",
      status: "Active",
    });

    setModalOpen(false);
    setFormData({
      title: "",
      agency: "Government of Gujarat",
      maxGrant: "₹2,50,000",
      type: "PoC & Prototyping Grant",
      description: "",
    });
    setToast(`Added grant scheme "${formData.title}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete funding scheme "${title}"?`)) {
      AdminDataStore.deleteFundingScheme(id);
      setToast(`Deleted "${title}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Institutional Funding & Grant Schemes"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add Grant Scheme
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
        {schemes.map((s) => (
          <div
            key={s.id}
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
                <span
                  style={{
                    background: "#ecfdf5",
                    color: "#065f46",
                    fontSize: "13px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {s.maxGrant}
                </span>
                <button
                  onClick={() => handleDelete(s.id, s.title)}
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
                style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#64748b",
                  fontWeight: 600,
                  margin: "0 0 12px",
                }}
              >
                Governing Body: {s.agency}
              </p>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#475569",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                {s.description}
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
                  Support Type: <span style={{ color: "#2563eb" }}>{s.type}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Cycle: {s.timeline}</div>
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
              Managed under GSFC University ISC Guidelines
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
              Add Funding Scheme
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
                  Scheme Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., SSIP 2.0 Prototyping Grant"
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
                    Grant Limit
                  </label>
                  <input
                    type="text"
                    value={formData.maxGrant}
                    onChange={(e) => setFormData({ ...formData, maxGrant: e.target.value })}
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
                    Agency
                  </label>
                  <input
                    type="text"
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
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
                  Save Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
