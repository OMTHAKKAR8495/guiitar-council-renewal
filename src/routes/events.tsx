import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Video,
  ExternalLink,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';

export const Route = createFileRoute('/events')({
  head: () => ({
    meta: [
      { title: 'Workshops & Events — GUIITAR Council' },
      {
        name: 'description',
        content:
          'Join hands-on tech workshops, hackathons, drone masterclasses, and investor demo days hosted by GUIITAR Council, GSFC University.',
      },
      { property: 'og:title', content: 'Workshops & Events — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Enhance your tech & founder skills and expand your entrepreneurial network in Vadodara.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Events,
});

const allEvents = [
  {
    id: 1,
    title: 'Autonomous Drone Technology & Aerodynamics Workshop',
    date: 'October 17, 2026',
    time: '10:00 AM – 4:30 PM IST',
    location: 'Advanced Drone Research Lab & SOT Ground, GSFC University',
    category: 'Hardware & UAVs',
    isUpcoming: true,
    seats: '45 Seats Available',
    desc: 'An intensive, hands-on masterclass covering multi-rotor drone assembly, flight avionics, autonomous waypoint programming with ArduPilot, and DGCA drone compliance rules.',
    topics: [
      'Aerodynamic flight principles & brushless motor sizing',
      'Electronic speed controllers (ESC) & flight controller rigging',
      'Autonomous mission planning using Mission Planner & QGroundControl',
      'Payload integration: Thermal sensors & aerial mapping cameras',
      'DGCA airspace categorization and drone pilot guidelines',
    ],
  },
  {
    id: 2,
    title: 'Deep Learning & AI Acceleration on Param Shavak',
    date: 'November 05, 2026',
    time: '02:00 PM – 06:00 PM IST',
    location: 'Param Shavak Supercomputer Lab, Anviksha',
    category: 'AI / DeepTech',
    isUpcoming: true,
    seats: '30 Seats Available',
    desc: 'Explore GPU-accelerated computing pipelines for training neural networks, optimizing PyTorch models, and deploying computer vision systems at scale.',
    topics: [
      'Param Shavak DL GPU cluster architecture & CUDA setup',
      'Distributed training strategies for Vision & LLM models',
      'Model quantization & edge inference benchmarking',
    ],
  },
  {
    id: 3,
    title: 'Patent Drafting & Prior Art Search Masterclass',
    date: 'November 21, 2026',
    time: '11:00 AM – 02:00 PM IST',
    location: 'Event Room, 2nd Floor Anviksha & Virtual Stream',
    category: 'IPR & Legal',
    isUpcoming: true,
    seats: '60 Seats Available',
    desc: 'Learn directly from registered Indian Patent Attorneys on how to conduct bulletproof novelty searches, write independent claims, and protect research innovations.',
    topics: [
      'Techniques for Google Patents & InPASS database searches',
      'Drafting patent claims that withstand examination objections',
      'Claiming GUIITAR IPR Grant subsidies up to ₹1.5 Lakhs',
    ],
  },
  {
    id: 4,
    title: '3D Printing & Additive Manufacturing Bootcamp',
    date: 'July 10, 2026',
    time: '10:00 AM – 04:00 PM IST',
    location: 'Makers Lab, GSFC University',
    category: 'Rapid Prototyping',
    isUpcoming: false,
    desc: 'Hands-on CAD modeling in Fusion 360, slicing configurations, and rapid prototype fabrication using FDM & resin printers for 80+ student participants.',
    topics: ['CAD modeling to STL export', 'Slicer settings & support optimization', 'Post-processing resin prints'],
  },
  {
    id: 5,
    title: 'SSIP 2.0 Ideathon & Innovation Showcase',
    date: 'April 22, 2026',
    time: '09:00 AM – 06:00 PM IST',
    location: 'Surjan Open Arena & Vigyan Bhavan',
    category: 'Hackathon',
    isUpcoming: false,
    desc: 'Over 200 student innovators pitched 55 novel proof-of-concept projects to a panel of corporate judges and angel investors from Vadodara and Ahmedabad.',
    topics: ['55 project demos', '₹5.5L total prizes and grants sanctioned', '12 new incubatees onboarded'],
  },
];

function Events() {
  const [tab, setTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [registered, setRegistered] = useState<number | null>(null);

  const displayed = allEvents.filter((e) => (tab === 'Upcoming' ? e.isUpcoming : !e.isUpcoming));
  const featured = allEvents.find((e) => e.isUpcoming);

  return (
    <>
      <PageHero
        badge="Events & Ecosystem"
        title="Workshops, Hackathons & Masterclasses"
        text="Level up your technical craft, pitch to investors, and build alongside fellow visionaries through GUIITAR Council's curated events."
      />

      {/* FEATURED UPCOMING EVENT */}
      {featured && tab === 'Upcoming' && (
        <section style={{ paddingBottom: '0' }}>
          <div className="container">
            <SectionTitle
              badge="Featured Workshop"
              title="Next Flagship Hands-On Workshop"
              subtitle="Limited cohort size with hands-on hardware rigging and personal instructor guidance."
            />

            <article className="featured-event">
              <div className="event-date-box">
                <CalendarDays />
                <b>{featured.date}</b>
                <span>{featured.category}</span>
              </div>

              <div>
                <span className="pill emerald" style={{ marginBottom: '10px' }}>
                  {featured.seats}
                </span>
                <h2>{featured.title}</h2>
                <p style={{ color: '#475569', fontSize: '15.5px', lineHeight: '1.6', margin: '10px 0 16px' }}>
                  {featured.desc}
                </p>

                <div className="event-meta">
                  <span>
                    <Clock /> {featured.time}
                  </span>
                  <span>
                    <MapPin /> {featured.location}
                  </span>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '18px 0 8px' }}>
                  Core Workshop Modules:
                </h4>
                <ul className="list" style={{ paddingLeft: '18px', fontSize: '14px', marginBottom: '24px' }}>
                  {featured.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                {registered === featured.id ? (
                  <div className="success-banner">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>You are registered! A confirmation email with workshop venue passes has been sent.</span>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setRegistered(featured.id)}
                  >
                    <span>Reserve Your Free Seat Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ALL EVENTS LIST WITH TABS */}
      <section>
        <div className="container">
          <div className="tabs">
            {(['Upcoming', 'Past'] as const).map((t) => (
              <button
                key={t}
                className={`tab ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t} Events ({allEvents.filter((e) => (t === 'Upcoming' ? e.isUpcoming : !e.isUpcoming)).length})
              </button>
            ))}
          </div>

          <div className="grid-2">
            {displayed.map((e) => (
              <article className="plain-card event-card" key={e.id} style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`pill ${e.isUpcoming ? 'emerald' : 'blue'}`}>
                    {e.category}
                  </span>
                  <span className="date">{e.date}</span>
                </div>

                <h3>{e.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px' }}>{e.desc}</p>

                <div className="event-card-details">
                  <span>
                    <Clock /> {e.time}
                  </span>
                  <span>
                    <MapPin /> {e.location}
                  </span>
                  {e.isUpcoming && (
                    <span>
                      <Users /> {e.seats}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  {e.isUpcoming ? (
                    registered === e.id ? (
                      <span className="pill emerald">✓ Registered</span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setRegistered(e.id)}
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  ) : (
                    <ButtonLink to="/contact" variant="outline" size="sm">
                      <span>View Session Archive</span>
                    </ButtonLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOST AN EVENT CTA */}
      <section className="section-muted">
        <div className="container split">
          <div className="prose">
            <span className="section-badge">Community & Ecosystem</span>
            <h2>Want to Host an Event or Workshop with Us?</h2>
            <p>
              Are you an industry expert, tech evangelist, or community leader looking to run a
              hackathon, expert talk, or technical bootcamp for Vadodara's top innovators?
            </p>
            <ButtonLink to="/contact" size="lg">
              <span>Partner to Host an Event</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
          <div className="plain-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>What We Provide:</h3>
            <ul className="list" style={{ paddingLeft: '18px', fontSize: '14.5px', color: '#475569' }}>
              <li>150-seater multimedia Auditorium & Anviksha Conference Hall</li>
              <li>Param Shavak Supercomputer Lab & High-Speed Wi-Fi connectivity</li>
              <li>Live streaming, AV rigging & promotional outreach to 5,000+ students</li>
              <li>Institutional certificate co-branding with GSFC University</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
