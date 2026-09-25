import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import {
  Award,
  TrendingUp,
  Users,
  Building2,
  ShieldCheck,
  Banknote,
  CalendarDays,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { VERIFIED_METRICS } from '@/lib/data';

export const Route = createFileRoute('/impact')({
  head: () => ({
    meta: [
      { title: 'Impact Dashboard & Verified Milestones — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Explore verified institutional metrics: 1800+ mentored, 83+ startups incubated, 145+ IPR filed, ₹30L+ grants disbursed at GSFC University.',
      },
      { property: 'og:title', content: 'Impact Dashboard — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Verified public milestones and innovation impact data of GUIITAR Council.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ImpactDashboardPage,
});

const yearlyBreakdown = {
  All: {
    mentored: '1800+',
    incubated: '83+',
    ipr: '145+',
    grants: '₹30L+',
    events: '115+',
    sensitized: '13,000+',
    summary: 'Cumulative verified track record since inception across GSFC University innovation cohorts.',
  },
  '2026': {
    mentored: '350+',
    incubated: '18+',
    ipr: '32+',
    grants: '₹8.5L+',
    events: '24+',
    sensitized: '2,800+',
    summary: 'Active calendar year focusing on Deep Learning GPU models, drone hardware, and bio-colorants.',
  },
  '2025': {
    mentored: '520+',
    incubated: '26+',
    ipr: '44+',
    grants: '₹11.0L+',
    events: '38+',
    sensitized: '4,200+',
    summary: 'Expanded SSIP 2.0 grant disbursals and launched the Advanced Drone and Autonomous Flight Lab.',
  },
  '2024': {
    mentored: '480+',
    incubated: '22+',
    ipr: '38+',
    grants: '₹6.5L+',
    events: '32+',
    sensitized: '3,600+',
    summary: 'Commissioned the Param Shavak Supercomputer DL GPU facility and scaled patent filing subsidies.',
  },
  '2023': {
    mentored: '450+',
    incubated: '17+',
    ipr: '31+',
    grants: '₹4.0L+',
    events: '21+',
    sensitized: '2,400+',
    summary: 'Established the Section 8 non-profit institutional governance structure at GSFC University.',
  },
};

const timelineMilestones = [
  {
    year: '2023',
    title: 'Foundation of GUIITAR Council (Section 8 Company)',
    desc: 'Formally incorporated as a non-profit technology incubation council under GSFC University to bridge academic science and commercial entrepreneurship.',
  },
  {
    year: '2024',
    title: 'Param Shavak Supercomputer DL Facility Commissioned',
    desc: 'Installed the dedicated GPU computing cluster to accelerate training of AI/ML models for agri-tech, medical diagnostics, and simulation.',
  },
  {
    year: '2025',
    title: 'SSIP 2.0 Expansion & Advanced Drone Lab Launch',
    desc: 'Crossed 100+ patent filings and commissioned the aeronautical flight proving lab for student UAV prototypes.',
  },
  {
    year: '2026',
    title: 'Venture Acceleration & Corporate Pilot Scaling',
    desc: 'Scaled direct grant sanctions to ₹30 Lakhs+ across 83+ active incubated ventures, connecting founders with GSFC Ltd industrial pilots.',
  },
];

export function ImpactDashboardPage() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof yearlyBreakdown>('All');
  const activeData = yearlyBreakdown[selectedYear];

  return (
    <>
      <PageHero
        badge="Verified Public Data"
        title="Institutional Impact Dashboard"
        text="Transparent metrics reflecting our commitment to student entrepreneurship, non-dilutive grant funding, and technological advancement in Gujarat."
      />

      {/* YEAR FILTER & METRIC CARDS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Data Filter"
            title="Impact Metrics by Calendar Year"
            subtitle="Select a year to review verified annual milestones and grant disbursement records."
          />

          <div className="tabs">
            {(['All', '2026', '2025', '2024', '2023'] as const).map((year) => (
              <button
                key={year}
                className={`tab ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year === 'All' ? 'All-Time Cumulative' : `Year ${year}`}
              </button>
            ))}
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '32px',
              textAlign: 'center',
              color: '#334155',
              fontSize: '14.5px',
              fontWeight: 600,
            }}
          >
            📊 {activeData.summary}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="impact-metrics-grid"
          >
            {[
              { label: 'Students / Startups Mentored', val: activeData.mentored, icon: Users, color: '#1d4ed8' },
              { label: 'Students / Startups Incubated', val: activeData.incubated, icon: Building2, color: '#059669' },
              { label: 'IPR & Patents Filed', val: activeData.ipr, icon: ShieldCheck, color: '#d97706' },
              { label: 'Direct Grants Sanctioned', val: activeData.grants, icon: Banknote, color: '#2563eb' },
              { label: 'Workshops & Hackathons', val: activeData.events, icon: CalendarDays, color: '#7c3aed' },
              { label: 'Students Sensitized', val: activeData.sensitized, icon: Award, color: '#0891b2' },
            ].map((m) => (
              <article key={m.label} className="plain-card" style={{ padding: '36px 30px', textAlign: 'center' }}>
                <m.icon className="w-8 h-8 mx-auto mb-3" style={{ color: m.color }} />
                <strong style={{ display: 'block', fontSize: '42px', fontFamily: 'var(--font-heading)', fontWeight: 900, color: m.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {m.val}
                </strong>
                <span style={{ display: 'block', fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '10px' }}>
                  {m.label}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVOLUTION TIMELINE */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Institutional Evolution"
            title="The Journey of GUIITAR Council"
            subtitle="Key developmental milestones from inception to becoming Vadodara's premier innovation ecosystem."
          />

          <div className="process" style={{ maxWidth: '860px' }}>
            {timelineMilestones.map((milestone) => (
              <div className="step" key={milestone.year} style={{ padding: '28px 24px' }}>
                <span className="step-num" style={{ width: '60px', height: '60px', fontSize: '18px' }}>
                  {milestone.year}
                </span>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px' }}>{milestone.title}</h3>
                  <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6 }}>{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Be Part of the Next Milestone</span>
          <h2>Join the Next Cohort of Innovators.</h2>
          <p>
            Whether you are building your first proof-of-concept or preparing for market scale,
            GUIITAR Council provides the capital, facilities, and mentorship.
          </p>
          <div className="button-row">
            <ButtonLink to="/apply" size="lg" variant="dark">
              <span>Apply for Incubation</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
