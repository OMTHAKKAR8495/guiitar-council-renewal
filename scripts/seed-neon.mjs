import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
    const match = envFile.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
    if (match) {
      dbUrl = match[1];
    }
  } catch (e) {
    // Ignore error
  }
}

if (!dbUrl) {
  dbUrl = "postgresql://neondb_owner:npg_6xstyEme5PMN@ep-twilight-brook-b4c0f74u-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
}

const sql = neon(dbUrl);

async function seed() {
  console.log("Seeding data into Neon Database...");

  // 1. Events
  const events = [
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
      is_upcoming: true,
      seats: "45 Seats Available",
      desc: "An intensive hands-on masterclass covering multi-rotor drone assembly, flight avionics, autonomous waypoint programming with ArduPilot, and DGCA drone compliance rules.",
      topics: ["Aerodynamic flight principles", "Flight controller rigging", "Autonomous mission planning", "Thermal sensors & aerial mapping", "DGCA airspace guidelines"]
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
      is_upcoming: true,
      seats: "32 Seats Available",
      desc: "High-throughput model training, PyTorch distributed computing, and computer vision deployment tailored for student innovators with complex compute workloads.",
      topics: ["CUDA parallel execution", "Optimizing deep neural networks", "SLURM batch jobs & GPU allocation", "Multi-modal transformer architectures"]
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
      is_upcoming: true,
      seats: "18 Seats Available",
      desc: "Formal evaluation and milestone screening round for student teams seeking prototype grants up to ₹2.50 Lakhs under the SSIP 2.0 policy.",
      topics: ["Pitch deck presentation to evaluators", "Bill of Materials (BOM) scrutiny", "Milestone disbursement scheduling", "IPR disclosure guidance"]
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
      is_upcoming: true,
      seats: "50 Seats Available",
      desc: "A strategic clinic on novelty searches, provisional patent filing, drafting non-obvious claims, and commercial licensing pathways.",
      topics: ["Prior-art searching on Indian & USPTO databases", "Drafting independent and dependent claims", "Avoiding common patent application rejections", "SSIP 2.0 IPR reimbursement mechanisms"]
    }
  ];

  for (const ev of events) {
    await sql`
      INSERT INTO events (id, title, date, time, location, speaker, category, capacity, registered, status, is_upcoming, seats, "desc", topics)
      VALUES (${ev.id}, ${ev.title}, ${ev.date}, ${ev.time}, ${ev.location}, ${ev.speaker}, ${ev.category}, ${ev.capacity}, ${ev.registered}, ${ev.status}, ${ev.is_upcoming}, ${ev.seats}, ${ev.desc}, ${ev.topics})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        date = EXCLUDED.date,
        time = EXCLUDED.time,
        location = EXCLUDED.location,
        speaker = EXCLUDED.speaker,
        category = EXCLUDED.category,
        capacity = EXCLUDED.capacity,
        registered = EXCLUDED.registered,
        status = EXCLUDED.status,
        is_upcoming = EXCLUDED.is_upcoming,
        seats = EXCLUDED.seats,
        "desc" = EXCLUDED."desc",
        topics = EXCLUDED.topics;
    `;
  }
  console.log("✓ Seeded events");

  // 2. Applications
  const applications = [
    {
      id: "app-101",
      project_name: "AeroShield AI Autonomous Industrial Drone",
      applicant_name: "Rahul Mehta & Team Aero",
      email: "rahul.mehta@gsfcuniversity.ac.in",
      phone: "+91 98250 11223",
      track: "SSIP 2.0 PoC Grant",
      stage: "Working Prototype",
      status: "Shortlisted",
      submitted_date: "2026-09-18",
      pitch_summary: "Automated autonomous thermal payload UAV for inspecting chemical refinery flare stacks and pipelines with real-time leak classification.",
      team_size: 4,
      notes: "High potential. Prototype demonstrated at Maker Lab."
    },
    {
      id: "app-102",
      project_name: "PolyBio Biodegradable Industrial Packaging",
      applicant_name: "Dr. Neha Patel & Chemical Cohort",
      email: "neha.patel@gsfcuniversity.ac.in",
      phone: "+91 97120 44556",
      track: "Student Startup Policy",
      stage: "Lab Validation",
      status: "Approved",
      submitted_date: "2026-09-20",
      pitch_summary: "Bio-derived polymer composite replacing single-use expanded polystyrene in industrial fertilizer packaging.",
      team_size: 3,
      notes: "Passed technical feasibility check. Lab space assigned."
    },
    {
      id: "app-103",
      project_name: "AgriVision Multi-Spectral Crop Analyzer",
      applicant_name: "Karan Desai",
      email: "karan.d@gsfcuniversity.ac.in",
      phone: "+91 99090 77889",
      track: "Incubation Track 2026",
      stage: "MVP",
      status: "Interview Scheduled",
      submitted_date: "2026-09-24",
      pitch_summary: "Handheld optical scanner that assesses nitrogen levels in cotton crops and provides fertilizer dispensing recommendations via mobile app.",
      team_size: 2,
      notes: "Screening interview scheduled with Dr. Trivedi."
    },
    {
      id: "app-104",
      project_name: "SurgeFlow Smart Wastewater Energy Harvesting",
      applicant_name: "Pooja Verma",
      email: "pooja.v@gsfcuniversity.ac.in",
      phone: "+91 94280 33221",
      track: "SSIP 2.0 PoC Grant",
      stage: "Ideation",
      status: "New",
      submitted_date: "2026-09-26",
      pitch_summary: "Micro-hydro turbines retrofitted into industrial drainage channels to generate local sensor power.",
      team_size: 3,
      notes: "Awaiting initial document review."
    },
    {
      id: "app-105",
      project_name: "ChemDetect Wearable Gas Sensor",
      applicant_name: "Vikram Malhotra",
      email: "vikram.m@gsfcuniversity.ac.in",
      phone: "+91 98765 43210",
      track: "SSIP 2.0 Prototyping Grant",
      stage: "TRL-4 Prototype",
      status: "Shortlisted",
      submitted_date: "2026-09-25",
      pitch_summary: "Wearable sensor band alerting chemical plant technicians to VOCs and ammonia leaks in under 3 seconds.",
      team_size: 2,
      notes: "Reviewed by Safety Department mentors."
    }
  ];

  for (const app of applications) {
    await sql`
      INSERT INTO applications (id, project_name, applicant_name, email, phone, track, stage, status, submitted_date, pitch_summary, team_size, notes)
      VALUES (${app.id}, ${app.project_name}, ${app.applicant_name}, ${app.email}, ${app.phone}, ${app.track}, ${app.stage}, ${app.status}, ${app.submitted_date}, ${app.pitch_summary}, ${app.team_size}, ${app.notes})
      ON CONFLICT (id) DO UPDATE SET
        project_name = EXCLUDED.project_name,
        applicant_name = EXCLUDED.applicant_name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        track = EXCLUDED.track,
        stage = EXCLUDED.stage,
        status = EXCLUDED.status,
        submitted_date = EXCLUDED.submitted_date,
        pitch_summary = EXCLUDED.pitch_summary,
        team_size = EXCLUDED.team_size,
        notes = EXCLUDED.notes;
    `;
  }
  console.log("✓ Seeded applications");

  // 3. Startups
  const startups = [
    {
      id: "stu-1",
      name: "AeroShield Innovations",
      founders: ["Rahul Mehta", "Harshil Shah"],
      domain: "Drones & Autonomous Systems",
      batch: "Cohort 2026",
      funding_raised: "₹2.5 Lakhs (SSIP Grant)",
      description: "AI-assisted autonomous multi-rotor drones equipped with thermal and optical payloads for refinery and industrial safety inspections.",
      website_url: "https://aeroshield.example.com",
      status: "Incubated",
      patents: 1,
      valuation: "₹1.8 Cr",
      tags: ["Drones", "AI", "Safety", "Hardware"]
    },
    {
      id: "stu-2",
      name: "BioPoly Solutions",
      founders: ["Dr. Neha Patel", "Aniket Joshi"],
      domain: "CleanTech & Advanced Materials",
      batch: "Cohort 2025",
      funding_raised: "₹5.0 Lakhs",
      description: "Non-toxic biodegradable packaging polymers engineered from agri-biomass waste.",
      website_url: "https://biopoly.example.com",
      status: "Incubated",
      patents: 2,
      valuation: "₹3.5 Cr",
      tags: ["Biotech", "Materials", "GreenTech"]
    },
    {
      id: "stu-3",
      name: "OptiHydro Energy Systems",
      founders: ["Kunal Trivedi"],
      domain: "Renewable Energy & IoT",
      batch: "Cohort 2024",
      funding_raised: "₹10 Lakhs",
      description: "Micro-hydro turbines providing remote power generation in industrial wastewater flumes.",
      website_url: "https://optihydro.example.com",
      status: "Graduated",
      patents: 1,
      valuation: "₹5.0 Cr",
      tags: ["Hydro", "IoT", "CleanEnergy"]
    },
    {
      id: "stu-4",
      name: "MediSense Diagnostics",
      founders: ["Pooja Sharma", "Dr. A. K. Varma"],
      domain: "HealthTech & Biosensors",
      batch: "Cohort 2026",
      funding_raised: "₹2.5 Lakhs",
      description: "Point-of-care microfluidic diagnostic strips for rapid blood urea and electrolyte profiling.",
      website_url: "https://medisense.example.com",
      status: "Incubated",
      patents: 1,
      valuation: "₹2.2 Cr",
      tags: ["HealthTech", "Microfluidics", "Biosensors"]
    },
    {
      id: "stu-5",
      name: "AgriDrone Robotics",
      founders: ["Yashwardhan Rana", "Siddharth Jani"],
      domain: "AgriTech & Robotics",
      batch: "Cohort 2025",
      funding_raised: "₹7.5 Lakhs",
      description: "Precision automated agricultural spraying drones reducing pesticide runoff by 60%.",
      website_url: "https://agridrone.example.com",
      status: "Incubated",
      patents: 1,
      valuation: "₹4.0 Cr",
      tags: ["AgriTech", "Robotics", "Drones"]
    }
  ];

  for (const stu of startups) {
    await sql`
      INSERT INTO startups (id, name, founders, domain, batch, funding_raised, description, website_url, status, patents, valuation, tags)
      VALUES (${stu.id}, ${stu.name}, ${stu.founders}, ${stu.domain}, ${stu.batch}, ${stu.funding_raised}, ${stu.description}, ${stu.website_url}, ${stu.status}, ${stu.patents}, ${stu.valuation}, ${stu.tags})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        founders = EXCLUDED.founders,
        domain = EXCLUDED.domain,
        batch = EXCLUDED.batch,
        funding_raised = EXCLUDED.funding_raised,
        description = EXCLUDED.description,
        website_url = EXCLUDED.website_url,
        status = EXCLUDED.status,
        patents = EXCLUDED.patents,
        valuation = EXCLUDED.valuation,
        tags = EXCLUDED.tags;
    `;
  }
  console.log("✓ Seeded startups");

  // 4. Ideas
  const ideas = [
    {
      id: "idea-1",
      ref_id: "GUI-IDEA-2026-0001",
      slug: "aeroshield-drone-inspection",
      title: "AeroShield Autonomous Industrial Drone Inspection",
      innovator: "Rahul Mehta",
      team_members: ["Harshil Shah", "Aman Verma"],
      email: "rahul.mehta@gsfcuniversity.ac.in",
      phone: "+91 98250 11223",
      stage: "PoC / Prototype",
      category: "DeepTech",
      sector: "Aerospace & Industrial Safety",
      desc: "Autonomous multi-rotor UAV for real-time hazardous chemical leak classification using edge compute and thermal imaging.",
      problem_statement: "Industrial flare stacks require shutdown and risky manual human inspection.",
      solution_desc: "Autonomous flight paths with computer vision detecting anomalies at 100m standoff distance.",
      novelty: "Patented gimbal thermal sensor integration with onboard inference.",
      patent_status: "Filed",
      funding_required: "₹2.5 Lakhs",
      trl_level: "TRL-5",
      status: "Published",
      views: 142
    },
    {
      id: "idea-2",
      ref_id: "GUI-IDEA-2026-0002",
      slug: "polypack-biopolymer",
      title: "PolyPack Agricultural Biomass Packaging",
      innovator: "Dr. Neha Patel",
      team_members: ["Aniket Joshi", "Priya Nair"],
      email: "neha.patel@gsfcuniversity.ac.in",
      phone: "+91 97120 44556",
      stage: "Validation",
      category: "CleanTech",
      sector: "Chemicals & Material Sciences",
      desc: "Complete biodegradation in soil within 90 days with equivalent tensile strength to conventional plastics.",
      problem_statement: "Single use plastics generate thousands of tons of non-degradable chemical waste.",
      solution_desc: "Cross-linked starch biopolymer matrix synthesized from regional agricultural residue.",
      novelty: "Proprietary green plasticizer formulation.",
      patent_status: "Published",
      funding_required: "₹5.0 Lakhs",
      trl_level: "TRL-6",
      status: "Published",
      views: 215
    },
    {
      id: "idea-3",
      ref_id: "GUI-IDEA-2026-0003",
      slug: "agrisense-hyperspectral-sensor",
      title: "AgriSense Hyperspectral Soil Nutrient Sensor",
      innovator: "Karan Desai",
      team_members: ["Ritu Trivedi", "Siddharth Bhatt"],
      email: "karan.desai@gsfcuniversity.ac.in",
      phone: "+91 99090 77889",
      stage: "TRL-4 Prototype",
      category: "AgriTech",
      sector: "Agriculture & Sensors",
      desc: "In-situ spectroscopy probe providing N-P-K soil concentration readouts in under 60 seconds with GPS mapping.",
      problem_statement: "Lab soil testing takes weeks and delays critical sowing decisions.",
      solution_desc: "Near-infrared reflectance sensor paired with machine learning calibration model.",
      novelty: "Compact optical design reducing equipment costs by 85%.",
      patent_status: "Under Review",
      funding_required: "₹2.5 Lakhs",
      trl_level: "TRL-4",
      status: "Published",
      views: 180
    },
    {
      id: "idea-4",
      ref_id: "GUI-IDEA-2026-0004",
      slug: "chemsafe-leak-telemetry",
      title: "ChemSafe Industrial Pipeline Telemetry Node",
      innovator: "Vikram Malhotra",
      team_members: ["Devendra Dave"],
      email: "vikram.m@gsfcuniversity.ac.in",
      phone: "+91 98765 43210",
      stage: "MVP",
      category: "IoT & Industrial Safety",
      sector: "Petrochemicals",
      desc: "Zero-power LoRaWAN sensor nodes that clamp directly onto industrial pipeline joints to detect volatile organic compound leaks.",
      problem_statement: "Fugitive emissions in chemical corridors are difficult to pinpoint without dense sensor grids.",
      solution_desc: "Energy-harvesting gas telemetry devices transmitting over 15km range.",
      novelty: "Piezo-electric vibration harvesting circuit.",
      patent_status: "Filed",
      funding_required: "₹3.0 Lakhs",
      trl_level: "TRL-5",
      status: "Published",
      views: 95
    }
  ];

  for (const idea of ideas) {
    await sql`
      INSERT INTO ideas (id, ref_id, slug, title, innovator, team_members, email, phone, stage, category, sector, "desc", problem_statement, solution_desc, novelty, patent_status, funding_required, trl_level, status, views)
      VALUES (${idea.id}, ${idea.ref_id}, ${idea.slug}, ${idea.title}, ${idea.innovator}, ${idea.team_members}, ${idea.email}, ${idea.phone}, ${idea.stage}, ${idea.category}, ${idea.sector}, ${idea.desc}, ${idea.problem_statement}, ${idea.solution_desc}, ${idea.novelty}, ${idea.patent_status}, ${idea.funding_required}, ${idea.trl_level}, ${idea.status}, ${idea.views})
      ON CONFLICT (id) DO UPDATE SET
        ref_id = EXCLUDED.ref_id,
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        innovator = EXCLUDED.innovator,
        team_members = EXCLUDED.team_members,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        stage = EXCLUDED.stage,
        category = EXCLUDED.category,
        sector = EXCLUDED.sector,
        "desc" = EXCLUDED."desc",
        problem_statement = EXCLUDED.problem_statement,
        solution_desc = EXCLUDED.solution_desc,
        novelty = EXCLUDED.novelty,
        patent_status = EXCLUDED.patent_status,
        funding_required = EXCLUDED.funding_required,
        trl_level = EXCLUDED.trl_level,
        status = EXCLUDED.status,
        views = EXCLUDED.views;
    `;
  }
  console.log("✓ Seeded ideas");

  // 5. Mentors
  const mentors = [
    {
      id: "men-1",
      name: "Prof. G. R. Sinha",
      designation: "Provost, GSFC University & Chief Academic Advisor",
      domain: "Technology & AI",
      organization: "GSFC University",
      experience: "25+ Years",
      expertise: ["Deep Learning", "Signal Processing", "Academic Incubation"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      email: "provost@gsfcuniversity.ac.in",
      status: "Active"
    },
    {
      id: "men-2",
      name: "Dr. Mihir Trivedi",
      designation: "Director of Research & Innovation",
      domain: "Supercomputing & High Performance Systems",
      organization: "Param Shavak Supercomputer Hub",
      experience: "18+ Years",
      expertise: ["Parallel Architecture", "AI Acceleration", "Grant Governance"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      email: "mihir.trivedi@gsfcuniversity.ac.in",
      status: "Active"
    },
    {
      id: "men-3",
      name: "Dr. Bhoomi Shah",
      designation: "Lead IP Counsel & Patent Attorney",
      domain: "Intellectual Property Rights & Patent Drafting",
      organization: "GUIITAR Legal & IPR Cell",
      experience: "14+ Years",
      expertise: ["Patent Search", "Provisional Filings", "Technology Licensing"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      email: "bhoomi.shah@gsfcuniversity.ac.in",
      status: "Active"
    },
    {
      id: "men-4",
      name: "Mr. Kiran Parmar",
      designation: "Head of Incubation & Industry Partnerships",
      domain: "Industrial Scale & Funding",
      organization: "GSFC Ltd. Corporate Relations",
      experience: "20+ Years",
      expertise: ["Corporate Venturing", "Chemical Engineering Scale", "SSIP 2.0"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      email: "kiran.parmar@gsfcuniversity.ac.in",
      status: "Active"
    }
  ];

  for (const m of mentors) {
    await sql`
      INSERT INTO mentors (id, name, designation, domain, organization, experience, expertise, avatar, email, status)
      VALUES (${m.id}, ${m.name}, ${m.designation}, ${m.domain}, ${m.organization}, ${m.experience}, ${m.expertise}, ${m.avatar}, ${m.email}, ${m.status})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        designation = EXCLUDED.designation,
        domain = EXCLUDED.domain,
        organization = EXCLUDED.organization,
        experience = EXCLUDED.experience,
        expertise = EXCLUDED.expertise,
        avatar = EXCLUDED.avatar,
        email = EXCLUDED.email,
        status = EXCLUDED.status;
    `;
  }
  console.log("✓ Seeded mentors");

  // 6. Programs
  const programs = [
    {
      id: "prog-1",
      name: "SSIP 2.0 Prototyping Grant Track",
      tagline: "Govt of Gujarat Non-Dilutive Financial Grant up to ₹2.50 Lakhs",
      duration: "6 Months",
      grant_support: "Up to ₹2,50,000",
      target_cohort: "Students, Diploma, UG, PG, PhD Researchers & Alumni (up to 35 yrs)",
      description: "Comprehensive financial grant and lab access pathway under the Gujarat Student Startup & Innovation Policy 2.0.",
      features: [
        "100% non-dilutive grant disbursed on milestone validation",
        "Free rapid prototyping access across all 6 verified labs",
        "Dedicated faculty guides and domain specialist mentors",
        "Zero equity charge & complete founder IP retention"
      ],
      eligibility: ["Current GSFC University students", "Alumni within 5 years of graduation", "School students (grades 9-12)"],
      status: "Active"
    },
    {
      id: "prog-2",
      name: "GUIITAR DeepTech Acceleration Cohort",
      tagline: "Industrial Prototyping, Pilot Validation & Pre-Seed Readiness",
      duration: "12 Months",
      grant_support: "Up to ₹5,00,000 + Lab Compute",
      target_cohort: "Validated PoC prototypes ready for industrial pilot trials",
      description: "Incubation program linking student founders directly with GSFC Ltd. chemical and manufacturing plant testbeds.",
      features: [
        "Dedicated physical workstation at Anviksha Hub",
        "Param Shavak Supercomputer GPU allocation for AI compute",
        "Direct pilot trials across GSFC Ltd. chemical & fertilizer plants",
        "IPR patent drafting cost reimbursement up to ₹75,000"
      ],
      eligibility: ["TRL-4+ working prototype", "Incorporated or in-process Pvt Ltd", "Recommendation from Faculty Mentor"],
      status: "Active"
    },
    {
      id: "prog-3",
      name: "E-Club Student Wing Ideation Clinic",
      tagline: "Pre-Incubation Masterclasses & Design Thinking Sprints",
      duration: "3 Months",
      grant_support: "Ideation Seed Grants up to ₹25,000",
      target_cohort: "Undergraduate & postgraduate students with early concepts",
      description: "Weekend hackathons, problem statement dissection clinics, and design sprints to formulate venture proposals.",
      features: [
        "Weekly brainstorm clinics and pitch deck workshops",
        "Hands-on CAD modeling and 3D printing lab access",
        "Peer founder networks and hackathon mentorship",
        "Fast-track gateway to SSIP 2.0 prototyping grant screening"
      ],
      eligibility: ["Open to all university students", "No prior startup experience required"],
      status: "Active"
    }
  ];

  for (const prog of programs) {
    await sql`
      INSERT INTO programs (id, name, tagline, duration, grant_support, target_cohort, description, features, eligibility, status)
      VALUES (${prog.id}, ${prog.name}, ${prog.tagline}, ${prog.duration}, ${prog.grant_support}, ${prog.target_cohort}, ${prog.description}, ${prog.features}, ${prog.eligibility}, ${prog.status})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        tagline = EXCLUDED.tagline,
        duration = EXCLUDED.duration,
        grant_support = EXCLUDED.grant_support,
        target_cohort = EXCLUDED.target_cohort,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        eligibility = EXCLUDED.eligibility,
        status = EXCLUDED.status;
    `;
  }
  console.log("✓ Seeded programs");

  // 7. Audit logs
  const auditLogs = [
    {
      id: "log-1",
      admin_name: "KiranKumar Parmar",
      action: "Created Event",
      target_record: "demo guitar data",
      record_type: "Event",
      details: "Date: 27/12/2026"
    },
    {
      id: "log-2",
      admin_name: "Admin User",
      action: "Approved Application",
      target_record: "PolyBio Biodegradable Industrial Packaging",
      record_type: "Application",
      details: "Assigned to Chemical Lab Cohort"
    },
    {
      id: "log-3",
      admin_name: "Admin User",
      action: "Registered Startup",
      target_record: "AeroShield Innovations",
      record_type: "Startup",
      details: "Funding: ₹2.5 Lakhs (SSIP Grant)"
    },
    {
      id: "log-4",
      admin_name: "Admin User",
      action: "Published Innovation Record",
      target_record: "AeroShield Autonomous Industrial Drone Inspection",
      record_type: "Idea",
      details: "Ref ID: GUI-IDEA-2026-0001"
    }
  ];

  for (const log of auditLogs) {
    await sql`
      INSERT INTO audit_logs (id, admin_name, action, target_record, record_type, details)
      VALUES (${log.id}, ${log.admin_name}, ${log.action}, ${log.target_record}, ${log.record_type}, ${log.details})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log("✓ Seeded audit_logs");

  console.log("\nALL TABLES FULLY POPULATED WITH INITIAL DATA!");
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
