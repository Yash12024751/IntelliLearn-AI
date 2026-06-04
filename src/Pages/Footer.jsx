const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#070d1f] text-center space-y-8 mt-24">
      {/* Brand logo container */}
      <div className="flex justify-center items-center gap-2">
        <svg className="h-8 w-8 text-primary" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="180 40" />
          <path d="M35 50L45 60L65 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="15" fill="currentColor" />
        </svg>
        <span className="font-sans text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary">
          IntelliLearn AI
        </span>
      </div>

      {/* Navigation items */}
      <nav className="flex flex-wrap justify-center gap-6 px-4">
        <a className="text-[#908fa0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors" href="#features">Product</a>
        <a className="text-[#908fa0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors" href="#features">Features</a>
        <a className="text-[#908fa0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors" href="#how-it-works">AI Pipeline</a>
        <a className="text-[#908fa0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors" href="#upload-demo">Try Engine</a>
      </nav>

      {/* Social links */}
      <div className="flex justify-center gap-8 text-[#c7c4d7]">
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-2xl" title="Facebook">
          brand_awareness
        </span>
        <span className="material-symbols-outlined cursor-pointer hover:text-secondary transition-colors text-2xl" title="Twitter">
          public
        </span>
        <span className="material-symbols-outlined cursor-pointer hover:text-tertiary transition-colors text-2xl" title="Email">
          mail
        </span>
      </div>

      {/* Copyright text label */}
      <p className="text-[#908fa0] font-mono text-[10px] uppercase tracking-wider px-4">
        &copy; {new Date().getFullYear()} IntelliLearn AI Study Assistant. Focused Intelligence. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;