const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Lectures",
      description: "Drop your MP3, MP4, or PDF files directly. We support over 50+ languages and study formats with ultra-fast upload processing speeds.",
      glowColor: "bg-primary shadow-[#c0c1ff]",
      borderClass: "border-primary/20",
      icon: "cloud_upload"
    },
    {
      number: "02",
      title: "AI Transcription",
      description: "High-precision automated speech-to-text turns spoken classroom words, slides, and recordings into searchable and fully organized text formats.",
      glowColor: "bg-secondary shadow-[#d0bcff]",
      borderClass: "border-secondary/20",
      icon: "hearing"
    },
    {
      number: "03",
      title: "Deep AI Extraction",
      description: "Our engineered academic LLMs automatically extract core concepts, mathematical formulas, timelines, definitions, and key study dates.",
      glowColor: "bg-tertiary shadow-[#4cd7f6]",
      borderClass: "border-tertiary/20",
      icon: "insights"
    }
  ];

  return (
    <section id="how-it-works" className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">How It Works</h2>
        <p className="text-secondary font-mono text-xs uppercase tracking-wider font-bold">From recording to genius in seconds</p>
      </div>

      <div className="relative pl-8 md:pl-16 space-y-12">
        {/* Timeline Path Line */}
        <div className="absolute left-3 md:left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-tertiary opacity-30" />

        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            
            {/* Pulsing Timeline Dot */}
            <div className={`absolute -left-[31px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full ${step.glowColor} shadow-[0_0_12px_4px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:scale-125 z-10`} />

            {/* Step Card */}
            <div className={`p-6 md:p-8 glass-card rounded-[2rem] border ${step.borderClass} text-left transition-all duration-300 hover:bg-[#151b2d]/40`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl text-tertiary">{step.icon}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>
                <span className="font-mono text-3xl font-bold text-outline opacity-25 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </span>
              </div>
              <p className="text-[#c7c4d7] text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
