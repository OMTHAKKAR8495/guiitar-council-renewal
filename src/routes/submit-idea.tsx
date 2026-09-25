import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  FileText,
  Layers,
  Award,
  User,
  Building,
  Mail,
  Phone,
  AlertCircle,
  HelpCircle,
  Clock,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { AdminDataStore, type InnovationStage, type CreatorType } from "@/lib/adminStore";

export const Route = createFileRoute("/submit-idea")({
  head: () => ({
    meta: [
      { title: "Submit Your Innovation Proposal — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Submit your idea or research concept to GUIITAR Council. Receive SSIP 2.0 prototyping grant funding up to ₹2.5 Lakhs, laboratory access, and patent support.",
      },
    ],
  }),
  component: PublicSubmitIdeaPage,
});

export function PublicSubmitIdeaPage() {
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    creatorName: "",
    creatorEmail: "",
    creatorPhone: "",
    creatorType: "Student" as CreatorType,
    university: "GSFC University, Vadodara",
    department: "School of Technology",
    teamMembers: "",
    title: "",
    category: "AI",
    stage: "Idea" as InnovationStage,
    problemStatement: "",
    proposedSolution: "",
    technology: "",
    expectedImpact: "",
    supportRequired: ["Mentorship", "Funding"] as string[],
    coverImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    confirmedAccurate: false,
  });

  const categories = [
    "AI",
    "Robotics",
    "IoT",
    "Biotech",
    "CleanTech",
    "Healthcare",
    "Chemical Materials",
    "Cyber Security",
    "Water Tech",
    "Agriculture",
  ];

  const stages: InnovationStage[] = [
    "Idea",
    "Research",
    "Prototype",
    "MVP",
    "Pilot",
    "Startup",
    "Scale",
  ];

  const supportOptions = [
    "Mentorship",
    "Funding (SSIP 2.0)",
    "Prototype Development",
    "IPR & Patent Support",
    "Lab / Supercomputer Access",
    "Industry Pilot",
    "Market Access",
  ];

  const toggleSupport = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      supportRequired: prev.supportRequired.includes(opt)
        ? prev.supportRequired.filter((s) => s !== opt)
        : [...prev.supportRequired, opt],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.problemStatement || !formData.proposedSolution) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!formData.confirmedAccurate) {
      alert("Please confirm that the provided information is accurate.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const teamList = formData.teamMembers
        ? formData.teamMembers
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [formData.creatorName];

      const saved = AdminDataStore.saveIdea({
        title: formData.title,
        shortDescription: formData.proposedSolution.slice(0, 140) + "...",
        detailedDescription: `${formData.problemStatement}\n\n${formData.proposedSolution}`,
        category: formData.category,
        technology: formData.technology,
        stage: formData.stage,
        creatorType: formData.creatorType,
        creatorName: formData.creatorName,
        creatorEmail: formData.creatorEmail,
        creatorPhone: formData.creatorPhone,
        department: formData.department,
        university: formData.university,
        teamMembers: teamList,
        problemStatement: formData.problemStatement,
        proposedSolution: formData.proposedSolution,
        innovationUsp: "Sub-system optimization with measurable institutional validation.",
        technologyUsed: formData.technology,
        targetUsers: "Industrial, consumer, or academic partners.",
        industry: formData.category,
        thrustArea: `${formData.category} Solutions`,
        coverImage: formData.coverImage,
        galleryImages: [],
        expectedImpact: formData.expectedImpact,
        sdgAlignment: ["SDG 9: Industry, Innovation & Infrastructure"],
        supportRequired: formData.supportRequired,
        visibility: "Private",
        status: "Pending Review",
        isFeatured: false,
      });

      setIsSubmitting(false);
      setSubmittedRefId(saved.refId);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      <PageHero
        badge="SSIP 2.0 & Institutional Intake"
        title="Have an Idea? Let's Build It."
        text="Your next project could become the next institutional breakthrough. Submit your concept to the GUIITAR Innovation Scrutiny Committee for prototype funding and incubation."
      />

      <section>
        <div className="container" style={{ maxWidth: "840px" }}>
          {submittedRefId ? (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                padding: "48px 36px",
                textAlign: "center",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#ecfdf5",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2
                style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}
              >
                Your idea has been submitted successfully!
              </h2>

              <p
                style={{
                  color: "#475569",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  maxWidth: "560px",
                  margin: "0 auto 24px",
                }}
              >
                GUIITAR Council Innovation Scrutiny Committee will review your submission before it
                is scheduled for scrutiny and published to the public showcase.
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "inline-block",
                  marginBottom: "32px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#64748b",
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  Institutional Reference ID
                </span>
                <strong style={{ fontSize: "24px", color: "#2563eb", letterSpacing: "1px" }}>
                  {submittedRefId}
                </strong>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0" }}>
                  Please save this reference code for committee hearings & grant tracking.
                </p>
              </div>

              <div
                style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}
              >
                <Link to="/innovation" className="btn btn-outline btn-md">
                  Browse Innovation Showcase
                </Link>
                <button
                  onClick={() => {
                    setSubmittedRefId(null);
                    setFormData({
                      creatorName: "",
                      creatorEmail: "",
                      creatorPhone: "",
                      creatorType: "Student",
                      university: "GSFC University, Vadodara",
                      department: "School of Technology",
                      teamMembers: "",
                      title: "",
                      category: "AI",
                      stage: "Idea",
                      problemStatement: "",
                      proposedSolution: "",
                      technology: "",
                      expectedImpact: "",
                      supportRequired: ["Mentorship", "Funding"],
                      coverImage:
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
                      confirmedAccurate: false,
                    });
                  }}
                  className="btn btn-primary btn-md"
                >
                  Submit Another Innovation
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "var(--shadow-md)",
              }}
              className="form-card"
            >
              <div style={{ marginBottom: "32px" }}>
                <span className="pill blue" style={{ marginBottom: "10px" }}>
                  Official Proposal Application
                </span>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: "8px 0 6px",
                  }}
                >
                  Innovation & PoC Submission Form
                </h2>
                <p style={{ color: "#64748b", fontSize: "14.5px", margin: 0 }}>
                  Fill in your project specifications. All eligible concepts receive review from our
                  institutional domain mentors.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* SECTION 1: APPLICANT INFO */}
                <div style={{ marginBottom: "32px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <User className="w-4 h-4 text-blue-600" />
                    1. Innovator & Team Particulars
                  </h3>

                  <div className="form-row-2">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Lead Innovator Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.creatorName}
                        onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                        placeholder="e.g., Aarav Patel"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Applicant Classification *
                      </label>
                      <select
                        value={formData.creatorType}
                        onChange={(e) =>
                          setFormData({ ...formData, creatorType: e.target.value as CreatorType })
                        }
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="Student">Student (Undergrad / Postgrad)</option>
                        <option value="Faculty">Faculty Member</option>
                        <option value="Researcher">Research Scholar / PhD</option>
                        <option value="Startup">Early-Stage Startup</option>
                        <option value="Alumni">University Alumni</option>
                        <option value="External Innovator">External Innovator</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Institutional Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.creatorEmail}
                        onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                        placeholder="aarav.p@gsfcuniversity.ac.in"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.creatorPhone}
                        onChange={(e) => setFormData({ ...formData, creatorPhone: e.target.value })}
                        placeholder="+91 98251 00000"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        University / Institution Name
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        School / Department
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g., Biotechnology / Chemical / CSE"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "6px",
                      }}
                    >
                      Co-Innovators & Team Members (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.teamMembers}
                      onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                      placeholder="e.g., Pooja Shah, Rohan Mehta, Harshil Joshi"
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* SECTION 2: IDEA SPECIFICATIONS */}
                <div style={{ marginBottom: "32px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    2. Innovation & Technology Details
                  </h3>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "6px",
                      }}
                    >
                      Project / Innovation Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Smart Edge IoT Telemetry for Chemical Reactor Monitoring"
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div className="form-row-2">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Primary Thrust Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Current Maturity Stage *
                      </label>
                      <select
                        value={formData.stage}
                        onChange={(e) =>
                          setFormData({ ...formData, stage: e.target.value as InnovationStage })
                        }
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "6px",
                      }}
                    >
                      Problem Statement *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.problemStatement}
                      onChange={(e) =>
                        setFormData({ ...formData, problemStatement: e.target.value })
                      }
                      placeholder="What specific engineering, industrial, or societal pain point are you solving?"
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "6px",
                      }}
                    >
                      Proposed Solution & Technical Methodology *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.proposedSolution}
                      onChange={(e) =>
                        setFormData({ ...formData, proposedSolution: e.target.value })
                      }
                      placeholder="Describe your working mechanism, prototype architecture, chemical process, or software flow..."
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div className="form-row-2">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Key Technologies / Hardware Used
                      </label>
                      <input
                        type="text"
                        value={formData.technology}
                        onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                        placeholder="e.g., STM32, HPLC, PyTorch, LoRaWAN"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "6px",
                        }}
                      >
                        Expected Measurable Impact
                      </label>
                      <input
                        type="text"
                        value={formData.expectedImpact}
                        onChange={(e) =>
                          setFormData({ ...formData, expectedImpact: e.target.value })
                        }
                        placeholder="e.g., 40% reduction in industrial effluent toxicity"
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: SUPPORT REQUIRED */}
                <div style={{ marginBottom: "32px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    3. Support & Incubation Resources Needed
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {supportOptions.map((opt) => {
                      const isSelected = formData.supportRequired.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => toggleSupport(opt)}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: isSelected ? "#2563eb" : "#cbd5e1",
                            background: isSelected ? "#eff6ff" : "#ffffff",
                            color: isSelected ? "#1e40af" : "#334155",
                            fontSize: "13px",
                            fontWeight: 600,
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DECLARATION */}
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "18px 20px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "28px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      required
                      checked={formData.confirmedAccurate}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmedAccurate: e.target.checked })
                      }
                      style={{ width: "18px", height: "18px", marginTop: "2px" }}
                    />
                    <span style={{ fontSize: "13.5px", color: "#334155", lineHeight: 1.5 }}>
                      I confirm that the information provided is accurate and represents original
                      work by our team. I agree to present our prototype before the GUIITAR
                      Innovation Scrutiny Committee for SSIP 2.0 evaluation.
                    </span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    {isSubmitting ? (
                      <span>Submitting Proposal...</span>
                    ) : (
                      <>
                        <span>Submit Innovation for Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
