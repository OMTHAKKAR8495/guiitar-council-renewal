import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us — GUIITAR Council | GSFC University' },
      {
        name: 'description',
        content:
          'Get in touch with GUIITAR Council incubation team at GSFC University Vadodara. Apply for incubation, grant funding, or schedule a campus lab visit.',
      },
      { property: 'og:title', content: 'Contact Us — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Get in touch with the GUIITAR Council team in Vadodara, Gujarat.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Apply for Incubation',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        badge="Get in Touch"
        title="Contact GUIITAR Council"
        text="Have questions regarding incubation cohorts, grant eligibility, lab access, or partnerships? Our team is here to guide your journey."
      />

      {/* QUICK CONTACT CARDS */}
      <section style={{ paddingBottom: '0' }}>
        <div className="container grid-4">
          <article className="info-card" style={{ padding: '28px 24px' }}>
            <div className="icon-box">
              <MapPin />
            </div>
            <h3>Campus Location</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Event Room, 2nd Floor, Anviksha Building, GSFC University Campus, Fertilizernagar,
              Vadodara, Gujarat 391750, India
            </p>
          </article>

          <article className="info-card" style={{ padding: '28px 24px' }}>
            <div className="icon-box">
              <Phone />
            </div>
            <h3>Direct Contact</h3>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '0 0 4px' }}>
              Mr. KiranKumar Parmar
            </p>
            <span style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
              Senior Manager (Incubation)
            </span>
            <a
              href="tel:+912653093750"
              style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}
            >
              +91 (0265) 3093750
            </a>
          </article>

          <article className="info-card" style={{ padding: '28px 24px' }}>
            <div className="icon-box">
              <Mail />
            </div>
            <h3>Email Desk</h3>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 6px' }}>
              Official inquiries & grant submissions:
            </p>
            <a
              href="mailto:guiitar@gsfcuniversity.ac.in"
              style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: '14px', wordBreak: 'break-all' }}
            >
              guiitar@gsfcuniversity.ac.in
            </a>
          </article>

          <article className="info-card" style={{ padding: '28px 24px' }}>
            <div className="icon-box">
              <Clock />
            </div>
            <h3>Operating Hours</h3>
            <p style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: 600 }}>
              Monday – Friday: 9:30 AM – 5:30 PM
            </p>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Saturday: Lab cohorts by prior appointment
            </span>
          </article>
        </div>
      </section>

      {/* FORM & MAP SPLIT */}
      <section>
        <div className="container split">
          <div className="form-card">
            <span className="section-badge">Direct Application / Message</span>
            <h2 style={{ fontSize: '28px', margin: '8px 0 20px', fontWeight: 800 }}>Send Us a Message</h2>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Thank You!</h3>
                <p style={{ color: '#64748b', maxWidth: '420px', margin: '0 auto 24px' }}>
                  Your message has been received by the GUIITAR Council incubation office. A manager will
                  contact you within 48 business hours.
                </p>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      type: 'Apply for Incubation',
                      subject: '',
                      message: '',
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="form-grid" onSubmit={handleSubmit}>
                <label className="field">
                  <span>Your Full Name *</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Patel"
                  />
                </label>

                <label className="field">
                  <span>Email Address *</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rahul@example.com"
                  />
                </label>

                <label className="field">
                  <span>Phone Number *</span>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </label>

                <label className="field">
                  <span>Purpose of Inquiry *</span>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="Apply for Incubation">Apply for Incubation Support</option>
                    <option value="SSIP 2.0 Grant">SSIP 2.0 Student Grant Application</option>
                    <option value="Gujarat Policy 2020">Gujarat Industrial Policy 2020 Scheme</option>
                    <option value="IPR & Patent Support">IPR & Patent Filing Assistance</option>
                    <option value="Lab Access">Supercomputer / Drone Lab Access</option>
                    <option value="Partnership / MOU">Corporate Partnership / MOU</option>
                    <option value="General Query">General Inquiry</option>
                  </select>
                </label>

                <label className="field full">
                  <span>Subject / Project Title *</span>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. AI-driven crop disease detection PoC"
                  />
                </label>

                <label className="field full">
                  <span>Your Message / Brief Project Summary *</span>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please describe your innovation, stage of development (Ideation, Prototype, Beta), team details, and the specific support requested from GUIITAR Council..."
                  />
                </label>

                <div className="field full" style={{ marginTop: '10px' }}>
                  <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Incubation Team</span>
                  </button>
                  <p style={{ fontSize: '12.5px', color: '#94a3b8', textAlign: 'center', marginTop: '10px' }}>
                    🔒 We respect your privacy. Inventions and project details are held in strict institutional confidence.
                  </p>
                </div>
              </form>
            )}
          </div>

          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>Find Us on Campus</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Located at GSFC University, Vigyan Bhavan Campus, Fertilizernagar, Vadodara.
              </p>
            </div>
            <iframe
              className="map"
              title="GSFC University Vadodara Location"
              loading="lazy"
              src="https://www.google.com/maps?q=GSFC%20University%20Vadodara&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
