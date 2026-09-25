import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useEffect } from 'react';
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
import { AdminDataStore, type ResourceDoc } from '@/lib/adminStore';

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
  'Policy Document',
  'IPR Template',
  'Pitch Template',
  'Lab Guidelines',
];

function Resources() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [docsList, setDocsList] = useState<ResourceDoc[]>([]);

  const loadResources = () => {
    setDocsList(AdminDataStore.getResources());
  };

  useEffect(() => {
    loadResources();
    const handleUpdate = () => loadResources();
    window.addEventListener('guiitar_store_update', handleUpdate);
    return () => window.removeEventListener('guiitar_store_update', handleUpdate);
  }, []);

  const documents = useMemo(() => {
    return docsList.map((d) => ({
      title: d.title,
      category: d.category,
      desc: d.description,
      date: `Updated ${d.updated}`,
      format: d.format,
      size: d.size,
    }));
  }, [docsList]);

  const shown = documents.filter((doc) => {
    const matchCat = cat === 'All' || doc.category.toLowerCase().includes(cat.toLowerCase());
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
