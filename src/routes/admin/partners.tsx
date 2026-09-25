import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Handshake,
  Plus,
  Trash2,
  CheckCircle,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const Route = createFileRoute('/admin/partners')({
  component: AdminPartnersPage,
});

interface PartnerItem {
  id: string;
  name: string;
  category: 'Industry' | 'Government' | 'Academic' | 'Investor';
  scope: string;
  mouStatus: 'Active MOU' | 'In Discussion' | 'Renewed';
}

const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: 'pt-1',
    name: 'GSFC Limited (Gujarat State Fertilizers & Chemicals)',
    category: 'Industry',
    scope: 'Industrial pilot testing, chemical labs, plant access & R&D grants.',
    mouStatus: 'Active MOU',
  },
  {
    id: 'pt-2',
    name: 'Student Startup & Innovation Policy (SSIP Gujarat)',
    category: 'Government',
    scope: 'Grant funding disbursement node under Education Department.',
    mouStatus: 'Active MOU',
  },
  {
    id: 'pt-3',
    name: 'DST — Government of India (NIDHI-TBI)',
    category: 'Government',
    scope: 'National incubation ecosystem development and EIR fellowship.',
    mouStatus: 'Active MOU',
  },
  {
    id: 'pt-4',
    name: 'Vadodara Chamber of Commerce and Industry (VCCI)',
    category: 'Industry',
    scope: 'SME vendor matching and manufacturing proof-of-concept facilities.',
    mouStatus: 'Active MOU',
  },
];

export function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>(INITIAL_PARTNERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Industry' as PartnerItem['category'],
    scope: '',
    mouStatus: 'Active MOU' as PartnerItem['mouStatus'],
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newP: PartnerItem = {
      id: `pt-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      scope: formData.scope,
      mouStatus: formData.mouStatus,
    };

    setPartners([newP, ...partners]);
    setModalOpen(false);
    setToast(`Added partner "${formData.name}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete partner "${name}"?`)) {
      setPartners(partners.filter((p) => p.id !== id));
      setToast(`Deleted "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Institutional Partners & Industry MOUs"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      }
    >
      {toast && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          {toast}
        </div>
      )}

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Partner Organization</th>
                <th>Category</th>
                <th>Collaboration Scope</th>
                <th>MOU Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong style={{ color: '#0f172a', fontSize: '14px' }}>{p.name}</strong>
                  </td>
                  <td>
                    <span
                      style={{
                        background: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{p.scope}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {p.mouStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
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

      {/* MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Add Institutional Partner
            </h3>

            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Partner Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Reliance Innovation Wing"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Industry">Industry</option>
                    <option value="Government">Government</option>
                    <option value="Academic">Academic</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    MOU Status
                  </label>
                  <select
                    value={formData.mouStatus}
                    onChange={(e) => setFormData({ ...formData, mouStatus: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Active MOU">Active MOU</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Renewed">Renewed</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Collaboration Scope
                </label>
                <textarea
                  rows={3}
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Internships, sponsored R&D, pilot facilities, grant matching..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
