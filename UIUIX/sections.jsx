/* ============================================================================
   Content sections: proof bar, how-it-works, features, FAQ, form, footer
   ============================================================================ */
const { useState: useStateS } = React;

/* ---- Proof / logo bar --------------------------------------------------- */
function ProofBar() {
  const logos = [
    { i: "buildings", n: "Northwind" },
    { i: "rocket", n: "Apex" },
    { i: "globe-hemisphere-west", n: "Meridian" },
    { i: "cube", n: "Cobalt" },
    { i: "lightning", n: "Voltage" },
  ];
  return (
    <section className="section" style={{ paddingBlock: "56px" }}>
      <div className="wrap">
        <Reveal>
          <div className="proof-label">Powering outbound for fast-growing revenue teams</div>
          <div className="logos">
            {logos.map((l, i) => (
              <div className="logo-item" key={i}><Ic name={l.i} weight="fill" /> {l.n}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- How it works ------------------------------------------------------- */
function HowItWorks() {
  const steps = [
    { t: "Drop in a lead", d: "Paste an email, forward an inbound, or connect your form. One address is all Ignite needs to get to work." },
    { t: "AI enriches & writes", d: "We pull company, role, size and live signals — then draft a personalized icebreaker that actually sounds human." },
    { t: "It syncs itself", d: "The enriched lead lands in your CRM and pings your team in Slack. Zero copy-paste, zero tabs, zero busywork." },
  ];
  return (
    <section className="section" id="how">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow"><Ic name="path" weight="fill" /> How it works</span>
          <h2>From cold email to warm reply in three moves</h2>
          <p>No new workflow to learn. Ignite slots into the tools you already use and does the grunt work in the background.</p>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal className="step" key={i} delay={i * 110}>
              <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
              {i < steps.length - 1 && <span className="step-conn" />}
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Feature deep-dive -------------------------------------------------- */
function Features() {
  const feats = [
    { ic: "magnifying-glass", t: "Lead enrichment", d: "Company, headcount, role, tech stack and funding — pulled from the public web the second a lead arrives.", tag: "40+ data points" },
    { ic: "sparkle", t: "AI icebreakers", d: "Personalized openers grounded in real, recent signals about each prospect — not generic mail-merge filler.", tag: "Sounds human" },
    { ic: "arrows-clockwise", t: "Two-way CRM sync", d: "HubSpot, Salesforce, Pipedrive and more. Changes flow both ways so your pipeline is never stale.", tag: "Native integrations" },
    { ic: "slack-logo", t: "Slack notifications", d: "The moment a high-fit lead lands, the right rep gets pinged with full context to act fast.", tag: "Real-time" },
    { ic: "shield-check", t: "Clean, compliant data", d: "Deduplicated, validated and formatted on the way in. Your CRM stays tidy without anyone babysitting it.", tag: "Auto-validated" },
    { ic: "gauge", t: "Zero manual entry", d: "Reps stop being data clerks and get back to selling. Ignite handles the typing, every time.", tag: "100% hands-off" },
  ];
  return (
    <section className="section" id="features">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow"><Ic name="stack" weight="fill" /> What's inside</span>
          <h2>Everything your reps wish they didn't have to do</h2>
          <p>Ignite is the automation layer between a raw lead and a booked meeting — handling research, writing and data hygiene end to end.</p>
        </Reveal>
        <div className="feat-grid">
          {feats.map((f, i) => (
            <Reveal className="card feat-card" key={i} delay={(i % 3) * 90}>
              <div className="feat-ic"><Ic name={f.ic} weight="fill" /></div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              <span className="feat-tag"><Ic name="dot-outline" weight="fill" /> {f.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- FAQ ---------------------------------------------------------------- */
function FAQ() {
  const items = [
    { q: "How does Ignite enrich a lead from just an email?", a: "We resolve the domain to a company profile, then layer on role, headcount, industry, tech stack and recent signals from public sources — all in about a second, before the lead ever hits your CRM." },
    { q: "Which CRMs and tools do you integrate with?", a: "HubSpot, Salesforce, Pipedrive and Close out of the box, plus Slack for notifications. Anything else can connect through our webhook and Zapier support." },
    { q: "Will the AI icebreakers sound robotic?", a: "No. Each opener is grounded in a real, specific signal about that prospect — a recent expansion, a funding round, a new hire — so it reads like a rep who did their homework, because that's effectively what happened." },
    { q: "Is my lead data secure?", a: "Data is encrypted in transit and at rest, never sold, and never used to train shared models. You can purge any record on request, and we're SOC 2 Type II aligned." },
    { q: "How long does setup take?", a: "Most teams are live in under 10 minutes — connect your CRM, point your inbound at Ignite, and the next lead that arrives is enriched automatically." },
  ];
  const [open, setOpen] = useStateS(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="section-head" style={{ marginInline: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}><Ic name="question" weight="fill" /> FAQ</span>
          <h2>Answers before you ask</h2>
        </Reveal>
        <div className="faq-wrap">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className={"faq" + (open === i ? " open" : "")}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {it.q}<Ic name="plus" weight="bold" />
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? "260px" : "0" }}>
                  <div className="faq-a-inner">{it.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <a className="brand" href="#top">
          <img src="assets/IgniteLogo.png" alt="Ignite" />
          <span className="brand-name">Ignite</span>
        </a>
        <div className="footer-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="#start">Get started</a>
        </div>
        <small>© {new Date().getFullYear()} Ignite. All rights reserved.</small>
      </div>
    </footer>
  );
}

Object.assign(window, { ProofBar, HowItWorks, Features, FAQ, Footer });
