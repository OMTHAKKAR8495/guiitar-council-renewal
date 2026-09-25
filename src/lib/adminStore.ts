export type IdeaStatus =
  | 'Draft'
  | 'Pending Review'
  | 'Under Review'
  | 'Approved'
  | 'Published'
  | 'Rejected'
  | 'Archived';

export type InnovationStage =
  | 'Idea'
  | 'Research'
  | 'Prototype'
  | 'MVP'
  | 'Pilot'
  | 'Startup'
  | 'Scale';

export type CreatorType =
  | 'Student'
  | 'Faculty'
  | 'Researcher'
  | 'Startup'
  | 'Alumni'
  | 'External Innovator';

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
  id: string; // Internal unique ID
  refId: string; // GUI-IDEA-2026-XXXX
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
  visibility: 'Draft' | 'Private' | 'Public';
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

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'idea' | 'startup' | 'application' | 'event' | 'partner';
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

const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'idea-001',
    refId: 'GUI-IDEA-2026-0001',
    slug: 'ayurtrix-phytopharma-standardization',
    title: 'Ayurtrix — Botanical Phytochemical Standardization',
    shortDescription: 'Modernizing Ayurvedic herbal formulations with scientific chromatographic bioactive standardization.',
    detailedDescription: 'Ayurtrix bridges classical Indian Ayurvedic pharmacology with rigorous high-performance liquid chromatography (HPLC) to produce authentic, heavy-metal-free herbal extracts with verified therapeutic efficacy.',
    category: 'Biotech',
    subcategory: 'Phytopharmaceuticals',
    technology: 'HPLC & Botanical Extraction',
    stage: 'MVP',
    creatorType: 'Student',
    creatorName: 'Aarav Patel & Team',
    creatorEmail: 'aarav.patel@gsfcuniversity.ac.in',
    creatorPhone: '+91 98251 12345',
    department: 'School of Science (Biotechnology)',
    university: 'GSFC University, Vadodara',
    teamMembers: ['Aarav Patel (Lead)', 'Pooja Shah (Analytical Chemist)', 'Rohan Mehta (Pharmacology)'],
    problemStatement: 'Massive variation and adulteration in commercial herbal drugs lack verifiable active chemical markers and clinical consistency.',
    proposedSolution: 'Standardized cold-solvent bio-marker extraction protocol benchmarking 4 therapeutic herbs against international pharmacopeia standards.',
    innovationUsp: 'Zero heavy metal residues, standardized bioactive yield over 94%, verifiable batch-to-batch repeatability.',
    technologyUsed: 'HPLC, Spectrophotometry, Cryo-grinding, Lyophilization',
    targetUsers: 'Nutraceutical manufacturers, Ayurvedic pharmaceutical brands, Ayurvedic clinics.',
    industry: 'Healthcare & Wellness',
    thrustArea: 'Biotechnology & Life Sciences',
    coverImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1579165466791-78822231cb67?w=800&auto=format&fit=crop&q=80'],
    expectedImpact: 'Providing safe, certified therapeutic botanical formulations with measurable bioavailability.',
    socialImpact: 'Improves public health reliability for natural treatments.',
    economicImpact: 'High-margin export opportunities for Indian herbal therapeutics.',
    sdgAlignment: ['SDG 3: Good Health & Well-being', 'SDG 9: Industry, Innovation & Infrastructure'],
    supportRequired: ['Mentorship', 'Funding', 'Lab Access', 'IPR'],
    visibility: 'Public',
    status: 'Published',
    isFeatured: true,
    featuredOrder: 1,
    fundingSanctioned: '₹2,50,000 (SSIP 2.0)',
    submittedAt: '2026-02-14T10:30:00Z',
    updatedAt: '2026-09-20T14:15:00Z',
    publishedAt: '2026-03-01T09:00:00Z',
    comments: [
      {
        id: 'c-1',
        author: 'Dr. Jignesh Valand',
        avatar: 'JV',
        text: 'Initial bio-marker yield verified in university analytical lab. Highly promising for SSIP 2.0 grant approval.',
        createdAt: '2026-02-18T11:00:00Z',
        isInternal: true,
      },
    ],
    activities: [
      { id: 'act-1', action: 'Idea Submitted', admin: 'Aarav Patel', timestamp: '2026-02-14 10:30' },
      { id: 'act-2', action: 'Status changed to Approved', admin: 'KiranKumar Parmar', timestamp: '2026-02-25 15:20' },
      { id: 'act-3', action: 'Idea Published to Showcase', admin: 'Prof. G. R. Sinha', timestamp: '2026-03-01 09:00' },
    ],
  },
  {
    id: 'idea-002',
    refId: 'GUIITAR-IDEA-2026-0002',
    slug: 'bacterial-chroma-biopigments',
    title: 'Bacterial Chroma: Microbial Synthesis of Sustainable Pigments',
    shortDescription: 'Producing natural, eco-friendly bacterial pigments for textile dyeing to eliminate toxic chemical runoff.',
    detailedDescription: 'Isolating non-pathogenic bacterial strains to harvest vibrant, UV-resistant carotenoid and prodigiosin pigments as sustainable alternatives to carcinogenic textile colorants.',
    category: 'Biotech',
    subcategory: 'Industrial Fermentation',
    technology: 'Microbial Synthesis & Bioprocessing',
    stage: 'MVP',
    creatorType: 'Student',
    creatorName: 'Devanshi Trivedi',
    creatorEmail: 'devanshi.t@gsfcuniversity.ac.in',
    creatorPhone: '+91 97241 87654',
    department: 'Department of Biotechnology',
    university: 'GSFC University, Vadodara',
    teamMembers: ['Devanshi Trivedi', 'Harshil Joshi'],
    problemStatement: 'Chemical textile dyeing produces 20% of global industrial water pollution with hazardous heavy metals and azo dyes.',
    proposedSolution: 'Non-toxic bacterial pigmentation culture requiring 70% less water and zero hazardous solvent fixation.',
    innovationUsp: 'Inherent antimicrobial property, 100% biodegradable wastewater effluent, vibrant colorfastness.',
    technologyUsed: 'Bioreactors, Centrifugation, Microbial Fermentation, Spectrophotometry',
    targetUsers: 'Eco-textile fashion brands, organic fabric mills, cosmetic formulation labs.',
    industry: 'Textiles & Sustainable Chemistry',
    thrustArea: 'Clean-Tech & Circular Economy',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    galleryImages: [],
    expectedImpact: 'Zero-toxic wastewater discharge for participating fabric dyeing units.',
    sdgAlignment: ['SDG 6: Clean Water & Sanitation', 'SDG 12: Responsible Consumption'],
    supportRequired: ['Funding', 'Lab Access', 'Industry Connection'],
    visibility: 'Public',
    status: 'Published',
    isFeatured: true,
    featuredOrder: 2,
    fundingSanctioned: '₹1,70,000 (SSIP 2.0)',
    submittedAt: '2026-03-10T14:20:00Z',
    updatedAt: '2026-09-18T16:00:00Z',
    publishedAt: '2026-03-28T11:30:00Z',
    comments: [],
    activities: [
      { id: 'act-4', action: 'Idea Submitted', admin: 'Devanshi Trivedi', timestamp: '2026-03-10 14:20' },
      { id: 'act-5', action: 'Approved by ISC Committee', admin: 'KiranKumar Parmar', timestamp: '2026-03-24 16:45' },
      { id: 'act-6', action: 'Idea Published', admin: 'KiranKumar Parmar', timestamp: '2026-03-28 11:30' },
    ],
  },
  {
    id: 'idea-003',
    refId: 'GUIITAR-IDEA-2026-0003',
    slug: 'bio-lastic-temple-flowers-polymer',
    title: 'Bio-Lastic: Circular Biopolymers from Floral Waste',
    shortDescription: 'Upcycling holy temple floral offerings into 100% biodegradable compostable packaging films.',
    detailedDescription: 'Collecting discarded floral waste from Vadodara temples and processing natural cellulose fibers into thermoplastic resin pellets for mulch films and consumer pouches.',
    category: 'CleanTech',
    subcategory: 'Circular Materials',
    technology: 'Cellulose Compounding & Extrusion',
    stage: 'Prototype',
    creatorType: 'Student',
    creatorName: 'Kunal Verma & Team',
    creatorEmail: 'kunal.verma@gsfcuniversity.ac.in',
    creatorPhone: '+91 94081 23456',
    department: 'School of Technology (Chemical Eng.)',
    university: 'GSFC University, Vadodara',
    teamMembers: ['Kunal Verma', 'Nisha Dave', 'Smit Patel'],
    problemStatement: 'Over 800,000 tonnes of temple flowers are dumped into water bodies yearly in India, alongside surging single-use plastic waste.',
    proposedSolution: 'Chemical bleaching and bio-plasticizer compounding of discarded flower petals into compostable plastic resin.',
    innovationUsp: 'Degrades in home compost within 60 days leaving zero toxic microplastics; competitive tensile strength.',
    technologyUsed: 'Twin-screw Extruder, Chemical Washing, Film Casting',
    targetUsers: 'Packaging companies, e-commerce brands, agricultural mulch film buyers.',
    industry: 'Packaging & Agriculture',
    thrustArea: 'Environmental Engineering Solutions',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    galleryImages: [],
    expectedImpact: 'Diverting 5 tonnes of temple floral waste monthly and replacing 200,000 plastic polybags.',
    sdgAlignment: ['SDG 12: Responsible Consumption', 'SDG 14: Life Below Water'],
    supportRequired: ['Mentorship', 'Funding', 'Lab Access', 'Market Access'],
    visibility: 'Public',
    status: 'Published',
    isFeatured: true,
    featuredOrder: 3,
    fundingSanctioned: '₹1,00,000 (SSIP 2.0)',
    submittedAt: '2026-04-05T09:15:00Z',
    updatedAt: '2026-09-15T11:00:00Z',
    publishedAt: '2026-04-20T10:00:00Z',
    comments: [],
    activities: [
      { id: 'act-7', action: 'Idea Submitted', admin: 'Kunal Verma', timestamp: '2026-04-05 09:15' },
      { id: 'act-8', action: 'Idea Published', admin: 'KiranKumar Parmar', timestamp: '2026-04-20 10:00' },
    ],
  },
  {
    id: 'idea-004',
    refId: 'GUIITAR-IDEA-2026-0004',
    slug: 'aerovanguard-autonomous-drone-inspection',
    title: 'AeroVanguard Autonomous UAV Pipeline Inspector',
    shortDescription: 'Custom multi-rotor drone system equipped with thermal edge vision for industrial gas & chemical leaks.',
    detailedDescription: 'Autonomous flight mission planning combined with lightweight FLIR thermal cameras and onboard Jetson compute to inspect elevated chemical pipelines in real-time.',
    category: 'Robotics',
    subcategory: 'Unmanned Aerial Systems',
    technology: 'ArduPilot & Edge Computer Vision',
    stage: 'Prototype',
    creatorType: 'Student',
    creatorName: 'Yashwardhan Rana',
    creatorEmail: 'yash.rana@gsfcuniversity.ac.in',
    creatorPhone: '+91 99099 87123',
    department: 'Department of Mechanical Engineering',
    university: 'GSFC University, Vadodara',
    teamMembers: ['Yashwardhan Rana', 'Pratik Joshi'],
    problemStatement: 'Manual human inspection of elevated chemical storage tanks and flare stacks is extremely hazardous and slow.',
    proposedSolution: 'Fully autonomous GPS waypoint flight system with automated thermal hotspot detection and telemetry dispatch.',
    innovationUsp: 'Sub-meter navigation precision, 45-minute battery flight endurance, real-time hazardous gas cloud mapping.',
    technologyUsed: 'Pixhawk 6X, FLIR Lepton, NVIDIA Jetson Orin Nano, Mission Planner',
    targetUsers: 'Chemical manufacturing plants, petrochemical refineries, power distribution utilities.',
    industry: 'Industrial Safety & Inspection',
    thrustArea: 'Artificial Intelligence & Robotics',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
    galleryImages: [],
    expectedImpact: 'Preventing dangerous industrial gas leaks and reducing inspection downtime by 85%.',
    sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 8: Decent Work & Economic Growth'],
    supportRequired: ['Drone Lab Access', 'Industry Connection', 'IPR'],
    visibility: 'Public',
    status: 'Pending Review',
    isFeatured: false,
    fundingSanctioned: '₹2,00,000 (SSIP 2.0 Requested)',
    submittedAt: '2026-09-24T18:30:00Z',
    updatedAt: '2026-09-25T09:00:00Z',
    comments: [
      {
        id: 'c-2',
        author: 'Mr. Amit Duggal',
        avatar: 'AD',
        text: 'Flight test scheduled at SOT Proving Ground. Drone avionics wiring looks compliant with DGCA standards.',
        createdAt: '2026-09-25T09:15:00Z',
        isInternal: true,
      },
    ],
    activities: [
      { id: 'act-9', action: 'Idea Submitted by Public Portal', admin: 'Yashwardhan Rana', timestamp: '2026-09-24 18:30' },
      { id: 'act-10', action: 'Moved to Pending Review Queue', admin: 'System', timestamp: '2026-09-24 18:30' },
    ],
  },
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'New Innovation Submitted',
    message: 'AeroVanguard Autonomous UAV Pipeline Inspector submitted by Yashwardhan Rana.',
    type: 'idea',
    link: '/admin/ideas/idea-004',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'New Startup Incubation Request',
    message: 'HydroSense IoT telemetry startup applied for Anviksha co-working suites.',
    type: 'startup',
    link: '/admin/applications',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Workshop Registration Milestone',
    message: 'Autonomous Drone Workshop has reached 45/50 confirmed seat bookings.',
    type: 'event',
    link: '/admin/events',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'MOU Partnership Inquiry',
    message: 'Reliance CSR Innovation wing requested bilateral discussion on student grants.',
    type: 'partner',
    link: '/admin/partners',
    timestamp: '1 day ago',
    read: true,
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-001',
    adminName: 'Prof. G. R. Sinha',
    action: 'Published Innovation',
    targetRecord: 'Ayurtrix — Botanical Phytochemical Standardization',
    recordType: 'Idea',
    timestamp: '2026-09-20 14:15',
    details: 'Approved for public Innovation Showcase display after ISC review.',
  },
  {
    id: 'audit-002',
    adminName: 'KiranKumar Parmar',
    action: 'Sanctioned Grant Tranche',
    targetRecord: 'Bacterial Chroma (₹1,70,000)',
    recordType: 'Funding',
    timestamp: '2026-09-18 16:00',
    details: 'Released procurement milestone tranche under SSIP 2.0 governance.',
  },
  {
    id: 'audit-003',
    adminName: 'Amit Duggal',
    action: 'Approved Lab Access',
    targetRecord: 'AeroVanguard Autonomous UAV',
    recordType: 'Infrastructure',
    timestamp: '2026-09-25 09:15',
    details: 'Granted Drone Lab testing slot for autonomous flight rigs.',
  },
];

const STORAGE_IDEAS_KEY = 'guiitar_ideas_data_v1';
const STORAGE_NOTIF_KEY = 'guiitar_notifs_data_v1';
const STORAGE_AUDIT_KEY = 'guiitar_audit_data_v1';

export class AdminDataStore {
  private static getStored<T>(key: string, defaultVal: T): T {
    if (typeof window === 'undefined') return defaultVal;
    const stored = localStorage.getItem(key);
    if (!stored) return defaultVal;
    try {
      return JSON.parse(stored);
    } catch {
      return defaultVal;
    }
  }

  private static setStored<T>(key: string, val: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('guiitar_store_update'));
  }

  // Ideas CRUD
  static getIdeas(): IdeaItem[] {
    return this.getStored<IdeaItem[]>(STORAGE_IDEAS_KEY, INITIAL_IDEAS);
  }

  static getIdeaById(id: string): IdeaItem | undefined {
    return this.getIdeas().find((i) => i.id === id || i.slug === id || i.refId === id);
  }

  static getPublishedIdeas(): IdeaItem[] {
    return this.getIdeas().filter((i) => i.status === 'Published');
  }

  static saveIdea(idea: Partial<IdeaItem> & { title: string }): IdeaItem {
    const ideas = this.getIdeas();
    const existingIndex = ideas.findIndex((i) => i.id === idea.id);

    const now = new Date().toISOString();
    const refNum = (ideas.length + 1).toString().padStart(4, '0');
    const refId = idea.refId || `GUI-IDEA-2026-${refNum}`;
    const slug =
      idea.slug ||
      idea.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    let savedItem: IdeaItem;

    if (existingIndex >= 0) {
      savedItem = {
        ...ideas[existingIndex],
        ...idea,
        updatedAt: now,
      } as IdeaItem;
      ideas[existingIndex] = savedItem;
      this.addAuditLog('Admin User', 'Updated Innovation Record', savedItem.title, 'Idea', `Status: ${savedItem.status}`);
    } else {
      savedItem = {
        id: idea.id || `idea-${Date.now()}`,
        refId,
        slug,
        title: idea.title,
        shortDescription: idea.shortDescription || '',
        detailedDescription: idea.detailedDescription || '',
        category: idea.category || 'DeepTech',
        subcategory: idea.subcategory || '',
        technology: idea.technology || '',
        stage: idea.stage || 'Idea',
        creatorType: idea.creatorType || 'Student',
        creatorName: idea.creatorName || 'Anonymous Innovator',
        creatorEmail: idea.creatorEmail || '',
        creatorPhone: idea.creatorPhone || '',
        department: idea.department || 'GSFC University',
        university: idea.university || 'GSFC University, Vadodara',
        teamMembers: idea.teamMembers || [],
        problemStatement: idea.problemStatement || '',
        proposedSolution: idea.proposedSolution || '',
        innovationUsp: idea.innovationUsp || '',
        technologyUsed: idea.technologyUsed || '',
        targetUsers: idea.targetUsers || '',
        industry: idea.industry || '',
        thrustArea: idea.thrustArea || 'General Innovation',
        coverImage:
          idea.coverImage ||
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        galleryImages: idea.galleryImages || [],
        videoUrl: idea.videoUrl || '',
        demoUrl: idea.demoUrl || '',
        githubUrl: idea.githubUrl || '',
        websiteUrl: idea.websiteUrl || '',
        expectedImpact: idea.expectedImpact || '',
        socialImpact: idea.socialImpact || '',
        environmentalImpact: idea.environmentalImpact || '',
        economicImpact: idea.economicImpact || '',
        sdgAlignment: idea.sdgAlignment || [],
        supportRequired: idea.supportRequired || ['Mentorship', 'Funding'],
        visibility: idea.visibility || 'Public',
        status: idea.status || 'Pending Review',
        isFeatured: idea.isFeatured || false,
        submittedAt: now,
        updatedAt: now,
        comments: [],
        activities: [
          {
            id: `act-${Date.now()}`,
            action: 'Idea Created / Submitted',
            admin: idea.creatorName || 'Innovator',
            timestamp: new Date().toLocaleString(),
          },
        ],
      };
      ideas.unshift(savedItem);

      // Add Notification
      this.addNotification({
        title: 'New Idea Submitted',
        message: `${savedItem.title} (${savedItem.refId}) was submitted.`,
        type: 'idea',
        link: `/admin/ideas/${savedItem.id}`,
      });

      this.addAuditLog(savedItem.creatorName, 'Submitted New Innovation', savedItem.title, 'Idea', `Ref ID: ${savedItem.refId}`);
    }

    this.setStored(STORAGE_IDEAS_KEY, ideas);
    return savedItem;
  }

  static updateIdeaStatus(id: string, status: IdeaStatus, adminName: string = 'Admin', reason?: string): IdeaItem | null {
    const ideas = this.getIdeas();
    const index = ideas.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const item = ideas[index];
    item.status = status;
    item.updatedAt = new Date().toISOString();
    if (status === 'Published') {
      item.publishedAt = new Date().toISOString();
      item.visibility = 'Public';
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

    this.addAuditLog(adminName, `Changed status to ${status}`, item.title, 'Idea', reason || `Status set to ${status}`);
    return item;
  }

  static addIdeaComment(id: string, author: string, text: string, isInternal: boolean = true): IdeaComment | null {
    const ideas = this.getIdeas();
    const index = ideas.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const newComment: IdeaComment = {
      id: `com-${Date.now()}`,
      author,
      avatar: author.split(' ').map((x) => x[0]).join('').slice(0, 2),
      text,
      createdAt: new Date().toISOString(),
      isInternal,
    };

    ideas[index].comments.push(newComment);
    ideas[index].activities.push({
      id: `act-${Date.now()}`,
      action: 'Admin Internal Note Added',
      admin: author,
      timestamp: new Date().toLocaleString(),
      details: text.slice(0, 40) + '...',
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
    this.addAuditLog('Admin', 'Deleted Innovation Record', item.title, 'Idea', `Ref ID: ${item.refId}`);
    return true;
  }

  // Notifications
  static getNotifications(): AdminNotification[] {
    return this.getStored<AdminNotification[]>(STORAGE_NOTIF_KEY, INITIAL_NOTIFICATIONS);
  }

  static addNotification(notif: Omit<AdminNotification, 'id' | 'timestamp' | 'read'>): void {
    const list = this.getNotifications();
    list.unshift({
      id: `notif-${Date.now()}`,
      ...notif,
      timestamp: 'Just now',
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

  // Audit Logs
  static getAuditLogs(): AuditLogEntry[] {
    return this.getStored<AuditLogEntry[]>(STORAGE_AUDIT_KEY, INITIAL_AUDIT_LOGS);
  }

  static addAuditLog(adminName: string, action: string, targetRecord: string, recordType: string, details: string): void {
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

  // Global Aggregate Stats
  static getStats() {
    const ideas = this.getIdeas();
    return {
      totalIdeas: ideas.length,
      publishedIdeas: ideas.filter((i) => i.status === 'Published').length,
      pendingIdeas: ideas.filter((i) => i.status === 'Pending Review' || i.status === 'Under Review').length,
      approvedIdeas: ideas.filter((i) => i.status === 'Approved').length,
      draftIdeas: ideas.filter((i) => i.status === 'Draft').length,
      totalStartups: 83,
      totalEvents: 115,
      upcomingEvents: 3,
      totalMentors: 50,
      totalResources: 7,
      totalGrantsDisbursed: '₹30L+',
    };
  }
}
