import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Database,
  Search,
  RefreshCw,
  Download,
  ExternalLink,
  Layers,
  Table,
  CheckCircle2,
  Server,
  Key,
  Calendar,
  Users,
  Lightbulb,
  Rocket,
  Inbox,
  Shield,
  FileText,
  GraduationCap,
  Banknote,
  Handshake,
  HelpCircle,
  Settings,
  Bell,
  Sliders,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataStore } from "@/lib/adminStore";

export const Route = createFileRoute("/admin/database")({
  component: AdminDatabaseHubPage,
});

interface TableDefinition {
  id: string;
  name: string;
  category: "Core" | "Innovation" | "Ecosystem" | "Governance";
  description: string;
  primaryKey: string;
  icon: any;
  dedicatedRoute?: string;
  columns: { key: string; label: string; type: string }[];
  getData: () => any[];
}

export function AdminDatabaseHubPage() {
  const [activeTableId, setActiveTableId] = useState("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveData, setLiveData] = useState<{ [table: string]: any[] }>({});

  const loadAllTables = async () => {
    setIsRefreshing(true);
    try {
      await AdminDataStore.syncFromNeon();

      // Gather current state of all tables
      const events = AdminDataStore.getEvents();
      const ideas = AdminDataStore.getIdeas();
      const startups = AdminDataStore.getStartups();
      const applications = AdminDataStore.getApplications();
      const mentors = AdminDataStore.getMentors();
      const partners = AdminDataStore.getPartners();
      const programs = AdminDataStore.getPrograms();
      const funding = AdminDataStore.getFundingSchemes();
      const registrations = AdminDataStore.getRegistrations();
      const resources = AdminDataStore.getResources();
      const faqs = AdminDataStore.getFaqs();
      const users = AdminDataStore.getUsers();
      const auditLogs = AdminDataStore.getAuditLogs();
      const settings = AdminDataStore.getSettings();
      const notifications = AdminDataStore.getNotifications();

      // Flatten idea activity and comments
      const ideaActivity = ideas.flatMap((i) =>
        (i.activityTimeline || []).map((a) => ({
          id: a.id,
          ideaId: i.id,
          ideaTitle: i.title,
          action: a.action,
          performedBy: a.performedBy,
          timestamp: a.timestamp,
          notes: a.notes,
        })),
      );

      const ideaComments = ideas.flatMap((i) =>
        (i.evaluatorFeedback || []).map((c) => ({
          id: c.id,
          ideaId: i.id,
          ideaTitle: i.title,
          author: c.evaluatorName,
          role: c.evaluatorRole,
          rating: c.score ? `${c.score}/10` : "N/A",
          comment: c.remarks,
          createdAt: c.date,
        })),
      );

      const categories = [
        { id: "cat-1", name: "AI & Robotics", domain: "DeepTech", activeIdeas: ideas.filter((i) => i.domain.includes("AI")).length, status: "Active" },
        { id: "cat-2", name: "CleanTech & Energy", domain: "Sustainability", activeIdeas: ideas.filter((i) => i.domain.includes("Clean") || i.domain.includes("Energy")).length, status: "Active" },
        { id: "cat-3", name: "Biotech & Healthcare", domain: "LifeSciences", activeIdeas: ideas.filter((i) => i.domain.includes("Bio") || i.domain.includes("Health")).length, status: "Active" },
        { id: "cat-4", name: "IoT & Embedded", domain: "Hardware", activeIdeas: ideas.filter((i) => i.domain.includes("IoT")).length, status: "Active" },
        { id: "cat-5", name: "Chemical & Materials", domain: "Industrial", activeIdeas: ideas.filter((i) => i.domain.includes("Chem")).length, status: "Active" },
      ];

      const roles = [
        { id: "role-super", name: "Super Administrator", permissions: "ALL (*)", userCount: users.filter((u) => u.role === "Super Admin").length, status: "Active" },
        { id: "role-manager", name: "Incubation Manager", permissions: "events:write, ideas:write, registrations:write", userCount: users.filter((u) => u.role === "Incubation Manager").length, status: "Active" },
        { id: "role-reviewer", name: "ISC Reviewer / Mentor", permissions: "ideas:review, comments:write", userCount: users.filter((u) => u.role === "Reviewer").length, status: "Active" },
        { id: "role-student", name: "Innovator / Founder", permissions: "ideas:submit, apply:submit", userCount: 140, status: "Active" },
      ];

      setLiveData({
        events,
        ideas,
        startups,
        applications,
        mentors,
        partners,
        programs,
        funding_schemes: funding,
        registrations,
        resources,
        faqs,
        admin_users: users,
        audit_logs: auditLogs,
        settings: [settings],
        notifications,
        idea_activity: ideaActivity,
        idea_comments: ideaComments,
        categories,
        roles,
      });
    } catch (err) {
      console.error("Failed to load tables:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllTables();
    const handleUpdate = () => loadAllTables();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const tables: TableDefinition[] = useMemo(
    () => [
      {
        id: "events",
        name: "events",
        category: "Ecosystem",
        description: "Official incubation workshops, hackathons, bootcamps & masterclasses.",
        primaryKey: "id",
        icon: Calendar,
        dedicatedRoute: "/admin/events",
        columns: [
          { key: "id", label: "Event ID", type: "text (PK)" },
          { key: "title", label: "Event Title", type: "text" },
          { key: "date", label: "Scheduled Date", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "capacity", label: "Max Capacity", type: "integer" },
          { key: "registered", label: "Registered", type: "integer" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.events || [],
      },
      {
        id: "registrations",
        name: "registrations",
        category: "Ecosystem",
        description: "Student registrations, attendance verification & entry pass records.",
        primaryKey: "id",
        icon: GraduationCap,
        dedicatedRoute: "/admin/registrations",
        columns: [
          { key: "ticketId", label: "Ticket ID", type: "text" },
          { key: "studentName", label: "Student Name", type: "text" },
          { key: "enrollmentNo", label: "Enrollment No", type: "text" },
          { key: "email", label: "Email", type: "text" },
          { key: "eventTitle", label: "Event Title", type: "text" },
          { key: "status", label: "Attendance Status", type: "text" },
          { key: "registrationDate", label: "Registered On", type: "date" },
        ],
        getData: () => liveData.registrations || [],
      },
      {
        id: "ideas",
        name: "ideas",
        category: "Innovation",
        description: "Student and faculty innovation proposals, TRL stages & ISC evaluations.",
        primaryKey: "id",
        icon: Lightbulb,
        dedicatedRoute: "/admin/ideas",
        columns: [
          { key: "id", label: "Idea ID", type: "text (PK)" },
          { key: "title", label: "Project Title", type: "text" },
          { key: "innovator", label: "Lead Innovator", type: "text" },
          { key: "domain", label: "Thrust Area", type: "text" },
          { key: "trl", label: "TRL Stage", type: "integer" },
          { key: "status", label: "Evaluation Status", type: "text" },
          { key: "grantRecommended", label: "Grant Recommended", type: "text" },
        ],
        getData: () => liveData.ideas || [],
      },
      {
        id: "startups",
        name: "startups",
        category: "Innovation",
        description: "Incubated startup directory, venture stage, funding & founders.",
        primaryKey: "id",
        icon: Rocket,
        dedicatedRoute: "/admin/startups",
        columns: [
          { key: "id", label: "Venture ID", type: "text (PK)" },
          { key: "name", label: "Startup Name", type: "text" },
          { key: "founder", label: "Founders", type: "text" },
          { key: "domain", label: "Sector", type: "text" },
          { key: "stage", label: "Incubation Stage", type: "text" },
          { key: "fundingRaised", label: "Total Raised", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.startups || [],
      },
      {
        id: "applications",
        name: "applications",
        category: "Innovation",
        description: "Student startup & pre-incubation application queue for ISC triage.",
        primaryKey: "id",
        icon: Inbox,
        dedicatedRoute: "/admin/applications",
        columns: [
          { key: "id", label: "App ID", type: "text (PK)" },
          { key: "startupName", label: "Proposed Venture", type: "text" },
          { key: "applicantName", label: "Applicant Name", type: "text" },
          { key: "domain", label: "Domain", type: "text" },
          { key: "fundingRequested", label: "Grant Requested", type: "text" },
          { key: "status", label: "Review Status", type: "text" },
          { key: "submissionDate", label: "Submitted On", type: "date" },
        ],
        getData: () => liveData.applications || [],
      },
      {
        id: "mentors",
        name: "mentors",
        category: "Ecosystem",
        description: "Advisory board, academic scholars, and corporate mentors network.",
        primaryKey: "id",
        icon: Users,
        dedicatedRoute: "/admin/mentors",
        columns: [
          { key: "id", label: "Mentor ID", type: "text (PK)" },
          { key: "name", label: "Mentor Name", type: "text" },
          { key: "designation", label: "Designation", type: "text" },
          { key: "organization", label: "Organization", type: "text" },
          { key: "domain", label: "Domain", type: "text" },
          { key: "experience", label: "Experience", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.mentors || [],
      },
      {
        id: "funding_schemes",
        name: "funding_schemes",
        category: "Ecosystem",
        description: "Government & institutional grant programs (SSIP 2.0, NIDHI-EIR, etc.).",
        primaryKey: "id",
        icon: Banknote,
        dedicatedRoute: "/admin/funding",
        columns: [
          { key: "id", label: "Scheme ID", type: "text (PK)" },
          { key: "name", label: "Scheme Title", type: "text" },
          { key: "grantLimit", label: "Max Grant", type: "text" },
          { key: "beneficiaries", label: "Target Cohort", type: "text" },
          { key: "activeBeneficiaries", label: "Funded Projects", type: "integer" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.funding_schemes || [],
      },
      {
        id: "programs",
        name: "programs",
        category: "Ecosystem",
        description: "Structured incubation tracks, student innovation club & hackathons.",
        primaryKey: "id",
        icon: Layers,
        dedicatedRoute: "/admin/programs",
        columns: [
          { key: "id", label: "Program ID", type: "text (PK)" },
          { key: "title", label: "Program Name", type: "text" },
          { key: "targetCohort", label: "Target Audience", type: "text" },
          { key: "duration", label: "Duration", type: "text" },
          { key: "grantSupport", label: "Financial Grant", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.programs || [],
      },
      {
        id: "partners",
        name: "partners",
        category: "Ecosystem",
        description: "Government linkages, corporate alliances & institutional MOUs.",
        primaryKey: "id",
        icon: Handshake,
        dedicatedRoute: "/admin/partners",
        columns: [
          { key: "id", label: "Partner ID", type: "text (PK)" },
          { key: "name", label: "Partner Organization", type: "text" },
          { key: "type", label: "Partnership Type", type: "text" },
          { key: "mouScope", label: "MOU Scope", type: "text" },
          { key: "validTill", label: "Validity", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.partners || [],
      },
      {
        id: "resources",
        name: "resources",
        category: "Ecosystem",
        description: "Policy manuals, patent filing guidelines, and pitch deck templates.",
        primaryKey: "id",
        icon: FileText,
        dedicatedRoute: "/admin/resources",
        columns: [
          { key: "id", label: "Doc ID", type: "text (PK)" },
          { key: "title", label: "Document Title", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "fileType", label: "Format", type: "text" },
          { key: "downloads", label: "Downloads", type: "integer" },
          { key: "status", label: "Visibility", type: "text" },
        ],
        getData: () => liveData.resources || [],
      },
      {
        id: "faqs",
        name: "faqs",
        category: "Ecosystem",
        description: "Public and administrative knowledge base questions and answers.",
        primaryKey: "id",
        icon: HelpCircle,
        dedicatedRoute: "/admin/faqs",
        columns: [
          { key: "id", label: "FAQ ID", type: "text (PK)" },
          { key: "question", label: "Question", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "views", label: "Read Count", type: "integer" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.faqs || [],
      },
      {
        id: "admin_users",
        name: "admin_users",
        category: "Governance",
        description: "Administrative staff, ISC committee evaluators, and system access accounts.",
        primaryKey: "id",
        icon: Key,
        dedicatedRoute: "/admin/users",
        columns: [
          { key: "id", label: "User ID", type: "text (PK)" },
          { key: "name", label: "Full Name", type: "text" },
          { key: "email", label: "Email Address", type: "text" },
          { key: "role", label: "Assigned Role", type: "text" },
          { key: "department", label: "Department", type: "text" },
          { key: "status", label: "Account Status", type: "text" },
        ],
        getData: () => liveData.admin_users || [],
      },
      {
        id: "roles",
        name: "roles",
        category: "Governance",
        description: "Role-based access control (RBAC) levels and permission definitions.",
        primaryKey: "id",
        icon: Sliders,
        dedicatedRoute: "/admin/users",
        columns: [
          { key: "id", label: "Role ID", type: "text (PK)" },
          { key: "name", label: "Role Name", type: "text" },
          { key: "permissions", label: "Permissions Scope", type: "text" },
          { key: "userCount", label: "Users Assigned", type: "integer" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.roles || [],
      },
      {
        id: "audit_logs",
        name: "audit_logs",
        category: "Governance",
        description: "Security trail recording administrative mutations, logins, and timestamps.",
        primaryKey: "id",
        icon: Shield,
        dedicatedRoute: "/admin/audit-log",
        columns: [
          { key: "id", label: "Log ID", type: "text (PK)" },
          { key: "action", label: "Action Performed", type: "text" },
          { key: "actorName", label: "Admin Actor", type: "text" },
          { key: "actorRole", label: "Role", type: "text" },
          { key: "timestamp", label: "Timestamp", type: "text" },
          { key: "ipAddress", label: "Client IP", type: "text" },
        ],
        getData: () => liveData.audit_logs || [],
      },
      {
        id: "settings",
        name: "settings",
        category: "Governance",
        description: "Platform configuration, database health parameters & notification toggles.",
        primaryKey: "id",
        icon: Settings,
        dedicatedRoute: "/admin/settings",
        columns: [
          { key: "portalName", label: "Portal Name", type: "text" },
          { key: "supportEmail", label: "Support Email", type: "text" },
          { key: "databaseProvider", label: "Database Engine", type: "text" },
          { key: "neonSyncStatus", label: "Neon Connection", type: "text" },
          { key: "backupFrequency", label: "Backup Schedule", type: "text" },
        ],
        getData: () => liveData.settings || [],
      },
      {
        id: "notifications",
        name: "notifications",
        category: "Core",
        description: "System notifications dispatched to admins for registrations & applications.",
        primaryKey: "id",
        icon: Bell,
        columns: [
          { key: "id", label: "Notif ID", type: "text (PK)" },
          { key: "title", label: "Notification Title", type: "text" },
          { key: "message", label: "Message Body", type: "text" },
          { key: "type", label: "Severity Type", type: "text" },
          { key: "time", label: "Time", type: "text" },
          { key: "read", label: "Read Status", type: "boolean" },
        ],
        getData: () => liveData.notifications || [],
      },
      {
        id: "categories",
        name: "categories",
        category: "Innovation",
        description: "Thrust area taxonomies used for classification of projects and grants.",
        primaryKey: "id",
        icon: Layers,
        dedicatedRoute: "/admin/ideas",
        columns: [
          { key: "id", label: "Category ID", type: "text (PK)" },
          { key: "name", label: "Category Name", type: "text" },
          { key: "domain", label: "Cluster Domain", type: "text" },
          { key: "activeIdeas", label: "Active Ideas", type: "integer" },
          { key: "status", label: "Status", type: "text" },
        ],
        getData: () => liveData.categories || [],
      },
      {
        id: "idea_activity",
        name: "idea_activity",
        category: "Innovation",
        description: "Event audit stream tracking milestones, status changes & TRL advances.",
        primaryKey: "id",
        icon: Server,
        dedicatedRoute: "/admin/ideas",
        columns: [
          { key: "id", label: "Activity ID", type: "text (PK)" },
          { key: "ideaTitle", label: "Associated Project", type: "text" },
          { key: "action", label: "Milestone Action", type: "text" },
          { key: "performedBy", label: "Actor", type: "text" },
          { key: "timestamp", label: "Timestamp", type: "text" },
        ],
        getData: () => liveData.idea_activity || [],
      },
      {
        id: "idea_comments",
        name: "idea_comments",
        category: "Innovation",
        description: "ISC evaluation committee feedback, scoring matrices, and mentor reviews.",
        primaryKey: "id",
        icon: FileText,
        dedicatedRoute: "/admin/ideas",
        columns: [
          { key: "id", label: "Review ID", type: "text (PK)" },
          { key: "ideaTitle", label: "Associated Project", type: "text" },
          { key: "author", label: "Reviewer Name", type: "text" },
          { key: "role", label: "Reviewer Role", type: "text" },
          { key: "rating", label: "Score", type: "text" },
          { key: "createdAt", label: "Reviewed On", type: "text" },
        ],
        getData: () => liveData.idea_comments || [],
      },
    ],
    [liveData],
  );

  const currentTable = tables.find((t) => t.id === activeTableId) || tables[0];
  const tableData = currentTable ? currentTable.getData() : [];

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return tableData;
    const q = searchQuery.toLowerCase();
    return tableData.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q)),
    );
  }, [tableData, searchQuery]);

  const filteredTablesList = useMemo(() => {
    if (filterCategory === "All") return tables;
    return tables.filter((t) => t.category === filterCategory);
  }, [tables, filterCategory]);

  const totalRowCount = useMemo(() => {
    return tables.reduce((acc, t) => acc + t.getData().length, 0);
  }, [tables]);

  const handleExportCSV = () => {
    if (!filteredData.length) return;
    const headers = currentTable.columns.map((c) => c.label).join(",");
    const rows = filteredData.map((row) =>
      currentTable.columns
        .map((c) => {
          const val = row[c.key] ?? "";
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(","),
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `neon_${currentTable.name}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="Neon Database Tables Hub (19)"
      subtitle="Complete live overview and data inspector for all 19 Neon PostgreSQL database tables."
      actions={
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={loadAllTables}
            disabled={isRefreshing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              fontWeight: 600,
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
            <span>{isRefreshing ? "Syncing Neon..." : "Refresh Tables"}</span>
          </button>

          {currentTable.dedicatedRoute && (
            <Link
              to={currentTable.dedicatedRoute}
              className="btn btn-primary btn-sm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
              }}
            >
              <span>Open in Dedicated Manager</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      }
    >
      {/* 1. TOP DATABASE STATS BAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#eff6ff",
              color: "#2563eb",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Total Tables
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>19 / 19 Active</div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#ecfdf5",
              color: "#059669",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Neon Connection
            </div>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#059669", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              Live PostgreSQL Pooler
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#fdf4ff",
              color: "#c026d3",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Total Row Count
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>{totalRowCount} Records</div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#fffbeb",
              color: "#d97706",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Schema
            </div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>public (Default)</div>
          </div>
        </div>
      </div>

      {/* 2. MAIN TABLES EXPLORER LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Side: Tables Selector */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              All 19 Tables
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, background: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: "9999px" }}>
              19 Registered
            </span>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", margin: "4px 0 8px" }}>
            {["All", "Innovation", "Ecosystem", "Governance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: filterCategory === cat ? "#0f172a" : "#f1f5f9",
                  color: filterCategory === cat ? "#ffffff" : "#64748b",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tables List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "650px", overflowY: "auto" }}>
            {filteredTablesList.map((t) => {
              const Icon = t.icon;
              const isSelected = t.id === activeTableId;
              const rowCount = t.getData().length;

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTableId(t.id);
                    setSearchQuery("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: isSelected ? "1px solid #bfdbfe" : "1px solid transparent",
                    background: isSelected ? "#eff6ff" : "transparent",
                    color: isSelected ? "#1e40af" : "#334155",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isSelected ? 700 : 500,
                        fontFamily: "monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: isSelected ? "#dbeafe" : "#f1f5f9",
                      color: isSelected ? "#1e40af" : "#64748b",
                    }}
                  >
                    {rowCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Table Inspector & Data Grid */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Table Header Details */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e2e8f0",
              background: "#fafafa",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Table className="w-5 h-5 text-blue-600" />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "monospace",
                    margin: 0,
                  }}
                >
                  public.{currentTable.name}
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    background: "#ecfdf5",
                    color: "#059669",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  {filteredData.length} records
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "#f1f5f9",
                    color: "#475569",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  PK: {currentTable.primaryKey}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                {currentTable.description}
              </p>
            </div>

            {/* Action Buttons & Search */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <Search
                  className="w-4 h-4 text-slate-400"
                  style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="text"
                  placeholder={`Search in ${currentTable.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    fontSize: "13px",
                    padding: "7px 12px 7px 32px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    width: "220px",
                  }}
                />
              </div>

              <button
                className="btn btn-outline btn-sm"
                onClick={handleExportCSV}
                disabled={!filteredData.length}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Schema Columns Strip */}
          <div
            style={{
              padding: "10px 24px",
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              fontSize: "12px",
            }}
          >
            <span style={{ fontWeight: 700, color: "#64748b" }}>Schema Columns:</span>
            {currentTable.columns.map((col) => (
              <span
                key={col.key}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  color: "#334155",
                  fontFamily: "monospace",
                }}
              >
                <strong style={{ color: "#0f172a" }}>{col.key}</strong>
                <span style={{ color: "#94a3b8", marginLeft: "4px" }}>({col.type})</span>
              </span>
            ))}
          </div>

          {/* Data Records Table */}
          <div style={{ overflowX: "auto", minHeight: "350px" }}>
            {filteredData.length === 0 ? (
              <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
                <Table className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                  No records found
                </h4>
                <p style={{ fontSize: "13px", margin: 0 }}>
                  {searchQuery ? `No entries matched "${searchQuery}" in ${currentTable.name}.` : `The table ${currentTable.name} is currently empty.`}
                </p>
              </div>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    {currentTable.columns.map((col) => (
                      <th
                        key={col.key}
                        style={{
                          padding: "12px 16px",
                          fontWeight: 700,
                          color: "#475569",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr
                      key={row[currentTable.primaryKey] || idx}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {currentTable.columns.map((col) => {
                        const val = row[col.key];
                        let rendered: any = val;

                        if (typeof val === "boolean") {
                          rendered = (
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background: val ? "#ecfdf5" : "#fef2f2",
                                color: val ? "#059669" : "#dc2626",
                              }}
                            >
                              {val ? "TRUE" : "FALSE"}
                            </span>
                          );
                        } else if (col.key === "status") {
                          rendered = (
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: "9999px",
                                background:
                                  val === "Active" || val === "Registered" || val === "Attended" || val === "Registration Open" || val === "Approved"
                                    ? "#ecfdf5"
                                    : val === "Pending" || val === "Under Review" || val === "Upcoming"
                                      ? "#fffbeb"
                                      : "#f1f5f9",
                                color:
                                  val === "Active" || val === "Registered" || val === "Attended" || val === "Registration Open" || val === "Approved"
                                    ? "#059669"
                                    : val === "Pending" || val === "Under Review" || val === "Upcoming"
                                      ? "#d97706"
                                      : "#475569",
                              }}
                            >
                              {String(val || "N/A")}
                            </span>
                          );
                        } else if (val === null || val === undefined || val === "") {
                          rendered = <span style={{ color: "#94a3b8", fontStyle: "italic" }}>null</span>;
                        } else if (typeof val === "object") {
                          rendered = <span style={{ fontFamily: "monospace", fontSize: "11px" }}>{JSON.stringify(val)}</span>;
                        }

                        return (
                          <td
                            key={col.key}
                            style={{
                              padding: "12px 16px",
                              color: col.key === currentTable.primaryKey ? "#0f172a" : "#334155",
                              fontWeight: col.key === currentTable.primaryKey ? 700 : 400,
                              fontFamily: col.key === currentTable.primaryKey || col.key.includes("Id") || col.key.includes("No") ? "monospace" : "inherit",
                              whiteSpace: col.key === "desc" || col.key === "description" ? "normal" : "nowrap",
                              maxWidth: "300px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {rendered}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
