import { Reveal } from "./Reveal";
import { Ic } from "./Ic";

const FEATS = [
  { ic: "magnifying-glass", t: "Lead enrichment",   d: "Company, headcount, role, tech stack and funding — pulled from the public web the second a lead arrives.",               tag: "40+ data points"     },
  { ic: "sparkle",          t: "AI icebreakers",    d: "Personalized openers grounded in real, recent signals about each prospect — not generic mail-merge filler.",              tag: "Sounds human"        },
  { ic: "arrows-clockwise", t: "Two-way CRM sync",  d: "HubSpot, Salesforce, Pipedrive and more. Changes flow both ways so your pipeline is never stale.",                       tag: "Native integrations" },
  { ic: "slack-logo",       t: "Slack notifications", d: "The moment a high-fit lead lands, the right rep gets pinged with full context to act fast.",                           tag: "Real-time"           },
  { ic: "shield-check",     t: "Clean, compliant data", d: "Deduplicated, validated and formatted on the way in. Your CRM stays tidy without anyone babysitting it.",            tag: "Auto-validated"      },
  { ic: "gauge",            t: "Zero manual entry", d: "Reps stop being data clerks and get back to selling. Ignite handles the typing, every time.",                            tag: "100% hands-off"      },
];

export function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow"><Ic name="stack" /> What's inside</span>
          <h2>Everything your reps wish they didn't have to do</h2>
          <p>
            Ignite is the automation layer between a raw lead and a booked meeting —
            handling research, writing and data hygiene end to end.
          </p>
        </Reveal>
        <div className="feat-grid">
          {FEATS.map((f, i) => (
            <Reveal className="card feat-card" key={i} delay={(i % 3) * 90}>
              <div className="feat-ic"><Ic name={f.ic} /></div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              <span className="feat-tag"><Ic name="dot-outline" /> {f.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
