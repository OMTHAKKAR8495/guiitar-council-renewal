import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Banknote,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Rocket,
  Award,
  ArrowRight,
  Sparkles,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { Accordion } from '@/components/content';

export const Route = createFileRoute('/funding')({
  head: () => ({
    meta: [
      { title: 'Funding Opportunities & Grants — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Explore non-dilutive startup funding, SSIP 2.0 student grants up to ₹2.5L, Gujarat Industrial Policy up to ₹30L, and patent support grants through GUIITAR Council.',
      },
      { property: 'og:title', content: 'Funding Opportunities — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Funding support, seed capital, and non-dilutive grants for innovators and startups.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Funding,
});

const programs = [
  {
    title: 'SSIP 2.0 Grant Scheme',
    badge: 'Student Innovation Policy',
    amount: 'Up to ₹2.5 Lakhs',
    desc: 'Empowering school students, diploma, UG, PG, and PhD researchers to transform academic prototypes into market-ready minimum viable products (MVPs).',
    covered: [
      'Raw materials, electronic components & fabrication costs',
      'Testing, lab analysis, and industrial validation charges',
      'Third-party prototyping services & 3D printing consumables',
      'Zero equity dilution or repayment required',
    ],
    eligibility: [
      'Any student or innovator up to the age of 35 years',
      'School Students (Classes 9–12) eligible for grants up to ₹20,000',
      'Diploma, Undergraduate, Postgraduate, Doctoral students or recent alumni',
      'Dropouts from recognized schools, institutes, or universities with innovative concepts',
    ],
    application: [
      'Submit detailed PoC proposal via online portal',
      'Technical review by Faculty Expert Committee',
      'Pitch presentation before the Institutional Screening Committee (ISC)',
      'Sanction letter and milestone-linked tranche release',
    ],
  },
  {
    title: 'Gujarat Industrial Policy 2020',
    badge: 'Venture Acceleration',
    amount: 'Up to ₹30 Lakhs',
    desc: 'Catalytic milestone funding for registered startups to scale commercial operations, hire specialized technical talent, and establish market distribution channels.',
    covered: [
      'Pilot production setup & tooling machinery',
      'Marketing campaigns, exhibition showcases & sales expansion',
      'Key technical hiring and compliance consulting',
      'Product certification & regulatory safety approvals',
    ],
    eligibility: [
      'Registered startup entity (DPIIT recognized or Gujarat registered)',
      'Operational history with a validated, working prototype or beta product',
      'Demonstrated market traction, customer interest, or revenue model',
      'Clear, scalable growth strategy for employment and economic value',
    ],
    application: [
      'Submit comprehensive business plan and audited financials',
      'Due-diligence and technical validation by industry experts',
      'High-level Committee pitch and milestone agreement',
      'Quarterly progress review and disbursal schedule',
    ],
  },
  {
    title: 'IPR & Patent Support Grant',
    badge: 'Intellectual Property',
    amount: 'Up to ₹1.5 Lakhs',
    desc: 'Comprehensive financial and attorney support for students, faculty, and incubated startups to safeguard proprietary technologies and novel inventions.',
    covered: [
      'Prior-art searching and novelty assessment by patent attorneys',
      'Professional patent drafting and complete specification filing',
      'Official statutory fees paid to the Indian Patent Office (IPO)',
      'Assistance for International PCT & design registration filings',
    ],
    eligibility: [
      'Novel technological invention, chemical formulation, or industrial design',
      'Clear IP ownership and assignment documentation with GUIITAR',
      'Documented commercialization roadmap and societal applicability',
      'Must be incubated or affiliated with GSFC University / GUIITAR Council',
    ],
    application: [
      'Submit invention disclosure form (IDF) to GUIITAR IPR Cell',
      'Prior art validation and patentability report by attorney',
      'Institutional IPR Committee approval',
      'Formal filing at IPO and commercialization facilitation',
    ],
  },
];

const fundedProjects = [
  {
    title: 'Ayurtrix — Three Folding Life',
    amount: '₹2,50,000 Sanctioned',
    category: 'Ayurveda & Phytopharma',
    desc: 'Developing standardized authentic Ayurvedic formulations with verified botanical bioactive markers to meet rising healthcare demands.',
    impact: 'Established standardized extraction protocols and filed formulation documentation for clinical benchmarking.',
  },
  {
    title: 'Bacterial Chroma: Biopigment Factory',
    amount: '₹1,70,000 Sanctioned',
    category: 'Industrial BioTech',
    desc: 'Isolating and synthesizing non-toxic bacterial pigments as eco-friendly alternatives to harmful synthetic chemical dyes for textiles and cosmetics.',
    impact: 'Synthesized 4 vibrant bio-pigments exhibiting natural antimicrobial properties with zero heavy-metal residue.',
  },
  {
    title: 'Bio-Lastic: Future with Flowers',
    amount: '₹1,00,000 Sanctioned',
    category: 'CleanTech & Circular Economy',
    desc: 'Upcycling floral waste from temples and urban centers into completely biodegradable polymer resins for packaging and single-use film alternatives.',
    impact: 'Created 100% home-compostable film samples and diverted over 500 kg of urban temple waste.',
  },
];

const fundingFaqs = [
  {
    q: 'Do I have to give equity to GUIITAR Council for SSIP 2.0 grants?',
    a: 'No. SSIP 2.0 grants are non-dilutive government and institutional grants. You retain 100% of your company’s equity and ownership.',
  },
  {
    q: 'How long does the grant approval process take?',
    a: 'Typically, the evaluation and Institutional Screening Committee (ISC) review takes between 3 to 5 weeks from the date of completed application submission.',
  },
  {
    q: 'Can a single startup apply for multiple funding schemes?',
    a: 'Yes. A startup can initially receive SSIP 2.0 prototyping support and IPR filing assistance, and subsequently apply for the Gujarat Industrial Policy 2020 scheme once they reach market traction.',
  },
  {
    q: 'Are funds disbursed all at once or in milestones?',
    a: 'Funds are disbursed in structured, milestone-based tranches linked to verified project outcomes, component procurement receipts, and utilization certificates.',
  },
];

function Funding() {
  const [userRole, setUserRole] = useState<'student' | 'startup' | 'ipr'>('student');

  return (
    <>
      <PageHero
        badge="Non-Dilutive Capital"
        title="Fueling Breakthrough Innovations"
        text="Access substantial non-dilutive grant funding, seed capital, and IPR assistance tailored to every stage of your technological journey."
      />

      {/* THREE CORE PROGRAMS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Grant Pipelines"
            title="Our Flagship Funding Programs"
            subtitle="Transparent, milestone-based financial support designed to empower student innovators and high-growth ventures."
          />

          <div className="grid-3">
            {programs.map((p) => (
              <article className="plain-card" key={p.title} style={{ padding: '32px 28px' }}>
                <span className="pill" style={{ marginBottom: '14px' }}>
                  {p.badge}
                </span>
                <h3 style={{ fontSize: '22px' }}>{p.title}</h3>
                <p style={{ minHeight: '66px' }}>{p.desc}</p>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '26px',
                    color: '#1d4ed8',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    margin: '18px 0 20px',
                  }}
                >
                  {p.amount}
                </strong>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '20px 0 10px', color: '#0f172a' }}>
                  What's Covered:
                </h4>
                <ul className="list" style={{ paddingLeft: '18px', fontSize: '14px', marginBottom: '20px' }}>
                  {p.covered.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 10px', color: '#0f172a' }}>
                  Key Eligibility:
                </h4>
                <ul className="list" style={{ paddingLeft: '18px', fontSize: '14px', marginBottom: '24px' }}>
                  {p.eligibility.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <ButtonLink to="/contact" variant="primary" style={{ width: '100%' }}>
                  <span>Apply for {p.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DISBURSEMENT PROCESS */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Application Flow"
            title="Structured 4-Stage Grant Process"
            subtitle="How your funding application is screened, evaluated, sanctioned, and disbursed."
          />
          <div className="pathway-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              {
                step: '01',
                title: 'Online Application',
                desc: 'Fill the grant application form with your project abstract, problem statement, technical novelty, and budget estimate.',
              },
              {
                step: '02',
                title: 'Technical Review',
                desc: 'Domain experts and faculty mentors conduct technical due-diligence and prior-art validation of your proposal.',
              },
              {
                step: '03',
                title: 'Pitch to Committee (ISC)',
                desc: 'Present your pitch deck, live prototype demo, and milestone roadmap before the Institutional Screening Committee.',
              },
              {
                step: '04',
                title: 'Sanction & Tranche Release',
                desc: 'Receive your formal Sanction Letter. Funds are released against verified procurement bills and milestone achievements.',
              },
            ].map((s) => (
              <div className="pathway-step" key={s.step}>
                <div className="pathway-num">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDED PROJECTS SHOWCASE */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Proven Impact"
            title="Funded Innovations & Startups"
            subtitle="Explore real student and alumni innovations supported through GUIITAR Council grants."
          />
          <div className="grid-3">
            {fundedProjects.map((p) => (
              <article className="plain-card" key={p.title} style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="pill amber">{p.category}</span>
                  <span className="startup-grant-tag">{p.amount}</span>
                </div>
                <h3>{p.title}</h3>
                <p style={{ marginBottom: '14px' }}>{p.desc}</p>
                <div
                  style={{
                    background: '#f8fafc',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '13.5px',
                    color: '#475569',
                  }}
                >
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Milestone Impact:</strong>
                  {p.impact}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Questions Answered"
            title="Funding & Disbursement FAQs"
            subtitle="Everything you need to know about criteria, expenses, and compliance."
          />
          <Accordion items={fundingFaqs} />
          <div className="center spaced">
            <ButtonLink to="/contact" size="lg">
              <span>Submit Your Funding Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
