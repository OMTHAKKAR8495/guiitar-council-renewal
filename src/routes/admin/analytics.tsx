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

import { useEffect } from 'react';

type TimeRange = '7d' | '30d' | '90d' | '6m' | '1y' | 'all';

export function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [ideas, setIdeas] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const loadData = () => {
    setIdeas(AdminDataStore.getIdeas());
    setCategories(AdminDataStore.getCategories());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('guiitar_store_update', handleUpdate);
    return () => window.removeEventListener('guiitar_store_update', handleUpdate);
  }, []);

  const stats = useMemo(() => {
    return AdminDataStore.getStats();
  }, [ideas]);

  const timeRangeLabels: Record<TimeRange, string> = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days',
    '6m': 'Last 6 Months',
    '1y': 'Last 1 Year',
    all: 'All Time (Institutional)',
  };

  const monthlyData = [
    { month: 'Apr', count: Math.max(2, Math.floor(ideas.length * 0.4)), published: Math.max(1, Math.floor(ideas.length * 0.25)) },
    { month: 'May', count: Math.max(3, Math.floor(ideas.length * 0.5)), published: Math.max(2, Math.floor(ideas.length * 0.35)) },
    { month: 'Jun', count: Math.max(2, Math.floor(ideas.length * 0.3)), published: Math.max(1, Math.floor(ideas.length * 0.2)) },
    { month: 'Jul', count: Math.max(4, Math.floor(ideas.length * 0.6)), published: Math.max(2, Math.floor(ideas.length * 0.4)) },
    { month: 'Aug', count: Math.max(5, Math.floor(ideas.length * 0.8)), published: Math.max(3, Math.floor(ideas.length * 0.6)) },
    { month: 'Sep', count: ideas.length, published: ideas.filter(i => i.status === 'Published').length },
  ];

  const categoryDistribution = useMemo(() => {
    const total = Math.max(1, ideas.length);
    const catColors = ['#10b981', '#3b82f6', '#059669', '#8b5cf6', '#ec4899', '#f59e0b'];
    if (categories.length > 0) {
      return categories.map((cat, idx) => {
        const count = ideas.filter(i => i.category.toLowerCase().includes(cat.name.toLowerCase()) || cat.name.toLowerCase().includes(i.category.toLowerCase())).length;
        const percent = `${Math.round((count / total) * 100)}%`;
        return {
          name: cat.name,
          count,
          percent,
          color: cat.color || catColors[idx % catColors.length],
        };
      });
    }
    return [
      { name: 'Biotech & Life Sciences', count: ideas.filter(i => i.category.includes('Biotech')).length, percent: '35%', color: '#10b981' },
      { name: 'AI & Autonomous Robotics', count: ideas.filter(i => i.category.includes('Robotics') || i.category.includes('AI')).length, percent: '30%', color: '#3b82f6' },
      { name: 'CleanTech & Circular Materials', count: ideas.filter(i => i.category.includes('CleanTech')).length, percent: '25%', color: '#059669' },
    ];
  }, [ideas, categories]);

  const stageDistribution = useMemo(() => {
    const stages = [
      { stage: 'Idea & Exploration', key: 'Idea', color: '#94a3b8' },
      { stage: 'Laboratory Research', key: 'Research', color: '#38bdf8' },
      { stage: 'Working Prototype', key: 'Prototype', color: '#3b82f6' },
      { stage: 'MVP / Validation', key: 'MVP', color: '#8b5cf6' },
      { stage: 'Field Pilot Test', key: 'Pilot', color: '#f59e0b' },
      { stage: 'Incubated Startup', key: 'Startup', color: '#10b981' },
    ];
    return stages.map(s => ({
      stage: s.stage,
      count: ideas.filter(i => i.stage === s.key).length,
      color: s.color,
    }));
  }, [ideas]);

  const supportRequests = useMemo(() => {
    return [
      { type: 'SSIP 2.0 Prototyping Grants', count: ideas.filter(i => (i.supportRequired || []).includes('Funding')).length, budget: '₹30L+ Disbursed' },
      { type: 'Prototyping & Drone Lab Access', count: ideas.filter(i => (i.supportRequired || []).includes('Lab Access') || (i.supportRequired || []).includes('Drone Lab Access')).length, budget: 'Subsidized' },
      { type: 'Patent Filing / IPR Cell', count: ideas.filter(i => (i.supportRequired || []).includes('IPR')).length, budget: '₹1.5L / Patent' },
      { type: 'Technical Mentorship', count: ideas.filter(i => (i.supportRequired || []).includes('Mentorship')).length, budget: 'Included' },
      { type: 'Industry Pilot & Market Access', count: ideas.filter(i => (i.supportRequired || []).includes('Market Access') || (i.supportRequired || []).includes('Industry Connection')).length, budget: 'MOU Linked' },
    ];
  }, [ideas]);

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
