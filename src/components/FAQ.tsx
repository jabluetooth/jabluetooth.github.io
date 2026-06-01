import { useState, useId } from "react";
import { Reveal } from "./Reveal";
import { Ic } from "./Ic";

const ITEMS = [
  {
    q: "How does Ignite enrich a lead from just an email?",
    a: "We resolve the domain to a company profile, then layer on role, headcount, industry, tech stack and recent signals from public sources — all in about a second, before the lead ever hits your CRM.",
  },
  {
    q: "Which CRMs and tools do you integrate with?",
    a: "HubSpot, Salesforce, Pipedrive and Close out of the box, plus Slack for notifications. Anything else can connect through our webhook and Zapier support.",
  },
  {
    q: "Will the AI icebreakers sound robotic?",
    a: "No. Each opener is grounded in a real, specific signal about that prospect — a recent expansion, a funding round, a new hire — so it reads like a rep who did their homework, because that's effectively what happened.",
  },
  {
    q: "Is my lead data secure?",
    a: "Data is encrypted in transit and at rest, never sold, and never used to train shared models. You can purge any record on request, and we're SOC 2 Type II aligned.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live in under 10 minutes — connect your CRM, point your inbound at Ignite, and the next lead that arrives is enriched automatically.",
  },
];

export function FAQ() {
  const id = useId();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="section-head" style={{ marginInline: "auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            <Ic name="question" /> FAQ
          </span>
          <h2>Answers before you ask</h2>
        </Reveal>

        <div className="faq-wrap">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            const btnId = `${id}-q${i}`;
            const panelId = `${id}-a${i}`;
            return (
              <Reveal key={i} delay={i * 50}>
                <div className={`faq${isOpen ? " open" : ""}`}>
                  <button
                    id={btnId}
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {it.q}
                    <Ic name="plus" />
                  </button>
                  <div
                    id={panelId}
                    className="faq-a"
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    style={{ maxHeight: isOpen ? "260px" : "0" }}
                  >
                    <div className="faq-a-inner">{it.a}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
