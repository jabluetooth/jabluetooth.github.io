/* ============================================================================
   Nav + Hero (with the looping lead-enrichment pipeline visual)
   ============================================================================ */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

function Nav() {
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a className="brand" href="#top">
          <img src="assets/IgniteLogo.png" alt="Ignite" />
          <span className="brand-name">Ignite</span>
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost btn-sm" href="#start">Sign in</a>
          <a className="btn btn-primary btn-sm" href="#start">Get started</a>
        </div>
      </div>
    </nav>
  );
}

/* ---- The animated pipeline ---------------------------------------------- */
const ICEBREAKER = "Saw Northwind just opened a Cebu hub — scaling the SDR team to match?";

function Pipeline() {
  const [stage, setStage] = useStateH(0);     // 0..3 active stage
  const [typed, setTyped] = useStateH("");
  const cycle = useRefH(null);

  // master loop: advance stages, then reset
  useEffectH(() => {
    let s = 0;
    setStage(0);
    const advance = () => {
      s = s + 1;
      if (s > 3) {
        // brief hold on full state, then restart
        cycle.current = setTimeout(() => { s = 0; setStage(0); setTyped(""); loop(); }, 2600);
        return;
      }
      setStage(s);
      schedule();
    };
    const schedule = () => { cycle.current = setTimeout(advance, s === 2 ? 2300 : 1500); };
    const loop = () => { schedule(); };
    loop();
    return () => clearTimeout(cycle.current);
  }, []);

  // typewriter for the icebreaker when stage 3 reached
  useEffectH(() => {
    if (stage < 3) { setTyped(""); return; }
    let i = 0; let t;
    const type = () => {
      i++; setTyped(ICEBREAKER.slice(0, i));
      if (i < ICEBREAKER.length) t = setTimeout(type, 26);
    };
    t = setTimeout(type, 120);
    return () => clearTimeout(t);
  }, [stage]);

  const on = (n) => (stage >= n ? " active" : "");

  return (
    <div className="pipeline">
      <div className="pl-bar">
        <span className="pl-dot" /><span className="pl-dot" /><span className="pl-dot" />
        <span className="pl-title"><span className="pl-live" /> Live · auto-pilot</span>
      </div>

      {/* Stage 0 — new lead arrives */}
      <div className={"stage" + on(0)}>
        <div className="stage-head">
          <div className="stage-ic"><Ic name="user-plus" /></div>
          <div>
            <div className="stage-k">New lead</div>
            <div className="stage-v">j.chen@northwind.io</div>
          </div>
          <div className="stage-step">01</div>
        </div>
      </div>

      {/* Stage 1 — enrichment */}
      <div className={"stage" + on(1)}>
        <div className="stage-head">
          <div className="stage-ic"><Ic name="sparkle" /></div>
          <div>
            <div className="stage-k">Enriched in 1.2s</div>
            <div className="stage-v">Northwind Logistics</div>
          </div>
          <div className="stage-step">02</div>
        </div>
        <div className="enrich-rows">
          <div><div className="er-k">Role</div><div className="er-v">VP of Sales</div></div>
          <div><div className="er-k">Company size</div><div className="er-v">201–500</div></div>
          <div><div className="er-k">Industry</div><div className="er-v">Freight &amp; Logistics</div></div>
          <div><div className="er-k">Signal</div><div className="er-v">New SEA expansion</div></div>
        </div>
        <div className="scanline" />
      </div>

      {/* Stage 2 — AI icebreaker */}
      <div className={"stage" + on(2)}>
        <div className="stage-head">
          <div className="stage-ic"><Ic name="chat-teardrop-text" /></div>
          <div>
            <div className="stage-k">AI icebreaker</div>
            <div className="stage-v">Personalized opener</div>
          </div>
          <div className="stage-step">03</div>
        </div>
        <div className="icebreaker">
          {stage >= 2 ? (stage === 2 ? <>{typed}<span className="cursor" /></> : ICEBREAKER) : ""}
        </div>
      </div>

      {/* Stage 3 — sync */}
      <div className={"stage" + on(3)}>
        <div className="stage-head">
          <div className="stage-ic"><Ic name="check-circle" weight="fill" /></div>
          <div>
            <div className="stage-k">Synced everywhere</div>
            <div className="stage-v">No manual entry</div>
          </div>
          <div className="stage-step">04</div>
        </div>
        <div className="sync-chips">
          <span className="sync-chip"><Ic name="check" /> Added to HubSpot</span>
          <span className="sync-chip"><Ic name="check" /> Slack pinged</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const feats = [
    "Automatic lead enrichment from any company domain",
    "AI-written, personalized icebreakers",
    "Instant two-way CRM sync",
    "Real-time Slack notifications",
  ];
  const stats = [
    { v: 15, suffix: " min", lbl: "Saved per lead" },
    { v: 10, suffix: "×", lbl: "Faster outreach" },
    { v: 100, suffix: "%", lbl: "Hands-off" },
  ];
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <Reveal as="div">
            <span className="eyebrow"><Ic name="lightning" weight="fill" /> AI lead automation</span>
          </Reveal>
          <Reveal as="h1" delay={60}>
            <span className="fire-text">Ignite</span> your<br />sales pipeline
          </Reveal>
          <Reveal as="p" className="sub" delay={120}>
            Stop burning hours on manual research. Ignite enriches every lead, writes
            the first line for you, and syncs it all to your CRM — automatically.
          </Reveal>
          <Reveal as="ul" className="hero-feats" delay={160}>
            {feats.map((f, i) => (
              <li key={i}><span className="feat-check"><Ic name="check" weight="bold" /></span>{f}</li>
            ))}
          </Reveal>
          <Reveal className="hero-actions" delay={220}>
            <a className="btn btn-primary" href="#start"><Ic name="rocket-launch" weight="fill" /> Start automating free</a>
            <a className="btn btn-ghost" href="#how"><Ic name="play-circle" /> See how it works</a>
          </Reveal>
          <Reveal className="hero-trust" delay={260}>
            <span className="avatars"><span>JC</span><span>MR</span><span>AS</span><span>+</span></span>
            Trusted by 1,200+ revenue teams · no card required
          </Reveal>

          <Reveal className="stat-strip" delay={120}>
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat-val fire-text"><Counter end={s.v} suffix={s.suffix} /></div>
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

Object.assign(window, { Nav, Hero });
