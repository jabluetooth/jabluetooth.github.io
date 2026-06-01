import { useState, useEffect, useRef } from "react";
import { Ic } from "./Ic";

const ICEBREAKER = "Saw Northwind just opened a Cebu hub — scaling the SDR team to match?";

// Stage durations (ms)
const STAGE_DUR = 1500;
const ICEBREAKER_HOLD = 2300; // longer pause while "AI writes"
const RESET_HOLD = 2600;      // hold at full-complete before looping

export function Pipeline() {
  const [stage, setStage] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Mutable counter lives only inside this effect — no closure staleness risk
    let s = 0;

    const next = () => {
      s += 1;
      if (s > 3) {
        // Brief hold on fully-complete state, then restart
        timer.current = setTimeout(() => {
          s = 0;
          setStage(0);
          timer.current = setTimeout(next, STAGE_DUR);
        }, RESET_HOLD);
        return;
      }
      setStage(s);
      timer.current = setTimeout(next, s === 2 ? ICEBREAKER_HOLD : STAGE_DUR);
    };

    timer.current = setTimeout(next, STAGE_DUR);
    return () => clearTimeout(timer.current);
  }, []);

  const on = (n: number) => (stage >= n ? " active" : "");

  return (
    <div className="pipeline">
      <div className="pl-bar">
        <span className="pl-dot" />
        <span className="pl-dot" />
        <span className="pl-dot" />
        <span className="pl-title">
          <span className="pl-live" aria-hidden="true" /> Live · auto-pilot
        </span>
      </div>

      {/* Stage 0 — new lead */}
      <div className={`stage${on(0)}`} aria-label="Stage 1: New lead">
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
      <div className={`stage${on(1)}`} aria-label="Stage 2: Enriched">
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
        <div className="scanline" aria-hidden="true" />
      </div>

      {/* Stage 2 — AI icebreaker (cursor = "AI thinking") */}
      <div className={`stage${on(2)}`} aria-label="Stage 3: AI icebreaker">
        <div className="stage-head">
          <div className="stage-ic"><Ic name="chat-teardrop-text" /></div>
          <div>
            <div className="stage-k">AI icebreaker</div>
            <div className="stage-v">Personalized opener</div>
          </div>
          <div className="stage-step">03</div>
        </div>
        <div className="icebreaker" aria-live="polite">
          {stage === 2 && <span className="cursor" aria-hidden="true" />}
          {stage >= 3 && ICEBREAKER}
        </div>
      </div>

      {/* Stage 3 — sync */}
      <div className={`stage${on(3)}`} aria-label="Stage 4: Synced everywhere">
        <div className="stage-head">
          <div className="stage-ic"><Ic name="check-circle" /></div>
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
