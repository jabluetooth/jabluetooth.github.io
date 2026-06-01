import { useState, useEffect } from "react";
import igniteLogo from "./image/IgniteLogo.png";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Skip link — first focusable element, visible on keyboard focus */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="Ignite — go to top">
            <img src={igniteLogo} alt="" aria-hidden="true" />
            <span className="brand-name">Ignite</span>
          </a>

          <div className="nav-links" role="list">
            <a href="#how" role="listitem">How it works</a>
            <a href="#features" role="listitem">Features</a>
            <a href="#faq" role="listitem">FAQ</a>
          </div>

          <div className="nav-cta">
            <a className="btn btn-ghost btn-sm" href="#start">Sign in</a>
            <a className="btn btn-primary btn-sm" href="#start">Get started</a>
          </div>
        </div>
      </nav>
    </>
  );
}
