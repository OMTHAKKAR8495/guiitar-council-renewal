import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function IconCard({
  icon,
  title,
  text,
  tag,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  tag?: string;
}) {
  return (
    <article className="icon-card">
      <div className="icon-box">{icon}</div>
      {tag && (
        <span className="pill" style={{ width: "fit-content", marginBottom: "12px" }}>
          {tag}
        </span>
      )}
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function FundingCard({
  title,
  text,
  amount,
  badge = "Grant Scheme",
  features,
  link = "/funding",
}: {
  title: string;
  text: string;
  amount: string;
  badge?: string;
  features?: string[];
  link?: string;
}) {
  return (
    <article className="funding-card">
      <div className="funding-top"></div>
      <div className="card-body">
        <span className="funding-card-grant-badge">{badge}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <strong>{amount}</strong>

        {features && features.length > 0 && (
          <ul className="funding-features">
            {features.map((f, i) => (
              <li key={i}>
                <CheckCircle2 />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <Link to={link} className="learn">
          <span>Apply & Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export function Accordion({ items }: { items: { q: string; a: string; category?: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div className={`accordion-item ${open === i ? "active" : ""}`} key={item.q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <ChevronDown className={`accordion-chevron ${open === i ? "rotate" : ""}`} />
          </button>
          {open === i && (
            <div className="accordion-content">
              <p>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Pill({
  children,
  variant = "blue",
}: {
  children: ReactNode;
  variant?: "blue" | "emerald" | "amber" | "purple";
}) {
  return <span className={`pill ${variant}`}>{children}</span>;
}
