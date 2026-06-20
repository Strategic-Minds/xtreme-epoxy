"use client";

import { useMemo, useState } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

type LeadRecord = {
  id: string;
  name: string;
  location: string;
  status: string;
  channel: string;
  value: string;
  nextAction: string;
  due: string;
};

const queue: LeadRecord[] = [
  { id: "XPS-1842", name: "Marcus R.", location: "Phoenix, AZ", status: "New lead", channel: "Web form + SMS", value: "$7,800", nextAction: "Call within 10 minutes", due: "Now" },
  { id: "XPS-1843", name: "Tina S.", location: "Mesa, AZ", status: "Awaiting proposal", channel: "Digital bid", value: "$11,400", nextAction: "Send estimate + warranty", due: "Today" },
  { id: "XPS-1844", name: "James K.", location: "Scottsdale, AZ", status: "Install scheduled", channel: "Customer portal", value: "$18,200", nextAction: "Crew confirm materials", due: "Tomorrow" },
  { id: "XPS-1845", name: "Lana G.", location: "Tempe, AZ", status: "Payment pending", channel: "Call + email", value: "$9,600", nextAction: "Send payment reminder", due: "Today" }
];

const analytics = [
  { label: "Open inquiries", value: "14", detail: "+3 from yesterday" },
  { label: "Quotes sent", value: "9", detail: "6 awaiting approval" },
  { label: "Jobs active", value: "22", detail: "4 scheduled this week" },
  { label: "Text response rate", value: "91%", detail: "Within first hour" }
];

const automationRules = [
  "Send instant text when a new digital bid is submitted.",
  "Create the customer dashboard record when lead persistence succeeds.",
  "Email proposal and warranty package when the estimate is approved.",
  "Send crew leader packet when a job moves to scheduled.",
  "Request Google review after completion with project photos attached."
];

export default function AdminDashboardPage() {
  const [selected, setSelected] = useState(queue[0]);
  const completionRate = useMemo(() => 84, []);

  return (
    <main className="portal-login-page admin-dashboard-page">
      <header className="portal-login-header branded-page-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <MobileNavigation />
        <a className="portal-home-link" href="/client-dashboard">Preview customer view</a>
      </header>

      <section className="admin-dashboard-hero" aria-label="Admin dashboard overview">
        <div className="admin-dashboard-copy">
          <span className="section-kicker">Operations Center</span>
          <h1>Run the whole system from one branded control room.</h1>
          <p>
            This admin view is designed for speed, clarity, and automation: every inquiry, estimate, job, text, and
            follow-up lives in one controlled workflow.
          </p>
          <div className="portal-proof-row">
            <span>Automated bidding</span>
            <span>SMS + email</span>
            <span>Job tracking</span>
            <span>Review capture</span>
          </div>
        </div>

        <aside className="admin-dashboard-signal">
          <span className="section-kicker">System Health</span>
          <strong>{completionRate}%</strong>
          <p>Workflow coverage across lead capture, estimate routing, customer updates, and crew handoff.</p>
        </aside>
      </section>

      <section className="admin-dashboard-metrics" aria-label="Performance metrics">
        {analytics.map((item) => (
          <article key={item.label} className="admin-metric-card">
            <span className="section-kicker">{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="admin-dashboard-workflow" aria-label="Automation workflow">
        <article className="admin-dashboard-panel">
          <span className="section-kicker">Automation Rules</span>
          <h2>What should happen automatically</h2>
          <ul>
            {automationRules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </article>

        <article className="admin-dashboard-panel">
          <span className="section-kicker">Selected Lead</span>
          <h2>{selected.name}</h2>
          <dl>
            <dt>Lead ID</dt>
            <dd>{selected.id}</dd>
            <dt>Location</dt>
            <dd>{selected.location}</dd>
            <dt>Status</dt>
            <dd>{selected.status}</dd>
            <dt>Source</dt>
            <dd>{selected.channel}</dd>
            <dt>Value</dt>
            <dd>{selected.value}</dd>
            <dt>Next action</dt>
            <dd>{selected.nextAction}</dd>
          </dl>
          <div className="dashboard-action-row">
            <a className="gold-button" href="/digital-estimator">Open bid</a>
            <a className="gold-button secondary" href="/client-dashboard">Open customer view</a>
          </div>
        </article>
      </section>

      <section className="admin-dashboard-queue" aria-label="Lead queue">
        <div className="admin-dashboard-queue-head">
          <span className="section-kicker">Queue</span>
          <h2>Live inquiry board</h2>
          <p>Choose a record to preview how it would flow through the system.</p>
        </div>
        <div className="admin-queue-list">
          {queue.map((lead) => (
            <button key={lead.id} type="button" className={`admin-queue-item ${selected.id === lead.id ? "active" : ""}`} onClick={() => setSelected(lead)}>
              <strong>{lead.name}</strong>
              <span>{lead.location}</span>
              <span>{lead.status}</span>
              <small>{lead.nextAction}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="admin-dashboard-cards" aria-label="Operations summary">
        <article className="admin-dashboard-panel">
          <span className="section-kicker">Crew Routing</span>
          <h2>What the crew leader needs</h2>
          <p>Job spec, color chart, change order, site photos, access notes, and install checklist.</p>
        </article>
        <article className="admin-dashboard-panel">
          <span className="section-kicker">Customer Experience</span>
          <h2>What the customer sees</h2>
          <p>Status timeline, proposal, payment step, photos, contract, warranty, and review request.</p>
        </article>
      </section>
    </main>
  );
}
