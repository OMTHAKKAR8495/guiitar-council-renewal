import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  Layers,
  Award,
  Users,
  Building,
  DollarSign,
  Lightbulb,
  CheckCircle,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDataStore } from '@/lib/adminStore';

export const Route = createFileRoute('/admin/analytics')({
  component: AdminAnalyticsPage,
});

type TimeRange = '7d' | '30d' | '90d' | '6m' | '1y' | 'all';

export function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const stats = useMemo(() => {
    return AdminDataStore.getStats();
  }, []);

  const timeRangeLabels: Record<TimeRange, string> = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days',
    '6m': 'Last 6 Months',
    '1y': 'Last 1 Year',
    all: 'All Time (Institutional)',
  };

  const monthlyData = [
    { month: 'Apr', count: 18, published: 12 },
    { month: 'May', count: 24, published: 16 },
    { month: 'Jun', count: 15, published: 10 },
    { month: 'Jul', count: 32, published: 22 },
    { month: 'Aug', count: 41, published: 28 },
    { month: 'Sep', count: 38, published: 25 },
  ];

  const categoryDistribution = [
    { name: 'Biotech & Life Sciences', count: 34, percent: '28%', color: '#10b981' },
    { name: 'AI & Autonomous Robotics', count: 29, percent: '24%', color: '#3b82f6' },
    { name: 'CleanTech & Circular Materials', count: 22, percent: '18%', color: '#059669' },
    { name: 'IoT & Embedded Electronics', count: 20, percent: '16%', color: '#8b5cf6' },
    { name: 'Healthcare & Biomedical Devices', count: 18, percent: '14%', color: '#ec4899' },
  ];

  const stageDistribution = [
    { stage: 'Idea & Exploration', count: 42, color: '#94a3b8' },
    { stage: 'Laboratory Research', count: 28, color: '#38bdf8' },
    { stage: 'Working Prototype', count: 35, color: '#3b82f6' },
    { stage: 'MVP / Validation', count: 19, color: '#8b5cf6' },
    { stage: 'Field Pilot Test', count: 11, color: '#f59e0b' },
    { stage: 'Incubated Startup', count: 8, color: '#10b981' },
  ];

  const supportRequests = [
    { type: 'SSIP 2.0 Prototyping Grants', count: 54, budget: '₹1.35 Cr' },
    { type: 'Prototyping & Drone Lab Access', count: 46, budget: 'N/A' },
    { type: 'Patent Filing / IPR Cell', count: 38, budget: '₹12.5 Lakhs' },
    { type: 'Technical Mentorship', count: 41, budget: 'N/A' },
    { type: 'Industry Pilot & Market Access', count: 29, budget: 'N/A' },
  ];

  return (
    <AdminLayout
      title="Innovation Analytics & Intelligence"
      actions={
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
            {(['7d', '30d', '90d', '6m', '1y', 'all'] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: timeRange === r ? '#ffffff' : 'transparent',
                  color: timeRange === r ? '#0f172a' : '#64748b',
                  boxShadow: timeRange === r ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      }
    >
      {/* SUMMARY KPI CARDS */}
      <div className="admin-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Ideas Submitted</span>
            <div className="stat-icon-wrapper blue">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="stat-value">{stats.totalIdeas}</div>
          <div className="stat-subtitle positive">+24% vs previous institutional cohort</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Published on Showcase</span>
            <div className="stat-icon-wrapper emerald">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="stat-value">{stats.publishedIdeas}</div>
          <div className="stat-subtitle">Publicly accessible innovations</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pending ISC Review</span>
            <div className="stat-icon-wrapper amber">
              <Layers className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="stat-value">{stats.pendingIdeas}</div>
          <div className="stat-subtitle">Awaiting committee evaluation</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Incubated Startups</span>
            <div className="stat-icon-wrapper purple">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="stat-value">{stats.totalStartups}</div>
          <div className="stat-subtitle">83+ Registered Ventures</div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* SUBMISSION & PUBLICATION VELOCITY */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                Innovation Intake & Review Velocity
              </h3>
              <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
                Monthly volume of innovations submitted vs committee approved & published
              </p>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              {timeRangeLabels[timeRange]}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', height: '220px', padding: '20px 10px 10px' }}>
            {monthlyData.map((item) => (
              <div
                key={item.month}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', width: '100%', height: '100%', justifyContent: 'center' }}>
                  <div
                    title={`Submitted: ${item.count}`}
                    style={{
                      width: '16px',
                      height: `${(item.count / 50) * 100}%`,
                      background: '#cbd5e1',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <div
                    title={`Published: ${item.published}`}
                    style={{
                      width: '16px',
                      height: `${(item.published / 50) * 100}%`,
                      background: '#2563eb',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '10px' }}>
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
              <div style={{ width: '12px', height: '12px', background: '#cbd5e1', borderRadius: '3px' }} />
              Total Submissions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
              <div style={{ width: '12px', height: '12px', background: '#2563eb', borderRadius: '3px' }} />
              Published to Showcase
            </div>
          </div>
        </div>

        {/* CATEGORY DISTRIBUTION */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
            Top Innovation Thrust Domains
          </h3>
          <p style={{ color: '#64748b', fontSize: '13.5px', margin: '0 0 20px' }}>
            Breakdown across GSFC University R&D centers
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryDistribution.map((cat) => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <strong style={{ color: '#0f172a' }}>{cat.name}</strong>
                  <span style={{ fontWeight: 700, color: '#475569' }}>
                    {cat.count} ({cat.percent})
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: cat.percent, height: '100%', background: cat.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND ROW: STAGES & SUPPORT REQUESTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* STAGE MATURITY PIPELINE */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
            Innovation Maturity Stages
          </h3>
          <p style={{ color: '#64748b', fontSize: '13.5px', margin: '0 0 20px' }}>
            Current pipeline progression from lab concept to commercial enterprise
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stageDistribution.map((s) => (
              <div
                key={s.stage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{s.stage}</span>
                </div>
                <span
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#0f172a',
                  }}
                >
                  {s.count} Projects
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORT & GRANT ALLOCATION */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
            Support & Grant Demands
          </h3>
          <p style={{ color: '#64748b', fontSize: '13.5px', margin: '0 0 20px' }}>
            Institutional resources requested across student & faculty innovators
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {supportRequests.map((req) => (
              <div
                key={req.type}
                style={{
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong style={{ fontSize: '13.5px', color: '#0f172a', display: 'block' }}>
                    {req.type}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Requested by {req.count} applicant teams
                  </span>
                </div>
                {req.budget !== 'N/A' && (
                  <span
                    style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      fontSize: '12px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {req.budget}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
