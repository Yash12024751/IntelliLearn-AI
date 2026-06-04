import { useState, useEffect } from 'react';

const UploadPreview = () => {
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | complete
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  // Handle simulated upload progress trigger
  useEffect(() => {
    let timer;
    if (uploadState === 'uploading') {
      setProgress(0);
      const step = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            setUploadState('complete');
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 8) + 2;
          timer = setTimeout(step, 80);
          return Math.min(next, 100);
        });
      };
      timer = setTimeout(step, 100);
    }
    return () => clearTimeout(timer);
  }, [uploadState]);

  const handleMockUpload = (name) => {
    if (uploadState === 'uploading') return;
    setFileName(name);
    setUploadState('uploading');
  };

  const handleReset = () => {
    setUploadState('idle');
    setProgress(0);
    setFileName('');
  };

  return (
    <section id="upload-demo" className="max-w-4xl mx-auto px-4 py-16">
      <div className="p-8 md:p-12 glass-card rounded-[2.5rem] border border-primary/30 space-y-8 text-center relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 blur-[60px] -z-10" />
        
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-primary text-3xl animate-bounce">cloud_upload</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Try the Engine</h3>
          <p className="text-[#c7c4d7] text-sm md:text-base max-w-md mx-auto">
            Upload a sample lecture audio, video, or PDF file to see the AI magic in real-time.
          </p>
        </div>

        {/* Dynamic States Interface */}
        {uploadState === 'idle' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button 
              onClick={() => handleMockUpload('chemistry_lecture_04.mp3')}
              className="p-6 border border-white/10 rounded-2xl bg-[#191f31]/30 cursor-pointer active:scale-95 transition-all hover:border-primary/50 text-left space-y-2 hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-primary">audiotrack</span>
                <span className="text-[10px] font-mono uppercase bg-primary/20 text-primary px-2 py-0.5 rounded">Audio</span>
              </div>
              <h4 className="font-bold text-white text-sm truncate">chemistry_lecture_04.mp3</h4>
              <p className="text-xs text-[#908fa0]">12.4 MB • 45 mins speech</p>
            </button>

            <button 
              onClick={() => handleMockUpload('neural_networks_intro.pdf')}
              className="p-6 border border-white/10 rounded-2xl bg-[#191f31]/30 cursor-pointer active:scale-95 transition-all hover:border-secondary/50 text-left space-y-2 hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-secondary">picture_as_pdf</span>
                <span className="text-[10px] font-mono uppercase bg-secondary/20 text-secondary px-2 py-0.5 rounded">Slides</span>
              </div>
              <h4 className="font-bold text-white text-sm truncate">neural_networks_intro.pdf</h4>
              <p className="text-xs text-[#908fa0]">4.2 MB • 32 lecture slides</p>
            </button>

            <div 
              onClick={() => handleMockUpload('classroom_recording.mp4')}
              className="sm:col-span-2 p-8 border-2 border-dashed border-white/10 rounded-2xl bg-[#151b2d]/50 cursor-pointer active:bg-white/5 hover:border-tertiary/40 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[#908fa0]">upload</span>
              <p className="text-[#908fa0] text-xs font-mono uppercase tracking-wider">Drag & drop files or click to upload</p>
            </div>
          </div>
        )}

        {uploadState === 'uploading' && (
          <div className="max-w-md mx-auto space-y-6 py-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-tertiary">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                AI Analysis: {fileName}
              </span>
              <span>{progress}%</span>
            </div>
            
            {/* Progress bar container */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary transition-all duration-100 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-[#908fa0] font-mono animate-pulse">
              {progress < 30 && "Initializing Speech-to-Text translation engine..."}
              {progress >= 30 && progress < 60 && "Transcribing vocal recordings & building outlines..."}
              {progress >= 60 && progress < 90 && "Applying LLM analysis and extracting summary concepts..."}
              {progress >= 90 && "Finalizing quizzes and interactive flashcards..."}
            </p>
          </div>
        )}

        {uploadState === 'complete' && (
          <div className="max-w-md mx-auto space-y-6 py-4 animate-fadeIn">
            <div className="p-6 border border-tertiary/30 rounded-3xl bg-tertiary/5 text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-3xl">check_circle</span>
                <div>
                  <h4 className="font-bold text-white text-lg">Analysis Complete!</h4>
                  <p className="text-xs text-[#908fa0] truncate">{fileName}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-primary font-mono">5</span>
                  <p className="text-[9px] uppercase font-mono tracking-wider text-[#908fa0]">AI Pages</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-secondary font-mono">15</span>
                  <p className="text-[9px] uppercase font-mono tracking-wider text-[#908fa0]">Quiz Qs</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-tertiary font-mono">24</span>
                  <p className="text-[9px] uppercase font-mono tracking-wider text-[#908fa0]">Key Terms</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-white/10 active:scale-95"
            >
              Analyze Another File
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default UploadPreview;
