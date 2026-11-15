import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Meet the official leadership, core incubation team, technical associates, lab managers, and academic mentors driving GUIITAR Council at GSFC University.",
      },
      { property: "og:title", content: "Our Team — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Official governance, operations, lab engineering, and departmental faculty leadership.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

interface TeamMember {
  name: string;
  designation: string;
  role: string;
  category: "Leadership" | "Core Team" | "Technical Associates" | "Academic Mentors" | "GUIITAR Committee (GUSC)";
  department?: string;
  bio: string;
  responsibilities: string[];
  image?: string;
  document?: string;
}

const BOARD_MEMBERS: TeamMember[] = [
  {
    name: "Shri P. K. Taneja, IAS (Retd.)",
    designation: "President, GSFC University & Chairman, GUIITAR Council",
    role: "Chairman",
    category: "Leadership",
    department: "Governance & Strategic Direction",
    bio: "Former Additional Chief Secretary (Home / Forest & Environment), Government of Gujarat. Providing high-level institutional stewardship and policy guidance.",
    responsibilities: [
      "Strategic governance and state innovation policy alignment",
      "Institutional linkages with Government of Gujarat and industrial PSUs",
      "Executive Council and Board oversight",
    ],
    image: "/leaders/pk-taneja.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-01.pdf",
  },
  {
    name: "Prof. G. R. Sinha",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    role: "CEO & Director",
    category: "Leadership",
    department: "Executive Management & Research",
    bio: "Distinguished Academician, IEEE Senior Member, and global researcher with 25+ years in engineering leadership and technology incubation.",
    responsibilities: [
      "Overall executive leadership of GUIITAR Council",
      "Research commercialization, IP oversight, and academic alignment",
      "Institutional review of advanced prototyping and deep-tech initiatives",
    ],
    image: "/images/original/leadership/provost-gr-sinha.jpg",
    document: "/mentors/Board of Directors/documents/industry-mentor-02.pdf",
  },
  {
    name: "Shri Mahesh Barot",
    designation: "Director, GUIITAR Council",
    role: "Board Director",
    category: "Leadership",
    department: "Board of Directors",
    bio: "Corporate director providing high-level organizational leadership and strategic governance for GUIITAR Council.",
    responsibilities: [
      "Board governance and strategic oversight",
      "Institutional policy steering and resource mobilization",
      "Executive review of council initiatives",
    ],
    image: "/images/original/board/mahesh-barot.png",
  },
  {
    name: "Shri Utkarsh Yajnik",
    designation: "Director, GUIITAR Council",
    role: "Board Director",
    category: "Leadership",
    department: "Board of Directors",
    bio: "Experienced corporate executive and board director steering strategy, enterprise scaling, and organizational governance.",
    responsibilities: [
      "Board-level strategic planning and compliance",
      "Corporate venture capital network building",
      "Advisory on enterprise risk and sustainability",
    ],
    image: "/images/original/board/utkarsh-yajnik.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-03.pdf",
  },
  {
    name: "Ms. Swati Bedekar",
    designation: "Director, GUIITAR Council",
    role: "Board Director",
    category: "Leadership",
    department: "Board of Directors",
    bio: "Renowned social entrepreneur and innovation advocate advancing regional innovation ecosystems and women-led entrepreneurship.",
    responsibilities: [
      "Social innovation strategy and inclusive entrepreneurship",
      "Community grassroots problem-solving initiatives",
      "Ecosystem partnership oversight",
    ],
    image: "/images/original/board/swati-bedekar.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-04.pdf",
  },
  {
    name: "Dr. Pujan Vaishnav",
    designation: "Director, GUIITAR Council",
    role: "Board Director",
    category: "Leadership",
    department: "Board of Directors",
    bio: "Academic and technology leader advising on curriculum-integrated entrepreneurship, R&D labs, and incubation metrics.",
    responsibilities: [
      "Academic-industry translational research",
      "Incubation governance and curriculum interface",
      "Student innovation tracking",
    ],
    image: "/images/original/board/pujan-patel.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-05.pdf",
  },
  {
    name: "Mr. Anupam Jalote",
    designation: "Director, GUIITAR Council & CEO, iCEM",
    role: "Board Director",
    category: "Leadership",
    department: "Industry & Centre of Excellence",
    bio: "Chief Executive Officer at International Centre of Excellence in Mining (iCEM), leading international industrial partnerships and technology scaling.",
    responsibilities: [
      "Heavy industry, mining, and clean-tech pilot linkages",
      "International centre of excellence collaboration",
      "Venture scaling advisory",
    ],
    image: "/images/original/board/anupam-jalote.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-06.pdf",
  },
  {
    name: "Shri Ravin Sanghavi",
    designation: "Director, GUIITAR Council",
    role: "Board Director",
    category: "Leadership",
    department: "Venture Finance & Legal",
    bio: "Entrepreneur, investor, and legal advisory specialist with deep expertise in angel networks, startup compliance, and corporate structuring.",
    responsibilities: [
      "Angel investment network integration",
      "Legal structuring and shareholder agreements",
      "Startup valuation and seed financing reviews",
    ],
    image: "/images/original/board/ravin-sanghavi.png",
    document: "/mentors/Board of Directors/documents/industry-mentor-07.pdf",
  },
];

const CORE_TEAM: TeamMember[] = [
  {
    name: "Mr. Kirankumar Parmar",
    designation: "Senior Manager (Incubation)",
    role: "Senior Manager",
    category: "Core Team",
    department: "Incubation Operations & Administration",
    bio: "Over 12 years of hands-on expertise managing university business incubators, SSIP 2.0 grant governance, Nodal Institute state reporting, and startup cohorts.",
    responsibilities: [
      "Day-to-day administrative and operational management of GUIITAR Council",
      "SSIP 2.0 grant evaluation, disbursement, and audit compliance",
      "Incubatee onboarding, milestone reviews, and graduation monitoring",
      "Liaison with Gujarat Knowledge Society (GKS) and Industries Commissionerate",
    ],
    image: "/images/original/team/kirankumar-parmar.jpg",
  },
  {
    name: "Mr. Bhuvan Vyas",
    designation: "Manager, Incubation (Ecosystem & Linkages)",
    role: "Manager",
    category: "Core Team",
    department: "Corporate Linkages & Mentor Network",
    bio: "Leading industrial partnerships, CSR grants, startup investor demo days, and collaborative MOUs across state and national innovation agencies.",
    responsibilities: [
      "Corporate alliances, pilot deployments, and MSME linkages",
      "Industry mentor roster management and founder office-hours",
      "Investor demo day orchestration and venture acceleration",
      "Outreach for international and inter-institutional partnerships",
    ],
    image: "/images/original/team/bhuvan-vyas.jpeg",
  },
  {
    name: "Mr. Amit Duggal",
    designation: "Senior Executive (Technical)",
    role: "Senior Executive",
    category: "Core Team",
    department: "Prototyping Laboratories & Tech Infrastructure",
    bio: "Technical lead overseeing Makers Lab fabrication, 3D printing slicing suites, laser cutter operations, hardware testing rigs, and drone mechanics.",
    responsibilities: [
      "Makers Lab, Tinkering Lab, and Drone Lab workbench operations",
      "Equipment maintenance, material sourcing, and user safety protocols",
      "Hands-on hardware troubleshooting for student prototype teams",
      "Coordination of pay-as-you-go prototyping facility access",
    ],
    image: "/images/original/team/amit-duggal.jpeg",
  },
];

const TECHNICAL_ASSOCIATES: TeamMember[] = [
  {
    name: "Mr. Krishay Shah",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "IoT, Embedded Systems & Hardware",
    bio: "Assisting student innovators and incubated ventures with circuit schematics, microcontroller programming, sensor interfacing, and hardware debugging.",
    responsibilities: [
      "Design & IoT Tinkering Lab bench assistance",
      "Embedded C / Arduino / ESP32 firmware troubleshooting",
      "Sensor calibration and telemetry circuit validation",
    ],
    image: "/images/original/team/krishay-shah.jpeg",
  },
  {
    name: "Ms. Lavanya Jain",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "Rapid Prototyping & CAD Modeling",
    bio: "Guiding innovators through 3D CAD modeling, generative design, slicer parameter optimization, and SLA/FDM 3D printer calibration.",
    responsibilities: [
      "Makers Lab 3D printer operations and slicing assistance",
      "CAD file evaluation and tolerance checks for rapid prototyping",
      "Post-processing of resin and filament fabricated parts",
    ],
    image: "/images/original/team/lavanya-jain.jpg",
  },
  {
    name: "Mr. Tirth Darji",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "Prototyping & Fabrication",
    bio: "Supporting student hardware builds, precision laser cutting, CNC profiling, and mechanical assembly of proof-of-concept units.",
    responsibilities: [
      "Laser cutting toolpath configuration and material testing",
      "Mechanical assembly and workshop tool operations",
      "Prototype safety compliance and workshop inventory",
    ],
    image: "/images/original/team/tirth-darji.jpeg",
  },
  {
    name: "Mr. Dev Patel",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "Computing & Software Systems",
    bio: "Assisting teams with software prototype deployment, cloud testing environments, compute workflows, and technical portal support.",
    responsibilities: [
      "Compute cluster setup and software development tools",
      "Database and server assistance for software MVPs",
      "Student innovation tracking portal support",
    ],
    image: "/images/original/team/dev-patel.jpeg",
  },
  {
    name: "Ms. Chaitali Karpe",
    designation: "Lab Assistant",
    role: "Lab Assistant",
    category: "Technical Associates",
    department: "Science Laboratories & Wet Labs",
    bio: "Managing analytical instruments, chemical reagents, biological testing setups, and safety adherence across science lab benches.",
    responsibilities: [
      "Science and chemical laboratory instrumentation support",
      "Material handling and chemical safety documentation",
      "Assistance for biotech and environmental startup experiments",
    ],
    image: "/images/original/team/chaitali-karpe.jpeg",
  },
  {
    name: "Ms. Nishita Navlani",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "Documentation & Incubation Coordination",
    bio: "Coordinating technical documentation, application screening files, grant milestone records, and founder communication.",
    responsibilities: [
      "Technical project documentation and milestone archiving",
      "Screening committee presentation support",
      "Incubatee monthly progress report collection",
    ],
    image: "/images/original/team/nishita-navlani.jpeg",
  },
  {
    name: "Ms. Priyanshi Vankar",
    designation: "Technical Associate",
    role: "Technical Associate",
    category: "Technical Associates",
    department: "IPR & Project Facilitation",
    bio: "Facilitating preliminary prior-art search records, Invention Disclosure Form (IDF) intake, and IPR Centre documentation.",
    responsibilities: [
      "IDF intake coordination and patent file organization",
      "IPR awareness workshop scheduling and student support",
      "Follow-ups with empaneled patent attorneys",
    ],
    image: "/images/original/team/priyanshi-vankar.jpeg",
  },
];

const ACADEMIC_MENTORS: TeamMember[] = [
  {
    name: "Dr. Chandra Has",
    designation: "Assistant Professor, Mechanical Engineering",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Technology (SoT)",
    bio: "Expert in finite element analysis, additive manufacturing, CAD/CAM, and mechanical rapid prototyping.",
    responsibilities: ["Mechanical design validation", "Rapid prototyping mentorship", "Materials selection"],
    image: "/images/original/team/chandra-has.jpg",
  },
  {
    name: "Mr. Abidhusain Lodha",
    designation: "Assistant Professor, Robotics & Automation",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Technology (SoT)",
    bio: "Specialist in unmanned aerial vehicles (UAVs), multi-rotor flight mechanics, ROS, and autonomous robotics.",
    responsibilities: ["Drone Lab guidance", "Flight avionics programming", "Robotics PoC evaluation"],
    image: "/images/original/team/abidhusain-lodha.jpg",
  },
  {
    name: "Dr. Mihir Trivedi",
    designation: "Assistant Professor, Computer Science & Engineering",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Technology (SoT)",
    bio: "Specializing in high-performance computing, GPU parallelism, distributed AI, and deep learning architectures.",
    responsibilities: ["Param Shavak Supercomputer workflows", "AI/ML algorithm optimization", "Computer vision"],
    image: "/images/original/team/mihir-trivedi.jpg",
  },
  {
    name: "Dr. Akhilesh Prajapati",
    designation: "Associate Professor, Chemical Engineering",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Technology (SoT)",
    bio: "14+ years in chemical reaction engineering, industrial polymer chemistry, and industrial process scale-up.",
    responsibilities: ["Chemical process scale-up", "Industrial safety compliance", "Clean-tech validation"],
    image: "/images/original/team/akhilesh-prajapati.jpg",
  },
  {
    name: "Ms. Charmi Mehta",
    designation: "Assistant Professor, Applied Sciences",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Science (SoS)",
    bio: "Guiding fundamental research documentation, scientific methodology, and interdisciplinary student ventures.",
    responsibilities: ["Applied sciences research documentation", "Student cohort guidance", "Scientific validation"],
    image: "/images/original/team/charmi-mehta.jpg",
  },
  {
    name: "Dr. Rahul Sharma",
    designation: "Sr. Assistant Professor, Management",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Management & Enterprise (SoM&E)",
    bio: "Specializing in business model canvas design, venture unit economics, pricing strategies, and tech commercialization.",
    responsibilities: ["Business model validation", "Unit economics analysis", "Investor pitch preparation"],
    image: "/images/original/team/rahul-sharma.jpeg",
  },
  {
    name: "Dr. Jignesh Valand",
    designation: "Assistant Professor, Biotechnology",
    role: "Faculty Mentor",
    category: "Academic Mentors",
    department: "School of Science (SoS)",
    bio: "Research mentor for bio-pigments, microbial fermentation, phytopharmaceutical formulations, and green chemistry.",
    responsibilities: ["Biotech venture screening", "Microbial process optimization", "Bio-safety advisory"],
    image: "/images/original/team/jignesh-valand.jpg",
  },
  {
    name: "Mr. Anup Upadhyay",
    designation: "Lab Assistant, Workshop",
    role: "Workshop Assistant",
    category: "Academic Mentors",
    department: "School of Technology (SoT)",
    bio: "Hands-on machinist and workshop specialist assisting student fabrication, lathe turning, welding, and structural tooling.",
    responsibilities: ["Machine shop tooling", "Welding & structural fabrication", "Safety gear compliance"],
    image: "/images/original/team/anup-upadhyay.jpg",
  },
  {
    name: "Mr. Hemant M Rajput",
    designation: "IT Coordinator",
    role: "IT Coordinator",
    category: "Academic Mentors",
    department: "GSFC University Central Computing",
    bio: "Managing high-speed fiber campus networking, server virtualization, lab compute racks, and portal security.",
    responsibilities: ["Computing lab networking", "Server availability", "Access control management"],
    image: "/images/original/team/hemant-rajpoot.jpg",
  },
];

const GUSC_MEMBERS: TeamMember[] = [
  {
    name: "Prof. G. R. Sinha",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    role: "Chairperson",
    category: "GUIITAR Committee (GUSC)",
    department: "GSFC University Start-up Committee",
    bio: "Head of the apex institutional startup committee constituted under Office Order No. Provost/092025/142.",
    responsibilities: [
      "Apex approval of student/faculty incubation applications",
      "Sanctioning of prototype grant disbursements (up to ₹2.5 Lakhs)",
      "Institutional policy liaison with State Nodal Agencies and DST",
    ],
    image: "/images/original/leadership/provost-gr-sinha.jpg",
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Mr. KiranKumar Parmar",
    designation: "Senior Manager (Incubation) & SSIP Coordinator",
    role: "Member Secretary",
    category: "GUIITAR Committee (GUSC)",
    department: "GUIITAR Council Operations",
    bio: "Executive coordinator managing startup scrutiny, grant disbursements, institutional reporting, and quarterly compliance.",
    responsibilities: [
      "Convening GUSC evaluation and screening committee sessions",
      "Documentation of PoC scrutiny and patent disclosure filings",
      "Quarterly compliance reporting to State Innovation Bodies",
    ],
    image: "/images/original/team/kirankumar-parmar.jpg",
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "VP (Research & Development), GSFC Ltd",
    designation: "Vice President (R&D), GSFC Limited",
    role: "External Industry Member",
    category: "GUIITAR Committee (GUSC)",
    department: "Fertilizernagar Corporate R&D",
    bio: "Senior corporate chemical industry leader providing industrial prior-art validation and scale-up mentorship.",
    responsibilities: [
      "Industrial feasibility and pilot testing proving bed linkage",
      "Corporate R&D synergy and green chemical scale-up advisory",
      "Technology transfer and industrial proof-of-concept evaluation",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dean, School of Technology (SoT)",
    designation: "Dean, Engineering & Applied Sciences",
    role: "Institutional Member",
    category: "GUIITAR Committee (GUSC)",
    department: "School of Technology",
    bio: "Overseeing engineering prototype laboratories, Maker Lab integration, and student hardware feasibility.",
    responsibilities: [
      "Engineering prototype scrutiny and safety clearances",
      "Allocation of advanced prototyping facilities and machine shop hours",
      "Interdisciplinary engineering student project coordination",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dean, School of Science (SoS)",
    designation: "Dean, Basic & Applied Sciences",
    role: "Institutional Member",
    category: "GUIITAR Committee (GUSC)",
    department: "School of Science",
    bio: "Supervising biotechnology, chemistry, and environmental science laboratory research and biosafety compliance.",
    responsibilities: [
      "Biological and chemical safety protocol review",
      "Wet-lab incubation and microbial assay verification",
      "Scientific research due diligence for grant sanctions",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dean, School of Management & Enterprise (SoM&E)",
    designation: "Dean, Business & Entrepreneurship",
    role: "Institutional Member",
    category: "GUIITAR Committee (GUSC)",
    department: "School of Management & Enterprise",
    bio: "Guiding venture business models, financial viability, unit economics, and market go-to-market strategies.",
    responsibilities: [
      "Business Model Canvas and pricing viability assessment",
      "Financial projection scrutiny and market size estimation",
      "Investor pitch preparation and entrepreneurship club integration",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dr. Akhilesh Prajapati",
    designation: "Associate Professor, Chemical Engineering",
    role: "Technical Evaluator",
    category: "GUIITAR Committee (GUSC)",
    department: "Department of Chemical Engineering",
    bio: "Senior chemical engineering researcher evaluating process scale-up, reaction engineering, and sustainable materials.",
    responsibilities: [
      "Chemical process safety and mass-balance evaluation",
      "Prototyping milestone verification for grant tranche release",
      "Technical mentorship in sustainable polymers and resins",
    ],
    image: "/team/akhilesh-prajapati.png",
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dr. Mihir Trivedi",
    designation: "Sr. Assistant Professor, Computer Science",
    role: "AI & Computing Domain Lead",
    category: "GUIITAR Committee (GUSC)",
    department: "Department of Computer Science & Eng.",
    bio: "Supercomputing lead managing Param Shavak DL resources, edge computing, AI algorithms, and software validation.",
    responsibilities: [
      "High-performance computing compute allocation scrutiny",
      "Software code architecture and machine learning model validation",
      "Cybersecurity and data protection compliance",
    ],
    image: "/team/mihir-trivedi.png",
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "Dr. Bhoomi Shah",
    designation: "Assistant Professor & IPR Lead",
    role: "IPR Scrutiny Lead",
    category: "GUIITAR Committee (GUSC)",
    department: "Intellectual Property Rights (IPR) Centre",
    bio: "Patent search specialist evaluating invention disclosures, prior-art searches, design registrations, and copyright filing.",
    responsibilities: [
      "Prior-art search review and patentability assessment",
      "Invention Disclosure Form (IDF) scrutiny under GUIITAR IPR Policy",
      "Sanctioning of IPR patent filing grants (up to ₹1.0 Lakh)",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
  {
    name: "President & Secretary, Student Innovation Society (E-Club)",
    designation: "Student Representatives",
    role: "Student Innovator Voice",
    category: "GUIITAR Committee (GUSC)",
    department: "Entrepreneurship Club (E-Club)",
    bio: "Elected student leadership voicing grassroots innovator requirements, hackathon initiatives, and maker lab access.",
    responsibilities: [
      "Student ideation pipeline feedback to executive committee",
      "Coordination of peer-to-peer prototyping bootcamps and workshops",
      "Student founder support advocacy across all three schools",
    ],
    document: "/documents/gusc-committee-order.pdf",
  },
];

const ALL_MEMBERS = [...BOARD_MEMBERS, ...CORE_TEAM, ...GUSC_MEMBERS, ...TECHNICAL_ASSOCIATES, ...ACADEMIC_MENTORS];

export function TeamPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Leadership",
    "GUIITAR Committee (GUSC)",
    "Core Team",
    "Technical Associates",
    "Academic Mentors",
  ];

  const filteredMembers =
    selectedCategory === "All"
      ? ALL_MEMBERS
      : ALL_MEMBERS.filter((m) => m.category === selectedCategory);

  return (
    <>
      <PageHero
        badge="Official Governance & Operations"
        title="Our Dedicated Team"
        text="The professionals, researchers, technical associates, and institutional leadership dedicated to transforming innovative ideas into scalable enterprises at GSFC University."
      >
        <div className="button-row">
          <ButtonLink to="/contact" size="md" variant="primary">
            <span>Connect with Incubation Team</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
          <Link to="/about" className="btn btn-outline btn-md">
            <span>About GUIITAR Council</span>
          </Link>
        </div>
      </PageHero>

      {/* INSTITUTIONAL HIERARCHY BANNER */}
      <section style={{ padding: "40px 0 20px", background: "var(--background)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              borderRadius: "20px",
              padding: "28px 32px",
              color: "#ffffff",
              boxShadow: "0 14px 30px -8px rgba(30, 64, 175, 0.25)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#93c5fd",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Structure &amp; Accountability
              </span>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "22px", fontWeight: 800 }}>
                Four-Tier Operational Governance Model
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#cbd5e1", maxWidth: "680px" }}>
                GUIITAR Council operates with clear institutional separation between Board Governance,
                Incubation Operations Management, Laboratory Technical Associates, and Departmental
                Faculty Guidance.
              </p>
            </div>

            <a
              href="/team/guiitar-council-team-hierarchy.png"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light btn-sm"
              style={{
                background: "#ffffff",
                color: "#1e3a8a",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>View Organizational Chart</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ padding: "30px 0 80px" }}>
        <div className="container">
          <div className="tabs" style={{ marginBottom: "36px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({cat === "All" ? ALL_MEMBERS.length : ALL_MEMBERS.filter((m) => m.category === cat).length})
              </button>
            ))}
          </div>

          {/* GUSC COMMITTEE HIGHLIGHT BANNER */}
          {selectedCategory === "GUIITAR Committee (GUSC)" && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(14, 165, 233, 0.05) 100%)",
                border: "1.5px solid var(--primary, #2563eb)",
                borderRadius: "16px",
                padding: "24px 28px",
                marginBottom: "32px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ maxWidth: "720px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(37, 99, 235, 0.15)",
                    color: "var(--primary, #2563eb)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  Office Order No. Provost/092025/142 • Date: 10/09/2025
                </span>
                <h3 style={{ margin: "0 0 6px", fontSize: "19px", fontWeight: 800, color: "var(--text)" }}>
                  GSFC University Start-up Committee (GUSC)
                </h3>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  The unified statutory committee constituted by the Provost, GSFC University, merging the University Level Start-up Committee, Technical Scrutiny Committee, and IPR Evaluation Panel to oversee incubation grants, PoC sanctions, and intellectual property protection.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="/documents/gusc-committee-order.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Committee Order</span>
                </a>
                <a
                  href="/documents/gusc-committee-order.pdf"
                  download="GUSC_Committee_Order.pdf"
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          )}

          {/* TEAM MEMBERS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredMembers.map((member) => (
              <article
                key={member.name}
                className="plain-card"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "18px",
                  border: "1px solid var(--border-color, #e2e8f0)",
                  background: "var(--card-bg, #ffffff)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "16px",
                    }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "14px",
                          objectFit: "cover",
                          border: "2px solid var(--border, #e2e8f0)",
                          background: "var(--surface-muted, #f8fafc)",
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "14px",
                          background: "rgba(37, 99, 235, 0.12)",
                          color: "var(--primary, #2563eb)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "20px",
                          flexShrink: 0,
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <span
                        className="pill"
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          marginBottom: "4px",
                          display: "inline-block",
                        }}
                      >
                        {member.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 800,
                          margin: 0,
                          color: "var(--text, #0f172a)",
                          lineHeight: 1.3,
                        }}
                      >
                        {member.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#2563eb",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        {member.designation}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "var(--muted-foreground, #475569)",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    {member.bio}
                  </p>

                  <div style={{ marginBottom: "16px" }}>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "#64748b",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Key Responsibilities:
                    </span>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "18px",
                        fontSize: "12.5px",
                        color: "#334155",
                        lineHeight: 1.5,
                      }}
                    >
                      {member.responsibilities.map((resp) => (
                        <li key={resp} style={{ marginBottom: "4px" }}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {member.document && (
                  <div
                    style={{
                      borderTop: "1px solid var(--border-color, #f1f5f9)",
                      paddingTop: "12px",
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href={member.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#2563eb",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>View Official Bio (PDF)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CONTACT CALLOUT */}
      <section className="section-muted" style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "860px", textAlign: "center" }}>
          <SectionTitle
            badge="Direct Inquiries"
            title="Have an Inquiry for Our Operations Team?"
            subtitle="Reach out directly to the GUIITAR Council Secretariat at Anviksha Building, GSFC University."
            align="center"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <a
              href="mailto:guiitar@gsfcuniversity.ac.in"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Mail className="w-4 h-4" />
              <span>guiitar@gsfcuniversity.ac.in</span>
            </a>
            <a
              href="tel:+912653093750"
              className="btn btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Phone className="w-4 h-4" />
              <span>+91 (0265) 3093750</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

