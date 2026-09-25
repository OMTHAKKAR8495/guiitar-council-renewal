import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  Building,
  Mail,
  Shield,
  Bell,
  Globe,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

import { useEffect } from 'react';
import { AdminDataStore, type SystemSettings } from '@/lib/adminStore';

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
});

export function AdminSettingsPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [config, setConfig] = useState<SystemSettings>({
    institutionName: 'GUIITAR Council (GSFC University)',
    nodalOfficer: 'KiranKumar Parmar',
    contactEmail: 'guiitar@gsfcuniversity.ac.in',
    contactPhone: '+91 265 3093740',
    ssipPortalActive: true,
    autoAssignReviewers: true,
    emailAlertsOnSubmission: true,
    publicShowcaseLive: true,
  });

  useEffect(() => {
    setConfig(AdminDataStore.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    AdminDataStore.saveSettings(config);
    setToast('Institutional settings saved successfully');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AdminLayout title="System & Institutional Portal Settings">
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

      <form onSubmit={handleSave} style={{ maxWidth: '800px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building className="w-5 h-5 text-blue-600" />
            Institutional Configuration
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Center / Council Name
              </label>
              <input
                type="text"
                value={config.institutionName}
                onChange={(e) => setConfig({ ...config, institutionName: e.target.value })}
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
                Incubation Nodal Manager
              </label>
              <input
                type="text"
                value={config.nodalOfficer}
                onChange={(e) => setConfig({ ...config, nodalOfficer: e.target.value })}
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Official Communication Email
              </label>
              <input
                type="email"
                value={config.contactEmail}
                onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
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
                Helpdesk Phone Line
              </label>
              <input
                type="text"
                value={config.contactPhone}
                onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
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
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell className="w-5 h-5 text-purple-600" />
            Automation & Workflow Rules
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.ssipPortalActive}
                onChange={(e) => setConfig({ ...config, ssipPortalActive: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>
                  Enable SSIP 2.0 Public Submission Intake
                </strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                  Allows students and faculty to submit innovation proposals at /submit-idea.
                </span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.emailAlertsOnSubmission}
                onChange={(e) => setConfig({ ...config, emailAlertsOnSubmission: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>
                  Instant Admin Email Notification on New Intake
                </strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                  Dispatch real-time alerts to ISC Scrutiny Committee upon student proposal logging.
                </span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.publicShowcaseLive}
                onChange={(e) => setConfig({ ...config, publicShowcaseLive: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>
                  Real-time Public Innovation Showcase Sync
                </strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                  Immediately make published ideas live on /innovation and /innovation/[slug].
                </span>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-md"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Save className="w-4 h-4" />
          Save System Preferences
        </button>
      </form>
    </AdminLayout>
  );
}
