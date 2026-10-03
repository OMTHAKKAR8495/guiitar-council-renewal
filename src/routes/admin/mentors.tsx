import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  CheckCircle,
  Trash2,
  Edit2,
  Briefcase,
  Building,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore, type MentorItem } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/mentors")({
  component: AdminMentorsPage,
});

export function AdminMentorsPage() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<MentorItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadMentors = () => {
    setMentors(AdminDataStore.getMentors());
  };

  useEffect(() => {
    loadMentors();
    const handleUpdate = () => loadMentors();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    organization: "",
    domain: "Technology",
    experience: "15+ Years",
    avatar: "",
    status: "Active" as "Active" | "Available" | "Busy",
  });

  const domains = [
    "Technology",
    "Startup & Strategy",
    "Finance & Investment",
    "IPR & Legal",
    "Business & Strategy",
    "Academia & Research",
    "Manufacturing & Industry",
  ];

  const filteredMentors = mentors.filter((m) =>
    `${m.name} ${m.role || m.designation} ${m.organization} ${m.domain}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingMentor(null);
    setFormData({
      name: "",
      designation: "",
      organization: "",
      domain: "Technology",
      experience: "15+ Years",
      avatar: "",
      status: "Active",
    });
    setModalOpen(true);
  };

  const openEditModal = (m: MentorItem) => {
    setEditingMentor(m);
    setFormData({
      name: m.name,
      designation: m.designation || m.role || "",
      organization: m.organization || "",
      domain: m.domain || "Technology",
      experience: m.experience || "10+ Years",
      avatar: m.avatar || "",
      status: m.status || "Active",
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingMentor) {
      AdminDataStore.saveMentor({
        id: editingMentor.id,
        name: formData.name,
        role: formData.designation,
        designation: formData.designation,
        organization: formData.organization,
        domain: formData.domain,
        experience: formData.experience,
        avatar: formData.avatar || editingMentor.avatar,
        expertise: [formData.domain, "Mentorship", "Innovation"],
        status: formData.status,
      });
      setToast(`Updated mentor "${formData.name}"`);
    } else {
      AdminDataStore.saveMentor({
        name: formData.name,
        role: formData.designation || "Industry Mentor",
        designation: formData.designation || "Industry Mentor",
        organization: formData.organization || "Industry Partner",
        domain: formData.domain,
        experience: formData.experience,
        avatar:
          formData.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        expertise: [formData.domain, "Mentorship", "Innovation"],
        status: formData.status,
      });
      setToast(`Added mentor "${formData.name}"`);
    }

    setModalOpen(false);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove mentor "${name}" from directory?`)) {
      AdminDataStore.deleteMentor(id);
      setToast(`Removed "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Industry Mentor Directory Management"
      actions={
        <button
          onClick={openAddModal}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add New Mentor
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
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ position: "relative", width: "340px" }}>
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
              placeholder="Search mentors by name, domain, company..."
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

          <div style={{ fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Total Verified Mentors: <strong style={{ color: "#0f172a" }}>{mentors.length}</strong>
            </span>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Role & Organization</th>
                <th>Domain Category</th>
                <th>Experience</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMentors.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={m.avatar || "/images/mentors/sudhir-gupta.jpeg"}
                        alt={m.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "14px", display: "block" }}>{m.name}</strong>
                        <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>{m.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "13px" }}>
                      <span style={{ color: "#0f172a", fontWeight: 600, display: "block" }}>
                        {m.designation || m.role}
                      </span>
                      <span style={{ color: "#64748b", fontSize: "12px" }}>
                        {m.organization}
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
                        display: "inline-block",
                      }}
                    >
                      {m.domain}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", color: "#475569" }}>{m.experience}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#ecfdf5",
                        color: "#065f46",
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        fontSize: "11.5px",
                        fontWeight: 700,
                      }}
                    >
                      {m.status || "Active"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                      <button
                        onClick={() => openEditModal(m)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 10px", color: "#2563eb", borderColor: "#bfdbfe" }}
                        title="Edit Mentor"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.name)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}
                        title="Delete Mentor"
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

      {/* ADD / EDIT MENTOR MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
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
              {editingMentor ? "Edit Mentor Details" : "Add Mentor to Official Roster"}
            </h3>

            <form onSubmit={handleSave}>
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
                  Mentor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mr. Sudhir Gupta"
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
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g., CEO & Founder"
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
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g., Barodaweb"
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
                    Domain Category
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      background: "#ffffff",
                    }}
                  >
                    {domains.map((dom) => (
                      <option key={dom} value={dom}>
                        {dom}
                      </option>
                    ))}
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
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 15+ Years"
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

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  Avatar / Image URL (Path or URL)
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="e.g., /images/mentors/sudhir-gupta.jpeg"
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingMentor ? "Update Mentor" : "Save Mentor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
