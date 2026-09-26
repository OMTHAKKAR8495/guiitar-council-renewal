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
  console.error("ERROR: No DATABASE_URL found in environment or .env.local");
  process.exit(1);
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
      name: "Dr. Bhoomi Shah",
      designation: "IPR Attorney & Patent Coordinator",
      domain: "Legal & IPR",
      organization: "GUIITAR Council IPR Centre",
      experience: "12+ Years",
      expertise: ["Patent Drafting", "Freedom to Operate", "Trademark Law"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      email: "ipr@guiitar.org",
      status: "Active"
    },
    {
      id: "men-3",
      name: "KiranKumar Parmar",
      designation: "Incubation Manager & Ecosystem Lead",
      domain: "Startup Incubation",
      organization: "GUIITAR Council",
      experience: "8+ Years",
      expertise: ["SSIP 2.0 Grants", "Pitch Coaching", "Prototype Scaling"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      email: "admin@guiitar.org",
      status: "Active"
    }
  ];

  for (const men of mentors) {
    await sql`
      INSERT INTO mentors (id, name, designation, domain, organization, experience, expertise, avatar, email, status)
      VALUES (${men.id}, ${men.name}, ${men.designation}, ${men.domain}, ${men.organization}, ${men.experience}, ${men.expertise}, ${men.avatar}, ${men.email}, ${men.status})
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
      name: "SSIP 2.0 Student PoC & Prototyping Track",
      tagline: "Govt. of Gujarat innovation grant support for working proofs-of-concept.",
      duration: "6 Months",
      grant_support: "Up to ₹2.50 Lakhs",
      target_cohort: "Undergraduate, Postgraduate & PhD Students",
      description: "Comprehensive grant disbursement for bill-of-materials, maker lab fabrication, testing benches, and industrial validation.",
      features: ["Up to ₹2.50 Lakhs grant per team", "3D Printing & Laser lab access", "Param Shavak supercomputer access", "Mentorship from GSFC chemical & industrial leaders"],
      eligibility: ["Currently enrolled students or alumni within 5 years", "Technical proof of concept or novel innovation", "Team of 2-5 members"],
      status: "Active"
    },
    {
      id: "prog-2",
      name: "DeepTech Incubation & Commercial Acceleration",
      tagline: "Full-scale company incorporation and seed fund acceleration.",
      duration: "12 Months",
      grant_support: "Co-working + Seed Connect",
      target_cohort: "Early-stage founders with validated MVPs",
      description: "High-touch incubation offering dedicated dedicated workbenches, IPR claim filing, compliance clearance, and angel demo day pitches.",
      features: ["24/7 dedicated Anviksha co-working suite", "100% patent filing fee reimbursement", "Direct connection to GSFC Limited industrial trials", "Investor pitch days"],
      eligibility: ["Incorporated startup or ready to incorporate", "Working MVP with customer traction or field trials", "Commitment to full-time venture development"],
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

  console.log("\nALL TABLES SUCCESSFULLY POPULATED WITH INITIAL DATA!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
