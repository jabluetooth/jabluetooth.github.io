import { useState, useId, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Ic } from "./Ic";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];
const DIAL_CODES = ["+1", "+44", "+61", "+63", "+65", "+91"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ASIDE_POINTS = [
  "Live in under 10 minutes — no engineer needed",
  "Free 14-day trial, no card required",
  "Cancel anytime, keep your enriched data",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  dial: string;
  phone: string;
  size: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

const EMPTY: FormData = {
  name: "", email: "", company: "", dial: "+1", phone: "", size: "", message: "",
};

type Status = "idle" | "success" | "error" | "misconfigured";

export function FormSection() {
  const id = useId();
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const field = (k: keyof FormData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!data.name.trim())    e.name    = "Tell us your name";
    if (!data.email.trim())   e.email   = "We need an email to reach you";
    else if (!EMAIL_RE.test(data.email)) e.email = "That email looks off";
    if (!data.company.trim()) e.company = "Which company?";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!N8N_WEBHOOK_URL) {
      setStatus("misconfigured");
      return;
    }

    if (!validate()) return;

    setLoading(true);
    setStatus("idle");

    const payload = {
      name:        data.name,
      email:       data.email,
      company:     data.company,
      phone:       data.phone ? `${data.dial} ${data.phone}` : "",
      companySize: data.size,
      message:     data.message,
      timestamp:   new Date().toISOString(),
      source:      "landing_page",
      userAgent:   navigator.userAgent,
      referrer:    document.referrer || "direct",
    };

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        setData(EMPTY);
        setErrors({});
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setData(EMPTY);
    setErrors({});
  };

  const statusId = `${id}-status`;

  return (
    <section className="section form-section" id="start" aria-labelledby={`${id}-heading`}>
      <div className="wrap">
        <Reveal className="form-card">
          {/* ---- Aside --------------------------------------------------- */}
          <div className="form-aside">
            <span className="eyebrow">
              <Ic name="rocket-launch" /> Get started
            </span>
            <h2 id={`${id}-heading`} style={{ marginTop: 14 }}>
              See your next lead<br />enrich itself
            </h2>
            <p>
              Drop your details and watch Ignite turn a cold contact into a
              ready-to-send, personalized opener — live.
            </p>
            <ul className="aside-list">
              {ASIDE_POINTS.map((a, i) => (
                <li key={i}><Ic name="check-circle" /> {a}</li>
              ))}
            </ul>
            <div className="aside-foot">
              <Ic name="lock-simple" /> Your data is encrypted and never sold.
            </div>
          </div>

          {/* ---- Form body ----------------------------------------------- */}
          <div className="form-body">
            {/* Screen-reader live region for status announcements */}
            <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only" />

            {status === "success" ? (
              <div className="form-success" role="status">
                <div className="success-badge pop">
                  <Ic name="check-fat" />
                </div>
                <h3 style={{ fontSize: 24 }}>You're in. 🎉</h3>
                <p className="muted" style={{ maxWidth: "32ch" }}>
                  Ignite is already enriching your details. A specialist will reach
                  out shortly to switch on your auto-pilot.
                </p>
                <button className="btn btn-ghost btn-sm" onClick={resetForm}>
                  <Ic name="arrow-counter-clockwise" /> Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-describedby={statusId}>
                <div className="field-row">
                  {/* Full name */}
                  <div className={`field${errors.name ? " invalid" : ""}`}>
                    <label htmlFor={`${id}-name`}>
                      Full name <span className="req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-name`}
                      value={data.name}
                      placeholder="Jordan Chen"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${id}-name-err` : undefined}
                      onChange={(e) => field("name", e.target.value)}
                    />
                    {errors.name && (
                      <div id={`${id}-name-err`} className="err" role="alert">
                        <Ic name="warning-circle" /> {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Company */}
                  <div className={`field${errors.company ? " invalid" : ""}`}>
                    <label htmlFor={`${id}-company`}>
                      Company <span className="req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-company`}
                      value={data.company}
                      placeholder="Northwind"
                      autoComplete="organization"
                      aria-required="true"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? `${id}-company-err` : undefined}
                      onChange={(e) => field("company", e.target.value)}
                    />
                    {errors.company && (
                      <div id={`${id}-company-err`} className="err" role="alert">
                        <Ic name="warning-circle" /> {errors.company}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className={`field${errors.email ? " invalid" : ""}`}>
                  <label htmlFor={`${id}-email`}>
                    Work email <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    value={data.email}
                    placeholder="jordan@northwind.io"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${id}-email-err` : undefined}
                    onChange={(e) => field("email", e.target.value)}
                  />
                  {errors.email && (
                    <div id={`${id}-email-err`} className="err" role="alert">
                      <Ic name="warning-circle" /> {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="field">
                  <label htmlFor={`${id}-phone`}>
                    Phone{" "}
                    <span className="muted" style={{ fontWeight: 400 }}>· optional</span>
                  </label>
                  <div className="phone-group">
                    <select
                      aria-label="Country code"
                      value={data.dial}
                      onChange={(e) => field("dial", e.target.value)}
                    >
                      {DIAL_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input
                      id={`${id}-phone`}
                      inputMode="tel"
                      value={data.phone}
                      placeholder="555 0123"
                      autoComplete="tel-national"
                      onChange={(e) => field("phone", e.target.value)}
                    />
                  </div>
                </div>

                {/* Company size */}
                <div className="field">
                  <label htmlFor={`${id}-size`}>
                    Company size{" "}
                    <span className="muted" style={{ fontWeight: 400 }}>· optional</span>
                  </label>
                  <select
                    id={`${id}-size`}
                    value={data.size}
                    onChange={(e) => field("size", e.target.value)}
                    style={{ color: data.size ? "var(--text)" : "var(--text-muted)" }}
                  >
                    <option value="">Select team size</option>
                    {COMPANY_SIZES.map((s) => (
                      <option key={s} value={s} style={{ color: "#fff" }}>{s} employees</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="field">
                  <label htmlFor={`${id}-msg`}>
                    What's slowing your team down?{" "}
                    <span className="muted" style={{ fontWeight: 400 }}>· optional</span>
                  </label>
                  <textarea
                    id={`${id}-msg`}
                    value={data.message}
                    placeholder="Too much manual research before every email…"
                    onChange={(e) => field("message", e.target.value)}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", height: 52, fontSize: 16 }}
                  disabled={loading}
                  aria-disabled={loading}
                >
                  {loading
                    ? <><span className="spinner" aria-hidden="true" /> Igniting…</>
                    : <><Ic name="lightning" /> Start automating free</>}
                </button>

                {/* Error banners */}
                {status === "error" && (
                  <div className="form-error-banner" role="alert">
                    <Ic name="warning-circle" />
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}
                {status === "misconfigured" && (
                  <div className="form-error-banner" role="alert">
                    <Ic name="warning-circle" />
                    Form is not yet configured. Set the VITE_N8N_WEBHOOK_URL environment variable.
                  </div>
                )}

                <div className="form-note">
                  <Ic name="shield-check" /> No spam. Unsubscribe anytime.
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
