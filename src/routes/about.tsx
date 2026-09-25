import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Leaf,
  Bot,
  Dna,
  ShieldCheck,
  Zap,
  HeartPulse,
  Wifi,
  Factory,
  Droplets,
  Cpu,
  Plane,
  Layers,
  BookOpen,
  Monitor,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { PageHero, SectionTitle, ButtonLink } from '@/components/site';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — GUIITAR Council | GSFC University' },
      {
        name: 'description',
        content:
          "Learn about GUIITAR Council's mission, vision, leadership, 13 thrust areas, and state-of-the-art incubation infrastructure at GSFC University.",
      },
      { property: 'og:title', content: 'About Us — GUIITAR Council' },
      {
        property: 'og:description',
        content: 'Innovation, entrepreneurship, and technological advancement in Vadodara.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: About,
});

const objectives = [
  'To establish, manage, and operate a world-class technology business incubator.',
  'To promote student entrepreneurship and convert innovative proof-of-concepts into financially sustainable commercial enterprises.',
  'To catalyze the incubation ecosystem through institutional, government, and corporate partnerships.',
  'To manage technology transfer, applied research commercialization, and knowledge networks.',
  'To offer structured mentoring services from experienced industry leaders and academicians.',
  'To encourage socially beneficial ventures and advance Gujarat’s standing as an innovation hub.',
];

const thrust = [
  ['Agriculture & Allied Fields', Leaf],
  ['Artificial Intelligence & Robotics', Bot],
  ['Biotechnology & Life Sciences', Dna],
  ['Clean-Tech & Circular Economy', Leaf],
  ['Cyber Security & Network Defense', ShieldCheck],
  ['Renewable Energy & Power Systems', Zap],
  ['Environmental Engineering Solutions', Leaf],
  ['Healthcare & Biomedical Devices', HeartPulse],
  ['Information & Communication Tech (ICT)', Wifi],
  ['Internet of Things (IoT) & Embedded', Cpu],
  ['Advanced Manufacturing & Materials', Factory],
  ['Deep-Tech Services & Automation', Bot],
  ['Water & Wastewater Treatment Tech', Droplets],
] as const;

const teams: { [k: string]: [string, string, string?][] } = {
  'Board of Directors': [
    [
      'Shri P. K. Taneja, IAS (Retd.)',
      'President, GSFC University & Chairman, GUIITAR Council',
      'Former Additional Chief Secretary (Home / Forest & Environment), Govt. of Gujarat.',
    ],
    [
      'Prof. G. R. Sinha',
      'Provost, GSFC University & CEO, GUIITAR Council',
      'Distinguished Academician, Researcher, and IEEE Senior Member with 25+ years in engineering leadership.',
    ],
  ],
  'Core Incubation Team': [
    ['Prof. G. R. Sinha', 'CEO, GUIITAR Council & Provost', 'Leadership & Institutional Vision'],
    ['Mr. KiranKumar Parmar', 'Senior Manager (Incubation)', 'Operations, Grant Management & Startups'],
    ['Mr. Bhuvan Vyas', 'Manager (Ecosystem & Linkages)', 'Corporate Relations & Mentor Coordination'],
    ['Mr. Amit Duggal', 'Senior Executive (Technical)', 'Prototyping Labs & Hardware Infrastructure'],
  ],
  'Faculty Mentors': [
    ['Dr. Akhilesh Prajapati', 'Associate Professor', 'Chemical Engineering & Process Innovation'],
    ['Dr. Mihir Trivedi', 'Sr. Assistant Professor', 'Computer Science & AI/ML Systems'],
    ['Dr. Chandra Has', 'Sr. Assistant Professor', 'Mechanical Engineering & Prototyping'],
    ['Dr. Jignesh Valand', 'Assistant Professor', 'Biotechnology & Bio-pigment Research'],
    ['Dr. Rahul Sharma', 'Assistant Professor', 'IoT, Embedded Systems & Electronics'],
    ['Mr. Abidhusain Lodha', 'Assistant Professor', 'Robotics, Drones & CAD Modeling'],
  ],
  'Technical Associates': [
    ['Mr. Anup Upadhaya', 'Lab Assistant', 'Makers Lab & 3D Fabrication'],
    ['Ms. Chaitali Karpe', 'Lab Assistant', 'Design IoT & Hardware Rigging'],
    ['Mr. Hemant Rajpoot', 'Laboratory Instructor', 'Electronics & Drone Systems'],
    ['Dr. Bhoomi Shah', 'Assistant Professor', 'IPR Documentation & Research Support'],
  ],
  'Student Innovation Council': [
    ['E-Club President & Leads', 'Student Leadership', 'Hackathons, Outreach & Cohort Operations'],
    ['Tech Wing Coordinators', 'Technical Sub-Committee', 'Workshop Execution & Lab Assistance'],
    ['Design & Media Leads', 'Creative Wing', 'Branding, Demo Days & Founder Spotlights'],
  ],
};

const infra = [
  {
    name: 'Supercomputer Lab (Param Shavak)',
    desc: 'Equipped with the Param Shavak DL GPU Supercomputing system, designed to accelerate training and development of deep learning models, computer vision, and compute-intensive simulations.',
    icon: Monitor,
    tone: 'tone-0',
  },
  {
    name: 'Advanced Drone & UAV Lab',
    desc: 'A dedicated aeronautical innovation center supporting multi-rotor assembly, autonomous flight path programming, payload testing, and drone regulations research.',
    icon: Plane,
    tone: 'tone-1',
  },
  {
    name: 'Makers & 3D Prototyping Lab',
    desc: 'Spacious fabrication space outfitted with high-precision Laser Cutting machines, FDM & Resin 3D Printers, Vinyl Cutters, and rapid PoC assembly workbenches.',
    icon: Layers,
    tone: 'tone-2',
  },
  {
    name: 'Design & IoT Tinkering Lab',
    desc: 'Dedicated hardware benches with oscilloscope suites, microcontrollers (ESP32, STM32, Arduino, Raspberry Pi), sensor arrays, and soldering stations.',
    icon: Cpu,
    tone: 'tone-3',
  },
  {
    name: 'Anviksha Co-Working Hub',
    desc: 'Ergonomic, high-speed furnished workstation suites and private conference booths tailored for incubated student founders and early-stage startup teams.',
    icon: BookOpen,
    tone: 'tone-0',
  },
  {
    name: 'Surjan Open Collaboration Arena',
    desc: 'A vibrant open-air campus amphitheater and amphitheater pod designed for casual brainstorming, startup meetups, pitch practice, and peer ideation.',
    icon: Sparkles,
    tone: 'tone-1',
  },
];

function About() {
  const [team, setTeam] = useState('Board of Directors');
  const [slide, setSlide] = useState(0);

  const members = teams[team] ?? [];
  const pageSize = 3;
  const visible = members.slice(slide, slide + pageSize);

  return (
    <>
      <PageHero
        badge="About GUIITAR Council"
        title="Pioneering Innovation & Entrepreneurship"
        text="GUIITAR Council is GSFC University's dedicated Section 8 non-profit incubation hub, empowering innovators to convert technological breakthroughs into market-ready ventures."
      />

      {/* MISSION & VISION */}
      <section>
        <div className="container">
          <div className="grid-2">
            <article className="mission-card">
              <span className="section-badge">Our Purpose</span>
              <h2>Our Mission</h2>
              <p>
                To produce inspiring success stories in technological innovations and high-growth
                startups that make young minds confident, freestanding, and financially viable while
                solving real societal challenges.
              </p>
            </article>
            <article className="mission-card vision">
              <span className="section-badge" style={{ color: '#d97706', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                Our Horizon
              </span>
              <h2>Our Vision</h2>
              <p>
                To nurture young innovators by providing a world-class platform to explore, build, and
                showcase their potential, generating high added value with an unwavering focus on
                sustainable technology transfer for industry and society.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CORE OBJECTIVES */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Strategic Goals"
            title="Institutional Objectives"
            subtitle="The foundational pillars that guide our daily operations, incubation curriculum, and grant disbursement processes."
          />
          <div className="objective-list">
            {objectives.map((x, i) => (
              <div className="objective-item" key={x}>
                <span>{i + 1}</span>
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 THRUST AREAS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Focus Domains"
            title="Key Thrust Areas"
            subtitle="GUIITAR Council prioritizes interdisciplinary research and startup incubation across 13 high-impact sectors."
          />
          <div className="thrust-grid">
            {thrust.map(([name, Icon]) => (
              <div className="thrust-item" key={name}>
                <div className="thrust-icon-box">
                  <Icon />
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP MESSAGES */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Guiding Vision"
            title="Message from Leadership"
            subtitle="Insights and encouragement from the visionary leaders steering GSFC University and GUIITAR Council."
          />
          <div className="grid-2">
            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Create an environment of excellence through innovation, for you will forever be
                remembered for your contribution to the world. Innovation is a journey in which you
                have to say no to thousands of things which already exist while boldly embracing the
                one which is yet to come.
              </p>
              <div className="leader-footer">
                <div className="avatar">PK</div>
                <div className="leader-info">
                  <h3>Shri P. K. Taneja, IAS (Retd.)</h3>
                  <p>President, GSFC University & Chairman, GUIITAR Council</p>
                </div>
              </div>
            </article>

            <article className="leader-card">
              <div className="leader-quote-mark">“</div>
              <p className="leader-quote">
                Innovation is not merely about repeating a textbook success story, but celebrating
                every iterative failure as a critical learning milestone. Pick-up and never give-up is
                the foundational attitude that turns students into resilient startup founders.
              </p>
              <div className="leader-footer">
                <div className="avatar">GR</div>
                <div className="leader-info">
                  <h3>Prof. G. R. Sinha</h3>
                  <p>Provost, GSFC University & CEO, GUIITAR Council</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GOVERNANCE & TEAM */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Leadership & Mentors"
            title="Meet Our Governance & Team"
            subtitle="The dedicated educators, industry mentors, and incubation managers driving student venture success."
          />

          <div className="tabs">
            {Object.keys(teams).map((tabName) => (
              <button
                key={tabName}
                className={`tab ${team === tabName ? 'active' : ''}`}
                onClick={() => {
                  setTeam(tabName);
                  setSlide(0);
                }}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className="team-wrap">
            <button
              aria-label="Previous team members"
              className="slide-btn"
              disabled={slide === 0}
              style={{ opacity: slide === 0 ? 0.3 : 1 }}
              onClick={() => setSlide(Math.max(0, slide - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="team-grid">
              {visible.map(([n, t, desc]) => (
                <article className="team-card" key={n}>
                  <div className="avatar">
                    {n
                      .split(' ')
                      .filter((x) => x.length > 2 && !x.includes('Dr.') && !x.includes('Mr.'))
                      .slice(0, 2)
                      .map((x) => x[0])
                      .join('') || 'GC'}
                  </div>
                  <h3>{n}</h3>
                  <p>{t}</p>
                  {desc && <span style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '16px' }}>{desc}</span>}
                  <div className="team-socials">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <button
              aria-label="Next team members"
              className="slide-btn"
              disabled={slide + pageSize >= members.length}
              style={{ opacity: slide + pageSize >= members.length ? 0.3 : 1 }}
              onClick={() => setSlide(Math.min(members.length - pageSize, slide + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* STATE OF THE ART INFRASTRUCTURE */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Prototyping & Labs"
            title="State-of-the-Art Infrastructure"
            subtitle="Explore our advanced research laboratories, fabrication workshops, and computing suites available for incubated startups."
          />
          <div className="grid-2">
            {infra.map((item) => (
              <article className="infra-card" key={item.name}>
                <div className={`infra-badge-cover ${item.tone}`}>
                  <item.icon />
                  <span>{item.name}</span>
                </div>
                <div className="infra-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="center spaced">
            <ButtonLink to="/contact" size="lg">
              <span>Request Lab Access / Book a Tour</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
