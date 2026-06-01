import { ErrorBoundary } from "./components/ErrorBoundary";
import { EmberCanvas } from "./components/EmberCanvas";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProofBar } from "./components/ProofBar";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { FormSection } from "./components/FormSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ErrorBoundary>
      {/* Ambient fire glows — position: fixed, pointer-events: none */}
      <div
        className="glow"
        style={{
          top: "-120px", right: "-80px",
          width: "520px", height: "520px",
          background: "radial-gradient(circle, rgba(255,90,31,0.5), transparent 70%)",
        }}
      />
      <div
        className="glow"
        style={{
          top: "1400px", left: "-160px",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(255,59,30,0.32), transparent 70%)",
        }}
      />

      <EmberCanvas />
      <Nav />

      <main id="main-content">
        <Hero />
        <ProofBar />
        <HowItWorks />
        <Features />
        <FAQ />
        <FormSection />
      </main>

      <Footer />
    </ErrorBoundary>
  );
}

export default App;
