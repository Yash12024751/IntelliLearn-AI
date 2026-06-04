import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdaptiveLearningView = () => {
  // Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(765); // 12:45 in seconds
  const totalDuration = 2700; // 45:00 in seconds

  // Emotion AI States
  const [focusState, setFocusState] = useState('High');
  const [focusProgress, setFocusProgress] = useState(88);
  const [webcamActive, setWebcamActive] = useState(true);

  // AI Suggestion States
  const [showAiAlert, setShowAiAlert] = useState(true);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  // Quiz States
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState('');

  // Live Transcribing States
  const [transcripts, setTranscripts] = useState([
    {
      time: '08:12',
      timeSec: 492,
      title: 'Core Mechanism: Transformers',
      content: 'The Attention Mechanism allows the model to focus on specific parts of the input sequence when producing an output, effectively handling long-range dependencies.',
      tags: ['NeuralNetworks', 'Attention', 'NLP']
    }
  ]);
  
  const liveSentences = [
    "By splitting the queries, keys, and values into multiple heads, the model can look at the same sequence from different perspective viewpoints.",
    "This allows the network to simultaneously capture both short-range grammatical relations and long-range semantic dependencies.",
    "For example, in 'The animal didn't cross the street because it was too tired', 'it' refers to the animal. A specific attention head learns this mapping.",
    "In contrast, in 'because it was too wide', 'it' refers to the street. Another attention head captures this spatial dependency.",
    "This parallel representation power is what makes Multi-Head Attention significantly superior to standard single-head attention mechanism."
  ];
  
  const [currentLiveText, setCurrentLiveText] = useState("Capturing current lecture audio... Real-time transcription active.");
  const [sentenceIndex, setSentenceIndex] = useState(0);

  // Format time (seconds -> MM:SS)
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video Time Ticker Effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Emotion AI Dynamics Simulation
  useEffect(() => {
    const states = [
      { status: 'High', progress: 92 },
      { status: 'High', progress: 87 },
      { status: 'Neutral', progress: 68 },
      { status: 'High', progress: 85 },
      { status: 'Neutral', progress: 74 },
      { status: 'Processing...', progress: 78 }
    ];

    const interval = setInterval(() => {
      if (isPlaying) {
        const randomState = states[Math.floor(Math.random() * states.length)];
        setFocusState(randomState.status);
        setFocusProgress(randomState.progress);
        
        // Trigger AI Confusion Alert if focus drops
        if (randomState.status === 'Neutral' && randomState.progress < 70) {
          setShowAiAlert(true);
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Live Transcription Ticker Simulation
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSentenceIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % liveSentences.length;
          setCurrentLiveText(liveSentences[prevIndex]);
          
          // Append finished sentence to static transcript notes
          const nowStr = formatTime(currentTime);
          setTranscripts((prevTranscripts) => {
            // Only keep last 3 transcripts to avoid clutter
            const updated = [
              ...prevTranscripts,
              {
                time: nowStr,
                timeSec: currentTime,
                title: nextIndex % 2 === 0 ? 'Multi-Head Projection' : 'Contextual Embeddings',
                content: liveSentences[prevIndex],
                tags: nextIndex % 2 === 0 ? ['SelfAttention', 'Math'] : ['Embeddings', 'Context']
              }
            ];
            return updated.slice(-3);
          });

          return nextIndex;
        });
      }, 9000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  // Handle Timestamp Jump
  const handleTimestampJump = (seconds) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  // Handle Quiz Submission
  const handleQuizAnswer = (option) => {
    setSelectedOption(option);
    if (option === 'B') {
      setQuizFeedback("Correct! Multi-head attention projects the queries, keys, and values into multiple representation subspaces, enabling the model to learn diverse features across positions in parallel.");
    } else if (option === 'A') {
      setQuizFeedback("Incorrect. Multi-head attention actually increases computational cost compared to basic single-head attention, though it is highly parallelizable.");
    } else {
      setQuizFeedback("Incorrect. Backpropagation is still the core training technique for Multi-head attention models.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#dce1fb] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d0bcff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#4cd7f6]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Header Bar */}
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
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span className="text-[#c7c4d7]">Active Topic: Attention Layer</span>
          </div>
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-[#c7c4d7] hover:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link to="/login" className="flex items-center gap-1 text-sm font-semibold hover:text-white transition-colors text-[#c7c4d7]">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      {/* Main Core Content */}
      <main className="pt-20 pb-28 px-4 md:px-8 max-w-[1280px] mx-auto w-full flex-grow flex flex-col gap-6">
        
        {/* Interactive Video & Camera Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Lecture Player Console */}
          <div className="lg:col-span-8 glass-card rounded-3xl overflow-hidden flex flex-col min-h-[380px] border border-white/10 relative shadow-2xl">
            {/* Aspect Video Mock */}
            <div className="relative aspect-video w-full bg-[#030712] overflow-hidden flex items-center justify-center">
              
              {/* Cool Tech Futuristic Diagram Image */}
              <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen flex items-center justify-center p-8 select-none">
                <svg className="w-full h-full max-w-lg opacity-40 text-secondary" viewBox="0 0 400 200" fill="none">
                  {/* Grid Lines */}
                  <g stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3">
                    <line x1="20" y1="20" x2="380" y2="20" />
                    <line x1="20" y1="60" x2="380" y2="60" />
                    <line x1="20" y1="100" x2="380" y2="100" />
                    <line x1="20" y1="140" x2="380" y2="140" />
                    <line x1="20" y1="180" x2="380" y2="180" />
                    <line x1="80" y1="10" x2="80" y2="190" />
                    <line x1="200" y1="10" x2="200" y2="190" />
                    <line x1="320" y1="10" x2="320" y2="190" />
                  </g>
                  {/* Neural Graph Nodes */}
                  <circle cx="80" cy="60" r="10" fill="#c0c1ff" className="animate-pulse" />
                  <circle cx="80" cy="140" r="10" fill="#c0c1ff" />
                  <circle cx="200" cy="40" r="8" fill="#d0bcff" />
                  <circle cx="200" cy="100" r="8" fill="#d0bcff" />
                  <circle cx="200" cy="160" r="8" fill="#d0bcff" />
                  <circle cx="320" cy="100" r="12" fill="#4cd7f6" />
                  
                  {/* Node Connectors */}
                  <path d="M90 60 L192 40" stroke="#c0c1ff" strokeWidth="2" />
                  <path d="M90 60 L192 100" stroke="#c0c1ff" strokeWidth="1" />
                  <path d="M90 140 L192 100" stroke="#c0c1ff" strokeWidth="1" />
                  <path d="M90 140 L192 160" stroke="#c0c1ff" strokeWidth="2" />
                  <path d="M208 40 L308 100" stroke="#d0bcff" strokeWidth="2" />
                  <path d="M208 100 L308 100" stroke="#d0bcff" strokeWidth="1.5" />
                  <path d="M208 160 L308 100" stroke="#d0bcff" strokeWidth="2" />
                </svg>
              </div>

              {/* Title overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-[#c0c1ff] font-mono uppercase tracking-wider">CS50 Advanced AI Series</span>
                <h3 className="text-sm font-bold text-white">Lecture 4: Self-Attention & Multi-Head Projectors</h3>
              </div>

              {/* Play Center Button Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setIsPlaying(true)}
                    className="absolute z-10 w-20 h-20 bg-secondary/90 hover:bg-secondary text-[#0d0096] rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(208,188,255,0.4)] active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Playback Controls Hud */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2">
                
                {/* Progress Dual Slider */}
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    setCurrentTime(percent * totalDuration);
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded hover:bg-white/10 active:scale-95 transition-transform text-[#c7c4d7] hover:text-white"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-mono text-[#c7c4d7]">
                      {formatTime(currentTime)} / {formatTime(totalDuration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[#c7c4d7]">
                    <span className="material-symbols-outlined text-lg cursor-pointer hover:text-white">settings</span>
                    <span className="material-symbols-outlined text-lg cursor-pointer hover:text-white">fullscreen</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Emotion AI Webcam Scanner */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-5 border border-white/10 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                <h3 className="text-sm font-bold text-white tracking-wide">Cognitive Focus Monitor</h3>
              </div>
              <button 
                onClick={() => setWebcamActive(!webcamActive)}
                className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#908fa0] hover:text-white transition-colors"
              >
                {webcamActive ? 'Disable Cam' : 'Enable Cam'}
              </button>
            </div>

            {/* Simulated Webcam feeds */}
            <div className="relative flex-grow min-h-[160px] bg-slate-950 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
              {webcamActive ? (
                <div className="absolute inset-0 w-full h-full">
                  
                  {/* Mock Webcam Canvas representation using SVG and animations */}
                  <div className="absolute inset-0 bg-[#0e172a] flex items-center justify-center">
                    {/* Glowing face scan vector path overlay */}
                    <svg className="w-32 h-32 text-secondary animate-pulse" viewBox="0 0 100 100" fill="none">
                      <path d="M30 20 H70 C80 20, 80 80, 70 80 H30 C20 80, 20 20, 30 20 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                      {/* Pupils */}
                      <circle cx="42" cy="45" r="3" fill="currentColor" />
                      <circle cx="58" cy="45" r="3" fill="currentColor" />
                      {/* Smile path based on High Focus */}
                      <path d="M40 60 Q50 68 60 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* AI Scanning sweep effect line */}
                  <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#57dffe] to-transparent shadow-[0_0_12px_#57dffe] animate-[bounce_3.5s_infinite]"></div>

                  {/* Grid layout node markers */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-tertiary">Webcam Frame [30fps]</div>
                  <div className="absolute bottom-2 left-2 text-[9px] font-mono text-secondary">AImodel: FaceScan v2.1</div>

                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-center p-4">
                  <span className="material-symbols-outlined text-white/20 text-3xl">videocam_off</span>
                  <p className="text-xs text-[#908fa0]">Webcam monitor feed is currently inactive</p>
                </div>
              )}
            </div>

            {/* Cognitive output telemetry */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Webcam Metrics</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                  <p className="text-sm font-semibold text-white font-mono">Attention Level: {focusState}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-tertiary font-bold">{focusProgress}%</span>
                <p className="text-[9px] text-[#908fa0]">Cognitive Index</p>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic AI Suggestion Popunder alert */}
        <AnimatePresence>
          {showAiAlert && (
            <motion.section 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-3xl p-5 border-l-4 border-l-secondary border-secondary/30 ai-glow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 blur-[40px] pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shadow-lg mt-0.5">
                    <span className="material-symbols-outlined text-secondary text-xl">psychology</span>
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-white flex items-center gap-1.5">
                      AI Study Companion
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full uppercase tracking-wider">Triggered by Focus Decline</span>
                    </h4>
                    <p className="text-sm text-[#c7c4d7] max-w-3xl leading-relaxed mt-1">
                      Our attention detectors noticed you paused or hovered multiple times. Self-attention concepts can be highly abstract. Would you like a quick, intuitive visualization breaking down this mechanism?
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button 
                    onClick={() => setShowExplanationModal(true)}
                    className="bg-secondary text-[#0d0096] font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#c0c1ff] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Yes, explain
                  </button>
                  <button 
                    onClick={() => setShowAiAlert(false)}
                    className="border border-[#908fa0]/30 hover:border-white text-[#c7c4d7] hover:text-white px-3 py-2 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Outer Split columns: Smart notes / Questions & Quizzes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Smart Notes with Live simulation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex-grow flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                    Smart Notes Tracker
                  </h3>
                  <button className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">download</span> Export Notes
                  </button>
                </div>

                {/* List of generated notes */}
                <div className="flex flex-col gap-4">
                  {transcripts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-[#0c1324]/40 border border-white/5 hover:border-secondary/20 transition-all flex flex-col gap-2 relative overflow-hidden group cursor-pointer"
                      onClick={() => handleTimestampJump(item.timeSec)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono bg-secondary/15 border border-secondary/25 px-2 py-0.5 rounded text-secondary font-bold group-hover:scale-105 transition-transform">
                            {item.time}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        </div>
                        <span className="material-symbols-outlined text-xs text-[#908fa0] opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
                      </div>
                      <p className="text-xs text-[#c7c4d7] leading-relaxed">{item.content}</p>
                      <div className="flex gap-1.5 flex-wrap mt-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-mono bg-white/5 text-[#908fa0] px-2 py-0.5 rounded-full border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Real-time Streaming active transcribing element */}
                  <div className="p-4 rounded-2xl bg-[#0c1324]/70 border border-secondary/20 shadow-[0_0_15px_rgba(208,188,255,0.05)] flex flex-col gap-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-secondary/20 text-secondary px-2 py-0.5 rounded font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                          {formatTime(currentTime)}
                        </span>
                        <h4 className="text-sm font-semibold text-white">Streaming Live Transcription</h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#c7c4d7] animate-pulse">Syncing Audio...</span>
                    </div>
                    
                    <p className="text-xs text-secondary leading-relaxed italic pr-4 typing-container">
                      {currentLiveText}
                    </p>

                    <div className="w-full bg-white/5 rounded-full h-1 mt-1 overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary to-tertiary h-full w-2/3 animate-pulse"></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Mini Quiz block */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex-grow flex flex-col justify-between">
              
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary">quiz</span>
                  Comprehension Quiz
                </h3>

                <div className="p-4 rounded-2xl bg-[#0c1324]/40 border border-white/5">
                  <span className="text-[10px] font-mono text-tertiary uppercase tracking-wider font-bold">Concept Check</span>
                  <p className="text-sm text-white font-semibold mt-1 leading-relaxed">
                    How does the Multi-Head Attention mechanism improve upon basic Single-Head Attention?
                  </p>

                  <div className="flex flex-col gap-2.5 mt-5">
                    {/* Option A */}
                    <button 
                      onClick={() => handleQuizAnswer('A')}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                        selectedOption === 'A' 
                          ? 'border-primary bg-primary/10 text-white' 
                          : 'border-white/5 hover:border-secondary/40 bg-white/5 text-[#c7c4d7] hover:text-white'
                      }`}
                    >
                      A) It reduces the computational matrix footprint during scale.
                    </button>
                    {/* Option B */}
                    <button 
                      onClick={() => handleQuizAnswer('B')}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                        selectedOption === 'B' 
                          ? 'border-secondary bg-secondary/15 text-white' 
                          : 'border-white/5 hover:border-secondary/40 bg-white/5 text-[#c7c4d7] hover:text-white'
                      }`}
                    >
                      B) It projects linear vectors into multiple representation spaces.
                    </button>
                    {/* Option C */}
                    <button 
                      onClick={() => handleQuizAnswer('C')}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                        selectedOption === 'C' 
                          ? 'border-primary bg-primary/10 text-white' 
                          : 'border-white/5 hover:border-secondary/40 bg-white/5 text-[#c7c4d7] hover:text-white'
                      }`}
                    >
                      C) It eliminates the need for backward gradients inside models.
                    </button>
                  </div>

                  {/* Feedback block */}
                  <AnimatePresence>
                    {quizFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mt-4 p-3 rounded-xl border text-[11px] leading-relaxed ${
                          selectedOption === 'B' 
                            ? 'border-[#009d6c]/30 bg-[#009d6c]/10 text-[#54f3b7]' 
                            : 'border-primary/20 bg-primary/5 text-primary'
                        }`}
                      >
                        {quizFeedback}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-[#908fa0]">
                <span>Quiz ID: #AI-ATTN4</span>
                <span className="font-mono">80% average student accuracy</span>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Floating Bottom Navigator for Quick Access */}
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
          className="flex flex-col items-center justify-center text-secondary bg-white/5 border border-white/10 px-6 py-1.5 rounded-2xl active:scale-95 transition-all text-xs font-bold"
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

      {/* Explanation Modal Overlay (Intuitive Visualization) */}
      <AnimatePresence>
        {showExplanationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExplanationModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-card rounded-3xl border border-white/15 p-6 md:p-8 shadow-2xl z-10 flex flex-col gap-5"
            >
              <button 
                onClick={() => setShowExplanationModal(false)}
                className="absolute top-4 right-4 text-[#908fa0] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shadow-lg">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Visualizing Self-Attention</h3>
                  <p className="text-xs text-[#908fa0]">Cognitive Breakdown by AI Tutor</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#c7c4d7] leading-relaxed">
                <p>
                  Imagine reading a sentence. When your eyes read the word <strong className="text-white">"it"</strong>, your brain automatically maps it back to a previously mentioned subject. Self-attention is the mathematical translation of this mapping.
                </p>

                <div className="bg-[#0c1324]/50 border border-white/5 rounded-2xl p-4 space-y-3 font-mono">
                  <div className="text-[10px] text-secondary uppercase tracking-widest font-bold">Mechanism Steps:</div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary text-[9px] font-bold flex items-center justify-center mt-0.5">1</span>
                    <p><strong>Query (Q):</strong> What am I searching for? (e.g. "it")</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary text-[9px] font-bold flex items-center justify-center mt-0.5">2</span>
                    <p><strong>Keys (K):</strong> What labels do existing words have? (e.g. "street", "animal")</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary text-[9px] font-bold flex items-center justify-center mt-0.5">3</span>
                    <p><strong>Values (V):</strong> What is the content of those words?</p>
                  </div>
                  <div className="pt-2 border-t border-white/5 text-center text-white text-[10px] font-bold">
                    Softmax( Q • Kᵀ / √d_k ) • V = Attention Score
                  </div>
                </div>

                <p>
                  By taking the dot-product between Queries and Keys, the transformer computes an alignment probability matrix, determining how much focus each word receives.
                </p>
              </div>

              <button 
                onClick={() => setShowExplanationModal(false)}
                className="w-full bg-gradient-to-r from-secondary to-[#c0c1ff] text-[#0d0096] font-bold py-3 rounded-xl text-xs hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer mt-2"
              >
                Got it, let's continue!
              </button>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdaptiveLearningView;
