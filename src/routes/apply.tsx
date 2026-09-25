import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Lightbulb,
  Building2,
  Users,
  Banknote,
  ShieldCheck,
  Network,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { AdminDataStore } from '@/lib/adminStore';

export const Route = createFileRoute('/apply')({
  head: () => ({
    meta: [
      { title: 'Unified Application Portal — GUIITAR Council | GSFC University' },
      {
        name: 'description',
        content:
          'Submit your innovation, apply for startup incubation, request mentorship, or explore SSIP 2.0 grants through GUIITAR Council portal.',
      },
      { property: 'og:title', content: 'Unified Application Portal — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Start your innovation journey with GSFC University incubation hub.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ApplyPage,
});

const applicationTracks = [
  {
    id: 'innovation',
    title: 'Submit an Innovation',
    badge: 'Student / Researcher PoC',
    desc: 'For students, alumni, and independent inventors looking to validate a technical concept and secure initial prototyping assistance.',
    icon: Lightbulb,
  },
  {
    id: 'incubation',
    title: 'Apply for Incubation',
    badge: 'Startup Residency',
    desc: 'For early-stage startup teams with working prototypes seeking dedicated desk suites, DPIIT registration, and acceleration.',
    icon: Building2,
  },
  {
    id: 'funding',
    title: 'Explore Funding Grants',
    badge: 'SSIP 2.0 & Policy 2020',
    desc: 'For projects seeking non-dilutive seed capital up to ₹2.5 Lakhs (SSIP 2.0) or ₹30 Lakhs (Industrial Policy 2020).',
    icon: Banknote,
  },
  {
    id: 'ipr',
    title: 'IPR & Patent Support',
    badge: 'Patent Subsidy',
    desc: 'For inventors seeking prior-art novelty searches, professional patent attorney drafting, and statutory fee reimbursements.',
    icon: ShieldCheck,
  },
  {
    id: 'mentorship',
    title: 'Request Mentorship',
    badge: '1-on-1 Advisory',
    desc: 'For founders seeking structured guidance from industry CXOs, domain researchers, and venture architects.',
    icon: Users,
  },
  {
    id: 'partner',
    title: 'Partner With GUIITAR',
    badge: 'Corporate & CSR',
    desc: 'For corporations, universities, and angel networks seeking MOU partnerships, CSR startup grants, or technology scouting.',
    icon: Network,
  },
];

export function ApplyPage() {
  const [selectedTrack, setSelectedTrack] = useState('innovation');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    projectTitle: '',
    stage: 'Ideation',
    fundingRequested: 'SSIP 2.0 (Up to ₹2.5L)',
    summary: '',
  });

  const activeTrackObj = applicationTracks.find((t) => t.id === selectedTrack) || applicationTracks[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AdminDataStore.addApplication({
      type: activeTrackObj.title as any,
      applicant: formData.fullName || 'Innovator',
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization || 'Independent',
      projectTitle: formData.projectTitle,
      stage: formData.stage,
      fundingRequested: formData.fundingRequested,
      summary: formData.summary || `Application submitted for ${activeTrackObj.title}`,
      status: 'Pending',
    });
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        badge="Unified Application Portal"
        title="Start Your Journey"
        text="Choose your application track below. Our Institutional Screening Committee reviews submissions on a rolling basis."
      />

      {/* TRACK SELECTOR CARDS */}
      <section style={{ paddingBottom: '0' }}>
        <div className="container">
          <SectionTitle
            badge="Step 1 of 2"
            title="Select Your Application Track"
            subtitle="Click on the category that matches your immediate goal to load the customized application form."
          />

          <div className="grid-3">
            {applicationTracks.map((track) => {
              const isSelected = selectedTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrack(track.id);
                    setSubmitted(false);
                  }}
                  style={{
                    background: isSelected ? '#ffffff' : '#f8fafc',
                    border: `2px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                    borderRadius: '16px',
                    padding: '28px 24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 12px 30px rgba(37, 99, 235, 0.15)' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="pill" style={{ background: isSelected ? '#eff6ff' : '#f1f5f9', color: isSelected ? '#2563eb' : '#64748b' }}>
                      {track.badge}
                    </span>
                    <track.icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '4px 0 8px', color: isSelected ? '#1d4ed8' : '#0f172a' }}>
                    {track.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.55, margin: 0 }}>
                    {track.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STEP 2: INTAKE FORM */}
      <section>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="form-card" style={{ padding: '44px 36px' }}>
            <span className="pill emerald" style={{ marginBottom: '12px' }}>
              Selected Track: {activeTrackObj.title}
            </span>

            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '8px 0 20px' }}>
              Submit Your Proposal
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                  Application Successfully Registered!
                </h3>
                <p style={{ color: '#475569', fontSize: '15px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                  Your proposal for <strong>{activeTrackObj.title}</strong> has been logged in the
                  GUIITAR Council review queue. Our screening committee will reach out within 5–7 business days.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      organization: '',
                      projectTitle: '',
                      stage: 'Ideation',
                      fundingRequested: 'SSIP 2.0 (Up to ₹2.5L)',
                      summary: '',
                    });
                  }}
                >
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <form className="form-grid" onSubmit={handleSubmit}>
                <label className="field">
                  <span>Lead Applicant Name *</span>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priyanshu Sharma"
                  />
                </label>

                <label className="field">
                  <span>Official Email Address *</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priyanshu@gsfcuniversity.ac.in"
                  />
                </label>

                <label className="field">
                  <span>Phone Number *</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </label>

                <label className="field">
                  <span>Institution / Department / Startup *</span>
                  <input
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. GSFC University (B.Tech Chemical)"
                  />
                </label>

                <label className="field full">
                  <span>Project or Venture Title *</span>
                  <input
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    placeholder="e.g. Biodegradable Mulch Film from Industrial Lignin"
                  />
                </label>

                <label className="field">
                  <span>Current Development Stage *</span>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  >
                    <option value="Ideation">Ideation & Concept</option>
                    <option value="Proof of Concept">Proof of Concept (PoC Built)</option>
                    <option value="Working Prototype">Working Prototype / MVP</option>
                    <option value="Early Traction">Early Customer / Beta Testing</option>
                    <option value="Incorporated Startup">Incorporated Startup Company</option>
                  </select>
                </label>

                <label className="field">
                  <span>Primary Grant / Support Requested *</span>
                  <select
                    value={formData.fundingRequested}
                    onChange={(e) => setFormData({ ...formData, fundingRequested: e.target.value })}
                  >
                    <option value="SSIP 2.0 (Up to ₹2.5L)">SSIP 2.0 Prototyping Grant (Up to ₹2.5L)</option>
                    <option value="Policy 2020 (Up to ₹30L)">Gujarat Industrial Policy 2020 (Up to ₹30L)</option>
                    <option value="IPR Grant (Up to ₹1.5L)">IPR & Patent Subsidy (Up to ₹1.5L)</option>
                    <option value="Lab Access Only">Lab & Prototyping Access Only</option>
                    <option value="Co-Working Space">Anviksha Co-Working Desk Space</option>
                  </select>
                </label>

                <label className="field full">
                  <span>Detailed Project Summary & Innovation Novelty *</span>
                  <textarea
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Describe the core problem statement, your technical solution, novelty vs existing market products, team composition, and expected milestone timeline..."
                  />
                </label>

                <div className="field full" style={{ marginTop: '12px' }}>
                  <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                    <Send className="w-4 h-4" />
                    <span>Submit Application for Technical Screening</span>
                  </button>
                  <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12.5px', color: '#94a3b8', marginTop: '12px' }}>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confidentiality Guaranteed. All IP remains 100% owned by the applicant.</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
