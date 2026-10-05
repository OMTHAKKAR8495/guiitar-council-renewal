import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Plus, Search, CheckCircle, Trash2, Briefcase, Star, Building } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect } from "react";
import { AdminDataStore, type MentorItem } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/mentors")({
  component: AdminMentorsPage,
});

export function AdminMentorsPage() {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const ADMIN_TABS = ["All", ...AdminDataStore.ACTIVE_DOMAINS] as const;

  const loadMentors = () => {
    setMentors(AdminDataStore.getMentors());
  };

  useEffect(() => {
    // Bring any stale localStorage records up-to-date with the current seed data
    // before reading, without overwriting genuine admin edits.
    AdminDataStore.migrateMentorData();
    loadMentors();
    const handleUpdate = () => loadMentors();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    organization: "",
    domain: "Industry",
    experience: "10+ Years",
    avatar: "",
  });

  // Filter to active domains, apply tab selection, then apply search
  const activeMentors = mentors.filter((m) =>
    (AdminDataStore.ACTIVE_DOMAINS as readonly string[]).includes(m.domain),
  );
  const tabMentors =
    activeTab === "All" ? activeMentors : activeMentors.filter((m) => m.domain === activeTab);
  const filteredMentors = tabMentors.filter((m) =>
    `${m.name} ${m.role || m.designation} ${m.organization} ${m.domain}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    AdminDataStore.saveMentor({
      name: formData.name,
      role: formData.role || "Mentor",
      designation: formData.role || "Mentor & Domain Specialist",
      organization: formData.organization || "GSFC University / Industry",
      domain: formData.domain,
      experience: formData.experience,
      avatar:
        formData.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      expertise: [formData.domain, "Mentorship"],
      status: "Active",
    });

    setModalOpen(false);
    setFormData({
      name: "",
      role: "",
      organization: "",
      domain: "Artificial Intelligence",
      experience: "10+ Years",
      avatar: "",
    });
    setToast(`Added mentor "${formData.name}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove mentor "${name}"?`)) {
      AdminDataStore.deleteMentor(id);
      setToast(`Removed "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Institutional Mentor Network"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Plus className="w-4 h-4" />
          Add Mentor
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
          <div style={{ position: "relative", width: "320px" }}>
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

          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Active Mentors: <strong>50+</strong> industry leaders & faculty
          </span>
        </div>

        {/* Category tabs */}
        <div
          style={{
            padding: "12px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                border: "1px solid",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: activeTab === tab ? "#1e40af" : "#f8fafc",
                color: activeTab === tab ? "#ffffff" : "#475569",
                borderColor: activeTab === tab ? "#1e40af" : "#cbd5e1",
                transition: "all 0.15s",
              }}
            >
              {tab}
              {tab !== "All" && (
                <span
                  style={{
                    marginLeft: "6px",
                    background: activeTab === tab ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                    color: activeTab === tab ? "#ffffff" : "#64748b",
                    borderRadius: "9999px",
                    padding: "1px 7px",
                    fontSize: "11px",
                  }}
                >
                  {activeMentors.filter((m) => m.domain === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Professional Role & Company</th>
                <th>Domain Expertise</th>
                <th>Experience</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMentors.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={m.avatar}
                        alt={m.name}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <strong style={{ color: "#0f172a", fontSize: "14px" }}>{m.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "13px" }}>
                      <span style={{ color: "#0f172a", fontWeight: 600 }}>{m.role}</span>
                      <span style={{ color: "#64748b", display: "block", fontSize: "12px" }}>
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
                      }}
                    >
                      {m.domain}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", color: "#475569" }}>{m.experience}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MENTOR MODAL */}
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
              Add Mentor to Roster
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
                  Mentor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Dr. Rajeshwari Nair"
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
                    Current Designation / Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Chief Technology Officer"
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
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g., GSFC Ltd. / Industry"
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
                    Category
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
                    {AdminDataStore.ACTIVE_DOMAINS.map((d) => (
                      <option key={d} value={d}>{d}</option>
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
                    Industry Experience
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
