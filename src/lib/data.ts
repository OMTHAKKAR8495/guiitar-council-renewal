// GUIITAR Council — Centralized Verified Information Architecture
// Source of truth: GSFC University & GUIITAR Council Official Records

export interface MetricItem {
  value: string;
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export const VERIFIED_METRICS: MetricItem[] = [
  {
    value: "1800+",
    number: 1800,
    suffix: "+",
    label: "Students / Startups Mentored",
    sublabel: "Across multiple engineering & science cohorts",
  },
  {
    value: "83+",
    number: 83,
    suffix: "+",
    label: "Students / Startups Incubated",
    sublabel: "From PoC to market-ready enterprises",
  },
  {
    value: "145+",
    number: 145,
    suffix: "+",
    label: "IPR & Patents Filed",
    sublabel: "National & international patent protections",
  },
  {
    value: "₹30L+",
    number: 30,
    suffix: "L+",
    label: "Direct Funding Support",
    sublabel: "Non-dilutive grants sanctioned & disbursed",
  },
  {
    value: "115+",
    number: 115,
    suffix: "+",
    label: "Events & Workshops",
    sublabel: "Hackathons, masterclasses & bootcamps",
  },
  {
    value: "13000+",
    number: 13000,
    suffix: "+",
    label: "Students Sensitized",
    sublabel: "In innovation, IPR & entrepreneurship",
  },
];

export interface PathwayStage {
  id: string;
  step: string;
  name: string;
  headline: string;
  whatHappens: string;
  supportProvided: string[];
  eligible: string;
  programs: string[];
  resources: string;
  ctaText: string;
  ctaLink: string;
}

export const INNOVATION_JOURNEY: PathwayStage[] = [
  {
    id: "ideate",
    step: "01",
    name: "IDEATE",
    headline: "Sparking Novel Concepts from Curiosity",
    whatHappens:
      "Students, researchers, and early founders identify critical technological and industrial challenges, formulating initial project hypotheses.",
    supportProvided: [
      "Access to E-Club brainstorm circles & ideation clinics",
      "Design Thinking & Problem Validation masterclasses",
      "Guidance from Faculty Research Guides & Domain Specialists",
    ],
    eligible:
      "School (9-12), Diploma, UG, PG, PhD students, alumni & independent innovators up to 35 years.",
    programs: ["E-Club Student Wing", "SSIP 2.0 Ideathon", "Innovation Hackathons"],
    resources: "Ideation Canvas & Problem Statement Briefs",
    ctaText: "Submit Your Idea",
    ctaLink: "/apply",
  },
  {
    id: "validate",
    step: "02",
    name: "VALIDATE",
    headline: "Rigorous Technical & Commercial Feasibility",
    whatHappens:
      "Testing assumptions, establishing proof-of-concept (PoC), and evaluating market feasibility alongside faculty and industry practitioners.",
    supportProvided: [
      "Technical feasibility reviews by Institutional Screening Committee (ISC)",
      "Customer discovery guidance and preliminary unit economics",
      "Access to university research journals, IEEE databases & chemical testing labs",
    ],
    eligible: "Innovators with a preliminary technical concept or laboratory hypothesis.",
    programs: ["Pre-Incubation Cohort", "Proof-of-Concept Screening"],
    resources: "ISC Technical Validation Guidelines",
    ctaText: "Explore Pre-Incubation",
    ctaLink: "/programs",
  },
  {
    id: "prototype",
    step: "03",
    name: "PROTOTYPE",
    headline: "Hands-on Hardware & Software Fabrication",
    whatHappens:
      "Translating validated schematics and CAD drawings into working physical or digital functional prototypes.",
    supportProvided: [
      "Direct bench access to Makers Lab (3D Printers, Laser Cutters, CNC)",
      "Param Shavak DL Supercomputer for AI/ML compute workloads",
      "Advanced Drone & UAV aerodynamic test rigs and IoT sensor benches",
    ],
    eligible: "Teams needing physical or computational testing for hardware/software MVPs.",
    programs: ["Rapid Prototyping Grant", "Lab Residency Program"],
    resources: "Lab Safety & Equipment User Handbooks",
    ctaText: "Explore Prototyping Labs",
    ctaLink: "/innovation",
  },
  {
    id: "protect",
    step: "04",
    name: "PROTECT",
    headline: "Safeguarding Novel Intellectual Property",
    whatHappens:
      "Conducting patentability searches, drafting formal patent specifications, and securing institutional IPR grants.",
    supportProvided: [
      "Comprehensive prior-art search across global patent databases",
      "Professional patent drafting by registered Indian Patent Attorneys",
      "Up to ₹1.5 Lakhs financial grant per approved patent filing",
    ],
    eligible: "Innovators with novel inventions, formulations, or industrial designs.",
    programs: ["GUIITAR IPR Support Grant Scheme", "Patent Clinic"],
    resources: "Invention Disclosure Form (IDF) Template",
    ctaText: "Apply for IPR Support",
    ctaLink: "/funding",
  },
  {
    id: "fund",
    step: "05",
    name: "FUND",
    headline: "Non-Dilutive Seed Capital Disbursement",
    whatHappens:
      "Securing government and university non-dilutive funding to purchase materials, hire technical talent, and run pilot trials.",
    supportProvided: [
      "SSIP 2.0 Grants up to ₹2.5 Lakhs for students/alumni",
      "Gujarat Industrial Policy 2020 assistance up to ₹30 Lakhs for growth startups",
      "Milestone-linked transparent tranche disbursements",
    ],
    eligible: "Students, innovators, and registered startups meeting grant criteria.",
    programs: ["SSIP 2.0 Grant Scheme", "Gujarat Industrial Policy 2020"],
    resources: "Grant Application Guidelines & Procurement Formats",
    ctaText: "Launch Funding Navigator",
    ctaLink: "/funding",
  },
  {
    id: "incubate",
    step: "06",
    name: "INCUBATE",
    headline: "Full-Fledged Venture Incubation & Co-Working",
    whatHappens:
      "Transitioning the project into a registered commercial entity with dedicated office suites and continuous advisory support.",
    supportProvided: [
      "High-speed furnished co-working desks at Anviksha Innovation Hub",
      "Legal entity incorporation (Pvt Ltd, LLP, Section 8) assistance",
      "Dedicated 1-on-1 industry mentor allocation",
    ],
    eligible: "Early-stage startup teams with functional prototypes seeking formal incubation.",
    programs: ["Physical Incubation", "Virtual Acceleration Cohort"],
    resources: "Incubation Agreement & Policy Manual",
    ctaText: "Apply for Incubation",
    ctaLink: "/startups",
  },
  {
    id: "scale",
    step: "07",
    name: "SCALE",
    headline: "Corporate Pilots & Market Expansion",
    whatHappens:
      "Executing real-world industrial pilots, customer acquisition, and venture capital demo day presentations.",
    supportProvided: [
      "Industrial pilot trial opportunities with GSFC Limited & partner corporations",
      "Demo Day pitching to Angel Networks & Regional VC funds",
      "Exhibition sponsorships at national and state startup expos",
    ],
    eligible: "Operational startups with revenue traction or validated industrial pilots.",
    programs: ["Corporate Accelerator Track", "Investor Demo Days"],
    resources: "Pitch Deck & Due Diligence Template",
    ctaText: "Connect with Partners",
    ctaLink: "/partner",
  },
  {
    id: "impact",
    step: "08",
    name: "IMPACT",
    headline: "Creating Sustainable Economic & Social Value",
    whatHappens:
      "Graduating into independent, job-creating commercial enterprises that generate high societal value in Gujarat and beyond.",
    supportProvided: [
      "Alumni founder network access and continued lab linkages",
      "Assistance for national innovation awards and DPIIT certifications",
      "Ongoing advisory board guidance from GSFC University leadership",
    ],
    eligible: "Graduated startups and established venture alumni.",
    programs: ["Venture Alumni Circle", "Scale-up Advisory"],
    resources: "Impact Assessment Framework",
    ctaText: "View Impact Dashboard",
    ctaLink: "/impact",
  },
];

export interface EcosystemNode {
  id: string;
  name: string;
  description: string;
  keyOfferings: string[];
  metrics: string;
  iconName: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "mentorship",
    name: "MENTORSHIP",
    description:
      "Direct coaching from corporate CXOs, chemical industry experts from GSFC Ltd, academicians, and venture architects.",
    keyOfferings: [
      "1-on-1 Advisory Sessions",
      "Technical Architecture Review",
      "Go-To-Market Coaching",
    ],
    metrics: "50+ Verified Mentors",
    iconName: "Users",
  },
  {
    id: "funding",
    name: "FUNDING",
    description:
      "Non-dilutive grant capital to fuel research, prototype fabrication, validation, and market scaling.",
    keyOfferings: [
      "SSIP 2.0 (Up to ₹2.5L)",
      "Gujarat Industrial Policy (Up to ₹30L)",
      "IPR Grants (Up to ₹1.5L)",
    ],
    metrics: "₹30 Lakhs+ Disbursed",
    iconName: "Banknote",
  },
  {
    id: "infrastructure",
    name: "INFRASTRUCTURE",
    description:
      "State-of-the-art supercomputing, drone testing, 3D printing fabrication, and collaborative co-working suites.",
    keyOfferings: ["Param Shavak Supercomputer", "Advanced Drone Lab", "Makers 3D Printing Lab"],
    metrics: "6 Specialized Labs",
    iconName: "Building2",
  },
  {
    id: "ipr",
    name: "IPR SUPPORT",
    description:
      "Full-cycle legal and financial assistance for patent searching, drafting, and Indian Patent Office statutory filings.",
    keyOfferings: [
      "Prior Art Searches",
      "Attorney Drafting Subsidies",
      "Patent Filing Reimbursements",
    ],
    metrics: "145+ Patents Filed",
    iconName: "ShieldCheck",
  },
  {
    id: "networking",
    name: "NETWORKING",
    description:
      "High-leverage linkages connecting founders with angel investors, state government bodies, and industrial giants.",
    keyOfferings: [
      "Demo Days & Pitch Showcases",
      "Government Nodal Connects",
      "Corporate Pilot Matchmaking",
    ],
    metrics: "50+ MOUs Signed",
    iconName: "Network",
  },
  {
    id: "prototyping",
    name: "PROTOTYPING",
    description:
      "Dedicated rapid PoC tooling, laser cutters, PCB milling, and microcontroller testbenches to build physical MVPs.",
    keyOfferings: ["Precision Laser Cutting", "FDM & Resin 3D Printers", "IoT & Sensor Testbeds"],
    metrics: "200+ PoCs Built",
    iconName: "Cpu",
  },
];

export interface ShowcaseProject {
  id: string;
  name: string;
  category:
    | "AI"
    | "Robotics"
    | "IoT"
    | "Biotech"
    | "CleanTech"
    | "Healthcare"
    | "Energy"
    | "ICT"
    | "Manufacturing";
  technology: string;
  creator: string;
  stage: "Ideation" | "Prototype / PoC" | "MVP" | "Incubated" | "Commercial Scale";
  fundingSanctioned: string;
  impact: string;
  description: string;
  highlights: string[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "ayurtrix",
    name: "Ayurtrix — Three Folding Life",
    category: "Biotech",
    technology: "Phytochemical Standardization & Extraction",
    creator: "GSFC University Student Innovators",
    stage: "Incubated",
    fundingSanctioned: "₹2,50,000 (SSIP 2.0)",
    impact: "Formulated 3 standardized herbal formulations with validated bioactive markers.",
    description:
      "Developing standardized authentic Ayurvedic healthcare formulations to meet rigorous industrial quality benchmarks and satisfy surging domestic wellness demand.",
    highlights: [
      "Standardized botanical marker extraction",
      "Zero heavy metal contaminants",
      "Clinical testing benchmarking",
    ],
  },
  {
    id: "bacterial-chroma",
    name: "Bacterial Chroma: A Biopigment Factory",
    category: "Biotech",
    technology: "Microbial Synthesis & Fermentation",
    creator: "Biotechnology Research Cohort",
    stage: "Incubated",
    fundingSanctioned: "₹1,70,000 (SSIP 2.0)",
    impact:
      "Synthesized 4 non-toxic biological pigments for textiles, cosmetics, and therapeutics.",
    description:
      "Producing sustainable, non-toxic bacterial pigments as eco-friendly replacements for carcinogenic synthetic chemical dyes in commercial textile and cosmetic applications.",
    highlights: [
      "100% biodegradable pigments",
      "Natural antimicrobial properties",
      "Zero industrial chemical runoff",
    ],
  },
  {
    id: "bio-lastic",
    name: "Bio-Lastic: A Safe Future with Flowers",
    category: "CleanTech",
    technology: "Floral Cellulose Upcycling & Biopolymer Extrusion",
    creator: "Environmental Science Student Team",
    stage: "Incubated",
    fundingSanctioned: "₹1,00,000 (SSIP 2.0)",
    impact:
      "Upcycled 500+ kg of temple flower waste into home-compostable biopolymer resin sheets.",
    description:
      "Transforming discarded temple and urban floral waste into fully biodegradable biopolymer alternatives to single-use plastics for packaging and horticultural mulch films.",
    highlights: [
      "100% home compostable in 60 days",
      "Eliminates floral landfill pollution",
      "Competitive tensile strength",
    ],
  },
  {
    id: "aerovanguard",
    name: "AeroVanguard Autonomous UAV System",
    category: "Robotics",
    technology: "ArduPilot, Edge Vision & Telemetry",
    creator: "Mechanical & Computer Engineering Team",
    stage: "MVP",
    fundingSanctioned: "₹2,00,000 (SSIP 2.0 + Drone Lab)",
    impact: "Completed 120+ autonomous test sorties with sub-meter payload delivery accuracy.",
    description:
      "Developing custom multi-rotor autonomous UAVs equipped with AI edge vision for precision industrial facility surveillance and chemical pipeline inspection.",
    highlights: [
      "Autonomous GPS waypoint navigation",
      "Thermal leak detection payload",
      "DGCA compliance ready",
    ],
  },
  {
    id: "param-ai-crop",
    name: "AgriVision: Crop Disease AI Diagnostics",
    category: "AI",
    technology: "PyTorch, Edge Computer Vision on Param Shavak",
    creator: "AI/ML Student Research Group",
    stage: "Prototype / PoC",
    fundingSanctioned: "Compute Grant on Supercomputer",
    impact:
      "Trained on 50,000+ leaf images with 96.4% diagnostic accuracy across 12 Gujarat crops.",
    description:
      "Real-time offline edge diagnostic mobile model allowing smallholder farmers to detect fungal and bacterial blights in cash crops within 3 seconds of leaf capture.",
    highlights: [
      "Runs on low-cost smartphones without internet",
      "Trained on Param Shavak DL GPU cluster",
      "Vernacular Gujarati/Hindi interface",
    ],
  },
  {
    id: "smart-iot-water",
    name: "HydroSense: Smart Industrial Effluent Monitor",
    category: "IoT",
    technology: "Optical Spectrometry & LoRaWAN Embedded Sensors",
    creator: "Chemical & Electronics Engineering Cohort",
    stage: "Prototype / PoC",
    fundingSanctioned: "₹1,50,000 (SSIP 2.0)",
    impact:
      "Continuous 24/7 monitoring of COD, BOD, and heavy metal ions with automated telemetry.",
    description:
      "Industrial-grade low-power IoT telemetry node providing real-time compliance alerting for wastewater and industrial discharge channels.",
    highlights: [
      "Real-time cloud alert dashboard",
      "Corrosion-resistant titanium probe casing",
      "Sub-minute anomaly alert dispatch",
    ],
  },
];

export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  stage: string;
  foundedYear: string;
  technology: string;
  fundingReceived: string;
  description: string;
  team: string;
  achievements: string[];
}

export const STARTUP_DIRECTORY: StartupItem[] = [
  {
    id: "ayurtrix",
    name: "Ayurtrix Healthcare",
    tagline: "Standardized Authentic Phytopharmaceutical & Herbal Innovations",
    industry: "Ayurveda & BioTech",
    stage: "Incubated Startup",
    foundedYear: "2024",
    technology: "Bioactive Phytochemical Profiling",
    fundingReceived: "₹2,50,000 (SSIP 2.0)",
    description:
      "Bridging ancient Ayurvedic pharmacology with modern analytical chromatography to provide verified therapeutic wellness formulations with clinical consistency.",
    team: "Student Researchers, GSFC University",
    achievements: [
      "SSIP 2.0 Grant Recipient",
      "3 Patent disclosures under review",
      "Featured at Gujarat Startup Summit",
    ],
  },
  {
    id: "bacterial-chroma",
    name: "Bacterial Chroma Innovations",
    tagline: "Sustainable Microbial Biopigments for Clean Textiles & Cosmetics",
    industry: "Industrial Biotechnology",
    stage: "Incubated Startup",
    foundedYear: "2024",
    technology: "Microbial Fermentation Synthesis",
    fundingReceived: "₹1,70,000 (SSIP 2.0)",
    description:
      "Pioneering circular bio-colorants through non-pathogenic bacterial culturing, mitigating toxic dye discharge across the textile processing industry.",
    team: "Biotech Innovators, GUIITAR Council",
    achievements: [
      "SSIP 2.0 Prototyping Grant",
      "Antimicrobial assay validated",
      "Pilot trials with local fabric mills",
    ],
  },
  {
    id: "bio-lastic",
    name: "Bio-Lastic Sustainable Solutions",
    tagline: "Circular Biopolymers from Floral Temple Waste",
    industry: "CleanTech & Materials",
    stage: "Incubated Startup",
    foundedYear: "2023",
    technology: "Cellulose Resin Compounding",
    fundingReceived: "₹1,00,000 (SSIP 2.0)",
    description:
      "Converting holy floral offerings and agricultural organic residues into 100% home-compostable film packaging and single-use plastic alternatives.",
    team: "Chemical & Environmental Science Leads",
    achievements: [
      "500kg waste diverted",
      "Zero microplastic breakdown certificate",
      "Commercial packaging PoC",
    ],
  },
  {
    id: "aerovanguard-labs",
    name: "AeroVanguard Robotics",
    tagline: "Autonomous Industrial Aerial Inspection & Telemetry Systems",
    industry: "Robotics & UAVs",
    stage: "Early Stage Venture",
    foundedYear: "2025",
    technology: "Edge Vision Avionics",
    fundingReceived: "₹2,00,000 Support",
    description:
      "Building custom mission-critical multi-rotor drones for chemical plant surveillance, pipeline thermal imaging, and perimeter security in Vadodara.",
    team: "Robotics & Drone Lab Fellows",
    achievements: [
      "DGCA compliant flight test cell",
      "Thermal payload integration",
      "Industry pilot partner with GSFC Ltd",
    ],
  },
];

export interface LabFacility {
  id: string;
  name: string;
  zone:
    | "AI / Computing"
    | "Drone & Aerospace"
    | "Prototype Zone"
    | "IoT & Electronics"
    | "Collaboration Hub";
  headline: string;
  description: string;
  equipment: string[];
  useCases: string[];
  whoCanAccess: string;
  imageAlt: string;
}

export const LAB_FACILITIES: LabFacility[] = [
  {
    id: "param-shavak",
    name: "Super Computer Lab (Param Shavak DL)",
    zone: "AI / Computing",
    headline: "High-Performance Deep Learning GPU Cluster",
    description:
      "An advanced supercomputing setup outfitted with the Param Shavak Deep Learning GPU system, built to accelerate compute-intensive simulations, neural network training, and computer vision pipelines.",
    equipment: [
      "Param Shavak GPU Deep Learning System",
      "High-bandwidth CUDA computing nodes",
      "TensorFlow, PyTorch, Caffe, OpenCV pre-configured environments",
      "Gigabit dedicated research LAN connection",
    ],
    useCases: [
      "Training large-scale deep learning and transformer vision models",
      "Computational fluid dynamics (CFD) and chemical process simulation",
      "Bioinformatics genome sequencing and molecular modeling",
    ],
    whoCanAccess:
      "Incubated startups, student innovators, and faculty researchers with approved compute proposals.",
    imageAlt: "Param Shavak Supercomputer Lab at GSFC University",
  },
  {
    id: "drone-lab",
    name: "Advanced Drone & UAV Research Lab",
    zone: "Drone & Aerospace",
    headline: "Aeronautical Fabrication & Autonomous Flight Rigs",
    description:
      "A dedicated aerospace facility enabling innovators to assemble, program, and rigorously test multi-rotor drones, fixed-wing prototypes, and autonomous flight avionics.",
    equipment: [
      "Multi-rotor assembly & dynamic thrust testbenches",
      "Pixhawk & ArduPilot autonomous flight controller toolkits",
      "Thermal & optical sensor payload integration rigs",
      "Outdoor SOT flight proving ground with safety nets",
    ],
    useCases: [
      "Precision agriculture aerial crop mapping",
      "Industrial infrastructure and pipeline inspection drones",
      "Autonomous emergency payload delivery systems",
    ],
    whoCanAccess:
      "Approved drone startup teams, E-Club UAV wing members, and licensed student pilots.",
    imageAlt: "Advanced Drone Lab at GUIITAR Council",
  },
  {
    id: "makers-lab",
    name: "Makers & 3D Prototyping Lab",
    zone: "Prototype Zone",
    headline: "Precision Subtractive & Additive Rapid Fabrication",
    description:
      "Spacious prototyping workshop equipped with high-precision laser cutters, industrial-grade 3D printers, and mechanical finishing tools to build functional prototypes in hours.",
    equipment: [
      "High-precision CO2 Laser Cutting & Engraving Machine",
      "Multiple FDM & High-Resolution Resin 3D Printers",
      "Vinyl Cutting & PCB Prototyping Workstations",
      "Mechanical drill presses, bench grinders & hand toolkits",
    ],
    useCases: [
      "Rapid prototype chassis, enclosures, and mechanical fixtures",
      "Custom acrylic and wooden test jigs and PoC models",
      "Precision silicone mold patterns for rapid casting",
    ],
    whoCanAccess:
      "All registered GUIITAR incubatees, SSIP 2.0 grant holders, and student innovators.",
    imageAlt: "Makers Lab 3D Prototyping at GSFC University",
  },
  {
    id: "design-iot-lab",
    name: "Design & IoT Tinkering Lab",
    zone: "IoT & Electronics",
    headline: "Embedded Hardware, Microcontrollers & RF Testing",
    description:
      "A specialized electronics tinkering bench supporting microcontrollers, signal generators, oscilloscope suites, sensor arrays, and embedded firmware development.",
    equipment: [
      "Digital Storage Oscilloscopes (DSO) & Logic Analyzers",
      "Microcontroller development suites (ESP32, STM32, Arduino, Raspberry Pi)",
      "Precision temperature-controlled soldering & desoldering stations",
      "Environmental, optical, and gas sensor benchmarking rigs",
    ],
    useCases: [
      "Embedded firmware development and RTOS testing",
      "Smart environmental telemetry and industrial IoT nodes",
      "Low-power RF communication testing (LoRa, BLE, Zigbee)",
    ],
    whoCanAccess: "Electronics innovators, IoT startup founders, and engineering researchers.",
    imageAlt: "Design IoT Tinkering Lab at GUIITAR Council",
  },
  {
    id: "anviksha-coworking",
    name: "Anviksha Co-Working Suites",
    zone: "Collaboration Hub",
    headline: "Modern Furnished Startup Workstations & Meeting Rooms",
    description:
      "A collaborative, ergonomic work environment on the 2nd Floor of Anviksha Building, providing quiet dedicated desk pods, private discussion cabins, and high-speed Wi-Fi.",
    equipment: [
      "Ergonomic dedicated founder workstations",
      "High-speed commercial fiber Wi-Fi & power backup",
      "12-seater Conference Room with 4K interactive presentation panel",
      "Private call booths and brainstorming whiteboard zones",
    ],
    useCases: [
      "Daily startup venture operations and sprint planning",
      "Client meetings, investor pitch rehearsals & team standups",
      "Recruitment interviews and administrative compliance work",
    ],
    whoCanAccess: "Officially incubated startups and pre-incubation cohort founders.",
    imageAlt: "Anviksha Co-working Space at GSFC University",
  },
  {
    id: "surjan-arena",
    name: "Surjan Open Collaboration Arena",
    zone: "Collaboration Hub",
    headline: "Open-Air Amphitheater for Creative Collisions",
    description:
      "An open campus amphitheater designed to foster informal cross-disciplinary dialogue, startup demo open houses, networking mixers, and hackathon kickoff ceremonies.",
    equipment: [
      "Tiered amphitheater seating with outdoor lighting",
      "Integrated AV sound system and mobile presentation displays",
      "Open green collaboration courtyard with breakout pods",
    ],
    useCases: [
      "E-Club startup ideathons and peer demo days",
      "Guest founder fireside chats and alumni meetups",
      "Annual Innovation Expo showcase exhibitions",
    ],
    whoCanAccess: "Open to all GSFC University students, faculty, and visiting ecosystem guests.",
    imageAlt: "Surjan Open Arena GSFC University",
  },
];

export interface MentorItem {
  id: string;
  name: string;
  designation: string;
  domain: "Technology" | "Business" | "Finance" | "Legal & IPR" | "Research" | "Industry";
  organization: string;
  experience: string;
  expertise: string[];
  avatar?: string;
}

export const MENTOR_NETWORK: MentorItem[] = [
  {
    id: "m-gr-sinha",
    name: "Prof. G. R. Sinha",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    domain: "Research",
    organization: "GSFC University",
    experience: "25+ Years in Engineering Research & Academic Leadership",
    avatar: "/leaders/gr-sinha.png",
    expertise: [
      "Biomedical Signal Processing",
      "AI/ML in Healthcare",
      "IPR Strategy",
      "Academic Entrepreneurship",
    ],
  },
  {
    id: "m-kirankumar",
    name: "Mr. KiranKumar Parmar",
    designation: "Senior Manager (Incubation)",
    domain: "Business",
    organization: "GUIITAR Council",
    experience: "12+ Years in Incubation Management & Startup Ecosystems",
    expertise: [
      "Startup Incubation",
      "SSIP 2.0 Grant Governance",
      "Business Modeling",
      "Policy Compliance",
    ],
  },
  {
    id: "m-akhilesh",
    name: "Dr. Akhilesh Prajapati",
    designation: "Associate Professor & Faculty Mentor",
    domain: "Technology",
    organization: "School of Technology, GSFC University",
    experience: "14+ Years in Chemical & Process Engineering",
    expertise: ["Chemical Process Scale-up", "Novel Polymers", "Industrial Safety", "Applied R&D"],
  },
  {
    id: "m-mihir",
    name: "Dr. Mihir Trivedi",
    designation: "Sr. Assistant Professor",
    domain: "Technology",
    organization: "Computer Science Dept, GSFC University",
    experience: "10+ Years in Distributed Systems & AI",
    expertise: [
      "High-Performance Computing",
      "GPU Acceleration",
      "Computer Vision",
      "Deep Learning",
    ],
  },
  {
    id: "m-jignesh",
    name: "Dr. Jignesh Valand",
    designation: "Assistant Professor & Biotech Mentor",
    domain: "Research",
    organization: "School of Science, GSFC University",
    experience: "9+ Years in Microbial Biotechnology",
    expertise: [
      "Bio-pigments",
      "Microbial Synthesis",
      "Enzyme Engineering",
      "Phytopharma Validation",
    ],
  },
  {
    id: "m-bhuvan",
    name: "Mr. Bhuvan Vyas",
    designation: "Manager (Ecosystem & Linkages)",
    domain: "Industry",
    organization: "GUIITAR Council",
    experience: "8+ Years in Corporate Relations & MOUs",
    expertise: ["Corporate Linkages", "CSR Grant Funding", "MOU Execution", "Investor Relations"],
  },
  {
    id: "m-amit",
    name: "Mr. Amit Duggal",
    designation: "Senior Executive (Technical)",
    domain: "Technology",
    organization: "GUIITAR Council",
    experience: "7+ Years in Hardware Prototyping & Labs",
    expertise: ["3D Printing Slicing", "Laser Cutting Tooling", "Drone Avionics", "PoC Assembly"],
  },
  {
    id: "m-bhoomi",
    name: "Dr. Bhoomi Shah",
    designation: "Assistant Professor & IPR Lead",
    domain: "Legal & IPR",
    organization: "GSFC University",
    experience: "8+ Years in Patent Search & Research Compliance",
    expertise: [
      "Patent Prior-Art Searching",
      "Invention Disclosure Filing",
      "Copyrights",
      "Design Registrations",
    ],
  },
];

export interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const OFFICIAL_FAQS: FaqItem[] = [
  {
    q: "Who can apply to GUIITAR Council?",
    a: "GUIITAR Council welcomes applications from School Students (Classes 9–12), Diploma, Undergraduate, Postgraduate, and PhD researchers, university alumni, independent innovators up to the age of 35 years, and early-stage startup founders across Gujarat and India.",
    category: "Getting Started",
  },
  {
    q: "Can students apply with just an idea?",
    a: "Yes! You do not need a working prototype or a registered company to apply. Our E-Club and Pre-Incubation framework assist students in validating raw ideas and transforming them into working proof-of-concepts (PoCs).",
    category: "Getting Started",
  },
  {
    q: "Can an individual apply without a registered startup entity?",
    a: "Absolutely. Under the SSIP 2.0 Grant Scheme, individuals and student teams can apply for prototyping grants without having a registered company. Once your prototype is validated, GUIITAR assists you in legal incorporation.",
    category: "Innovation",
  },
  {
    q: "What funding support is available at GUIITAR Council?",
    a: "We offer three official non-dilutive grant tracks: 1) SSIP 2.0 Grant (Up to ₹2.5 Lakhs for students/alumni, and up to ₹20,000 for school students), 2) Gujarat Industrial Policy 2020 Scheme (Up to ₹30 Lakhs for growth startups), and 3) IPR Support Scheme (Up to ₹1.5 Lakhs for patent drafting and filing).",
    category: "Funding",
  },
  {
    q: "What is SSIP 2.0?",
    a: "Student Startup and Innovation Policy 2.0 (SSIP 2.0) is a flagship initiative of the Government of Gujarat that provides non-dilutive grant funding and mentorship to students and young innovators to turn concepts into viable prototypes.",
    category: "Funding",
  },
  {
    q: "What is the Gujarat Industrial Policy 2020 Scheme?",
    a: "It is a state government scheme administered through recognized nodal incubation centers like GUIITAR to provide milestone-linked grant support of up to ₹30 Lakhs for operational tech startups to scale manufacturing, marketing, and commercial pilots.",
    category: "Funding",
  },
  {
    q: "How does GUIITAR help with IPR and Patents?",
    a: "GUIITAR Council maintains a dedicated IPR Cell with registered Indian Patent Attorneys. We assist with prior-art novelty searches, drafting comprehensive patent claims, filing official documents with the Indian Patent Office, and reimbursing statutory fees up to ₹1.5 Lakhs per patent.",
    category: "IPR",
  },
  {
    q: "Can external startups use GUIITAR Council laboratories?",
    a: "Yes. Incubated external startups and research collaborators can access our specialized facilities including the Param Shavak Supercomputer Lab, Advanced Drone Lab, Makers & 3D Prototyping Lab, and IoT Tinkering Lab upon approval.",
    category: "Infrastructure",
  },
  {
    q: "Can startups use the Anviksha co-working space?",
    a: "Yes. Incubated startups are allocated furnished workstations, conference room access, and high-speed Wi-Fi at our Anviksha Innovation Hub at subsidized non-profit rates.",
    category: "Infrastructure",
  },
  {
    q: "How does the mentorship process work?",
    a: "Each incubated team is paired with dedicated faculty and industry mentors based on their technology domain (Biotech, DeepTech, AI, Chemical, IoT, or Business). Mentors provide regular sprint reviews, technical validation, and business guidance.",
    category: "Mentorship",
  },
  {
    q: "What happens after I submit an application?",
    a: "Your application is reviewed by our technical screening team within 7–10 days. Shortlisted proposals are invited to pitch before the Institutional Screening Committee (ISC) for formal grant sanction and incubation onboarding.",
    category: "Getting Started",
  },
  {
    q: "Can industry and corporate organizations partner with GUIITAR?",
    a: "Yes. Corporates can sign formal MOUs for CSR innovation grant sponsorship, corporate challenge hackathons, joint R&D projects with GSFC University, and technology scouting.",
    category: "Partnerships",
  },
  {
    q: "How can an industry expert become a mentor?",
    a: "Industry leaders and entrepreneurs can apply through our Partner page or email us directly at guiitar@gsfcuniversity.ac.in to join our official Advisory and Mentor Network.",
    category: "Mentorship",
  },
  {
    q: "How can I participate in events and workshops?",
    a: "Visit our Events page to view upcoming hands-on workshops, drone bootcamps, and hackathons. You can reserve your seat directly with one click.",
    category: "Events",
  },
  {
    q: "How do I contact GUIITAR Council?",
    a: "You can visit us in person at Event Room, 2nd Floor, Anviksha Building, GSFC University Campus, Vadodara, email us at guiitar@gsfcuniversity.ac.in, or call +91 (0265) 3093750.",
    category: "Getting Started",
  },
];

export const FAQS_DATA = OFFICIAL_FAQS;

export interface StartupVenture {
  id: string;
  name: string;
  industry: string;
  stage: string;
  funding: string;
  description: string;
  patents: number;
  tags: string[];
  valuation: string;
}

export const STARTUP_VENTURES: StartupVenture[] = [
  {
    id: "startup-1",
    name: "Ayurtrix Healthcare Pvt. Ltd.",
    industry: "Biotech & Ayurveda",
    stage: "Incubated",
    funding: "₹2,50,000 (SSIP 2.0)",
    description:
      "Standardized phytochemical botanical formulations with verified bioactive efficacy.",
    patents: 3,
    tags: ["Biotech", "SSIP 2.0", "Incubated"],
    valuation: "Seed",
  },
  {
    id: "startup-2",
    name: "Bacterial Chroma Innovations",
    industry: "Industrial Fermentation",
    stage: "Incubated",
    funding: "₹1,70,000 (SSIP 2.0)",
    description: "Microbial bio-pigment synthesis eliminating toxic chemical textile wastewater.",
    patents: 2,
    tags: ["CleanTech", "Microbial", "Textiles"],
    valuation: "Seed",
  },
  {
    id: "startup-3",
    name: "Bio-Lastic Sustainable Solutions",
    industry: "Circular Materials",
    stage: "Incubated",
    funding: "₹1,00,000 (SSIP 2.0)",
    description: "100% home-compostable biopolymers derived from upcycled temple floral offerings.",
    patents: 1,
    tags: ["Circular Economy", "Packaging"],
    valuation: "Pre-Seed",
  },
  {
    id: "startup-4",
    name: "AeroVanguard Robotics",
    industry: "Robotics & UAVs",
    stage: "Pre-Incubated",
    funding: "₹2,00,000 (SSIP 2.0)",
    description:
      "Autonomous edge-vision drones for elevated chemical pipeline and refinery inspection.",
    patents: 1,
    tags: ["Drones", "Edge AI", "Inspection"],
    valuation: "Pre-Seed",
  },
];

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  domain: string;
  experience: string;
  avatar: string;
}

export const MENTOR_ROSTER: MentorProfile[] = [
  {
    id: "men-1",
    name: "Prof. G. R. Sinha",
    role: "Provost & CEO, GUIITAR",
    organization: "GSFC University",
    domain: "Biomedical AI & R&D Strategy",
    experience: "25+ Years",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "men-2",
    name: "Mr. KiranKumar Parmar",
    role: "Senior Manager (Incubation)",
    organization: "GUIITAR Council",
    domain: "SSIP 2.0 & Venture Incubation",
    experience: "12+ Years",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "men-3",
    name: "Dr. Jignesh Valand",
    role: "Assistant Professor (Biotech)",
    organization: "School of Science",
    domain: "Phytopharma & Bio-Pigments",
    experience: "9+ Years",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "men-4",
    name: "Mr. Amit Duggal",
    role: "Senior Executive (Technical)",
    organization: "GUIITAR Council",
    domain: "Drone Avionics & 3D Prototyping",
    experience: "7+ Years",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
  },
];

export interface FundingScheme {
  id: string;
  title: string;
  agency: string;
  maxGrant: string;
  type: string;
  description: string;
  eligibility: string;
  stagesCovered: string[];
  timeline: string;
}

export const FUNDING_SCHEMES: FundingScheme[] = [
  {
    id: "scheme-ssip",
    title: "Student Startup & Innovation Policy (SSIP 2.0)",
    agency: "Government of Gujarat",
    maxGrant: "Up to ₹2,50,000",
    type: "PoC & Prototyping Grant (Non-Dilutive)",
    description:
      "Financial assistance for university students and recent alumni to purchase materials, testing kits, and fabrication tools for novel working prototypes.",
    eligibility: "Enrolled students and young innovators under 35 years",
    stagesCovered: ["Proof of Concept", "Prototype", "MVP"],
    timeline: "Quarterly Scrutiny Cycle",
  },
  {
    id: "scheme-gip",
    title: "Gujarat Industrial Policy 2020 Scheme",
    agency: "Industries Commissionerate, Govt of Gujarat",
    maxGrant: "Up to ₹30,00,000",
    type: "Seed Capital & Commercialization Support",
    description:
      "Milestone-based assistance for incorporated technology startups scaling manufacturing, marketing, and industrial pilots.",
    eligibility: "Registered DPIIT startups incubated at GUIITAR",
    stagesCovered: ["Commercial Scale", "Pilot Testing", "Manufacturing"],
    timeline: "Bi-annual State Evaluation",
  },
  {
    id: "scheme-ipr",
    title: "GUIITAR Institutional Patent Filing Grant",
    agency: "GSFC University IPR Cell",
    maxGrant: "Up to ₹1,50,000 / Patent",
    type: "Legal & Statutory Fee Subsidy",
    description:
      "100% financial reimbursement for prior art searching, attorney claim drafting, and Indian Patent Office filing fees.",
    eligibility: "Faculty, research scholars, and student inventors",
    stagesCovered: ["Patent Drafting", "Provisional Filing", "Complete Specification"],
    timeline: "Continuous Intake",
  },
];

export interface IncubationProgram {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  grantSupport: string;
  targetCohort: string;
  description: string;
  features: string[];
  eligibility: string[];
}

export const INCUBATION_PROGRAMS: IncubationProgram[] = [
  {
    id: "prog-preinc",
    name: "Genesis Pre-Incubation Track",
    tagline: "From Raw Hypothesis to Working Proof of Concept",
    duration: "3 Months",
    grantSupport: "Up to ₹50,000",
    targetCohort: "Early Student Innovators & E-Club Members",
    description:
      "Hands-on mentorship, design thinking clinics, and lab workbench access to turn raw concepts into functional prototypes.",
    features: ["Bi-weekly Mentor Sprints", "Makers Lab 3D Printing", "IP Search Support"],
    eligibility: ["Enrolled university students", "Interdisciplinary teams of 2–5 members"],
  },
  {
    id: "prog-fullinc",
    name: "Anviksha Resident Incubation",
    tagline: "Comprehensive Venture Acceleration & Co-Working",
    duration: "12 Months",
    grantSupport: "Up to ₹2,50,000 (SSIP 2.0)",
    targetCohort: "Validated Prototypes & Early Incorporated Startups",
    description:
      "Full-fledged co-working suites, supercomputer compute access, legal incorporation assistance, and corporate pilot linkages.",
    features: [
      "Dedicated Co-working Pods",
      "Param Shavak GPU Cluster",
      "GSFC Ltd Industrial Pilot Access",
    ],
    eligibility: [
      "Functional MVP / PoC validated by ISC Committee",
      "Commitment to legal incorporation",
    ],
  },
  {
    id: "prog-scaleup",
    name: "Corporate Catalyst Scale Track",
    tagline: "Industrial Pilot Execution & Investor Syndication",
    duration: "18 Months",
    grantSupport: "Up to ₹30,00,000 (GIP 2020)",
    targetCohort: "Growth-stage Seed Ventures",
    description:
      "Matchmaking with industrial manufacturing units, angel investors, and regional venture capital funds for market expansion.",
    features: [
      "Demo Day Presentations",
      "Commercial Plant Trials",
      "Venture Debt & Seed Fund Linkages",
    ],
    eligibility: ["Commercial revenue or signed industrial pilot LOI", "DPIIT recognized startup"],
  },
];

export interface ResourceDoc {
  id: string;
  title: string;
  category: string;
  format: string;
  size: string;
  updated: string;
  description: string;
  downloads: number;
  link: string;
}

export const RESOURCE_DOCS: ResourceDoc[] = [
  {
    id: "doc-ssip-guidelines",
    title: "SSIP 2.0 Prototyping Grant Policy & Guidelines",
    category: "Policy Document",
    format: "PDF",
    size: "1.4 MB",
    updated: "Sep 2026",
    description:
      "Official Government of Gujarat SSIP 2.0 operating guidelines, permissible expenses, and procurement scrutiny requirements.",
    downloads: 420,
    link: "#",
  },
  {
    id: "doc-idf-template",
    title: "Invention Disclosure Form (IDF) — Patent Cell",
    category: "IPR Template",
    format: "DOCX",
    size: "450 KB",
    updated: "Aug 2026",
    description:
      "Standard format to disclose technical novelty, claims, schematics, and prior-art search results to the GUIITAR IPR Committee.",
    downloads: 310,
    link: "#",
  },
  {
    id: "doc-pitch-deck",
    title: "ISC Screening Pitch Deck Template (12 Slides)",
    category: "Pitch Template",
    format: "PPTX",
    size: "3.2 MB",
    updated: "Sep 2026",
    description:
      "Approved institutional presentation template for student teams pitching before the Institutional Screening Committee.",
    downloads: 680,
    link: "#",
  },
  {
    id: "doc-lab-safety",
    title: "Supercomputer & Prototyping Lab Safety Manual",
    category: "Lab Guidelines",
    format: "PDF",
    size: "2.1 MB",
    updated: "Jul 2026",
    description:
      "Safety protocols, laser cutter precautions, chemical handling, and drone testing field guidelines.",
    downloads: 275,
    link: "#",
  },
];
