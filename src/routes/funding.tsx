import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Banknote,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Rocket,
  Award,
  ArrowRight,
  Sparkles,
  DollarSign,
  Briefcase,
  Layers,
} from "lucide-react";
import { PageHero, SectionTitle, ButtonLink } from "@/components/site";
import { Accordion } from "@/components/content";
import { AdminDataStore, type FundingScheme } from "@/lib/adminStore";

export const Route = createFileRoute("/funding")({
  head: () => ({
    meta: [
      { title: "Funding Opportunities & Grants — GUIITAR Council" },
      {
        name: "description",
        content:
          "Explore non-dilutive startup funding, SSIP 2.0 student grants up to ₹2.5L, Gujarat Industrial Policy up to ₹30L, and patent support grants through GUIITAR Council.",
      },
      { property: "og:title", content: "Funding Opportunities — GUIITAR Council" },
      {
        property: "og:description",
        content:
          "Funding support, seed capital, and non-dilutive grants for innovators and startups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Funding,
});

const defaultFundingFaqs = [
  {
    q: "Do I have to give equity to GUIITAR Council for SSIP 2.0 grants?",
    a: "No. SSIP 2.0 grants are non-dilutive government and institutional grants. You retain 100% of your company’s equity and ownership.",
  },
  {
    q: "How long does the grant approval process take?",
    a: "Typically, the evaluation and Institutional Screening Committee (ISC) review takes between 3 to 5 weeks from the date of completed application submission.",
  },
  {
    q: "Can a single startup apply for multiple funding schemes?",
    a: "Yes. A startup can initially receive SSIP 2.0 prototyping support and IPR filing assistance, and subsequently apply for the Gujarat Industrial Policy 2020 scheme once they reach market traction.",
  },
  {
    q: "Are funds disbursed all at once or in milestones?",
    a: "Funds are disbursed in structured, milestone-based tranches linked to verified project outcomes, component procurement receipts, and utilization certificates.",
  },
];

const fallbackFundedProjects = [
  {
    title: "Ayurtrix Botanical Extraction",
    amount: "₹2,50,000 (SSIP 2.0)",
    category: "Biotechnology",
    desc: "Chromatographic standardization of Ayurvedic botanicals with clinical consistency.",
    impact: "Functional MVP & Bioactive extraction protocol verified.",
  },
  {
    title: "Bacterial Chroma Bio-pigments",
    amount: "₹1,70,000 (SSIP 2.0)",
    category: "CleanTech",
    desc: "Microbial synthesis of sustainable textile colorants replacing chemical dyes.",
    impact: "Pilot trials with local fabric mills and zero-toxic effluent.",
  },
  {
    title: "Bio-Lastic Compostable Polymers",
    amount: "₹1,00,000 (SSIP 2.0)",
    category: "Circular Materials",
    desc: "Upcycling temple floral waste into 100% home-compostable film packaging.",
    impact: "500kg floral waste diverted and PoC mulch films fabricated.",
  },
];

function Funding() {
  const [storeSchemes, setStoreSchemes] = useState<FundingScheme[]>([]);
  const [fundedIdeas, setFundedIdeas] = useState<any[]>([]);

  const loadData = () => {
    try {
      const schemes = AdminDataStore.getFundingSchemes();
      setStoreSchemes(Array.isArray(schemes) ? schemes : []);
      const ideas = AdminDataStore.getPublishedIdeas();
      if (Array.isArray(ideas)) {
        setFundedIdeas(ideas.filter((i) => i && i.fundingSanctioned));
      }
    } catch (err) {
      console.warn("Funding loadData warning:", err);
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("guiitar_store_update", handleUpdate);
    return () => window.removeEventListener("guiitar_store_update", handleUpdate);
  }, []);

  const programs = useMemo(() => {
    const list = Array.isArray(storeSchemes) && storeSchemes.length > 0 ? storeSchemes : [];
    return list.map((s) => ({
      title: s.title || "Funding Scheme",
      badge: s.type || "Grant",
      amount: s.maxGrant || "Grant Support",
      desc: s.description || "",
      covered: [
        "Raw materials, fabrication costs & testing analysis charges",
        "Direct lab instrumentation and third-party consumable services",
        "Milestone-linked transparent tranche disbursements",
        "Zero equity dilution or repayment required",
      ],
      eligibility: s.eligibility
        ? [s.eligibility]
        : ["Enrolled students, young innovators, and incubated founders"],
      application: [
        "Submit detailed proposal via online portal",
        "Technical review by Institutional Screening Committee (ISC)",
        "Pitch presentation and milestone agreement",
        "Sanction letter and milestone-linked tranche release",
      ],
    }));
  }, [storeSchemes]);

  const fundedProjects = useMemo(() => {
    if (Array.isArray(fundedIdeas) && fundedIdeas.length > 0) {
      return fundedIdeas.map((i) => ({
        title: i.title || "Innovator Project",
        amount: i.fundingSanctioned || "₹2.5 Lakhs (SSIP 2.0)",
        category: i.category || "Technology",
        desc: i.shortDescription || i.detailedDescription || "",
        impact: i.expectedImpact || "Validated PoC and prototyping progress.",
      }));
    }
    return fallbackFundedProjects;
  }, [fundedIdeas]);

  const fundingFaqs = defaultFundingFaqs;

  return (
    <>
      <PageHero
        badge="Non-Dilutive Capital"
        title="Fueling Breakthrough Innovations"
        text="Access substantial non-dilutive grant funding, seed capital, and IPR assistance tailored to every stage of your technological journey."
      />

      {/* THREE CORE PROGRAMS */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Grant Pipelines"
            title="Our Flagship Funding Programs"
            subtitle="Transparent, milestone-based financial support designed to empower student innovators and high-growth ventures."
          />

          <div className="grid-3">
            {programs.map((p) => (
              <article className="plain-card" key={p.title} style={{ padding: "32px 28px" }}>
                <span className="pill" style={{ marginBottom: "14px" }}>
                  {p.badge}
                </span>
                <h3 style={{ fontSize: "22px" }}>{p.title}</h3>
                <p style={{ minHeight: "66px" }}>{p.desc}</p>
                <strong
                  style={{
                    display: "block",
                    fontSize: "26px",
                    color: "#1d4ed8",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    margin: "18px 0 20px",
                  }}
                >
                  {p.amount}
                </strong>

                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    margin: "20px 0 10px",
                    color: "var(--text)",
                  }}
                >
                  What's Covered:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "18px", fontSize: "14px", marginBottom: "20px" }}
                >
                  {p.covered.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    margin: "0 0 10px",
                    color: "var(--text)",
                  }}
                >
                  Key Eligibility:
                </h4>
                <ul
                  className="list"
                  style={{ paddingLeft: "18px", fontSize: "14px", marginBottom: "24px" }}
                >
                  {p.eligibility.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <ButtonLink to="/contact" variant="primary" style={{ width: "100%" }}>
                  <span>Apply for {p.title.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DISBURSEMENT PROCESS */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Application Flow"
            title="Structured 4-Stage Grant Process"
            subtitle="How your funding application is screened, evaluated, sanctioned, and disbursed."
          />
          <div className="pathway-grid">
            {[
              {
                step: "01",
                title: "Online Application",
                desc: "Fill the grant application form with your project abstract, problem statement, technical novelty, and budget estimate.",
              },
              {
                step: "02",
                title: "Technical Review",
                desc: "Domain experts and faculty mentors conduct technical due-diligence and prior-art validation of your proposal.",
              },
              {
                step: "03",
                title: "Pitch to Committee (ISC)",
                desc: "Present your pitch deck, live prototype demo, and milestone roadmap before the Institutional Screening Committee.",
              },
              {
                step: "04",
                title: "Sanction & Tranche Release",
                desc: "Receive your formal Sanction Letter. Funds are released against verified procurement bills and milestone achievements.",
              },
            ].map((s) => (
              <div className="pathway-step" key={s.step}>
                <div className="pathway-num">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDED PROJECTS SHOWCASE */}
      <section>
        <div className="container">
          <SectionTitle
            badge="Proven Impact"
            title="Funded Innovations & Startups"
            subtitle="Explore real student and alumni innovations supported through GUIITAR Council grants."
          />
          <div className="grid-3">
            {fundedProjects.map((p) => (
              <article className="plain-card" key={p.title} style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span className="pill amber">{p.category}</span>
                  <span className="startup-grant-tag">{p.amount}</span>
                </div>
                <h3>{p.title}</h3>
                <p style={{ marginBottom: "14px" }}>{p.desc}</p>
                <div
                  style={{
                    background: "var(--surface-muted)",
                    padding: "14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13.5px",
                    color: "var(--text)",
                  }}
                >
                  <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                    Milestone Impact:
                  </strong>
                  {p.impact}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="section-muted">
        <div className="container">
          <SectionTitle
            badge="Questions Answered"
            title="Funding & Disbursement FAQs"
            subtitle="Everything you need to know about criteria, expenses, and compliance."
          />
          <Accordion items={fundingFaqs} />
          <div className="center spaced">
            <ButtonLink to="/contact" size="lg">
              <span>Submit Your Funding Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
