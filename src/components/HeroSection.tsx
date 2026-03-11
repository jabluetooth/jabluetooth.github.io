import { AnimatedCounter } from "./AnimatedCounter";

export function HeroSection() {
  const features = [
    "Automatic lead enrichment from company websites",
    "AI-generated personalized icebreakers",
    "Instant CRM integration",
    "Real-time Slack notifications",
    "Zero manual data entry",
  ];

  const stats = [
    { value: 15, suffix: "min", label: "Saved per lead" },
    { value: 10, suffix: "x", label: "Faster outreach" },
    { value: 100, suffix: "%", label: "Automated" },
  ];

  return (
    <div className="text-white pt-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent italic pr-1">Ignite</span> Your Sales Process
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8">
        Stop wasting hours on manual research. Let AI enrich your leads, generate
        personalized outreach, and sync everything to your CRM automatically.
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-base md:text-lg">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mr-3 text-sm font-bold shrink-0 text-white">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 gap-4 md:gap-6 mt-10 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <span className="text-3xl md:text-4xl font-bold block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                duration={2000}
              />
            </span>
            <span className="text-sm text-white/80">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
