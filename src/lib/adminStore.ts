import { SupabaseDbClient } from "./supabaseClient";

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
  /** Absolute public path to the mentor's photo (e.g. /images/mentors/sudhir-gupta.jpeg).
   *  Replace with the real path once assets are provided. */
  imagePath?: string;
  /** Absolute public path to the mentor's profile document (e.g. /mentors/industry/documents/industry-mentor-01.pdf).
   *  Replace with the real path once documents are provided. */
  documentPath?: string;
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
      "3 Patent disclosures submitted for review",
      "Gujarat Startup Showcase Participant",
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
      "SSIP 2.0 Prototyping Grant",
      "Compostable biopolymer PoC",
      "500kg waste diversion (Pending Official Confirmation)",
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
      "Flight avionics test cell",
      "Thermal payload integration",
      "Industry pilot partner trials (Pending Official Confirmation)",
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
    speaker: "Prof. G. R. Sinha & Industrial Drone Pilots (Garuda Aerospace)",
    category: "Hardware & UAVs",
    capacity: 50,
    registered: 48,
    status: "Completed",
    isUpcoming: false,
    seats: "Event Concluded",
    desc: "An intensive, hands-on masterclass covering multi-rotor drone assembly, flight avionics, autonomous waypoint programming with ArduPilot, and DGCA drone compliance rules. 48 student innovators successfully completed hands-on flight trials.",
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
    registered: 35,
    status: "Completed",
    isUpcoming: false,
    seats: "Event Concluded",
    desc: "High-throughput model training, PyTorch distributed computing, and computer vision deployment tailored for student innovators with complex compute workloads. Successfully trained 12 distributed model benchmarks.",
    topics: [
      "CUDA parallel execution workflows on Param Shavak cluster",
      "Optimizing deep neural networks for real-time edge vision inference",
      "Submitting SLURM batch jobs & GPU partition allocation",
      "Multi-modal transformer architectures for medical & industrial datasets",
    ],
  },
  {
    id: "ev-past-1",
    title: "National Innovation Day Hackathon & Idea Sprint",
    date: "October 15, 2024",
    time: "09:00 AM – 06:00 PM IST",
    location: "Surjan Collaboration Arena, GSFC University",
    speaker: "GUIITAR Council & Institutional Screening Committee",
    category: "Hackathons",
    capacity: 120,
    registered: 118,
    status: "Completed",
    isUpcoming: false,
    seats: "Event Concluded",
    desc: "36-hour campus hackathon celebrating National Innovation Day. Over 118 students competed across 24 multidisciplinary teams, resulting in 18 prototypes sanctioned under SSIP 2.0 pre-incubation.",
    topics: [
      "Problem statement deconstruction & rapid prototyping",
      "Low-code MVP development and hardware bench testing",
      "Final jury evaluation & seed grant recommendation",
    ],
  },
  {
    id: "ev-past-2",
    title: "E-Club Inauguration & Student Ideation Clinic",
    date: "December 20, 2024",
    time: "10:00 AM – 03:00 PM IST",
    location: "2nd Floor Anviksha Auditorium, GSFC University",
    speaker: "Provost & Student Executive Council",
    category: "E-Club Event",
    capacity: 100,
    registered: 95,
    status: "Completed",
    isUpcoming: false,
    seats: "Event Concluded",
    desc: "Formal establishment and launch of the Entrepreneurship Club (E-Club) under GUIITAR Council with office bearer inductions and 12-team startup idea lightning pitches.",
    topics: [
      "E-Club vision, mission, and student leadership elections",
      "Accessing Makers Lab and 3D prototyping benches",
      "Collaborative circles across Engineering, Science & Management",
    ],
  },
  {
    id: "ev-3",
    title: "SSIP 2.0 Institutional Pitch & Grant Screening Call",
    date: "November 28, 2026",
    time: "02:00 PM – 06:00 PM IST",
    location: "GUIITAR Incubation Suite, 2nd Floor Anviksha",
    speaker: "Institutional Screening Committee (ISC)",
    category: "Grant Pitching",
    capacity: 30,
    registered: 18,
    status: "Registration Open",
    isUpcoming: true,
    seats: "12 Slots Remaining",
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
    date: "December 12, 2026",
    time: "11:00 AM – 03:00 PM IST",
    location: "Surjan Collaboration Arena, GSFC University",
    speaker: "Dr. Bhoomi Shah & Registered Indian Patent Attorneys",
    category: "IPR & Legal",
    capacity: 60,
    registered: 38,
    status: "Registration Open",
    isUpcoming: true,
    seats: "22 Seats Available",
    desc: "Practical clinic on prior-art search protocols, drafting provisional patent claims, and accessing the GUIITAR ₹1.5 Lakhs patent reimbursement grant.",
    topics: [
      "Conducting international prior-art searches on Google Patents & IPO databases",
      "Structuring independent and dependent patent claims",
      "Filing Form 1, Form 2, and Form 3 with the Indian Patent Office",
      "Avoiding non-patentable subject matter exclusions under Section 3",
    ],
  },
  {
    id: "ev-5",
    title: "E-Club Winter Deep-Tech Ideathon & 3D Prototyping Bootcamp",
    date: "January 09, 2027",
    time: "09:30 AM – 05:00 PM IST",
    location: "Makers Lab & Anviksha Innovation Hub",
    speaker: "E-Club Faculty Coordinators & Technical Associates",
    category: "Hands-on Workshop",
    capacity: 40,
    registered: 14,
    status: "Registration Open",
    isUpcoming: true,
    seats: "26 Seats Available",
    desc: "Hands-on fabrication sprint on converting validated CAD drawings into working physical models using SLA resin printers and laser cutters.",
    topics: [
      "3D printer slicing tolerances and wall thickness optimization",
      "Laser cutting toolpaths, kerf compensation, and interlocking joints",
      "Electronics enclosure testing and rapid circuit breadboarding",
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

  // ─────────────────────────────────────────────────────────────────────────────
  // INDUSTRY MENTORS (01–36) — real data; ind-men-37 = TiE Vadodara org card.
  // IDs are stable. Kept in sync with MENTOR_NETWORK in data.ts.
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ind-men-01",
    name: "Mr. Sudhir Gupta",
    designation: "Member, Strategic Advisory Board",
    role: "Member, Strategic Advisory Board",
    domain: "Industry",
    organization: "Millennium Alliance",
    experience: "Strategic advisor with experience in alliance-building, innovation policy and early-stage startup support.",
    expertise: ["Strategic Advisory", "Alliance Building", "Innovation Policy", "Startup Support"],
    avatar: "/images/mentors/sudhir-gupta.jpeg",
    imagePath: "/images/mentors/sudhir-gupta.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-01.pdf",
    status: "Active",
  },
  {
    id: "ind-men-02",
    name: "Prof. Dhruv Nath",
    designation: "Director",
    role: "Director",
    domain: "Industry",
    organization: "Lead Angels Network",
    experience: "Angel investor and startup mentor with extensive experience in venture evaluation and early-stage funding.",
    expertise: ["Angel Investing", "Venture Evaluation", "Startup Mentorship", "Early-Stage Funding"],
    avatar: "/images/mentors/dhruv-nath.jpg",
    imagePath: "/images/mentors/dhruv-nath.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-02.pdf",
    status: "Active",
  },
  {
    id: "ind-men-03",
    name: "Mr. Ravin Sanghavi",
    designation: "Founder",
    role: "Founder",
    domain: "Industry",
    organization: "Ravin Sanghavi & Associates",
    experience: "Founder and consultant with expertise in business development, legal advisory and entrepreneurship.",
    expertise: ["Business Development", "Legal Advisory", "Entrepreneurship", "Consulting"],
    avatar: "/images/mentors/ravin-sanghavi.jpg",
    imagePath: "/images/mentors/ravin-sanghavi.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-03.pdf",
    status: "Active",
  },
  {
    id: "ind-men-04",
    name: "Dr. Manoj Shukla",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "Gurukul Academy",
    experience: "CEO with experience in educational leadership, skill development and institution building.",
    expertise: ["Educational Leadership", "Skill Development", "Institution Building", "Mentorship"],
    avatar: "/images/mentors/manoj-shukla.jpg",
    imagePath: "/images/mentors/manoj-shukla.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-04.pdf",
    status: "Active",
  },
  {
    id: "ind-men-05",
    name: "Mr. Rupesh Shah",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "Barodaweb",
    experience: "CEO of a digital solutions company with expertise in web technology, digital marketing and SME enablement.",
    expertise: ["Web Technology", "Digital Marketing", "SME Enablement", "Business Strategy"],
    avatar: "/images/mentors/rupesh-shah.jpg",
    imagePath: "/images/mentors/rupesh-shah.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-05.pdf",
    status: "Active",
  },
  {
    id: "ind-men-06",
    // NOTE: No title prefix in screenshot — verify from document.
    name: "Kalpesh Shah",
    designation: "Director",
    role: "Director",
    domain: "Industry",
    organization: "Market Creators Ltd",
    experience: "Director with expertise in market strategy, business creation and corporate development.",
    expertise: ["Market Strategy", "Business Creation", "Corporate Development", "Sales"],
    avatar: "/images/mentors/kalpesh-shah.jpg",
    imagePath: "/images/mentors/kalpesh-shah.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-06.pdf",
    status: "Active",
  },
  {
    id: "ind-men-07",
    name: "Mr. Hitesh Porwal",
    designation: "Founder",
    role: "Founder",
    domain: "Industry",
    organization: "BIZSTART",
    experience: "Founder with experience in startup ecosystem development, business incubation and entrepreneurship coaching.",
    expertise: ["Startup Ecosystem", "Business Incubation", "Entrepreneurship Coaching", "MSME Support"],
    avatar: "/images/mentors/hitesh-porwal.jpg",
    imagePath: "/images/mentors/hitesh-porwal.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-07.pdf",
    status: "Active",
  },
  {
    id: "ind-men-08",
    name: "Mr. Bhavesh Kothari",
    designation: "Founder Director",
    role: "Founder Director",
    domain: "Industry",
    organization: "Billennium Divas Pvt Ltd",
    experience: "Founder Director with expertise in business strategy, organizational leadership and new venture creation.",
    expertise: ["Business Strategy", "Organizational Leadership", "Venture Creation", "Corporate Governance"],
    avatar: "/images/mentors/bhavesh-kothari.jpg",
    imagePath: "/images/mentors/bhavesh-kothari.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-08.pdf",
    status: "Active",
  },
  {
    id: "ind-men-09",
    name: "Adv. Bhavik B. Patel",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "INFINVENT IP",
    experience: "IP law professional and CEO specializing in intellectual property rights, patent prosecution and startup IP strategy.",
    expertise: ["Intellectual Property", "Patent Prosecution", "IP Strategy", "Legal Advisory"],
    avatar: "/images/mentors/bhavik-b-patel.jpg",
    imagePath: "/images/mentors/bhavik-b-patel.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-09.pdf",
    status: "Active",
  },
  {
    id: "ind-men-10",
    name: "Mr. Brijesh M. Garala",
    designation: "Director",
    role: "Director",
    domain: "Industry",
    organization: "Oviyan Cast & Forge Pvt. Ltd.",
    experience: "Director in manufacturing and heavy engineering with expertise in casting, forging and industrial operations.",
    expertise: ["Manufacturing", "Casting & Forging", "Industrial Operations", "Engineering"],
    avatar: "/images/mentors/brijesh-m-garala.jpg",
    imagePath: "/images/mentors/brijesh-m-garala.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-10.pdf",
    status: "Active",
  },
  {
    id: "ind-men-11",
    name: "Mr. Bhavesh Chelani",
    designation: "MD & CEO",
    role: "MD & CEO",
    domain: "Industry",
    organization: "Santushti Shakes Pvt. Ltd.",
    experience: "MD & CEO with experience in FMCG, food & beverage industry, franchise management and retail scaling.",
    expertise: ["FMCG", "Food & Beverage", "Franchise Management", "Retail Scaling"],
    avatar: "/images/mentors/bhavesh-chelani.jpg",
    imagePath: "/images/mentors/bhavesh-chelani.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-11.pdf",
    status: "Active",
  },
  {
    id: "ind-men-12",
    name: "Mr. Saurabh Jain",
    designation: "Founder",
    role: "Founder",
    domain: "Industry",
    organization: "FUN2DO Labs Pvt. Ltd.",
    experience: "Founder specializing in EdTech, experiential learning, STEM education and product innovation for children.",
    expertise: ["EdTech", "Experiential Learning", "STEM Education", "Product Innovation"],
    avatar: "/images/mentors/saurabh-jain.png",
    imagePath: "/images/mentors/saurabh-jain.png",
    documentPath: "/mentors/industry/documents/industry-mentor-12.pdf",
    status: "Active",
  },
  {
    id: "ind-men-13",
    name: "Dr. Kavita Saxena",
    designation: "Freelancer",
    role: "Freelancing Startup Mentor",
    domain: "Industry",
    organization: "Freelancing Startup Mentor",
    experience: "Independent startup mentor with experience in business advisory, market research and early-stage venture guidance.",
    expertise: ["Business Advisory", "Market Research", "Startup Mentoring", "Early-Stage Guidance"],
    avatar: "/images/mentors/kavita-saxena.jpg",
    imagePath: "/images/mentors/kavita-saxena.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-13.pdf",
    status: "Active",
  },
  {
    id: "ind-men-14",
    name: "Dr. Suresh P. Othayoth",
    designation: "Manager - Research",
    role: "Manager - Research",
    domain: "Industry",
    organization: "GSFC Ltd.",
    experience: "Research manager at GSFC Ltd. with expertise in chemical sciences, industrial R&D and applied research.",
    expertise: ["Chemical Sciences", "Industrial R&D", "Applied Research", "Process Innovation"],
    avatar: "/images/mentors/suresh-p-othayoth.jpg",
    imagePath: "/images/mentors/suresh-p-othayoth.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-14.pdf",
    status: "Active",
  },
  {
    id: "ind-men-15",
    name: "Mr. Ashutosh Tewari",
    designation: "Senior Venture Coach",
    role: "Senior Venture Coach",
    domain: "Industry",
    // NOTE: Verify exact legal name of GITAM university from document.
    organization: "GITAM (Deemed to be) University",
    experience: "Senior Venture Coach supporting deep-tech and social innovation startups through structured mentoring and business coaching.",
    expertise: ["Venture Coaching", "Deep-Tech Startups", "Social Innovation", "Business Coaching"],
    avatar: "/images/mentors/ashutosh-tewari.jpg",
    imagePath: "/images/mentors/ashutosh-tewari.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-15.pdf",
    status: "Active",
  },
  {
    id: "ind-men-16",
    name: "CA CS Chintan Popat",
    designation: "CA CS - Founder",
    role: "CA CS - Founder",
    domain: "Industry",
    organization: "CA Chintan Popat & Associates",
    experience: "Chartered Accountant and Company Secretary with expertise in finance, taxation, compliance and startup CFO advisory.",
    expertise: ["Chartered Accountancy", "Company Secretarial", "Taxation & Compliance", "CFO Advisory"],
    avatar: "/images/mentors/chintan-popat.jpg",
    imagePath: "/images/mentors/chintan-popat.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-16.pdf",
    status: "Active",
  },
  {
    id: "ind-men-17",
    name: "Mr. Devesh Chawla",
    designation: "Founder & CEO",
    role: "Founder & CEO",
    domain: "Industry",
    organization: "Chatur Ideas",
    experience: "Founder & CEO of a branding and marketing consultancy with expertise in brand strategy, content and growth marketing.",
    expertise: ["Brand Strategy", "Content Marketing", "Growth Marketing", "Business Development"],
    avatar: "/images/mentors/devesh-chawla.jpeg",
    imagePath: "/images/mentors/devesh-chawla.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-17.pdf",
    status: "Active",
  },
  {
    id: "ind-men-18",
    // NOTE: Organization not confirmed — verify from document.
    name: "Mr. Ashwin V. Parikh",
    designation: "Director, International Business Development (IBD)",
    role: "Director, International Business Development (IBD)",
    domain: "Industry",
    organization: "[Organisation — verify from document]",
    experience: "Director of International Business Development with expertise in global market entry, trade and cross-border partnerships.",
    expertise: ["International Business Development", "Global Market Entry", "Trade", "Cross-Border Partnerships"],
    avatar: "/images/mentors/ashwin-v-parikh.jpg",
    imagePath: "/images/mentors/ashwin-v-parikh.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-18.pdf",
    status: "Active",
  },
  {
    id: "ind-men-19",
    name: "Mr. Jekishan K. Parmar",
    designation: "Head of Sales & Technology",
    role: "Head of Sales & Technology",
    domain: "Industry",
    organization: "Aver India Equipment",
    experience: "Sales and technology leader with expertise in B2B sales, AV & IT equipment distribution and channel management.",
    expertise: ["B2B Sales", "AV & IT Equipment", "Channel Management", "Technology Sales"],
    avatar: "/images/mentors/jekishan-k-parmar.jpeg",
    imagePath: "/images/mentors/jekishan-k-parmar.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-19.pdf",
    status: "Active",
  },
  {
    id: "ind-men-20",
    name: "Mr. Amitkumar Patel",
    designation: "Managing Director",
    role: "Managing Director",
    domain: "Industry",
    organization: "Pactual IP Law Services LLP",
    experience: "Managing Director of an IP law services firm specializing in patent filing, IP portfolio management and legal consulting.",
    expertise: ["Patent Filing", "IP Portfolio Management", "Legal Consulting", "Intellectual Property"],
    avatar: "/images/mentors/amitkumar-patel.jpg",
    imagePath: "/images/mentors/amitkumar-patel.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-20.pdf",
    status: "Active",
  },
  {
    id: "ind-men-21",
    name: "Mr. Karan Shah",
    designation: "Head - Partnership & Outreach",
    role: "Head - Partnership & Outreach",
    domain: "Industry",
    organization: "Civitas Sustainability Foundation",
    experience: "Partnership and outreach leader focused on sustainability, CSR, social impact programs and corporate engagement.",
    expertise: ["Sustainability", "CSR", "Social Impact", "Partnership & Outreach"],
    avatar: "/images/mentors/karan-shah.jpg",
    imagePath: "/images/mentors/karan-shah.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-21.pdf",
    status: "Active",
  },
  {
    id: "ind-men-22",
    name: "Mr. Devang Patel",
    designation: "Founder",
    role: "Founder",
    domain: "Industry",
    organization: "Vantage Point Executive Coaching",
    experience: "Founder of an executive coaching practice with expertise in leadership development, coaching and organizational effectiveness.",
    expertise: ["Executive Coaching", "Leadership Development", "Organizational Effectiveness", "Mentoring"],
    avatar: "/images/mentors/devang-patel.jpg",
    imagePath: "/images/mentors/devang-patel.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-22.pdf",
    status: "Active",
  },
  {
    id: "ind-men-23",
    name: "Mr. Prakash Vaghasiya",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "Vise Organic",
    experience: "CEO with expertise in organic products, sustainable agriculture, agri-business and rural entrepreneurship.",
    expertise: ["Organic Products", "Sustainable Agriculture", "Agri-Business", "Rural Entrepreneurship"],
    avatar: "/images/mentors/prakash-vaghasiya.jpg",
    imagePath: "/images/mentors/prakash-vaghasiya.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-23.pdf",
    status: "Active",
  },
  {
    id: "ind-men-24",
    // NOTE: Verify full name and title prefix from document.
    name: "Mr. Javid Shaikh",
    designation: "Freelancing Consultant",
    role: "Freelancing Consultant",
    domain: "Industry",
    organization: "Independent Consultant",
    experience: "Independent consultant with expertise in business advisory, market strategy and startup mentoring.",
    expertise: ["Business Advisory", "Market Strategy", "Startup Mentoring", "Consulting"],
    avatar: "/images/mentors/javid-shaikh.jpg",
    imagePath: "/images/mentors/javid-shaikh.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-24.pdf",
    status: "Active",
  },
  {
    id: "ind-men-25",
    name: "Adv. Dr. Heena Patel",
    designation: "Partner",
    role: "Partner",
    domain: "Industry",
    organization: "INFINVENT IP",
    experience: "IP law partner and advocate with expertise in patent drafting, IP litigation, trademark and legal advisory for startups.",
    expertise: ["Patent Drafting", "IP Litigation", "Trademark", "Legal Advisory"],
    avatar: "/images/mentors/heena-patel.jpeg",
    imagePath: "/images/mentors/heena-patel.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-25.pdf",
    status: "Active",
  },
  {
    id: "ind-men-26",
    name: "Mr. Bhavik Bhansali",
    designation: "Senior Engineer",
    role: "Senior Engineer",
    domain: "Industry",
    organization: "L&T Technology Services",
    experience: "Senior Engineer at L&T Technology Services with expertise in engineering services, product development and R&D.",
    expertise: ["Engineering Services", "Product Development", "R&D", "Technology Consulting"],
    avatar: "/images/mentors/bhavik-bhansali.jpg",
    imagePath: "/images/mentors/bhavik-bhansali.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-26.pdf",
    status: "Active",
  },
  {
    id: "ind-men-27",
    name: "Mr. Akash Dadhania",
    designation: "Owner",
    role: "Owner",
    domain: "Industry",
    organization: "J K Fertilizers",
    experience: "Business owner in the agri-input sector with expertise in fertilizers, agricultural supply chain and rural markets.",
    expertise: ["Fertilizers", "Agricultural Supply Chain", "Rural Markets", "Agri-Business"],
    avatar: "/images/mentors/akash-dadhania.jpg",
    imagePath: "/images/mentors/akash-dadhania.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-27.pdf",
    status: "Active",
  },
  {
    id: "ind-men-28",
    name: "CA Jitendra Jain",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "Tapanshi Financial Pvt. Ltd.",
    experience: "Chartered Accountant and CEO specializing in financial services, investment advisory and wealth management.",
    expertise: ["Financial Services", "Investment Advisory", "Wealth Management", "Chartered Accountancy"],
    avatar: "/images/mentors/jitendra-jain.jpeg",
    imagePath: "/images/mentors/jitendra-jain.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-28.pdf",
    status: "Active",
  },
  {
    id: "ind-men-29",
    name: "Dr. Ashish Kumar",
    designation: "Associate Professor",
    role: "Associate Professor",
    domain: "Industry",
    organization: "Inter University Accelerator Center",
    experience: "Associate Professor and researcher at a national accelerator facility with expertise in physics research and academic mentoring.",
    expertise: ["Physics Research", "Accelerator Science", "Academic Mentoring", "Research & Development"],
    avatar: "/images/mentors/ashish-kumar.jpg",
    imagePath: "/images/mentors/ashish-kumar.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-29.pdf",
    status: "Active",
  },
  {
    id: "ind-men-30",
    // NOTE: No title prefix in screenshot — verify from document.
    name: "Nilesh Vaghhela",
    designation: "CEO",
    role: "CEO",
    domain: "Industry",
    organization: "Electromech Cloudtech Pvt. Ltd.",
    experience: "CEO of an electromechanical and cloud technology company with expertise in industrial automation and tech startups.",
    expertise: ["Industrial Automation", "Cloud Technology", "Electromechanical Systems", "Tech Startups"],
    avatar: "/images/mentors/nilesh-vaghela.jpg",
    imagePath: "/images/mentors/nilesh-vaghela.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-30.pdf",
    status: "Active",
  },
  {
    id: "ind-men-31",
    // NOTE: No title prefix in screenshot — verify from document.
    name: "Karmjitsinh Bihola",
    designation: "Founder",
    role: "Founder",
    domain: "Industry",
    organization: "Innodesk Designovation Services",
    experience: "Founder of a design and innovation services firm with expertise in product design, design thinking and prototyping.",
    expertise: ["Product Design", "Design Thinking", "Prototyping", "Innovation Services"],
    avatar: "/images/mentors/karmjitsinh-bihola.png",
    imagePath: "/images/mentors/karmjitsinh-bihola.png",
    documentPath: "/mentors/industry/documents/industry-mentor-31.pdf",
    status: "Active",
  },
  {
    id: "ind-men-32",
    name: "Mr. Anant Acharya",
    designation: "CTO",
    role: "CTO",
    domain: "Industry",
    // NOTE: Verify exact organisation spelling from document.
    organization: "MarsBazaar.com",
    experience: "CTO with expertise in e-commerce technology, platform architecture, software engineering and startup scaling.",
    expertise: ["E-Commerce Technology", "Platform Architecture", "Software Engineering", "Startup Scaling"],
    avatar: "/images/mentors/anant-acharya.jpg",
    imagePath: "/images/mentors/anant-acharya.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-32.pdf",
    status: "Active",
  },
  {
    id: "ind-men-33",
    name: "Mr. Shaurin Patel",
    designation: "MD & CEO",
    role: "MD & CEO",
    domain: "Industry",
    organization: "Vexma Technologies",
    experience: "MD & CEO of an advanced manufacturing and 3D printing technology company specializing in industrial prototyping and AM solutions.",
    expertise: ["3D Printing", "Advanced Manufacturing", "Industrial Prototyping", "Additive Manufacturing"],
    avatar: "/images/mentors/shaurin-patel.jpg",
    imagePath: "/images/mentors/shaurin-patel.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-33.pdf",
    status: "Active",
  },
  {
    id: "ind-men-34",
    name: "Mr. Baljeetsingh B. Sucharia",
    designation: "Co-founder",
    role: "Co-founder",
    domain: "Industry",
    organization: "LifeSecret Consultancy LLP",
    experience: "Co-founder of a wellness and lifestyle consultancy with expertise in health coaching, wellness programs and social enterprise.",
    expertise: ["Health Coaching", "Wellness Programs", "Social Enterprise", "Lifestyle Consultancy"],
    avatar: "/images/mentors/baljeetsingh-b-sucharia.jpeg",
    imagePath: "/images/mentors/baljeetsingh-b-sucharia.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-34.pdf",
    status: "Active",
  },
  {
    id: "ind-men-35",
    name: "Mr. Hemant Mishra",
    designation: "Independent Director",
    role: "Independent Director",
    domain: "Industry",
    organization: "Tech Defence Solutions Pvt. Ltd.",
    experience: "Independent Director with expertise in defence technology, corporate governance, strategic leadership and board advisory.",
    expertise: ["Defence Technology", "Corporate Governance", "Strategic Leadership", "Board Advisory"],
    avatar: "/images/mentors/hemant-mishra.jpg",
    imagePath: "/images/mentors/hemant-mishra.jpg",
    documentPath: "/mentors/industry/documents/industry-mentor-35.pdf",
    status: "Active",
  },
  {
    id: "ind-men-36",
    // NOTE: Full org name truncated in screenshot — verify from document.
    name: "Mr. Hemal Shah",
    designation: "CEO-Founder",
    role: "CEO-Founder",
    domain: "Industry",
    organization: "Bharat Technologies Pvt. Ltd. [verify full name from document]",
    experience: "CEO-Founder with expertise in technology entrepreneurship, product innovation and business scaling.",
    expertise: ["Technology Entrepreneurship", "Product Innovation", "Business Scaling", "Startup Leadership"],
    avatar: "/images/mentors/hemal-shah.jpeg",
    imagePath: "/images/mentors/hemal-shah.jpeg",
    documentPath: "/mentors/industry/documents/industry-mentor-36.pdf",
    status: "Active",
  },
  {
    // TiE Vadodara Mentors — organization/network card, not an individual profile.
    id: "ind-men-37",
    name: "TiE Vadodara Mentors",
    designation: "Industry Mentor Network",
    role: "Industry Mentor Network",
    domain: "Industry",
    organization: "TiE Vadodara",
    experience: "A network of experienced entrepreneurs, investors and industry leaders committed to fostering entrepreneurship.",
    expertise: ["Entrepreneurship", "Investor Network", "Startup Mentorship", "Industry Linkages"],
    avatar: "/images/mentors/tie-vadodara.svg",
    imagePath: "/images/mentors/tie-vadodara.svg",
    documentPath: "/mentors/industry/documents/industry-mentor-37.pdf",
    status: "Active",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FACULTY MENTORS (faculty-01 – faculty-11) — GSF University faculty profiles.
  // IDs are stable. Photos: /mentors/faculty/photos/industry-mentor-XX.avif
  // Documents: /mentors/faculty/documents/industry-mentor-XX.pdf
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "faculty-01",
    name: "Dr. Bharti Trivedi",
    designation: "Visiting Professor",
    role: "Visiting Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/bharti-trivedi.jpg",
    imagePath: "/images/original/faculty/bharti-trivedi.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-01.pdf",
    status: "Active",
  },
  {
    id: "faculty-02",
    name: "Dr. Devjani Banerjee",
    designation: "Professor",
    role: "Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/devjani-banerjee.jpg",
    imagePath: "/images/original/faculty/devjani-banerjee.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-02.pdf",
    status: "Active",
  },
  {
    id: "faculty-03",
    name: "Dr. Chetna Parmar",
    designation: "Associate Dean",
    role: "Associate Dean",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/chetna-parmar.jpg",
    imagePath: "/images/original/faculty/chetna-parmar.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-03.pdf",
    status: "Active",
  },
  {
    id: "faculty-04",
    name: "Dr. Sanjukta Bose Goswami",
    designation: "Dean, SoT & Associate Professor",
    role: "Dean, SoT & Associate Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/sanjukta-roy.png",
    imagePath: "/images/original/faculty/sanjukta-roy.png",
    documentPath: "/mentors/faculty/documents/industry-mentor-04.pdf",
    status: "Active",
  },
  {
    id: "faculty-05",
    name: "Ms. Patel Mosam",
    designation: "Sr. Assistant Professor",
    role: "Sr. Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/mosam-patel.png",
    imagePath: "/images/original/faculty/mosam-patel.png",
    documentPath: "/mentors/faculty/documents/industry-mentor-05.pdf",
    status: "Active",
  },
  {
    id: "faculty-06",
    name: "Dr. Arti Bhadouria",
    designation: "Assistant Professor",
    role: "Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/arti-bhadoria.png",
    imagePath: "/images/original/faculty/arti-bhadoria.png",
    documentPath: "/mentors/faculty/documents/industry-mentor-06.pdf",
    status: "Active",
  },
  {
    id: "faculty-07",
    name: "Dr. Parin Kanaiya",
    designation: "Sr. Assistant Professor",
    role: "Sr. Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/parin-kanaiya.jpg",
    imagePath: "/images/original/faculty/parin-kanaiya.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-07.pdf",
    status: "Active",
  },
  {
    id: "faculty-08",
    name: "Ms. Swati Saxena",
    designation: "Sr. Assistant Professor",
    role: "Sr. Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/swati-saxena.jpg",
    imagePath: "/images/original/faculty/swati-saxena.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-08.pdf",
    status: "Active",
  },
  {
    id: "faculty-09",
    name: "Dr. Akhilesh Prajapati",
    designation: "Associate Professor",
    role: "Associate Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/team/akhilesh-prajapati.png",
    imagePath: "/team/akhilesh-prajapati.png",
    documentPath: "/mentors/faculty/documents/industry-mentor-09.pdf",
    status: "Active",
  },
  {
    id: "faculty-10",
    name: "Ms. Archana Magare",
    designation: "Sr. Assistant Professor",
    role: "Sr. Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/archana-magare.png",
    imagePath: "/images/original/faculty/archana-magare.png",
    documentPath: "/mentors/faculty/documents/industry-mentor-10.pdf",
    status: "Active",
  },
  {
    id: "faculty-11",
    name: "Dr. Arti Hansda",
    designation: "Assistant Professor",
    role: "Assistant Professor",
    domain: "Faculty",
    organization: "GSFC University",
    experience: "Faculty Mentor, GSFC University",
    expertise: ["Academic Mentorship", "Research Guidance"],
    avatar: "/images/original/faculty/arti-hansda.jpg",
    imagePath: "/images/original/faculty/arti-hansda.jpg",
    documentPath: "/mentors/faculty/documents/industry-mentor-11.pdf",
    status: "Active",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BOARD OF DIRECTORS (board-01 – board-08)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "board-01",
    name: "Shri P. K. Taneja, IAS (Retd.)",
    designation: "President, GSFC University & Chairman, GUIITAR Council",
    role: "Chairman",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Former Additional Chief Secretary (Home / Forest & Environment), Govt. of Gujarat",
    expertise: ["Public Policy & Governance", "Institutional Leadership", "Strategic Planning", "Innovation Ecosystems"],
    avatar: "/leaders/pk-taneja.png",
    imagePath: "/leaders/pk-taneja.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-01.pdf",
    status: "Active",
  },
  {
    id: "board-02",
    name: "Prof. G. R. Sinha",
    designation: "Provost, GSFC University & CEO, GUIITAR Council",
    role: "Director & CEO, GUIITAR Council",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "25+ Years in Engineering Research & Academic Leadership",
    expertise: ["Biomedical Signal Processing", "AI/ML in Healthcare", "IPR Strategy", "Academic Entrepreneurship"],
    avatar: "/images/original/leadership/provost-gr-sinha.jpg",
    imagePath: "/images/original/leadership/provost-gr-sinha.jpg",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-02.pdf",
    status: "Active",
  },
  {
    id: "board-03",
    name: "Shri Utkarsh Yajnik",
    designation: "Director",
    role: "Director",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Board Director, GUIITAR Council",
    expertise: ["Corporate Governance", "Strategic Leadership", "Business Development"],
    avatar: "/images/original/board/utkarsh-yajnik.png",
    imagePath: "/images/original/board/utkarsh-yajnik.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-03.pdf",
    status: "Active",
  },
  {
    id: "board-04",
    name: "Mrs. Swati Bedekar",
    designation: "Director",
    role: "Director",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Social Entrepreneur, Founder Vatsalya Foundation & Director GUIITAR Council",
    expertise: ["Corporate Governance", "Strategic Leadership", "Innovation Policy"],
    avatar: "/images/original/board/swati-bedekar.png",
    imagePath: "/images/original/board/swati-bedekar.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-04.pdf",
    status: "Active",
  },
  {
    id: "board-05",
    name: "Dr. Pujan Vaishnav",
    designation: "Director",
    role: "Director",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Board Director, GUIITAR Council",
    expertise: ["Research & Development", "Innovation Ecosystems", "Strategic Advisory"],
    avatar: "/images/original/board/pujan-patel.png",
    imagePath: "/images/original/board/pujan-patel.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-05.pdf",
    status: "Active",
  },
  {
    id: "board-06",
    name: "Mr. Anupam Jalote",
    designation: "CEO, iCreate & Director, GUIITAR Council",
    role: "Director, GUIITAR Council",
    domain: "Board of Directors",
    organization: "iCreate / GUIITAR Council",
    experience: "Veteran incubator leader & former CEO iCreate",
    expertise: ["Incubation Strategy", "Deep-Tech Acceleration", "Industry Partnerships"],
    avatar: "/images/original/board/anupam-jalote.png",
    imagePath: "/images/original/board/anupam-jalote.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-06.pdf",
    status: "Active",
  },
  {
    id: "board-07",
    name: "Shri Ravin Sanghavi",
    designation: "Director",
    role: "Director",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Managing Partner, Venture Studio & Director GUIITAR Council",
    expertise: ["Early-stage Investing", "Startup Mentorship", "Commercialization"],
    avatar: "/images/original/board/ravin-sanghavi.png",
    imagePath: "/images/original/board/ravin-sanghavi.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-07.pdf",
    status: "Active",
  },
  {
    id: "board-08",
    name: "Shri Mahesh Barot",
    designation: "Director",
    role: "Director",
    domain: "Board of Directors",
    organization: "GUIITAR Council",
    experience: "Board Director, GUIITAR Council",
    expertise: ["Strategic Governance", "Operations", "Industry Relations"],
    avatar: "/images/original/board/mahesh-barot.png",
    imagePath: "/images/original/board/mahesh-barot.png",
    documentPath: "/mentors/Board of Directors/documents/industry-mentor-08.pdf",
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
    id: "doc-coworking-policy",
    title: "GUIITAR Co-Working Space Policy Guidelines",
    category: "Policy Document",
    format: "PDF",
    size: "1.1 MB",
    updated: "Sep 2026",
    description:
      "Official operational regulations governing dedicated work desks, conference room bookings, 24/7 security access, and lab safety rules.",
    downloads: 390,
    link: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_a36d4d47e2e74717acd42bab3ced339e.pdf",
    isPublic: true,
  },
  {
    id: "doc-startup-kit",
    title: "Official GUIITAR Startup Kit (Google Drive)",
    category: "Pitch Template",
    format: "DRIVE",
    size: "Cloud Folder",
    updated: "Sep 2026",
    description:
      "Direct Google Drive repository containing pitch deck templates, founder legal checklist, financial model spreadsheets, and mentor agreement drafts.",
    downloads: 820,
    link: "https://drive.google.com/drive/folders/1JXvxN1ys5SzgwIUpajSl8wWqYnuGjkkT",
    isPublic: true,
  },
  {
    id: "doc-book-lab",
    title: "Book Prototyping Lab & Supercomputer Slot (Online Form)",
    category: "Lab Guidelines",
    format: "FORM",
    size: "Online Form",
    updated: "Oct 2026",
    description:
      "Official Google Form to book prototyping slots for Param Shavak DL Supercomputer, 3D printing, laser cutters, and Drone Lab rigs.",
    downloads: 940,
    link: "https://forms.gle/EM81FwAN5i4S3FmcA",
    isPublic: true,
  },
  {
    id: "doc-annual-return",
    title: "Annual Statutory Return (Form MGT-7) — FY 2024-25",
    category: "Policy Document",
    format: "PDF",
    size: "1.8 MB",
    updated: "Sep 2026",
    description:
      "Official audited statutory annual return filing for GU Incubation Innovation Technology and Applied Research Council (Section 8 Company, CIN: U73100GJ2020NPL115782).",
    downloads: 320,
    link: "https://www.guiitarstartupcouncil.org/_files/ugd/ff2b71_36db0b5ca7c64cdca278b62636d850e6.pdf",
    isPublic: true,
  },
  {
    id: "doc-feedback",
    title: "GUIITAR Council Feedback & Grievance Portal",
    category: "Lab Guidelines",
    format: "FORM",
    size: "Online Form",
    updated: "Oct 2026",
    description:
      "Institutional feedback and suggestion mechanism for incubatees, students, and faculty regarding facilities, mentorship, and council services.",
    downloads: 410,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdUPGZkYa3Xwdqv-QV8w8kHIdWx42uYHXIJBGPmKk5NW0qTVg/viewform",
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
const STORAGE_EVENTS_KEY = "guiitar_events_data_v2";
const STORAGE_REGISTRATIONS_KEY = "guiitar_registrations_data_v1";
const STORAGE_MENTORS_KEY = "guiitar_mentors_data_v4";
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
    // Asynchronously sync to Supabase Postgres
    SupabaseDbClient.saveIdea({
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
    }).catch((err) => console.warn("Supabase async saveIdea error:", err));
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
    SupabaseDbClient.saveIdea({
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
    }).catch((err) => console.warn("Supabase update status error:", err));
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
    SupabaseDbClient.deleteIdea(id).catch((err) =>
      console.warn("Supabase deleteIdea error:", err)
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
    // Asynchronously sync to Supabase Postgres
    SupabaseDbClient.saveStartup({
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
    }).catch((err) => console.warn("Supabase async saveStartup error:", err));
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
    SupabaseDbClient.deleteStartup(id).catch((err) =>
      console.warn("Supabase deleteStartup error:", err)
    );
    return true;
  }

  // ================= 4. EVENTS CRUD =================
  static getEvents(): EventItem[] {
    const events = this.getStored<EventItem[]>(STORAGE_EVENTS_KEY, INITIAL_EVENTS);
    if (!Array.isArray(events) || events.length === 0) {
      return INITIAL_EVENTS;
    }
    if (typeof window !== "undefined" && Array.isArray(events)) {
      const ev3Idx = events.findIndex((e) => e.id === "ev-3");
      const defaultEv3 = INITIAL_EVENTS.find((e) => e.id === "ev-3");
      if (ev3Idx >= 0 && defaultEv3) {
        const storedEv3 = events[ev3Idx];
        // Distinguish unedited defaults from user edits:
        // If stored ev-3 retains an unedited stale default date or title, migrate to revised November 28 values
        const isUneditedDefault =
          storedEv3.date === "October 17, 2026" ||
          storedEv3.date === "October 20, 2026" ||
          storedEv3.title === "Autonomous Drone Technology & Aerodynamics Workshop" ||
          (storedEv3.title === defaultEv3.title && (storedEv3.date !== defaultEv3.date || storedEv3.status !== defaultEv3.status));

        if (isUneditedDefault) {
          events[ev3Idx] = {
            ...storedEv3,
            title: defaultEv3.title,
            date: defaultEv3.date,
            time: defaultEv3.time,
            location: defaultEv3.location,
            speaker: defaultEv3.speaker,
            category: defaultEv3.category,
            capacity: defaultEv3.capacity,
            registered: defaultEv3.registered,
            status: defaultEv3.status,
            isUpcoming: defaultEv3.isUpcoming,
            seats: defaultEv3.seats,
            desc: defaultEv3.desc,
            topics: defaultEv3.topics,
          };
          this.setStored(STORAGE_EVENTS_KEY, events);
        }
      }
    }
    return events;
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
    // Asynchronously sync to Supabase Postgres
    SupabaseDbClient.saveEvent(saved).catch((err) =>
      console.warn("Supabase async saveEvent error:", err)
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
    // Asynchronously delete from Supabase Postgres
    SupabaseDbClient.deleteEvent(id).catch((err) =>
      console.warn("Supabase async deleteEvent error:", err)
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
    // Asynchronously sync to Supabase Postgres
    SupabaseDbClient.saveRegistration(saved).catch((err) =>
      console.warn("Supabase async saveRegistration error:", err),
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
    SupabaseDbClient.updateRegistrationStatus(id, status).catch((err) =>
      console.warn("Supabase async updateRegistrationStatus error:", err),
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
    // Asynchronously delete from Supabase Postgres
    SupabaseDbClient.deleteRegistration(id).catch((err) =>
      console.warn("Supabase async deleteRegistration error:", err),
    );
    return true;
  }

  // ================= 5. MENTORS CRUD =================
  static getMentors(): MentorItem[] {
    const stored = this.getStored<MentorItem[]>(STORAGE_MENTORS_KEY, INITIAL_MENTORS);
    if (!Array.isArray(stored) || stored.length === 0) return INITIAL_MENTORS;
    // Auto-heal missing or stale avatars from INITIAL_MENTORS to prevent stale browser cache from breaking mentor photos
    return stored.map((m) => {
      const initial = INITIAL_MENTORS.find((im) => im.id === m.id);
      if (initial) {
        const hasValidInitial =
          initial.avatar &&
          (initial.avatar.startsWith("/images/") || initial.avatar.startsWith("/leaders/"));
        return {
          ...m,
          avatar: (hasValidInitial ? initial.avatar : m.avatar) || initial.avatar,
          imagePath: (hasValidInitial ? initial.imagePath : m.imagePath) || initial.imagePath,
          documentPath: initial.documentPath || m.documentPath,
        };
      }
      return m;
    });
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
    SupabaseDbClient.saveMentor(saved).catch((err) =>
      console.warn("Supabase async saveMentor error:", err)
    );
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
    SupabaseDbClient.deleteMentor(id).catch((err) =>
      console.warn("Supabase async deleteMentor error:", err)
    );
    return true;
  }

  /**
   * Bulk-replace the entire stored mentor list.
   * Used internally by migrateMentorData.
   */
  static setMentors(mentors: MentorItem[]): void {
    this.setStored(STORAGE_MENTORS_KEY, mentors);
  }

  /**
   * Safe upsert migration: merges the canonical INITIAL_MENTORS seed into the
   * currently stored array without overwriting admin-created or admin-edited
   * records.
   *
   * Rules:
   *  - Seed records whose domain is NOT in ACTIVE_DOMAINS are removed from
   *    localStorage (they belong to retired categories like Governance,
   *    Technology, Business, Research, Legal & IPR). Admin-created records
   *    with those same domain values are left untouched — only seed IDs
   *    (present in INITIAL_MENTORS) are eligible for removal.
   *  - For each record in INITIAL_MENTORS whose domain IS active, if a stored
   *    record with the same id already exists, update only the fields that still
   *    carry placeholder text (i.e. fields whose value starts with "[") —
   *    leaving any admin edits intact.
   *  - If no stored record matches the id, insert the INITIAL_MENTORS record at
   *    the end of the list (new seed record, never seen before).
   *  - Stored records whose ids do NOT appear in INITIAL_MENTORS are left
   *    completely untouched (admin-created records).
   *  - Fires guiitar_store_update when changes were made, so all listeners
   *    (homepage, admin dashboard) re-render immediately.
   *
   * Safe to call on every mount — it is a no-op when all records are already
   * up-to-date.
   */
  static readonly ACTIVE_DOMAINS = ["Board of Directors", "Industry", "Faculty"] as const;

  static migrateMentorData(): void {
    // IDs of seed records that belong to retired categories — safe to remove.
    const retiredSeedIds = new Set(
      INITIAL_MENTORS
        .filter((m) => !(AdminDataStore.ACTIVE_DOMAINS as readonly string[]).includes(m.domain))
        .map((m) => m.id),
    );

    let stored = this.getMentors();
    let changed = false;

    // Purge retired seed records from localStorage.
    // Admin-created records (IDs not in INITIAL_MENTORS) are never touched.
    const beforeLen = stored.length;
    stored = stored.filter((m) => !retiredSeedIds.has(m.id));
    if (stored.length !== beforeLen) changed = true;

    // Build a mutable map keyed by id for O(1) lookup
    const storedMap = new Map<string, MentorItem>(stored.map((m) => [m.id, m]));

    for (const seed of INITIAL_MENTORS) {
      // Skip seeds that belong to retired categories — already purged above.
      if (!(AdminDataStore.ACTIVE_DOMAINS as readonly string[]).includes(seed.domain)) continue;

      const existing = storedMap.get(seed.id);

      if (!existing) {
        // New seed record — add it
        stored.push(seed);
        storedMap.set(seed.id, seed);
        changed = true;
      } else {
        // Existing record — overwrite only fields that still hold placeholder text
        let recordChanged = false;
        const updated = { ...existing };

        const isPlaceholder = (v: unknown): boolean =>
          typeof v === "string" && v.startsWith("[");

        const stringFields: (keyof MentorItem)[] = [
          "name", "designation", "role", "organization", "experience",
          "avatar", "imagePath", "documentPath",
        ];

        for (const field of stringFields) {
          if (isPlaceholder(existing[field]) && !isPlaceholder(seed[field])) {
            (updated as Record<string, unknown>)[field] = seed[field];
            recordChanged = true;
          }
        }

        // Migrate any cached broken .avif or old /mentors/ photo paths in localStorage to verified seed paths
        if (
          seed.avatar &&
          (!existing.avatar ||
            existing.avatar.endsWith(".avif") ||
            existing.avatar.startsWith("/mentors/") ||
            seed.avatar.startsWith("/images/original/"))
        ) {
          if (updated.avatar !== seed.avatar) {
            updated.avatar = seed.avatar;
            recordChanged = true;
          }
        }
        if (
          seed.imagePath &&
          (!existing.imagePath ||
            existing.imagePath.endsWith(".avif") ||
            existing.imagePath.startsWith("/mentors/") ||
            seed.imagePath.startsWith("/images/original/"))
        ) {
          if (updated.imagePath !== seed.imagePath) {
            updated.imagePath = seed.imagePath;
            recordChanged = true;
          }
        }

        // Migrate any cached broken .avif or old /mentors/ photo paths in localStorage to verified seed paths
        if (
          seed.avatar &&
          (!existing.avatar ||
            existing.avatar.endsWith(".avif") ||
            existing.avatar.startsWith("/mentors/") ||
            seed.avatar.startsWith("/images/original/"))
        ) {
          if (updated.avatar !== seed.avatar) {
            updated.avatar = seed.avatar;
            recordChanged = true;
          }
        }
        if (
          seed.imagePath &&
          (!existing.imagePath ||
            existing.imagePath.endsWith(".avif") ||
            existing.imagePath.startsWith("/mentors/") ||
            seed.imagePath.startsWith("/images/original/"))
        ) {
          if (updated.imagePath !== seed.imagePath) {
            updated.imagePath = seed.imagePath;
            recordChanged = true;
          }
        }

        // For the expertise array: replace only if every element is a placeholder
        if (
          Array.isArray(existing.expertise) &&
          existing.expertise.every(isPlaceholder) &&
          Array.isArray(seed.expertise) &&
          seed.expertise.length > 0 &&
          !seed.expertise.every(isPlaceholder)
        ) {
          updated.expertise = seed.expertise;
          recordChanged = true;
        }

        if (recordChanged) {
          const idx = stored.findIndex((m) => m.id === seed.id);
          if (idx >= 0) stored[idx] = updated;
          storedMap.set(seed.id, updated);
          changed = true;
        }
      }
    }

    if (changed) {
      this.setStored(STORAGE_MENTORS_KEY, stored);
    }
  }

  static readonly STORE_BUILD_VERSION = "2026_11_16_r2";

  /**
   * Refreshes stored canonical seed data (startups, events, programs)
   * while preserving any custom admin records or user submissions.
   */
  static refreshSeedData(): void {
    if (typeof window === "undefined") return;
    try {
      // 1. Refresh startups: update seed records to canonical code definitions
      const storedStartups = this.getStartups();
      const seedStartupIds = new Set(INITIAL_STARTUPS.map((s) => s.id));
      const customStartups = storedStartups.filter((s) => !seedStartupIds.has(s.id));
      this.setStored(STORAGE_STARTUPS_KEY, [...INITIAL_STARTUPS, ...customStartups]);

      // 2. Refresh programs
      const storedPrograms = this.getPrograms();
      const seedProgramIds = new Set(INITIAL_PROGRAMS.map((p) => p.id));
      const customPrograms = storedPrograms.filter((p) => !seedProgramIds.has(p.id));
      this.setStored(STORAGE_PROGRAMS_KEY, [...INITIAL_PROGRAMS, ...customPrograms]);

      // 3. Refresh events
      const storedEvents = this.getEvents();
      const seedEventIds = new Set(INITIAL_EVENTS.map((e) => e.id));
      const customEvents = storedEvents.filter((e) => !seedEventIds.has(e.id));
      this.setStored(STORAGE_EVENTS_KEY, [...INITIAL_EVENTS, ...customEvents]);
    } catch (e) {
      console.warn("Failed to refresh seed data:", e);
    }
  }

  /**
   * Ensures client-side storage is always synchronized with the latest deployment,
   * completely eliminating stale cached data for returning visitors.
   */
  static ensureFreshStore(): void {
    if (typeof window === "undefined") return;
    try {
      const currentVersion = localStorage.getItem("guiitar_store_build_version");
      if (currentVersion !== this.STORE_BUILD_VERSION) {
        this.migrateMentorData();
        this.refreshSeedData();
        localStorage.setItem("guiitar_store_build_version", this.STORE_BUILD_VERSION);
      }
    } catch {}
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
    SupabaseDbClient.saveProgram(saved).catch((err) =>
      console.warn("Supabase async saveProgram error:", err)
    );
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
    SupabaseDbClient.deleteProgram(id).catch((err) =>
      console.warn("Supabase async deleteProgram error:", err)
    );
    return true;
  }

  static setPrograms(programs: IncubationProgram[]): void {
    this.setStored(STORAGE_PROGRAMS_KEY, programs);
  }

  static setApplications(apps: ApplicationItem[]): void {
    this.setStored(STORAGE_APPLICATIONS_KEY, apps);
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

  // ================= 17. SUPABASE DATABASE BIDIRECTIONAL SYNC =================
  static async syncFromSupabase(): Promise<void> {
    try {
      const results = await Promise.allSettled([
        SupabaseDbClient.getEvents(),
        SupabaseDbClient.getIdeas(),
        SupabaseDbClient.getStartups(),
        SupabaseDbClient.getRegistrations(),
        SupabaseDbClient.getMentors(),
        SupabaseDbClient.getPrograms(),
        SupabaseDbClient.getApplications(),
      ]);

      const [eventsRes, ideasRes, startupsRes, regRes, mentorsRes, progRes, appRes] = results;

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
      if (mentorsRes.status === "fulfilled" && Array.isArray(mentorsRes.value) && mentorsRes.value.length > 0) {
        this.setMentors(mentorsRes.value);
      }
      if (progRes.status === "fulfilled" && Array.isArray(progRes.value) && progRes.value.length > 0) {
        this.setPrograms(progRes.value);
      }
      if (appRes.status === "fulfilled" && Array.isArray(appRes.value) && appRes.value.length > 0) {
        this.setApplications(appRes.value);
      }
      try {
        window.dispatchEvent(new Event("guiitar_store_update"));
      } catch {}
    } catch (err) {
      console.warn("Supabase bidirectional sync warning:", err);
    }
  }

  // Backwards compatibility alias
  static async syncFromNeon(): Promise<void> {
    return this.syncFromSupabase();
  }
}
