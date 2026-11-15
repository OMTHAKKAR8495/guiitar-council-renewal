import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, ExternalLink, Mail, Phone, MapPin, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback & Grievance Portal — GUIITAR Council | GSFC University" },
      {
        name: "description",
        content:
          "Official Feedback, Suggestions, and Grievance redressal portal for GUIITAR Council innovators, incubated startups, and institutional stakeholders.",
      },
      { property: "og:title", content: "Feedback & Grievance Portal — GUIITAR Council" },
      {
        property: "og:description",
        content: "Share your valuable suggestions or grievances with GUIITAR Council leadership.",
      },
    ],
  }),
  component: FeedbackPage,
});

export function FeedbackPage() {
  const feedbackFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdUPGZkYa3Xwdqv-QV8w8kHIdWx42uYHXIJBGPmKk5NW0qTVg/viewform";

  return (
    <>
      <PageHero
        badge="Official Stakeholder Redressal"
        title="Feedback & Suggestions"
        text="GU Incubation Innovation Technology and Applied Research (GUIITAR) Council is committed to transparent governance, rapid dispute resolution, and continuous improvement across our incubation curriculum, laboratory facilities, and mentoring ecosystem."
      >
        <div className="button-row">
          <a
            href={feedbackFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Official Google Form</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#embedded-form" className="btn btn-outline btn-md">
            <span>Fill Form Below</span>
          </a>
        </div>
      </PageHero>

      {/* COMMITMENT PILLARS */}
      <section style={{ padding: "40px 0 20px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                icon: ShieldCheck,
                title: "Confidential & Protected",
                desc: "Submissions are reviewed directly by the CEO Office & Grievance Redressal Committee. Whistleblower protection and strict anonymity are maintained upon request.",
              },
              {
                icon: Clock,
                title: "Guaranteed SLA Response",
                desc: "Every formal inquiry, facility feedback, or mentorship grievance receives official written acknowledgment within 48 business hours.",
              },
              {
                icon: CheckCircle2,
                title: "Continuous Refinement",
                desc: "Feedback is analyzed during monthly Academic & Operational Committee reviews to expand laboratory access, funding tranches, and accelerator partnerships.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="plain-card"
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <p.icon className="w-5 h-5" />
                </div>
                <h4 style={{ fontSize: "16.5px", fontWeight: 700, margin: "0 0 8px" }}>{p.title}</h4>
                <p style={{ fontSize: "13.5px", color: "var(--muted-foreground)", lineHeight: 1.5, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED FEEDBACK FORM */}
      <section id="embedded-form" className="section-muted" style={{ padding: "48px 0" }}>
        <div className="container">
          <SectionTitle
            badge="Direct Submission"
            title="Institutional Feedback Form"
            subtitle="Complete the official form below. If the embedded frame does not load in your browser, click 'Open in New Window'."
          />

          <div
            style={{
              maxWidth: "840px",
              margin: "24px auto 0",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                background: "var(--surface-muted, #f8fafc)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare className="w-4 h-4 text-primary" />
                <span style={{ fontSize: "13.5px", fontWeight: 700 }}>
                  GUIITAR Council — Official Feedback & Grievance Register
                </span>
              </div>
              <a
                href={feedbackFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Open in New Window</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div style={{ minHeight: "800px", position: "relative" }}>
              <iframe
                src={`${feedbackFormUrl}?embedded=true`}
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="GUIITAR Feedback Google Form"
                style={{ display: "block", border: "none" }}
              >
                Loading feedback form…
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT ESCALATION CONTACTS */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container" style={{ maxWidth: "840px" }}>
          <div
            className="amber-notice-box"
            style={{
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>
              Urgent Matters & Direct Institutional Escalation
            </h4>
            <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.6 }}>
              For urgent IP disputes, time-sensitive grant milestones, or confidential governance matters, you may directly reach out to the Senior Manager (Incubation) or Provost & CEO Office:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px",
                marginTop: "6px",
              }}
            >
              <a
                href="mailto:guiitar@gsfcuniversity.ac.in"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>guiitar@gsfcuniversity.ac.in</span>
              </a>
              <a
                href="tel:+919313262712"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>09313262712 / +91 9313262712</span>
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>Room 208, 2nd Floor, Anviksha, GSFC University</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

