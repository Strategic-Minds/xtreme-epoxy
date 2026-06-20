"use client";

export function PhoenixLeadForm() {
  return (
    <form className="phoenix-lead-form" action="/digital-estimator">
      <div className="phoenix-lead-form-head">
        <span className="section-kicker">Start your estimate</span>
        <h2>Get the 15% digital bid.</h2>
      </div>
      <input name="fullName" placeholder="Full name" aria-label="Full name" />
      <input name="email" type="email" placeholder="Email" aria-label="Email" />
      <input name="phone" type="tel" placeholder="Phone number" aria-label="Phone number" />
      <input name="zipCode" placeholder="ZIP code" aria-label="ZIP code" />
      <button type="submit" className="gold-button">Start My Digital Bid</button>
    </form>
  );
}
