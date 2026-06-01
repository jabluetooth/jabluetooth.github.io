import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { Pipeline } from "./Pipeline";
import { Ic } from "./Ic";

const FEATS = [
  "Automatic lead enrichment from any company domain",
  "AI-written, personalized icebreakers",
  "Instant two-way CRM sync",
  "Real-time Slack notifications",
];

const STATS = [
  { v: 15, suffix: " min", lbl: "Saved per lead" },
  { v: 10, suffix: "×",    lbl: "Faster outreach" },
  { v: 100, suffix: "%",   lbl: "Hands-off"       },
];

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <span className="eyebrow"><Ic name="lightning" /> AI lead automation</span>
          </Reveal>
          <Reveal as="h1" delay={60}>
            <span className="fire-text">Ignite</span> your<br />sales pipeline
          </Reveal>
          <Reveal as="p" className="sub" delay={120}>
            Stop burning hours on manual research. Ignite enriches every lead, writes
            the first line for you, and syncs it all to your CRM — automatically.
          </Reveal>
          <Reveal as="ul" className="hero-feats" delay={160}>
            {FEATS.map((f, i) => (
              <li key={i}>
                <span className="feat-check"><Ic name="check" /></span>
                {f}
              </li>
            ))}
          </Reveal>
          <Reveal className="hero-actions" delay={220}>
            <a className="btn btn-primary" href="#start">
              <Ic name="rocket-launch" /> Start automating free
            </a>
            <a className="btn btn-ghost" href="#how">
              <Ic name="play-circle" /> See how it works
            </a>
          </Reveal>
          <Reveal className="hero-trust" delay={260}>
            <span className="avatars">
              <span>JC</span><span>MR</span><span>AS</span><span>+</span>
            </span>
            Trusted by 1,200+ revenue teams · no card required
          </Reveal>
          <Reveal className="stat-strip" delay={120}>
            {STATS.map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat-val fire-text">
                  <Counter end={s.v} suffix={s.suffix} />
                </div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="pipeline-wrap" delay={140}>
          <Pipeline />
        </Reveal>
      </div>
    </header>
  );
}
