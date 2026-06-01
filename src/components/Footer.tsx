import igniteLogo from "./image/IgniteLogo.png";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <a className="brand" href="#top">
          <img src={igniteLogo} alt="Ignite" />
          <span className="brand-name">Ignite</span>
        </a>
        <div className="footer-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="#start">Get started</a>
        </div>
        <small>© {new Date().getFullYear()} Ignite. All rights reserved.</small>
      </div>
    </footer>
  );
}
