import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LectureProcessing = () => {
  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSummary, setIsAutoSummary] = useState(true);
  
  // Processing Queue Status simulation
  const [queue, setQueue] = useState([
    {
      id: 1,
      name: 'CS50_Lecture_01.mp4',
      type: 'video',
      status: 'Transcribing with Whisper AI...',
      progress: 45,
      completed: false
    },
    {
      id: 2,
      name: 'Advanced_Calculus_Seminar.mp3',
      type: 'audio',
      status: 'Generating Smart Notes...',
      progress: 88,
      completed: false
    }
  ]);

  // Live Keywords state
  const [keywords, setKeywords] = useState([
    'Binary Search',
    'Recursion',
    'Big O Notation',
  ]);

  const [detectingState, setDetectingState] = useState(true);

  // Live Transcripts stream mock state
  const [transcripts, setTranscripts] = useState([
    {
      time: '00:12',
      content: "Good morning everyone. Today we're diving deep into the foundations of computer science. We'll start with how data is actually represented at the most fundamental level — binary."
    },
    {
      time: '00:45',
      content: "Imagine a light switch. It can be in one of two states: ON or OFF. This is essentially what a bit is. Eight of these bits grouped together form what we call a byte."
    }
  ]);

  // Handle Drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle Drag Leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle Drop File Simulation
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Add simulated uploaded file
    const newFile = {
      id: Date.now(),
      name: 'Deep_Learning_Intro.mp4',
      type: 'video',
      status: 'Uploading file to server...',
      progress: 10,
      completed: false
    };

    setQueue((prev) => [newFile, ...prev]);
  };

  // Simulate progress increases
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prevQueue) => 
        prevQueue.map((item) => {
          if (item.progress >= 100) {
            if (!item.completed) {
              return {
                ...item,
                status: 'Completed successfully',
                progress: 100,
                completed: true
              };
            }
            return item;
          }

          // Random increment
          const increment = Math.floor(Math.random() * 8) + 4;
          const nextProgress = Math.min(item.progress + increment, 100);
          
          let nextStatus = item.status;
          if (item.id === 1) {
            if (nextProgress > 75) {
              nextStatus = 'Summarizing lecture core concepts...';
            } else if (nextProgress > 50) {
              nextStatus = 'Aligning timestamp matrices...';
            }
          } else if (item.id === 2) {
            if (nextProgress > 95) {
              nextStatus = 'Finalizing index summaries...';
            }
          } else {
            // Simulated upload files
            if (nextProgress > 80) {
              nextStatus = 'Queued for STT audio processing...';
            } else if (nextProgress > 40) {
              nextStatus = 'Hashing checksum nodes...';
            } else {
              nextStatus = 'Extracting audio channels...';
            }
          }

          return {
            ...item,
            progress: nextProgress,
            status: nextStatus
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate streaming new transcribing nodes and keywords
  useEffect(() => {
    const extraKeywords = ['Abstraction', 'Time Complexity', 'Space Complexity', 'Graph Algorithms'];
    const extraTranscripts = [
      {
        time: '01:22',
        content: 'Now, when we talk about Big O notation later in this lecture, remember this base concept of binary representation, because it impacts how we measure storage array spaces.',
        isInsight: true,
        insightTitle: 'AI INSIGHT: CORE CONCEPT',
        insightText: 'The instructor is introducing the concept of abstraction, moving from physical hardware (switches) to logical data (bits).'
      },
      {
        time: '02:05',
        content: 'For instance, an algorithm that requires examining every element in an array has a linear time complexity, denoted as O(n). If it splits the array in half each time, it is logarithmic, O(log n).'
      }
    ];

    let kwCount = 0;
    let trCount = 0;

    const interval = setInterval(() => {
      // Add keywords
      if (kwCount < extraKeywords.length) {
        setKeywords((prev) => {
          if (!prev.includes(extraKeywords[kwCount])) {
            return [...prev, extraKeywords[kwCount]];
          }
          return prev;
        });
        kwCount++;
      } else {
        setDetectingState(false);
      }

      // Add transcription paragraphs
      if (trCount < extraTranscripts.length) {
        setTranscripts((prev) => [...prev, extraTranscripts[trCount]]);
        trCount++;
      }

    }, 11000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#dce1fb] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Ambient Sparks */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d0bcff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#4cd7f6]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Header Navigation */}
      <header className="fixed top-0 w-full bg-[#0c1324]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center h-16 px-6 md:px-12 z-50">
        <Link to="/dashboard" className="flex items-center gap-2">
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
          </button>
          <Link to="/login" className="flex items-center gap-1 text-sm font-semibold hover:text-white transition-colors text-[#c7c4d7]">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      {/* Core Body Container */}
      <main className="pt-20 pb-28 px-4 md:px-8 max-w-[1280px] mx-auto w-full flex-grow flex flex-col gap-8">
        
        {/* Banner Section */}
        <section>
          <h2 className="text-3xl font-bold text-white tracking-tight">Lecture Processing Pipeline</h2>
          <p className="text-sm text-[#908fa0]">Convert class recordings into fully interactive, hyper-timestamped AI study modules</p>
        </section>

        {/* Dual Column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Upload Dropzone & Running Queue */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Drag & Drop Filebox */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col gap-5 justify-between min-h-[300px]">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Upload Lecture Video / Audio</h3>
                <p className="text-xs text-[#908fa0]">Supported formats: .mp4, .mp3, .wav, .m4a (Up to 500MB)</p>
              </div>

              {/* Upload Drop Zone Box */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? 'border-secondary bg-secondary/10 scale-[0.98]' 
                    : 'border-white/10 hover:border-secondary/40 bg-white/5'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-4 animate-[pulse_2s_infinite]">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-0.5">Drag & drop files here</h4>
                <p className="text-[11px] text-[#908fa0] mb-4">or click to browse local files</p>
                <button className="bg-primary hover:bg-[#c0c1ff] text-[#0d0096] font-bold px-5 py-2.5 rounded-xl text-xs active:scale-95 transition-all shadow-[0_0_15px_rgba(73,75,214,0.2)]">
                  Browse Files
                </button>
              </div>

              {/* Auto Summary Option bar */}
              <div className="flex items-center justify-between p-3.5 bg-[#0c1324]/30 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-secondary">settings_suggest</span>
                  <div>
                    <h4 className="text-xs font-semibold">Auto-generate Smart Notes</h4>
                    <p className="text-[9px] text-[#908fa0]">Whisper / LLM summaries combined</p>
                  </div>
                </div>
                
                {/* Toggle switch */}
                <button 
                  onClick={() => setIsAutoSummary(!isAutoSummary)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex ${
                    isAutoSummary ? 'bg-secondary justify-end' : 'bg-white/10 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-[#020617] rounded-full"></span>
                </button>
              </div>

            </div>

            {/* Live Queue Cards */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                  Processing Pipeline
                </h3>
                <span className="text-[10px] font-mono font-bold bg-primary/20 text-[#c0c1ff] px-2.5 py-0.5 rounded-full border border-primary/25">
                  {queue.length} Tasks Active
                </span>
              </div>

              <div className="flex flex-col gap-3.5 mt-4">
                <AnimatePresence>
                  {queue.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-[#0c1324]/30 border border-white/5 flex flex-col gap-3 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-secondary text-lg">
                            {item.type === 'video' ? 'movie' : 'audio_file'}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.name}</h4>
                            <p className="text-[10px] text-secondary flex items-center gap-1.5 mt-0.5">
                              {!item.completed && <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span>}
                              {item.status}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">{item.progress}%</span>
                      </div>

                      {/* Progress slider bar */}
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                            item.completed 
                              ? 'from-[#009d6c] to-[#00faad]' 
                              : 'from-secondary to-[#c0c1ff]'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

          </section>

          {/* Right Column: Live Extraction Preview Console */}
          <section className="lg:col-span-7 flex flex-col">
            
            <div className="glass-card rounded-3xl border border-white/10 flex-grow flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Box Top Header */}
              <div className="p-5 border-b border-white/5 bg-[#0c1324]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live AI Extraction Terminal</h3>
                    <p className="text-[10px] text-[#908fa0]">Previewing live: CS50_Lecture_01.mp4</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-[#c7c4d7] hover:text-white cursor-pointer active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-lg">fullscreen</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-[#c7c4d7] hover:text-white cursor-pointer active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-lg">download</span>
                  </button>
                </div>
              </div>

              {/* Extraction Content */}
              <div className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto max-h-[500px]">
                
                {/* Keywords tracker */}
                <div>
                  <h4 className="text-[10px] font-bold text-[#908fa0] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs text-secondary font-bold">stars</span>
                    Extracted Semantic Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {keywords.map((kw) => (
                        <motion.span 
                          key={kw}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-secondary/15 border border-secondary/25 text-secondary shadow-[0_0_10px_rgba(208,188,255,0.05)] cursor-pointer hover:bg-secondary/25 transition-colors"
                        >
                          {kw}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    
                    {detectingState && (
                      <span className="px-3.5 py-1.5 border border-dashed border-white/10 rounded-full text-xs text-[#908fa0] flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-1.5 bg-[#4cd7f6] rounded-full animate-ping"></span>
                        Scanning feed...
                      </span>
                    )}
                  </div>
                </div>

                {/* Transcribing streaming feed block */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                  <h4 className="text-[10px] font-bold text-[#908fa0] uppercase tracking-wider mb-3">Live Streaming Transcript</h4>
                  
                  <div className="flex flex-col gap-4">
                    {transcripts.map((tr, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded mt-0.5">
                          {tr.time}
                        </span>
                        
                        <div className="flex-grow flex flex-col gap-2.5">
                          <p className="text-xs text-[#dce1fb] leading-relaxed">
                            {tr.content}
                          </p>

                          {/* Inline AI Concept insights */}
                          {tr.isInsight && (
                            <div className="p-3.5 rounded-xl bg-secondary/5 border-l-4 border-secondary border-secondary/20 flex flex-col gap-1">
                              <h5 className="text-[9px] font-bold tracking-wider text-secondary uppercase flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">lightbulb</span>
                                {tr.insightTitle}
                              </h5>
                              <p className="text-[10px] text-[#c7c4d7] italic leading-normal">
                                {tr.insightText}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Placeholder Shimmering Line */}
                    <div className="flex gap-4 items-start opacity-45 select-none animate-pulse">
                      <span className="w-10 h-4 bg-white/5 rounded"></span>
                      <div className="flex-grow flex flex-col gap-1.5 pt-1">
                        <div className="h-3 bg-white/5 rounded w-full"></div>
                        <div className="h-3 bg-white/5 rounded w-3/4"></div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Console buttons bar */}
              <div className="p-5 border-t border-white/5 bg-[#0c1324]/30 flex justify-end gap-3">
                <button className="px-5 py-2.5 text-secondary font-bold border border-secondary/30 hover:border-secondary hover:bg-secondary/10 rounded-xl text-xs transition-all active:scale-95 cursor-pointer">
                  Export Text Transcript
                </button>
                <Link 
                  to="/learning"
                  className="px-5 py-2.5 bg-gradient-to-r from-secondary to-[#c0c1ff] hover:shadow-indigo-500/10 text-[#0d0096] font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Review Smart Notes
                </Link>
              </div>

            </div>

          </section>

        </div>

        {/* Floating featured card info */}
        <section className="relative rounded-3xl overflow-hidden h-72 border border-white/10 shadow-2xl group cursor-pointer">
          <div className="absolute inset-0 bg-[#0c1324]/90 z-0"></div>
          {/* Glowing backdrop circle */}
          <div className="absolute top-[-50%] right-[-10%] w-[380px] h-[380px] bg-secondary/5 rounded-full blur-[70px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 bg-gradient-to-t from-[#020617] via-transparent to-transparent">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-secondary/15 border border-secondary/25 text-secondary rounded-full text-[9px] font-bold mb-3 uppercase tracking-widest font-mono">
                Smart Spaced Repetition
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-secondary transition-colors">
                Connected Study Workspace
              </h2>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                Connect your lecture processing pipeline to our flashcard simulator. IntelliLearn AI automatically creates customized active recall flashcards matching all keywords, tags, and AI insights detected in your transcribes.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Bottom Navigator for quick access */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0c1324]/85 backdrop-blur-xl border-t border-white/10 shadow-2xl h-20 flex justify-around items-center z-50">
        <Link 
          to="/dashboard" 
          className="flex flex-col items-center justify-center text-[#c7c4d7] hover:text-white active:scale-95 transition-all text-xs font-semibold"
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
          className="flex flex-col items-center justify-center text-secondary bg-white/5 border border-white/10 px-6 py-1.5 rounded-2xl active:scale-95 transition-all text-xs font-bold"
        >
          <span className="material-symbols-outlined text-lg">cloud_upload</span>
          Lecture Engine
        </Link>
      </nav>

    </div>
  );
};

export default LectureProcessing;
