import React, { useState } from 'react';
import Home from './pages/Home';
import { Compass, Menu, X, Globe, Phone, Shield } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/40">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div 
            onClick={() => setPage('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-lg text-gray-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Nusantara <span className="text-cyan-400 text-neon-cyan">Digital</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
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
              onClick={() => setPage('contact')}
              className="btn-neon text-xs font-bold tracking-wider uppercase px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 rounded-md transition duration-300 cursor-pointer"
            >
              Mulai Konsultasi
            </button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition duration-300"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-800 animate-fade-in absolute w-full left-0 py-6 px-6 space-y-4">
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

      <main className="flex-grow pt-10">
        {page === 'home' ? (
          <Home setPage={setPage} />
        ) : (
          <div className="text-center space-y-4 animate-fade-in py-20 px-6">
            <h2 className="text-3xl font-extrabold">Hubungi Kami</h2>
            <p className="text-gray-400 max-w-md mx-auto font-light">
              Halaman kontak, formulir pesan, peta lokasi, dan status cuaca akan segera hadir.
            </p>
          </div>
        )}
      </main>

      <footer className="glass-panel border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded text-gray-950">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-gray-100">
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
            <p className="flex items-center gap-2 text-xs text-cyan-400 mt-2">
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
