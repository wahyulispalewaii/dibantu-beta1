'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'motion/react';
import { Moon, Sun, Menu, Check, Star, ChevronDown, CheckCircle2, Layout, Image as ImageIcon, FileText, ArrowRight, BookOpen, PenTool, Instagram, MonitorSmartphone, Layers } from 'lucide-react';

const WA_NUMBER = "6281234567890";

function buildWaLink(message: string) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
}

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ target }: { target: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 1400;

      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

const pricingData = [
  {
    title: "Web Development",
    packages: [
      { name: "Essentials", price: "Rp500rb", desc: "Landing page sederhana, portofolio tunggal.", features: ["1 Halaman Utama", "Responsive Design", "1x Minor Revisi", "Waktu 3-5 Hari", "Hosting Basic"] },
      { name: "Standard App", price: "Rp1.5jt", desc: "Company profile profesional dengan multi-halaman.", features: ["Hingga 5 Halaman", "SEO Basic", "3x Revisi Minor", "Waktu 7-10 Hari", "Bantuan Setup CMS"] },
      { name: "Pro Complex", price: "Rp5jt+", desc: "Web app custom, e-commerce, atau sistem custom.", features: ["Halaman & Fitur Custom", "Backend / Database", "Revisi Fleksibel", "Dedicated Support", "Full Source Code"] },
    ]
  },
  {
    title: "Logo Design",
    packages: [
      { name: "Essentials", price: "Rp250rb", desc: "Logo simpel, modern, dan minimalis.", features: ["2 Alternatif Desain Logo", "1x Minor Revisi", "Format PNG/JPG", "Waktu 3 Hari", "Tanpa Source File"] },
      { name: "Standard App", price: "Rp750rb", desc: "Logo profesional beserta elemen identitas.", features: ["4 Alternatif Desain Logo", "3x Revisi Minor", "Waktu 5-7 Hari", "Mockup 3D Basic", "Termasuk Source File"] },
      { name: "Pro Complex", price: "Rp2.5jt+", desc: "Brand identity kit lengkap untuk startup/corporate.", features: ["Full Brand Guideline", "Desain Kop/Kartu", "Revisi Fleksibel", "Social Media Templates", "Hak Milik Komersial"] },
    ]
  },
  {
    title: "Academic Writing",
    packages: [
      { name: "Essentials", price: "Rp150rb", desc: "Penyuntingan & proofreading dokumen akademis.", features: ["Pengecekan Typo & EYD", "Pengecekan Format", "1x Minor Revisi", "Waktu 3 Hari", "Feedback & Catatan"] },
      { name: "Standard App", price: "Rp400rb", desc: "Bantuan penyusunan draft artikel akademik.", features: ["Penataan Struktur", "Cek Plagiasi Basic", "3x Revisi Minor", "Waktu 7 Hari", "Bantuan Referensi"] },
      { name: "Pro Complex", price: "Rp1jt+", desc: "Pendampingan penyusunan komprehensif.", features: ["Pendampingan Intensif", "Bebas Plagiasi", "Revisi Fleksibel", "Konsultasi VIP", "Persiapan Publikasi"] },
    ]
  },
  {
    title: "Research Proposal",
    packages: [
      { name: "Essentials", price: "Rp200rb", desc: "Bantuan penyusunan bab pendahuluan/latar belakang.", features: ["Review Topik", "1x Minor Revisi", "Format Akademik", "Waktu 3 Hari", "Konsultasi Teks"] },
      { name: "Standard App", price: "Rp600rb", desc: "Penyusunan bab 1-3 lengkap dan terstruktur.", features: ["Lengkap Bab 1-3", "Struktur Metodologi", "3x Revisi Minor", "Waktu 10 Hari", "Bantuan Literatur"] },
      { name: "Pro Complex", price: "Rp1.5jt+", desc: "Pendampingan penyusunan proposal hibah riset.", features: ["RAB & Timeline", "Analisis Justifikasi", "Revisi Fleksibel", "Konsultasi Online", "Format Pengajuan"] },
    ]
  },
  {
    title: "Graphic Design",
    packages: [
      { name: "Essentials", price: "Rp100rb", desc: "Desain aset tunggal, poster, banner, atau flyer.", features: ["1 Desain Aset Tunggal", "1x Minor Revisi", "Format High-Res", "Waktu 2-3 Hari", "Ide Konsep Basic"] },
      { name: "Standard App", price: "Rp300rb", desc: "Desain carousel materi, presentasi, atau deck pitch.", features: ["Hingga 5 Slide Carousel", "Ide Layout Menarik", "3x Revisi Minor", "Waktu 4 Hari", "Format Lengkap"] },
      { name: "Pro Complex", price: "Rp1jt+", desc: "Paket retainer desain kampanye bulanan.", features: ["Desain Custom", "Prioritas Antrean", "Revisi Fleksibel", "Dedicated Designer", "Full Source Files"] },
    ]
  }
];

export default function Page() {
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Halo dibantu.id! Saya ingin memulai proyek baru.\n\nNama: ${data.get('fname')}\nKontak: ${data.get('fcontact')}\nLayanan: ${data.get('fservice')}\nEstimasi Budget: ${data.get('fbudget')}\nDetail Proyek: ${data.get('fdetail')}`;
    window.open(buildWaLink(message), '_blank', 'noopener');
  };

  return (
    <main className="min-h-screen font-body flex flex-col w-full overflow-hidden">
      
      {/* NAVBAR */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full ${scrolled ? 'glass-strong shadow-lg' : ''}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between h-20 w-full">
            <a href="#hero" className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight shrink-0">
              <span className="w-8 h-8 rounded-xl btn-grad flex items-center justify-center text-white text-sm font-extrabold shadow-sm">D</span>
              dibantu<span className="gradient-text">.id</span>
            </a>

            <nav className="hidden lg:flex flex-row items-center justify-center gap-8 text-sm font-medium text-inkmuted flex-1">
              <a href="#services" className="hover:text-ink transition-colors">Layanan</a>
              <a href="#process" className="hover:text-ink transition-colors">Proses</a>
              <a href="#portfolio" className="hover:text-ink transition-colors">Portfolio</a>
              <a href="#why" className="hover:text-ink transition-colors">Kenapa Kami</a>
              <a href="#pricing" className="hover:text-ink transition-colors">Harga</a>
              <a href="#contact" className="hover:text-ink transition-colors">Kontak</a>
            </nav>

            <div className="flex flex-row items-center justify-end gap-3 shrink-0">
              <button onClick={toggleTheme} aria-label="Toggle theme" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-accentCyan/50 transition-colors">
                {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <a href={buildWaLink("Halo dibantu.id! Saya ingin tanya-tanya soal proyek.")} target="_blank" rel="noopener" className="hidden sm:inline-flex btn-grad text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap">
                Chat WhatsApp
              </a>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Array */}
        {isMenuOpen && (
          <div className="lg:hidden glass-strong mx-4 mt-2 rounded-2xl overflow-hidden flex flex-col p-4 gap-1 text-sm font-medium shadow-lg z-50">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Layanan</a>
            <a href="#process" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Proses</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Portfolio</a>
            <a href="#why" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Kenapa Kami</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Harga</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-xl hover:bg-surface">Kontak</a>
            <a href={buildWaLink("Halo dibantu.id! Saya ingin tanya-tanya soal proyek.")} target="_blank" rel="noopener" className="mt-2 btn-grad text-white text-center font-semibold px-5 py-3 rounded-xl w-full">Chat WhatsApp</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full flex-1 flex flex-col justify-center">
        <div className="blob w-[480px] h-[480px] bg-accentCyan -top-32 -left-32"></div>
        <div className="blob w-[420px] h-[420px] bg-accentPurple top-10 right-0" style={{ animationDelay: '-4s' }}></div>
        <div className="blob w-[360px] h-[360px] bg-accentBlue bottom-0 left-1/3" style={{ animationDelay: '-8s' }}></div>

        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 w-full max-w-2xl lg:max-w-none text-center lg:text-left z-10 flex flex-col items-center lg:items-start">
            <Reveal className="inline-flex items-center gap-2 glass rounded-full pl-1.5 pr-4 py-1.5 text-xs font-medium text-inkmuted mb-6">
              <span className="w-5 h-5 rounded-full btn-grad flex items-center justify-center text-white text-[10px] shrink-0"><Star className="w-3 h-3 fill-current" /></span>
              <span className="whitespace-nowrap sm:whitespace-normal">Digital Agency for Students, UMKM & Startups</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
                We Build Digital Identity <br className="hidden sm:block" />
                That <span className="gradient-text">Converts</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-lg text-inkmuted max-w-xl leading-relaxed mx-auto lg:mx-0">
                Dari website, logo, naskah ilmiah, sampai konten visual — satu tim kreatif untuk semua kebutuhan digital dan akademikmu. Rapi, cepat, dan profesional.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href={buildWaLink("Halo dibantu.id! Saya ingin mulai sebuah proyek.")} target="_blank" rel="noopener" className="w-full sm:w-auto btn-grad text-white font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-2">
                Start Project <ArrowRight className="w-4 h-4 font-bold" />
              </a>
              <a href="#portfolio" className="w-full sm:w-auto text-center btn-outline font-semibold px-8 py-3.5 rounded-full">
                View Portfolio
              </a>
            </Reveal>

            <Reveal delay={0.4} className="mt-8 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs md:text-sm text-inkmuted">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentCyan"></span>100+ Proyek selesai</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentBlue"></span>Respon &lt; 1 jam</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accentPurple"></span>Revisi fleksibel</span>
            </Reveal>
          </div>

          <div 
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({x: 0, y: 0})}
            className="flex-1 w-full max-w-[500px] lg:max-w-none relative h-[380px] sm:h-[480px] lg:h-[500px] z-10 mt-8 lg:mt-0"
          >
            {/* browser/website mockup */}
            <motion.div 
              style={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
              className="float-card glass-strong absolute left-0 sm:left-4 top-4 sm:top-10 w-[80%] sm:w-[75%] rounded-2xl p-3 shadow-2xl z-20"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span className="ml-3 h-2 w-24 rounded-full bg-white/10 hidden sm:block"></span>
              </div>
              <div className="device-screen rounded-xl h-40 sm:h-52 p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2.5 w-2/3 rounded-full bg-white/40"></div>
                  <div className="h-2 w-1/2 rounded-full bg-white/20"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 sm:h-7 w-16 sm:w-20 rounded-full btn-grad"></div>
                  <div className="h-6 sm:h-7 w-16 sm:w-20 rounded-full border border-white/30"></div>
                </div>
              </div>
            </motion.div>

            {/* brand badge mockup */}
            <motion.div 
              style={{ x: mousePos.x * 60, y: mousePos.y * 60 }}
              className="float-card glass-strong absolute right-0 sm:right-4 -top-2 sm:top-0 w-28 sm:w-36 rounded-2xl p-3 sm:p-4 shadow-2xl z-30" 
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 btn-grad opacity-80"></div>
                <div className="relative z-10 font-heading font-bold text-lg text-white">N</div>
              </div>
              <p className="text-[10px] sm:text-xs text-center text-inkmuted font-medium break-words">Brand Kit</p>
            </motion.div>

            {/* document proposal mockup */}
            <motion.div 
              style={{ x: mousePos.x * 45, y: mousePos.y * 45 }}
              className="float-card glass-strong absolute right-0 sm:right-6 bottom-4 w-[65%] sm:w-[58%] rounded-2xl p-4 shadow-2xl z-10"
            >
              <div className="flex flex-row items-center justify-between mb-3 gap-2">
                <div className="h-2.5 w-1/2 rounded-full bg-white/30 truncate"></div>
                <span className="text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full bg-accentCyan/20 text-accentCyan font-semibold shrink-0">Draft</span>
              </div>
              <div className="space-y-1.5 flex flex-col w-full">
                <div className="h-1.5 w-full rounded-full bg-white/10"></div>
                <div className="h-1.5 w-[90%] rounded-full bg-white/10"></div>
                <div className="h-1.5 w-[80%] rounded-full bg-white/10"></div>
                <div className="h-1.5 w-[60%] rounded-full bg-white/10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section id="trust" className="py-12 border-y border-line bg-surface/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.2em] text-inkmuted mb-8 font-semibold">
              Dipercaya ratusan klien di seluruh indonesia
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden w-full flex flex-row mask-fade">
            <div className="marquee-track flex flex-row gap-12 items-center opacity-70 py-2">
              {[1, 2].map((group) => (
                <React.Fragment key={group}>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Kopi Senja</span>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Berkah Snack Co.</span>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Universitas X Lab</span>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Startup Z</span>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Toko Aksara</span>
                  <span className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">Riset Nusantara</span>
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 sm:gap-12 mt-12 w-full">
            <Reveal delay={0.2} className="flex-1 flex flex-col items-center justify-center min-w-[120px]">
              <p className="font-heading font-extrabold text-4xl gradient-text"><AnimatedCounter target={100} />+</p>
              <p className="text-sm text-inkmuted mt-1 whitespace-nowrap">Proyek Selesai</p>
            </Reveal>
            <Reveal delay={0.3} className="flex-1 flex flex-col items-center justify-center min-w-[120px]">
              <p className="font-heading font-extrabold text-4xl gradient-text"><AnimatedCounter target={4} />-7</p>
              <p className="text-sm text-inkmuted mt-1 whitespace-nowrap">Hari Pengerjaan</p>
            </Reveal>
            <Reveal delay={0.4} className="flex-1 flex flex-col items-center justify-center min-w-[120px]">
              <p className="font-heading font-extrabold text-4xl gradient-text"><AnimatedCounter target={50} />+</p>
              <p className="text-sm text-inkmuted mt-1 whitespace-nowrap">Klien Puas</p>
            </Reveal>
            <Reveal delay={0.5} className="flex-1 flex flex-col items-center justify-center min-w-[120px]">
              <p className="font-heading font-extrabold text-4xl gradient-text"><AnimatedCounter target={100} />%</p>
              <p className="text-sm text-inkmuted mt-1 whitespace-nowrap">Custom Design</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <Reveal><p className="text-xs uppercase tracking-[0.2em] text-accentCyan font-bold mb-3">Layanan</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">Satu tim, beragam skill, <span className="gradient-text">nol ribet.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-inkmuted text-base sm:text-lg">Apapun kebutuhanmu — bikin bisnis, kuliah, atau startup — tim kami siap eksekusi cepat dari nol sampai jadi.</p></Reveal>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 w-full">
            {[
              { title: "Web Development", icon: <MonitorSmartphone className="w-6 h-6" />, desc: "Landing page, company profile, dan web app yang dirancang responsive, SEO friendly, dan siap mengkonversi." },
              { title: "Logo & Brand", icon: <Layers className="w-6 h-6" />, desc: "Identitas visual brand modern — logo premium yang membedakan bisnismu di tengah persaingan pasar yang padat." },
              { title: "Academic Writing", icon: <BookOpen className="w-6 h-6" />, desc: "Penyusunan naskah atau artikel ilmiah yang terstruktur logis, bebas typo, dan sesuai standar jurnal sasaran." },
              { title: "Research Proposal", icon: <FileText className="w-6 h-6" />, desc: "Rancangan proposal skripsi, tesis, maupun hibah riset yang siap dipresentasikan dengan tingkat persetujuan tinggi." },
              { title: "Graphic Design", icon: <PenTool className="w-6 h-6" />, desc: "Aset feed media sosial, deck presentasi, poster, dan elemen visual ciamik untuk mendongkrak brand awareness." }
            ].map((srv, i) => (
              <Reveal key={i} delay={0.1 * i} className="flex-1 basis-[100%] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] flex flex-col glass rounded-3xl p-6 sm:p-8 border border-line card-hover">
                <div className="w-12 h-12 rounded-2xl btn-grad flex items-center justify-center mb-6 text-white shadow-lg shrink-0">
                  {srv.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{srv.title}</h3>
                <p className="text-sm text-inkmuted leading-relaxed mb-6 flex-1">{srv.desc}</p>
                <a href="#contact" className="text-sm font-semibold gradient-text inline-flex items-center gap-1.5 mt-auto self-start hover:opacity-80 transition-opacity">
                  Mulai proyek <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Reveal>
            ))}

            {/* CTA Card merged directly into Grid Layout */}
            <Reveal delay={0.6} className="flex-1 basis-[100%] lg:basis-[calc(33.333%-16px)] flex flex-col bg-gradient-to-br from-accentCyan/15 via-accentBlue/10 to-accentPurple/15 rounded-3xl p-6 sm:p-8 border border-line card-hover">
              <h3 className="font-heading font-bold text-xl mb-3">Butuh paket komplit?</h3>
              <p className="text-sm text-inkmuted leading-relaxed mb-6 flex-1">Kombinasikan Web, Logo, & Konten dalam satu kontrak utuh dan lebih hemat.</p>
              <a href={buildWaLink("Halo, saya mau paket custom/bundling.")} target="_blank" rel="noopener" className="w-full btn-grad text-white font-semibold px-5 py-3.5 rounded-full inline-flex items-center justify-center text-sm shadow-md mt-auto">
                Diskusikan Paket
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/20 border-y border-line w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <div className="max-w-2xl mb-12 sm:mb-16 text-center sm:text-left">
            <Reveal><p className="text-xs uppercase tracking-[0.2em] text-accentCyan font-bold mb-3">Cara Kerja</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">Proses lugas, <span className="gradient-text">tanpa drama.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-inkmuted text-base sm:text-lg">Ketahui di mana posisi proyekmu setiap hari, mulai dari ide sampai rilis.</p></Reveal>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-6 w-full items-start lg:items-stretch">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[40px] right-[40px] h-px bg-gradient-to-r from-accentCyan via-accentBlue to-accentPurple opacity-30"></div>

            {[
              { num: "01", title: "Discovery", desc: "Konsultasi awal untuk mengetahui goal, budget, & batasan waktumu." },
              { num: "02", title: "Strategy", desc: "Kami menyusun blueprint, moodboard, atau outline kerangka kerja." },
              { num: "03", title: "Execution", desc: "Produksi berjalan, tim coding/desain/nulis secara intensif." },
              { num: "04", title: "Delivery", desc: "Pengiriman draft/file ke klien dengan kualitas nyaris final." },
              { num: "05", title: "Revision", desc: "Revisi detail akhir sampai memastikan output mencapai ekspektasi 100%." }
            ].map((step, i) => (
              <Reveal key={step.num} delay={0.1 * i} className="flex-1 flex flex-col items-start w-full relative z-10 px-4 lg:px-0">
                <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center mb-4 shadow-sm">
                  <span className="font-heading font-extrabold text-xl gradient-text">{step.num}</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-inkmuted leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
        <div className="blob w-[380px] h-[380px] bg-accentBlue -bottom-20 -right-20"></div>
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 items-center relative z-10">

          <div className="flex-1 flex flex-col w-full">
            <Reveal><p className="text-xs uppercase tracking-[0.2em] text-accentPurple font-bold mb-3">Kenapa Kami</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-10">Bukan sekadar vendor, <br/><span className="gradient-text">tapi partner.</span></h2></Reveal>

            <div className="flex flex-col gap-6 w-full">
              {[
                { title: "Fast response & delivery", desc: "Tim siap siaga membalas chat. Penyelesaian sesuai jadwal yang disepakati." },
                { title: "Clean modern aesthetic", desc: "Desain yang sedap dipandang, fungsional, dan relevan dengan tren masa kini." },
                { title: "Custom tailored service", desc: "Tidak mengandalkan template murahan. Semua disesuaikan dengan brief klien." }
              ].map((ft, i) => (
                <Reveal key={i} delay={0.1 * i} className="flex flex-row items-center gap-5 w-full bg-surface/20 p-4 rounded-2xl border border-line/30">
                  <div className="w-12 h-12 shrink-0 rounded-2xl glass flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-accentCyan" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-heading font-bold mb-1 text-base sm:text-lg">{ft.title}</h3>
                    <p className="text-sm sm:text-[15px] text-inkmuted leading-relaxed">{ft.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.3} className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="glass-strong rounded-[2rem] p-8 sm:p-12 border border-line bg-gradient-to-br from-bgsoft via-surface to-bgsoft w-full max-w-lg mx-auto">
              <p className="font-heading font-medium text-xl sm:text-2xl leading-relaxed text-center sm:text-left">
                “Kami percaya hasil kerja yang baik tidak harus memusingkan. Cukup <span className="gradient-text font-bold">jelas, rapi, dan tepat sasaran.</span>”
              </p>
              <div className="mt-8 flex flex-row items-center justify-center sm:justify-start gap-4">
                <div className="w-12 h-12 rounded-2xl btn-grad flex items-center justify-center text-white font-heading font-bold text-xl shadow-md">N</div>
                <div className="flex flex-col">
                  <p className="text-base font-bold">Direksi dibantu.id</p>
                  <p className="text-sm text-inkmuted">Creative Head</p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/10 border-y border-line w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <div className="max-w-3xl mx-auto text-center mb-10 flex flex-col items-center">
            <Reveal><p className="text-xs uppercase tracking-[0.2em] text-accentCyan font-bold mb-3">Harga</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">Harga transparan, <span className="gradient-text">bebas pusing.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-inkmuted text-base sm:text-lg">Setiap lini bisnis unik. Pilih layanan yang kamu butuhkan, dan sesuaikan paketnya.</p></Reveal>
          </div>

          {/* Service Tabs */}
          <Reveal delay={0.3} className="w-full mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
              {pricingData.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePricingTab(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activePricingTab === idx 
                      ? "bg-accentCyan/10 border-accentCyan text-accentCyan" 
                      : "border-line text-inkmuted hover:border-accentCyan/50 hover:text-ink hover:bg-surface/50"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8 lg:gap-6 items-stretch w-full">
            {(() => {
              const currentPackages = pricingData[activePricingTab].packages;
              return currentPackages.map((pkg, idx) => {
                const isStandard = pkg.name === "Standard App";
                
                return (
                  <Reveal key={`${activePricingTab}-${idx}`} delay={0.1 * (idx + 1)} className={`flex-1 basis-[100%] md:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-16px)] relative rounded-3xl p-8 flex flex-col w-full ${
                    isStandard 
                      ? "border-2 border-accentCyan/50 shadow-glow bg-gradient-to-b from-surface via-bgsoft to-bgsoft lg:-translate-y-4 z-10" 
                      : "glass border border-line hover:border-accentCyan/20 transition-colors"
                  }`}>
                    {isStandard && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 btn-grad text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap z-20">
                        Paling Laris
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-xl">{pkg.name}</h3>
                    <p className="text-sm sm:text-[15px] text-inkmuted mt-2 mb-6 flex-1">{pkg.desc}</p>
                    <div className="mb-6">
                      <p className="font-heading font-extrabold text-3xl sm:text-4xl text-text">{pkg.price}</p>
                      <p className="text-xs font-medium text-inkmuted mt-1 uppercase tracking-wider">Start From</p>
                    </div>
                    <ul className="mb-8 space-y-3 flex-1">
                      {pkg.features.map((itm, n) => (
                        <li key={n} className="flex flex-row items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-accentCyan shrink-0 stroke-2" />
                          <span className={`font-medium ${isStandard ? "text-ink" : ""}`}>{itm}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={buildWaLink(`Halo, saya minat layanan ${pricingData[activePricingTab].title} paket ${pkg.name}.`)} target="_blank" rel="noopener" className={`w-full text-center font-semibold px-5 py-3.5 rounded-xl transition-all ${
                      isStandard 
                        ? "btn-grad text-white shadow-lg hover:shadow-xl hover:scale-[1.02]" 
                        : "btn-outline hover:bg-surface"
                    }`}>
                      {isStandard ? `Pilih ${pkg.name}` : "Order Sekarang"}
                    </a>
                  </Reveal>
                );
              });
            })()}
          </div>

          <Reveal delay={0.5} className="w-full">
            <p className="text-xs sm:text-sm text-inkmuted text-center mt-10">Bisa Nego? Tentu. Kunjungi form di bawah untuk konsultasikan kondisi khususmu.</p>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA & FORM */}
      <section id="contact" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <Reveal className="w-full max-w-5xl bg-surface/30 glass-strong border border-line rounded-[2rem] p-8 sm:p-12 md:p-16 mb-16 text-center flex flex-col items-center relative overflow-hidden">
          <div className="blob w-[300px] h-[300px] bg-accentPurple -top-20 -left-20"></div>
          <div className="blob w-[200px] h-[200px] bg-accentCyan -bottom-10 -right-10"></div>
          
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl z-10 transition-colors">
            Berhenti pusing sendirian. <br/> <span className="gradient-text">Mari kita eksekusi.</span>
          </h2>
          <p className="mt-6 text-inkmuted text-lg max-w-2xl z-10">Satu langkah mudah dengan form ini, kami akan membaca kebutuhanmu sebelum chat WhatsApp dimulai.</p>
        </Reveal>

        <Reveal className="w-full max-w-3xl glass rounded-3xl p-6 sm:p-8 md:p-10 border border-line">
          <form className="flex flex-col sm:grid sm:grid-cols-2 gap-5 w-full" onSubmit={handleContactSubmit}>
            <div className="flex flex-col gap-2 w-full col-span-1">
              <label className="text-xs font-bold text-inkmuted uppercase tracking-wider">Nama Lengkap</label>
              <input name="fname" type="text" required placeholder="John Doe" className="w-full bg-surface/50 border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accentCyan focus:ring-1 focus:ring-accentCyan transition-all text-ink placeholder-inkmuted" />
            </div>
            
            <div className="flex flex-col gap-2 w-full col-span-1">
              <label className="text-xs font-bold text-inkmuted uppercase tracking-wider">Kontak (WA/Email)</label>
              <input name="fcontact" type="text" required placeholder="0812..." className="w-full bg-surface/50 border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accentCyan focus:ring-1 focus:ring-accentCyan transition-all text-ink placeholder-inkmuted" />
            </div>

            <div className="flex flex-col gap-2 w-full col-span-1">
              <label className="text-xs font-bold text-inkmuted uppercase tracking-wider">Layanan Utama</label>
              <select name="fservice" required className="w-full bg-surface/50 border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accentCyan focus:ring-1 focus:ring-accentCyan transition-all appearance-none text-ink overflow-hidden">
                <option value="" className="bg-bg">-- Pilih Jenis Layanan --</option>
                <option value="Web Development" className="bg-bg">Web Development</option>
                <option value="Logo/Brand" className="bg-bg">Logo / Brand Design</option>
                <option value="Academic Writing" className="bg-bg">Academic Writing</option>
                <option value="Research Proposal" className="bg-bg">Research Proposal</option>
                <option value="Custom Bundling" className="bg-bg">Gabungan / Lainnya</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full col-span-1">
              <label className="text-xs font-bold text-inkmuted uppercase tracking-wider">Range Anggaran</label>
              <select name="fbudget" className="w-full bg-surface/50 border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accentCyan focus:ring-1 focus:ring-accentCyan transition-all appearance-none text-ink overflow-hidden">
                <option value="Diskusi Dulu" className="bg-bg">Mari Diskusikan Dulu</option>
                <option value="Bawah 500rb" className="bg-bg">&lt; Rp 500.000</option>
                <option value="500rb - 1.5jt" className="bg-bg">Rp 500rb - Rp 1.5jt</option>
                <option value="Lebih dari 2jt" className="bg-bg">Di atas Rp 2 Juta</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full col-span-2">
              <label className="text-xs font-bold text-inkmuted uppercase tracking-wider">Ceritakan Detailnya</label>
              <textarea name="fdetail" rows={4} required placeholder="Saya butuh landing page modern untuk..." className="w-full bg-surface/50 border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accentCyan focus:ring-1 focus:ring-accentCyan transition-all resize-none text-ink placeholder-inkmuted"></textarea>
            </div>

            <div className="flex flex-col w-full col-span-2 mt-2">
              <button type="submit" className="w-full btn-grad text-white font-bold text-base px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform">
                Kirim Brief ke WhatsApp <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-inkmuted/70 text-center mt-4">Transmisi aman. Tombol ini hanya akan membuka aplikasi WhatsApp Anda tanpa menyimpan data ke server.</p>
            </div>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-line pb-8 pt-16 px-4 sm:px-6 lg:px-8 bg-bg mt-auto w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col lg:flex-row flex-wrap gap-12 lg:gap-8 pb-16 justify-between w-full">
            <div className="flex flex-col flex-1 min-w-[250px] lg:max-w-xs">
              <span className="flex items-center gap-2 font-heading font-bold text-xl mb-4">
                <span className="w-8 h-8 rounded-xl btn-grad flex items-center justify-center text-white text-sm font-extrabold shadow-sm shrink-0">N</span>
                dibantu<span className="gradient-text">.id</span>
              </span>
              <p className="text-sm text-inkmuted leading-relaxed">Merancang identitas digital dan akademik berkualitas premium khusus untuk kamu yang mengerti nilai investasi wajar.</p>
            </div>

            <div className="flex flex-col gap-4 min-w-[150px]">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-inkmuted">Layanan</h4>
              <nav className="flex flex-col gap-3 text-sm font-medium">
                <a href="#services" className="hover:text-accentCyan transition-colors">Web Development</a>
                <a href="#services" className="hover:text-accentCyan transition-colors">Logo Branding</a>
                <a href="#services" className="hover:text-accentCyan transition-colors">Academic Services</a>
                <a href="#contact" className="hover:text-accentCyan transition-colors">Konsultasi Custom</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4 min-w-[150px]">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-inkmuted">Navigasi</h4>
              <nav className="flex flex-col gap-3 text-sm font-medium">
                <a href="#process" className="hover:text-accentPurple transition-colors">Cara Kerja</a>
                <a href="#why" className="hover:text-accentPurple transition-colors">Review Kenapa Kami?</a>
                <a href="#pricing" className="hover:text-accentPurple transition-colors">Daftar Harga</a>
                <a href="#" className="hover:text-accentPurple transition-colors">Privacy Policy</a>
              </nav>
            </div>

            <div className="flex flex-col gap-5 min-w-[200px]">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-inkmuted">Terhubung</h4>
              <p className="text-sm font-medium text-ink">hello@dibantu-id</p>
              <div className="flex flex-row items-center gap-3">
                <a aria-label="Instagram" href="#" className="w-10 h-10 rounded-xl glass border border-line flex items-center justify-center hover:bg-surface-strong transition-all"><Instagram className="w-4 h-4 text-ink" /></a>
                <a aria-label="WhatsApp" href={buildWaLink("Halo tim dibantu!")} target="_blank" rel="noopener" className="w-10 h-10 rounded-xl glass border border-accentCyan/30 flex items-center justify-center hover:bg-accentCyan/10 transition-all text-accentCyan">W</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-line text-xs font-medium text-inkmuted gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} dibantu.id. All rights reserved.</p>
            <p>Soppeng Indonesia.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
