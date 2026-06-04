const Features = () => {
  const featureList = [
    {
      title: "AI Lecture Notes",
      description: "Instant, structured outlines from any video or audio file with deep context.",
      icon: "auto_stories",
      colorClass: "text-primary border-primary/20",
      iconColor: "text-primary",
      bgOverlay: "group-hover:bg-primary/5"
    },
    {
      title: "Smart Quiz",
      description: "Personalized dynamic questions generated based on your weak points.",
      icon: "quiz",
      colorClass: "text-secondary border-secondary/20",
      iconColor: "text-secondary",
      bgOverlay: "group-hover:bg-secondary/5"
    },
    {
      title: "Summarizer",
      description: "Condense hours of lectures into 5-minute essential reads with ease.",
      icon: "summarize",
      colorClass: "text-tertiary border-tertiary/20",
      iconColor: "text-tertiary",
      bgOverlay: "group-hover:bg-tertiary/5"
    }
  ];

  return (
    <section id="features" className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Genius Features</h2>
        <p className="text-tertiary font-mono text-xs uppercase tracking-wider font-bold">Engineered for focus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureList.map((feature, idx) => (
          <div 
            key={idx} 
            className={`p-8 glass-card rounded-[2rem] border ${feature.colorClass} relative group cursor-pointer transition-all duration-300 hover:-translate-y-2`}
          >
            {/* Hover Background Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 ${feature.bgOverlay}`} />
            
            <div className="flex flex-col h-full justify-between items-start">
              <div>
                <span 
                  className={`material-symbols-outlined text-5xl mb-6 inline-block ${feature.iconColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {feature.icon}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#c7c4d7] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Action indicators */}
              <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-outline group-hover:text-white transition-colors">
                <span>Learn More</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;