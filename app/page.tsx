import { DigitalEstimator } from "./components/DigitalEstimator";
import { FinishVisualizer } from "./components/FinishVisualizer";
import { MobileNavigation } from "./components/MobileNavigation";
import { PhoenixLeadForm } from "./components/PhoenixLeadForm";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";
const email = "hello@phoenixepoxypros.com";

const images = {
  hero: "/images/hero-garage-approved.webp?v=approved-final-20260617",
  beforeAfter: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-before-after.webp?v=1781648570",
  garage: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581",
  commercial: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591",
  patio: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601",
  repair: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616",
  processSignUp: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-01-sign-up-schedule.png?v=1781036561",
  processPrepWork: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-02-prep-work.png?v=1781036569",
  processBaseCoat: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-03-base-coat.png?v=1781036578",
  processBeautyCoat: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-04-beauty-coat.png?v=1781036586",
  processTopcoatFinish: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-05-topcoat-finish.png?v=1781036595",
  processFinalInspection: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-06-final-inspection.png?v=1781036605"
};

const navLinks = [
  { label: "Digital Bid", href: "/digital-bid" },
  { label: "Portal System", href: "/portal-system" },
  { label: "Customer Dashboard", href: "/client-dashboard" },
  { label: "Admin Dashboard", href: "/admin-dashboard" },
  { label: "About Us", href: "/about-us" },
  { label: "Gallery", href: "/gallery" }
];

const services = [
  {
    title: "Garage Floor Coatings",
    image: images.garage,
    summary: "Diamond-grind prep, crack repair, full-broadcast flake, and durable polyaspartic topcoat planning.",
    detail: "Best for daily-use Phoenix garages that need a clean finish, traction, and easier maintenance."
  },
  {
    title: "Commercial Floor Systems",
    image: images.commercial,
    summary: "Flake, quartz, and high-performance coating systems for shops, showrooms, warehouses, and workspaces.",
    detail: "Traffic, chemical exposure, slip resistance, downtime, and cleaning needs drive the system recommendation."
  },
  {
    title: "Patios & Outdoor Concrete",
    image: images.patio,
    summary: "Exterior coating direction for patios, covered spaces, walkways, and Arizona concrete surfaces.",
    detail: "Outdoor projects need UV, heat, texture, and drainage considerations before finish selection."
  },
  {
    title: "Repair & Surface Prep",
    image: images.repair,
    summary: "Crack repair, spalling, failed coating removal, grinding, patching, and slab-condition review.",
    detail: "Prep is the part that decides whether the coating bonds, wears correctly, and looks right."
  }
];

const trustItems = [
  {
    title: "Photos, Size & Surface Condition",
    text: "Start with the floor type, rough square footage, current coating history, cracks, and clear photos."
  },
  {
    title: "Finish System Guidance",
    text: "Compare flake, metallic, quartz, solid color, glitter, and stain options before choosing the performance path."
  },
  {
    title: "Portal-Ready Project Setup",
    text: "Estimator requests can move into proposal delivery, payment links, warranty information, and job tracking after approval."
  }
];

const processSteps = [
  {
    number: "1",
    title: "Sign Up & Schedule Job",
    image: images.processSignUp,
    text: "Start the estimate, send project basics, and choose the first finish direction.",
    points: ["Free estimate intake", "Digital Bid handoff", "Scheduling path"]
  },
  {
    number: "2",
    title: "Prep Work",
    image: images.processPrepWork,
    text: "Concrete is mechanically prepared so the coating has the right profile and bond.",
    points: ["Diamond grinding", "Crack repair and patching", "Clean surface profile"]
  },
  {
    number: "3",
    title: "Base Coat",
    image: images.processBaseCoat,
    text: "The base coat is matched to the slab, use case, and selected broadcast system.",
    points: ["Moisture-aware review", "Strong bond layer", "System-specific base"]
  },
  {
    number: "4",
    title: "Beauty Coat",
    image: images.processBeautyCoat,
    text: "Flake, metallic, or quartz creates the visual finish and texture profile.",
    points: ["Flake broadcast", "Metallic movement", "Quartz texture"]
  },
  {
    number: "5",
    title: "Topcoat Finish",
    image: images.processTopcoatFinish,
    text: "The clear topcoat locks in the system and sets the sheen, texture, and durability.",
    points: ["Polyaspartic topcoat", "Satin or gloss direction", "Durability layer"]
  },
  {
    number: "6",
    title: "Final Inspection",
    image: images.processFinalInspection,
    text: "The finished floor is reviewed for quality, cure guidance, and care instructions.",
    points: ["Walkthrough", "Care guide", "Follow-up notes"]
  }
];

const gallery = [
  { title: "Garage Floors", image: images.garage },
  { title: "Commercial Floors", image: images.commercial },
  { title: "Outdoor Spaces", image: images.patio },
  { title: "Concrete Repair", image: images.repair }
];

const jobTrackerFeatures = [
  ["Immediate Tracking From Signup", "Clients can see their project intake, estimate status, finish selections, schedule checkpoints, and next required action as soon as tracker access is created."],
  ["Unique Client Project Timeline", "Photos, measurements, desired finish, warranty information, care instructions, messages, approvals, proposal details, and documents stay attached to one job record instead of scattered texts."],
  ["Built For Trust Before Install Day", "The tracker shows what has been received, what is being reviewed, what is approved, and what happens next so clients never wonder where the job stands."]
];

export default function HomePage() {
  return (
    <main className="phoenix-site">
      <header className="site-header">
        <a className="header-logo" href="#home" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav aria-label="Main navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.label}>{link.label}</a>
          ))}
          <a className="header-call phone-icon-link" href={phoneHref} aria-label={`Call ${phone}`}>
            <span className="phone-icon" aria-hidden="true" />
          </a>
        </nav>
        <a className="gold-button header-cta" href="/digital-estimator">Get Quote</a>
        <MobileNavigation />
      </header>

      <section className="hero" id="home" aria-label="Phoenix Epoxy Pros estimate hero">
        <div className="hero-stage">
          <div className="hero-photo" aria-hidden="true">
            <img src={images.hero} alt="" />
          </div>
          <div className="hero-logo-panel" aria-hidden="true">
            <img src="/images/logo-panel.webp?v=mask-20260616" alt="" />
          </div>
          <PhoenixLeadForm />
        </div>

        <nav className="mobile-action-rail" aria-label="Mobile quick actions">
          <a href="/digital-estimator"><span className="action-icon">01</span>Estimate</a>
          <a href="#process"><span className="action-icon">02</span>Process</a>
          <a href="#color-chart"><span className="action-icon">03</span>Colors</a>
          <a href={phoneHref}><span className="mobile-phone-icon" aria-hidden="true" />Call</a>
        </nav>
      </section>

      <section className="mobile-steps" aria-label="Mobile estimate steps">
        <SectionIntro kicker="Start here" title="Four taps to get moving" />
        <div className="app-step-list">
          <a href="#estimate"><span>1</span><strong>Start Digital Bid</strong><small>Name, email, phone, ZIP, and project type prefill the bid form.</small></a>
          <a href="#digital-estimator"><span>2</span><strong>Send Photos</strong><small>Upload floor images, measurements, covering type, finish, desired color, and inspiration photos.</small></a>
          <a href="#color-chart"><span>3</span><strong>Choose Finish</strong><small>Compare the color charts before locking your finish direction.</small></a>
          <a href="/job-tracker"><span>4</span><strong>Track Next Steps</strong><small>Open job tracking, documents, messages, proposal status, and care guides.</small></a>
        </div>
      </section>

      <section className="trust-band" aria-label="Estimate benefits">
        {trustItems.map((item) => (
          <p key={item.title}><strong>{item.title}</strong><span>{item.text}</span></p>
        ))}
      </section>

      <section className="section services-section" id="services">
        <SectionIntro kicker="Services" title="Phoenix epoxy floors built around the right system" />
        <div className="services-grid">
          {services.map((service) => (
            <a className="service-card" href="/digital-estimator" key={service.title}>
              <img src={service.image} alt={`${service.title} project example`} />
              <div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <small>{service.detail}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="proof-section" id="before-after">
        <div className="proof-copy">
          <span className="section-kicker">Before / After</span>
          <h2>Prep is what separates a coating from a floor that lasts.</h2>
          <p>
            A good epoxy or polyaspartic system starts before the coating is poured. The slab needs the right profile,
            repairs, cleaning, base coat, broadcast, and topcoat for the way the floor will actually be used.
          </p>
          <a className="gold-button" href="/digital-estimator">Start My Quote</a>
        </div>
        <img src={images.beforeAfter} alt="Before and after Phoenix epoxy garage floor comparison" />
      </section>

      <section className="section process-section" id="process">
        <SectionIntro kicker="Step by step installation" title="Our 6-step floor coating process" />
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-card" key={step.title}>
              <div className="process-image">
                <img src={step.image} alt={`${step.title} epoxy floor process stage`} />
                <span className="process-number">{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <ul>
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <FinishVisualizer />

      <section className="gallery-section" id="gallery">
        <SectionIntro kicker="Project gallery" title="Real surface directions for real concrete" dark />
        <div className="gallery-strip">
          {gallery.map((item) => (
            <a href="/digital-estimator" key={item.title}>
              <img src={item.image} alt={`${item.title} example`} />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
        <a className="gold-button" href="/gallery">View Full Gallery</a>
      </section>

      <section className="section reviews-section job-tracker-section" id="job-tracker">
        <SectionIntro kicker="Job Tracker" title="A client portal that starts tracking the moment they sign up" />
        <div className="review-grid">
          {jobTrackerFeatures.map(([title, text]) => (
            <article className="review-card job-tracker-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="job-tracker-cta">
          <p>Every qualified estimate can become a tracked project with uploads, finish approvals, proposal status, warranty documents, progress checkpoints, and email updates in one place.</p>
          <a className="gold-button" href="/portal-system">View Portal System</a>
        </div>
      </section>

      <DigitalEstimator />

      <section className="section faq-section">
        <SectionIntro kicker="Common questions" title="Plan your epoxy floor estimate" />
        <div className="faq-grid">
          <details open>
            <summary>What should I send for an estimate?</summary>
            <p>Send the project type, rough square footage, timeline, surface condition, coating history, and clear photos of the floor.</p>
          </details>
          <details>
            <summary>Should I choose flake, metallic, or quartz?</summary>
            <p>Flake is usually best for garages and patios, metallic is best for decorative statement floors, and quartz is best for traction-heavy or commercial spaces.</p>
          </details>
          <details>
            <summary>Why does prep matter so much?</summary>
            <p>Most coating failures start with poor surface preparation. Grinding, repair, cleaning, and the right base coat are what help the system bond correctly.</p>
          </details>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          <p>Phoenix epoxy floor estimates, digital bid intake, finish system planning, proposal handoff, and customer project tracking.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/digital-bid">Digital Bid</a>
          <a href="/portal-system">Portal System</a>
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/gallery">Gallery</a>
          <a href="/job-tracker">Job Tracker</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={phoneHref}>{phone}</a>
        </nav>
      </footer>

      <a className="mobile-call" href={phoneHref}><span className="mobile-phone-icon" aria-hidden="true" />Call {phone}</a>
    </main>
  );
}

function SectionIntro({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className={`section-intro ${dark ? "dark" : ""}`}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}
