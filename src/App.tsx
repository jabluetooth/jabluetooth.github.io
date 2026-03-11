import { HeroSection } from "./components/HeroSection";
import { LeadForm } from "./components/LeadForm";
import igniteLogo from "./components/image/IgniteLogo.png";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950">
      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <img
              src={igniteLogo}
              alt="Ignite Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-tight">
              Ignite
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <HeroSection />
          <LeadForm />
        </div>
      </main>
    </div>
  );
}

export default App;
