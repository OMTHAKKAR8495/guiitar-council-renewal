import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Download,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDataStore, type ResourceDoc } from '@/lib/adminStore';

export const Route = createFileRoute('/admin/resources')({
  component: AdminResourcesPage,
});

export function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceDoc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadResources = () => {
    setResources(AdminDataStore.getResources());
  };

  useEffect(() => {
    loadResources();
    const handleUpdate = () => loadResources();
    window.addEventListener('guiitar_store_update', handleUpdate);
    return () => window.removeEventListener('guiitar_store_update', handleUpdate);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Policy Document',
    format: 'PDF',
    size: '1.2 MB',
    description: '',
  });

  const filteredResources = resources.filter((r) =>
    `${r.title} ${r.category} ${r.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    AdminDataStore.saveResource({
      title: formData.title,
      category: formData.category,
      format: formData.format,
      size: formData.size,
      updated: 'Just now',
      description: formData.description,
      downloads: 0,
      link: '#',
      isPublic: true,
    });

    setModalOpen(false);
    setFormData({
      title: '',
      category: 'Policy Document',
      format: 'PDF',
      size: '1.2 MB',
      description: '',
    });
    setToast(`Uploaded resource "${formData.title}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete resource "${title}"?`)) {
      AdminDataStore.deleteResource(id);
      setToast(`Deleted "${title}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Institutional Resources & Document Repository"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus className="w-4 h-4" />
          Upload Document
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
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '320px' }}>
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies, forms, pitch templates..."
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Total Files: <strong>{resources.length}</strong> official documents
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Document Title</th>
                <th>Category</th>
                <th>Format & Size</th>
                <th>Total Downloads</th>
                <th>Last Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((res) => (
                <tr key={res.id}>
                  <td>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>
                        {res.title}
                      </strong>
                      <span style={{ fontSize: '12.5px', color: '#64748b' }}>{res.description}</span>
                    </div>
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
                      {res.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12.5px' }}>
                      <span style={{ fontWeight: 800, color: '#2563eb' }}>{res.format}</span> • {res.size}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {res.downloads}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: '#64748b' }}>{res.updated}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(res.id, res.title)}
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

      {/* UPLOAD MODAL */}
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
              Upload Institutional Resource
            </h3>

            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., SSIP 2.0 Prototyping Grant Expense Guidelines"
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
                    Document Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    File Format
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="PPTX">PPTX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of document purpose and instructions for student innovators..."
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
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
