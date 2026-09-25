import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  FolderTree,
  ArrowUpDown,
  Tag,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect } from "react";
import { AdminDataStore, type CategoryItem } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/ideas/categories")({
  component: AdminIdeaCategoriesPage,
});

export function AdminIdeaCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thrustArea: "AI & Robotics",
    color: "#2563eb",
  });
  const [toast, setToast] = useState<string | null>(null);

  const loadCategories = () => {
    setCategories(AdminDataStore.getCategories());
  };

  useEffect(() => {
    loadCategories();
    const handleUpdate = () => loadCategories();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormData({
      name: "",
      description: "",
      thrustArea: "AI & Robotics",
      color: "#2563eb",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCat(cat);
    setFormData({
      name: cat.name,
      description: cat.description,
      thrustArea: cat.thrustArea,
      color: cat.color,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCat) {
      AdminDataStore.saveCategory({
        id: editingCat.id,
        name: formData.name,
        description: formData.description,
        thrustArea: formData.thrustArea,
        color: formData.color,
      });
      setToast(`Updated category "${formData.name}"`);
    } else {
      AdminDataStore.saveCategory({
        name: formData.name,
        description: formData.description,
        thrustArea: formData.thrustArea,
        color: formData.color,
        count: 0,
      });
      setToast(`Created category "${formData.name}"`);
    }

    setModalOpen(false);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      AdminDataStore.deleteCategory(id);
      setToast(`Deleted category "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Idea Categories & Thrust Areas"
      actions={
        <button
          onClick={handleOpenAdd}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add Category
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
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Institutional Thrust Domains ({categories.length})
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              Classify innovations and track departmental distribution across 13 institutional focus
              areas.
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Thrust Alignment</th>
                <th>Innovations Logged</th>
                <th>Color Indicator</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: cat.color,
                        }}
                      />
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "14px", display: "block" }}>
                          {cat.name}
                        </strong>
                        <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                          {cat.description}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#f1f5f9",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#334155",
                      }}
                    >
                      {cat.thrustArea}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#1e40af",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12.5px",
                        fontWeight: 800,
                      }}
                    >
                      {cat.count} Innovations
                    </span>
                  </td>
                  <td>
                    <code
                      style={{
                        background: "#f8fafc",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      {cat.color}
                    </code>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 10px" }}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CATEGORY MODAL */}
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
              {editingCat ? "Edit Category" : "Create Innovation Category"}
            </h3>

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Renewable Energy & Power Systems"
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

              <div style={{ marginBottom: "16px" }}>
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
                  placeholder="Summary of sub-domains and eligible project types..."
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

              <div className="form-row-2" style={{ gap: "16px", marginBottom: "24px" }}>
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
                    Thrust Area
                  </label>
                  <input
                    type="text"
                    value={formData.thrustArea}
                    onChange={(e) => setFormData({ ...formData, thrustArea: e.target.value })}
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
                    Theme Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "2px 4px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
