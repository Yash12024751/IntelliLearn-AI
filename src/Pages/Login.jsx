import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login/signup and redirect to student dashboard
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#dce1fb] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d0bcff]/15 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#4cd7f6]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header back navigation for smaller screens */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0c1324]/40 backdrop-blur-md z-10 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <svg className="h-6 w-6 text-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="180 40" />
            <path d="M35 50L45 60L65 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="15" fill="currentColor" />
          </svg>
          <span className="font-sans text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary">
            IntelliLearn AI
          </span>
        </Link>
        <Link to="/" className="text-sm font-semibold text-tertiary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Home
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-6 md:px-12 py-12 md:py-24 z-10">
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand introduction (Desktop only) */}
          <div className="hidden md:flex md:col-span-7 flex-col space-y-8 pr-6">
            <Link to="/" className="inline-flex items-center gap-3 text-primary group">
              <svg className="h-10 w-10 text-primary transition-transform group-hover:scale-105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" strokeDasharray="180 40" />
                <path d="M35 50L45 60L65 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
              <span className="font-sans text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary">
                IntelliLearn AI
              </span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Experience Personalized Education Driven by <span className="gradient-text">Intelligence</span>.
              </h1>
              <p className="text-base md:text-lg text-[#c7c4d7] max-w-[540px] leading-relaxed">
                Join a community of forward-thinking students, researchers, and educators. Our adaptive platform learns how you learn, creating a distraction-free, high-performance study environment.
              </p>
            </div>

            {/* Visual Decoration Glass Card */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-lg">
                  <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider font-mono">AI Insight of the Day</p>
                  <p className="text-sm italic text-[#c7c4d7] leading-relaxed">
                    "Active recall and spaced repetition are your cognitive multipliers. Let our adaptive pipeline handle the timing while you focus on deep comprehension."
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-[#c7c4d7] hover:text-white transition-all text-sm font-semibold group">
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                Return to Landing Page
              </Link>
            </div>
          </div>

          {/* Right Column: Card for Login & Signup */}
          <div className="md:col-span-5 w-full flex justify-center md:justify-end">
            <div className="glass-card w-full max-w-[460px] p-8 rounded-[2rem] flex flex-col gap-6 border-t-white/10 border-l-white/10 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!isSignup ? (
                  /* Login View */
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                      <p className="text-sm text-[#c7c4d7]">Please enter your details to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#c7c4d7] font-mono uppercase tracking-wider pl-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1324]/50 text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-sm"
                          placeholder="name@university.edu"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center pl-1">
                          <label className="text-xs font-semibold text-[#c7c4d7] font-mono uppercase tracking-wider">Password</label>
                          <a href="#" className="text-xs font-semibold text-secondary hover:underline">Forgot Password?</a>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1324]/50 text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-sm"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-primary to-secondary text-[#0d0096] font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(73,75,214,0.3)] hover:shadow-indigo-500/40 transition-all cursor-pointer text-center text-sm"
                      >
                        Sign In
                      </motion.button>
                    </form>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-white/5"></div>
                      <span className="flex-shrink mx-4 text-xs font-semibold text-[#908fa0] uppercase tracking-widest font-mono">Or connect with</span>
                      <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 border border-white/10 py-3 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-xs font-semibold cursor-pointer">
                        <img
                          alt="Google"
                          className="w-4 h-4"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD27o-CtA_etZYslbTTMbrg3UjQKAGK7BOxTUCeOs7-EY64J_C824_EAcZTgx7xcufapcP11Kd1K-_JTarnVaOTRb8GhwAU8Uo4PGA7gpbDTKw2oKXev-KAv267NbTPWzYzVoDz8gC3dxNbhcMHV06Hgi2sUFC4de-ShTTAxGqjVhLylSb23U3m4YBApgNsU_YMhwtYllQwkbGzu7vxd_bx0m2WGkdXrgHyTktnCX4LfQkVl0zK2RWXLXQ3xA5aif8zfhelkfhS2fj1"
                        />
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 border border-white/10 py-3 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-xs font-semibold cursor-pointer">
                        <span className="material-symbols-outlined text-sm">school</span>
                        EDU ID
                      </button>
                    </div>

                    <p className="text-center text-sm text-[#c7c4d7] mt-2">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setIsSignup(true)}
                        className="text-secondary font-bold hover:underline cursor-pointer"
                      >
                        Create Account
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  /* Signup View */
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold tracking-tight text-white">Create your account</h2>
                      <p className="text-sm text-[#c7c4d7]">Begin your adaptive AI learning journey today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#c7c4d7] font-mono uppercase tracking-wider pl-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1324]/50 text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-sm"
                          placeholder="Alex Johnson"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#c7c4d7] font-mono uppercase tracking-wider pl-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1324]/50 text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-sm"
                          placeholder="name@university.edu"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#c7c4d7] font-mono uppercase tracking-wider pl-1">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1324]/50 text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all text-sm"
                          placeholder="Min. 8 characters"
                          required
                        />
                      </div>

                      <div className="flex items-start gap-3 pl-1 py-1">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="mt-1 rounded border-white/10 text-secondary focus:ring-secondary/20 focus:ring-offset-0 bg-[#0c1324]"
                          required
                        />
                        <label htmlFor="agreeTerms" className="text-xs text-[#c7c4d7] leading-tight">
                          I agree to the{' '}
                          <a href="#" className="text-secondary hover:underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-secondary hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-primary to-secondary text-[#0d0096] font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(73,75,214,0.3)] hover:shadow-indigo-500/40 transition-all cursor-pointer text-center text-sm"
                      >
                        Create Account
                      </motion.button>
                    </form>

                    <p className="text-center text-sm text-[#c7c4d7] mt-2">
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsSignup(false)}
                        className="text-secondary font-bold hover:underline cursor-pointer"
                      >
                        Login
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>

      {/* Footer Area */}
      <footer className="py-6 px-6 md:px-12 border-t border-white/5 bg-[#020617]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#908fa0]">
          <div className="flex items-center gap-6">
            <p>© 2026 IntelliLearn AI</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">System Status</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary animate-pulse"></span>
            </span>
            <span className="font-mono uppercase tracking-wider text-[10px]">Platform systems optimal</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Login;
