import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  FileCheck,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';

export const Route = createFileRoute('/resources')({
  head: () => ({
    meta: [
      { title: 'Resources & Guidelines — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Download official SSIP 2.0 guidelines, Gujarat Industrial Policy manuals, IPR filing forms, and startup pitch templates from GUIITAR Council.',
      },
      { property: 'og:title', content: 'Resources & Guidelines — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Download policies, templates, and application documents for startups.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Resources,
});

const categories = [
  'All',
  'Policies & Schemes',
  'SSIP Guidelines',
  'IPR & Patents',
  'Templates & Pitch Decks',
  'Lab Handbooks',
];

const documents = [
  {
    title: 'SSIP 2.0 Comprehensive Policy & Operational Guidelines',
    category: 'SSIP Guidelines',
    desc: 'Official Government of Gujarat Student Startup and Innovation Policy (SSIP 2.0) guidelines, eligibility criteria, and disbursement rules.',
    date: 'Updated Dec 2025',
    format: 'PDF',
    size: '2.4 MB',
  },
  {
    title: 'Gujarat Industrial Policy 2020 — Startup Scheme Manual',
    category: 'Policies & Schemes',
    desc: 'Detailed framework for operational assistance, milestone grants up to ₹30 Lakhs, and fiscal incentives for tech startups.',
    date: 'Updated Nov 2025',
    format: 'PDF',
    size: '3.1 MB',
  },
  {
    title: 'GUIITAR Invention Disclosure Form (IDF) & Prior Art Template',
    category: 'IPR & Patents',
    desc: 'Mandatory intake form for students and faculty seeking institutional IPR filing subsidies and patent attorney reviews.',
    date: 'Updated Oct 2025',
    format: 'DOCX',
    size: '480 KB',
  },
  {
    title: 'Institutional Screening Committee (ISC) Pitch Deck Template',
    category: 'Templates & Pitch Decks',
    desc: 'Standardized 10-slide presentation template for pitching proof-of-concept projects to the GUIITAR grant committee.',
    date: 'Updated Oct 2025',
    format: 'PPTX',
    size: '1.8 MB',
  },
  {
    title: 'Param Shavak Supercomputer & GPU Lab User Access Manual',
    category: 'Lab Handbooks',
    desc: 'Standard operating procedures, SLURM scheduler guidelines, CUDA environment setup, and compute quota request procedures.',
    date: 'Updated Sep 2025',
    format: 'PDF',
    size: '1.5 MB',
  },
  {
    title: 'Drone Lab Safety Protocols & Autonomous Flight Checklist',
    category: 'Lab Handbooks',
    desc: 'Safety regulations, LiPo battery maintenance protocols, and DGCA flight logging procedures for GUIITAR Drone Lab users.',
    date: 'Updated Aug 2025',
    format: 'PDF',
    size: '950 KB',
  },
  {
    title: 'Standard Memorandum of Understanding (MOU) Draft Template',
    category: 'Templates & Pitch Decks',
    desc: 'Sample bilateral collaboration agreement for prospective corporate, academic, and incubator partner organizations.',
    date: 'Updated Aug 2025',
    format: 'DOCX',
    size: '320 KB',
  },
];

function Resources() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const shown = documents.filter((doc) => {
    const matchCat = cat === 'All' || doc.category === cat;
    const matchQuery = `${doc.title} ${doc.desc} ${doc.category}`.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleDownload = (title: string) => {
    setDownloaded(title);
    setTimeout(() => setDownloaded(null), 3000);
  };

  return (
    <>
      <PageHero
        badge="Knowledge Center"
        title="Resources, Policies & Templates"
        text="Access official policy manuals, grant application templates, IPR disclosure forms, and laboratory access handbooks."
      />

      <section>
        <div className="container">
          {/* SEARCH BOX */}
          <div className="search-box-wrap">
            <Search />
            <input
              className="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by keyword, policy name, or document type..."
              aria-label="Search resources"
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`tab ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* DOCUMENT CARDS LIST */}
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            {shown.map((doc) => (
              <article className="resource-card" key={doc.title}>
                <div className="resource-main">
                  <div className="icon-box">
                    <FileText />
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="pill">{doc.category}</span>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {doc.format} • {doc.size}
                      </span>
                    </div>
                    <h3>{doc.title}</h3>
                    <p>{doc.desc}</p>
                  </div>
                </div>

                <div className="resource-actions">
                  <span className="date">{doc.date}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(doc.title)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloaded === doc.title ? 'Downloaded!' : 'Download'}</span>
                  </button>
                </div>
              </article>
            ))}

            {shown.length === 0 && (
              <div className="center" style={{ padding: '60px 20px', color: '#64748b' }}>
                <p style={{ fontSize: '18px', fontWeight: 600 }}>No documents found matching "{q}"</p>
                <p>Try clearing your search query or selecting another category.</p>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '16px' }}
                  onClick={() => {
                    setQ('');
                    setCat('All');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HELP / REQUEST DOCUMENT CTA */}
      <section className="section-muted">
        <div className="container split">
          <div className="prose">
            <span className="section-badge">Direct Support</span>
            <h2>Can't Find the Document or Template You Need?</h2>
            <p>
              Our incubation administration team is ready to assist you with customized grant
              checklists, research disclosure forms, and MoU paperwork.
            </p>
            <ButtonLink to="/contact">
              <span>Request Custom Document</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
          <div className="plain-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>Popular Downloads:</h3>
            <ul className="list" style={{ paddingLeft: '18px', fontSize: '14.5px', color: '#475569' }}>
              <li>SSIP 2.0 Student Component Procurement Format</li>
              <li>Provisional Patent Filing Checklist (Indian Patent Office)</li>
              <li>Startup Mentor Agreement & Milestone Tracker</li>
              <li>Laboratory Safety Compliance Clearance Form</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
