import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Typing loop effect state
  const phrases = ["AI Notes", "Smart Quiz", "Lecture Summary", "Study Assistant"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Stat Counters progressive growth on mount
  const [quizScore, setQuizScore] = useState(0);
  const [keyTopics, setKeyTopics] = useState(0);
  const [aiNotes, setAiNotes] = useState(0);
  const [students, setStudents] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      
      setQuizScore(Math.floor(progress * 98));
      setKeyTopics(Math.floor(progress * 14));
      setAiNotes(Math.floor(progress * 10000));
      setStudents(Math.floor(progress * 5000));
      setAccuracy(Math.floor(progress * 98));

      if (step >= totalSteps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c1324]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo SVG */}
          <svg className="h-8 w-8 text-primary" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="180 40" />
            <path d="M35 50L45 60L65 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="15" fill="currentColor" className="animate-pulse" />
          </svg>
          <span className="font-sans text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary">
            IntelliLearn AI
          </span>
        </div>
        
        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[#c7c4d7] hover:text-white transition-colors text-sm font-medium tracking-wide">Features</a>
          <a href="#how-it-works" className="text-[#c7c4d7] hover:text-white transition-colors text-sm font-medium tracking-wide">How It Works</a>
          <a href="#upload-demo" className="text-[#c7c4d7] hover:text-white transition-colors text-sm font-medium tracking-wide">Try It</a>
          <Link to="/login" className="px-5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-semibold tracking-wide transition-all">Sign In</Link>
        </div>

        <button 
          className="material-symbols-outlined text-primary p-2 active:scale-95 transition-transform cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          menu
        </button>
      </nav>

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed left-0 top-0 h-full w-[280px] z-[60] transition-transform duration-300 bg-[#151b2d]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col p-6 shadow-[20px_0_50px_rgba(0,0,0,0.5)] ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-primary text-xl font-bold">Navigation</span>
          <button 
            className="material-symbols-outlined text-[#c7c4d7] cursor-pointer hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            close
          </button>
        </div>
        <div className="space-y-3 flex-grow">
          <a 
            href="#" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#571bc1]/30 text-[#c4abff] border-l-4 border-secondary"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-mono text-xs uppercase tracking-wider">Dashboard</span>
          </a>
          <a 
            href="#features" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl text-[#c7c4d7] hover:bg-white/5 transition-all hover:translate-x-1"
          >
            <span className="material-symbols-outlined">auto_stories</span>
            <span className="font-mono text-xs uppercase tracking-wider">Features</span>
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl text-[#c7c4d7] hover:bg-white/5 transition-all hover:translate-x-1"
          >
            <span className="material-symbols-outlined">psychology</span>
            <span className="font-mono text-xs uppercase tracking-wider">AI Pipeline</span>
          </a>
          <a 
            href="#upload-demo" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl text-[#c7c4d7] hover:bg-white/5 transition-all hover:translate-x-1"
          >
            <span className="material-symbols-outlined">cloud_upload</span>
            <span className="font-mono text-xs uppercase tracking-wider">Engine Demo</span>
          </a>
        </div>
        <div className="pt-6 border-t border-white/5">
          <Link 
            to="/login"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full block text-center py-4 bg-gradient-to-r from-primary to-secondary text-[#0d0096] font-bold rounded-xl active:scale-95 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/20"
          >
            Get Started
          </Link>
        </div>
      </aside>

      {/* Main Hero Container */}
      <section className="pt-32 pb-16 flex flex-col items-center text-center space-y-8 relative px-4 max-w-4xl mx-auto">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] -z-10 pointer-events-none"></div>
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-[#c0c1ff]/20 text-primary font-mono text-xs uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          AI-Powered Study Revolution
        </div>

        {/* Dynamic Headers */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Transform Lectures Into <span className="gradient-text">Smart Study Material</span> Using AI
        </h1>
        
        <p className="text-lg md:text-xl text-[#c7c4d7] max-w-xl min-h-[56px] leading-relaxed">
          Revolutionize your learning. Automatically generate{' '}
          <span className="typing-container text-tertiary font-mono font-bold" id="typing-text">
            {displayText}
          </span>{' '}
          from your recordings.
        </p>

        {/* Buttons CTA */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center pt-2">
          <Link 
            to="/login" 
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-[#0d0096] font-bold rounded-2xl shadow-[0_0_30px_rgba(73,75,214,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-indigo-500/50"
          >
            <span className="material-symbols-outlined">bolt</span>
            Get Started Free
          </Link>
          <a 
            href="#upload-demo" 
            className="px-8 py-4 glass-card text-white font-semibold rounded-2xl active:scale-95 transition-all border-white/20 flex items-center justify-center gap-2 hover:bg-white/5"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Upload Lecture
          </a>
        </div>

        {/* Dashboard Preview Visual */}
        <div className="relative w-full max-w-lg mt-12 pt-8 floating-dashboard">
          <div className="glass-card rounded-[2rem] aspect-[4/5] sm:aspect-[1.3/1] overflow-hidden p-6 relative border-t-white/20 border-l-white/20 shadow-2xl flex flex-col justify-between">
            
            {/* Mock Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <div className="material-symbols-outlined text-[#908fa0] text-sm">more_horiz</div>
            </div>

            {/* Note block preview */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#191f31]/50 border border-white/5 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-tertiary tracking-wider font-bold">Recent Note</span>
                  <span className="text-xs text-[#908fa0]">2m ago</span>
                </div>
                <div className="h-2 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-white/10 rounded"></div>
              </div>

              {/* Pulsing AI Orb visual in center */}
              <div className="relative py-6 flex justify-center">
                <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center ai-glow border-primary/40 orb-pulse">
                  <span className="material-symbols-outlined text-4xl text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    psychology
                  </span>
                </div>
              </div>

              {/* Grid indicators with counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 glass-card rounded-2xl text-left border-white/5">
                  <span className="text-2xl md:text-3xl font-bold text-secondary font-mono">{quizScore}%</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#908fa0] mt-1">Quiz Score</p>
                </div>
                <div className="p-4 glass-card rounded-2xl text-left border-tertiary/20">
                  <span className="text-2xl md:text-3xl font-bold text-tertiary font-mono">{keyTopics}</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#908fa0] mt-1">Key Topics</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section Wrapper (Directly after Hero) */}
      <section className="max-w-4xl mx-auto px-4 pb-16 grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 glass-card rounded-3xl text-center space-y-1">
          <h3 className="text-3xl font-bold text-primary font-mono">
            {aiNotes >= 1000 ? `${(aiNotes / 1000).toFixed(1)}K+` : aiNotes}
          </h3>
          <p className="font-mono text-xs uppercase text-[#908fa0] tracking-wider">AI Notes</p>
        </div>
        <div className="p-6 glass-card rounded-3xl text-center space-y-1">
          <h3 className="text-3xl font-bold text-secondary font-mono">
            {students >= 1000 ? `${(students / 1000).toFixed(1)}K+` : students}
          </h3>
          <p className="font-mono text-xs uppercase text-[#908fa0] tracking-wider">Students</p>
        </div>
        <div className="col-span-2 md:col-span-1 p-6 glass-card rounded-3xl text-center flex items-center justify-between md:justify-center md:flex-col md:gap-2 border-tertiary/20">
          <div className="text-left md:text-center">
            <h3 className="text-3xl font-bold text-tertiary font-mono">{accuracy}%</h3>
            <p className="font-mono text-xs uppercase text-[#908fa0] tracking-wider">Accuracy Rate</p>
          </div>
          {/* Sparkline mini chart bar animations */}
          <div className="w-24 h-10 flex items-end gap-1.5 justify-end md:justify-center">
            <div className="flex-1 bg-tertiary/20 rounded-t-sm transition-all duration-1000" style={{ height: '40%' }}></div>
            <div className="flex-1 bg-tertiary/40 rounded-t-sm transition-all duration-1000" style={{ height: '60%' }}></div>
            <div className="flex-1 bg-tertiary/60 rounded-t-sm transition-all duration-1000" style={{ height: '85%' }}></div>
            <div className="flex-1 bg-tertiary rounded-t-sm transition-all duration-1000 animate-pulse" style={{ height: '100%' }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;