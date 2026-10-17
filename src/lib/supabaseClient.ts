import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type {
  EventItem,
  IdeaItem,
  StartupItem,
  ApplicationItem,
  MentorItem,
  RegistrationItem,
  IncubationProgram,
  PartnerItem,
} from "./adminStore";

// Default public configuration (Publishable anon key is safe for client-side use with RLS)
const DEFAULT_SUPABASE_URL = "https://jkihhrwqxglhffcbwhbt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_S-GzvjPo60_xHob5nKe_NA_ts5urzHO";

const envUrl =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && (process.env?.VITE_SUPABASE_URL || process.env?.SUPABASE_URL)) ||
  DEFAULT_SUPABASE_URL;

const envAnonKey =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && (process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY)) ||
  DEFAULT_SUPABASE_ANON_KEY;

export const SUPABASE_URL = envUrl;
export const SUPABASE_ANON_KEY = envAnonKey;

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

/**
 * Supabase Database Client for client & server data sync
 */
export const SupabaseDbClient = {
  // 1. Events
  async getEvents(): Promise<EventItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getEvents error, falling back to local store:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        date: r.date,
        time: r.time,
        location: r.location,
        speaker: r.speaker,
        category: r.category,
        capacity: Number(r.capacity),
        registered: Number(r.registered),
        status: r.status,
        isUpcoming: Boolean(r.is_upcoming),
        seats: r.seats,
        desc: r.desc,
        topics: Array.isArray(r.topics) ? r.topics : [],
      }));
    } catch (err) {
      console.warn("Supabase getEvents unexpected error:", err);
      return null;
    }
  },

  async saveEvent(event: Partial<EventItem> & { title: string }): Promise<EventItem | null> {
    try {
      const supabase = getSupabase();
      const id = event.id || `ev-${Date.now()}`;
      const topics = Array.isArray(event.topics) ? event.topics : [];
      const capacity = Number(event.capacity) || 50;
      const registered = Number(event.registered) || 0;
      const isUpcoming =
        event.isUpcoming !== undefined
          ? event.isUpcoming
          : event.status === "Registration Open" || event.status === "Upcoming";

      const payload = {
        id,
        title: event.title,
        date: event.date || "TBD",
        time: event.time || "10:00 AM – 04:00 PM IST",
        location: event.location || "GSFC University Campus",
        speaker: event.speaker || "GUIITAR Faculty & Experts",
        category: event.category || "Workshop",
        capacity,
        registered,
        status: event.status || "Registration Open",
        is_upcoming: isUpcoming,
        seats: event.seats || `${Math.max(0, capacity - registered)} Seats Available`,
        desc: event.desc || "",
        topics,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("events")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveEvent error:", error);
        return null;
      }

      return {
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        speaker: data.speaker,
        category: data.category,
        capacity: Number(data.capacity),
        registered: Number(data.registered),
        status: data.status,
        isUpcoming: Boolean(data.is_upcoming),
        seats: data.seats,
        desc: data.desc,
        topics: Array.isArray(data.topics) ? data.topics : [],
      };
    } catch (err) {
      console.error("Supabase saveEvent unexpected error:", err);
      return null;
    }
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteEvent error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteEvent error:", err);
      return false;
    }
  },

  // 2. Ideas
  async getIdeas(): Promise<IdeaItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getIdeas error:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        refId: r.ref_id,
        slug: r.slug,
        title: r.title,
        innovator: r.innovator,
        teamMembers: Array.isArray(r.team_members) ? r.team_members : [],
        email: r.email,
        phone: r.phone || "",
        stage: r.stage,
        category: r.category,
        sector: r.sector,
        desc: r.desc,
        problemStatement: r.problem_statement || "",
        solutionDesc: r.solution_desc || "",
        novelty: r.novelty || "",
        patentStatus: r.patent_status || "Not Filed",
        fundingRequired: r.funding_required || "₹2.5 Lakhs",
        trlLevel: r.trl_level || "TRL-3",
        status: r.status,
        submittedAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        pitchDeckUrl: r.pitch_deck_url,
        views: Number(r.views) || 0,
      }));
    } catch (err) {
      console.warn("Supabase getIdeas error:", err);
      return null;
    }
  },

  async saveIdea(idea: Partial<IdeaItem> & { title: string; innovator: string; desc: string }): Promise<IdeaItem | null> {
    try {
      const supabase = getSupabase();
      const id = idea.id || `idea-${Date.now()}`;
      const refId = idea.refId || `GIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const slug = idea.slug || idea.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const teamMembers = Array.isArray(idea.teamMembers) ? idea.teamMembers : [];

      const payload = {
        id,
        ref_id: refId,
        slug,
        title: idea.title,
        innovator: idea.innovator,
        team_members: teamMembers,
        email: idea.email || "innovator@gsfcuniversity.ac.in",
        phone: idea.phone || "",
        stage: idea.stage || "Ideation",
        category: idea.category || "DeepTech",
        sector: idea.sector || "Engineering",
        desc: idea.desc,
        problem_statement: idea.problemStatement || "",
        solution_desc: idea.solutionDesc || "",
        novelty: idea.novelty || "",
        patent_status: idea.patentStatus || "Not Filed",
        funding_required: idea.fundingRequired || "₹2.5 Lakhs",
        trl_level: idea.trlLevel || "TRL-3",
        status: idea.status || "Published",
        pitch_deck_url: idea.pitchDeckUrl || "",
        views: Number(idea.views) || 0,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("ideas")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveIdea error:", error);
        return null;
      }

      return {
        id: data.id,
        refId: data.ref_id,
        slug: data.slug,
        title: data.title,
        innovator: data.innovator,
        teamMembers: Array.isArray(data.team_members) ? data.team_members : [],
        email: data.email,
        phone: data.phone || "",
        stage: data.stage,
        category: data.category,
        sector: data.sector,
        desc: data.desc,
        problemStatement: data.problem_statement || "",
        solutionDesc: data.solution_desc || "",
        novelty: data.novelty || "",
        patentStatus: data.patent_status || "Not Filed",
        fundingRequired: data.funding_required || "₹2.5 Lakhs",
        trlLevel: data.trl_level || "TRL-3",
        status: data.status,
        submittedAt: data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString(),
        pitchDeckUrl: data.pitch_deck_url,
        views: Number(data.views) || 0,
      };
    } catch (err) {
      console.error("Supabase saveIdea error:", err);
      return null;
    }
  },

  async deleteIdea(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("ideas").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteIdea error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteIdea error:", err);
      return false;
    }
  },

  // 3. Startups
  async getStartups(): Promise<StartupItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getStartups error:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        tagline: r.tagline || (r.description ? r.description.slice(0, 80) : ""),
        industry: r.industry || r.domain || "DeepTech",
        stage: r.stage || r.batch || "Incubated Startup",
        foundedYear: r.founded_year || "2024",
        technology: Array.isArray(r.tags) && r.tags.length > 0 ? r.tags[0] : "Hardware / AI",
        fundingReceived: r.funding_received || r.funding_raised || "Bootstrapped",
        description: r.description || "",
        team: r.team || (Array.isArray(r.founders) ? r.founders.join(", ") : "Founding Team"),
        achievements: [],
        websiteUrl: r.website_url || "",
        logoUrl: r.logo_url || "",
        status: (r.status as any) || "Incubated",
        patents: Number(r.patents) || 0,
        valuation: r.valuation || "Pre-Seed",
        tags: Array.isArray(r.tags) ? r.tags : [],
      }));
    } catch (err) {
      console.warn("Supabase getStartups error:", err);
      return null;
    }
  },

  async saveStartup(startup: Partial<StartupItem> & { name: string; industry?: string; domain?: string }): Promise<StartupItem | null> {
    try {
      const supabase = getSupabase();
      const id = startup.id || `st-${Date.now()}`;
      const founders = Array.isArray((startup as any).founders)
        ? (startup as any).founders
        : typeof startup.team === "string"
        ? startup.team.split(",").map((t) => t.trim())
        : ["Founding Team"];
      const tags = Array.isArray(startup.tags) ? startup.tags : [];
      const domainVal = startup.industry || (startup as any).domain || "DeepTech";
      const fundingVal = startup.fundingReceived || (startup as any).fundingRaised || "Bootstrapped";

      const payload = {
        id,
        name: startup.name,
        founders,
        domain: domainVal,
        batch: (startup as any).batch || startup.stage || "Cohort 2026",
        funding_raised: fundingVal,
        funding_received: fundingVal,
        description: startup.description || "",
        website_url: startup.websiteUrl || "",
        logo_url: startup.logoUrl || "",
        status: startup.status || "Incubated",
        patents: Number(startup.patents) || 0,
        valuation: startup.valuation || "Pre-Seed",
        tags,
        stage: startup.stage || "Incubated Startup",
        industry: domainVal,
        team: typeof startup.team === "string" ? startup.team : founders.join(", "),
      };

      const { data, error } = await supabase
        .from("startups")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveStartup error:", error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        tagline: data.tagline || (data.description ? data.description.slice(0, 80) : ""),
        industry: data.industry || data.domain,
        stage: data.stage || data.batch,
        foundedYear: data.founded_year || "2024",
        technology: Array.isArray(data.tags) && data.tags.length > 0 ? data.tags[0] : "DeepTech",
        fundingReceived: data.funding_received || data.funding_raised,
        description: data.description,
        team: data.team || (Array.isArray(data.founders) ? data.founders.join(", ") : "Founding Team"),
        achievements: [],
        websiteUrl: data.website_url,
        logoUrl: data.logo_url,
        status: data.status,
        patents: Number(data.patents) || 0,
        valuation: data.valuation,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    } catch (err) {
      console.error("Supabase saveStartup error:", err);
      return null;
    }
  },

  async deleteStartup(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("startups").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteStartup error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteStartup error:", err);
      return false;
    }
  },

  // 4. Student Registrations
  async getRegistrations(): Promise<RegistrationItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getRegistrations error, falling back to local store:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        ticketId: r.ticket_id || `TIC-${r.id}`,
        studentName: r.student_name,
        enrollmentNo: r.enrollment_no,
        email: r.email,
        phone: r.phone || "",
        department: r.department,
        eventId: r.event_id || "",
        eventTitle: r.event_title,
        registrationDate: r.registration_date,
        status: r.status || "Registered",
        semester: r.semester || "6th Sem",
        notes: r.notes || "",
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
      }));
    } catch (err) {
      console.warn("Supabase getRegistrations error, falling back to local store:", err);
      return null;
    }
  },

  async saveRegistration(
    reg: Partial<RegistrationItem> & { studentName: string; email: string; eventTitle: string }
  ): Promise<RegistrationItem | null> {
    try {
      const supabase = getSupabase();
      const id = reg.id || `reg-${Date.now()}`;
      const ticketId = reg.ticketId || `GUI-${new Date().getFullYear()}-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const regDate = reg.registrationDate || new Date().toISOString().split("T")[0];

      const payload = {
        id,
        ticket_id: ticketId,
        student_name: reg.studentName,
        enrollment_no: reg.enrollmentNo || "N/A",
        email: reg.email,
        phone: reg.phone || "",
        department: reg.department || "Computer Science & Eng",
        event_id: reg.eventId || "",
        event_title: reg.eventTitle,
        registration_date: regDate,
        status: reg.status || "Registered",
        semester: reg.semester || "6th Sem",
        notes: reg.notes || "",
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("registrations")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveRegistration error:", error);
        return null;
      }

      return {
        id: data.id,
        ticketId: data.ticket_id,
        studentName: data.student_name,
        enrollmentNo: data.enrollment_no,
        email: data.email,
        phone: data.phone || "",
        department: data.department,
        eventId: data.event_id || "",
        eventTitle: data.event_title,
        registrationDate: data.registration_date,
        status: data.status,
        semester: data.semester || "6th Sem",
        notes: data.notes || "",
        createdAt: data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString(),
      };
    } catch (err) {
      console.error("Supabase saveRegistration error:", err);
      return null;
    }
  },

  async updateRegistrationStatus(
    id: string,
    status: "Registered" | "Attended" | "Cancelled" | "Waitlisted"
  ): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("registrations")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        console.error("Supabase updateRegistrationStatus error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase updateRegistrationStatus error:", err);
      return false;
    }
  },

  async deleteRegistration(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("registrations").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteRegistration error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteRegistration error:", err);
      return false;
    }
  },

  // 5. Mentors
  async getMentors(): Promise<MentorItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("mentors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getMentors error:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        designation: r.designation,
        role: r.role || r.designation,
        domain: r.domain,
        organization: r.organization,
        experience: r.experience,
        expertise: Array.isArray(r.expertise) ? r.expertise : [],
        avatar: r.avatar,
        email: r.email,
        status: r.status,
      }));
    } catch (err) {
      console.warn("Supabase getMentors error:", err);
      return null;
    }
  },

  async saveMentor(mentor: Partial<MentorItem> & { name: string }): Promise<MentorItem | null> {
    try {
      const supabase = getSupabase();
      const id = mentor.id || `men-${Date.now()}`;
      const payload = {
        id,
        name: mentor.name,
        designation: mentor.designation || "Mentor & Specialist",
        domain: mentor.domain || "Technology",
        organization: mentor.organization || "GSFC University",
        experience: mentor.experience || "5+ Years",
        expertise: Array.isArray(mentor.expertise) ? mentor.expertise : [],
        avatar: mentor.avatar || "",
        email: mentor.email || "",
        status: mentor.status || "Active",
      };

      const { data, error } = await supabase
        .from("mentors")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveMentor error:", error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        designation: data.designation,
        domain: data.domain,
        organization: data.organization,
        experience: data.experience,
        expertise: Array.isArray(data.expertise) ? data.expertise : [],
        avatar: data.avatar,
        email: data.email,
        status: data.status,
      };
    } catch (err) {
      console.error("Supabase saveMentor error:", err);
      return null;
    }
  },

  async deleteMentor(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("mentors").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteMentor error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteMentor error:", err);
      return false;
    }
  },

  // 6. Incubation Programs
  async getPrograms(): Promise<IncubationProgram[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getPrograms error:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        tagline: r.tagline || "",
        duration: r.duration || "6 Months",
        grantSupport: r.grant_support || "",
        targetCohort: r.target_cohort || "",
        description: r.description || "",
        features: Array.isArray(r.features) ? r.features : [],
        eligibility: Array.isArray(r.eligibility) ? r.eligibility : [],
        status: r.status,
      }));
    } catch (err) {
      console.warn("Supabase getPrograms error:", err);
      return null;
    }
  },

  async saveProgram(program: Partial<IncubationProgram> & { name: string }): Promise<IncubationProgram | null> {
    try {
      const supabase = getSupabase();
      const id = program.id || `prog-${Date.now()}`;
      const payload = {
        id,
        name: program.name,
        tagline: program.tagline || "",
        duration: program.duration || "6 Months",
        grant_support: program.grantSupport || "",
        target_cohort: program.targetCohort || "",
        description: program.description || "",
        features: Array.isArray(program.features) ? program.features : [],
        eligibility: Array.isArray(program.eligibility) ? program.eligibility : [],
        status: program.status || "Active",
      };

      const { data, error } = await supabase
        .from("programs")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveProgram error:", error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        tagline: data.tagline,
        duration: data.duration,
        grantSupport: data.grant_support,
        targetCohort: data.target_cohort,
        description: data.description,
        features: Array.isArray(data.features) ? data.features : [],
        eligibility: Array.isArray(data.eligibility) ? data.eligibility : [],
        status: data.status,
      };
    } catch (err) {
      console.error("Supabase saveProgram error:", err);
      return null;
    }
  },

  async deleteProgram(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("programs").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteProgram error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteProgram error:", err);
      return false;
    }
  },

  // 7. Applications
  async getApplications(): Promise<ApplicationItem[] | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase getApplications error:", error);
        return null;
      }

      return (data || []).map((r: any) => ({
        id: r.id,
        projectName: r.project_name,
        applicantName: r.applicant_name || r.applicant,
        email: r.email,
        phone: r.phone || "",
        track: r.track || "SSIP 2.0 Grant",
        stage: r.stage || "Prototype",
        status: r.status || "New",
        submittedDate: r.submitted_date || (r.created_at ? new Date(r.created_at).toISOString().split("T")[0] : ""),
        pitchSummary: r.pitch_summary || "",
        teamSize: Number(r.team_size) || 1,
        notes: r.notes || "",
      }));
    } catch (err) {
      console.warn("Supabase getApplications error:", err);
      return null;
    }
  },

  async saveApplication(app: Partial<ApplicationItem> & { projectName: string; applicantName: string }): Promise<ApplicationItem | null> {
    try {
      const supabase = getSupabase();
      const id = app.id || `app-${Date.now()}`;
      const payload = {
        id,
        project_name: app.projectName,
        applicant_name: app.applicantName,
        applicant: app.applicantName,
        email: app.email || "",
        phone: app.phone || "",
        track: app.track || "SSIP 2.0 Grant",
        stage: app.stage || "Prototype",
        status: app.status || "New",
        submitted_date: app.submittedDate || new Date().toISOString().split("T")[0],
        pitch_summary: app.pitchSummary || "",
        team_size: Number(app.teamSize) || 1,
        notes: app.notes || "",
      };

      const { data, error } = await supabase
        .from("applications")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase saveApplication error:", error);
        return null;
      }

      return {
        id: data.id,
        projectName: data.project_name,
        applicantName: data.applicant_name || data.applicant,
        email: data.email,
        phone: data.phone,
        track: data.track,
        stage: data.stage,
        status: data.status,
        submittedDate: data.submitted_date,
        pitchSummary: data.pitch_summary,
        teamSize: Number(data.team_size) || 1,
        notes: data.notes,
      };
    } catch (err) {
      console.error("Supabase saveApplication error:", err);
      return null;
    }
  },

  async deleteApplication(id: string): Promise<boolean> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) {
        console.error("Supabase deleteApplication error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase deleteApplication error:", err);
      return false;
    }
  },
};

// Backwards-compatibility alias so existing imports remain functional
export const NeonClient = SupabaseDbClient;
