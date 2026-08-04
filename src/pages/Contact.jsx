import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, GitFork, Star, Info, Activity, RefreshCw, BookOpen } from 'lucide-react';

export default function Contact({ theme }) {
  const [activeTab, setActiveTab] = useState('devops');
  const [repoStats, setRepoStats] = useState(null);
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);
  
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchDevOpsData = async () => {
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
        }),
        status: 'Active'
      });

      const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
      const parsedLangs = Object.entries(langData)
        .map(([name, bytes]) => ({
          name,
          percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0
        }))
        .sort((a, b) => b.percentage - a.percentage);

      setRepoLanguages(parsedLangs.length > 0 ? parsedLangs : [
        { name: 'JavaScript', percentage: 74 },
        { name: 'CSS', percentage: 18 },
        { name: 'HTML', percentage: 8 }
      ]);
    } catch (err) {
      setRepoStats({
        stars: 1,
        forks: 0,
        lastPush: new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }),
        status: 'Offline Mode'
      });
      setRepoLanguages([
        { name: 'JavaScript', percentage: 74 },
        { name: 'CSS', percentage: 18 },
        { name: 'HTML', percentage: 8 }
      ]);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchNewsData = async () => {
    try {
      const newsRes = await fetch('https://dev.to/api/articles?tag=programming&per_page=3');
      if (!newsRes.ok) throw new Error('News fetch failed');
      const newsData = await newsRes.json();

      const parsedNews = newsData.map(article => ({
        title: article.title,
        url: article.url,
        readablePublishDate: article.readable_publish_date,
        readingTime: article.reading_time_minutes
      }));

      setNewsFeed(parsedNews);
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

  const loadAllData = async () => {
    await Promise.all([fetchDevOpsData(), fetchNewsData()]);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-14 pb-20 space-y-8 animate-slide-up relative overflow-hidden">
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-emerald-500/5 dark:bg-cyan-500/6 rounded-full blur-[110px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[10%] right-[10%] w-[380px] h-[380px] bg-indigo-500/4 dark:bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none animate-float-medium delay-1000" />

      <div 
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 z-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="text-center space-y-3 mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">Hubungi Kami</h1>
        <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
          Punya pertanyaan atau ingin memulai proyek baru? Tim kami siap melayani dan memberikan solusi IT terbaik untuk Anda.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
        <div className="flex flex-col justify-between gap-6">
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-cyan-500/30 transition-all duration-300 flex-1">
            <div className="p-4 bg-emerald-500/10 dark:bg-cyan-500/10 rounded-xl text-emerald-600 dark:text-cyan-400 border border-emerald-500/20 dark:border-cyan-500/20 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Telepon</h4>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 mt-1">(021) 5422-0808</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 flex-1">
            <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Email</h4>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 mt-1 break-all">info@nusantara.id</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center gap-5 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 flex-1">
            <div className="p-4 bg-emerald-500/10 dark:bg-indigo-500/10 rounded-xl text-emerald-600 dark:text-indigo-400 border border-emerald-500/20 dark:border-indigo-500/20 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Kantor Pusat</h4>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 mt-1">BSD City, Tangerang, Banten</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-2 rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col relative group shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)] h-full min-h-[380px]">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 font-light">
            <span className="font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-cyan-400" /> Universitas Multimedia Nusantara</span>
            <span className="text-[10px]">Tangerang</span>
          </div>
          
          <iframe 
            src="https://maps.google.com/maps?q=Universitas%20Multimedia%20Nusantara&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            className={`w-full h-full border-0 transition-all duration-500 rounded-b-xl ${
              theme === 'dark' 
                ? 'grayscale invert-[0.9] opacity-80 group-hover:opacity-100 group-hover:grayscale-0' 
                : 'opacity-90 group-hover:opacity-100'
            }`}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Kantor Nusantara Digital"
          ></iframe>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10 mt-8">
        <div className="lg:col-span-8 flex">
          <div className="glass-panel p-8 rounded-2xl border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)] flex-1 flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-6 font-heading">Kirim Pesan</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-emerald-500/20 dark:focus:ring-cyan-500/30 text-slate-900 dark:text-gray-200 text-sm transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Alamat Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-emerald-500/20 dark:focus:ring-cyan-500/30 text-slate-900 dark:text-gray-200 text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Subjek / Topik</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Pengembangan Website / Konsultasi IT"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-emerald-500/20 dark:focus:ring-cyan-500/30 text-slate-900 dark:text-gray-200 text-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Pesan Anda</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tuliskan detail kebutuhan IT bisnis Anda disini..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-emerald-500/20 dark:focus:ring-cyan-500/30 text-slate-900 dark:text-gray-200 text-sm transition-all duration-300 resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full btn-neon py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 dark:text-gray-950 font-bold rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest mt-5"
              >
                {formSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>

            {formSubmitted && (
              <div className="absolute inset-0 bg-white/98 dark:bg-slate-950/98 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fade-in z-20">
                <CheckCircle className="w-16 h-16 text-emerald-500 dark:text-emerald-400 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 font-heading">Pesan Terkirim!</h3>
                <p className="text-slate-650 dark:text-gray-400 text-sm max-w-sm font-light">
                  Terima kasih sudah menghubungi kami. Tim Nusantara Digital akan segera merespon pesan Anda melalui email.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-650 rounded-lg text-xs text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition duration-300 tracking-wider uppercase"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 flex">
          <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(0,0,0,0.2)] flex-1 min-h-[480px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 dark:bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 font-heading">Nusantara Live Center</h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 font-light">Ecosystem Operations Node</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 rounded-lg transition duration-300 cursor-pointer disabled:opacity-50"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                  </button>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse flex items-center gap-1 shrink-0">
                    <Activity className="w-2.5 h-2.5" />
                    Live
                  </span>
                </div>
              </div>

              <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('devops')}
                  className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 text-center cursor-pointer ${
                    activeTab === 'devops' 
                      ? 'border-emerald-500 dark:border-cyan-500 text-emerald-600 dark:text-cyan-400' 
                      : 'border-transparent text-slate-400 dark:text-gray-400 hover:text-slate-650 dark:hover:text-gray-200'
                  }`}
                >
                  DevOps Node
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 text-center cursor-pointer ${
                    activeTab === 'news' 
                      ? 'border-emerald-500 dark:border-cyan-500 text-emerald-600 dark:text-cyan-400' 
                      : 'border-transparent text-slate-400 dark:text-gray-400 hover:text-slate-650 dark:hover:text-gray-200'
                  }`}
                >
                  Tech News
                </button>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-center py-4">
              {activeTab === 'devops' ? (
                loadingStats || refreshing ? (
                  <div className="flex flex-col items-center justify-center space-y-2 py-8">
                    <Loader2 className="w-8 h-8 text-emerald-650 dark:text-cyan-400 animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-gray-400">Sinkronisasi repositori...</p>
                  </div>
                ) : (
                  repoStats && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                          <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                          <p className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Stars</p>
                          <p className="text-lg font-bold text-slate-800 dark:text-gray-200 mt-0.5">{repoStats.stars}</p>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                          <GitFork className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                          <p className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Forks</p>
                          <p className="text-lg font-bold text-slate-800 dark:text-gray-200 mt-0.5">{repoStats.forks}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800/80 pb-2">
                          <span>Languages</span>
                          <span>Share</span>
                        </div>
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

                      <div className="p-3 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left space-y-1">
                        <p className="text-[9px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">Pembaruan Kode Terakhir</p>
                        <p className="text-xs font-bold text-slate-800 dark:text-gray-200 truncate">{repoStats.lastPush}</p>
                      </div>
                    </div>
                  )
                )
              ) : (
                loadingNews || refreshing ? (
                  <div className="flex flex-col items-center justify-center space-y-2 py-8">
                    <Loader2 className="w-8 h-8 text-emerald-650 dark:text-cyan-400 animate-spin" />
                    <p className="text-xs text-slate-500 dark:text-gray-400">Sinkronisasi artikel...</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 animate-fade-in">
                    {newsFeed.map((news, idx) => (
                      <a 
                        key={idx}
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3.5 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl transition duration-300 group"
                      >
                        <div className="flex items-start gap-2.5">
                          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-cyan-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300" />
                          <div className="space-y-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-snug">
                              {news.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-450 dark:text-gray-400 font-light">
                              <span>{news.readablePublishDate}</span>
                              <span>•</span>
                              <span>{news.readingTime} mnt baca</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 dark:text-gray-450 font-light shrink-0">
              <span className="flex items-center gap-1"><Info className="w-3 h-3 text-slate-500" /> Node: BSD-01</span>
              <span>Uptime: 99.98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
