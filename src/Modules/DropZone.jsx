import React, { useState } from 'react';

export default function DropZone({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [pipelineState, setPipelineState] = useState('');

  const handleIngestionStart = (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    setUploading(true);
    
    // Exact requested working flow sequence simulation
    setPipelineState('🎙️ MODULE 3: INITIALIZING WHISPER AI... AUDIO_TO_TEXT_PARSING...');
    
    setTimeout(() => {
      // In Majot project, team member will replace this timeout with dynamic backend call trigger
      // import { initiateBackendPipeline } from './TeamLogic';
      // initiateBackendPipeline(file).then(data => onUploadComplete(file.name));
      onUploadComplete(file.name); 
    }, 1500); 
  };

  return (
    <div id="upload-zone" className="border-2 border-dashed border-slate-800 bg-slate-950/20 rounded-3xl p-10 text-center relative overflow-hidden backdrop-blur-sm group hover:border-violet-500/40 transition-colors duration-500 max-w-4xl mx-auto">
      
      {/* UI: Laser Sweep Animation on Hover */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hotech-sweep pointer-events-none z-20"></div>

      <input type="file" id="lecture-file" className="hidden" accept="audio/*,video/*,.pdf" onChange={handleIngestionStart} />
      
      {!uploading ? (
        <label htmlFor="lecture-file" className="cursor-pointer block space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-black border border-slate-800 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-violet-500/50 shadow-2xl transition-all duration-500 relative">
            <span className="text-3xl select-none">📂</span>
          </div>
          <div className="space-y-1.5 leading-tight">
            <h3 className="text-lg font-extrabold text-white tracking-tight transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400">Deploy Lecture Asset or Browse System</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest text-[10px]">MODULE 2 Upload: AUDIO, VIDEO, PDF notes // WHISPER_NLP_ARRAY</p>
          </div>
          <span className="inline-flex bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity tracking-wider">
            INITIALIZE_DATA_STREAM_
          </span>
        </label>
      ) : (
        <div className="space-y-6 animate-fadeIn py-6">
          {/* Audio Vizwaves Simulation */}
          <div className="flex justify-center items-center space-x-1 h-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-1 h-10 bg-violet-500 rounded animate-wave-bounce`} style={{ animationDelay: `${i * 0.15}s` }}></div>
            ))}
          </div>
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">{pipelineState}</p>
          <div className="w-full max-w-xs bg-black h-1 rounded-full overflow-hidden mx-auto border border-slate-800">
            <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}
    </div>
  );
}