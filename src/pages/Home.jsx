import React, { useState, useEffect } from 'react';
import { Code2, CloudLightning, Layers, Briefcase, Users, Sparkles } from 'lucide-react';

export default function Home({ setPage }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const fallbackTeam = [
    { id: 1, first_name: 'George', last_name: 'Bluth', email: 'george.bluth@reqres.in', avatar: 'https://reqres.in/img/faces/1-image.jpg', role: 'CEO & Founder' },
    { id: 2, first_name: 'Janet', last_name: 'Weaver', email: 'janet.weaver@reqres.in', avatar: 'https://reqres.in/img/faces/2-image.jpg', role: 'Chief Technology Officer (CTO)' },
    { id: 3, first_name: 'Emma', last_name: 'Wong', email: 'emma.wong@reqres.in', avatar: 'https://reqres.in/img/faces/3-image.jpg', role: 'Head of UX/UI Design' },
    { id: 4, first_name: 'Eve', last_name: 'Holt', email: 'eve.holt@reqres.in', avatar: 'https://reqres.in/img/faces/4-image.jpg', role: 'Lead Cloud Architect' },
    { id: 5, first_name: 'Charles', last_name: 'Morris', email: 'charles.morris@reqres.in', avatar: 'https://reqres.in/img/faces/5-image.jpg', role: 'Principal Engineer' },
    { id: 6, first_name: 'Tracey', last_name: 'Ramos', email: 'tracey.ramos@reqres.in', avatar: 'https://reqres.in/img/faces/6-image.jpg', role: 'Lead Account Manager' }
  ];

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
      .then((res) => {
        if (!res.ok) {
          throw new Error('API failed');
        }
        return res.json();
      })
      .then((data) => {
        const roles = [
          'CEO & Founder',
          'Chief Technology Officer (CTO)',
          'Head of UX/UI Design',
          'Lead Cloud Architect',
          'Principal Engineer',
          'Lead Account Manager'
        ];
        const teamWithRoles = data.data.map((member, index) => ({
          ...member,
          role: roles[index] || 'IT Specialist'
        }));
        setTeam(teamWithRoles);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("ReqRes API failed, falling back to local dataset: ", err);
        setTeam(fallbackTeam);
        setIsOfflineMode(true);
        setLoading(false);
      });
  }, []);

  const services = [
    {
      icon: <Code2 className="w-8 h-8 text-emerald-400 group-hover:rotate-6 transition-transform duration-300" />,
      title: "Software & Web Development",
      description: "Pengembangan aplikasi web dan mobile kustom dengan performa tinggi, arsitektur modern, serta keamanan tingkat tinggi.",
      color: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      badge: "Kustom"
    },
    {
      icon: <CloudLightning className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cloud & DevOps Solutions",
      description: "Migrasi cloud, manajemen infrastruktur server, otomatisasi CI/CD, dan optimalisasi biaya operasional IT Anda.",
      color: "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      badge: "Efisien"
    },
    {
      icon: <Layers className="w-8 h-8 text-indigo-400 group-hover:-translate-y-1 transition-transform duration-300" />,
      title: "UI/UX & Product Design",
      description: "Riset pengguna, pembuatan wireframe, prototyping interaktif, serta desain visual antarmuka produk digital yang memikat.",
      color: "border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
      badge: "Modern"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />,
      title: "IT Consulting & Strategy",
      description: "Konsultasi strategis untuk transformasi bisnis digital, audit arsitektur IT, dan manajemen proyek skala enterprise.",
      color: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badge: "Strategis"
    }
  ];

  return (
    <div className="space-y-28 pb-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse-glow delay-500" />
        
        <div className="max-w-6xl mx-auto px-6 text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-cyan-300 font-medium tracking-wide border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Pioneer Digital Transformation di Indonesia</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] font-heading">
            Membangun Solusi Teknologi <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
              Masa Depan Nusantara
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed font-light">
            Nusantara Digital membantu bisnis Anda berkembang lebih cepat melalui transformasi digital, 
            pengembangan software mutakhir, dan manajemen cloud yang efisien.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => setPage('contact')}
              className="btn-neon px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-bold hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition duration-300 cursor-pointer w-full sm:w-auto text-sm tracking-wider uppercase"
            >
              Mulai Transformasi
            </button>
            <a 
              href="#services"
              className="px-8 py-4 rounded-xl bg-slate-900/60 border border-slate-800 text-gray-300 hover:text-white hover:border-slate-600 transition duration-300 w-full sm:w-auto text-center cursor-pointer text-sm tracking-wider"
            >
              Layanan Kami
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-6 scroll-mt-24 relative z-10">
        <div className="text-center space-y-3 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Layanan Unggulan</h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Kami menyediakan ekosistem layanan teknologi yang menyeluruh untuk mendukung pertumbuhan bisnis Anda di era modern.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col sm:flex-row gap-6 border ${service.color} animate-slide-up relative overflow-hidden`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 border border-slate-850 px-2 py-0.5 rounded bg-slate-900/30">
                {service.badge}
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl h-fit border border-slate-800 w-fit shrink-0">
                {service.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-3 mb-20 relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex justify-center items-center gap-3">
            <Users className="w-8 md:w-10 h-8 md:h-10 text-cyan-400" />
            <span>Tim Profesional Kami</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Di balik setiap inovasi, terdapat tim ahli berdedikasi tinggi yang siap merealisasikan visi digital Anda.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full mt-4" />
          
          {isOfflineMode && (
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[9px] uppercase tracking-widest px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded font-bold animate-pulse">
              Demo
            </span>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl space-y-4 animate-pulse">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto" />
                <div className="h-6 bg-slate-850 rounded w-2/3 mx-auto" />
                <div className="h-4 bg-slate-850 rounded w-1/2 mx-auto" />
                <div className="h-4 bg-slate-850 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.id} 
                className="group glass-panel p-6 rounded-2xl text-center hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={member.avatar} 
                    alt={`${member.first_name} ${member.last_name}`} 
                    className="relative w-full h-full object-cover rounded-full border-2 border-slate-800 bg-slate-900 z-10"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                  {member.first_name} {member.last_name}
                </h3>
                <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mt-1.5 mb-4">
                  {member.role}
                </p>
                
                <div className="pt-4 border-t border-slate-850 text-xs text-gray-500 font-light flex items-center justify-center gap-1.5 hover:text-cyan-400/80 transition-colors duration-300">
                  <span>{member.email}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
