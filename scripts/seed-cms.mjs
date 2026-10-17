import fs from "fs";
import path from "path";
import pg from "pg";
const { Client } = pg;

let dbUrl = process.env.DATABASE_URL;
try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  if (!dbUrl) {
    const m = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (m) dbUrl = m[1];
  }
} catch {}

if (!dbUrl) {
  console.error("Error: DATABASE_URL not found.");
  process.exit(1);
}

// Full Initial Seed Content
const SITE_CONTENT_ITEMS = [
  // --- GLOBAL & SETTINGS ---
  {
    key: "global.settings.site_name",
    page: "global",
    section: "branding",
    label: "Site Name",
    type: "text",
    value: "GUIITAR Council",
    sort_order: 1,
  },
  {
    key: "global.settings.logo_light",
    page: "global",
    section: "branding",
    label: "Header Logo (Light Mode)",
    type: "image",
    value: "/guiitar-council-logo.png",
    sort_order: 2,
  },
  {
    key: "global.settings.logo_dark",
    page: "global",
    section: "branding",
    label: "Header Logo (Dark Mode)",
    type: "image",
    value: "/guiitar-council-logo.png",
    sort_order: 3,
  },
  {
    key: "global.settings.favicon",
    page: "global",
    section: "branding",
    label: "Favicon URL",
    type: "image",
    value: "/favicon.svg",
    sort_order: 4,
  },
  {
    key: "global.announcement.enabled",
    page: "global",
    section: "announcement",
    label: "Announcement Banner Visible",
    type: "boolean",
    value: false,
    sort_order: 5,
  },
  {
    key: "global.announcement.text",
    page: "global",
    section: "announcement",
    label: "Announcement Banner Text",
    type: "text",
    value: "Cohort 2026 Incubation applications are now live! Apply before deadlines.",
    sort_order: 6,
  },
  {
    key: "global.announcement.link",
    page: "global",
    section: "announcement",
    label: "Announcement Banner Link",
    type: "url",
    value: "/apply",
    sort_order: 7,
  },
  {
    key: "global.header.portal_badge",
    page: "global",
    section: "header",
    label: "Header Portal Badge Text",
    type: "text",
    value: "GSFC University Incubation Hub",
    sort_order: 8,
  },
  {
    key: "global.header.cta_label",
    page: "global",
    section: "header",
    label: "Header Nav CTA Label",
    type: "text",
    value: "Apply for Incubation",
    sort_order: 9,
  },
  {
    key: "global.header.cta_link",
    page: "global",
    section: "header",
    label: "Header Nav CTA Link",
    type: "url",
    value: "/apply",
    sort_order: 10,
  },
  {
    key: "global.footer.about_text",
    page: "global",
    section: "footer",
    label: "Footer Brand Description",
    type: "textarea",
    value: "Gujarat University Innovation and Incubation Technology Applied Research (GUIITAR) Council is founded by GSFC University in Vadodara, Gujarat. Empowering students, researchers, and startups to build enduring commercial enterprises.",
    sort_order: 11,
  },
  {
    key: "global.social.linkedin",
    page: "global",
    section: "footer",
    label: "LinkedIn URL",
    type: "url",
    value: "https://www.linkedin.com/company/guiitarcouncil/posts/?feedView=all",
    sort_order: 12,
  },
  {
    key: "global.social.twitter",
    page: "global",
    section: "footer",
    label: "Twitter / X URL",
    type: "url",
    value: "https://twitter.com",
    sort_order: 13,
  },
  {
    key: "global.social.instagram",
    page: "global",
    section: "footer",
    label: "Instagram URL",
    type: "url",
    value: "https://instagram.com",
    sort_order: 14,
  },
  {
    key: "global.footer.address",
    page: "global",
    section: "footer",
    label: "Incubation Office Address",
    type: "textarea",
    value: "Event Room, 2nd Floor, Anviksha Building, GSFC University Campus, Vigyan Bhavan, Fertilizernagar, Vadodara, Gujarat 391750, India",
    sort_order: 15,
  },
  {
    key: "global.footer.phone",
    page: "global",
    section: "footer",
    label: "Contact Phone Number",
    type: "text",
    value: "+91 (0265) 3093750",
    sort_order: 16,
  },
  {
    key: "global.footer.email",
    page: "global",
    section: "footer",
    label: "Contact Email Address",
    type: "text",
    value: "guiitar@gsfcuniversity.ac.in",
    sort_order: 17,
  },
  {
    key: "global.footer.copyright",
    page: "global",
    section: "footer",
    label: "Footer Copyright Line",
    type: "text",
    value: "© 2026 GUIITAR Council, GSFC University. All Rights Reserved.",
    sort_order: 18,
  },
  {
    key: "global.footer.developer_credit",
    page: "global",
    section: "footer",
    label: "Footer Developer Credit",
    type: "text",
    value: "DEVELOPED AND MANAGED BY OM THAKKAR",
    sort_order: 19,
  },

  // --- WELCOME MODAL ---
  {
    key: "modal.welcome.enabled",
    page: "modal",
    section: "welcome",
    label: "Show Welcome Popup on First Visit",
    type: "boolean",
    value: true,
    sort_order: 20,
  },
  {
    key: "modal.welcome.title",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Title",
    type: "text",
    value: "Welcome to GSFC University",
    sort_order: 21,
  },
  {
    key: "modal.welcome.subtitle",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Subtitle",
    type: "text",
    value: "GUIITAR Council",
    sort_order: 22,
  },
  {
    key: "modal.welcome.description",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Description",
    type: "textarea",
    value: "GU Incubation Innovation Technology and Applied Research Council — empowering student innovators, researchers, and startups from ideation to commercialization.",
    sort_order: 23,
  },
  {
    key: "modal.welcome.cta_primary_label",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Primary Button",
    type: "text",
    value: "Explore Incubation Programs",
    sort_order: 24,
  },
  {
    key: "modal.welcome.cta_primary_link",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Primary Link",
    type: "url",
    value: "/programs",
    sort_order: 25,
  },
  {
    key: "modal.welcome.cta_secondary_label",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Secondary Button",
    type: "text",
    value: "Apply for Cohort 2026",
    sort_order: 26,
  },
  {
    key: "modal.welcome.cta_secondary_link",
    page: "modal",
    section: "welcome",
    label: "Welcome Popup Secondary Link",
    type: "url",
    value: "/apply",
    sort_order: 27,
  },

  // --- HOME PAGE HERO ---
  {
    key: "home.seo.title",
    page: "home",
    section: "seo",
    label: "Home SEO Title",
    type: "text",
    value: "GUIITAR Council — Innovation, Incubation & Entrepreneurship | GSFC University",
    sort_order: 30,
  },
  {
    key: "home.seo.description",
    page: "home",
    section: "seo",
    label: "Home SEO Description",
    type: "textarea",
    value: "GUIITAR Council is GSFC University's premier Section 8 non-profit incubation hub. Empowering students, innovators, and deep-tech startups from Idea to Market Impact.",
    sort_order: 31,
  },
  {
    key: "home.hero.pill_badge",
    page: "home",
    section: "hero",
    label: "Hero Top Announcement Pill Badge",
    type: "text",
    value: "Cohort 2026 Incubation",
    sort_order: 32,
  },
  {
    key: "home.hero.pill_text",
    page: "home",
    section: "hero",
    label: "Hero Top Announcement Pill Text",
    type: "text",
    value: "Applications Open for Student & Regional Startups",
    sort_order: 33,
  },
  {
    key: "home.hero.pill_link",
    page: "home",
    section: "hero",
    label: "Hero Top Announcement Pill Link",
    type: "url",
    value: "/apply",
    sort_order: 34,
  },
  {
    key: "home.hero.title_prefix",
    page: "home",
    section: "hero",
    label: "Hero Main Heading (Prefix)",
    type: "text",
    value: "Where Ideas Become",
    sort_order: 35,
  },
  {
    key: "home.hero.title_gradient",
    page: "home",
    section: "hero",
    label: "Hero Main Heading (Highlighted)",
    type: "text",
    value: "Commercial Impact.",
    sort_order: 36,
  },
  {
    key: "home.hero.subtitle",
    page: "home",
    section: "hero",
    label: "Hero Subtitle",
    type: "textarea",
    value: "Empowering students, researchers, and early-stage founders with ₹30L+ non-dilutive grants, supercomputing lab facilities, and dedicated mentorship at GSFC University.",
    sort_order: 37,
  },
  {
    key: "home.hero.cta_primary_label",
    page: "home",
    section: "hero",
    label: "Hero Primary Button Text",
    type: "text",
    value: "Apply for Incubation",
    sort_order: 38,
  },
  {
    key: "home.hero.cta_primary_link",
    page: "home",
    section: "hero",
    label: "Hero Primary Button Link",
    type: "url",
    value: "/apply",
    sort_order: 39,
  },
  {
    key: "home.hero.cta_secondary_label",
    page: "home",
    section: "hero",
    label: "Hero Secondary Button Text",
    type: "text",
    value: "Explore Ecosystem",
    sort_order: 40,
  },
  {
    key: "home.hero.cta_secondary_link",
    page: "home",
    section: "hero",
    label: "Hero Secondary Button Link",
    type: "url",
    value: "/ecosystem",
    sort_order: 41,
  },
  {
    key: "home.hero.image",
    page: "home",
    section: "hero",
    label: "Hero Main Image",
    type: "image",
    value: "/__l5e/assets-v1/b22d7494-fc7c-456b-ae26-355ac6b7b971/home-hero.jpg",
    sort_order: 42,
  },
  {
    key: "home.hero.floating_tag_1",
    page: "home",
    section: "hero",
    label: "Hero Floating Badge 1",
    type: "text",
    value: "Param Shavak Supercomputer Powered",
    sort_order: 43,
  },
  {
    key: "home.hero.floating_tag_2",
    page: "home",
    section: "hero",
    label: "Hero Floating Badge 2",
    type: "text",
    value: "145+ Patents Filed",
    sort_order: 44,
  },

  // --- HOME JOURNEY ---
  {
    key: "home.journey.badge",
    page: "home",
    section: "journey",
    label: "Journey Section Badge",
    type: "text",
    value: "Structured Incubation Pipeline",
    sort_order: 50,
  },
  {
    key: "home.journey.title",
    page: "home",
    section: "journey",
    label: "Journey Section Title",
    type: "text",
    value: "From Ideation to Commercialization",
    sort_order: 51,
  },
  {
    key: "home.journey.subtitle",
    page: "home",
    section: "journey",
    label: "Journey Section Subtitle",
    type: "textarea",
    value: "A structured five-phase innovation pipeline designed to derisk technical development, secure intellectual property, and scale commercial ventures.",
    sort_order: 52,
  },

  // --- HOME LABS ---
  {
    key: "home.labs.badge",
    page: "home",
    section: "labs",
    label: "Labs Section Badge",
    type: "text",
    value: "Prototyping Labs",
    sort_order: 60,
  },
  {
    key: "home.labs.title",
    page: "home",
    section: "labs",
    label: "Labs Section Title",
    type: "text",
    value: "State-of-the-Art Prototyping Infrastructure",
    sort_order: 61,
  },
  {
    key: "home.labs.subtitle",
    page: "home",
    section: "labs",
    label: "Labs Section Subtitle",
    type: "textarea",
    value: "World-class technical proving grounds including supercomputing, drone flight avionics, and specialized maker spaces.",
    sort_order: 62,
  },
  {
    key: "home.labs.cta_label",
    page: "home",
    section: "labs",
    label: "Book Lab CTA Label",
    type: "text",
    value: "Book Prototyping Facility",
    sort_order: 63,
  },
  {
    key: "home.labs.cta_link",
    page: "home",
    section: "labs",
    label: "Book Lab CTA Link",
    type: "url",
    value: "https://forms.gle/EM81FwAN5i4S3FmcA",
    sort_order: 64,
  },

  // --- HOME IMPACT ---
  {
    key: "home.impact.badge",
    page: "home",
    section: "impact",
    label: "Impact Section Badge",
    type: "text",
    value: "Verified Track Record",
    sort_order: 70,
  },
  {
    key: "home.impact.title",
    page: "home",
    section: "impact",
    label: "Impact Section Title",
    type: "text",
    value: "Verified Milestone Achievements",
    sort_order: 71,
  },
  {
    key: "home.impact.subtitle",
    page: "home",
    section: "impact",
    label: "Impact Section Subtitle",
    type: "textarea",
    value: "Quantitative evidence of institutional innovation output across cohorts.",
    sort_order: 72,
  },
  {
    key: "home.impact.image",
    page: "home",
    section: "impact",
    label: "Impact Diagram Image",
    type: "image",
    value: "/__l5e/assets-v1/fa936a28-98e6-4d51-86a1-9ea6b567b45f/impact.png",
    sort_order: 73,
  },

  // --- HOME LEADERSHIP ---
  {
    key: "home.leadership.badge",
    page: "home",
    section: "leadership",
    label: "Leadership Section Badge",
    type: "text",
    value: "Institutional Leadership",
    sort_order: 80,
  },
  {
    key: "home.leadership.title",
    page: "home",
    section: "leadership",
    label: "Leadership Section Title",
    type: "text",
    value: "Guiding the Next Wave of Indian Innovators",
    sort_order: 81,
  },
  {
    key: "home.leadership.subtitle",
    page: "home",
    section: "leadership",
    label: "Leadership Section Subtitle",
    type: "textarea",
    value: "Messages from university leadership committed to nurturing a culture of applied science and entrepreneurship.",
    sort_order: 82,
  },
  {
    key: "home.leadership.provost_quote",
    page: "home",
    section: "leadership",
    label: "Provost Message Quote",
    type: "textarea",
    value: "Our mission at GUIITAR Council is to transform theoretical inquiry into tangible intellectual property and commercially viable solutions for industrial challenges.",
    sort_order: 83,
  },
  {
    key: "home.leadership.provost_name",
    page: "home",
    section: "leadership",
    label: "Provost Name",
    type: "text",
    value: "Prof. G. R. Sinha",
    sort_order: 84,
  },
  {
    key: "home.leadership.provost_title",
    page: "home",
    section: "leadership",
    label: "Provost Designation",
    type: "text",
    value: "Provost, GSFC University & CEO, GUIITAR Council",
    sort_order: 85,
  },
  {
    key: "home.leadership.provost_image",
    page: "home",
    section: "leadership",
    label: "Provost Photo",
    type: "image",
    value: "/leaders/gr-sinha.png",
    sort_order: 86,
  },
  {
    key: "home.leadership.chairman_quote",
    page: "home",
    section: "leadership",
    label: "Chairman Message Quote",
    type: "textarea",
    value: "By bridging GSFC Limited's chemical manufacturing heritage with student innovation, we are laying the groundwork for Gujarat's premier deep-tech cluster.",
    sort_order: 87,
  },
  {
    key: "home.leadership.chairman_name",
    page: "home",
    section: "leadership",
    label: "Chairman Name",
    type: "text",
    value: "Shri P. K. Taneja, IAS (Retd.)",
    sort_order: 88,
  },
  {
    key: "home.leadership.chairman_title",
    page: "home",
    section: "leadership",
    label: "Chairman Designation",
    type: "text",
    value: "President, GSFC University & Chairman, GUIITAR Council",
    sort_order: 89,
  },
  {
    key: "home.leadership.chairman_image",
    page: "home",
    section: "leadership",
    label: "Chairman Photo",
    type: "image",
    value: "/leaders/pk-taneja.png",
    sort_order: 90,
  },

  // --- HOME BOTTOM CTA ---
  {
    key: "home.cta.title",
    page: "home",
    section: "cta",
    label: "Home Bottom CTA Heading",
    type: "text",
    value: "Ready to Build Your Venture at GUIITAR Council?",
    sort_order: 100,
  },
  {
    key: "home.cta.subtitle",
    page: "home",
    section: "cta",
    label: "Home Bottom CTA Subtitle",
    type: "textarea",
    value: "Whether you have an early napkin idea, laboratory research proof, or a working prototype, our incubation suites and funding grants are open to you.",
    sort_order: 101,
  },
  {
    key: "home.cta.button_text",
    page: "home",
    section: "cta",
    label: "Home Bottom CTA Button Text",
    type: "text",
    value: "Submit Your Innovation",
    sort_order: 102,
  },
  {
    key: "home.cta.button_link",
    page: "home",
    section: "cta",
    label: "Home Bottom CTA Button Link",
    type: "url",
    value: "/apply",
    sort_order: 103,
  },
];

// Content Lists Items (repeatable arrays)
const CONTENT_LIST_ITEMS = [
  // 1. Home Verified Metrics
  {
    list_key: "home.metrics.list",
    id: "metric-mentored",
    sort_order: 1,
    data: {
      value: "1800+",
      number: 1800,
      suffix: "+",
      label: "Students / Startups Mentored",
      sublabel: "Across multiple engineering & science cohorts",
    },
  },
  {
    list_key: "home.metrics.list",
    id: "metric-incubated",
    sort_order: 2,
    data: {
      value: "83+",
      number: 83,
      suffix: "+",
      label: "Students / Startups Incubated",
      sublabel: "From PoC to market-ready enterprises",
    },
  },
  {
    list_key: "home.metrics.list",
    id: "metric-ipr",
    sort_order: 3,
    data: {
      value: "145+",
      number: 145,
      suffix: "+",
      label: "IPR & Patents Filed",
      sublabel: "National & international patent protections",
    },
  },
  {
    list_key: "home.metrics.list",
    id: "metric-funding",
    sort_order: 4,
    data: {
      value: "₹30L+",
      number: 30,
      suffix: "L+",
      label: "Direct Funding Support",
      sublabel: "Non-dilutive grants sanctioned & disbursed",
    },
  },
  {
    list_key: "home.metrics.list",
    id: "metric-events",
    sort_order: 5,
    data: {
      value: "115+",
      number: 115,
      suffix: "+",
      label: "Events & Workshops",
      sublabel: "Hackathons, masterclasses & bootcamps",
    },
  },
  {
    list_key: "home.metrics.list",
    id: "metric-sensitized",
    sort_order: 6,
    data: {
      value: "13000+",
      number: 13000,
      suffix: "+",
      label: "Students Sensitized",
      sublabel: "In innovation, IPR & entrepreneurship",
    },
  },

  // 2. Innovation Journey Stages
  {
    list_key: "home.journey.stages",
    id: "stage-ideate",
    sort_order: 1,
    data: {
      id: "ideate",
      step: "01",
      name: "IDEATE",
      headline: "Sparking Novel Concepts from Curiosity",
      whatHappens: "Students, researchers, and early founders identify critical technological and industrial challenges, formulating initial project hypotheses.",
      supportProvided: [
        "Access to E-Club brainstorm circles & ideation clinics",
        "Design Thinking & Problem Validation masterclasses",
        "Guidance from Faculty Research Guides & Domain Specialists",
      ],
      eligible: "School (9-12), Diploma, UG, PG, PhD students, alumni & independent innovators up to 35 years.",
      programs: ["E-Club Student Wing", "SSIP 2.0 Ideathon", "Innovation Hackathons"],
      resources: "Ideation Canvas & Problem Statement Briefs",
      ctaText: "Submit Your Idea",
      ctaLink: "/apply",
    },
  },
  {
    list_key: "home.journey.stages",
    id: "stage-validate",
    sort_order: 2,
    data: {
      id: "validate",
      step: "02",
      name: "VALIDATE",
      headline: "Rigorous Technical & Commercial Feasibility",
      whatHappens: "Testing assumptions, establishing proof-of-concept (PoC), and evaluating market feasibility alongside faculty and industry practitioners.",
      supportProvided: [
        "Technical feasibility reviews by Institutional Screening Committee (ISC)",
        "Customer discovery guidance and preliminary unit economics",
        "Assistance with component sourcing & fabrication planning",
      ],
      eligible: "Innovators with validated problem statement and early bench-scale prototypes.",
      programs: ["Proof of Concept Sprint", "Industry Problem-Solving Hackathons"],
      resources: "PoC Evaluation Rubric & Bill of Materials (BOM) Sheet",
      ctaText: "Apply for PoC Grant",
      ctaLink: "/apply",
    },
  },
  {
    list_key: "home.journey.stages",
    id: "stage-protect",
    sort_order: 3,
    data: {
      id: "protect",
      step: "03",
      name: "PROTECT",
      headline: "Safeguarding Breakthrough Intellectual Assets",
      whatHappens: "Comprehensive patent search, prior-art scrutiny, and legal drafting facilitated by accredited patent attorneys.",
      supportProvided: [
        "100% legal attorney fees covered for patent drafting & FER responses",
        "Prior-art search reports using international patent databases",
        "Copyright and design registration filing assistance",
      ],
      eligible: "Novel engineering mechanisms, chemical formulations, code architectures, or industrial designs.",
      programs: ["IPR Facilitation Clinic", "Patent Drafting Workshop"],
      resources: "Invention Disclosure Form (IDF) & Patentability Checklist",
      ctaText: "File Your Patent",
      ctaLink: "/ipr",
    },
  },
  {
    list_key: "home.journey.stages",
    id: "stage-incubate",
    sort_order: 4,
    data: {
      id: "incubate",
      step: "04",
      name: "INCUBATE",
      headline: "From Campus Prototype to Legal Enterprise",
      whatHappens: "Formal incorporation, coworking desk allocation, seed capital sanction, and hands-on founder mentorship.",
      supportProvided: [
        "Physical plug-and-play coworking desks & meeting rooms at Anviksha Hub",
        "Company incorporation (Private Limited / LLP) & DPIIT startup recognition",
        "Up to ₹2.50 Lakhs SSIP 2.0 grant & up to ₹30 Lakhs Nodal Institute seed support",
      ],
      eligible: "Registered or incorporating entities with demonstrable MVP and committed founders.",
      programs: ["GUIITAR Incubation Cohort 2026", "Nodal Institute Support Scheme"],
      resources: "Incubation Agreement, Mentor-Mentee Charter & KPI Scorecard",
      ctaText: "Join Incubation Cohort",
      ctaLink: "/apply",
    },
  },
  {
    list_key: "home.journey.stages",
    id: "stage-scale",
    sort_order: 5,
    data: {
      id: "scale",
      step: "05",
      name: "SCALE",
      headline: "Commercial Deployment & Institutional Traction",
      whatHappens: "Industrial proving trials with GSFC Limited, investor syndicate pitching, and enterprise customer acquisition.",
      supportProvided: [
        "Proving ground access across GSFC Ltd fertilizer and chemical plants",
        "Investor demo days connecting with Gujarat Venture Finance Ltd (GVFL) & angel networks",
        "Export and compliance facilitation for overseas commercialization",
      ],
      eligible: "Post-revenue startups, licensed IP holders, and venture-backed cohorts.",
      programs: ["Venture Scale Accelerator", "Corporate Pilot Proving Track"],
      resources: "Investor Pitch Deck Template & Financial Modeling Suite",
      ctaText: "Explore Scaling Support",
      ctaLink: "/partner",
    },
  },

  // 3. Welcome Modal Highlights
  {
    list_key: "modal.welcome.cards",
    id: "modal-card-grants",
    sort_order: 1,
    data: {
      icon: "Lightbulb",
      title: "SSIP & Grants",
      desc: "Up to ₹2.5 Lakh non-dilutive grant",
      badge: "Govt. Supported",
    },
  },
  {
    list_key: "modal.welcome.cards",
    id: "modal-card-incubation",
    sort_order: 2,
    data: {
      icon: "Rocket",
      title: "Incubation Hub",
      desc: "Coworking suites & maker spaces",
      badge: "83+ Startups",
    },
  },
  {
    list_key: "modal.welcome.cards",
    id: "modal-card-ipr",
    sort_order: 3,
    data: {
      icon: "ShieldCheck",
      title: "IPR Support",
      desc: "100% patent drafting & fee subsidy",
      badge: "145+ Filed",
    },
  },

  // 4. Programs Support Section Cards
  {
    list_key: "shared.programs_support.cards",
    id: "program-ssip",
    sort_order: 1,
    data: {
      id: "ssip",
      title: "SSIP (Student Start-up & Innovation Policy)",
      badge: "Govt. of Gujarat Initiative",
      description: "Financial assistance and mentorship for student innovators, diploma, UG, PG, PhD scholars, and recent alumni to build functional proof-of-concepts.",
      features: [
        "Up to ₹2.5 Lakhs non-dilutive grant per innovative project",
        "Prototyping support, raw material procurement & lab access",
        "Pre-incubation guidance from faculty & industry mentors",
      ],
      ctaText: "Explore SSIP Support",
      ctaLink: "/ssip",
      accentColor: "blue",
    },
  },
  {
    list_key: "shared.programs_support.cards",
    id: "program-ipr",
    sort_order: 2,
    data: {
      id: "ipr",
      title: "IPR Centre",
      badge: "Intellectual Property Cell",
      description: "End-to-end facilitation for patent drafting, prior-art searches, trademark registrations, and intellectual property rights protection for research breakthroughs.",
      features: [
        "Reimbursement up to ₹1.5 Lakhs per domestic patent filing",
        "Assistance with patent attorneys and legal documentation",
        "Copyright, design registration, and commercial licensing",
      ],
      ctaText: "Explore IPR Support",
      ctaLink: "/ipr",
      accentColor: "orange",
    },
  },
  {
    list_key: "shared.programs_support.cards",
    id: "program-nodal",
    sort_order: 3,
    data: {
      id: "nodal",
      title: "Nodal Institute",
      badge: "Startup Gujarat Recognized",
      description: "Official institutional gateway under the Industries Commissionerate, Government of Gujarat, providing scale-up seed funding and operational support for registered startups.",
      features: [
        "Sustenance allowance & seed funding assistance up to ₹30 Lakhs",
        "Institutional validation & market access opportunities",
        "Plug-and-play coworking infrastructure and pilot deployment",
      ],
      ctaText: "Explore Nodal Institute",
      ctaLink: "/nodal-institute",
      accentColor: "emerald",
    },
  },
];

async function seed() {
  console.log("=== Seeding Initial CMS Content into Supabase ===");

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  console.log(`Seeding ${SITE_CONTENT_ITEMS.length} site_content entries...`);
  for (const item of SITE_CONTENT_ITEMS) {
    const query = `
      INSERT INTO site_content (key, page, section, label, type, value, default_value, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (key) DO UPDATE SET
        default_value = EXCLUDED.default_value,
        page = EXCLUDED.page,
        section = EXCLUDED.section,
        label = EXCLUDED.label,
        type = EXCLUDED.type
    `;
    await client.query(query, [
      item.key,
      item.page,
      item.section,
      item.label,
      item.type,
      JSON.stringify(item.value),
      JSON.stringify(item.value),
      item.sort_order,
    ]);
  }
  console.log("✓ site_content seeded successfully.");

  console.log(`Seeding ${CONTENT_LIST_ITEMS.length} content_lists entries...`);
  for (const item of CONTENT_LIST_ITEMS) {
    const query = `
      INSERT INTO content_lists (id, list_key, data, sort_order, is_visible)
      VALUES ($1, $2, $3, $4, true)
      ON CONFLICT (id) DO UPDATE SET
        list_key = EXCLUDED.list_key
    `;
    await client.query(query, [
      item.id,
      item.list_key,
      JSON.stringify(item.data),
      item.sort_order,
    ]);
  }
  console.log("✓ content_lists seeded successfully.");

  // Also verify user_roles has admin entry
  try {
    const userRes = await client.query(`SELECT id FROM auth.users WHERE email = 'admin@guiitar.org' LIMIT 1`);
    if (userRes.rows.length > 0) {
      const userId = userRes.rows[0].id;
      await client.query(`
        INSERT INTO user_roles (user_id, role, assigned_by)
        VALUES ($1, 'Super Admin', 'System Seed')
        ON CONFLICT (user_id) DO UPDATE SET role = 'Super Admin'
      `, [userId]);
      console.log("✓ Super Admin role mapped to admin@guiitar.org.");
    }
  } catch (err) {
    console.warn("User roles seed notice:", err.message);
  }

  await client.end();
  console.log("=== CMS Seeding completed successfully ===");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
