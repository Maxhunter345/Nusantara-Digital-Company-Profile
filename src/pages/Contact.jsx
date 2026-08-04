import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Sun, Cloud, CloudRain, CloudLightning, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fallbackWeather = {
    temperature_2m: 29,
    apparent_temperature: 33,
    relative_humidity_2m: 78,
    wind_speed_10m: 12,
    weather_code: 1
  };

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-6.2562&longitude=106.6184&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m')
      .then((res) => {
        if (!res.ok) throw new Error('Cuaca gagal dimuat');
        return res.json();
      })
      .then((data) => {
        setWeather(data.current);
        setWeatherLoading(false);
      })
      .catch((err) => {
        console.warn("Weather API failed, falling back to local dataset: ", err);
        setWeather(fallbackWeather);
        setWeatherLoading(false);
      });
  }, []);

  const getWeatherDetails = (code) => {
    if (code === 0) return { desc: 'Cerah', icon: <Sun className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '20s' }} /> };
    if ([1, 2, 3].includes(code)) return { desc: 'Cerah Berawan', icon: <Cloud className="w-8 h-8 text-sky-300 animate-bounce" style={{ animationDuration: '4s' }} /> };
    if ([45, 48].includes(code)) return { desc: 'Berkabut', icon: <Cloud className="w-8 h-8 text-gray-400" /> };
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { desc: 'Hujan', icon: <CloudRain className="w-8 h-8 text-cyan-400" /> };
    if ([95, 96, 99].includes(code)) return { desc: 'Badai Petir', icon: <CloudLightning className="w-8 h-8 text-indigo-400 animate-pulse" /> };
    return { desc: 'Berawan', icon: <Cloud className="w-8 h-8 text-gray-300" /> };
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
    <div className="max-w-6xl mx-auto px-6 pb-20 space-y-20 animate-slide-up relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="text-center space-y-3 mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading">Hubungi Kami</h1>
        <p className="text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
          Punya pertanyaan atau ingin memulai proyek baru? Tim kami siap melayani dan memberikan solusi IT terbaik untuk Anda.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-xl flex items-center gap-4 border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telepon</h4>
                <p className="text-xs sm:text-sm font-bold text-gray-200 mt-0.5 whitespace-nowrap">(021) 5422-0808</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl flex items-center gap-4 border-slate-800 hover:border-emerald-500/30 transition-all duration-300">
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</h4>
                <p className="text-xs sm:text-sm font-bold text-gray-200 mt-0.5 whitespace-nowrap">info@nusantara.id</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl flex items-center gap-4 border-slate-800 hover:border-indigo-500/30 transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kantor</h4>
                <p className="text-xs sm:text-sm font-bold text-gray-200 mt-0.5 whitespace-nowrap">Tangerang, Banten</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border-slate-800 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-gray-100 mb-6 font-heading">Kirim Pesan</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-gray-200 text-sm transition-all duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alamat Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-gray-200 text-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subjek / Topik</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Pengembangan Website / Konsultasi IT"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-gray-200 text-sm transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pesan Anda</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tuliskan detail kebutuhan IT bisnis Anda disini..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-gray-200 text-sm transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full btn-neon py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-bold rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest"
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
              <div className="absolute inset-0 bg-slate-950/98 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fade-in z-20">
                <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-100 font-heading">Pesan Terkirim!</h3>
                <p className="text-gray-400 text-sm max-w-sm font-light">
                  Terima kasih sudah menghubungi kami. Tim Nusantara Digital akan segera merespon pesan Anda melalui email.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-650 rounded-lg text-xs text-gray-300 hover:text-white transition duration-300 tracking-wider uppercase"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-6 rounded-2xl border-slate-800 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-100 font-heading">Cuaca Live di HQ</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-light">Tangerang, Banten (UMN Campus)</p>
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-pulse">
                Live
              </span>
            </div>

            {weatherLoading && (
              <div className="py-8 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs text-gray-400">Memuat cuaca terkini...</p>
              </div>
            )}

            {!weatherLoading && weather && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner">
                    {getWeatherDetails(weather.weather_code).icon}
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-gray-100 tracking-tight font-heading">
                      {Math.round(weather.temperature_2m)}°C
                    </p>
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      {getWeatherDetails(weather.weather_code).desc}
                    </p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-gray-400 space-y-1 font-light">
                  <p>Terasa seperti: <span className="font-semibold text-gray-200">{Math.round(weather.apparent_temperature)}°C</span></p>
                  <p>Kelembapan: <span className="font-semibold text-gray-200">{weather.relative_humidity_2m}%</span></p>
                  <p>Angin: <span className="font-semibold text-gray-200">{weather.wind_speed_10m} km/j</span></p>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel p-2 rounded-2xl border-slate-800 overflow-hidden h-[335px] flex flex-col relative group shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-gray-400 font-light">
              <span className="font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> Universitas Multimedia Nusantara</span>
              <span className="text-[10px]">BSD City, Tangerang</span>
            </div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.051493630653!2d106.61592317589578!3d-6.256925193731458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb56b2568ec7%3A0x1d5e3efda8321682!2sUniversitas%20Multimedia%20Nusantara!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              className="w-full h-full border-0 grayscale invert-[0.9] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 rounded-b-xl"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kantor Nusantara Digital"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
