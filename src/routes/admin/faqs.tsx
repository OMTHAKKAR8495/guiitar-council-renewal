import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Plus, Trash2, CheckCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect } from "react";
import { AdminDataStore, type FaqItem } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/faqs")({
  component: AdminFaqsPage,
});

export function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadFaqs = () => {
    setFaqs(AdminDataStore.getFaqs());
  };

  useEffect(() => {
    loadFaqs();
    const handleUpdate = () => loadFaqs();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    q: "",
    a: "",
    category: "Funding & Grants",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.q || !formData.a) return;

    AdminDataStore.saveFaq({
      q: formData.q,
      a: formData.a,
      category: formData.category,
    });

    setModalOpen(false);
    setFormData({
      q: "",
      a: "",
      category: "Funding & Grants",
    });
    setToast("Added new FAQ");
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (idOrQuestion: string) => {
    if (window.confirm("Delete this FAQ entry?")) {
      AdminDataStore.deleteFaq(idOrQuestion);
      setToast("Deleted FAQ entry");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Institutional FAQs & Knowledge Base"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add FAQ
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

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              padding: "20px 24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}
              >
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#1e40af",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {faq.category || "General"}
                </span>
              </div>
              <h3
                style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}
              >
                {faq.q}
              </h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                {faq.a}
              </p>
            </div>

            <button
              onClick={() => handleDelete(faq.id || faq.q)}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
            </button>
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
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>
              Add Knowledge Base FAQ
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
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.q}
                  onChange={(e) => setFormData({ ...formData, q: e.target.value })}
                  placeholder="e.g., Who is eligible to apply for SSIP 2.0 grant funding?"
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
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  Detailed Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.a}
                  onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                  placeholder="Provide precise policy requirements, deadlines, or step instructions..."
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
