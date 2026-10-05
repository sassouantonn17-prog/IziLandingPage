import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  ChevronRight, 
  CheckCircle2, 
  Radio, 
  Zap, 
  ChevronDown, 
  X, 
  Phone, 
  ArrowRight,
  Package,
  Bike,
  Smartphone,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pack 10 Livraisons');
  const [orderStep, setOrderStep] = useState(1);
  const [orderData, setOrderData] = useState({
    pickup: 'Dakar Plateau (Avenue Roume)',
    dropoff: 'Almadies (Zone Ambassades)',
    nature: 'Dossier urgent / Documents importants',
    timeSlot: 'Immédiat (en moins de 2 heures)',
  });

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const philosophyRef = useRef(null);
  const protocolContainerRef = useRef(null);

  // Scroll listener for Floating Navbar Morph
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations with ctx.revert()
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.from('.hero-anim', {
        y: 35,
        opacity: 0,
        duration: 1.0,
        stagger: 0.08,
        delay: 0.15,
      });

      // 2. Features cards entrance
      gsap.from('.feature-card-anim', {
        scrollTrigger: {
          trigger: '#fonctionnalites',
          start: 'top 80%',
        },
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // 3. Manifesto Reveal
      gsap.from('.manifesto-reveal', {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // 4. Protocol Sticky Stack GSAP Effect
      const protocolCards = gsap.utils.toArray('.protocol-stack-card');
      protocolCards.forEach((card, index) => {
        if (index < protocolCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 12%',
            end: 'bottom 12%',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.07,
                filter: `blur(${progress * 8}px)`,
                opacity: 1 - progress * 0.4,
                duration: 0.2,
                ease: 'power2.inOut',
              });
            },
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#08080C] text-[#FAF8F5] selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5]">
      {/* Floating Island Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-5 py-3 flex items-center justify-between w-[92%] max-w-5xl ${
          scrolled 
            ? 'bg-[#0D0D12]/90 backdrop-blur-xl border border-[#C9A84C]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(201,168,76,0.15)] py-2.5' 
            : 'bg-transparent border border-white/10'
        }`}
      >
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E2C875] to-[#9B7F30] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.4)]">
              <div className="w-full h-full bg-[#0D0D12] rounded-full flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-[#E2C875] tracking-tighter">LX</span>
              </div>
            </div>
            <span className="text-base font-bold tracking-tight text-white font-sans">
              Livr<span className="text-[#C9A84C]">Express</span>
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#FAF8F5]/80">
          <a href="#fonctionnalites" className="hover-lift hover:text-[#C9A84C] transition-colors">Suivi en direct</a>
          <a href="#comment-ca-marche" className="hover-lift hover:text-[#C9A84C] transition-colors">Comment ça marche</a>
          <a href="#engagements" className="hover-lift hover:text-[#C9A84C] transition-colors">Nos engagements</a>
          <a href="#tarifs" className="hover-lift hover:text-[#C9A84C] transition-colors">Nos tarifs</a>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setOrderModalOpen(true)}
            className="btn-magnetic px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C9A84C] text-[#0D0D12] shadow-[0_0_20px_rgba(201,168,76,0.35)] hover:shadow-[0_0_30px_rgba(201,168,76,0.6)]"
          >
            <span className="btn-slide-bg bg-[#FAF8F5]"></span>
            <span className="relative z-10 flex items-center space-x-1.5 font-bold">
              <span>Commander un livreur</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pb-16 pt-36 px-6 md:px-12 lg:px-20"
      >
        {/* Full-Frame Dakar Delivery Image Background provided by user */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/Delivery_person_riding_scooter_2K_20261005005851.jpg" 
            alt="Livreur LivrExpress en scooter dans les rues de Dakar" 
            className="w-full h-full object-cover object-[78%_center] filter brightness-[0.72] contrast-[1.08] saturate-[1.1] scale-[1.02]"
          />
          {/* Subtle gradient overlays: dark on the left for text legibility, clear on the right for the rider */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080C] via-[#08080C]/85 via-45% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/60 via-20% to-transparent"></div>
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#08080C]/80 to-transparent"></div>
        </div>

        {/* Ambient Radial Spotlight */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Hero Content (Clear, highly legible, plain French) */}
        <div className="relative z-10 max-w-5xl">
          {/* Live System Badge */}
          <div className="hero-anim inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#13131A]/90 border border-[#C9A84C]/40 backdrop-blur-md mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
            <span className="text-xs font-semibold tracking-wider text-[#FAF8F5] uppercase">
              LIVRAISON EN MOINS DE 2H À DAKAR • SERVICE DISPONIBLE 7J/7
            </span>
          </div>

          {/* Main Title - Crystal clear readability with bold Plus Jakarta Sans */}
          <h1 className="hero-anim flex flex-col mb-6">
            <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-[#E2C875] mb-2">
              LivrExpress • Le service de livraison rapide à Dakar
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.08] tracking-tight">
              Vos colis livrés en{' '}
              <span className="text-[#C9A84C] relative inline-block">
                moins de 2 heures
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#C9A84C]/40 rounded-full"></span>
              </span>{' '}
              partout à Dakar.
            </span>
          </h1>

          <p className="hero-anim text-base sm:text-lg md:text-xl text-[#FAF8F5]/90 max-w-2xl font-normal leading-relaxed mb-8">
            Un pli urgent, un colis important ou des achats à faire livrer ? Nos coursiers professionnels viennent chercher votre paquet chez vous et le remettent en main propre, sans attente et en toute sécurité.
          </p>

          {/* CTA Buttons */}
          <div className="hero-anim flex flex-wrap items-center gap-5">
            <button 
              onClick={() => setOrderModalOpen(true)}
              className="btn-magnetic group px-8 py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-sm md:text-base font-bold shadow-[0_10px_35px_rgba(201,168,76,0.45)] hover:shadow-[0_15px_45px_rgba(201,168,76,0.7)]"
            >
              <span className="btn-slide-bg bg-[#FAF8F5]"></span>
              <span className="relative z-10 flex items-center space-x-3">
                <span>Commander un livreur maintenant</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <a 
              href="#comment-ca-marche" 
              className="hover-lift px-6 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-sm font-semibold text-white flex items-center space-x-2"
            >
              <span>Comment ça marche ?</span>
              <ChevronDown className="w-4 h-4 text-[#C9A84C]" />
            </a>
          </div>

          {/* Quick Real-Time Telemetry Bar in Easy-to-Understand French */}
          <div className="hero-anim mt-14 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            <div>
              <div className="text-xs text-[#FAF8F5]/60 font-medium">Temps garanti</div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] mt-0.5">&lt; 2 Heures</div>
              <div className="text-xs text-[#E2C875] font-semibold">Partout à Dakar</div>
            </div>
            <div>
              <div className="text-xs text-[#FAF8F5]/60 font-medium">Suivi du trajet</div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] mt-0.5">En direct</div>
              <div className="text-xs text-emerald-400 font-semibold">Position GPS en temps réel</div>
            </div>
            <div>
              <div className="text-xs text-[#FAF8F5]/60 font-medium">Sécurité colis</div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] mt-0.5">100% protégé</div>
              <div className="text-xs text-[#E2C875] font-semibold">Remise contre code secret</div>
            </div>
            <div>
              <div className="text-xs text-[#FAF8F5]/60 font-medium">Disponibilité</div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] mt-0.5">7j / 7</div>
              <div className="text-xs text-emerald-400 font-semibold">Livreurs toujours prêts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: FONCTIONNALITÉS — "Artefacts Fonctionnels Interactifs" */}
      <section id="fonctionnalites" className="py-24 px-6 md:px-12 lg:px-20 relative max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Nos 3 engagements majeurs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Tout pour envoyer vos colis <span className="text-[#C9A84C]">sans stress</span>.
          </h2>
          <p className="text-[#FAF8F5]/80 max-w-2xl text-base mt-2">
            Nous avons créé les outils les plus simples pour que vous sachiez exactement où en est votre livraison à chaque instant.
          </p>
        </div>

        {/* The 3 Interactive Cards with Clear French */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CARTE 1: Suivi en temps réel (Mélangeur Diagnostique) */}
          <LiveTrackingCard />

          {/* CARTE 2: Mises à jour en direct (Machine à Écrire) */}
          <LiveUpdatesCard />

          {/* CARTE 3: Planification facile (Planificateur Protocole Curseur) */}
          <EasyPlannerCard />
        </div>
      </section>

      {/* Section D: NOS ENGAGEMENTS (Le Manifeste en Français Clair) */}
      <section 
        id="engagements"
        ref={philosophyRef}
        className="relative py-28 px-6 md:px-16 lg:px-28 bg-[#060609] overflow-hidden border-y border-[#C9A84C]/20"
      >
        {/* Parallax texture image at low opacity */}
        <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80" 
            alt="Texture sombre" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060609]/75 to-[#060609]"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="manifesto-reveal inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-6">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Notre Promesse</span>
          </div>

          <div className="space-y-10">
            {/* Déclaration 1 : Constat simple */}
            <p className="manifesto-reveal text-lg sm:text-2xl text-[#FAF8F5]/60 font-normal leading-relaxed">
              La plupart des livraisons classiques vous font attendre toute la journée, avec des livreurs introuvables et des retards sans explication.
            </p>

            {/* Déclaration 2 : Solution claire et percutante */}
            <div className="manifesto-reveal pt-2">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Chez LivrExpress,{' '}
                <span className="text-[#C9A84C]">
                  votre livreur part dès votre commande
                </span>{' '}
                et votre colis arrive en moins de 2 heures.
              </h3>
            </div>

            <div className="manifesto-reveal grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/15">
              <div className="p-6 rounded-[2rem] bg-[#0E0E16] border border-white/10">
                <span className="text-[#C9A84C] block mb-2 font-bold text-sm">01. PAS D'ATTENTE INUTILE</span>
                <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
                  Le livreur est envoyé uniquement pour vous. Il ne fait pas 10 détours inutiles avant de vous livrer.
                </p>
              </div>
              <div className="p-6 rounded-[2rem] bg-[#0E0E16] border border-white/10">
                <span className="text-[#C9A84C] block mb-2 font-bold text-sm">02. COLIS BIEN PROTÉGÉ</span>
                <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
                  Votre colis est placé dans un sac fermé et scellé. Seul votre destinataire peut l'ouvrir avec son code.
                </p>
              </div>
              <div className="p-6 rounded-[2rem] bg-[#0E0E16] border border-white/10">
                <span className="text-[#C9A84C] block mb-2 font-bold text-sm">03. SERVICE CLIENT DIRECT</span>
                <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
                  Une question ? Vous pouvez joindre notre équipe à Dakar directement par appel ou par WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section E: COMMENT ÇA MARCHE (Protocole en 3 étapes simples) */}
      <section id="comment-ca-marche" ref={protocolContainerRef} className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Processus simple en 3 étapes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Comment envoyer un colis ? <span className="text-[#C9A84C]">C'est très facile.</span>
          </h2>
          <p className="text-[#FAF8F5]/80 max-w-xl text-base mt-2">
            Du ramassage à la livraison, vous suivez chaque étape en toute simplicité sur votre téléphone.
          </p>
        </div>

        {/* 3 Full-screen style stacked cards with unique animated Canvas/SVG */}
        <div className="space-y-10">
          {/* ÉTAPE 1 : Commande et ramassage */}
          <div className="protocol-stack-card sticky top-24 rounded-[2.5rem] bg-[#12121A] border border-[#C9A84C]/30 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] block mb-2">
                ÉTAPE 1 // COMMANDE RAPIDE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Vous commandez en 1 minute
              </h3>
              <p className="text-[#FAF8F5]/80 leading-relaxed text-sm md:text-base mb-6">
                Renseignez simplement où récupérer le colis et où le livrer. Dès que vous validez, le livreur le plus proche de votre quartier reçoit la mission et prend la route vers chez vous.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#FAF8F5]/70">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Livreur assigné immédiatement</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Confirmation par SMS</span>
              </div>
            </div>

            {/* SVG 1: Concentric Geometric Gears / Rings */}
            <div className="w-52 h-52 sm:w-60 sm:h-60 flex-shrink-0 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#C9A84C]/10 rounded-full blur-2xl"></div>
              <svg className="w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#E2C875" strokeWidth="2" strokeDasharray="12 4" opacity="0.8" />
                <circle cx="100" cy="100" r="55" fill="none" stroke="#FAF8F5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="100" cy="100" r="35" fill="none" stroke="#C9A84C" strokeWidth="2.5" opacity="0.9" />
                {/* Orbital nodes */}
                <circle cx="100" cy="25" r="5" fill="#C9A84C" />
                <circle cx="175" cy="100" r="5" fill="#E2C875" />
                <circle cx="100" cy="175" r="5" fill="#FAF8F5" />
                <circle cx="25" cy="100" r="5" fill="#C9A84C" />
                {/* Center crosshair */}
                <line x1="88" y1="100" x2="112" y2="100" stroke="#C9A84C" strokeWidth="2" />
                <line x1="100" y1="88" x2="100" y2="112" stroke="#C9A84C" strokeWidth="2" />
              </svg>
              <div className="absolute text-xs font-bold text-[#E2C875] tracking-wider uppercase bg-[#0D0D12]/90 px-3 py-1 rounded-full border border-[#C9A84C]/40">
                LIVREUR EN ROUTE
              </div>
            </div>
          </div>

          {/* ÉTAPE 2 : Trajet le plus rapide */}
          <div className="protocol-stack-card sticky top-28 rounded-[2.5rem] bg-[#14141F] border border-[#C9A84C]/30 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] block mb-2">
                ÉTAPE 2 // LE TRAJET LE PLUS RAPIDE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Le livreur évite les bouchons de Dakar
              </h3>
              <p className="text-[#FAF8F5]/80 leading-relaxed text-sm md:text-base mb-6">
                Nos coursiers connaissent parfaitement Dakar (la VDN, la Corniche, l'Autoroute à péage, les ruelles du Plateau). Ils choisissent toujours le meilleur chemin pour ne jamais perdre de temps.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#FAF8F5]/70">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Itinéraires optimisés en direct</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Suivi GPS sur votre téléphone</span>
              </div>
            </div>

            {/* SVG 2: Horizontal Scanning Laser Beam over Grid */}
            <div className="w-52 h-52 sm:w-60 sm:h-60 flex-shrink-0 relative overflow-hidden rounded-[2rem] bg-[#0A0A10] border border-[#C9A84C]/30 flex items-center justify-center p-4">
              {/* Dot matrix grid */}
              <div className="grid grid-cols-6 grid-rows-6 gap-4 opacity-50">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#E2C875]"></div>
                ))}
              </div>
              {/* Laser scanning line */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent shadow-[0_0_15px_#C9A84C] animate-[bounce_3s_ease-in-out_infinite]"></div>
              {/* Target Point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full border border-[#C9A84C] animate-ping opacity-75"></span>
                <span className="w-4 h-4 rounded-full bg-[#E2C875] absolute"></span>
              </div>
              <div className="absolute bottom-3 text-xs font-semibold text-[#E2C875] bg-[#0D0D12]/90 px-3 py-1 rounded-full border border-[#C9A84C]/30">
                ITINÉRAIRE RAPIDE ACTIF
              </div>
            </div>
          </div>

          {/* ÉTAPE 3 : Remise en main propre */}
          <div className="protocol-stack-card sticky top-32 rounded-[2.5rem] bg-[#161624] border border-[#C9A84C]/30 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] block mb-2">
                ÉTAPE 3 // REMISE EN MAIN PROPRE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Livré en moins de 2h avec code secret
              </h3>
              <p className="text-[#FAF8F5]/80 leading-relaxed text-sm md:text-base mb-6">
                Le livreur remet le colis directement à la personne désignée. Un code secret envoyé par SMS permet de déverrouiller la livraison. Vous recevez un message dès que c'est livré.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#FAF8F5]/70">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Code secret de sécurité</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">Preuve de réception immédiate</span>
              </div>
            </div>

            {/* SVG 3: Pulsing Waveform */}
            <div className="w-52 h-52 sm:w-60 sm:h-60 flex-shrink-0 relative overflow-hidden rounded-[2rem] bg-[#0A0A10] border border-[#C9A84C]/30 flex flex-col items-center justify-center p-4">
              <div className="text-xs font-bold text-[#C9A84C] tracking-wider uppercase mb-3">
                DÉLAI MOYEN RESPECTÉ
              </div>
              <svg className="w-full h-20" viewBox="0 0 200 60">
                <path 
                  d="M 0 30 L 40 30 L 50 10 L 60 50 L 70 20 L 80 40 L 90 30 L 140 30 L 150 15 L 160 45 L 170 30 L 200 30" 
                  fill="none" 
                  stroke="#C9A84C" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="220"
                  strokeDashoffset="0"
                />
              </svg>
              <div className="flex items-center space-x-2 mt-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold text-emerald-400">LIVRAISON EN 1H35 RÉUSSIE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section F: NOS TARIFS (Clairs, limpides, sans jargon) */}
      <section id="tarifs" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-2">
            <Bike className="w-4 h-4" />
            <span>Nos tarifs simples et sans surprise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Choisissez la formule qui <span className="text-[#C9A84C]">vous convient</span>.
          </h2>
          <p className="text-[#FAF8F5]/80 text-base mt-2">
            Des prix clairs, aucun frais caché. Que ce soit pour une course ponctuelle ou des besoins quotidiens.
          </p>
        </div>

        {/* 3 Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Formule 1: 1 Course Express */}
          <div className="rounded-[2.5rem] bg-[#12121A]/90 border border-white/15 p-8 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/70 block mb-2">
                À LA DEMANDE
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">1 Course Express</h3>
              <p className="text-sm text-[#FAF8F5]/70 mb-6 leading-relaxed">
                Idéal pour envoyer un document urgent, des clés, un passeport ou un colis tout de suite.
              </p>
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-extrabold text-white">15.000</span>
                  <span className="text-sm font-bold text-[#C9A84C]">FCFA / course</span>
                </div>
                <div className="text-xs text-[#FAF8F5]/60 mt-1">Livraison en moins de 2h garantie</div>
              </div>
              <ul className="space-y-3.5 text-sm text-[#FAF8F5]/90 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Livreur chez vous en 20 minutes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Suivi du trajet sur votre smartphone</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Code secret pour sécuriser la remise</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Confirmation par SMS dès la livraison</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan('1 Course Express');
                setOrderModalOpen(true);
              }}
              className="btn-magnetic w-full py-4 rounded-full border border-white/25 hover:border-[#C9A84C] text-sm font-bold text-white"
            >
              <span className="btn-slide-bg bg-[#C9A84C]/25"></span>
              <span className="relative z-10">Commander cette course</span>
            </button>
          </div>

          {/* Formule 2: Pack 10 Livraisons (STANDS OUT) */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#181826] to-[#0E0E17] border-2 border-[#C9A84C] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(201,168,76,0.22)] scale-100 md:scale-105 z-10">
            {/* Badge standout */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#C9A84C] text-[#0D0D12] text-xs uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(201,168,76,0.6)]">
              LE PLUS POPULAIRE
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] block mb-2">
                ABONNEMENT PROFESSIONNEL
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-2">Pack 10 Livraisons</h3>
              <p className="text-sm text-[#FAF8F5]/80 mb-6 leading-relaxed">
                Le choix préféré des entreprises, commerçants, cabinets et particuliers qui envoient souvent des colis.
              </p>
              <div className="mb-6 pb-6 border-b border-[#C9A84C]/30">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-extrabold text-white">120.000</span>
                  <span className="text-sm font-bold text-[#C9A84C]">FCFA / mois</span>
                </div>
                <div className="text-xs text-[#E2C875] font-semibold mt-1">Soit 12.000 FCFA par course (30.000 FCFA d'économie)</div>
              </div>
              <ul className="space-y-3.5 text-sm text-[#FAF8F5]/90 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span className="font-bold text-white">10 courses prioritaires valables 30 jours</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Départ prioritaire du livreur en moins de 10 min</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Ligne WhatsApp dédiée pour commander en 1 mot</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Emballage protecteur renforcé offert</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Récapitulatif mensuel de toutes vos factures</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan('Pack 10 Livraisons');
                setOrderModalOpen(true);
              }}
              className="btn-magnetic w-full py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-sm uppercase tracking-wider font-extrabold shadow-[0_10px_30px_rgba(201,168,76,0.4)]"
            >
              <span className="btn-slide-bg bg-[#FAF8F5]"></span>
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Prendre le Pack 10 Livraisons</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Formule 3: Livreur Dédié */}
          <div className="rounded-[2.5rem] bg-[#12121A]/90 border border-white/15 p-8 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/70 block mb-2">
                ENTREPRISES & SOCIÉTÉS
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">Livreur Dédié</h3>
              <p className="text-sm text-[#FAF8F5]/70 mb-6 leading-relaxed">
                Un livreur professionnel et sa moto à la disposition exclusive de votre société toute la journée.
              </p>
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-extrabold text-white">450.000</span>
                  <span className="text-sm font-bold text-[#C9A84C]">FCFA / mois</span>
                </div>
                <div className="text-xs text-[#FAF8F5]/60 mt-1">Livreur à plein temps à votre siège</div>
              </div>
              <ul className="space-y-3.5 text-sm text-[#FAF8F5]/90 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Un coursier attitré du lundi au vendredi</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Nombre de livraisons illimité dans Dakar</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Livreur sérieux en tenue soignée</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  <span>Remplacement immédiat garanti en cas d'absence</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan('Livreur Dédié');
                setOrderModalOpen(true);
              }}
              className="btn-magnetic w-full py-4 rounded-full border border-white/25 hover:border-[#C9A84C] text-sm font-bold text-white"
            >
              <span className="btn-slide-bg bg-[#C9A84C]/25"></span>
              <span className="relative z-10">Contacter un conseiller</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section G: PIED DE PAGE — Galbé avec français direct */}
      <footer className="relative mt-16 bg-[#050508] border-t border-[#C9A84C]/20 rounded-t-[3rem] md:rounded-t-[4rem] px-6 md:px-14 lg:px-20 pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Slogan */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] p-[1px] flex items-center justify-center">
                  <div className="w-full h-full bg-[#0D0D12] rounded-full flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-[#E2C875]">LX</span>
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Livr<span className="text-[#C9A84C]">Express</span>
                </span>
              </div>
              <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                Le service de livraison rapide et fiable à Dakar. Vos colis arrivent en moins de 2 heures en toute sécurité.
              </p>
              <div className="text-xs font-bold text-[#C9A84C]">
                DAKAR, SÉNÉGAL • DISPONIBLE 7J/7
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/50 mb-4">Plan du site</div>
              <ul className="space-y-3 text-sm text-[#FAF8F5]/80">
                <li><a href="#fonctionnalites" className="hover-lift hover:text-[#C9A84C] transition-colors">Suivi en direct</a></li>
                <li><a href="#comment-ca-marche" className="hover-lift hover:text-[#C9A84C] transition-colors">Comment ça marche</a></li>
                <li><a href="#engagements" className="hover-lift hover:text-[#C9A84C] transition-colors">Nos engagements</a></li>
                <li><a href="#tarifs" className="hover-lift hover:text-[#C9A84C] transition-colors">Nos tarifs et forfaits</a></li>
              </ul>
            </div>

            {/* Col 3: Quartiers desservis */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/50 mb-4">Quartiers couverts à Dakar</div>
              <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>Dakar Plateau, Médina, Fann</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>Almadies, Ngor, Ouakam, Yoff</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>Point E, Mermoz, Sacré-Cœur, VDN</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Téléphone */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/50 mb-4">Besoin d'un livreur ?</div>
              <p className="text-sm text-[#FAF8F5]/80 mb-3">
                Appelez notre équipe pour commander immédiatement ou poser une question :
              </p>
              <div className="flex items-center space-x-2 text-base font-bold text-[#E2C875]">
                <Phone className="w-4 h-4 text-[#C9A84C]" />
                <span>+221 33 800 00 24</span>
              </div>
              <div className="mt-2 text-xs text-[#FAF8F5]/60">
                Disponible aussi sur WhatsApp 7j/7
              </div>
            </div>
          </div>

          {/* Bottom Bar with Simple Status */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-bold tracking-wide">
                SERVICE ACTIF • LIVREURS DISPONIBLES EN CE MOMENT DANS DAKAR
              </span>
            </div>

            <div className="text-xs text-[#FAF8F5]/60">
              © {new Date().getFullYear()} LivrExpress Dakar. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal: Commander un livreur */}
      {orderModalOpen && (
        <OrderModal 
          isOpen={orderModalOpen} 
          onClose={() => setOrderModalOpen(false)} 
          selectedPlan={selectedPlan}
          orderData={orderData}
          setOrderData={setOrderData}
          orderStep={orderStep}
          setOrderStep={setOrderStep}
        />
      )}
    </div>
  );
}

/* =========================================================================
   CARTE 1 — SUIVI EN TEMPS RÉEL (Mélangeur Diagnostique en Français Simple)
========================================================================= */
function LiveTrackingCard() {
  const initialCards = [
    {
      id: 1,
      tag: 'LIVRAISON EN COURS',
      trajectory: 'Dakar Plateau ➔ Almadies',
      speed: '45 km/h',
      latency: 'Route fluide (VDN)',
      eta: 'Arrivée dans 35 min',
      status: 'Livreur sur le trajet',
      signalColor: 'bg-emerald-400',
    },
    {
      id: 2,
      tag: 'COLIS RÉCUPÉRÉ',
      trajectory: 'Point E ➔ Fann Résidence',
      speed: '38 km/h',
      latency: 'Proche du quartier',
      eta: 'Arrivée dans 15 min',
      status: 'Bientôt à destination',
      signalColor: 'bg-[#C9A84C]',
    },
    {
      id: 3,
      tag: 'MISSION URGENTE',
      trajectory: 'Ngor ➔ Centre-ville',
      speed: '50 km/h',
      latency: 'Corniche dégagée',
      eta: 'Arrivée dans 40 min',
      status: 'En route rapide',
      signalColor: 'bg-blue-400',
    },
  ];

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const manualCycle = () => {
    setCards((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  return (
    <div className="feature-card-anim rounded-[2.5rem] bg-[#111118] border border-[#C9A84C]/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
            AVANTAGE 1 // VITESSE
          </span>
          <span className="text-xs text-[#FAF8F5]/60 font-medium">Défilement auto</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-sans">
          Suivez votre livreur en direct
        </h3>
        <p className="text-sm text-[#FAF8F5]/70 mb-6 font-sans leading-relaxed">
          À tout moment, vous voyez exactement sur votre téléphone où se trouve votre livreur dans les rues de Dakar.
        </p>

        {/* Stack of 3 cycling cards with elastic bounce transition */}
        <div 
          onClick={manualCycle}
          className="relative h-64 w-full cursor-pointer select-none"
          title="Cliquez pour changer de livraison"
        >
          {cards.map((card, index) => {
            const translateY = index * 20;
            const scale = 1 - index * 0.05;
            const opacity = 1 - index * 0.22;
            const zIndex = 30 - index * 10;

            return (
              <div
                key={card.id}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transition: 'all 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="absolute inset-x-0 top-0 rounded-[2rem] bg-[#191924] border border-[#C9A84C]/35 p-5 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#C9A84C]">
                    {card.tag}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${card.signalColor} animate-pulse`}></span>
                    <span className="text-xs text-[#FAF8F5]/80 font-medium">{card.status}</span>
                  </div>
                </div>

                <div className="text-base font-bold text-white mb-3">{card.trajectory}</div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[#FAF8F5]/50 block">Conditions de route :</span>
                    <span className="text-white font-semibold">{card.latency}</span>
                  </div>
                  <div>
                    <span className="text-[#FAF8F5]/50 block">Délai estimé :</span>
                    <span className="text-[#E2C875] font-bold text-sm">{card.eta}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-[#FAF8F5]/70 flex items-center justify-between">
                  <span>Vitesse : {card.speed}</span>
                  <span className="text-emerald-400 font-semibold">● GPS connecté</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#FAF8F5]/60">
        <span>Touchez pour faire défiler</span>
        <span className="text-[#C9A84C] font-bold flex items-center space-x-1">
          <span>Voir l'exemple</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   CARTE 2 — MISES À JOUR EN DIRECT (Machine à écrire en Français Simple)
========================================================================= */
function LiveUpdatesCard() {
  const simpleLogs = [
    '> 14:02 - Votre commande est bien validée.',
    '> 14:08 - Le coursier Moussa prend en charge votre colis.',
    '> 14:15 - Le colis est bien emballé et prêt à partir.',
    '> 14:32 - Le livreur roule sur la VDN, pas de bouchon.',
    '> 14:48 - Le livreur arrive devant l\'adresse de livraison.',
    '> 14:52 - Colis remis en main propre. Merci pour votre confiance !',
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [history, setHistory] = useState([
    '> 13:58 - Connexion à la plateforme LivrExpress.',
    '> 14:00 - Adresse de ramassage confirmée à Dakar.',
  ]);

  useEffect(() => {
    const currentFullLine = simpleLogs[currentLineIndex];

    if (charIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentFullLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setHistory((prev) => [...prev.slice(-3), currentFullLine]);
        setDisplayText('');
        setCharIndex(0);
        setCurrentLineIndex((prev) => (prev + 1) % simpleLogs.length);
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLineIndex]);

  return (
    <div className="feature-card-anim rounded-[2.5rem] bg-[#111118] border border-[#C9A84C]/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
            AVANTAGE 2 // TRANSPARENCE
          </span>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1A1A26] border border-[#C9A84C]/35">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-[#E2C875] font-bold">
              Alertes SMS & WhatsApp
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 font-sans">
          Mises à jour à chaque étape
        </h3>
        <p className="text-sm text-[#FAF8F5]/70 mb-6 font-sans leading-relaxed">
          Pas besoin de rappeler pour demander des nouvelles : nous vous envoyons un message clair à chaque moment important.
        </p>

        {/* Terminal Screen Container */}
        <div className="h-64 rounded-[2rem] bg-[#09090D] border border-white/15 p-5 text-sm flex flex-col justify-between overflow-hidden shadow-inner font-sans">
          <div className="space-y-2.5 text-[#FAF8F5]/75 overflow-hidden">
            {history.map((line, idx) => (
              <div key={idx} className="text-xs leading-relaxed truncate opacity-70">
                {line}
              </div>
            ))}

            {/* Currently typing line */}
            <div className="text-xs text-white leading-relaxed font-semibold">
              <span>{displayText}</span>
              <span className="inline-block w-2 h-4 bg-[#C9A84C] ml-1 translate-y-[2px] animate-[pulse_0.7s_infinite]"></span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#FAF8F5]/60">
            <span>Notification : Directe</span>
            <span className="text-emerald-400 font-semibold">SMS instantané</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#FAF8F5]/60">
        <span>Restez informé sans lever le petit doigt</span>
        <span className="text-emerald-400 font-bold">Automatique</span>
      </div>
    </div>
  );
}

/* =========================================================================
   CARTE 3 — PLANIFICATION FACILE (Planificateur en Français Simple)
========================================================================= */
function EasyPlannerCard() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const fullDayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [activeDayIndex, setActiveDayIndex] = useState(3); // Jeudi
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 180 });
  const [isPressing, setIsPressing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timeoutIds = [];

    const runChoreography = () => {
      setIsSaved(false);
      setCursorPos({ x: 30, y: 160 });

      timeoutIds.push(setTimeout(() => {
        setCursorPos({ x: 145, y: 55 });
      }, 700));

      timeoutIds.push(setTimeout(() => {
        setIsPressing(true);
        setActiveDayIndex(3);
      }, 1400));

      timeoutIds.push(setTimeout(() => {
        setIsPressing(false);
      }, 1650));

      timeoutIds.push(setTimeout(() => {
        setCursorPos({ x: 180, y: 155 });
      }, 2100));

      timeoutIds.push(setTimeout(() => {
        setIsPressing(true);
        setIsSaved(true);
      }, 2700));

      timeoutIds.push(setTimeout(() => {
        setIsPressing(false);
      }, 2950));

      timeoutIds.push(setTimeout(() => {
        setCursorPos({ x: 270, y: 220 });
      }, 3400));

      timeoutIds.push(setTimeout(runChoreography, 4500));
    };

    runChoreography();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="feature-card-anim rounded-[2.5rem] bg-[#111118] border border-[#C9A84C]/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
            AVANTAGE 3 // FLEXIBILITÉ
          </span>
          <span className="text-xs text-[#E2C875] font-bold">RÉSERVATION FACILE</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 font-sans">
          Choisissez votre jour et votre heure
        </h3>
        <p className="text-sm text-[#FAF8F5]/70 mb-6 font-sans leading-relaxed">
          Besoin d'un coursier aujourd'hui ou plus tard dans la semaine ? Vous décidez exactement du moment où nous venons.
        </p>

        {/* Weekly Grid (L M M J V S D) with Animated SVG Cursor */}
        <div className="relative h-64 rounded-[2rem] bg-[#0A0A0F] border border-white/15 p-5 flex flex-col justify-between overflow-hidden shadow-inner">
          <div>
            <div className="text-xs text-[#FAF8F5]/70 uppercase tracking-wider mb-3 flex items-center justify-between font-semibold">
              <span>CHOISISSEZ LE JOUR DE LA LIVRAISON</span>
              <span className="text-[#C9A84C]">CETTE SEMAINE</span>
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((d, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveDayIndex(idx)}
                    style={{
                      transform: isPressing && activeDayIndex === idx ? 'scale(0.95)' : 'scale(1)',
                      transition: 'transform 0.15s ease, background-color 0.3s ease',
                    }}
                    className={`h-14 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border ${
                      isActive 
                        ? 'bg-[#C9A84C] text-[#0D0D12] border-white shadow-[0_0_15px_rgba(201,168,76,0.6)] font-extrabold' 
                        : 'bg-[#14141E] text-[#FAF8F5]/80 border-white/10 hover:border-[#C9A84C]/50'
                    }`}
                  >
                    <span className="text-sm font-bold">{d}</span>
                    <span className="text-[10px] uppercase opacity-80 mt-0.5">
                      {fullDayNames[idx].slice(0, 3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Action Area */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="text-xs text-[#FAF8F5]/80">
              Jour sélectionné : <span className="text-[#E2C875] font-bold">{fullDayNames[activeDayIndex]}</span>
            </div>

            <button 
              id="save-protocol-btn"
              style={{
                transform: isPressing && isSaved ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                isSaved 
                  ? 'bg-emerald-400 text-[#0D0D12] shadow-[0_0_15px_#34d399]' 
                  : 'bg-[#C9A84C] text-[#0D0D12] shadow-[0_0_10px_rgba(201,168,76,0.3)]'
              }`}
            >
              {isSaved ? 'Créneau bloqué !' : 'Confirmer ce jour'}
            </button>
          </div>

          {/* Animated SVG Cursor */}
          <div 
            style={{
              transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
              transition: 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            className="absolute top-0 left-0 pointer-events-none z-30"
          >
            <svg 
              className={`w-6 h-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-transform duration-150 ${isPressing ? 'scale-90' : 'scale-100'}`} 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
                fill="#FAF8F5" 
                stroke="#C9A84C" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#FAF8F5]/60">
        <span>Créneau garanti à Dakar</span>
        <span className="text-emerald-400 font-bold">Sans surcoût</span>
      </div>
    </div>
  );
}

/* =========================================================================
   MODAL DE COMMANDE EN FRANÇAIS SIMPLE ET INTUITIF
========================================================================= */
function OrderModal({ isOpen, onClose, selectedPlan, orderData, setOrderData, orderStep, setOrderStep }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState('');

  if (!isOpen) return null;

  const dakarLocations = [
    'Dakar Plateau (Avenue Roume / Centre-ville)',
    'Almadies (Zone Ambassades & Résidences)',
    'Fann Résidence (Corniche Ouest)',
    'Point E (Pôle Médical & Bureaux)',
    'Ngor / Virage (Bord de mer)',
    'Mermoz / Sacré-Cœur (Zone VDN)',
    'Yoff / BCEAO (Nord Dakar)',
    'Ouakam / Mamelles (Zone Phare)',
    'Diamniadio (Pôle ministériel)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'LX-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedCode(code);
      setOrderStep(2);
    }, 1000);
  };

  const handleReset = () => {
    setOrderStep(1);
    setConfirmedCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.3s_ease]">
      <div className="relative w-full max-w-xl rounded-[2.5rem] bg-[#0F0F17] border border-[#C9A84C]/40 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(201,168,76,0.15)] text-[#FAF8F5]">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#FAF8F5]/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderStep === 1 ? (
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
              <Zap className="w-4 h-4" />
              <span>Commande en 1 minute</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1 font-sans">
              Commander un livreur
            </h3>
            <p className="text-sm text-[#FAF8F5]/70 mb-6 font-sans">
              Formule sélectionnée : <span className="text-[#C9A84C] font-bold">{selectedPlan}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/80 block mb-1.5">
                  1. Où doit-on chercher le colis ? (Point de départ)
                </label>
                <div className="relative">
                  <select 
                    value={orderData.pickup} 
                    onChange={(e) => setOrderData({ ...orderData, pickup: e.target.value })}
                    className="w-full bg-[#161622] border border-white/20 focus:border-[#C9A84C] rounded-2xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none font-sans font-medium"
                  >
                    {dakarLocations.map((loc, i) => (
                      <option key={i} value={loc} className="bg-[#12121A] text-white">{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#C9A84C] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/80 block mb-1.5">
                  2. Où doit-on le livrer ? (Destination)
                </label>
                <div className="relative">
                  <select 
                    value={orderData.dropoff} 
                    onChange={(e) => setOrderData({ ...orderData, dropoff: e.target.value })}
                    className="w-full bg-[#161622] border border-white/20 focus:border-[#C9A84C] rounded-2xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none font-sans font-medium"
                  >
                    {dakarLocations.map((loc, i) => (
                      <option key={i} value={loc} className="bg-[#12121A] text-white">{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#C9A84C] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/80 block mb-1.5">
                    Que contient votre colis ?
                  </label>
                  <input 
                    type="text" 
                    value={orderData.nature} 
                    onChange={(e) => setOrderData({ ...orderData, nature: e.target.value })}
                    className="w-full bg-[#161622] border border-white/20 focus:border-[#C9A84C] rounded-2xl px-4 py-3 text-sm text-white outline-none transition-colors font-sans"
                    placeholder="Ex: Documents, Clés, Habits, Achat..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/80 block mb-1.5">
                    Quand souhaitez-vous la livraison ?
                  </label>
                  <div className="w-full bg-[#161622] border border-[#C9A84C]/40 rounded-2xl px-4 py-3 text-sm text-[#E2C875] font-bold flex items-center justify-between">
                    <span>Tout de suite (&lt; 2h)</span>
                    <Clock className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                </div>
              </div>

              {/* Estimate banner */}
              <div className="p-4 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E2C875]">Délai garanti</div>
                  <div className="text-sm sm:text-base font-extrabold text-white">Livraison en moins de 2 heures</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]/70">Prix de la course</div>
                  <div className="text-base sm:text-lg font-extrabold text-[#E2C875]">15.000 FCFA</div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-magnetic w-full py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-sm uppercase tracking-wider font-extrabold shadow-[0_10px_35px_rgba(201,168,76,0.4)] mt-2 flex items-center justify-center space-x-2"
              >
                <span className="btn-slide-bg bg-[#FAF8F5]"></span>
                <span className="relative z-10">
                  {isSubmitting ? 'Envoi de votre demande...' : 'Valider ma commande de livreur'}
                </span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Confirmation Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center mx-auto mb-4 text-[#E2C875]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] block mb-1">
              COMMANDE CONFIRMÉE AVEC SUCCÈS
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-2 font-sans">
              Votre livreur arrive vers vous !
            </h3>
            <p className="text-sm text-[#FAF8F5]/80 max-w-sm mx-auto mb-6">
              Votre demande a été transmise au coursier le plus proche. Vous recevrez un SMS avec son numéro et sa position en direct.
            </p>

            <div className="p-4 rounded-2xl bg-[#14141E] border border-white/15 max-w-md mx-auto text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#FAF8F5]/60 font-medium">NUMÉRO DE SUIVI :</span>
                <span className="text-[#E2C875] font-bold">{confirmedCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#FAF8F5]/60 font-medium">DÉPART :</span>
                <span className="text-white font-medium truncate max-w-[200px]">{orderData.pickup}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#FAF8F5]/60 font-medium">ARRIVÉE :</span>
                <span className="text-white font-medium truncate max-w-[200px]">{orderData.dropoff}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#FAF8F5]/60 font-medium">DÉLAI ESTIMÉ :</span>
                <span className="text-emerald-400 font-bold">Moins de 2 heures</span>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="btn-magnetic px-8 py-3.5 rounded-full bg-[#C9A84C] text-[#0D0D12] text-sm uppercase tracking-wider font-bold"
            >
              <span className="btn-slide-bg bg-[#FAF8F5]"></span>
              <span className="relative z-10">Fermer et retourner au site</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
