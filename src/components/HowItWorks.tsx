import { Reveal } from "./Reveal";
import { Ic } from "./Ic";

const STEPS = [
  {
    t: "Drop in a lead",
    d: "Paste an email, forward an inbound, or connect your form. One address is all Ignite needs to get to work.",
  },
  {
    t: "AI enriches & writes",
    d: "We pull company, role, size and live signals — then draft a personalized icebreaker that actually sounds human.",
  },
  {
    t: "It syncs itself",
    d: "The enriched lead lands in your CRM and pings your team in Slack. Zero copy-paste, zero tabs, zero busywork.",
  },
];

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow"><Ic name="path" /> How it works</span>
          <h2>From cold email to warm reply in three moves</h2>
          <p>
            No new workflow to learn. Ignite slots into the tools you already use
            and does the grunt work in the background.
          </p>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal className="step" key={i} delay={i * 110}>
              <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
              {i < STEPS.length - 1 && <span className="step-conn" />}
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
