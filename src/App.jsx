import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { Menu, X, Globe, Phone, Shield, Sun, Moon } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-gray-200 flex flex-col font-sans transition-colors duration-500 selection:bg-blue-900 selection:text-white dark:selection:bg-cyan-500/30 dark:selection:text-cyan-300 ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Header is always Dark */}
      <header className="sticky top-0 z-50 bg-[#050811] backdrop-blur-md border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div 
            onClick={() => setPage('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              src="/Logo Nusantar Digital.png" 
              alt="Nusantara Digital" 
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              Nusantara <span className="text-cyan-400">Digital</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setPage('home')}
              className={`text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${
                page === 'home' ? 'text-cyan-400 text-neon-cyan' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setPage('contact')}
              className={`text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${
                page === 'contact' ? 'text-cyan-400 text-neon-cyan' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Hubungi Kami
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-cyan-400 hover:text-cyan-300 transition duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setPage('contact')}
              className="btn-neon text-xs font-bold tracking-wider uppercase px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-gray-300 hover:text-white rounded-md transition duration-300 cursor-pointer"
            >
              Mulai Konsultasi
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-cyan-400 hover:text-cyan-300 transition duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-200 transition duration-300"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#050811] border-t border-slate-900 animate-fade-in absolute w-full left-0 py-6 px-6 space-y-4 shadow-lg">
            <button
              onClick={() => {
                setPage('home');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 font-semibold ${
                page === 'home' ? 'text-cyan-400' : 'text-gray-300'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => {
                setPage('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 font-semibold ${
                page === 'contact' ? 'text-cyan-400' : 'text-gray-300'
              }`}
            >
              Hubungi Kami
            </button>
            <button
              onClick={() => {
                setPage('contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-bold rounded-lg"
            >
              Mulai Konsultasi
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {page === 'home' ? <Home setPage={setPage} theme={theme} /> : <Contact theme={theme} />}
      </main>

      {/* Footer is always Dark */}
      <footer className="border-t border-slate-900 bg-[#03060c] text-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img 
                src="/Logo Nusantar Digital.png" 
                alt="Nusantara Digital" 
                className="h-7 w-auto object-contain"
              />
              <span className="font-heading font-bold text-white">
                Nusantara <span className="text-cyan-400">Digital</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Mitra terpercaya untuk pengembangan ekosistem digital, layanan IT, 
              dan infrastruktur cloud berstandar industri demi kemajuan bisnis Anda di Indonesia.
            </p>
            <div className="flex gap-4 pt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> ISO 27001 Certified</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> 100% Lokal</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-light">
              <li>
                <button onClick={() => setPage('home')} className="hover:text-cyan-400 transition cursor-pointer">Beranda</button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-cyan-400 transition cursor-pointer">Hubungi Kami</button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-gray-400 font-light">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Kantor Pusat</h4>
            <p className="leading-relaxed">
              Gedung Multimedia UMN<br />
              Jl. Scientia Boulevard, Gading Serpong,<br />
              Tangerang, Banten 15810
            </p>
            <p className="flex items-center gap-2 text-xs text-cyan-400 mt-2 font-medium">
              <Phone className="w-3.5 h-3.5" /> (021) 5422-0808
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Nusantara Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
