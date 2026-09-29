import { NeonClient } from "./neonClient";

export type IdeaStatus =
  "Draft" | "Pending Review" | "Under Review" | "Approved" | "Published" | "Rejected" | "Archived";

export type InnovationStage =
  "Idea" | "Research" | "Prototype" | "MVP" | "Pilot" | "Startup" | "Scale";

export type CreatorType =
  "Student" | "Faculty" | "Researcher" | "Startup" | "Alumni" | "External Innovator";

export interface IdeaComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
  isInternal: boolean;
}

export interface IdeaActivity {
  id: string;
  action: string;
  admin: string;
  timestamp: string;
  details?: string;
}

export interface IdeaItem {
  id: string;
  refId: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  subcategory?: string;
  technology: string;
  stage: InnovationStage;
  creatorType: CreatorType;
  creatorName: string;
  creatorEmail: string;
  creatorPhone: string;
  department: string;
  university: string;
  teamMembers: string[];
  problemStatement: string;
  proposedSolution: string;
  innovationUsp: string;
  technologyUsed: string;
  targetUsers: string;
  industry: string;
  thrustArea: string;
  coverImage: string;
  galleryImages: string[];
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  expectedImpact: string;
  socialImpact?: string;
  environmentalImpact?: string;
  economicImpact?: string;
  sdgAlignment: string[];
  supportRequired: string[];
  visibility: "Draft" | "Private" | "Public";
  status: IdeaStatus;
  isFeatured: boolean;
  featuredOrder?: number;
  rejectionReason?: string;
  fundingSanctioned?: string;
  submittedAt: string;
  updatedAt: string;
  publishedAt?: string;
  comments: IdeaComment[];
  activities: IdeaActivity[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  thrustArea: string;
  count: number;
}

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
  patents?: number;
  valuation?: string;
  tags?: string[];
  websiteUrl?: string;
  logoUrl?: string;
  status?: "Active" | "Graduated" | "Incubated" | "Pre-Incubation";
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  category: string;
  capacity: number;
  registered: number;
  status: "Upcoming" | "Registration Open" | "Registration Closed" | "Completed";
  desc?: string;
  isUpcoming?: boolean;
  seats?: string;
  topics?: string[];
}

export interface MentorItem {
  id: string;
  name: string;
  designation: string;
  domain: "Technology" | "Business" | "Finance" | "Legal & IPR" | "Research" | "Industry" | string;
  organization: string;
  experience: string;
  expertise: string[];
  role?: string;
  avatar?: string;
  email?: string;
  status?: "Active" | "Available" | "Busy";
}

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
  status?: "Active" | "Upcoming" | "Closed";
}

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
  status?: "Active" | "Upcoming" | "Closed";
}

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
  isPublic?: boolean;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: "Industry" | "Government" | "Academic" | "Investor";
  scope: string;
  mouStatus: "Active MOU" | "In Discussion" | "Renewed";
  websiteUrl?: string;
  contactPerson?: string;
  signedDate?: string;
}

export interface FaqItem {
  id?: string;
  q: string;
  a: string;
  category: string;
  order?: number;
}

export interface ApplicationItem {
  id: string;
  type:
    | "Innovation Grant"
    | "Incubation Suite"
    | "Mentorship Request"
    | "Partnership Inquiry"
    | "General Application";
  applicant: string;
  email: string;
  phone?: string;
  organization: string;
  projectTitle?: string;
  stage?: string;
  fundingRequested?: string;
  summary: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected" | "Under Review";
  notes?: string;
}

export interface RegistrationItem {
  id: string;
  ticketId: string;
  studentName: string;
  enrollmentNo: string;
  email: string;
  phone: string;
  department: string;
  eventId?: string;
  eventTitle: string;
  registrationDate: string;
  status: "Registered" | "Attended" | "Cancelled" | "Waitlisted";
  semester?: string;
  notes?: string;
  createdAt?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Innovation Manager" | "Reviewer" | "Mentor";
  department: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

export interface SystemSettings {
  institutionName: string;
  nodalOfficer: string;
  contactEmail: string;
  contactPhone: string;
  ssipPortalActive: boolean;
  autoAssignReviewers: boolean;
  emailAlertsOnSubmission: boolean;
  publicShowcaseLive: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "idea" | "startup" | "application" | "event" | "partner";
  link: string;
  timestamp: string;
  read: boolean;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  action: string;
  targetRecord: string;
  recordType: string;
  timestamp: string;
  details: string;
}

// ================= INITIAL VERIFIED SEED DATA =================

const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: "idea-001",
    refId: "GUI-IDEA-2026-0001",
    slug: "ayurtrix-phytopharma-standardization",
    title: "Ayurtrix — Botanical Phytochemical Standardization",
    shortDescription:
      "Modernizing Ayurvedic herbal formulations with scientific chromatographic bioactive standardization.",
    detailedDescription:
      "Ayurtrix bridges classical Indian Ayurvedic pharmacology with rigorous high-performance liquid chromatography (HPLC) to produce authentic, heavy-metal-free herbal extracts with verified therapeutic efficacy.",
    category: "Biotech",
    subcategory: "Phytopharmaceuticals",
    technology: "HPLC & Botanical Extraction",
    stage: "MVP",
    creatorType: "Student",
    creatorName: "Aarav Patel & Team",
    creatorEmail: "aarav.patel@gsfcuniversity.ac.in",
    creatorPhone: "+91 98251 12345",
    department: "School of Science (Biotechnology)",
    university: "GSFC University, Vadodara",
    teamMembers: [
      "Aarav Patel (Lead)",
      "Pooja Shah (Analytical Chemist)",
      "Rohan Mehta (Pharmacology)",
    ],
    problemStatement:
      "Massive variation and adulteration in commercial herbal drugs lack verifiable active chemical markers and clinical consistency.",
    proposedSolution:
      "Standardized cold-solvent bio-marker extraction protocol benchmarking 4 therapeutic herbs against international pharmacopeia standards.",
    innovationUsp:
      "Zero heavy metal residues, standardized bioactive yield over 94%, verifiable batch-to-batch repeatability.",
    technologyUsed: "HPLC, Spectrophotometry, Cryo-grinding, Lyophilization",
    targetUsers: "Nutraceutical manufacturers, Ayurvedic pharmaceutical brands, Ayurvedic clinics.",
    industry: "Healthcare & Wellness",
    thrustArea: "Biotechnology & Life Sciences",
    coverImage:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1579165466791-78822231cb67?w=800&auto=format&fit=crop&q=80",
    ],
    expectedImpact:
      "Providing safe, certified therapeutic botanical formulations with measurable bioavailability.",
    socialImpact: "Improves public health reliability for natural treatments.",
    economicImpact: "High-margin export opportunities for Indian herbal therapeutics.",
    sdgAlignment: [
      "SDG 3: Good Health & Well-being",
      "SDG 9: Industry, Innovation & Infrastructure",
    ],
    supportRequired: ["Mentorship", "Funding", "Lab Access", "IPR"],
    visibility: "Public",
    status: "Published",
    isFeatured: true,
    featuredOrder: 1,
    fundingSanctioned: "₹2,50,000 (SSIP 2.0)",
    submittedAt: "2026-02-14T10:30:00Z",
    updatedAt: "2026-09-20T14:15:00Z",
    publishedAt: "2026-03-01T09:00:00Z",
    comments: [
      {
        id: "c-1",
        author: "Dr. Jignesh Valand",
        avatar: "JV",
        text: "Initial bio-marker yield verified in university analytical lab. Highly promising for SSIP 2.0 grant approval.",
        createdAt: "2026-02-18T11:00:00Z",
        isInternal: true,
      },
    ],
    activities: [
      {
        id: "act-1",
        action: "Idea Submitted",
        admin: "Aarav Patel",
        timestamp: "2026-02-14 10:30",
      },
      {
        id: "act-2",
        action: "Status changed to Approved",
        admin: "KiranKumar Parmar",
        timestamp: "2026-02-25 15:20",
      },
      {
        id: "act-3",
        action: "Idea Published to Showcase",
        admin: "Prof. G. R. Sinha",
        timestamp: "2026-03-01 09:00",
      },
    ],
  },
  {
    id: "idea-002",
    refId: "GUIITAR-IDEA-2026-0002",
    slug: "bacterial-chroma-biopigments",
    title: "Bacterial Chroma: Microbial Synthesis of Sustainable Pigments",
    shortDescription:
      "Producing natural, eco-friendly bacterial pigments for textile dyeing to eliminate toxic chemical runoff.",
    detailedDescription:
      "Isolating non-pathogenic bacterial strains to harvest vibrant, UV-resistant carotenoid and prodigiosin pigments as sustainable alternatives to carcinogenic textile colorants.",
    category: "Biotech",
    subcategory: "Industrial Fermentation",
    technology: "Microbial Synthesis & Bioprocessing",
    stage: "MVP",
    creatorType: "Student",
    creatorName: "Devanshi Trivedi",
    creatorEmail: "devanshi.t@gsfcuniversity.ac.in",
    creatorPhone: "+91 97241 87654",
    department: "Department of Biotechnology",
    university: "GSFC University, Vadodara",
    teamMembers: ["Devanshi Trivedi", "Harshil Joshi"],
    problemStatement:
      "Chemical textile dyeing produces 20% of global industrial water pollution with hazardous heavy metals and azo dyes.",
    proposedSolution:
      "Non-toxic bacterial pigmentation culture requiring 70% less water and zero hazardous solvent fixation.",
    innovationUsp:
      "Inherent antimicrobial property, 100% biodegradable wastewater effluent, vibrant colorfastness.",
    technologyUsed: "Bioreactors, Centrifugation, Microbial Fermentation, Spectrophotometry",
    targetUsers: "Eco-textile fashion brands, organic fabric mills, cosmetic formulation labs.",
    industry: "Textiles & Sustainable Chemistry",
    thrustArea: "Clean-Tech & Circular Economy",
    coverImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
    galleryImages: [],
    expectedImpact: "Zero-toxic wastewater discharge for participating fabric dyeing units.",
    sdgAlignment: ["SDG 6: Clean Water & Sanitation", "SDG 12: Responsible Consumption"],
    supportRequired: ["Funding", "Lab Access", "Industry Connection"],
    visibility: "Public",
    status: "Published",
    isFeatured: true,
    featuredOrder: 2,
    fundingSanctioned: "₹1,70,000 (SSIP 2.0)",
    submittedAt: "2026-03-10T14:20:00Z",
    updatedAt: "2026-09-18T16:00:00Z",
    publishedAt: "2026-03-28T11:30:00Z",
    comments: [],
    activities: [
      {
        id: "act-4",
        action: "Idea Submitted",
        admin: "Devanshi Trivedi",
        timestamp: "2026-03-10 14:20",
      },
      {
        id: "act-5",
        action: "Approved by ISC Committee",
        admin: "KiranKumar Parmar",
        timestamp: "2026-03-24 16:45",
      },
      {
        id: "act-6",
        action: "Idea Published",
        admin: "KiranKumar Parmar",
        timestamp: "2026-03-28 11:30",
      },
    ],
  },
  {
    id: "idea-003",
    refId: "GUIITAR-IDEA-2026-0003",
    slug: "bio-lastic-temple-flowers-polymer",
    title: "Bio-Lastic: Circular Biopolymers from Floral Waste",
    shortDescription:
      "Upcycling holy temple floral offerings into 100% biodegradable compostable packaging films.",
    detailedDescription:
      "Collecting discarded floral waste from Vadodara temples and processing natural cellulose fibers into thermoplastic resin pellets for mulch films and consumer pouches.",
    category: "CleanTech",
    subcategory: "Circular Materials",
    technology: "Cellulose Compounding & Extrusion",
    stage: "Prototype",
    creatorType: "Student",
    creatorName: "Kunal Verma & Team",
    creatorEmail: "kunal.verma@gsfcuniversity.ac.in",
    creatorPhone: "+91 94081 23456",
    department: "School of Technology (Chemical Eng.)",
    university: "GSFC University, Vadodara",
    teamMembers: ["Kunal Verma", "Nisha Dave", "Smit Patel"],
    problemStatement:
      "Over 800,000 tonnes of temple flowers are dumped into water bodies yearly in India, alongside surging single-use plastic waste.",
    proposedSolution:
      "Chemical bleaching and bio-plasticizer compounding of discarded flower petals into compostable plastic resin.",
    innovationUsp:
      "Degrades in home compost within 60 days leaving zero toxic microplastics; competitive tensile strength.",
    technologyUsed: "Twin-screw Extruder, Chemical Washing, Film Casting",
    targetUsers: "Packaging companies, e-commerce brands, agricultural mulch film buyers.",
    industry: "Packaging & Agriculture",
    thrustArea: "Environmental Engineering Solutions",
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    galleryImages: [],
    expectedImpact:
      "Diverting 5 tonnes of temple floral waste monthly and replacing 200,000 plastic polybags.",
    sdgAlignment: ["SDG 12: Responsible Consumption", "SDG 14: Life Below Water"],
    supportRequired: ["Mentorship", "Funding", "Lab Access", "Market Access"],
    visibility: "Public",
    status: "Published",
    isFeatured: true,
    featuredOrder: 3,
    fundingSanctioned: "₹1,00,000 (SSIP 2.0)",
    submittedAt: "2026-04-05T09:15:00Z",
    updatedAt: "2026-09-15T11:00:00Z",
    publishedAt: "2026-04-20T10:00:00Z",
    comments: [],
    activities: [
      {
        id: "act-7",
        action: "Idea Submitted",
        admin: "Kunal Verma",
        timestamp: "2026-04-05 09:15",
      },
      {
        id: "act-8",
        action: "Idea Published",
        admin: "KiranKumar Parmar",
        timestamp: "2026-04-20 10:00",
      },
    ],
  },
  {
    id: "idea-004",
    refId: "GUIITAR-IDEA-2026-0004",
    slug: "aerovanguard-autonomous-drone-inspection",
    title: "AeroVanguard Autonomous UAV Pipeline Inspector",
    shortDescription:
      "Custom multi-rotor drone system equipped with thermal edge vision for industrial gas & chemical leaks.",
    detailedDescription:
      "Autonomous flight mission planning combined with lightweight FLIR thermal cameras and onboard Jetson compute to inspect elevated chemical pipelines in real-time.",
    category: "Robotics",
    subcategory: "Unmanned Aerial Systems",
    technology: "ArduPilot & Edge Computer Vision",
    stage: "Prototype",
    creatorType: "Student",
    creatorName: "Yashwardhan Rana",
    creatorEmail: "yash.rana@gsfcuniversity.ac.in",
    creatorPhone: "+91 99099 87123",
    department: "Department of Mechanical Engineering",
    university: "GSFC University, Vadodara",
    teamMembers: ["Yashwardhan Rana", "Pratik Joshi"],
    problemStatement:
      "Manual human inspection of elevated chemical storage tanks and flare stacks is extremely hazardous and slow.",
    proposedSolution:
      "Fully autonomous GPS waypoint flight system with automated thermal hotspot detection and telemetry dispatch.",
    innovationUsp:
      "Sub-meter navigation precision, 45-minute battery flight endurance, real-time hazardous gas cloud mapping.",
    technologyUsed: "Pixhawk 6X, FLIR Lepton, NVIDIA Jetson Orin Nano, Mission Planner",
    targetUsers:
      "Chemical manufacturing plants, petrochemical refineries, power distribution utilities.",
    industry: "Industrial Safety & Inspection",
    thrustArea: "Artificial Intelligence & Robotics",
    coverImage:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
    galleryImages: [],
    expectedImpact:
      "Preventing dangerous industrial gas leaks and reducing inspection downtime by 85%.",
    sdgAlignment: ["SDG 9: Industry & Innovation", "SDG 8: Decent Work & Economic Growth"],
    supportRequired: ["Drone Lab Access", "Industry Connection", "IPR"],
    visibility: "Public",
    status: "Pending Review",
    isFeatured: false,
    fundingSanctioned: "₹2,00,000 (SSIP 2.0 Requested)",
    submittedAt: "2026-09-24T18:30:00Z",
    updatedAt: "2026-09-25T09:00:00Z",
    comments: [
      {
        id: "c-2",
        author: "Mr. Amit Duggal",
        avatar: "AD",
        text: "Flight test scheduled at SOT Proving Ground. Drone avionics wiring looks compliant with DGCA standards.",
        createdAt: "2026-09-25T09:15:00Z",
        isInternal: true,
      },
    ],
    activities: [
      {
        id: "act-9",
        action: "Idea Submitted by Public Portal",
        admin: "Yashwardhan Rana",
        timestamp: "2026-09-24 18:30",
      },
      {
        id: "act-10",
        action: "Moved to Pending Review Queue",
        admin: "System",
        timestamp: "2026-09-24 18:30",
      },
    ],
  },
];

const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Artificial Intelligence & Robotics",
    slug: "ai-robotics",
    description:
      "Autonomous drones, edge computing, neural vision, NLP, and intelligent industrial automation.",
    color: "#3b82f6",
    thrustArea: "AI & Robotics",
    count: 14,
  },
  {
    id: "cat-2",
    name: "Biotechnology & Life Sciences",
    slug: "biotech",
    description:
      "Microbial bio-pigments, phytochemical extraction, botanical standardization, enzyme catalysis.",
    color: "#10b981",
    thrustArea: "Biotechnology",
    count: 22,
  },
  {
    id: "cat-3",
    name: "CleanTech & Circular Materials",
    slug: "cleantech",
    description: "Floral biopolymers, carbon capture, wastewater treatment, bio-pellet extrusion.",
    color: "#059669",
    thrustArea: "Circular Economy",
    count: 18,
  },
  {
    id: "cat-4",
    name: "Internet of Things (IoT) & Smart Devices",
    slug: "iot-hardware",
    description: "Low-power RF telemetry nodes, smart water monitors, industrial telemetry units.",
    color: "#f59e0b",
    thrustArea: "IoT & Embedded",
    count: 12,
  },
  {
    id: "cat-5",
    name: "Chemical & Polymer Innovation",
    slug: "chemical-polymers",
    description:
      "Green catalysis, industrial specialty chemicals, bio-resins, solvent recovery systems.",
    color: "#8b5cf6",
    thrustArea: "Advanced Manufacturing",
    count: 9,
  },
];

const INITIAL_STARTUPS: StartupItem[] = [
  {
    id: "startup-1",
    name: "Ayurtrix Healthcare Pvt. Ltd.",
    tagline: "Standardized Authentic Phytopharmaceutical & Herbal Innovations",
    industry: "Biotech & Ayurveda",
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
    patents: 3,
    tags: ["Biotech", "SSIP 2.0", "Incubated"],
    valuation: "Seed",
    status: "Incubated",
  },
  {
    id: "startup-2",
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
    patents: 2,
    tags: ["CleanTech", "Microbial", "Textiles"],
    valuation: "Seed",
    status: "Incubated",
  },
  {
    id: "startup-3",
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
    patents: 1,
    tags: ["Circular Economy", "Packaging"],
    valuation: "Pre-Seed",
    status: "Incubated",
  },
  {
    id: "startup-4",
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
    patents: 1,
    tags: ["Drones", "Edge AI", "Inspection"],
    valuation: "Pre-Seed",
    status: "Pre-Incubation",
  },
];

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "Autonomous Drone Technology & Aerodynamics Workshop",
    date: "October 17, 2026",
    time: "10:00 AM – 04:30 PM IST",
    location: "Advanced Drone Research Lab & SOT Ground, GSFC University",
    speaker: "Prof. G. R. Sinha & Industrial Drone Pilots",
    category: "Hardware & UAVs",
    capacity: 50,
    registered: 45,
    status: "Registration Open",
    isUpcoming: true,
    seats: "45 Seats Available",
    desc: "An intensive, hands-on masterclass covering multi-rotor drone assembly, flight avionics, autonomous waypoint programming with ArduPilot, and DGCA drone compliance rules.",
    topics: [
      "Aerodynamic flight principles & brushless motor sizing",
      "Electronic speed controllers (ESC) & flight controller rigging",
      "Autonomous mission planning using Mission Planner & QGroundControl",
      "Payload integration: Thermal sensors & aerial mapping cameras",
      "DGCA airspace categorization and drone pilot guidelines",
    ],
  },
  {
    id: "ev-2",
    title: "Deep Learning & AI Acceleration on Param Shavak Supercomputer",
    date: "November 05, 2026",
    time: "01:30 PM – 05:30 PM IST",
    location: "Param Shavak Supercomputer Center, Anviksha Hub",
    speaker: "Dr. Mihir Trivedi & AI Research Fellows",
    category: "AI & Supercomputing",
    capacity: 35,
    registered: 32,
    status: "Registration Open",
    isUpcoming: true,
    seats: "35 Seats Available",
    desc: "High-throughput model training, PyTorch distributed computing, and computer vision deployment tailored for student innovators with complex compute workloads.",
    topics: [
      "CUDA parallel execution workflows on Param Shavak cluster",
      "Optimizing deep neural networks for real-time edge vision inference",
      "Submitting SLURM batch jobs & GPU partition allocation",
      "Multi-modal transformer architectures for medical & industrial datasets",
    ],
  },
  {
    id: "ev-3",
    title: "SSIP 2.0 Institutional Pitch & Grant Screening Call",
    date: "November 22, 2026",
    time: "02:00 PM – 06:00 PM IST",
    location: "GUIITAR Incubation Suite, 2nd Floor Anviksha",
    speaker: "Institutional Screening Committee (ISC)",
    category: "Grant Pitching",
    capacity: 25,
    registered: 18,
    status: "Upcoming",
    isUpcoming: true,
    seats: "25 Teams Maximum",
    desc: "Formal presentation rounds for student teams seeking up to ₹2.5 Lakhs non-dilutive prototyping support under Gujarat SSIP 2.0 governance.",
    topics: [
      "12-slide Pitch deck scrutiny by domain experts & patent attorneys",
      "Bill of Materials (BOM) validation and quotation verification",
      "Statutory procurement guidelines and milestone tranche release schedules",
    ],
  },
  {
    id: "ev-4",
    title: "Intellectual Property & Patent Claim Drafting Masterclass",
    date: "December 04, 2026",
    time: "11:00 AM – 03:00 PM IST",
    location: "Surjan Collaboration Arena, GSFC University",
    speaker: "Dr. Bhoomi Shah & Registered Indian Patent Attorneys",
    category: "IPR & Legal",
    capacity: 60,
    registered: 50,
    status: "Upcoming",
    isUpcoming: true,
    seats: "60 Seats Available",
    desc: "Practical clinic on prior-art search protocols, drafting provisional patent claims, and accessing the GUIITAR ₹1.5 Lakhs patent reimbursement grant.",
    topics: [
      "Conducting international prior-art searches on Google Patents & IPO databases",
      "Structuring independent and dependent patent claims",
      "Filing Form 1, Form 2, and Form 3 with the Indian Patent Office",
      "Avoiding non-patentable subject matter exclusions under Section 3",
    ],
  },
];

const INITIAL_MENTORS: MentorItem[] = [
  {
    id: "men-0",
    name: "Shri P. K. Taneja, IAS (Retd.)",
    designation: "President, GSFC University & Chairman, GUIITAR Council",
    role: "President & Chairman, GUIITAR",
    domain: "Governance",
    organization: "GSFC University",
    experience: "Former Additional Chief Secretary, Govt. of Gujarat",
    expertise: [
      "Public Policy & Governance",
      "Institutional Leadership",
      "Strategic Planning",
      "Innovation Ecosystems",
    ],
    avatar: "/leaders/pk-taneja.png",
    status: "Active",
  },
  {
    id: "men-1",
    name: "Prof. G. R. Sinha",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    role: "Provost & CEO, GUIITAR",
    domain: "Research",
    organization: "GSFC University",
    experience: "25+ Years in Engineering Research & Academic Leadership",
    expertise: [
      "Biomedical Signal Processing",
      "AI/ML in Healthcare",
      "IPR Strategy",
      "Academic Entrepreneurship",
    ],
    avatar: "/leaders/gr-sinha.png",
    status: "Active",
  },
  {
    id: "men-2",
    name: "Mr. KiranKumar Parmar",
    designation: "Senior Manager (Incubation)",
    role: "Senior Manager (Incubation)",
    domain: "Business",
    organization: "GUIITAR Council",
    experience: "12+ Years in Incubation Management & Startup Ecosystems",
    expertise: [
      "Startup Incubation",
      "SSIP 2.0 Grant Governance",
      "Business Modeling",
      "Policy Compliance",
    ],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "men-3",
    name: "Dr. Akhilesh Prajapati",
    designation: "Associate Professor & Faculty Mentor",
    role: "Associate Professor",
    domain: "Technology",
    organization: "School of Technology, GSFC University",
    experience: "14+ Years in Chemical & Process Engineering",
    expertise: ["Chemical Process Scale-up", "Novel Polymers", "Industrial Safety", "Applied R&D"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "men-4",
    name: "Dr. Mihir Trivedi",
    designation: "Sr. Assistant Professor",
    role: "Sr. Assistant Professor",
    domain: "Technology",
    organization: "Computer Science Dept, GSFC University",
    experience: "10+ Years in Distributed Systems & AI",
    expertise: [
      "High-Performance Computing",
      "GPU Acceleration",
      "Computer Vision",
      "Deep Learning",
    ],
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "men-5",
    name: "Dr. Jignesh Valand",
    designation: "Assistant Professor & Biotech Mentor",
    role: "Assistant Professor (Biotech)",
    domain: "Research",
    organization: "School of Science, GSFC University",
    experience: "9+ Years in Microbial Biotechnology",
    expertise: [
      "Bio-pigments",
      "Microbial Synthesis",
      "Enzyme Engineering",
      "Phytopharma Validation",
    ],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "men-6",
    name: "Mr. Amit Duggal",
    designation: "Senior Executive (Technical)",
    role: "Senior Executive (Technical)",
    domain: "Technology",
    organization: "GUIITAR Council",
    experience: "7+ Years in Hardware Prototyping & Labs",
    expertise: ["3D Printing Slicing", "Laser Cutting Tooling", "Drone Avionics", "PoC Assembly"],
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "men-7",
    name: "Dr. Bhoomi Shah",
    designation: "Assistant Professor & IPR Lead",
    role: "Assistant Professor & IPR Lead",
    domain: "Legal & IPR",
    organization: "GSFC University",
    experience: "8+ Years in Patent Search & Research Compliance",
    expertise: [
      "Patent Prior-Art Searching",
      "Invention Disclosure Filing",
      "Copyrights",
      "Design Registrations",
    ],
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  },
];

const INITIAL_PROGRAMS: IncubationProgram[] = [
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
  },
];

const INITIAL_FUNDING: FundingScheme[] = [
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
  },
];

const INITIAL_RESOURCES: ResourceDoc[] = [
  {
    id: "doc-startup-policy",
    title: "GUIITAR Council Startup Policy & Procedures",
    category: "Policy Document",
    format: "PDF",
    size: "1.2 MB",
    updated: "Sep 2026",
    description:
      "Official Standard Operating Procedures (SOP) governing eligibility, incubation stages (Spark-up, Grooming, Incubation, Graduation), seed loan and funding norms.",
    downloads: 540,
    link: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf",
    isPublic: true,
  },
  {
    id: "doc-ipr-policy",
    title: "GSFC University Intellectual Property Rights (IPR) Policy",
    category: "Policy Document",
    format: "PDF",
    size: "3.6 MB",
    updated: "Sep 2026",
    description:
      "Comprehensive 46-page university policy approved by President, covering patent/trademark/copyright ownership, 70:30 revenue sharing, and IDF protocols.",
    downloads: 480,
    link: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_87cd494308f14eae95f42e1ab0a01910.pdf",
    isPublic: true,
  },
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
    isPublic: true,
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
    isPublic: true,
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
    isPublic: true,
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
    isPublic: true,
  },
];

const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: "pt-1",
    name: "GSFC Limited (Gujarat State Fertilizers & Chemicals)",
    category: "Industry",
    scope: "Industrial pilot testing, chemical labs, plant access & R&D grants.",
    mouStatus: "Active MOU",
    signedDate: "2023-01-15",
  },
  {
    id: "pt-2",
    name: "Student Startup & Innovation Policy (SSIP Gujarat)",
    category: "Government",
    scope: "Grant funding disbursement node under Education Department.",
    mouStatus: "Active MOU",
    signedDate: "2022-06-10",
  },
  {
    id: "pt-3",
    name: "DST — Government of India (NIDHI-TBI)",
    category: "Government",
    scope: "National incubation ecosystem development and EIR fellowship.",
    mouStatus: "Active MOU",
    signedDate: "2023-11-20",
  },
  {
    id: "pt-4",
    name: "Vadodara Chamber of Commerce and Industry (VCCI)",
    category: "Industry",
    scope: "SME vendor matching and manufacturing proof-of-concept facilities.",
    mouStatus: "Active MOU",
    signedDate: "2024-03-05",
  },
];

const INITIAL_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    q: "Who can apply to GUIITAR Council?",
    a: "GUIITAR Council welcomes applications from School Students (Classes 9–12), Diploma, Undergraduate, Postgraduate, and PhD researchers, university alumni, independent innovators up to the age of 35 years, and early-stage startup founders across Gujarat and India.",
    category: "Getting Started",
  },
  {
    id: "faq-2",
    q: "Can students apply with just an idea?",
    a: "Yes! You do not need a working prototype or a registered company to apply. Our E-Club and Pre-Incubation framework assist students in validating raw ideas and transforming them into working proof-of-concepts (PoCs).",
    category: "Getting Started",
  },
  {
    id: "faq-3",
    q: "Can an individual apply without a registered startup entity?",
    a: "Absolutely. Under the SSIP 2.0 Grant Scheme, individuals and student teams can apply for prototyping grants without having a registered company. Once your prototype is validated, GUIITAR assists you in legal incorporation.",
    category: "Innovation",
  },
  {
    id: "faq-4",
    q: "What funding support is available at GUIITAR Council?",
    a: "We offer three official non-dilutive grant tracks: 1) SSIP 2.0 Grant (Up to ₹2.5 Lakhs for students/alumni, and up to ₹20,000 for school students), 2) Gujarat Industrial Policy 2020 Scheme (Up to ₹30 Lakhs for growth startups), and 3) IPR Support Scheme (Up to ₹1.5 Lakhs for patent drafting and filing).",
    category: "Funding",
  },
  {
    id: "faq-5",
    q: "What is SSIP 2.0?",
    a: "Student Startup and Innovation Policy 2.0 (SSIP 2.0) is a flagship initiative of the Government of Gujarat that provides non-dilutive grant funding and mentorship to students and young innovators to turn concepts into viable prototypes.",
    category: "Funding",
  },
  {
    id: "faq-6",
    q: "How does GUIITAR help with IPR and Patents?",
    a: "GUIITAR Council maintains a dedicated IPR Cell with registered Indian Patent Attorneys. We assist with prior-art novelty searches, drafting comprehensive patent claims, filing official documents with the Indian Patent Office, and reimbursing statutory fees up to ₹1.5 Lakhs per patent.",
    category: "IPR",
  },
];

const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-101",
    type: "Incubation Suite",
    applicant: "HydroSense IoT Systems",
    email: "contact@hydrosense.tech",
    phone: "+91 98250 11223",
    organization: "Student Startup Team",
    projectTitle: "HydroSense Telemetry",
    stage: "MVP",
    fundingRequested: "₹1,50,000",
    summary: "Request for 4 workbenches and wet chemistry prototyping lab in Anviksha building.",
    date: "2026-09-24",
    status: "Pending",
  },
  {
    id: "app-102",
    type: "Innovation Grant",
    applicant: "AeroVanguard UAV Team",
    email: "yash.rana@gsfcuniversity.ac.in",
    phone: "+91 99099 87123",
    organization: "GSFC University (Mechanical)",
    projectTitle: "AeroVanguard Autonomous UAV",
    stage: "Prototype",
    fundingRequested: "₹2,00,000 (SSIP 2.0)",
    summary: "SSIP 2.0 grant request of ₹2,00,000 for thermal FLIR sensor payloads.",
    date: "2026-09-24",
    status: "Pending",
  },
  {
    id: "app-103",
    type: "Mentorship Request",
    applicant: "Pooja Shah",
    email: "pooja.s@gsfcuniversity.ac.in",
    phone: "+91 97123 44556",
    organization: "School of Science",
    projectTitle: "Phytochemical Isolation",
    stage: "Research",
    fundingRequested: "None",
    summary: "Requesting 1-on-1 HPLC bio-fractionation mentorship with Dr. Rajeshwari Nair.",
    date: "2026-09-22",
    status: "Approved",
  },
  {
    id: "app-104",
    type: "Partnership Inquiry",
    applicant: "Reliance Foundation CSR",
    email: "innovate@reliance.com",
    phone: "+91 22 4477 0000",
    organization: "Reliance Industries Limited",
    projectTitle: "Corporate Matching Grants",
    stage: "Scale",
    fundingRequested: "CSR Allocation",
    summary: "Exploring bilateral grant matching fund for GSFC University clean-tech prototypes.",
    date: "2026-09-20",
    status: "Approved",
  },
];

const INITIAL_USERS: UserAccount[] = [
  {
    id: "usr-1",
    name: "Prof. G. R. Sinha",
    email: "admin@guiitar.org",
    role: "Super Admin",
    department: "Provost Office & GUIITAR Council",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "usr-2",
    name: "KiranKumar Parmar",
    email: "kiran.parmar@gsfcuniversity.ac.in",
    role: "Innovation Manager",
    department: "Incubation Operations & SSIP Cell",
    status: "Active",
    lastActive: "10 mins ago",
  },
  {
    id: "usr-3",
    name: "Dr. Jignesh Valand",
    email: "jignesh.valand@gsfcuniversity.ac.in",
    role: "Reviewer",
    department: "School of Science",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "usr-4",
    name: "Mr. Amit Duggal",
    email: "amit.duggal@gsfcuniversity.ac.in",
    role: "Innovation Manager",
    department: "Prototyping & Drone Laboratories",
    status: "Active",
    lastActive: "1 day ago",
  },
];

const INITIAL_SETTINGS: SystemSettings = {
  institutionName: "GUIITAR Council (GSFC University)",
  nodalOfficer: "KiranKumar Parmar",
  contactEmail: "guiitar@gsfcuniversity.ac.in",
  contactPhone: "+91 265 3093740",
  ssipPortalActive: true,
  autoAssignReviewers: true,
  emailAlertsOnSubmission: true,
  publicShowcaseLive: true,
};

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New Innovation Submitted",
    message: "AeroVanguard Autonomous UAV Pipeline Inspector submitted by Yashwardhan Rana.",
    type: "idea",
    link: "/admin/ideas/idea-004",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif-2",
    title: "New Startup Incubation Request",
    message: "HydroSense IoT telemetry startup applied for Anviksha co-working suites.",
    type: "startup",
    link: "/admin/applications",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "notif-3",
    title: "Workshop Registration Milestone",
    message: "Autonomous Drone Workshop has reached 45/50 confirmed seat bookings.",
    type: "event",
    link: "/admin/events",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "notif-4",
    title: "MOU Partnership Inquiry",
    message: "Reliance CSR Innovation wing requested bilateral discussion on student grants.",
    type: "partner",
    link: "/admin/partners",
    timestamp: "1 day ago",
    read: true,
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit-001",
    adminName: "Prof. G. R. Sinha",
    action: "Published Innovation",
    targetRecord: "Ayurtrix — Botanical Phytochemical Standardization",
    recordType: "Idea",
    timestamp: "2026-09-20 14:15",
    details: "Approved for public Innovation Showcase display after ISC review.",
  },
  {
    id: "audit-002",
    adminName: "KiranKumar Parmar",
    action: "Sanctioned Grant Tranche",
    targetRecord: "Bacterial Chroma (₹1,70,000)",
    recordType: "Funding",
    timestamp: "2026-09-18 16:00",
    details: "Released procurement milestone tranche under SSIP 2.0 governance.",
  },
  {
    id: "audit-003",
    adminName: "Amit Duggal",
    action: "Approved Lab Access",
    targetRecord: "AeroVanguard Autonomous UAV",
    recordType: "Infrastructure",
    timestamp: "2026-09-25 09:15",
    details: "Granted Drone Lab testing slot for autonomous flight rigs.",
  },
];

const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  {
    id: "reg-001",
    ticketId: "GUI-2026-REG-1049",
    studentName: "Aarav Patel",
    enrollmentNo: "22BT04019",
    email: "aarav.patel@gsfcuniversity.ac.in",
    phone: "+91 98251 12345",
    department: "Biotechnology",
    eventId: "ev-1",
    eventTitle: "Autonomous Drone Technology & Aerodynamics Workshop",
    registrationDate: "2026-10-10",
    status: "Registered",
    semester: "7th Sem",
    notes: "Lead innovator for Ayurtrix",
  },
  {
    id: "reg-002",
    ticketId: "GUI-2026-REG-1050",
    studentName: "Pooja Shah",
    enrollmentNo: "22BT04032",
    email: "pooja.shah@gsfcuniversity.ac.in",
    phone: "+91 98252 23456",
    department: "Biotechnology",
    eventId: "ev-1",
    eventTitle: "Autonomous Drone Technology & Aerodynamics Workshop",
    registrationDate: "2026-10-11",
    status: "Attended",
    semester: "7th Sem",
    notes: "Analytical Chemist",
  },
  {
    id: "reg-003",
    ticketId: "GUI-2026-REG-1051",
    studentName: "Devanshi Trivedi",
    enrollmentNo: "23BT03014",
    email: "devanshi.t@gsfcuniversity.ac.in",
    phone: "+91 97241 87654",
    department: "Biotechnology",
    eventId: "ev-2",
    eventTitle: "Deep Learning & AI Acceleration on Param Shavak Supercomputer",
    registrationDate: "2026-10-18",
    status: "Registered",
    semester: "5th Sem",
    notes: "Bacterial Chroma Lead",
  },
  {
    id: "reg-004",
    ticketId: "GUI-2026-REG-1052",
    studentName: "Yashwardhan Rana",
    enrollmentNo: "22ME02041",
    email: "yash.rana@gsfcuniversity.ac.in",
    phone: "+91 99099 87123",
    department: "Mechanical Engineering",
    eventId: "ev-1",
    eventTitle: "Autonomous Drone Technology & Aerodynamics Workshop",
    registrationDate: "2026-09-28",
    status: "Registered",
    semester: "7th Sem",
    notes: "AeroVanguard Pilot",
  },
  {
    id: "reg-005",
    ticketId: "GUI-2026-REG-1053",
    studentName: "Kunal Verma",
    enrollmentNo: "23CH01008",
    email: "kunal.verma@gsfcuniversity.ac.in",
    phone: "+91 94081 23456",
    department: "Chemical Engineering",
    eventId: "ev-3",
    eventTitle: "SSIP 2.0 Institutional Pitch & Grant Screening Call",
    registrationDate: "2026-10-02",
    status: "Registered",
    semester: "5th Sem",
    notes: "Bio-Lastic team lead",
  },
  {
    id: "reg-006",
    ticketId: "GUI-2026-REG-1054",
    studentName: "Rohan Mehta",
    enrollmentNo: "24CS05088",
    email: "rohan.mehta@gsfcuniversity.ac.in",
    phone: "+91 98795 33412",
    department: "Computer Science & Eng",
    eventId: "ev-2",
    eventTitle: "Deep Learning & AI Acceleration on Param Shavak Supercomputer",
    registrationDate: "2026-10-05",
    status: "Attended",
    semester: "3rd Sem",
    notes: "CUDA parallel training participant",
  },
  {
    id: "reg-007",
    ticketId: "GUI-2026-REG-1055",
    studentName: "Ananya Desai",
    enrollmentNo: "22CS05012",
    email: "ananya.desai@gsfcuniversity.ac.in",
    phone: "+91 91234 56780",
    department: "Computer Science & Eng",
    eventId: "ev-4",
    eventTitle: "Intellectual Property & Patent Claim Drafting Masterclass",
    registrationDate: "2026-09-15",
    status: "Registered",
    semester: "7th Sem",
    notes: "Patent filing consultation request",
  },
  {
    id: "reg-008",
    ticketId: "GUI-2026-REG-1056",
    studentName: "Harshil Joshi",
    enrollmentNo: "23BT03022",
    email: "harshil.j@gsfcuniversity.ac.in",
    phone: "+91 98980 44556",
    department: "Biotechnology",
    eventId: "ev-4",
    eventTitle: "Intellectual Property & Patent Claim Drafting Masterclass",
    registrationDate: "2026-09-18",
    status: "Cancelled",
    semester: "5th Sem",
    notes: "Schedule conflict",
  },
];

// STORAGE KEYS
const STORAGE_IDEAS_KEY = "guiitar_ideas_data_v1";
const STORAGE_CATEGORIES_KEY = "guiitar_categories_data_v1";
const STORAGE_STARTUPS_KEY = "guiitar_startups_data_v1";
const STORAGE_EVENTS_KEY = "guiitar_events_data_v1";
const STORAGE_REGISTRATIONS_KEY = "guiitar_registrations_data_v1";
const STORAGE_MENTORS_KEY = "guiitar_mentors_data_v1";
const STORAGE_PROGRAMS_KEY = "guiitar_programs_data_v1";
const STORAGE_FUNDING_KEY = "guiitar_funding_data_v1";
const STORAGE_RESOURCES_KEY = "guiitar_resources_data_v1";
const STORAGE_PARTNERS_KEY = "guiitar_partners_data_v1";
const STORAGE_FAQS_KEY = "guiitar_faqs_data_v1";
const STORAGE_APPLICATIONS_KEY = "guiitar_applications_data_v1";
const STORAGE_USERS_KEY = "guiitar_users_data_v1";
const STORAGE_SETTINGS_KEY = "guiitar_settings_data_v1";
const STORAGE_NOTIF_KEY = "guiitar_notifs_data_v1";
const STORAGE_AUDIT_KEY = "guiitar_audit_data_v1";

export class AdminDataStore {
  private static getStored<T>(key: string, defaultVal: T): T {
    if (typeof window === "undefined") return defaultVal;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultVal;
      const parsed = JSON.parse(stored);
      return parsed !== null && parsed !== undefined ? parsed : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setStored<T>(key: string, val: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (err) {
      console.warn(`AdminDataStore storage write warning for key "${key}":`, err);
    }
    try {
      window.dispatchEvent(new Event("guiitar_store_update"));
    } catch {}
  }

  // ================= 1. IDEAS CRUD =================
  static getIdeas(): IdeaItem[] {
    return this.getStored<IdeaItem[]>(STORAGE_IDEAS_KEY, INITIAL_IDEAS);
  }

  static getIdeaById(id: string): IdeaItem | undefined {
    return this.getIdeas().find((i) => i.id === id || i.slug === id || i.refId === id);
  }

  static getPublishedIdeas(): IdeaItem[] {
    return this.getIdeas().filter((i) => i.status === "Published");
  }

  static saveIdea(idea: Partial<IdeaItem> & { title: string }): IdeaItem {
    const ideas = this.getIdeas();
    const existingIndex = ideas.findIndex((i) => i.id === idea.id);

    const now = new Date().toISOString();
    const refNum = (ideas.length + 1).toString().padStart(4, "0");
    const refId = idea.refId || `GUI-IDEA-2026-${refNum}`;
    const slug =
      idea.slug ||
      idea.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    let savedItem: IdeaItem;

    if (existingIndex >= 0) {
      savedItem = {
        ...ideas[existingIndex],
        ...idea,
        updatedAt: now,
      } as IdeaItem;
      ideas[existingIndex] = savedItem;
      this.addAuditLog(
        "Admin User",
        "Updated Innovation Record",
        savedItem.title,
        "Idea",
        `Status: ${savedItem.status}`,
      );
    } else {
      savedItem = {
        id: idea.id || `idea-${Date.now()}`,
        refId,
        slug,
        title: idea.title,
        shortDescription: idea.shortDescription || "",
        detailedDescription: idea.detailedDescription || "",
        category: idea.category || "DeepTech",
        subcategory: idea.subcategory || "",
        technology: idea.technology || "",
        stage: idea.stage || "Idea",
        creatorType: idea.creatorType || "Student",
        creatorName: idea.creatorName || "Anonymous Innovator",
        creatorEmail: idea.creatorEmail || "",
        creatorPhone: idea.creatorPhone || "",
        department: idea.department || "GSFC University",
        university: idea.university || "GSFC University, Vadodara",
        teamMembers: idea.teamMembers || [],
        problemStatement: idea.problemStatement || "",
        proposedSolution: idea.proposedSolution || "",
        innovationUsp: idea.innovationUsp || "",
        technologyUsed: idea.technologyUsed || "",
        targetUsers: idea.targetUsers || "",
        industry: idea.industry || "",
        thrustArea: idea.thrustArea || "General Innovation",
        coverImage:
          idea.coverImage ||
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
        galleryImages: idea.galleryImages || [],
        videoUrl: idea.videoUrl || "",
        demoUrl: idea.demoUrl || "",
        githubUrl: idea.githubUrl || "",
        websiteUrl: idea.websiteUrl || "",
        expectedImpact: idea.expectedImpact || "",
        socialImpact: idea.socialImpact || "",
        environmentalImpact: idea.environmentalImpact || "",
        economicImpact: idea.economicImpact || "",
        sdgAlignment: idea.sdgAlignment || [],
        supportRequired: idea.supportRequired || ["Mentorship", "Funding"],
        visibility: idea.visibility || "Public",
        status: idea.status || "Pending Review",
        isFeatured: idea.isFeatured || false,
        submittedAt: now,
        updatedAt: now,
        comments: [],
        activities: [
          {
            id: `act-${Date.now()}`,
            action: "Idea Created / Submitted",
            admin: idea.creatorName || "Innovator",
            timestamp: new Date().toLocaleString(),
          },
        ],
      };
      ideas.unshift(savedItem);

      this.addNotification({
        title: "New Idea Submitted",
        message: `${savedItem.title} (${savedItem.refId}) was submitted.`,
        type: "idea",
        link: `/admin/ideas/${savedItem.id}`,
      });

      this.addAuditLog(
        savedItem.creatorName,
        "Submitted New Innovation",
        savedItem.title,
        "Idea",
        `Ref ID: ${savedItem.refId}`,
      );
    }

    this.setStored(STORAGE_IDEAS_KEY, ideas);
    // Asynchronously sync to Neon Postgres
    NeonClient.saveIdea({
      id: savedItem.id,
      refId: savedItem.refId,
      slug: savedItem.slug,
      title: savedItem.title,
      innovator: savedItem.creatorName || "Innovator",
      teamMembers: savedItem.teamMembers || [],
      email: savedItem.creatorEmail || "innovator@gsfcuniversity.ac.in",
      phone: savedItem.creatorPhone || "",
      stage: savedItem.stage,
      category: savedItem.category,
      sector: savedItem.thrustArea,
      desc: savedItem.detailedDescription || savedItem.shortDescription || savedItem.title,
      problemStatement: savedItem.problemStatement,
      solutionDesc: savedItem.proposedSolution,
      novelty: savedItem.innovationUsp,
      patentStatus: "Not Filed",
      fundingRequired: "₹2.5 Lakhs",
      trlLevel: "TRL-3",
      status: savedItem.status,
    }).catch((err) => console.warn("Neon async saveIdea error:", err));
    return savedItem;
  }

  static updateIdeaStatus(
    id: string,
    status: IdeaStatus,
    adminName: string = "Admin",
    reason?: string,
  ): IdeaItem | null {
    const ideas = this.getIdeas();
    const index = ideas.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const item = ideas[index];
    item.status = status;
    item.updatedAt = new Date().toISOString();
    if (status === "Published") {
      item.publishedAt = new Date().toISOString();
      item.visibility = "Public";
    }
    if (reason) {
      item.rejectionReason = reason;
    }

    item.activities.push({
      id: `act-${Date.now()}`,
      action: `Status changed to ${status}`,
      admin: adminName,
      timestamp: new Date().toLocaleString(),
      details: reason,
    });

    ideas[index] = item;
    this.setStored(STORAGE_IDEAS_KEY, ideas);

    this.addAuditLog(
      adminName,
      `Changed status to ${status}`,
      item.title,
      "Idea",
      reason || `Status set to ${status}`,
    );
    NeonClient.saveIdea({
      id: item.id,
      refId: item.refId,
      slug: item.slug,
      title: item.title,
      innovator: item.creatorName,
      teamMembers: item.teamMembers,
      email: item.creatorEmail,
      phone: item.creatorPhone,
      stage: item.stage,
      category: item.category,
      sector: item.thrustArea,
      desc: item.detailedDescription || item.shortDescription,
      status: item.status,
    }).catch((err) => console.warn("Neon update status error:", err));
    return item;
  }

  static addIdeaComment(
    id: string,
    author: string,
    text: string,
    isInternal: boolean = true,
  ): IdeaComment | null {
    const ideas = this.getIdeas();
    const index = ideas.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const newComment: IdeaComment = {
      id: `com-${Date.now()}`,
      author,
      avatar: author
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2),
      text,
      createdAt: new Date().toISOString(),
      isInternal,
    };

    ideas[index].comments.push(newComment);
    ideas[index].activities.push({
      id: `act-${Date.now()}`,
      action: "Admin Internal Note Added",
      admin: author,
      timestamp: new Date().toLocaleString(),
      details: text.slice(0, 40) + "...",
    });

    this.setStored(STORAGE_IDEAS_KEY, ideas);
    return newComment;
  }

  static deleteIdea(id: string): boolean {
    const ideas = this.getIdeas();
    const item = ideas.find((i) => i.id === id);
    if (!item) return false;

    const filtered = ideas.filter((i) => i.id !== id);
    this.setStored(STORAGE_IDEAS_KEY, filtered);
    this.addAuditLog(
      "Admin",
      "Deleted Innovation Record",
      item.title,
      "Idea",
      `Ref ID: ${item.refId}`,
    );
    NeonClient.deleteIdea(id).catch((err) =>
      console.warn("Neon deleteIdea error:", err)
    );
    return true;
  }

  // ================= 2. CATEGORIES CRUD =================
  static getCategories(): CategoryItem[] {
    return this.getStored<CategoryItem[]>(STORAGE_CATEGORIES_KEY, INITIAL_CATEGORIES);
  }

  static saveCategory(category: Partial<CategoryItem> & { name: string }): CategoryItem {
    const categories = this.getCategories();
    const existingIndex = categories.findIndex((c) => c.id === category.id);
    let saved: CategoryItem;

    if (existingIndex >= 0) {
      saved = { ...categories[existingIndex], ...category };
      categories[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Category",
        saved.name,
        "Category",
        `Thrust: ${saved.thrustArea}`,
      );
    } else {
      saved = {
        id: category.id || `cat-${Date.now()}`,
        name: category.name,
        slug: category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: category.description || "",
        color: category.color || "#3b82f6",
        thrustArea: category.thrustArea || category.name,
        count: category.count || 0,
      };
      categories.push(saved);
      this.addAuditLog(
        "Admin",
        "Created Category",
        saved.name,
        "Category",
        `Thrust: ${saved.thrustArea}`,
      );
    }

    this.setStored(STORAGE_CATEGORIES_KEY, categories);
    return saved;
  }

  static deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const item = categories.find((c) => c.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_CATEGORIES_KEY,
      categories.filter((c) => c.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Category", item.name, "Category", "");
    return true;
  }

  // ================= 3. STARTUPS CRUD =================
  static getStartups(): StartupItem[] {
    return this.getStored<StartupItem[]>(STORAGE_STARTUPS_KEY, INITIAL_STARTUPS);
  }

  static getStartupById(id: string): StartupItem | undefined {
    return this.getStartups().find((s) => s.id === id);
  }

  static saveStartup(startup: Partial<StartupItem> & { name: string }): StartupItem {
    const startups = this.getStartups();
    const existingIndex = startups.findIndex((s) => s.id === startup.id);
    let saved: StartupItem;

    if (existingIndex >= 0) {
      saved = { ...startups[existingIndex], ...startup };
      startups[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Startup Record",
        saved.name,
        "Startup",
        `Stage: ${saved.stage}`,
      );
    } else {
      saved = {
        id: startup.id || `startup-${Date.now()}`,
        name: startup.name,
        tagline: startup.tagline || "",
        industry: startup.industry || "Technology",
        stage: startup.stage || "Incubated Startup",
        foundedYear: startup.foundedYear || new Date().getFullYear().toString(),
        technology: startup.technology || "",
        fundingReceived: startup.fundingReceived || "SSIP 2.0 Evaluated",
        description: startup.description || "",
        team: startup.team || "Founding Team",
        achievements: startup.achievements || [],
        patents: startup.patents || 0,
        tags: startup.tags || ["Incubated"],
        valuation: startup.valuation || "Seed",
        status: startup.status || "Incubated",
      };
      startups.unshift(saved);
      this.addNotification({
        title: "New Startup Added",
        message: `${saved.name} was registered in incubation roster.`,
        type: "startup",
        link: "/admin/startups",
      });
      this.addAuditLog(
        "Admin",
        "Created Startup Record",
        saved.name,
        "Startup",
        `Funding: ${saved.fundingReceived}`,
      );
    }

    this.setStored(STORAGE_STARTUPS_KEY, startups);
    // Asynchronously sync to Neon Postgres
    NeonClient.saveStartup({
      id: saved.id,
      name: saved.name,
      founders: typeof saved.team === "string" ? [saved.team] : (saved.team as string[]) || ["Founder"],
      domain: saved.industry || "DeepTech",
      batch: "Cohort 2026",
      fundingRaised: saved.fundingReceived || "Bootstrapped",
      description: saved.description || "",
      status: saved.status || "Incubated",
      patents: saved.patents || 0,
      valuation: saved.valuation || "Seed",
      tags: saved.tags || [],
    }).catch((err) => console.warn("Neon async saveStartup error:", err));
    return saved;
  }

  static deleteStartup(id: string): boolean {
    const startups = this.getStartups();
    const item = startups.find((s) => s.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_STARTUPS_KEY,
      startups.filter((s) => s.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Startup Record", item.name, "Startup", "");
    NeonClient.deleteStartup(id).catch((err) =>
      console.warn("Neon deleteStartup error:", err)
    );
    return true;
  }

  // ================= 4. EVENTS CRUD =================
  static getEvents(): EventItem[] {
    return this.getStored<EventItem[]>(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
  }

  static getEventById(id: string): EventItem | undefined {
    return this.getEvents().find((e) => e.id === id);
  }

  static saveEvent(event: Partial<EventItem> & { title: string }): EventItem {
    const events = this.getEvents();
    const existingIndex = events.findIndex((e) => e.id === event.id);
    let saved: EventItem;

    if (existingIndex >= 0) {
      const prev = events[existingIndex];
      const cap = event.capacity !== undefined ? event.capacity : prev.capacity;
      const reg = event.registered !== undefined ? event.registered : prev.registered;
      saved = {
        ...prev,
        ...event,
        capacity: cap,
        registered: reg,
        seats: event.seats || `${Math.max(0, cap - reg)} Seats Available`,
        isUpcoming:
          event.isUpcoming !== undefined
            ? event.isUpcoming
            : event.status === "Registration Open" || event.status === "Upcoming",
      };
      events[existingIndex] = saved;
      this.addAuditLog("Admin", "Updated Event", saved.title, "Event", `Date: ${saved.date}`);
    } else {
      const cap = event.capacity || 50;
      const reg = event.registered || 0;
      saved = {
        id: event.id || `ev-${Date.now()}`,
        title: event.title,
        date: event.date || "TBD",
        time: event.time || "10:00 AM – 04:00 PM",
        location: event.location || "GSFC University Campus",
        speaker: event.speaker || "GUIITAR Faculty & Experts",
        category: event.category || "Workshop",
        capacity: cap,
        registered: reg,
        status: event.status || "Registration Open",
        isUpcoming:
          event.isUpcoming !== undefined
            ? event.isUpcoming
            : event.status === "Registration Open" || event.status === "Upcoming",
        seats: event.seats || `${Math.max(0, cap - reg)} Seats Available`,
        desc: event.desc || "",
        topics: event.topics || [],
      };
      events.unshift(saved);
      this.addNotification({
        title: "New Event Scheduled",
        message: `${saved.title} has been scheduled for ${saved.date}.`,
        type: "event",
        link: "/admin/events",
      });
      this.addAuditLog("Admin", "Created Event", saved.title, "Event", `Date: ${saved.date}`);
    }

    this.setStored(STORAGE_EVENTS_KEY, events);
    // Asynchronously sync to Neon Postgres
    NeonClient.saveEvent(saved).catch((err) =>
      console.warn("Neon async saveEvent error:", err)
    );
    return saved;
  }

  static setEvents(events: EventItem[]): void {
    this.setStored(STORAGE_EVENTS_KEY, events);
  }

  static deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const item = events.find((e) => e.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_EVENTS_KEY,
      events.filter((e) => e.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Event", item.title, "Event", "");
    // Asynchronously delete from Neon Postgres
    NeonClient.deleteEvent(id).catch((err) =>
      console.warn("Neon async deleteEvent error:", err)
    );
    return true;
  }

  // ================= 4b. STUDENT REGISTRATIONS CRUD =================
  static getRegistrations(): RegistrationItem[] {
    return this.getStored<RegistrationItem[]>(STORAGE_REGISTRATIONS_KEY, INITIAL_REGISTRATIONS);
  }

  static getRegistrationById(id: string): RegistrationItem | undefined {
    return this.getRegistrations().find((r) => r.id === id || r.ticketId === id);
  }

  static saveRegistration(
    reg: Partial<RegistrationItem> & { studentName: string; email: string; eventTitle: string },
  ): RegistrationItem {
    const list = this.getRegistrations();
    const existingIndex = list.findIndex((r) => r.id === reg.id);
    let saved: RegistrationItem;

    if (existingIndex >= 0) {
      saved = {
        ...list[existingIndex],
        ...reg,
      };
      list[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Student Registration",
        `${saved.studentName} (${saved.ticketId})`,
        "Registration",
        `Event: ${saved.eventTitle} | Status: ${saved.status}`,
      );
    } else {
      const now = new Date();
      const ticketId =
        reg.ticketId ||
        `GUI-${now.getFullYear()}-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      saved = {
        id: reg.id || `reg-${Date.now()}`,
        ticketId,
        studentName: reg.studentName,
        enrollmentNo: reg.enrollmentNo || "N/A",
        email: reg.email,
        phone: reg.phone || "",
        department: reg.department || "Computer Science & Eng",
        eventId: reg.eventId || "",
        eventTitle: reg.eventTitle,
        registrationDate: reg.registrationDate || now.toISOString().split("T")[0],
        status: reg.status || "Registered",
        semester: reg.semester || "6th Sem",
        notes: reg.notes || "",
        createdAt: new Date().toISOString(),
      };
      list.unshift(saved);
      this.addNotification({
        title: "New Student Event Registration",
        message: `${saved.studentName} registered for ${saved.eventTitle}.`,
        type: "event",
        link: "/admin/registrations",
      });
      this.addAuditLog(
        "Admin",
        "Created Student Registration",
        `${saved.studentName} (${saved.ticketId})`,
        "Registration",
        `Event: ${saved.eventTitle}`,
      );
    }

    this.setStored(STORAGE_REGISTRATIONS_KEY, list);
    // Asynchronously sync to Neon Postgres
    NeonClient.saveRegistration(saved).catch((err) =>
      console.warn("Neon async saveRegistration error:", err),
    );
    return saved;
  }

  static updateRegistrationStatus(
    id: string,
    status: "Registered" | "Attended" | "Cancelled" | "Waitlisted",
  ): boolean {
    const list = this.getRegistrations();
    const item = list.find((r) => r.id === id);
    if (!item) return false;
    item.status = status;
    this.setStored(STORAGE_REGISTRATIONS_KEY, list);
    this.addAuditLog(
      "Admin",
      "Updated Registration Attendance",
      `${item.studentName} (${item.ticketId})`,
      "Registration",
      `New Status: ${status}`,
    );
    NeonClient.updateRegistrationStatus(id, status).catch((err) =>
      console.warn("Neon async updateRegistrationStatus error:", err),
    );
    return true;
  }

  static setRegistrations(regs: RegistrationItem[]): void {
    this.setStored(STORAGE_REGISTRATIONS_KEY, regs);
  }

  static deleteRegistration(id: string): boolean {
    const list = this.getRegistrations();
    const item = list.find((r) => r.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_REGISTRATIONS_KEY,
      list.filter((r) => r.id !== id),
    );
    this.addAuditLog(
      "Admin",
      "Deleted Student Registration",
      `${item.studentName} (${item.ticketId})`,
      "Registration",
      `Event: ${item.eventTitle}`,
    );
    // Asynchronously delete from Neon Postgres
    NeonClient.deleteRegistration(id).catch((err) =>
      console.warn("Neon async deleteRegistration error:", err),
    );
    return true;
  }

  // ================= 5. MENTORS CRUD =================
  static getMentors(): MentorItem[] {
    return this.getStored<MentorItem[]>(STORAGE_MENTORS_KEY, INITIAL_MENTORS);
  }

  static getMentorById(id: string): MentorItem | undefined {
    return this.getMentors().find((m) => m.id === id);
  }

  static saveMentor(mentor: Partial<MentorItem> & { name: string }): MentorItem {
    const mentors = this.getMentors();
    const existingIndex = mentors.findIndex((m) => m.id === mentor.id);
    let saved: MentorItem;

    if (existingIndex >= 0) {
      saved = { ...mentors[existingIndex], ...mentor };
      mentors[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Mentor Profile",
        saved.name,
        "Mentor",
        `Domain: ${saved.domain}`,
      );
    } else {
      saved = {
        id: mentor.id || `men-${Date.now()}`,
        name: mentor.name,
        designation: mentor.designation || "Mentor & Domain Specialist",
        role: mentor.role || mentor.designation || "Mentor",
        domain: mentor.domain || "Technology",
        organization: mentor.organization || "GSFC University / GUIITAR Council",
        experience: mentor.experience || "5+ Years",
        expertise: mentor.expertise || ["Mentorship", "Innovation"],
        avatar:
          mentor.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        status: mentor.status || "Active",
      };
      mentors.unshift(saved);
      this.addAuditLog(
        "Admin",
        "Added Mentor Profile",
        saved.name,
        "Mentor",
        `Domain: ${saved.domain}`,
      );
    }

    this.setStored(STORAGE_MENTORS_KEY, mentors);
    return saved;
  }

  static deleteMentor(id: string): boolean {
    const mentors = this.getMentors();
    const item = mentors.find((m) => m.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_MENTORS_KEY,
      mentors.filter((m) => m.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Mentor Profile", item.name, "Mentor", "");
    return true;
  }

  // ================= 6. INCUBATION PROGRAMS CRUD =================
  static getPrograms(): IncubationProgram[] {
    return this.getStored<IncubationProgram[]>(STORAGE_PROGRAMS_KEY, INITIAL_PROGRAMS);
  }

  static saveProgram(prog: Partial<IncubationProgram> & { name: string }): IncubationProgram {
    const progs = this.getPrograms();
    const existingIndex = progs.findIndex((p) => p.id === prog.id);
    let saved: IncubationProgram;

    if (existingIndex >= 0) {
      saved = { ...progs[existingIndex], ...prog };
      progs[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Incubation Program",
        saved.name,
        "Program",
        `Grant: ${saved.grantSupport}`,
      );
    } else {
      saved = {
        id: prog.id || `prog-${Date.now()}`,
        name: prog.name,
        tagline: prog.tagline || "",
        duration: prog.duration || "6 Months",
        grantSupport: prog.grantSupport || "Up to ₹2,50,000",
        targetCohort: prog.targetCohort || "Student Innovators",
        description: prog.description || "",
        features: prog.features || [],
        eligibility: prog.eligibility || [],
        status: prog.status || "Active",
      };
      progs.unshift(saved);
      this.addAuditLog(
        "Admin",
        "Created Incubation Program",
        saved.name,
        "Program",
        `Grant: ${saved.grantSupport}`,
      );
    }

    this.setStored(STORAGE_PROGRAMS_KEY, progs);
    return saved;
  }

  static deleteProgram(id: string): boolean {
    const progs = this.getPrograms();
    const item = progs.find((p) => p.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_PROGRAMS_KEY,
      progs.filter((p) => p.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Incubation Program", item.name, "Program", "");
    return true;
  }

  // ================= 7. FUNDING SCHEMES CRUD =================
  static getFundingSchemes(): FundingScheme[] {
    return this.getStored<FundingScheme[]>(STORAGE_FUNDING_KEY, INITIAL_FUNDING);
  }

  static saveFundingScheme(scheme: Partial<FundingScheme> & { title: string }): FundingScheme {
    const schemes = this.getFundingSchemes();
    const existingIndex = schemes.findIndex((s) => s.id === scheme.id);
    let saved: FundingScheme;

    if (existingIndex >= 0) {
      saved = { ...schemes[existingIndex], ...scheme };
      schemes[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Funding Scheme",
        saved.title,
        "Funding",
        `Grant: ${saved.maxGrant}`,
      );
    } else {
      saved = {
        id: scheme.id || `scheme-${Date.now()}`,
        title: scheme.title,
        agency: scheme.agency || "Government of Gujarat",
        maxGrant: scheme.maxGrant || "Up to ₹2,50,000",
        type: scheme.type || "Non-Dilutive Grant",
        description: scheme.description || "",
        eligibility: scheme.eligibility || "",
        stagesCovered: scheme.stagesCovered || ["Prototype", "MVP"],
        timeline: scheme.timeline || "Quarterly Cycle",
        status: scheme.status || "Active",
      };
      schemes.unshift(saved);
      this.addAuditLog(
        "Admin",
        "Created Funding Scheme",
        saved.title,
        "Funding",
        `Grant: ${saved.maxGrant}`,
      );
    }

    this.setStored(STORAGE_FUNDING_KEY, schemes);
    return saved;
  }

  static deleteFundingScheme(id: string): boolean {
    const schemes = this.getFundingSchemes();
    const item = schemes.find((s) => s.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_FUNDING_KEY,
      schemes.filter((s) => s.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Funding Scheme", item.title, "Funding", "");
    return true;
  }

  // ================= 8. RESOURCES CRUD =================
  static getResources(): ResourceDoc[] {
    return this.getStored<ResourceDoc[]>(STORAGE_RESOURCES_KEY, INITIAL_RESOURCES);
  }

  static saveResource(res: Partial<ResourceDoc> & { title: string }): ResourceDoc {
    const list = this.getResources();
    const existingIndex = list.findIndex((r) => r.id === res.id);
    let saved: ResourceDoc;

    if (existingIndex >= 0) {
      saved = { ...list[existingIndex], ...res };
      list[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Knowledge Resource",
        saved.title,
        "Resource",
        `Category: ${saved.category}`,
      );
    } else {
      saved = {
        id: res.id || `doc-${Date.now()}`,
        title: res.title,
        category: res.category || "Policy Document",
        format: res.format || "PDF",
        size: res.size || "1.2 MB",
        updated: res.updated || "Just now",
        description: res.description || "",
        downloads: res.downloads || 0,
        link: res.link || "#",
        isPublic: res.isPublic !== undefined ? res.isPublic : true,
      };
      list.unshift(saved);
      this.addAuditLog(
        "Admin",
        "Uploaded Knowledge Resource",
        saved.title,
        "Resource",
        `Format: ${saved.format}`,
      );
    }

    this.setStored(STORAGE_RESOURCES_KEY, list);
    return saved;
  }

  static deleteResource(id: string): boolean {
    const list = this.getResources();
    const item = list.find((r) => r.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_RESOURCES_KEY,
      list.filter((r) => r.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Knowledge Resource", item.title, "Resource", "");
    return true;
  }

  // ================= 9. PARTNERS CRUD =================
  static getPartners(): PartnerItem[] {
    return this.getStored<PartnerItem[]>(STORAGE_PARTNERS_KEY, INITIAL_PARTNERS);
  }

  static savePartner(partner: Partial<PartnerItem> & { name: string }): PartnerItem {
    const list = this.getPartners();
    const existingIndex = list.findIndex((p) => p.id === partner.id);
    let saved: PartnerItem;

    if (existingIndex >= 0) {
      saved = { ...list[existingIndex], ...partner };
      list[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Strategic Partner",
        saved.name,
        "Partner",
        `Status: ${saved.mouStatus}`,
      );
    } else {
      saved = {
        id: partner.id || `pt-${Date.now()}`,
        name: partner.name,
        category: partner.category || "Industry",
        scope: partner.scope || "",
        mouStatus: partner.mouStatus || "Active MOU",
        signedDate: partner.signedDate || new Date().toISOString().split("T")[0],
      };
      list.unshift(saved);
      this.addNotification({
        title: "New Strategic Partner Added",
        message: `${saved.name} was registered under ${saved.category} partnerships.`,
        type: "partner",
        link: "/admin/partners",
      });
      this.addAuditLog(
        "Admin",
        "Added Strategic Partner",
        saved.name,
        "Partner",
        `Scope: ${saved.scope}`,
      );
    }

    this.setStored(STORAGE_PARTNERS_KEY, list);
    return saved;
  }

  static deletePartner(id: string): boolean {
    const list = this.getPartners();
    const item = list.find((p) => p.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_PARTNERS_KEY,
      list.filter((p) => p.id !== id),
    );
    this.addAuditLog("Admin", "Deleted Strategic Partner", item.name, "Partner", "");
    return true;
  }

  // ================= 10. FAQS CRUD =================
  static getFaqs(): FaqItem[] {
    return this.getStored<FaqItem[]>(STORAGE_FAQS_KEY, INITIAL_FAQS);
  }

  static saveFaq(faq: Partial<FaqItem> & { q: string; a: string }): FaqItem {
    const list = this.getFaqs();
    const existingIndex = list.findIndex((f) => f.id === faq.id || (faq.id && f.q === faq.q));
    let saved: FaqItem;

    if (existingIndex >= 0) {
      saved = { ...list[existingIndex], ...faq };
      list[existingIndex] = saved;
      this.addAuditLog(
        "Admin",
        "Updated Institutional FAQ",
        saved.q.slice(0, 30) + "...",
        "FAQ",
        `Category: ${saved.category}`,
      );
    } else {
      saved = {
        id: faq.id || `faq-${Date.now()}`,
        q: faq.q,
        a: faq.a,
        category: faq.category || "General",
        order: faq.order || list.length + 1,
      };
      list.unshift(saved);
      this.addAuditLog(
        "Admin",
        "Created Institutional FAQ",
        saved.q.slice(0, 30) + "...",
        "FAQ",
        `Category: ${saved.category}`,
      );
    }

    this.setStored(STORAGE_FAQS_KEY, list);
    return saved;
  }

  static deleteFaq(idOrQuestion: string): boolean {
    const list = this.getFaqs();
    const item = list.find((f) => f.id === idOrQuestion || f.q === idOrQuestion);
    if (!item) return false;
    this.setStored(
      STORAGE_FAQS_KEY,
      list.filter((f) => f.id !== idOrQuestion && f.q !== idOrQuestion),
    );
    this.addAuditLog("Admin", "Deleted Institutional FAQ", item.q.slice(0, 30) + "...", "FAQ", "");
    return true;
  }

  // ================= 11. APPLICATIONS CRUD =================
  static getApplications(): ApplicationItem[] {
    return this.getStored<ApplicationItem[]>(STORAGE_APPLICATIONS_KEY, INITIAL_APPLICATIONS);
  }

  static addApplication(
    app: Omit<ApplicationItem, "id" | "date" | "status"> & { status?: ApplicationItem["status"] },
  ): ApplicationItem {
    const list = this.getApplications();
    const saved: ApplicationItem = {
      id: `app-${Date.now()}`,
      type: app.type,
      applicant: app.applicant,
      email: app.email,
      phone: app.phone || "",
      organization: app.organization || "Independent",
      projectTitle: app.projectTitle || "",
      stage: app.stage || "Ideation",
      fundingRequested: app.fundingRequested || "",
      summary: app.summary,
      date: new Date().toISOString().split("T")[0],
      status: app.status || "Pending",
      notes: app.notes || "",
    };
    list.unshift(saved);
    this.setStored(STORAGE_APPLICATIONS_KEY, list);

    this.addNotification({
      title: `New ${app.type} Application`,
      message: `${app.applicant} submitted an application: "${app.projectTitle || app.summary.slice(0, 40)}"`,
      type: "application",
      link: "/admin/applications",
    });

    this.addAuditLog(
      app.applicant,
      `Submitted ${app.type}`,
      app.projectTitle || app.applicant,
      "Application",
      `Email: ${app.email}`,
    );
    return saved;
  }

  static updateApplicationStatus(
    id: string,
    status: ApplicationItem["status"],
    notes?: string,
  ): ApplicationItem | null {
    const list = this.getApplications();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    list[idx].status = status;
    if (notes) {
      list[idx].notes = notes;
    }

    this.setStored(STORAGE_APPLICATIONS_KEY, list);
    this.addAuditLog(
      "Admin",
      `Updated Application Status to ${status}`,
      list[idx].applicant,
      "Application",
      notes || `Status: ${status}`,
    );
    return list[idx];
  }

  // ================= 12. USERS CRUD =================
  static getUsers(): UserAccount[] {
    return this.getStored<UserAccount[]>(STORAGE_USERS_KEY, INITIAL_USERS);
  }

  static saveUser(user: Partial<UserAccount> & { name: string; email: string }): UserAccount {
    const list = this.getUsers();
    const existingIndex = list.findIndex((u) => u.id === user.id || u.email === user.email);
    let saved: UserAccount;

    if (existingIndex >= 0) {
      saved = { ...list[existingIndex], ...user };
      list[existingIndex] = saved;
      this.addAuditLog(
        "Super Admin",
        "Updated User Account",
        saved.name,
        "User",
        `Role: ${saved.role}`,
      );
    } else {
      saved = {
        id: user.id || `usr-${Date.now()}`,
        name: user.name,
        email: user.email,
        role: user.role || "Innovation Manager",
        department: user.department || "GSFC University",
        status: user.status || "Active",
        lastActive: "Just invited",
      };
      list.push(saved);
      this.addAuditLog(
        "Super Admin",
        "Created User Account",
        saved.name,
        "User",
        `Role: ${saved.role}`,
      );
    }

    this.setStored(STORAGE_USERS_KEY, list);
    return saved;
  }

  static deleteUser(id: string): boolean {
    const list = this.getUsers();
    const item = list.find((u) => u.id === id);
    if (!item) return false;
    this.setStored(
      STORAGE_USERS_KEY,
      list.filter((u) => u.id !== id),
    );
    this.addAuditLog(
      "Super Admin",
      "Deleted User Account",
      item.name,
      "User",
      `Email: ${item.email}`,
    );
    return true;
  }

  // ================= 13. SETTINGS =================
  static getSettings(): SystemSettings {
    return this.getStored<SystemSettings>(STORAGE_SETTINGS_KEY, INITIAL_SETTINGS);
  }

  static saveSettings(settings: Partial<SystemSettings>): SystemSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setStored(STORAGE_SETTINGS_KEY, updated);
    this.addAuditLog(
      "Admin",
      "Updated Institutional Portal Settings",
      "System Configuration",
      "Settings",
      "Portal preferences updated",
    );
    return updated;
  }

  // ================= 14. NOTIFICATIONS =================
  static getNotifications(): AdminNotification[] {
    return this.getStored<AdminNotification[]>(STORAGE_NOTIF_KEY, INITIAL_NOTIFICATIONS);
  }

  static addNotification(notif: Omit<AdminNotification, "id" | "timestamp" | "read">): void {
    const list = this.getNotifications();
    list.unshift({
      id: `notif-${Date.now()}`,
      ...notif,
      timestamp: "Just now",
      read: false,
    });
    this.setStored(STORAGE_NOTIF_KEY, list);
  }

  static markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      this.setStored(STORAGE_NOTIF_KEY, list);
    }
  }

  static markAllNotificationsRead(): void {
    const list = this.getNotifications().map((n) => ({ ...n, read: true }));
    this.setStored(STORAGE_NOTIF_KEY, list);
  }

  // ================= 15. AUDIT LOGS =================
  static getAuditLogs(): AuditLogEntry[] {
    return this.getStored<AuditLogEntry[]>(STORAGE_AUDIT_KEY, INITIAL_AUDIT_LOGS);
  }

  static addAuditLog(
    adminName: string,
    action: string,
    targetRecord: string,
    recordType: string,
    details: string,
  ): void {
    const list = this.getAuditLogs();
    list.unshift({
      id: `audit-${Date.now()}`,
      adminName,
      action,
      targetRecord,
      recordType,
      timestamp: new Date().toLocaleString(),
      details,
    });
    this.setStored(STORAGE_AUDIT_KEY, list.slice(0, 100)); // Cap at 100 entries
  }

  // ================= 16. GLOBAL DYNAMIC STATS =================
  static getStats() {
    const ideas = this.getIdeas();
    const startups = this.getStartups();
    const events = this.getEvents();
    const registrations = this.getRegistrations();
    const mentors = this.getMentors();
    const resources = this.getResources();
    const applications = this.getApplications();
    const partners = this.getPartners();
    const programs = this.getPrograms();
    const funding = this.getFundingSchemes();

    return {
      totalIdeas: ideas.length,
      publishedIdeas: ideas.filter((i) => i.status === "Published").length,
      pendingIdeas: ideas.filter(
        (i) => i.status === "Pending Review" || i.status === "Under Review",
      ).length,
      approvedIdeas: ideas.filter((i) => i.status === "Approved").length,
      draftIdeas: ideas.filter((i) => i.status === "Draft").length,
      totalStartups: startups.length,
      totalEvents: events.length,
      upcomingEvents: events.filter(
        (e) => e.isUpcoming || e.status === "Upcoming" || e.status === "Registration Open",
      ).length,
      totalRegistrations: registrations.length,
      attendedRegistrations: registrations.filter((r) => r.status === "Attended").length,
      totalMentors: mentors.length,
      totalResources: resources.length,
      totalApplications: applications.length,
      pendingApplications: applications.filter((a) => a.status === "Pending").length,
      totalPartners: partners.length,
      totalPrograms: programs.length,
      totalFundingSchemes: funding.length,
      totalGrantsDisbursed: "₹30L+",
    };
  }

  // ================= 17. NEON DATABASE BIDIRECTIONAL SYNC =================
  static async syncFromNeon(): Promise<void> {
    try {
      const results = await Promise.allSettled([
        NeonClient.getEvents(),
        NeonClient.getIdeas(),
        NeonClient.getStartups(),
        NeonClient.getRegistrations(),
      ]);

      const [eventsRes, ideasRes, startupsRes, regRes] = results;

      if (eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value) && eventsRes.value.length > 0) {
        this.setEvents(eventsRes.value);
      }
      if (ideasRes.status === "fulfilled" && Array.isArray(ideasRes.value) && ideasRes.value.length > 0) {
        this.setIdeas(ideasRes.value);
      }
      if (startupsRes.status === "fulfilled" && Array.isArray(startupsRes.value) && startupsRes.value.length > 0) {
        this.setStartups(startupsRes.value);
      }
      if (regRes.status === "fulfilled" && Array.isArray(regRes.value) && regRes.value.length > 0) {
        this.setRegistrations(regRes.value);
      }
      try {
        window.dispatchEvent(new Event("guiitar_store_update"));
      } catch {}
    } catch (err) {
      console.warn("Neon bidirectional sync warning:", err);
    }
  }
}
