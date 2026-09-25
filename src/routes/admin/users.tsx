import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Plus, ShieldCheck, Search, CheckCircle, Trash2, Lock } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { type AdminRole } from "@/lib/authStore";

import { useEffect } from "react";
import { AdminDataStore, type UserAccount } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadUsers = () => {
    setUsers(AdminDataStore.getUsers());
  };

  useEffect(() => {
    loadUsers();
    const handleUpdate = () => loadUsers();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Innovation Manager" as AdminRole,
    department: "GSFC University",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    AdminDataStore.saveUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      status: "Active",
    });

    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      role: "Innovation Manager",
      department: "GSFC University",
    });
    setToast(`Provisioned administrator account for "${formData.name}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Revoke admin access for "${name}"?`)) {
      AdminDataStore.deleteUser(id);
      setToast(`Revoked access for "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="User Management & Role-Based Access Control (RBAC)"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add Administrator
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
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Role & Access Level</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div>
                      <strong style={{ color: "#0f172a", fontSize: "14px", display: "block" }}>
                        {u.name}
                      </strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{u.email}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        background: u.role === "Super Admin" ? "#fef3c7" : "#eff6ff",
                        color: u.role === "Super Admin" ? "#92400e" : "#1e40af",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", color: "#475569" }}>{u.department}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#ecfdf5",
                        color: "#065f46",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "11.5px",
                        fontWeight: 700,
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>{u.lastActive}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {u.role !== "Super Admin" && (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD USER MODAL */}
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
              Provision Administrator User
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Prof. Ananya Sharma"
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
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gsfcuniversity.ac.in"
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

              <div className="form-row-2" style={{ gap: "14px", marginBottom: "24px" }}>
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
                    Institutional Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as AdminRole })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Innovation Manager">Innovation Manager</option>
                    <option value="Content Admin">Content Admin</option>
                    <option value="Event Manager">Event Manager</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
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
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
