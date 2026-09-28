import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Search,
  Compass,
  Briefcase,
  Lightbulb,
  Banknote,
  Network,
  BookOpen,
  CalendarDays,
  HelpCircle,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
} from "lucide-react";
import { GuiitarFullLogo, StickyBackgroundWatermark, GuiitarEmblem } from "./GuiitarBrand";
import { ThemeToggle } from "@/lib/theme";

export interface MegaMenuItem {
  title: string;
  desc: string;
  to: string;
  badge?: string;
}

export interface MegaMenuCategory {
  label: string;
  icon: typeof Compass;
  to: string;
  items: MegaMenuItem[];
  featured?: {
    title: string;
    desc: string;
    to: string;
    cta: string;
  };
}

export const MEGA_MENU: MegaMenuCategory[] = [
  {
    label: "Explore",
    icon: Compass,
    to: "/about",
    items: [
      {
        title: "About GUIITAR",
        desc: "Our identity as GSFC University’s Section 8 incubation hub",
        to: "/about",
      },
      {
        title: "Mission & Vision",
        desc: "Guiding principles and long-term societal goals",
        to: "/about",
      },
      {
        title: "Leadership & Board",
        desc: "Provost, Chairman, and institutional mentors",
        to: "/about",
      },
      {
        title: "Prototyping Labs",
        desc: "Param Shavak Supercomputer, Drone Lab & Makers space",
        to: "/innovation",
      },
      {
        title: "Impact Dashboard",
        desc: "Verified public metrics & year-by-year impact numbers",
        to: "/impact",
        badge: "Live Data",
      },
      {
        title: "Innovation Ecosystem Map",
        desc: "Interactive network map connecting academia & industry",
        to: "/ecosystem",
      },
    ],
    featured: {
      title: "Built on GSFC Legacy",
      desc: "Bridging chemical engineering, AI, and startup incubation with university excellence.",
      to: "/about",
      cta: "Explore Our Story",
    },
  },
  {
    label: "Programs",
    icon: Briefcase,
    to: "/programs",
    items: [
      {
        title: "Student Innovation (E-Club)",
        desc: "Student-led hackathons, cohorts & ideathons",
        to: "/programs",
      },
      {
        title: "Venture Incubation",
        desc: "Desk space, legal structuring & seed grant access",
        to: "/programs",
      },
      {
        title: "1-on-1 Mentorship",
        desc: "Advisory from corporate CXOs and domain researchers",
        to: "/programs",
      },
      {
        title: "High-Tech Workshops",
        desc: "Hands-on training in Drones, AI & 3D Prototyping",
        to: "/events",
      },
      {
        title: "IPR & Patent Support",
        desc: "Up to ₹1.5L grant for patent drafting and filing",
        to: "/programs",
        badge: "Grant",
      },
    ],
    featured: {
      title: "Cohorts Open for 2026",
      desc: "Join over 83+ incubated ventures transforming technology from Vadodara.",
      to: "/apply",
      cta: "Apply for Programs",
    },
  },
  {
    label: "Innovation",
    icon: Lightbulb,
    to: "/innovation",
    items: [
      {
        title: "Innovation Showcase",
        desc: "Searchable directory of student & research projects",
        to: "/innovation",
        badge: "Showcase",
      },
      {
        title: "13 Thrust Areas",
        desc: "Biotech, AI/Robotics, CleanTech, Energy & Healthcare",
        to: "/innovation",
      },
      {
        title: "Prototyping Labs & Facilities",
        desc: "Specs, equipment lists & lab access procedures",
        to: "/innovation",
      },
      {
        title: "Patents & Disclosures",
        desc: "145+ protected intellectual properties & disclosures",
        to: "/innovation",
      },
      {
        title: "Innovation Journey (01–08)",
        desc: "Interactive step-by-step idea to scale roadmap",
        to: "/innovation",
      },
    ],
    featured: {
      title: "Supercomputing & Drones",
      desc: "Direct hands-on access to GPU clusters and flight test proving grounds.",
      to: "/innovation",
      cta: "Discover Labs",
    },
  },
  {
    label: "Startups",
    icon: Layers,
    to: "/startups",
    items: [
      {
        title: "Startup Directory",
        desc: "Explore incubated startups across Gujarat",
        to: "/startups",
        badge: "Directory",
      },
      {
        title: "Founder Success Stories",
        desc: "In-depth case studies with verified grant milestones",
        to: "/startups",
      },
      {
        title: "Incubation Support & Stages",
        desc: "From pre-incubation PoC to full market acceleration",
        to: "/startups",
      },
      {
        title: "Startup Toolkit & Resources",
        desc: "Pitch templates, mentor agreements & legal guides",
        to: "/resources",
      },
    ],
    featured: {
      title: "Ayurtrix, Bacterial Chroma & More",
      desc: "Real ventures launched from GSFC University laboratories.",
      to: "/startups",
      cta: "View Startups",
    },
  },
  {
    label: "Funding",
    icon: Banknote,
    to: "/funding",
    items: [
      {
        title: "Funding Navigator",
        desc: "Interactive 3-step tool to find matching grant schemes",
        to: "/funding",
        badge: "Quiz Tool",
      },
      {
        title: "SSIP 2.0 Grant Scheme",
        desc: "Non-dilutive grants up to ₹2.5 Lakhs for students/alumni",
        to: "/funding",
      },
      {
        title: "Gujarat Industrial Policy 2020",
        desc: "Milestone grants up to ₹30 Lakhs for growth ventures",
        to: "/funding",
      },
      {
        title: "IPR & Patent Support Grant",
        desc: "Up to ₹1.5 Lakhs reimbursement per patent filing",
        to: "/funding",
      },
      {
        title: "Application Process & Checklist",
        desc: "4-stage transparent ISC evaluation roadmap",
        to: "/funding",
      },
    ],
    featured: {
      title: "Non-Dilutive Capital",
      desc: "100% founder equity retention with institutional and government backing.",
      to: "/funding",
      cta: "Check Eligibility",
    },
  },
  {
    label: "Ecosystem",
    icon: Network,
    to: "/ecosystem",
    items: [
      {
        title: "Mentor Network",
        desc: "Search and connect with 50+ domain experts",
        to: "/ecosystem",
      },
      {
        title: "Corporate Alliances & CSR",
        desc: "Partnership tracks for industry pilots and CSR funding",
        to: "/partner",
      },
      {
        title: "Academic & Incubator Linkages",
        desc: "Collaborations with DST, NASSCOM, iCreate, AIC-GISC",
        to: "/partner",
      },
      {
        title: "MOU Signing Process",
        desc: "Streamlined 6-stage institutional onboarding",
        to: "/partner",
        badge: "50+ MOUs",
      },
    ],
    featured: {
      title: "Partner With GUIITAR",
      desc: "Co-develop applied technologies and sponsor student innovation grants.",
      to: "/partner",
      cta: "Become a Partner",
    },
  },
  {
    label: "Resources",
    icon: BookOpen,
    to: "/resources",
    items: [
      {
        title: "Resource Library",
        desc: "Instant search across manuals, templates & reports",
        to: "/resources",
      },
      {
        title: "Policies & Guidelines",
        desc: "SSIP 2.0 manuals & Gujarat industrial policy docs",
        to: "/resources",
      },
      {
        title: "Invention Disclosure Forms",
        desc: "IP intake documents and patent search templates",
        to: "/resources",
      },
      {
        title: "Pitch Deck Templates",
        desc: "10-slide standardized deck for ISC committee review",
        to: "/resources",
      },
    ],
  },
];

export function ButtonLink({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  return (
    <Link to={to} className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export function SectionTitle({
  title,
  subtitle,
  badge,
  light = false,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`section-title ${align === "left" ? "text-left mx-0" : ""}`}
      style={align === "left" ? { textAlign: "left", margin: "0 0 40px" } : undefined}
    >
      {badge && <span className={`section-badge ${light ? "light" : ""}`}>{badge}</span>}
      <h2 className={light ? "text-white" : ""}>{title}</h2>
      {subtitle && <p className={light ? "text-slate-300" : ""}>{subtitle}</p>}
    </div>
  );
}

export function PageHero({
  title,
  text,
  badge,
  children,
}: {
  title: string;
  text: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {badge && (
          <div className="page-hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>{badge}</span>
          </div>
        )}
        <h1>{title}</h1>
        <p>{text}</p>
        {children && <div style={{ marginTop: "28px" }}>{children}</div>}
      </div>
    </section>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Close menus on route change or click outside
  useEffect(() => {
    setActiveMenu(null);
    setOpen(false);
  }, [path]);

  // Lock body scroll when mobile navigation drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={navRef} style={{ position: "sticky", top: 0, zIndex: 60 }}>
      {/* Main Sticky Navbar */}
      <header className="header">
        <div className="container nav-wrap">
          <Link to="/" aria-label="GUIITAR Council home" className="logo-container">
            <img
              src="/guiitar-council-logo.png"
              alt="GUIITAR Council Logo"
              style={{ height: "46px", width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* Desktop Mega-Menu Navigation */}
          <nav className="desktop-nav">
            {MEGA_MENU.map((cat) => {
              const isOpen = activeMenu === cat.label;
              const isActive = cat.to === "/" ? path === "/" : path.startsWith(cat.to);

              return (
                <div
                  key={cat.label}
                  className="nav-item-dropdown"
                  onMouseEnter={() => setActiveMenu(cat.label)}
                  style={{ position: "relative" }}
                >
                  <Link
                    to={cat.to}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={() => setActiveMenu(null)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 12px",
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: isActive ? "var(--primary)" : "#334155",
                      textDecoration: "none",
                      borderRadius: "6px",
                    }}
                  >
                    <span>{cat.label}</span>
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: isOpen ? "var(--primary)" : "#94a3b8",
                      }}
                    />
                  </Link>

                  {/* Mega Menu Dropdown Panel */}
                  {isOpen && (
                    <div
                      className="mega-menu-panel"
                      onMouseLeave={() => setActiveMenu(null)}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: cat.label === "Ecosystem" || cat.label === "Resources" ? "auto" : "0",
                        right:
                          cat.label === "Ecosystem" || cat.label === "Resources" ? "0" : "auto",
                        width: cat.featured ? "640px" : "480px",
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px",
                        boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.15)",
                        padding: "24px",
                        display: "grid",
                        gridTemplateColumns: cat.featured ? "1fr 220px" : "1fr",
                        gap: "20px",
                        marginTop: "8px",
                        animation: "fadeInDown 0.15s ease-out",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            color: "#64748b",
                            letterSpacing: "0.05em",
                            marginBottom: "14px",
                          }}
                        >
                          {cat.label} Overview
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {cat.items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.to}
                              className="mega-menu-link"
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "10px",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                textDecoration: "none",
                                transition: "background 0.2s",
                              }}
                            >
                              <div style={{ flexGrow: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <span
                                    style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}
                                  >
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span
                                      style={{
                                        fontSize: "10.5px",
                                        fontWeight: 700,
                                        background: "#eff6ff",
                                        color: "#2563eb",
                                        padding: "1px 6px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontSize: "12.5px",
                                    color: "#64748b",
                                    margin: "2px 0 0",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {cat.featured && (
                        <div
                          style={{
                            background: "linear-gradient(135deg, #090d16, #1e3a8a)",
                            borderRadius: "12px",
                            padding: "20px",
                            color: "#ffffff",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                color: "#60a5fa",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Highlight
                            </span>
                            <h4
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#ffffff",
                                margin: "8px 0 6px",
                              }}
                            >
                              {cat.featured.title}
                            </h4>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#cbd5e1",
                                lineHeight: 1.45,
                                margin: 0,
                              }}
                            >
                              {cat.featured.desc}
                            </p>
                          </div>
                          <Link
                            to={cat.featured.to}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "12.5px",
                              fontWeight: 700,
                              color: "#60a5fa",
                              textDecoration: "none",
                              marginTop: "16px",
                            }}
                          >
                            <span>{cat.featured.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Side Utility & CTA */}
          <div className="nav-actions">
            <Link
              to="/events"
              className={`nav-action-link nav-action-link-xl ${path.startsWith("/events") ? "active" : ""}`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Events</span>
            </Link>

            <Link
              to="/faq"
              className={`nav-action-link nav-action-link-xl ${path.startsWith("/faq") ? "active" : ""}`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </Link>

            <Link
              to="/contact"
              className={`nav-action-link nav-action-link-lg ${path.startsWith("/contact") ? "active" : ""}`}
            >
              <span>Contact</span>
            </Link>

            <ThemeToggle variant="dropdown" />

            <Link
              className="btn btn-primary btn-sm nav-action-btn-sm"
              to="/apply"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              className={`menu-button ${open ? "active" : ""}`}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <>
            <div
              className="admin-mobile-overlay"
              style={{ top: "70px" }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <nav className="mobile-nav" aria-label="Mobile Navigation">
              {/* Drawer Top Header Bar with Close Cross */}
              <div className="mobile-nav-header">
                <div className="mobile-nav-brand">
                  <span className="mobile-nav-heading">GUIITAR Council</span>
                  <p className="mobile-nav-subheading">GSFC University Incubation Hub</p>
                </div>
                <div className="mobile-nav-header-actions">
                  <Link
                    to="/apply"
                    onClick={() => setOpen(false)}
                    className="mobile-nav-apply-pill"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    className="mobile-nav-close-btn"
                    onClick={() => setOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Accordion Dropdown List */}
              <div className="mobile-nav-list">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${path === "/" ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Home</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* Dropdown Accordion Categories */}
                {MEGA_MENU.map((cat) => {
                  const Icon = cat.icon;
                  const isExpanded = !!expandedCategories[cat.label];
                  const isCatActive = cat.to === "/" ? path === "/" : path.startsWith(cat.to);

                  return (
                    <div key={cat.label} className="mobile-nav-accordion-item">
                      <button
                        type="button"
                        className={`mobile-nav-accordion-trigger ${isCatActive ? "active" : ""} ${
                          isExpanded ? "expanded" : ""
                        }`}
                        onClick={() => toggleCategory(cat.label)}
                        aria-expanded={isExpanded}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div className="mobile-nav-icon-wrap">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="mobile-nav-category-title">{cat.label}</span>
                          <span className="mobile-nav-item-count">{cat.items.length}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <ChevronDown
                            className="w-4 h-4 transition-transform text-slate-400"
                            style={{
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              color: isExpanded ? "var(--primary)" : undefined,
                            }}
                          />
                        </div>
                      </button>

                      {/* Dropdown Content */}
                      {isExpanded && (
                        <div className="mobile-nav-dropdown-body">
                          {/* Top Overview Link */}
                          <Link
                            to={cat.to}
                            onClick={() => setOpen(false)}
                            className="mobile-nav-overview-link"
                          >
                            <span>{cat.label} Overview & Hub</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {/* Submenu Items */}
                          <div className="mobile-nav-subitems">
                            {cat.items.map((item) => {
                              const isItemActive = path === item.to;
                              return (
                                <Link
                                  key={item.title}
                                  to={item.to}
                                  onClick={() => setOpen(false)}
                                  className={`mobile-nav-subitem-link ${
                                    isItemActive ? "active" : ""
                                  }`}
                                >
                                  <div style={{ flexGrow: 1 }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <span className="mobile-nav-subitem-title">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="mobile-nav-badge">{item.badge}</span>
                                      )}
                                    </div>
                                    <p className="mobile-nav-subitem-desc">{item.desc}</p>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-30 flex-shrink-0 mt-1" />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Featured Card if available */}
                          {cat.featured && (
                            <div className="mobile-nav-featured-box">
                              <span className="mobile-nav-featured-tag">Highlight</span>
                              <h5 className="mobile-nav-featured-title">{cat.featured.title}</h5>
                              <p className="mobile-nav-featured-desc">{cat.featured.desc}</p>
                              <Link
                                to={cat.featured.to}
                                onClick={() => setOpen(false)}
                                className="mobile-nav-featured-cta"
                              >
                                <span>{cat.featured.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Direct Single Pages */}
                <div className="mobile-nav-divider">
                  <span>Direct Portals</span>
                </div>

                <Link
                  to="/apply"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${path.startsWith("/apply") ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap" style={{ color: "var(--primary)" }}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span>Apply for Incubation & Grants</span>
                  </div>
                  <span className="mobile-nav-badge" style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--primary)" }}>
                    Portal
                  </span>
                </Link>

                <Link
                  to="/events"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${path.startsWith("/events") ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <span>Workshops & Events</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                <Link
                  to="/partner"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${
                    path.startsWith("/partner") ? "active" : ""
                  }`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap">
                      <Network className="w-4 h-4" />
                    </div>
                    <span>Partner With Us</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                <Link
                  to="/impact"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${path.startsWith("/impact") ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap" style={{ color: "#2563eb" }}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Live Impact Dashboard</span>
                  </div>
                  <span className="mobile-nav-badge" style={{ background: "#eff6ff", color: "#2563eb" }}>
                    Live Data
                  </span>
                </Link>

                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${path.startsWith("/faq") ? "active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>Help Center & FAQs</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-direct-link ${
                    path.startsWith("/contact") ? "active" : ""
                  }`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="mobile-nav-icon-wrap">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>Contact & Location</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              </div>

              {/* Mobile Drawer Footer with Theme, Contacts & Close */}
              <div className="mobile-nav-footer">
                <div className="mobile-nav-theme-row">
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>
                    Theme Mode
                  </span>
                  <ThemeToggle variant="segmented" />
                </div>

                <div className="mobile-nav-quick-contacts">
                  <a href="tel:+912653093750" className="mobile-nav-contact-btn">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>+91 (0265) 3093750</span>
                  </a>
                  <a href="mailto:guiitar@gsfcuniversity.ac.in" className="mobile-nav-contact-btn">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    <span>guiitar@gsfcuniversity.ac.in</span>
                  </a>
                </div>

                <button
                  type="button"
                  className="mobile-nav-bottom-close-btn"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-4 h-4" />
                  <span>Close Menu</span>
                </button>
              </div>
            </nav>
          </>
        )}
      </header>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            aria-label="GUIITAR Council home"
            style={{ display: "inline-block", marginBottom: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GuiitarEmblem className="w-10 h-10" />
              <div style={{ lineHeight: 1.1 }}>
                <strong
                  style={{
                    color: "#ffffff",
                    fontSize: "20px",
                    fontFamily: "var(--font-heading)",
                    display: "block",
                    letterSpacing: "0.04em",
                  }}
                >
                  GUIITAR
                </strong>
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                  }}
                >
                  COUNCIL
                </span>
              </div>
            </div>
          </Link>
          <p>
            Gujarat University Innovation and Incubation Technology Applied Research (GUIITAR)
            Council is a premier Section 8 not-for-profit company founded by GSFC University in
            Vadodara, Gujarat. Empowering students, researchers, and startups to build enduring
            commercial enterprises.
          </p>
          <div className="social">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GUIITAR Council LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GUIITAR Council X / Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GUIITAR Council Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <div className="footer-links">
            <Link to="/about">About GUIITAR</Link>
            <Link to="/innovation">Innovation & Labs</Link>
            <Link to="/startups">Startup Directory</Link>
            <Link to="/programs">Incubation Programs</Link>
            <Link to="/impact">Impact Dashboard</Link>
            <Link to="/ecosystem">Ecosystem Map</Link>
          </div>
        </div>

        <div>
          <h3>Funding & IPR</h3>
          <div className="footer-links">
            <Link to="/funding">Funding Navigator</Link>
            <Link to="/funding">SSIP 2.0 Grant</Link>
            <Link to="/funding">Gujarat Policy 2020</Link>
            <Link to="/funding">IPR Support Grant</Link>
            <Link to="/apply">Submit Innovation</Link>
          </div>
        </div>

        <div>
          <h3>Community</h3>
          <div className="footer-links">
            <Link to="/events">Workshops & Events</Link>
            <Link to="/partner">Partner With Us</Link>
            <Link to="/resources">Resource Library</Link>
            <Link to="/faq">Help Center & FAQ</Link>
            <Link to="/contact">Campus Visit</Link>
          </div>
        </div>

        <div>
          <h3>Incubation Office</h3>
          <p className="contact-line">
            <MapPin />
            <span>
              Event Room, 2nd Floor, Anviksha Building, GSFC University Campus, Vigyan Bhavan,
              Fertilizernagar, Vadodara, Gujarat 391750, India
            </span>
          </p>
          <a className="contact-line" href="tel:+912653093750">
            <Phone />
            <span>+91 (0265) 3093750</span>
          </a>
          <a className="contact-line" href="mailto:guiitar@gsfcuniversity.ac.in">
            <Mail />
            <span>guiitar@gsfcuniversity.ac.in</span>
          </a>
          <div style={{ marginTop: "16px" }}>
            <Link
              to="/apply"
              className="btn btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Apply for Cohort 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="footer-bottom container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <span>
          © {new Date().getFullYear()} GUIITAR Council, GSFC University. Section 8 Not-For-Profit
          Organization.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/resources">Policies & Governance</Link>
          <Link to="/partner">MOU Guidelines</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Support</Link>
          <ThemeToggle variant="segmented" />
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="page-content" style={{ position: "relative", zIndex: 1, minHeight: "80vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
