import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  const [hoveredBar, setHoveredBar] = useState(null);

  // Simulated data for engagement and stress levels
  const weeklyData = [
    { day: 'Mon', engagement: 60, stress: 30 },
    { day: 'Tue', engagement: 75, stress: 25 },
    { day: 'Wed', engagement: 80, stress: 45 },
    { day: 'Thu', engagement: 55, stress: 60 },
    { day: 'Fri', engagement: 90, stress: 40 },
    { day: 'Sat', engagement: 40, stress: 15 },
    { day: 'Sun', engagement: 35, stress: 20 },
  ];

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#dce1fb] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Ambient Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d0bcff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#4cd7f6]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full bg-[#0c1324]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center h-16 px-6 md:px-12 z-50">
        <Link to="/" className="flex items-center gap-2">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="180 40" />
            <path d="M35 50L45 60L65 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="15" fill="currentColor" />
          </svg>
          <span className="font-sans text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary">
            IntelliLearn AI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-[#c7c4d7] hover:text-white">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold hover:text-white transition-colors text-[#c7c4d7]">
            <span className="material-symbols-outlined">account_circle</span> Profile
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-28 px-6 md:px-12 max-w-[1280px] mx-auto w-full flex-grow flex flex-col gap-8">
        
        {/* Welcome & Resume Study Action */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back, Student</h2>
            <p className="text-sm text-[#c7c4d7]">You're making excellent progress this week. Keep up the cognitive momentum!</p>
          </div>
          <Link 
            to="/learning"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-[#0d0096] font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(73,75,214,0.3)] hover:shadow-indigo-500/40 active:scale-95 transition-all text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">play_circle</span>
            Resume Lecture Study
          </Link>
        </section>

        {/* Bento Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          
          {/* Card 1: Overall progress */}
          <div className="md:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#d0bcff]/10 border border-[#d0bcff]/20 rounded-xl text-secondary">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">Weekly Target</span>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#908fa0] uppercase tracking-wider font-mono mb-1">Overall Progress</h3>
              <p className="text-4xl font-bold text-white font-mono">75%</p>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary to-[#c0c1ff] w-[75%] rounded-full"></div>
              </div>
              <p className="text-xs text-[#908fa0]">4 of 6 active modules fully completed</p>
            </div>
          </div>

          {/* Card 2: Emotion & Stress dynamic graph */}
          <div className="md:col-span-8 glass-card rounded-3xl p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Cognitive & Emotion Trends</h3>
                <p className="text-xs text-[#908fa0]">Real-time feedback loop from webcam scan models</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  Engagement
                </span>
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Stress Markers
                </span>
              </div>
            </div>

            {/* Simulated interactive charts */}
            <div className="relative h-32 w-full flex items-end justify-between px-2 pt-4 border-b border-white/5">
              {weeklyData.map((data, index) => (
                <div 
                  key={data.day}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex flex-col items-center justify-end h-full w-12 cursor-pointer transition-transform duration-200"
                  style={{ transform: hoveredBar === index ? 'translateY(-4px)' : 'none' }}
                >
                  <div className="flex gap-1 w-full justify-center items-end h-full">
                    {/* Stress Bar */}
                    <div 
                      className="w-2 bg-primary rounded-t-sm transition-all"
                      style={{ height: `${data.stress}%` }}
                    />
                    {/* Engagement Bar */}
                    <div 
                      className="w-2 bg-secondary rounded-t-sm transition-all"
                      style={{ height: `${data.engagement}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#908fa0] mt-2">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Recent Lectures list */}
          <div className="md:col-span-7 glass-card rounded-3xl p-6 flex flex-col justify-between gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Recent Lectures</h3>
              <Link to="/processing" className="text-xs font-semibold text-secondary hover:underline flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">cloud_upload</span> Upload Lecture
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Lecture Item 1 */}
              <Link to="/learning" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0c1324]/30 border border-white/5 hover:border-secondary/30 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Advanced Neural Architectures</h4>
                    <p className="text-[11px] text-[#908fa0]">Dr. Sarah Chen • 45 mins</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-[9px] font-bold uppercase tracking-wider">
                    Transcribed
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[9px] font-bold uppercase tracking-wider">
                    Summarized
                  </span>
                </div>
              </Link>

              {/* Lecture Item 2 */}
              <Link to="/learning" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0c1324]/30 border border-white/5 hover:border-secondary/30 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">database</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Big Data Ethics and Policy</h4>
                    <p className="text-[11px] text-[#908fa0]">Prof. James Miller • 62 mins</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-[9px] font-bold uppercase tracking-wider">
                    Transcribed
                  </span>
                </div>
              </Link>

              {/* Lecture Item 3 */}
              <Link to="/processing" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0c1324]/30 border border-white/5 hover:border-secondary/30 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">science</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Introduction to Quantum ML</h4>
                    <p className="text-[11px] text-[#908fa0]">Dr. Elena Rodriguez • 38 mins</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#908fa0] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#908fa0] animate-pulse"></span>
                    Processing...
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Card 4: Quiz performance */}
          <div className="md:col-span-5 glass-card rounded-3xl p-6 flex flex-col justify-between items-center min-h-[300px]">
            <h3 className="text-xs font-semibold text-[#908fa0] uppercase tracking-wider font-mono mb-2 self-start">Quiz Performance</h3>
            
            {/* SVG Pie Chart */}
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                {/* Incorrect segment: 20% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8083ff" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="0" />
                {/* Correct segment: 80% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#d0bcff" strokeWidth="4" strokeDasharray="80 100" strokeDashoffset="-20" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white font-mono">80%</span>
                <span className="text-[9px] text-[#908fa0] uppercase font-bold tracking-widest font-mono">Accuracy</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/5">
              <div className="text-center">
                <p className="text-xl font-bold text-secondary font-mono">164</p>
                <p className="text-[10px] text-[#908fa0] font-mono">Correct Ans</p>
              </div>
              <div className="text-center border-l border-white/5">
                <p className="text-xl font-bold text-primary font-mono">41</p>
                <p className="text-[10px] text-[#908fa0] font-mono">Incorrect Ans</p>
              </div>
            </div>
          </div>

        </div>

        {/* AI Insight banner overlay */}
        <section className="glass-card rounded-3xl p-6 border-secondary/30 border-l-4 border-l-secondary ai-glow overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[50px] pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg">
                <span className="material-symbols-outlined text-secondary text-2xl">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">AI Study Recommendation</h4>
                <p className="text-sm text-[#c7c4d7] max-w-2xl leading-relaxed mt-0.5">
                  Your attention peaks during code-oriented lecture topics but dips during historical overviews. Based on your active stress peaks during the Quantum ML class, we highly recommend a 5-minute break before resume studying.
                </p>
              </div>
            </div>
            <button className="border border-secondary/30 hover:border-secondary hover:bg-secondary/10 text-secondary px-6 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer whitespace-nowrap active:scale-95">
              Optimize Schedule
            </button>
          </div>
        </section>

      </main>

      {/* Floating Bottom Navigator for quick access */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0c1324]/85 backdrop-blur-xl border-t border-white/10 shadow-2xl h-20 flex justify-around items-center z-50">
        <Link 
          to="/dashboard" 
          className="flex flex-col items-center justify-center text-secondary bg-white/5 border border-white/10 px-6 py-1.5 rounded-2xl active:scale-95 transition-all text-xs font-bold"
        >
          <span className="material-symbols-outlined text-lg">dashboard</span>
          Dashboard
        </Link>
        <Link 
          to="/learning" 
          className="flex flex-col items-center justify-center text-[#c7c4d7] hover:text-white active:scale-95 transition-all text-xs font-semibold"
        >
          <span className="material-symbols-outlined text-lg">menu_book</span>
          Study Room
        </Link>
        <Link 
          to="/processing" 
          className="flex flex-col items-center justify-center text-[#c7c4d7] hover:text-white active:scale-95 transition-all text-xs font-semibold"
        >
          <span className="material-symbols-outlined text-lg">cloud_upload</span>
          Lecture Engine
        </Link>
      </nav>

    </div>
  );
};

export default DashboardPreview;