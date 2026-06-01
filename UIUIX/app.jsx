/* ============================================================================
   App root — composes every section
   ============================================================================ */
function App() {
  return (
    <>
      <div className="glow" style={{ top: "-120px", right: "-80px", width: "520px", height: "520px", background: "radial-gradient(circle, rgba(255,90,31,0.5), transparent 70%)" }} />
      <div className="glow" style={{ top: "1400px", left: "-160px", width: "480px", height: "480px", background: "radial-gradient(circle, rgba(255,59,30,0.32), transparent 70%)" }} />
      <EmberCanvas />
      <Nav />
      <Hero />
      <ProofBar />
      <HowItWorks />
      <Features />
      <FAQ />
      <FormSection />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
