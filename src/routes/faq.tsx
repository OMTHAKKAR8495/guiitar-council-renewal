import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';
import { AdminDataStore, type FaqItem } from '@/lib/adminStore';

export const Route = createFileRoute('/faq')({
  head: () => ({
    meta: [
      { title: 'Help Center & Frequently Asked Questions — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Find official answers to questions about incubation eligibility, SSIP 2.0 funding, patent grants, and laboratory access at GSFC University.',
      },
      { property: 'og:title', content: 'Help Center & FAQ — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Official guide and answers to everything about GUIITAR Council incubation & funding.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: FaqPage,
});

const categories = [
  'All',
  'Getting Started',
  'Innovation',
  'Funding',
  'IPR',
  'Infrastructure',
  'Mentorship',
  'Partnerships',
  'Events',
];

export function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqsList, setFaqsList] = useState<FaqItem[]>([]);

  const loadFaqs = () => {
    setFaqsList(AdminDataStore.getFaqs());
  };

  useEffect(() => {
    loadFaqs();
    const handleUpdate = () => loadFaqs();
    window.addEventListener('guiitar_store_update', handleUpdate);
    return () => window.removeEventListener('guiitar_store_update', handleUpdate);
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqsList.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchQuery = `${item.q} ${item.a} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, search, faqsList]);

  return (
    <>
      <PageHero
        badge="Help Center & Knowledge Base"
        title="How Can We Help?"
        text="Search official guidelines, policies, grant eligibility rules, and operational procedures for GUIITAR Council."
      />

      <section>
        <div className="container">
          {/* SEARCH BAR */}
          <div className="search-box-wrap" style={{ maxWidth: '680px', marginBottom: '36px' }}>
            <Search />
            <input
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ask anything about GUIITAR, funding, grants, or incubation..."
              aria-label="Search FAQs"
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`tab ${activeCategory === c ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(c);
                  setOpenIndex(null);
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ACCORDION LIST */}
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div className="accordion">
              {filteredFaqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div className={`accordion-item ${isOpen ? 'active' : ''}`} key={item.q}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span style={{ fontSize: '17px', fontWeight: 700 }}>{item.q}</span>
                      <ChevronDown className={`accordion-chevron ${isOpen ? 'rotate' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="accordion-content">
                        <span className="pill" style={{ fontSize: '11px', marginBottom: '8px' }}>
                          {item.category}
                        </span>
                        <p style={{ color: '#334155', fontSize: '15px', lineHeight: 1.7, margin: '8px 0 0' }}>
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="center" style={{ padding: '60px 20px', color: '#64748b' }}>
                <p style={{ fontSize: '18px', fontWeight: 600 }}>No answers found matching "{search}"</p>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '12px' }}
                  onClick={() => {
                    setSearch('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS HELP CARD */}
      <section className="section-muted">
        <div className="container split">
          <div className="prose">
            <span className="section-badge">Direct Assistance</span>
            <h2>Still Have Questions?</h2>
            <p>
              Our incubation managers and faculty advisors are available Monday through Friday for
              one-on-one virtual or in-person consultations.
            </p>
            <div className="button-row" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
              <ButtonLink to="/contact">
                <span>Submit Specific Question</span>
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="plain-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '14px' }}>Incubation Desk Contacts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a' }}>Mr. KiranKumar Parmar</strong>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Senior Manager (Incubation)</span>
              </div>
              <a href="mailto:guiitar@gsfcuniversity.ac.in" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                guiitar@gsfcuniversity.ac.in
              </a>
              <a href="tel:+912653093750" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                +91 (0265) 3093750
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
