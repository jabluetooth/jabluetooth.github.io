import { Reveal } from "./Reveal";
import { Ic } from "./Ic";

const LOGOS = [
  { i: "buildings",             n: "Northwind" },
  { i: "rocket",                n: "Apex"      },
  { i: "globe-hemisphere-west", n: "Meridian"  },
  { i: "cube",                  n: "Cobalt"    },
  { i: "lightning",             n: "Voltage"   },
];

export function ProofBar() {
  return (
    <section className="section" style={{ paddingBlock: "56px" }}>
      <div className="wrap">
        <Reveal>
          <div className="proof-label">Powering outbound for fast-growing revenue teams</div>
          <div className="logos">
            {LOGOS.map((l, i) => (
              <div className="logo-item" key={i}>
                <Ic name={l.i} /> {l.n}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
