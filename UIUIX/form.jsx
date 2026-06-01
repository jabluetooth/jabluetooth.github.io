/* ============================================================================
   Conversion form section — live validation + animated success state
   ============================================================================ */
const { useState: useStateF } = React;

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];
const DIAL_CODES = ["+1", "+44", "+61", "+63", "+65", "+91"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FormSection() {
  const [data, setData] = useStateF({
    name: "", email: "", company: "", dial: "+1", phone: "", size: "", message: "",
  });
  const [errors, setErrors] = useStateF({});
  const [loading, setLoading] = useStateF(false);
  const [status, setStatus] = useStateF("idle"); // idle | success

  const set = (k, v) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Tell us your name";
    if (!data.email.trim()) e.email = "We need an email to reach you";
    else if (!EMAIL_RE.test(data.email)) e.email = "That email looks off";
    if (!data.company.trim()) e.company = "Which company?";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // simulated webhook — this is a prototype
    setTimeout(() => { setLoading(false); setStatus("success"); }, 1100);
  };

  const aside = [
    "Live in under 10 minutes — no engineer needed",
    "Free 14-day trial, no card required",
    "Cancel anytime, keep your enriched data",
  ];

  return (
    <section className="section form-section" id="start">
      <div className="wrap">
        <Reveal className="form-card">
          <div className="form-aside">
            <span className="eyebrow"><Ic name="rocket-launch" weight="fill" /> Get started</span>
            <h2 style={{ marginTop: 14 }}>See your next lead<br />enrich itself</h2>
            <p>Drop your details and watch Ignite turn a cold contact into a ready-to-send, personalized opener — live.</p>
            <ul className="aside-list">
              {aside.map((a, i) => (
                <li key={i}><Ic name="check-circle" weight="fill" /> {a}</li>
              ))}
            </ul>
            <div className="aside-foot"><Ic name="lock-simple" weight="fill" /> Your data is encrypted and never sold.</div>
          </div>

          <div className="form-body">
            {status === "success" ? (
              <div className="form-success">
                <div className="success-badge pop"><Ic name="check-fat" weight="fill" /></div>
                <h3 style={{ fontSize: 24 }}>You're in. 🎉</h3>
                <p className="muted" style={{ maxWidth: "32ch" }}>
                  Ignite is already enriching your details. A specialist will reach out shortly to
                  switch on your auto-pilot.
                </p>
                <button className="btn btn-ghost btn-sm" onClick={() => { setStatus("idle"); setData({ name: "", email: "", company: "", dial: "+1", phone: "", size: "", message: "" }); }}>
                  <Ic name="arrow-counter-clockwise" /> Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field-row">
                  <div className={"field" + (errors.name ? " invalid" : "")}>
                    <label htmlFor="f-name">Full name <span className="req">*</span></label>
                    <input id="f-name" value={data.name} placeholder="Jordan Chen"
                      onChange={(e) => set("name", e.target.value)} />
                    {errors.name && <div className="err"><Ic name="warning-circle" weight="fill" /> {errors.name}</div>}
                  </div>
                  <div className={"field" + (errors.company ? " invalid" : "")}>
                    <label htmlFor="f-company">Company <span className="req">*</span></label>
                    <input id="f-company" value={data.company} placeholder="Northwind"
                      onChange={(e) => set("company", e.target.value)} />
                    {errors.company && <div className="err"><Ic name="warning-circle" weight="fill" /> {errors.company}</div>}
                  </div>
                </div>

                <div className={"field" + (errors.email ? " invalid" : "")}>
                  <label htmlFor="f-email">Work email <span className="req">*</span></label>
                  <input id="f-email" type="email" value={data.email} placeholder="jordan@northwind.io"
                    onChange={(e) => set("email", e.target.value)} />
                  {errors.email && <div className="err"><Ic name="warning-circle" weight="fill" /> {errors.email}</div>}
                </div>

                <div className="field">
                  <label htmlFor="f-phone">Phone <span className="muted" style={{ fontWeight: 400 }}>· optional</span></label>
                  <div className="phone-group">
                    <select aria-label="Country code" value={data.dial} onChange={(e) => set("dial", e.target.value)}>
                      {DIAL_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input id="f-phone" inputMode="tel" value={data.phone} placeholder="555 0123"
                      onChange={(e) => set("phone", e.target.value)} />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="f-size">Company size <span className="muted" style={{ fontWeight: 400 }}>· optional</span></label>
                  <select id="f-size" value={data.size} onChange={(e) => set("size", e.target.value)}
                    style={{ color: data.size ? "var(--text)" : "var(--text-muted)" }}>
                    <option value="">Select team size</option>
                    {COMPANY_SIZES.map((s) => <option key={s} value={s} style={{ color: "#000" }}>{s} employees</option>)}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="f-msg">What's slowing your team down? <span className="muted" style={{ fontWeight: 400 }}>· optional</span></label>
                  <textarea id="f-msg" value={data.message} placeholder="Too much manual research before every email…"
                    onChange={(e) => set("message", e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", height: 52, fontSize: 16 }} disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Igniting…</>
                  ) : (
                    <><Ic name="lightning" weight="fill" /> Start automating free</>
                  )}
                </button>
                <div className="form-note"><Ic name="shield-check" weight="fill" /> No spam. Unsubscribe anytime.</div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { FormSection });
