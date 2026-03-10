export function HeroSection() {
  const features = [
    "Automatic lead enrichment from company websites",
    "AI-generated personalized icebreakers",
    "Instant CRM integration",
    "Real-time Slack notifications",
    "Zero manual data entry",
  ];

  const stats = [
    { number: "15min", label: "Saved per lead" },
    { number: "10x", label: "Faster outreach" },
    { number: "100%", label: "Automated" },
  ];

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Transform Your Sales Process with AI
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8">
        Stop wasting hours on manual research. Let AI enrich your leads, generate
        personalized outreach, and sync everything to your CRM automatically.
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-base md:text-lg">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 text-sm font-bold shrink-0">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <span className="text-3xl md:text-4xl font-bold block">
              {stat.number}
            </span>
            <span className="text-sm opacity-90">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
