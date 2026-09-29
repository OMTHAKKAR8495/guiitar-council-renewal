import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  Trash2,
  Check,
  X,
  Clock,
  Building,
  RefreshCw,
  Mail,
  Phone,
  Ticket,
  UserCheck,
  Sparkles,
  ChevronRight,
  Eye,
  AlertCircle,
  Printer,
  FileText,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminDataStore,
  type RegistrationItem,
  type EventItem,
} from "@/lib/adminStore";
import { NeonClient } from "@/lib/neonClient";

const formatDateTime = (date = new Date()) => {
  try {
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return new Date().toISOString().split("T")[0];
  }
};

export const Route = createFileRoute("/admin/registrations")({
  component: AdminRegistrationsPage,
});

export function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [printTarget, setPrintTarget] = useState<"all" | RegistrationItem | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationItem | null>(null);

  // New Registration form data
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentNo: "",
    email: "",
    phone: "",
    department: "Computer Science & Eng",
    semester: "6th Sem",
    eventId: "",
    eventTitle: "",
    registrationDate: new Date().toISOString().split("T")[0],
    status: "Registered" as "Registered" | "Attended" | "Cancelled" | "Waitlisted",
    notes: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      // First load from memory/cache
      const localRegs = AdminDataStore.getRegistrations();
      const localEvents = AdminDataStore.getEvents();
      setRegistrations(localRegs);
      setEvents(localEvents);

      if (localEvents.length > 0 && !formData.eventId) {
        setFormData((prev) => ({
          ...prev,
          eventId: localEvents[0].id,
          eventTitle: localEvents[0].title,
        }));
      }

      // Sync fresh from live Neon DB
      const dbRegs = await NeonClient.getRegistrations();
      if (dbRegs && dbRegs.length > 0) {
        setRegistrations(dbRegs);
        AdminDataStore.setRegistrations(dbRegs);
      }
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleStoreUpdate = () => {
      setRegistrations(AdminDataStore.getRegistrations());
      setEvents(AdminDataStore.getEvents());
    };
    window.addEventListener("guiitar_store_update", handleStoreUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleStoreUpdate);
  }, []);

  // Filter logic
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      // Search query filter (Name, Enrollment, Email, Ticket, Event)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        reg.studentName.toLowerCase().includes(q) ||
        reg.enrollmentNo.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q) ||
        reg.ticketId.toLowerCase().includes(q) ||
        reg.eventTitle.toLowerCase().includes(q);

      // Event filter
      const matchesEvent =
        selectedEvent === "all" ||
        reg.eventId === selectedEvent ||
        reg.eventTitle === selectedEvent;

      // Department filter
      const matchesDept = selectedDept === "all" || reg.department === selectedDept;

      // Status filter
      const matchesStatus = selectedStatus === "all" || reg.status === selectedStatus;

      // Date Range Filter
      let matchesDate = true;
      if (startDate || endDate) {
        const regDateStr = reg.registrationDate; // YYYY-MM-DD or parseable
        if (regDateStr) {
          const regTime = new Date(regDateStr).getTime();
          if (startDate) {
            const startTime = new Date(startDate).getTime();
            if (regTime < startTime) matchesDate = false;
          }
          if (endDate) {
            const endTime = new Date(endDate).getTime() + 86400000; // inclusive of end day
            if (regTime > endTime) matchesDate = false;
          }
        }
      }

      return matchesSearch && matchesEvent && matchesDept && matchesStatus && matchesDate;
    });
  }, [registrations, searchQuery, selectedEvent, selectedDept, selectedStatus, startDate, endDate]);

  // Unique departments for filter dropdown
  const uniqueDepartments = useMemo(() => {
    const depts = new Set<string>();
    registrations.forEach((r) => {
      if (r.department) depts.add(r.department);
    });
    // Add defaults
    [
      "Biotechnology",
      "Computer Science & Eng",
      "Mechanical Engineering",
      "Chemical Engineering",
      "Information Technology",
      "School of Management",
    ].forEach((d) => depts.add(d));
    return Array.from(depts);
  }, [registrations]);

  // KPI calculations
  const stats = useMemo(() => {
    const total = registrations.length;
    const attended = registrations.filter((r) => r.status === "Attended").length;
    const registered = registrations.filter((r) => r.status === "Registered").length;
    const cancelled = registrations.filter((r) => r.status === "Cancelled").length;
    const attendanceRate = total > 0 ? Math.round((attended / total) * 100) : 0;
    return { total, attended, registered, cancelled, attendanceRate };
  }, [registrations]);

  const handleCreateRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.email || !formData.eventTitle) {
      setToast("Please fill all required fields.");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const saved = AdminDataStore.saveRegistration({
      studentName: formData.studentName,
      enrollmentNo: formData.enrollmentNo || "N/A",
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      semester: formData.semester,
      eventId: formData.eventId,
      eventTitle: formData.eventTitle,
      registrationDate: formData.registrationDate || new Date().toISOString().split("T")[0],
      status: formData.status,
      notes: formData.notes,
    });

    setAddModalOpen(false);
    setFormData({
      studentName: "",
      enrollmentNo: "",
      email: "",
      phone: "",
      department: "Computer Science & Eng",
      semester: "6th Sem",
      eventId: events[0]?.id || "",
      eventTitle: events[0]?.title || "",
      registrationDate: new Date().toISOString().split("T")[0],
      status: "Registered",
      notes: "",
    });

    setToast(`Successfully registered student "${saved.studentName}" (Ticket: ${saved.ticketId}) & saved to Neon DB!`);
    setTimeout(() => setToast(null), 4000);
  };

  const handleStatusChange = (id: string, newStatus: "Registered" | "Attended" | "Cancelled" | "Waitlisted") => {
    AdminDataStore.updateRegistrationStatus(id, newStatus);
    setToast(`Updated attendance status to "${newStatus}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete registration for "${name}"? This will sync immediately to Neon DB.`)) {
      AdminDataStore.deleteRegistration(id);
      setToast(`Deleted registration for "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Ticket ID",
      "Student Name",
      "Enrollment No",
      "Email",
      "Phone",
      "Department",
      "Semester",
      "Event Title",
      "Registration Date",
      "Attendance Status",
      "Notes",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.ticketId}"`,
      `"${r.studentName}"`,
      `"${r.enrollmentNo}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.department}"`,
      `"${r.semester || ''}"`,
      `"${r.eventTitle}"`,
      `"${r.registrationDate}"`,
      `"${r.status}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GUIITAR_Student_Registrations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPrintPreview = (target: "all" | RegistrationItem) => {
    setPrintTarget(target);
    setPreviewModalOpen(true);
  };

  const handlePrintColorRoster = () => {
    handleOpenPrintPreview("all");
  };

  const handlePrintSingleTicket = (item: RegistrationItem) => {
    handleOpenPrintPreview(item);
  };

  const getDocumentHTML = (target: "all" | RegistrationItem) => {
    let docTitle = "GUIITAR_Council_Document";
    let contentHtml = "";

    if (target === "all") {
      docTitle = `GUIITAR_Attendance_Roster_${new Date().toISOString().split("T")[0]}`;
      const totalEnrolled = filteredRegistrations.length;
      const attendedCount = filteredRegistrations.filter((r) => r.status === "Attended").length;
      const registeredCount = filteredRegistrations.filter((r) => r.status === "Registered").length;
      const attendancePct = totalEnrolled > 0 ? Math.round((attendedCount / totalEnrolled) * 100) : 0;
      const nowStr = formatDateTime();
      const eventScope = selectedEvent === "all" ? "All Events & Workshops" : selectedEvent;

      const rowsHtml = filteredRegistrations
        .map((r, idx) => {
          const statusBg = r.status === "Attended" ? "#ecfdf5" : r.status === "Registered" ? "#eff6ff" : r.status === "Waitlisted" ? "#fef3c7" : "#fef2f2";
          const statusColor = r.status === "Attended" ? "#065f46" : r.status === "Registered" ? "#1e40af" : r.status === "Waitlisted" ? "#92400e" : "#991b1b";
          const statusBorder = r.status === "Attended" ? "#a7f3d0" : r.status === "Registered" ? "#bfdbfe" : r.status === "Waitlisted" ? "#fde68a" : "#fecaca";

          return `
            <tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#f8fafc"}">
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 700; text-align: center;">${idx + 1}</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-family: monospace; font-weight: 700; color: #2563eb;">${r.ticketId}</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">
                <strong>${r.studentName}</strong>
                <div style="font-size: 10px; color: #64748b;">${r.email}</div>
              </td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 600;">${r.enrollmentNo || "N/A"}</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.department} (${r.semester || "UG"})</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; max-width: 180px;">${r.eventTitle}</td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">
                <span style="display: inline-block; background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 10px;">
                  ${r.status}
                </span>
              </td>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">
                <div style="height: 18px; border-bottom: 1px dotted #94a3b8; width: 70px; margin: 0 auto;"></div>
              </td>
            </tr>
          `;
        })
        .join("");

      contentHtml = `
        <div style="padding: 16px 20px; color: #0f172a;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <img src="/guiitar-council-logo.png" alt="GUIITAR Council" style="height: 48px; width: auto; object-fit: contain;" />
              <div>
                <h1 style="font-size: 18px; font-weight: 800; margin: 0; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
                  GUIITAR COUNCIL — GSFC UNIVERSITY
                </h1>
                <p style="font-size: 12px; color: #475569; margin: 2px 0 0; font-weight: 600;">
                  Official Student Workshop & Masterclass Attendance Roster
                </p>
              </div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #64748b;">
              <div><strong>Generated:</strong> ${nowStr}</div>
              <div><strong>Scope:</strong> ${eventScope}</div>
              <div><strong>Total Records:</strong> ${totalEnrolled}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px;">
            <div style="border: 1px solid #bfdbfe; background: #eff6ff; padding: 8px 12px; border-radius: 8px;">
              <span style="font-size: 10px; color: #1e40af; font-weight: 700; text-transform: uppercase;">Total Enrolled</span>
              <div style="font-size: 16px; font-weight: 800; color: #1e3a8a;">${totalEnrolled}</div>
            </div>
            <div style="border: 1px solid #a7f3d0; background: #ecfdf5; padding: 8px 12px; border-radius: 8px;">
              <span style="font-size: 10px; color: #065f46; font-weight: 700; text-transform: uppercase;">Verified Attended</span>
              <div style="font-size: 16px; font-weight: 800; color: #047857;">${attendedCount}</div>
            </div>
            <div style="border: 1px solid #fde68a; background: #fef3c7; padding: 8px 12px; border-radius: 8px;">
              <span style="font-size: 10px; color: #92400e; font-weight: 700; text-transform: uppercase;">Upcoming / Registered</span>
              <div style="font-size: 16px; font-weight: 800; color: #b45309;">${registeredCount}</div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
              <span style="font-size: 10px; color: #475569; font-weight: 700; text-transform: uppercase;">Attendance Rate</span>
              <div style="font-size: 16px; font-weight: 800; color: #0f172a;">${attendancePct}%</div>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 20px;">
            <thead>
              <tr style="background: #1e3a8a; color: #ffffff; text-align: left;">
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a; text-align: center; width: 30px;">#</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a;">Ticket ID</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a;">Student Name</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a;">Enrollment No</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a;">Department & Sem</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a;">Workshop / Event</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a; text-align: center;">Status</th>
                <th style="padding: 7px 8px; border: 1px solid #1e3a8a; text-align: center; width: 90px;">Student Sign</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; margin-top: 24px; padding-top: 12px;">
            <div style="text-align: center; width: 190px;">
              <div style="border-bottom: 1px solid #0f172a; height: 32px; margin-bottom: 6px;"></div>
              <strong style="font-size: 11px; color: #0f172a;">Event Coordinator / Mentor</strong>
            </div>
            <div style="text-align: center; width: 190px;">
              <div style="border-bottom: 1px solid #0f172a; height: 32px; margin-bottom: 6px;"></div>
              <strong style="font-size: 11px; color: #0f172a;">GUIITAR Council Official Seal</strong>
            </div>
          </div>
        </div>
      `;
    } else {
      const item = target;
      docTitle = `GUIITAR_Pass_${item.ticketId}`;
      contentHtml = `
        <div style="padding: 24px; max-width: 620px; margin: 0 auto; color: #0f172a;">
          <div style="border: 2px solid #2563eb; border-radius: 14px; overflow: hidden; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="/guiitar-council-logo.png" alt="GUIITAR" style="height: 40px; width: auto; background: #ffffff; padding: 3px 6px; border-radius: 6px;" />
                <div>
                  <h2 style="font-size: 17px; font-weight: 800; margin: 0;">OFFICIAL WORKSHOP PASS</h2>
                  <p style="font-size: 11px; margin: 0; opacity: 0.9;">GUIITAR Council — GSFC University</p>
                </div>
              </div>
              <div style="text-align: right;">
                <span style="background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.4); padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">
                  ${item.status}
                </span>
                <div style="font-size: 13px; font-weight: 800; font-family: monospace; margin-top: 4px; letter-spacing: 0.5px;">
                  ${item.ticketId}
                </div>
              </div>
            </div>

            <div style="padding: 18px 22px;">
              <div style="margin-bottom: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                <span style="font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700;">Workshop / Event</span>
                <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 2px 0 0;">${item.eventTitle}</h3>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px; margin-bottom: 16px;">
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Student Full Name</span>
                  <strong style="color: #0f172a; font-size: 13.5px;">${item.studentName}</strong>
                </div>
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Enrollment / Roll No</span>
                  <strong style="color: #0f172a; font-size: 13.5px;">${item.enrollmentNo || "N/A"}</strong>
                </div>
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Department & Semester</span>
                  <strong style="color: #0f172a;">${item.department} (${item.semester || "UG"})</strong>
                </div>
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Registration Date</span>
                  <strong style="color: #0f172a;">${item.registrationDate}</strong>
                </div>
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Student Email</span>
                  <strong style="color: #2563eb;">${item.email}</strong>
                </div>
                <div>
                  <span style="color: #64748b; display: block; font-size: 10.5px;">Phone Number</span>
                  <strong style="color: #0f172a;">${item.phone || "N/A"}</strong>
                </div>
              </div>

              ${
                item.notes
                  ? `<div style="background: #fffbeb; border: 1px solid #fef3c7; padding: 8px 12px; border-radius: 6px; font-size: 11px; margin-bottom: 14px;">
                      <strong>Special Note:</strong> ${item.notes}
                    </div>`
                  : ""
              }

              <div style="border-top: 2px dashed #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 10px; color: #64748b; max-width: 340px;">
                  Present this physical or digital color pass at the GUIITAR Incubation Desk on arrival.
                </div>
                <div style="border: 1px solid #94a3b8; border-radius: 6px; padding: 5px 12px; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                  Desk Verification Seal
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${docTitle}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 10mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  ${contentHtml}
</body>
</html>`;
  };

  const printDocumentDirectly = (target: "all" | RegistrationItem | null) => {
    if (!target) return;
    try {
      const htmlContent = getDocumentHTML(target);
      const printWin = window.open("", "_blank", "width=900,height=900");
      if (printWin) {
        printWin.document.open();
        printWin.document.write(htmlContent);
        printWin.document.close();
        setTimeout(() => {
          try {
            printWin.focus();
            printWin.print();
            printWin.close();
          } catch (e) {
            console.error("Popup print error:", e);
          }
        }, 300);
        return;
      }
    } catch (err) {
      console.error("Print window open error:", err);
    }

    // Fallback: in-page print
    setPrintTarget(target);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDirectBrowserPrint = () => {
    printDocumentDirectly(printTarget);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedEvent("all");
    setSelectedDept("all");
    setSelectedStatus("all");
    setStartDate("");
    setEndDate("");
  };

  const isFiltered = searchQuery || selectedEvent !== "all" || selectedDept !== "all" || selectedStatus !== "all" || startDate || endDate;

  return (
    <AdminLayout
      title="Student Registrations & Workshop Attendance"
      subtitle="Track verified student enrollments, issue registration tickets, and manage event check-ins stored live on Neon Postgres."
      breadcrumbs={[
        { label: "Admin", href: "/admin/dashboard" },
        { label: "Events & Workshops", href: "/admin/events" },
        { label: "Student Registrations" },
      ]}
      actions={
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => loadData()}
            disabled={loading}
            className="btn btn-outline btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ffffff" }}
            title="Fetch latest registrations from Neon Postgres"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-blue-600" : ""}`} />
            <span>{loading ? "Syncing..." : "Sync Neon DB"}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="btn btn-outline btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ffffff" }}
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintColorRoster}
            className="btn btn-outline btn-sm"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#ffffff",
              borderColor: "#2563eb",
              color: "#2563eb",
              fontWeight: 600,
            }}
            title="Download / Print attendance roster in PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download in PDF</span>
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus className="w-4 h-4" />
            <span>Register Student</span>
          </button>
        </div>
      }
    >
      {/* Toast feedback message */}
      {toast && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "12px 18px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* KPI METRIC CARDS */}
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
            padding: "18px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Total Registrations
            </span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "grid", placeItems: "center", color: "#2563eb" }}>
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>
            {stats.total}
          </div>
          <span style={{ fontSize: "12px", color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
            Live in Neon Database
          </span>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "18px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Verified Attended
            </span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ecfdf5", display: "grid", placeItems: "center", color: "#059669" }}>
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#059669", marginTop: "8px" }}>
            {stats.attended}
          </div>
          <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
            {stats.attendanceRate}% Attendance Rate
          </span>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "18px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Upcoming / Registered
            </span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fef3c7", display: "grid", placeItems: "center", color: "#d97706" }}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#d97706", marginTop: "8px" }}>
            {stats.registered}
          </div>
          <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
            Confirmed ticket holders
          </span>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "18px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Active Workshops
            </span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3e8ff", display: "grid", placeItems: "center", color: "#9333ea" }}>
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#9333ea", marginTop: "8px" }}>
            {events.length}
          </div>
          <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
            Published across catalog
          </span>
        </div>
      </div>

      {/* COMPREHENSIVE FILTER & DATE SELECTION BAR */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          padding: "20px",
          marginBottom: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter className="w-4 h-4 text-blue-600" />
            <strong style={{ fontSize: "14.5px", color: "#0f172a" }}>Filter Registrations</strong>
            {isFiltered && (
              <span style={{ fontSize: "11px", fontWeight: 700, background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: "12px" }}>
                Active Filters
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={clearAllFilters}
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <X className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>

        {/* Top search & dropdowns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            marginBottom: "16px",
          }}
        >
          {/* Live Search Input */}
          <div style={{ position: "relative" }}>
            <Search className="w-4 h-4 text-slate-400" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, enrollment, email..."
              style={{
                width: "100%",
                padding: "9px 12px 9px 36px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                boxSizing: "border-box",
                background: "#f8fafc",
              }}
            />
          </div>

          {/* Event Filter */}
          <div>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                boxSizing: "border-box",
                background: "#f8fafc",
                color: "#334155",
              }}
            >
              <option value="all">All Events & Workshops</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.title}>
                  {ev.title.length > 35 ? ev.title.substring(0, 35) + "..." : ev.title}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                boxSizing: "border-box",
                background: "#f8fafc",
                color: "#334155",
              }}
            >
              <option value="all">All Academic Departments</option>
              {uniqueDepartments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Attendance Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13.5px",
                boxSizing: "border-box",
                background: "#f8fafc",
                color: "#334155",
              }}
            >
              <option value="all">All Attendance Statuses</option>
              <option value="Registered">Registered (Upcoming)</option>
              <option value="Attended">Attended (Checked In)</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Waitlisted">Waitlisted</option>
            </select>
          </div>
        </div>

        {/* Dedicated Date Range Selector with Calendar Pickers */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            paddingTop: "14px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <Calendar className="w-4 h-4 text-slate-500" />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#475569" }}>
              Date Range:
            </span>
          </div>

          {/* From Date input with native visual calendar */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>From</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "7px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#f8fafc",
                color: "#0f172a",
                cursor: "pointer",
              }}
            />
          </div>

          {/* To Date input with native visual calendar */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>To</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "7px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#f8fafc",
                color: "#0f172a",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                const today = new Date().toISOString().split("T")[0];
                setStartDate(today);
                setEndDate(today);
              }}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "#f1f5f9",
                fontSize: "12px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => {
                const curr = new Date();
                const first = curr.getDate() - curr.getDay();
                const firstDay = new Date(curr.setDate(first)).toISOString().split("T")[0];
                const lastDay = new Date(curr.setDate(first + 6)).toISOString().split("T")[0];
                setStartDate(firstDay);
                setEndDate(lastDay);
              }}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "#f1f5f9",
                fontSize: "12px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              This Week
            </button>

            <button
              type="button"
              onClick={() => {
                const date = new Date();
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split("T")[0];
                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split("T")[0];
                setStartDate(firstDay);
                setEndDate(lastDay);
              }}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "#f1f5f9",
                fontSize: "12px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              This Month
            </button>

            <button
              type="button"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "#f1f5f9",
                fontSize: "12px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              All Dates
            </button>
          </div>
        </div>
      </div>

      {/* REGISTRATIONS TABLE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <strong style={{ fontSize: "15px", color: "#0f172a" }}>
              Registered Students ({filteredRegistrations.length})
            </strong>
            <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "8px" }}>
              {isFiltered ? "Filtered results" : "Showing all records"}
            </span>
          </div>
          <button
            onClick={handlePrintColorRoster}
            className="btn btn-outline btn-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              padding: "5px 12px",
              borderRadius: "8px",
              borderColor: "#bfdbfe",
              background: "#eff6ff",
              color: "#1e40af",
              fontWeight: 600,
            }}
            title="Download attendance roster in PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Attendance PDF</span>
          </button>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#f1f5f9",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 12px",
                color: "#94a3b8",
              }}
            >
              <Search className="w-6 h-6" />
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
              No matching registrations found
            </h4>
            <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
              Try adjusting your search terms, date range, or department filters.
            </p>
            {isFiltered && (
              <button
                onClick={clearAllFilters}
                className="btn btn-outline btn-sm"
                style={{ marginTop: "16px" }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket / Student</th>
                  <th>Contact Info</th>
                  <th>Event / Masterclass</th>
                  <th>Department & Sem</th>
                  <th>Reg. Date</th>
                  <th>Attendance Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r) => {
                  const statusColors = {
                    Attended: { bg: "#ecfdf5", text: "#065f46", border: "#a7f3d0" },
                    Registered: { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" },
                    Cancelled: { bg: "#fef2f2", text: "#991b1b", border: "#fecaca" },
                    Waitlisted: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
                  }[r.status] || { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };

                  return (
                    <tr key={r.id}>
                      {/* Ticket & Student */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              color: "#2563eb",
                              fontFamily: "monospace",
                              background: "#eff6ff",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              width: "fit-content",
                            }}
                          >
                            {r.ticketId}
                          </span>
                          <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                            {r.studentName}
                          </strong>
                          <span style={{ fontSize: "12px", color: "#64748b" }}>
                            Enroll: {r.enrollmentNo || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <a
                            href={`mailto:${r.email}`}
                            style={{
                              fontSize: "12.5px",
                              color: "#2563eb",
                              textDecoration: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span>{r.email}</span>
                          </a>
                          {r.phone && (
                            <a
                              href={`tel:${r.phone}`}
                              style={{
                                fontSize: "12px",
                                color: "#64748b",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span>{r.phone}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Event */}
                      <td>
                        <div style={{ maxWidth: "260px" }}>
                          <strong
                            style={{
                              fontSize: "13.5px",
                              color: "#0f172a",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              lineHeight: 1.3,
                            }}
                          >
                            {r.eventTitle}
                          </strong>
                        </div>
                      </td>

                      {/* Department & Semester */}
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "13px", color: "#334155", fontWeight: 600 }}>
                            {r.department}
                          </span>
                          <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                            {r.semester || "Undergraduate"}
                          </span>
                        </div>
                      </td>

                      {/* Registration Date */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span style={{ fontSize: "12.5px", color: "#334155", fontWeight: 500 }}>
                            {r.registrationDate}
                          </span>
                        </div>
                      </td>

                      {/* Status Selector Dropdown */}
                      <td>
                        <select
                          value={r.status}
                          onChange={(e) => handleStatusChange(r.id, e.target.value as any)}
                          style={{
                            background: statusColors.bg,
                            color: statusColors.text,
                            border: `1px solid ${statusColors.border}`,
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <option value="Registered">Registered</option>
                          <option value="Attended">Attended</option>
                          <option value="Waitlisted">Waitlisted</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <button
                            onClick={() => {
                              setSelectedRegistration(r);
                              setDetailModalOpen(true);
                            }}
                            title="View Registration Details"
                            className="btn btn-outline btn-sm"
                            style={{ padding: "5px 8px" }}
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-600" />
                          </button>

                          <button
                            onClick={() => handlePrintSingleTicket(r)}
                            title="Download Student Entry Pass in PDF"
                            className="btn btn-outline btn-sm"
                            style={{ padding: "5px 8px", color: "#2563eb", borderColor: "#bfdbfe" }}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                r.id,
                                r.status === "Attended" ? "Registered" : "Attended"
                              )
                            }
                            title={r.status === "Attended" ? "Mark as Registered" : "Quick Check-in (Mark Attended)"}
                            className="btn btn-outline btn-sm"
                            style={{
                              padding: "5px 8px",
                              color: r.status === "Attended" ? "#059669" : "#2563eb",
                              borderColor: r.status === "Attended" ? "#a7f3d0" : "#bfdbfe",
                              background: r.status === "Attended" ? "#ecfdf5" : "#ffffff",
                            }}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(r.id, r.studentName)}
                            title="Delete Registration"
                            className="btn btn-outline btn-sm"
                            style={{ padding: "5px 8px", color: "#ef4444", borderColor: "#fca5a5" }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* REGISTER STUDENT MODAL */}
      {addModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", color: "#2563eb", display: "grid", placeItems: "center" }}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Register Student for Workshop / Event
                  </h3>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    Saves directly to live Neon Postgres DB
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRegistration}>
              {/* Event selection */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  Select Event / Masterclass *
                </label>
                <select
                  required
                  value={formData.eventId}
                  onChange={(e) => {
                    const selected = events.find((ev) => ev.id === e.target.value);
                    setFormData({
                      ...formData,
                      eventId: e.target.value,
                      eventTitle: selected ? selected.title : formData.eventTitle,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.date})
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Name & Enrollment */}
              <div className="form-row-2" style={{ gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g., Aarav Patel"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Enrollment / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.enrollmentNo}
                    onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                    placeholder="e.g., 22BT04019"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="form-row-2" style={{ gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Student Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gsfcuniversity.ac.in"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Phone / Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98251 12345"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Department & Semester */}
              <div className="form-row-2" style={{ gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Academic Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Computer Science & Eng">Computer Science & Eng</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="School of Management">School of Management</option>
                    <option value="Fire & Safety">Fire & Safety</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Semester / Year
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="1st Sem">1st Sem</option>
                    <option value="2nd Sem">2nd Sem</option>
                    <option value="3rd Sem">3rd Sem</option>
                    <option value="4th Sem">4th Sem</option>
                    <option value="5th Sem">5th Sem</option>
                    <option value="6th Sem">6th Sem</option>
                    <option value="7th Sem">7th Sem</option>
                    <option value="8th Sem">8th Sem</option>
                    <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                  </select>
                </div>
              </div>

              {/* Registration Date & Initial Status */}
              <div className="form-row-2" style={{ gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Registration Date (Pick Date) *
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="date"
                      required
                      value={formData.registrationDate}
                      onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                    Initial Attendance Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="Registered">Registered (Confirmed)</option>
                    <option value="Attended">Attended (Checked In)</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                  Administrative Notes / Remarks (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Lead innovator for prototype project, special lab permission granted"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13.5px",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Check className="w-4 h-4" />
                  Save Registration to Neon DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModalOpen && selectedRegistration && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "550px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", background: "#eff6ff", padding: "2px 8px", borderRadius: "4px" }}>
                  {selectedRegistration.ticketId}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "6px 0 0" }}>
                  {selectedRegistration.studentName}
                </h3>
              </div>
              <button
                onClick={() => setDetailModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                Enrolled Workshop
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a" }}>
                {selectedRegistration.eventTitle}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px", fontSize: "13px" }}>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Enrollment No</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.enrollmentNo || "N/A"}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Department</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.department}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Email</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.email}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Phone</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.phone || "N/A"}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Registration Date</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.registrationDate}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Status</span>
                <strong style={{ color: "#0f172a" }}>{selectedRegistration.status}</strong>
              </div>
            </div>

            {selectedRegistration.notes && (
              <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#92400e", display: "block", marginBottom: "2px" }}>
                  Notes:
                </span>
                <span style={{ fontSize: "13px", color: "#78350f" }}>{selectedRegistration.notes}</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => handlePrintSingleTicket(selectedRegistration)}
                className="btn btn-outline btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "6px", borderColor: "#2563eb", color: "#2563eb", fontWeight: 600 }}
              >
                <FileText className="w-4 h-4" />
                <span>Download Pass (PDF)</span>
              </button>
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="btn btn-primary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE PRINT PREVIEW MODAL */}
      {previewModalOpen && printTarget && (
        <div
          className="print-preview-modal-backdrop no-print"
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              maxWidth: "920px",
              width: "100%",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 22px",
                borderBottom: "1px solid #e2e8f0",
                background: "#f8fafc",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ background: "#eff6ff", color: "#2563eb", padding: "8px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                    Print & Export Preview
                  </h3>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                    {printTarget === "all" ? "Full Workshop Attendance Roster (A4 Color)" : `Individual Pass: ${printTarget.studentName} (${printTarget.ticketId})`}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleDirectBrowserPrint}
                  className="btn btn-primary btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px" }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download in PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "#64748b",
                    borderRadius: "6px",
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Document Preview */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                background: "#f1f5f9",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  padding: "24px",
                  maxWidth: printTarget === "all" ? "100%" : "640px",
                  margin: "0 auto",
                }}
              >
                {printTarget === "all" ? (
                  /* Live Full Roster Preview */
                  <div style={{ color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #2563eb", paddingBottom: "14px", marginBottom: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img src="/guiitar-council-logo.png" alt="GUIITAR Council" style={{ height: "50px", width: "auto", objectFit: "contain" }} />
                        <div>
                          <h1 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            GUIITAR COUNCIL — GSFC UNIVERSITY
                          </h1>
                          <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0", fontWeight: 600 }}>
                            Official Student Workshop & Masterclass Attendance Roster
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                        <div><strong>Generated:</strong> {formatDateTime()}</div>
                        <div><strong>Scope:</strong> {selectedEvent === "all" ? "All Events & Workshops" : selectedEvent}</div>
                        <div><strong>Total Records:</strong> {filteredRegistrations.length}</div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "18px" }}>
                      <div style={{ border: "1px solid #bfdbfe", background: "#eff6ff", padding: "8px 12px", borderRadius: "8px" }}>
                        <span style={{ fontSize: "10px", color: "#1e40af", fontWeight: 700, textTransform: "uppercase" }}>Total Enrolled</span>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#1e3a8a" }}>{filteredRegistrations.length}</div>
                      </div>
                      <div style={{ border: "1px solid #a7f3d0", background: "#ecfdf5", padding: "8px 12px", borderRadius: "8px" }}>
                        <span style={{ fontSize: "10px", color: "#065f46", fontWeight: 700, textTransform: "uppercase" }}>Verified Attended</span>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#047857" }}>{filteredRegistrations.filter((r) => r.status === "Attended").length}</div>
                      </div>
                      <div style={{ border: "1px solid #fde68a", background: "#fef3c7", padding: "8px 12px", borderRadius: "8px" }}>
                        <span style={{ fontSize: "10px", color: "#92400e", fontWeight: 700, textTransform: "uppercase" }}>Upcoming / Registered</span>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#b45309" }}>{filteredRegistrations.filter((r) => r.status === "Registered").length}</div>
                      </div>
                      <div style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px" }}>
                        <span style={{ fontSize: "10px", color: "#475569", fontWeight: 700, textTransform: "uppercase" }}>Attendance Rate</span>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{stats.attendanceRate}%</div>
                      </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginBottom: "20px" }}>
                        <thead>
                          <tr style={{ background: "#1e3a8a", color: "#ffffff", textAlign: "left" }}>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a", textAlign: "center", width: "30px" }}>#</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Ticket ID</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Student Name</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Enrollment No</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Department & Sem</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Workshop / Event</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a", textAlign: "center" }}>Status</th>
                            <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a", textAlign: "center", width: "90px" }}>Student Sign</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRegistrations.map((r, idx) => {
                            const statusBg = r.status === "Attended" ? "#ecfdf5" : r.status === "Registered" ? "#eff6ff" : r.status === "Waitlisted" ? "#fef3c7" : "#fef2f2";
                            const statusColor = r.status === "Attended" ? "#065f46" : r.status === "Registered" ? "#1e40af" : r.status === "Waitlisted" ? "#92400e" : "#991b1b";
                            const statusBorder = r.status === "Attended" ? "#a7f3d0" : r.status === "Registered" ? "#bfdbfe" : r.status === "Waitlisted" ? "#fde68a" : "#fecaca";

                            return (
                              <tr key={r.id} style={{ background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontWeight: 700, textAlign: "center" }}>{idx + 1}</td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontFamily: "monospace", fontWeight: 700, color: "#2563eb" }}>{r.ticketId}</td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>
                                  <strong>{r.studentName}</strong>
                                  <div style={{ fontSize: "10px", color: "#64748b" }}>{r.email}</div>
                                </td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontWeight: 600 }}>{r.enrollmentNo || "N/A"}</td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>{r.department} ({r.semester || "UG"})</td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", maxWidth: "180px" }}>{r.eventTitle}</td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>
                                  <span style={{ display: "inline-block", background: statusBg, color: statusColor, border: `1px solid ${statusBorder}`, padding: "2px 6px", borderRadius: "4px", fontWeight: 700, fontSize: "10px" }}>
                                    {r.status}
                                  </span>
                                </td>
                                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>
                                  <div style={{ height: "18px", borderBottom: "1px dotted #94a3b8", width: "70px", margin: "0 auto" }} />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "12px" }}>
                      <div style={{ textAlign: "center", width: "190px" }}>
                        <div style={{ borderBottom: "1px solid #0f172a", height: "32px", marginBottom: "6px" }} />
                        <strong style={{ fontSize: "11px", color: "#0f172a" }}>Event Coordinator / Mentor</strong>
                      </div>
                      <div style={{ textAlign: "center", width: "190px" }}>
                        <div style={{ borderBottom: "1px solid #0f172a", height: "32px", marginBottom: "6px" }} />
                        <strong style={{ fontSize: "11px", color: "#0f172a" }}>GUIITAR Council Official Seal</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Live Single Pass Preview */
                  <div style={{ border: "2px solid #2563eb", borderRadius: "14px", overflow: "hidden", background: "#ffffff", fontFamily: "'Inter', -apple-system, sans-serif" }}>
                    <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", color: "#ffffff", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src="/guiitar-council-logo.png" alt="GUIITAR" style={{ height: "40px", width: "auto", background: "#ffffff", padding: "3px 6px", borderRadius: "6px" }} />
                        <div>
                          <h2 style={{ fontSize: "17px", fontWeight: 800, margin: 0 }}>OFFICIAL WORKSHOP PASS</h2>
                          <p style={{ fontSize: "11px", margin: 0, opacity: 0.9 }}>GUIITAR Council — GSFC University</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>
                          {printTarget.status}
                        </span>
                        <div style={{ fontSize: "13px", fontWeight: 800, fontFamily: "monospace", marginTop: "4px", letterSpacing: "0.5px" }}>
                          {printTarget.ticketId}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "18px 22px" }}>
                      <div style={{ marginBottom: "14px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
                        <span style={{ fontSize: "10.5px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Workshop / Event</span>
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "2px 0 0" }}>{printTarget.eventTitle}</h3>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px", marginBottom: "16px" }}>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Student Full Name</span>
                          <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>{printTarget.studentName}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Enrollment / Roll No</span>
                          <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>{printTarget.enrollmentNo || "N/A"}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Department & Semester</span>
                          <strong style={{ color: "#0f172a" }}>{printTarget.department} ({printTarget.semester || "UG"})</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Registration Date</span>
                          <strong style={{ color: "#0f172a" }}>{printTarget.registrationDate}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Student Email</span>
                          <strong style={{ color: "#2563eb" }}>{printTarget.email}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Phone Number</span>
                          <strong style={{ color: "#0f172a" }}>{printTarget.phone || "N/A"}</strong>
                        </div>
                      </div>

                      {printTarget.notes && (
                        <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", padding: "8px 12px", borderRadius: "6px", fontSize: "11px", marginBottom: "14px" }}>
                          <strong>Special Note:</strong> {printTarget.notes}
                        </div>
                      )}

                      <div style={{ borderTop: "2px dashed #cbd5e1", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "10px", color: "#64748b", maxWidth: "340px" }}>
                          Present this physical or digital color pass at the GUIITAR Incubation Desk on arrival.
                        </div>
                        <div style={{ border: "1px solid #94a3b8", borderRadius: "6px", padding: "5px 12px", fontSize: "10.5px", fontWeight: 700, color: "#0f172a" }}>
                          Desk Verification Seal
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "14px 22px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f8fafc",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Select <strong>"Save as PDF"</strong> in the destination menu to download your color document.
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={handleDirectBrowserPrint}
                  className="btn btn-primary btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download in PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRINT-ONLY COLOR REPORT & TICKET TEMPLATE */}
      <div id="printable-color-sheet" className="print-only">
        {printTarget === "all" ? (
          /* FULL COLOR ATTENDANCE ROSTER */
          <div style={{ padding: "20px", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
            {/* Header with Logo */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #2563eb", paddingBottom: "14px", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src="/guiitar-council-logo.png" alt="GUIITAR Council" style={{ height: "54px", width: "auto", objectFit: "contain" }} />
                <div>
                  <h1 style={{ fontSize: "19px", fontWeight: 800, margin: 0, color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    GUIITAR COUNCIL — GSFC UNIVERSITY
                  </h1>
                  <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0 0", fontWeight: 600 }}>
                    Official Student Workshop & Masterclass Attendance Roster
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                <div><strong>Generated:</strong> {formatDateTime()}</div>
                <div><strong>Scope:</strong> {selectedEvent === "all" ? "All Events & Workshops" : selectedEvent}</div>
                <div><strong>Total Records:</strong> {filteredRegistrations.length}</div>
              </div>
            </div>

            {/* Summary Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "18px" }}>
              <div style={{ border: "1px solid #bfdbfe", background: "#eff6ff", padding: "8px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "10px", color: "#1e40af", fontWeight: 700, textTransform: "uppercase" }}>Total Enrolled</span>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#1e3a8a" }}>{filteredRegistrations.length}</div>
              </div>
              <div style={{ border: "1px solid #a7f3d0", background: "#ecfdf5", padding: "8px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "10px", color: "#065f46", fontWeight: 700, textTransform: "uppercase" }}>Verified Attended</span>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#047857" }}>{filteredRegistrations.filter((r) => r.status === "Attended").length}</div>
              </div>
              <div style={{ border: "1px solid #fde68a", background: "#fef3c7", padding: "8px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "10px", color: "#92400e", fontWeight: 700, textTransform: "uppercase" }}>Upcoming / Registered</span>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#b45309" }}>{filteredRegistrations.filter((r) => r.status === "Registered").length}</div>
              </div>
              <div style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "8px 12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "10px", color: "#475569", fontWeight: 700, textTransform: "uppercase" }}>Attendance Rate</span>
                <div style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>{stats.attendanceRate}%</div>
              </div>
            </div>

            {/* Full Color Roster Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginBottom: "24px" }}>
              <thead>
                <tr style={{ background: "#1e3a8a", color: "#ffffff", textAlign: "left" }}>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>#</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Ticket ID</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Student Name</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Enrollment No</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Department & Sem</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Workshop / Event</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a" }}>Status</th>
                  <th style={{ padding: "7px 8px", border: "1px solid #1e3a8a", textAlign: "center", width: "95px" }}>Student Sign</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r, idx) => {
                  const statusBg = r.status === "Attended" ? "#ecfdf5" : r.status === "Registered" ? "#eff6ff" : r.status === "Waitlisted" ? "#fef3c7" : "#fef2f2";
                  const statusColor = r.status === "Attended" ? "#065f46" : r.status === "Registered" ? "#1e40af" : r.status === "Waitlisted" ? "#92400e" : "#991b1b";
                  const statusBorder = r.status === "Attended" ? "#a7f3d0" : r.status === "Registered" ? "#bfdbfe" : r.status === "Waitlisted" ? "#fde68a" : "#fecaca";

                  return (
                    <tr key={r.id} style={{ background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontWeight: 700 }}>{idx + 1}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontFamily: "monospace", fontWeight: 700, color: "#2563eb" }}>{r.ticketId}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>
                        <strong>{r.studentName}</strong>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>{r.email}</div>
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", fontWeight: 600 }}>{r.enrollmentNo || "N/A"}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>{r.department} ({r.semester || "UG"})</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", maxWidth: "200px" }}>{r.eventTitle}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>
                        <span style={{ display: "inline-block", background: statusBg, color: statusColor, border: `1px solid ${statusBorder}`, padding: "2px 6px", borderRadius: "4px", fontWeight: 700, fontSize: "10px" }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>
                        <div style={{ height: "20px", borderBottom: "1px dotted #94a3b8", width: "75px", margin: "0 auto" }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Official Signatures */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "12px" }}>
              <div style={{ textAlign: "center", width: "190px" }}>
                <div style={{ borderBottom: "1px solid #0f172a", height: "35px", marginBottom: "6px" }} />
                <strong style={{ fontSize: "11px", color: "#0f172a" }}>Event Coordinator / Mentor</strong>
              </div>
              <div style={{ textAlign: "center", width: "190px" }}>
                <div style={{ borderBottom: "1px solid #0f172a", height: "35px", marginBottom: "6px" }} />
                <strong style={{ fontSize: "11px", color: "#0f172a" }}>GUIITAR Council Official Seal</strong>
              </div>
            </div>
          </div>
        ) : printTarget ? (
          /* INDIVIDUAL COLOR TICKET PASS */
          <div style={{ padding: "24px", maxWidth: "620px", margin: "0 auto", color: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
            <div style={{ border: "2px solid #2563eb", borderRadius: "14px", overflow: "hidden", background: "#ffffff" }}>
              {/* Ticket Header */}
              <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", color: "#ffffff", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src="/guiitar-council-logo.png" alt="GUIITAR" style={{ height: "42px", width: "auto", background: "#ffffff", padding: "3px 6px", borderRadius: "6px" }} />
                  <div>
                    <h2 style={{ fontSize: "17px", fontWeight: 800, margin: 0 }}>OFFICIAL WORKSHOP PASS</h2>
                    <p style={{ fontSize: "11px", margin: 0, opacity: 0.9 }}>GUIITAR Council — GSFC University</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>
                    {printTarget.status}
                  </span>
                  <div style={{ fontSize: "13px", fontWeight: 800, fontFamily: "monospace", marginTop: "4px", letterSpacing: "0.5px" }}>
                    {printTarget.ticketId}
                  </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ marginBottom: "14px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
                  <span style={{ fontSize: "10.5px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Workshop / Event</span>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "2px 0 0" }}>{printTarget.eventTitle}</h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px", marginBottom: "16px" }}>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Student Full Name</span>
                    <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>{printTarget.studentName}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Enrollment / Roll No</span>
                    <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>{printTarget.enrollmentNo || "N/A"}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Department & Semester</span>
                    <strong style={{ color: "#0f172a" }}>{printTarget.department} ({printTarget.semester || "UG"})</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Registration Date</span>
                    <strong style={{ color: "#0f172a" }}>{printTarget.registrationDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Student Email</span>
                    <strong style={{ color: "#2563eb" }}>{printTarget.email}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", display: "block", fontSize: "10.5px" }}>Phone Number</span>
                    <strong style={{ color: "#0f172a" }}>{printTarget.phone || "N/A"}</strong>
                  </div>
                </div>

                {printTarget.notes && (
                  <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", padding: "8px 12px", borderRadius: "6px", fontSize: "11px", marginBottom: "14px" }}>
                    <strong>Special Note:</strong> {printTarget.notes}
                  </div>
                )}

                {/* Verification Bar */}
                <div style={{ borderTop: "2px dashed #cbd5e1", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "10px", color: "#64748b", maxWidth: "340px" }}>
                    Present this physical or digital color pass at the GUIITAR Incubation Desk on arrival.
                  </div>
                  <div style={{ border: "1px solid #94a3b8", borderRadius: "6px", padding: "5px 12px", fontSize: "10.5px", fontWeight: 700, color: "#0f172a" }}>
                    Desk Verification Seal
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
}
