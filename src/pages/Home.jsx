import React, { useState, useEffect, useRef } from 'react';
import { Code2, CloudLightning, Layers, Briefcase, Users, Sparkles, Terminal, Database, ShieldCheck, Cpu, GitFork, Star, Info, Activity, RefreshCw, Loader2 } from 'lucide-react';

export default function Home({ setPage, theme }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [activeService, setActiveService] = useState(null);
  
  const [repoStats, setRepoStats] = useState(null);
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [repoLoading, setRepoLoading] = useState(true);
  const [newsFeed, setNewsFeed] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  
  const [isTickerVisible, setIsTickerVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isLivePulseVisible, setIsLivePulseVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  
  const tickerRef = useRef(null);
  const servicesRef = useRef(null);
  const livePulseRef = useRef(null);
  const teamRef = useRef(null);

  const fallbackTeam = [
    { id: 1, first_name: 'George', last_name: 'Bluth', email: 'george.bluth@reqres.in', avatar: '/Gambar Tim/George Bluth.png', role: 'CEO & Founder' },
    { id: 2, first_name: 'Janet', last_name: 'Weaver', email: 'janet.weaver@reqres.in', avatar: '/Gambar Tim/Janet Weaver.png', role: 'Chief Technology Officer (CTO)' },
    { id: 3, first_name: 'Emma', last_name: 'Wong', email: 'emma.wong@reqres.in', avatar: '/Gambar Tim/Emma Wong.png', role: 'Head of UX/UI Design' },
    { id: 4, first_name: 'Eve', last_name: 'Holt', email: 'eve.holt@reqres.in', avatar: '/Gambar Tim/Eve Holt.png', role: 'Lead Cloud Architect' },
    { id: 5, first_name: 'Charles', last_name: 'Morris', email: 'charles.morris@reqres.in', avatar: '/Gambar Tim/Charles Morris.png', role: 'Principal Engineer' },
    { id: 6, first_name: 'Tracey', last_name: 'Ramos', email: 'tracey.ramos@reqres.in', avatar: '/Gambar Tim/Tracey Ramos.png', role: 'Lead Account Manager' }
  ];

  const techStack = [
    { name: "React", icon: <Code2 className="w-5 h-5 text-emerald-600 dark:text-cyan-400" />, serviceIndex: 0 },
    { name: "Tailwind CSS", icon: <Sparkles className="w-5 h-5 text-emerald-500 dark:text-sky-400" />, serviceIndex: 0 },
    { name: "Node.js", icon: <Terminal className="w-5 h-5 text-emerald-650 dark:text-green-400" />, serviceIndex: 0 },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-indigo-600 dark:text-blue-400" />, serviceIndex: 1 },
    { name: "Cloud Integration", icon: <CloudLightning className="w-5 h-5 text-sky-600 dark:text-indigo-400" />, serviceIndex: 1 },
    { name: "Cybersecurity", icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, serviceIndex: 3 },
    { name: "System Architecture", icon: <Cpu className="w-5 h-5 text-purple-650 dark:text-purple-400" />, serviceIndex: 2 }
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
        const localAvatars = {
          "George Bluth": "/Gambar Tim/George Bluth.png",
          "Janet Weaver": "/Gambar Tim/Janet Weaver.png",
          "Emma Wong": "/Gambar Tim/Emma Wong.png",
          "Eve Holt": "/Gambar Tim/Eve Holt.png",
          "Charles Morris": "/Gambar Tim/Charles Morris.png",
          "Tracey Ramos": "/Gambar Tim/Tracey Ramos.png"
        };
        const teamWithRoles = data.data.map((member, index) => {
          const fullName = `${member.first_name} ${member.last_name}`;
          return {
            ...member,
            avatar: localAvatars[fullName] || member.avatar,
            role: roles[index] || 'IT Specialist'
          };
        });
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

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const repoRes = await fetch('https://api.github.com/repos/Maxhunter345/Nusantara-Digital-Company-Profile');
        if (!repoRes.ok) throw new Error('Repo details failed');
        const repoData = await repoRes.json();

        const langRes = await fetch('https://api.github.com/repos/Maxhunter345/Nusantara-Digital-Company-Profile/languages');
        let langData = {};
        if (langRes.ok) {
          langData = await langRes.json();
        }

        setRepoStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          lastPush: new Date(repoData.pushed_at).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        });

        const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
        const parsedLangs = Object.entries(langData)
          .map(([name, bytes]) => ({
            name,
            percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0
          }))
          .sort((a, b) => b.percentage - a.percentage);

        setRepoLanguages(parsedLangs.slice(0, 3));
      } catch (err) {
        setRepoStats({
          stars: 1,
          forks: 0,
          lastPush: new Date().toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        });
        setRepoLanguages([
          { name: 'JavaScript', percentage: 74 },
          { name: 'CSS', percentage: 18 },
          { name: 'HTML', percentage: 8 }
        ]);
      } finally {
        setRepoLoading(false);
      }
    };

    const fetchNewsData = async () => {
      try {
        const newsRes = await fetch('https://dev.to/api/articles?tag=programming&per_page=3');
        if (!newsRes.ok) throw new Error('News fetch failed');
        const newsData = await newsRes.json();

        setNewsFeed(newsData.map(article => ({
          title: article.title,
          url: article.url,
          readablePublishDate: article.readable_publish_date,
          readingTime: article.reading_time_minutes
        })));
      } catch (err) {
        setNewsFeed([
          {
            title: 'Optimizing React Rendering Performance in 2026',
            url: 'https://dev.to',
            readablePublishDate: 'Aug 04',
            readingTime: 5
          },
          {
            title: 'Docker Best Practices for Modern Development Workflows',
            url: 'https://dev.to',
            readablePublishDate: 'Aug 03',
            readingTime: 7
          },
          {
            title: 'Understanding CSS Container Queries and Scope Rules',
            url: 'https://dev.to',
            readablePublishDate: 'Aug 01',
            readingTime: 4
          }
        ]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchGithubData();
    fetchNewsData();
  }, []);

  const services = [
    {
      icon: <Code2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />,
      title: "Software & Web Development",
      description: "Pengembangan aplikasi web dan mobile kustom dengan performa tinggi, arsitektur modern, serta keamanan tingkat tinggi.",
      color: "border-emerald-500/10 dark:border-emerald-500/20 hover:border-emerald-500/40 dark:hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      badge: "Kustom"
    },
    {
      icon: <CloudLightning className="w-8 h-8 text-sky-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cloud & DevOps Solutions",
      description: "Migrasi cloud, manajemen infrastruktur server, otomatisasi CI/CD, dan otomatisasi deployment operasional IT Anda.",
      color: "border-sky-500/10 dark:border-cyan-500/20 hover:border-sky-500/40 dark:hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      badge: "Efisien"
    },
    {
      icon: <Layers className="w-8 h-8 text-indigo-650 dark:text-indigo-400 group-hover:-translate-y-1 transition-transform duration-300" />,
      title: "UI/UX & Product Design",
      description: "Riset pengguna, pembuatan wireframe, prototyping interaktif, serta desain visual antarmuka produk digital yang memikat.",
      color: "border-indigo-500/10 dark:border-indigo-500/20 hover:border-indigo-500/40 dark:hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
      badge: "Modern"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-650 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-300" />,
      title: "IT Consulting & Strategy",
      description: "Konsultasi strategis untuk transformasi bisnis digital, audit arsitektur IT, dan manajemen proyek skala enterprise.",
      color: "border-purple-500/10 dark:border-purple-500/20 hover:border-purple-500/40 dark:hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badge: "Strategis"
    }
  ];

  useEffect(() => {
    const tickerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsTickerVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        setIsServicesVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const livePulseObserver = new IntersectionObserver(
      ([entry]) => {
        setIsLivePulseVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        setIsTeamVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (tickerRef.current) tickerObserver.observe(tickerRef.current);
    if (servicesRef.current) servicesObserver.observe(servicesRef.current);
    if (livePulseRef.current) livePulseObserver.observe(livePulseRef.current);
    if (teamRef.current) teamObserver.observe(teamRef.current);

    return () => {
      if (tickerRef.current) tickerObserver.unobserve(tickerRef.current);
      if (servicesRef.current) servicesObserver.unobserve(servicesRef.current);
      if (livePulseRef.current) livePulseObserver.unobserve(livePulseRef.current);
      if (teamRef.current) teamObserver.unobserve(teamRef.current);
    };
  }, []);

  const handleTechClick = (index) => {
    const targetSection = document.getElementById('services');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsServicesVisible(true);
    setActiveService(index);
    setTimeout(() => {
      setActiveService(null);
    }, 2000);
  };

  return (
    <div className="space-y-36 pb-20 relative overflow-hidden">
      
      <div className="absolute top-[5%] left-[5%] w-[350px] h-[350px] bg-emerald-500/5 dark:bg-cyan-500/8 rounded-full blur-[110px] pointer-events-none animate-float-slow" />
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-cyan-500/4 dark:bg-indigo-500/6 rounded-full blur-[120px] pointer-events-none animate-float-medium" />
      <div className="absolute bottom-[10%] left-[10%] w-[380px] h-[380px] bg-indigo-500/4 dark:bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none animate-float-slow delay-1000" />

      <div 
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 z-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <section className="relative min-h-[100vh] flex flex-col items-center justify-start pt-24 md:pt-32 pb-64 z-10">
        <div 
          className={`absolute inset-0 bg-cover bg-center pointer-events-none z-0 ${
            theme === 'dark' ? 'opacity-90' : 'opacity-95'
          }`} 
          style={{ 
            backgroundImage: `url('${theme === 'dark' ? '/Dark%20Hero%20Background.png' : '/Light%20Hero%20Background.png'}')`,
            ...(theme === 'dark' ? {} : {
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)'
            })
          }} 
        />
        
        <div className="max-w-6xl mx-auto px-6 text-center space-y-8 animate-fade-in relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-semibold tracking-wide border transition-all duration-300 ${
            theme === 'dark' 
              ? 'text-cyan-300 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
              : 'text-slate-700 border-slate-350 shadow-[0_0_10px_rgba(15,23,42,0.05)]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 animate-pulse ${theme === 'dark' ? 'text-cyan-400' : 'text-emerald-600'}`} />
            <span>Pioneer Digital Transformation di Indonesia</span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] font-heading select-none animate-float ${
            theme === 'dark' ? 'text-slate-950' : 'text-white'
          }`}>
            Membangun Solusi Teknologi <br />
            <span className={`bg-clip-text text-transparent drop-shadow-sm ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900' 
                : 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-300'
            }`}>
              Masa Depan Nusantara
            </span>
          </h1>
          
          <p className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light animate-slide-up delay-200 ${
            theme === 'dark' ? 'text-slate-900' : 'text-gray-200'
          }`}>
            Nusantara Digital membantu bisnis Anda berkembang lebih cepat melalui transformasi digital, 
            pengembangan software mutakhir, dan manajemen cloud yang efisien.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up delay-300">
            <button 
              onClick={() => setPage('contact')}
              className="btn-neon px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 dark:text-gray-950 font-bold hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition duration-300 cursor-pointer w-full sm:w-auto text-sm tracking-wider uppercase"
            >
              Mulai Transformasi
            </button>
            <a 
              href="#services"
              className="px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition duration-300 w-full sm:w-auto text-center cursor-pointer text-sm tracking-wider"
            >
              Layanan Kami
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden pointer-events-none z-10">
          <svg className="absolute bottom-0 w-full h-full text-slate-50 dark:text-[#0b0f19]" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <section 
        ref={tickerRef}
        className={`relative z-10 w-full overflow-hidden border-y border-slate-200/60 dark:border-transparent bg-white/40 dark:bg-slate-950/40 py-10 transition-all duration-1000 transform ${
          isTickerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        <div className="flex w-[200%] animate-infinite-scroll hover:[animation-play-state:paused] transition-all duration-300">
          {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
            <div 
              key={index} 
              onClick={() => handleTechClick(tech.serviceIndex)}
              className="flex items-center gap-3.5 mx-14 text-base md:text-lg text-slate-600 dark:text-gray-400 font-bold tracking-wide shrink-0 transition-all duration-300 hover:text-emerald-600 dark:hover:text-cyan-400 cursor-pointer hover:scale-105"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 dark:border border-slate-400 dark:border-slate-800 shadow-inner">
                {tech.icon}
              </div>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section 
        id="services" 
        ref={servicesRef}
        className={`max-w-6xl mx-auto px-6 scroll-mt-28 relative z-10 transition-all duration-1000 transform ${
          isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-3 mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Layanan Utama</h2>
          <p className="text-slate-650 dark:text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Kami menyediakan ekosistem layanan teknologi yang menyeluruh untuk mendukung pertumbuhan bisnis Anda di era modern.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group glass-panel p-8 rounded-2xl flex flex-col sm:flex-row gap-6 transition-all duration-550 relative overflow-hidden ${
                activeService !== null
                  ? index === activeService
                    ? 'border-emerald-500/50 dark:border-cyan-400 scale-[1.05] shadow-[0_0_40px_rgba(16,185,129,0.15)] dark:shadow-[0_0_40px_rgba(6,182,212,0.35)] ring-2 ring-emerald-500/20 dark:ring-cyan-500/30 bg-white/90 dark:bg-slate-950/80 opacity-100 z-10'
                    : 'opacity-25 scale-95 blur-[0.5px] grayscale-[30%] pointer-events-none'
                  : `glass-panel-hover ${service.color}`
              } animate-slide-up`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute top-3 right-3 text-[9px] uppercase font-bold tracking-widest text-slate-500 border border-slate-200 dark:border-slate-850 px-2 py-0.5 rounded bg-slate-100/50 dark:bg-slate-900/30">
                {service.badge}
              </div>
              <div className={`p-4 bg-slate-100 dark:bg-slate-900/80 rounded-xl h-fit border w-fit shrink-0 transition-all duration-300 ${
                index === activeService ? 'border-emerald-500/50 dark:border-cyan-500/50 bg-white dark:bg-slate-950 text-emerald-600 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-800 group-hover:border-emerald-500/35 dark:group-hover:border-cyan-500/30 group-hover:bg-slate-50 dark:group-hover:bg-slate-950'
              }`}>
                {service.icon}
              </div>
              <div className="space-y-3">
                <h3 className={`text-xl font-bold transition-colors duration-300 relative w-fit ${
                  index === activeService ? 'text-emerald-600 dark:text-cyan-400' : 'text-slate-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-cyan-400'
                }`}>
                  {service.title}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-emerald-500 dark:bg-cyan-400 transform transition-transform duration-300 origin-left ${
                    index === activeService ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section 
        ref={livePulseRef}
        className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 transform ${
          isLivePulseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-3 mb-16 relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex justify-center items-center gap-3 text-slate-900 dark:text-white">
            <Activity className="w-8 md:w-10 h-8 md:h-10 text-emerald-600 dark:text-cyan-400 animate-pulse" />
            <span>Nusantara Live</span>
          </h2>
          <p className="text-slate-650 dark:text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Integrasi real-time status pengembangan infrastruktur dan aktivitas kode repositori Nusantara Digital.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 font-heading">GitHub DevOps</h3>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  Repository
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-light">Status real-time kontribusi.</p>
            </div>

            {repoLoading ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-emerald-650 dark:text-cyan-400 animate-spin" />
                <p className="text-xs text-slate-500 dark:text-gray-400">Sinkronisasi repositori...</p>
              </div>
            ) : (
              repoStats && (
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                      <p className="text-[9px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Stars</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-gray-200 mt-0.5">{repoStats.stars}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <GitFork className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                      <p className="text-[9px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Forks</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-gray-200 mt-0.5">{repoStats.forks}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Pembaruan Kode Terakhir</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-gray-200 truncate">{repoStats.lastPush}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 font-heading">Tech Distribution</h3>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  Languages
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-light">File kode program proyek.</p>
            </div>

            {repoLoading ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-emerald-650 dark:text-cyan-400 animate-spin" />
                <p className="text-xs text-slate-500 dark:text-gray-400">Menghitung pembagian...</p>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="space-y-2.5">
                    {repoLanguages.map((lang, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-gray-300">
                          <span>{lang.name}</span>
                          <span>{lang.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              lang.name === 'JavaScript' ? 'bg-amber-500' :
                              lang.name === 'CSS' ? 'bg-indigo-500' :
                              lang.name === 'HTML' ? 'bg-orange-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${lang.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 font-heading">Tech News</h3>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  Insights
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-light">Wawasan artikel pemrograman terkini.</p>
            </div>

            {loadingNews ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-emerald-650 dark:text-cyan-400 animate-spin" />
                <p className="text-xs text-slate-500 dark:text-gray-400">Sinkronisasi artikel...</p>
              </div>
            ) : (
              <div className="space-y-3.5 mt-6">
                {newsFeed.map((news, idx) => (
                  <a 
                    key={idx}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-bold text-slate-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-cyan-400 transition-colors duration-300 truncate"
                    title={news.title}
                  >
                    • {news.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 font-heading">NOC Gateway</h3>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse flex items-center gap-1">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-light">Status operasional klaster server.</p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-gray-300 border-b border-slate-100 dark:border-slate-850/60 pb-2">
                <span className="font-light">Cloud API Gateway</span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  99.9%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-gray-300 border-b border-slate-100 dark:border-slate-850/60 pb-2">
                <span className="font-light">Tangerang Database Node</span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-gray-300">
                <span className="font-light">Web Deployment Cluster</span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className={`max-w-6xl mx-auto px-6 relative z-10 transition-all duration-1000 transform ${
          isTeamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-3 mb-24 relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex justify-center items-center gap-3 text-slate-900 dark:text-white">
            <Users className="w-8 md:w-10 h-8 md:h-10 text-emerald-600 dark:text-cyan-400 animate-pulse" />
            <span>Tim Profesional Kami</span>
          </h2>
          <p className="text-slate-650 dark:text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Di balik setiap inovasi, terdapat tim ahli berdedikasi tinggi yang siap merealisasikan visi digital Anda.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
          
          {isOfflineMode && (
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-emerald-500/10 dark:bg-cyan-500/10 border border-emerald-500/20 dark:border-cyan-500/20 text-emerald-600 dark:text-cyan-400 rounded font-bold animate-pulse">
              Demo
            </span>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl space-y-4 animate-pulse">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
                <div className="h-6 bg-slate-250 dark:bg-slate-850 rounded w-2/3 mx-auto" />
                <div className="h-4 bg-slate-250 dark:bg-slate-850 rounded w-1/2 mx-auto" />
                <div className="h-4 bg-slate-250 dark:bg-slate-850 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.id} 
                className="group glass-panel p-6 rounded-2xl text-center hover:border-emerald-500/35 dark:hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                <div className="relative w-28 h-28 mx-auto mb-6 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={member.avatar} 
                    alt={`${member.first_name} ${member.last_name}`} 
                    className="relative w-full h-full object-cover rounded-full border-2 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 z-10 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {member.first_name} {member.last_name}
                </h3>
                <p className="text-emerald-600 dark:text-cyan-400 text-xs font-semibold tracking-wider uppercase mt-1.5 mb-4">
                  {member.role}
                </p>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-850 text-xs text-slate-500 dark:text-gray-500 font-light flex items-center justify-center gap-1.5 group-hover:text-emerald-600 dark:group-hover:text-cyan-400/80 transition-colors duration-300">
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
