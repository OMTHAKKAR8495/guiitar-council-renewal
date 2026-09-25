import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Briefcase,
  Lightbulb,
  Building2,
  Users,
  ShieldCheck,
  Presentation,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  CalendarDays,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { Accordion } from '@/components/content';

export const Route = createFileRoute('/programs')({
  head: () => ({
    meta: [
      { title: 'Incubation & Acceleration Programs — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Explore specialized incubation programs, Student Innovation E-Club, IPR grants, 1-on-1 mentorship, and tech bootcamps at GSFC University.',
      },
      { property: 'og:title', content: 'Incubation & Acceleration Programs — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Structured incubation tracks for students, researchers, and scalable ventures.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ProgramsPage,
});

const programsList = [
  {
    id: 'student-innovation',
    name: 'Student Innovation Wing (The E-Club)',
    badge: 'Ideation & Pre-Incubation',
    tagline: 'Empowering curious minds to test ideas, form multidisciplinary teams, and build first PoCs.',
    whoCanApply: 'School students (Classes 9–12), Diploma, Undergraduate, Postgraduate, and PhD researchers at GSFC University and regional colleges.',
    whatYouReceive: [
      'SSIP 2.0 Prototyping Grant funding up to ₹2.5 Lakhs (or up to ₹20,000 for school projects)',
      'Access to E-Club hackathons, ideation clinics, and monthly founder meetups',
      'Free bench access to Makers 3D Lab and Design IoT Lab',
      'Peer-to-peer founder circles and faculty domain mentoring',
    ],
    process: ['Online idea submission', 'Technical screening review', 'Pitch to ISC Committee', 'Tranche grant release'],
    timeline: '3 to 6 months ideation & prototyping cycle',
    cta: 'Apply for E-Club Track',
  },
  {
    id: 'incubation',
    name: 'Full Venture Incubation & Co-Working',
    badge: 'Startup Commercialization',
    tagline: 'Transforming validated prototypes into incorporated, revenue-generating commercial companies.',
    whoCanApply: 'Early-stage startup founders with functional prototypes, minimum viable products (MVPs), or preliminary customer traction.',
    whatYouReceive: [
      'Furnished dedicated startup workstations at Anviksha Innovation Hub',
      'Assistance for DPIIT recognition, company incorporation (Pvt Ltd / LLP), and tax exemptions',
      'Eligibility for Gujarat Industrial Policy 2020 grant assistance up to ₹30 Lakhs',
      'Conference room, high-speed Wi-Fi, and printing infrastructure',
    ],
    process: ['Detailed business plan review', 'Due-diligence interview', 'MOU & Lease Agreement', 'Incubation onboarding'],
    timeline: '12 to 24 months incubation residency',
    cta: 'Apply for Incubation Cohort',
  },
  {
    id: 'ipr-support',
    name: 'IPR & Patent Support Program',
    badge: 'Intellectual Property',
    tagline: 'Safeguarding novel inventions with full financial subsidies and professional attorney drafting.',
    whoCanApply: 'Students, faculty researchers, and incubated startups with novel technologies, formulations, or industrial designs.',
    whatYouReceive: [
      'Prior-art search reports across global patent databases (USPTO, EPO, WIPO, InPASS)',
      'Professional patent drafting by registered Indian Patent Attorneys',
      'Up to ₹1.5 Lakhs financial reimbursement per patent filing',
      'Commercialization and licensing negotiation support',
    ],
    process: ['Submit Invention Disclosure Form (IDF)', 'Novelty report generation', 'IP Committee review', 'Filing at Indian Patent Office'],
    timeline: '4 to 8 weeks from disclosure to formal filing',
    cta: 'Submit Invention Disclosure',
  },
  {
    id: 'mentorship',
    name: '1-on-1 Industry Mentorship Network',
    badge: 'Expert Advisory',
    tagline: 'Pairing founders with seasoned corporate leaders, research scientists, and venture architects.',
    whoCanApply: 'All active GUIITAR incubatees, SSIP 2.0 grant recipients, and pre-incubation cohort founders.',
    whatYouReceive: [
      'Monthly sprint reviews with domain specialists (Biotech, DeepTech, AI, Chemical, IoT)',
      'Product architecture and engineering scale-up advisory',
      'Financial modeling, unit economics, and go-to-market strategy coaching',
      'Direct introductions to industrial clients and angel investors',
    ],
    process: ['Founder diagnostic needs assessment', 'Mentor-founder matching', 'Monthly structured sprint reviews'],
    timeline: 'Continuous throughout incubation tenure',
    cta: 'Request Mentor Pairing',
  },
];

export function ProgramsPage() {
  const [selectedProgramId, setSelectedProgramId] = useState('student-innovation');
  const activeProgram = programsList.find((p) => p.id === selectedProgramId) || programsList[0];

  return (
    <>
      <PageHero
        badge="Structured Incubation Tracks"
        title="Programs Built to Accelerate Your Venture"
        text="From campus ideation clinics to multi-lakh grant disbursals and corporate pilot trials — find the exact incubation track for your stage."
      >
        <div className="button-row">
          <ButtonLink to="/apply" size="md" variant="primary">
            <span>Apply for Program Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* PROGRAM TRACK SELECTOR TABS */}
      <section>
        <div className="container">
          <div className="tabs">
            {programsList.map((p) => (
              <button
                key={p.id}
                className={`tab ${selectedProgramId === p.id ? 'active' : ''}`}
                onClick={() => setSelectedProgramId(p.id)}
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>

          {/* ACTIVE PROGRAM DETAILED DOSSIER */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              padding: '44px 40px',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '44px',
            }}
            className="program-dossier-grid"
          >
            <div>
              <span className="pill emerald" style={{ marginBottom: '12px' }}>
                {activeProgram.badge}
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 900, margin: '8px 0 10px', color: '#0f172a' }}>
                {activeProgram.name}
              </h2>
              <p style={{ fontSize: '16.5px', fontWeight: 600, color: '#2563eb', margin: '0 0 24px', lineHeight: 1.5 }}>
                {activeProgram.tagline}
              </p>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '12px' }}>
                  What You Receive:
                </h4>
                <ul className="list" style={{ paddingLeft: '20px', fontSize: '15px', color: '#334155' }}>
                  {activeProgram.whatYouReceive.map((item) => (
                    <li key={item} style={{ marginBottom: '8px' }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '12px' }}>
                  4-Stage Process:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {activeProgram.process.map((step, idx) => (
                    <div key={step} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                      <span style={{ color: '#2563eb', fontWeight: 800, marginRight: '6px' }}>0{idx + 1}.</span> {step}
                    </div>
                  ))}
                </div>
              </div>

              <ButtonLink to="/apply" size="lg">
                <span>{activeProgram.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '10px' }}>
                  Target Beneficiaries:
                </h4>
                <p style={{ fontSize: '14.5px', color: '#0f172a', fontWeight: 600, lineHeight: 1.6, marginBottom: '24px' }}>
                  {activeProgram.whoCanApply}
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
                  Typical Program Timeline:
                </h4>
                <p style={{ fontSize: '14.5px', color: '#2563eb', fontWeight: 700, marginBottom: '24px' }}>
                  ⏱ {activeProgram.timeline}
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', display: 'block', marginBottom: '4px' }}>
                  ✓ Non-Profit Institutional Commitment
                </span>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  Administered under GSFC University non-profit Section 8 governance with zero equity dilution on student prototyping grants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PROGRAMS GRID */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Program Portfolio"
            title="All Incubation & Skill-Building Tracks"
            subtitle="Explore our full spectrum of student, founder, and researcher development programs."
          />

          <div className="grid-2">
            {programsList.map((p) => (
              <article key={p.id} className="plain-card" style={{ padding: '32px 28px' }}>
                <span className="pill" style={{ marginBottom: '12px' }}>{p.badge}</span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px' }}>{p.name}</h3>
                <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {p.tagline}
                </p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{p.timeline}</span>
                  <ButtonLink to="/apply" variant="outline" size="sm">
                    <span>Apply for Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Start Here</span>
          <h2>Not Sure Which Program Fits Your Stage?</h2>
          <p>
            Use our interactive Funding Navigator or connect directly with our incubation managers
            for an exploratory consultation.
          </p>
          <div className="button-row">
            <ButtonLink to="/funding" size="lg" variant="dark">
              <span>Launch Funding Navigator</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="glass">
              <span>Contact Incubation Desk</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
