import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Target,
  Combine,
  Briefcase,
  BookOpen,
  Network,
  Award,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Handshake,
  FileCheck,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { IconCard } from '@/components/content';

export const Route = createFileRoute('/partner')({
  head: () => ({
    meta: [
      { title: 'Partner With Us — GUIITAR Council | GSFC University' },
      {
        name: 'description',
        content:
          'Collaborate with GUIITAR Council through corporate innovation partnerships, CSR startup grants, academic exchanges, and MOUs in Gujarat.',
      },
      { property: 'og:title', content: 'Partner With Us — GUIITAR Council' },
      {
        property: 'og:description',
        content: "Create lasting economic and technological impact in Gujarat's startup ecosystem.",
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Partner,
});

const why = [
  {
    title: 'Strategic Innovation Scouting',
    text: 'Get early access to cutting-edge student and researcher innovations across chemistry, deep-tech, drones, and green energy.',
    icon: Target,
  },
  {
    title: 'Resource & Lab Co-Optimization',
    text: 'Leverage our supercomputer labs, advanced drone centers, and maker workshops for joint R&D and rapid prototyping.',
    icon: Combine,
  },
  {
    title: 'CSR & Societal Impact',
    text: 'Channel corporate CSR capital into impactful student startup grants, women entrepreneurship, and clean-tech solutions.',
    icon: Briefcase,
  },
  {
    title: 'Applied Knowledge Transfer',
    text: 'Bridge academic theory with industry problem statements through sponsored capstone projects and research publications.',
    icon: BookOpen,
  },
  {
    title: 'High-Caliber Talent Pipeline',
    text: 'Engage with top-tier engineering, science, and management graduates trained in entrepreneurial problem-solving.',
    icon: Network,
  },
  {
    title: 'Statewide Ecosystem Visibility',
    text: 'Be recognized as a premier ecosystem partner across GSFC University summits, investor demo days, and state innovation expos.',
    icon: Award,
  },
];

const opportunities = [
  {
    title: 'Corporate & Industrial Partnership',
    badge: 'Industry R&D & Pilots',
    desc: 'For corporations seeking novel technological solutions, pilot testing opportunities, and CSR-funded incubation programs.',
    points: [
      'Direct access to pre-vetted deep-tech startups and patent portfolios',
      'Deploy corporate industrial challenges as hackathon problem statements',
      'Collaborative R&D with GSFC University laboratories and faculty experts',
      'Structured CSR deployment with complete compliance reporting',
    ],
  },
  {
    title: 'Academic & Research Institutions',
    badge: 'Joint Research & Faculty Exchange',
    desc: 'For universities, national research labs, and colleges looking to co-develop innovation hubs and student exchange programs.',
    points: [
      'Joint cross-institutional research grants and patent filings',
      'Faculty development programs on IPR, incubation, and deep-tech',
      'Shared access to specialized testing facilities and supercomputers',
      'Dual-cohort student hackathons and mentorship exchange',
    ],
  },
  {
    title: 'Investors & Angel Networks',
    badge: 'Deal Flow & Seed Co-Investment',
    desc: 'For early-stage VCs, angel investors, and family offices seeking high-potential non-diluted startup deal-flow in Gujarat.',
    points: [
      'Exclusive access to GUIITAR Demo Days and pitch cohorts',
      'Co-investment syndication alongside SSIP 2.0 and Industrial Policy grants',
      'Institutional due-diligence and technical validation reports',
      'Portfolio support with lab access and talent recruitment',
    ],
  },
  {
    title: 'Incubators & Accelerators',
    badge: 'Ecosystem Alliances',
    desc: 'For regional, national, and international incubators creating reciprocal startup exchange and market entry pipelines.',
    points: [
      'Bilateral startup soft-landing and facility sharing',
      'Shared pool of industry mentors and domain specialists',
      'Joint policy advocacy and ecosystem benchmarking',
      'Cross-border expansion support for hardware startups',
    ],
  },
];

const steps = [
  {
    num: '01',
    title: 'Initial Inquiry & Alignment',
    desc: 'Reach out via our partner inquiry portal or direct email to share your institutional objectives and collaboration interests.',
  },
  {
    num: '02',
    title: 'Consultation & Scope Definition',
    desc: 'Our leadership team schedules a dedicated session to outline key milestones, shared resources, and mutual deliverables.',
  },
  {
    num: '03',
    title: 'Draft MOU Formulation',
    desc: 'A comprehensive Memorandum of Understanding (MOU) is drafted covering legal terms, IP sharing, and operational timelines.',
  },
  {
    num: '04',
    title: 'Legal Review & Finalization',
    desc: 'Both institutional legal and academic committees review the document and finalize mutual commitments.',
  },
  {
    num: '05',
    title: 'Formal Signing Ceremony',
    desc: 'Official MOU signing with executive stakeholders from both organizations, accompanied by joint media announcements.',
  },
  {
    num: '06',
    title: 'Implementation & Program Launch',
    desc: 'Dedicated point-of-contacts commence actionable activities: workshops, hackathons, lab access, or startup pilots.',
  },
];

import { useEffect, useMemo } from 'react';
import { AdminDataStore, type PartnerItem } from '@/lib/adminStore';

function Partner() {
  const [storePartners, setStorePartners] = useState<PartnerItem[]>([]);

  const loadPartners = () => {
    setStorePartners(AdminDataStore.getPartners());
  };

  useEffect(() => {
    loadPartners();
    const handleUpdate = () => loadPartners();
    window.addEventListener('guiitar_store_update', handleUpdate);
    return () => window.removeEventListener('guiitar_store_update', handleUpdate);
  }, []);

  const partners = useMemo(() => {
    if (storePartners.length === 0) return [];
    return storePartners.map((p) => ({
      name: p.name,
      type: p.scope,
      category: p.category,
    }));
  }, [storePartners]);

  return (
    <>
      <PageHero
        badge="Strategic Alliances"
        title="Partner With GUIITAR Council"
        text="Collaborate with Gujarat's premier innovation ecosystem to scout deep-tech talent, sponsor high-impact grants, and co-develop commercial technologies."
      />

      {/* VALUE INTRO */}
      <section className="partner-intro" style={{ paddingTop: '50px' }}>
        <div className="container cta">
          <span className="section-badge">Building Together</span>
          <h2>Shaping Gujarat’s Entrepreneurial Future</h2>
          <p>
            Join hands with GSFC University's GUIITAR Council. Together, we can foster world-class
            technological research, empower young founders, and build enduring economic value.
          </p>
          <div className="button-row">
            <ButtonLink to="/contact" size="lg">
              <span>Initiate Partnership Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
            <a className="btn btn-outline btn-lg" href="mailto:guiitar@gsfcuniversity.ac.in">
              <span>Request MOU Draft Template</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Strategic Value"
            title="Why Partner With GUIITAR Council?"
            subtitle="Explore the multifaceted benefits of connecting your organization with our innovation hub."
          />
          <div className="grid-3">
            {why.map((item) => (
              <IconCard key={item.title} icon={<item.icon />} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATION TRACKS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Engagement Tracks"
            title="Partnership Opportunities"
            subtitle="Tailored collaboration models designed for corporations, universities, investors, and startup networks."
          />
          <div className="grid-2">
            {opportunities.map((item) => (
              <article className="plain-card" key={item.title} style={{ padding: '36px 32px' }}>
                <span className="pill" style={{ marginBottom: '14px' }}>
                  {item.badge}
                </span>
                <h3 style={{ fontSize: '22px' }}>{item.title}</h3>
                <p style={{ marginBottom: '20px' }}>{item.desc}</p>
                <ul className="list" style={{ paddingLeft: '18px', fontSize: '14.5px', marginBottom: '24px' }}>
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ButtonLink to="/contact" variant="outline" size="sm">
                  <span>Explore Track Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MOU PROCESS */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Simple Onboarding"
            title="Streamlined MOU Signing Process"
            subtitle="From first conversation to active program execution in six clear steps."
          />
          <div className="process">
            {steps.map((s) => (
              <div className="step" key={s.num}>
                <span className="step-num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mou-stat-box">
            <strong>50+</strong>
            <span>Active MOUs Signed Across Industry & Academia</span>
          </div>
        </div>
      </section>

      {/* ESTEEMED PARTNERS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Our Network"
            title="Our Esteemed Partners & Linkages"
            subtitle="Proudly collaborating with leading industrial corporations, government agencies, and premier incubators."
          />
          <div className="partner-grid">
            {partners.map((p) => (
              <div className="partner-box" key={p.name}>
                <span className="pill" style={{ marginBottom: '10px', fontSize: '11.5px' }}>
                  {p.category}
                </span>
                <b>{p.name}</b>
                <span>{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT INQUIRY & CONTACT */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Get in Touch"
            title="Connect with Our Partnership Team"
            subtitle="Ready to discuss an MOU, CSR initiative, or joint research project? Reach out directly to our incubation office."
          />

          <div className="grid-3">
            <article className="info-card" style={{ padding: '32px' }}>
              <div className="icon-box">
                <Mail />
              </div>
              <h3>Email Inquiries</h3>
              <p>For MOU proposals, corporate alliances, and CSR sponsorship:</p>
              <a
                href="mailto:guiitar@gsfcuniversity.ac.in"
                style={{ fontWeight: 700, color: '#2563eb', textDecoration: 'none', display: 'block', marginTop: '10px' }}
              >
                guiitar@gsfcuniversity.ac.in
              </a>
            </article>

            <article className="info-card" style={{ padding: '32px' }}>
              <div className="icon-box">
                <Phone />
              </div>
              <h3>Call Our Office</h3>
              <p>Monday to Friday, 9:30 AM – 5:30 PM IST:</p>
              <a
                href="tel:+912653093750"
                style={{ fontWeight: 700, color: '#2563eb', textDecoration: 'none', display: 'block', marginTop: '10px' }}
              >
                +91 (0265) 3093750
              </a>
            </article>

            <article className="info-card" style={{ padding: '32px' }}>
              <div className="icon-box">
                <MapPin />
              </div>
              <h3>Visit Campus</h3>
              <p>
                Event Room, 2nd Floor, Anviksha Building, GSFC University Campus, Fertilizernagar,
                Vadodara, Gujarat 391750
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-blue cta">
        <div className="container">
          <span className="section-badge light">Take the First Step</span>
          <h2>Ready to Create Lasting Societal Impact?</h2>
          <p>
            Partner with GUIITAR Council today and help build Gujarat's premier innovation ecosystem.
          </p>
          <div className="button-row">
            <ButtonLink to="/contact" size="lg" variant="dark">
              <span>Schedule Partnership Call</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
