import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollRestore } from '../hooks/useScrollRestore';
import { 
  ChevronRight, ChevronDown, Bot, Settings, ShieldCheck, RefreshCw, Building2, Sprout, FileSignature, User,
  Scale, Globe, Umbrella, Vault, Lock,
  CreditCard, ArrowRightLeft, Banknote, Receipt,
  Brain, Network, Briefcase, Landmark, BookOpen,
  Activity, PieChart, Zap, TrendingUp,
  GraduationCap, Building, HeartHandshake, ReceiptText, Gift, MoreHorizontal, Star, Info, Moon, Sun
} from 'lucide-react';
import { useLanguage, Language } from '../hooks/useLanguage';
import { translations } from '../translations';

export function LandingView({ onNavigate, onUnavailable }: { onNavigate: (screen: string, tab?: string) => void, onUnavailable?: () => void }) {
  const { ref, onScroll } = useScrollRestore('landing_scroll');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [localName, setLocalName] = useState('Dhnaath');
  const [theme, setTheme] = useState<'Dark' | 'Light'>(() => {
    return (localStorage.getItem('appTheme') as 'Dark' | 'Light') || 'Dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'Dark' ? 'Light' : 'Dark';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
    if (newTheme === 'Light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  useEffect(() => {
    if (theme === 'Light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const lang = useLanguage();
  
  const cycleLanguage = () => {
    const langs: Language[] = ['id', 'en', 'ms', 'zh'];
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    localStorage.setItem('appLanguage', nextLang);
    window.dispatchEvent(new Event('languageChange'));
  };

  const getTimeGreeting = (l: Language) => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + min / 60;
    
    if (time >= 5.5 && time < 11) {
      switch(l) {
        case 'id': return 'Selamat Pagi';
        case 'en': return 'Good Morning';
        case 'ms': return 'Selamat Pagi';
        case 'zh': return '早上好';
        default: return 'Selamat Pagi';
      }
    } else if (time >= 11 && time < 15) {
      switch(l) {
        case 'id': return 'Selamat Siang';
        case 'en': return 'Good Afternoon';
        case 'ms': return 'Selamat Tengah Hari';
        case 'zh': return '中午好';
        default: return 'Selamat Siang';
      }
    } else if (time >= 15 && time < 17.5) {
      switch(l) {
        case 'id': return 'Selamat Sore';
        case 'en': return 'Good Afternoon';
        case 'ms': return 'Selamat Petang';
        case 'zh': return '下午好';
        default: return 'Selamat Sore';
      }
    } else {
      switch(l) {
        case 'id': return 'Selamat Malam';
        case 'en': return 'Good Evening';
        case 'ms': return 'Selamat Malam';
        case 'zh': return '晚上好';
        default: return 'Selamat Malam';
      }
    }
  };

  const getLangLabel = (l: Language) => {
    switch(l) {
      case 'id': return 'IDN';
      case 'en': return 'ENG';
      case 'ms': return 'MYS';
      case 'zh': return '中文';
      default: return 'IDN';
    }
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('appFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('appFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, feature: string) => {
    e.stopPropagation();
    if (favorites.includes(feature)) {
      setFavorites(favorites.filter(f => f !== feature));
    } else {
      if (favorites.length >= 5) {
        alert("Maksimal 5 fitur favorit yang bisa ditambahkan");
        return;
      }
      setFavorites([...favorites, feature]);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem('localName');
    if (name) {
      setLocalName(name);
    }
  }, []);

  const toggleExpand = (card: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(prev => prev === card ? null : card);
  };

  return (
    <>
      <motion.div 
        ref={ref}
        onScroll={onScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col h-screen p-6 relative pb-20 overflow-y-auto"
      >
        <div className="pt-8 pb-4 flex justify-between items-start">
          <div>
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="mb-2"
            >
               <h1 className="text-xl font-medium tracking-tight text-gray-400 mb-1">
                 {translations.landing.greeting[lang]} {getTimeGreeting(lang)}
               </h1>
               <h2 className="text-3xl font-semibold tracking-tight text-gray-100">
                 {localName}
               </h2>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={toggleTheme} className="p-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full hover:bg-[#2a2a2a] transition-colors">
              {theme === 'Dark' ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-gray-400" />}
            </button>
            <button onClick={cycleLanguage} className="w-[38px] h-[38px] bg-[#1e1e1e] border border-[#2a2a2a] rounded-full hover:bg-[#2a2a2a] transition-colors flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-gray-400">{getLangLabel(lang)}</span>
            </button>
          </div>
        </div>

        <motion.p 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-gray-400 text-sm mb-4 w-full truncate [text-align-last:justify] tracking-wide"
        >
           {translations.landing.summary[lang]}
        </motion.p>

        <div className="space-y-4 flex-1">

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-[#1e1e1e] rounded-2xl p-6 text-left relative overflow-hidden group hover:bg-[#2a2a2a] transition-colors border border-transparent hover:border-[#2a2a2a]"
            
          >
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-4 text-gray-100 group-hover:text-gray-100 transition-colors">
                 <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                   <ShieldCheck size={24} className="theme-icon" />
                 </div>
                 <div className="text-left">
                   <h2 className="text-lg font-medium">{translations.landing.categories.surety.title}</h2>
                   <div className="text-xs text-gray-400">{translations.landing.categories.surety.desc[lang]}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2a2a2a]">
              {expandedCard !== 'surety' && (<div className="flex items-center gap-4 transition-colors">
                 <Scale size={18} className="text-indigo-400" />
                 <Globe size={18} className="text-sky-400" />
                 <Umbrella size={18} className="text-purple-400" />
                 <Vault size={18} className="text-teal-500" />
                 <Lock size={18} className="text-green-500" />
              </div>)}
              <button type="button" onClick={(e) => toggleExpand('surety', e)} className="ml-auto text-gray-500 hover:text-gray-100 p-1 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                 <ChevronDown size={20} className={`transform transition-transform ${expandedCard === 'surety' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <AnimatePresence>
               {expandedCard === 'surety' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                     <div className="flex flex-col gap-2 mt-4 mb-4">
                        {translations.landing.categories.surety.long[lang].split(/\r?\n\r?\n/).map((item, idx) => {
                           const match = item.match(/^(\d+)\s+(.*)$/);
                           if (match) {
                              let text = match[2];
                              text = text.replace(/;?$/, '.');
                              return (
                                 <div key={idx} className="flex gap-3 text-xs text-gray-400 text-left leading-relaxed">
                                    <span className="w-3 shrink-0 font-medium text-gray-500">{match[1]}</span>
                                    <span>{text}</span>
                                 </div>
                              );
                           }
                           return <p key={idx} className="text-xs text-gray-400 text-left leading-relaxed">{item}</p>;
                        })}
                     </div>
                     <div className="pt-4 mt-4 space-y-3 text-sm text-gray-400 border-t border-[#2a2a2a]">
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('surety', 'cat_kepatuhan'); }}>
                             <div className="flex items-center gap-3 text-indigo-400"><Scale size={16} className="shrink-0"/> {translations.surety.tabs[0][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('surety', 'cat_publik'); }}>
                             <div className="flex items-center gap-3 text-sky-400"><Globe size={16} className="shrink-0"/> {translations.surety.tabs[1][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('surety', 'cat_asuransi'); }}>
                             <div className="flex items-center gap-3 text-purple-400"><Umbrella size={16} className="shrink-0"/> {translations.surety.tabs[2][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('surety', 'cat_dana'); }}>
                             <div className="flex items-center gap-3 text-teal-500"><Vault size={16} className="shrink-0"/> {translations.surety.tabs[3][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('surety', 'cat_proteksi'); }}>
                             <div className="flex items-center gap-3 text-green-500"><Lock size={16} className="shrink-0"/> {translations.surety.tabs[4][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-[#1e1e1e] rounded-2xl p-6 text-left relative border border-transparent"
            
          >
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-4 text-gray-100 transition-colors">
                 <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                   <RefreshCw size={24} className="theme-icon" />
                 </div>
                 <div className="text-left">
                   <h2 className="text-lg font-medium">{translations.landing.categories.flow.title}</h2>
                   <div className="text-xs text-gray-400">{translations.landing.categories.flow.desc[lang]}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2a2a2a]">
              {expandedCard !== 'flow' && (<div className="flex items-center gap-4 transition-colors">
                 <CreditCard size={18} className="text-red-500" />
                 <ArrowRightLeft size={18} className="text-orange-500" />
                 <Banknote size={18} className="text-emerald-400" />
                 <Receipt size={18} className="text-rose-500" />
                 <Activity size={18} className="text-cyan-500" />
              </div>)}
              <button type="button" onClick={(e) => toggleExpand('flow', e)} className="ml-auto text-gray-500 hover:text-gray-100 p-1 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                 <ChevronDown size={20} className={`transform transition-transform ${expandedCard === 'flow' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <AnimatePresence>
               {expandedCard === 'flow' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                     <div className="flex flex-col gap-2 mt-4 mb-4">
                        {translations.landing.categories.flow.long[lang].split(/\r?\n\r?\n/).map((item, idx) => {
                           const match = item.match(/^(\d+)\s+(.*)$/);
                           if (match) {
                              let text = match[2];
                              text = text.replace(/;?$/, '.');
                              return (
                                 <div key={idx} className="flex gap-3 text-xs text-gray-400 text-left leading-relaxed">
                                    <span className="w-3 shrink-0 font-medium text-gray-500">{match[1]}</span>
                                    <span>{text}</span>
                                 </div>
                              );
                           }
                           return <p key={idx} className="text-xs text-gray-400 text-left leading-relaxed">{item}</p>;
                        })}
                     </div>
                     <div className="pt-4 mt-4 space-y-3 text-sm text-gray-400 border-t border-[#2a2a2a]">
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('flow', 'cat_liabilitas'); }}>
                             <div className="flex items-center gap-3 text-red-500"><CreditCard size={16} className="shrink-0"/> {translations.flow.tabs[0][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('flow', 'cat_pengeluaran'); }}>
                             <div className="flex items-center gap-3 text-orange-500"><ArrowRightLeft size={16} className="shrink-0"/> {translations.flow.tabs[1][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('flow', 'cat_kredit'); }}>
                             <div className="flex items-center gap-3 text-emerald-400"><Banknote size={16} className="shrink-0"/> {translations.flow.tabs[2][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('flow', 'cat_pajak'); }}>
                             <div className="flex items-center gap-3 text-rose-500"><Receipt size={16} className="shrink-0"/> {translations.flow.tabs[3][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('flow', 'cat_otomatisasi'); }}>
                             <div className="flex items-center gap-3 text-cyan-500"><Activity size={16} className="shrink-0"/> {translations.flow.tabs[4][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-[#1e1e1e] rounded-2xl p-6 text-left relative border border-transparent"
            
          >
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-4 text-gray-100 transition-colors">
                 <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                   <Settings size={24} className="theme-icon" />
                 </div>
                 <div className="text-left">
                   <h2 className="text-lg font-medium">{translations.landing.categories.build.title}</h2>
                   <div className="text-xs text-gray-400">{translations.landing.categories.build.desc[lang]}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2a2a2a]">
              {expandedCard !== 'build' && (<div className="flex items-center gap-4 transition-colors">
                 <Brain size={18} className="text-purple-500" />
                 <Network size={18} className="text-blue-500" />
                 <Briefcase size={18} className="text-amber-500" />
                 <Landmark size={18} className="text-green-600" />
                 <BookOpen size={18} className="text-orange-400" />
              </div>)}
              <button type="button" onClick={(e) => toggleExpand('build', e)} className="ml-auto text-gray-500 hover:text-gray-100 p-1 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                 <ChevronDown size={20} className={`transform transition-transform ${expandedCard === 'build' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <AnimatePresence>
               {expandedCard === 'build' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                     <div className="flex flex-col gap-2 mt-4 mb-4">
                        {translations.landing.categories.build.long[lang].split(/\r?\n\r?\n/).map((item, idx) => {
                           const match = item.match(/^(\d+)\s+(.*)$/);
                           if (match) {
                              let text = match[2];
                              text = text.replace(/;?$/, '.');
                              return (
                                 <div key={idx} className="flex gap-3 text-xs text-gray-400 text-left leading-relaxed">
                                    <span className="w-3 shrink-0 font-medium text-gray-500">{match[1]}</span>
                                    <span>{text}</span>
                                 </div>
                              );
                           }
                           return <p key={idx} className="text-xs text-gray-400 text-left leading-relaxed">{item}</p>;
                        })}
                     </div>
                     <div className="pt-4 mt-4 space-y-3 text-sm text-gray-400 border-t border-[#2a2a2a]">
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('build', 'cat_modal'); }}>
                             <div className="flex items-center gap-3 text-purple-500"><Brain size={16} className="shrink-0"/> {translations.build.tabs[0][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('build', 'cat_jaringan'); }}>
                             <div className="flex items-center gap-3 text-blue-500"><Network size={16} className="shrink-0"/> {translations.build.tabs[1][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('build', 'cat_portofolio'); }}>
                             <div className="flex items-center gap-3 text-amber-500"><Briefcase size={16} className="shrink-0"/> {translations.build.tabs[2][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('build', 'cat_kekayaan'); }}>
                             <div className="flex items-center gap-3 text-green-600"><Landmark size={16} className="shrink-0"/> {translations.build.tabs[3][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('build', 'cat_pembukuan'); }}>
                             <div className="flex items-center gap-3 text-orange-400"><BookOpen size={16} className="shrink-0"/> {translations.build.tabs[4][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full bg-[#1e1e1e] rounded-2xl p-6 text-left relative border border-transparent"
            
          >
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-4 text-gray-100 transition-colors">
                 <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                   <TrendingUp size={24} className="theme-icon" />
                 </div>
                 <div className="text-left">
                   <h2 className="text-lg font-medium">{translations.landing.categories.grow.title}</h2>
                   <div className="text-xs text-gray-400">{translations.landing.categories.grow.desc[lang]}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2a2a2a]">
              {expandedCard !== 'grow' && (<div className="flex items-center gap-4 transition-colors">
                 <Activity size={18} className="text-rose-500" />
                 <PieChart size={18} className="text-blue-400" />
                 <Zap size={18} className="text-yellow-500" />
                 <TrendingUp size={18} className="text-green-500" />
                 <RefreshCw size={18} className="text-indigo-400" />
              </div>)}
              <button type="button" onClick={(e) => toggleExpand('grow', e)} className="ml-auto text-gray-500 hover:text-gray-100 p-1 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                 <ChevronDown size={20} className={`transform transition-transform ${expandedCard === 'grow' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <AnimatePresence>
               {expandedCard === 'grow' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                     <div className="flex flex-col gap-2 mt-4 mb-4">
                        {translations.landing.categories.grow.long[lang].split(/\r?\n\r?\n/).map((item, idx) => {
                           const match = item.match(/^(\d+)\s+(.*)$/);
                           if (match) {
                              let text = match[2];
                              text = text.replace(/;?$/, '.');
                              return (
                                 <div key={idx} className="flex gap-3 text-xs text-gray-400 text-left leading-relaxed">
                                    <span className="w-3 shrink-0 font-medium text-gray-500">{match[1]}</span>
                                    <span>{text}</span>
                                 </div>
                              );
                           }
                           return <p key={idx} className="text-xs text-gray-400 text-left leading-relaxed">{item}</p>;
                        })}
                     </div>
                     <div className="pt-4 mt-4 space-y-3 text-sm text-gray-400 border-t border-[#2a2a2a]">
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('grow', 'cat_profil'); }}>
                             <div className="flex items-center gap-3 text-rose-500"><Activity size={16} className="shrink-0"/> {translations.grow.tabs[0][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('grow', 'cat_alokasi'); }}>
                             <div className="flex items-center gap-3 text-blue-400"><PieChart size={16} className="shrink-0"/> {translations.grow.tabs[1][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('grow', 'cat_efektif'); }}>
                             <div className="flex items-center gap-3 text-yellow-500"><Zap size={16} className="shrink-0"/> {translations.grow.tabs[2][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('grow', 'cat_bunga'); }}>
                             <div className="flex items-center gap-3 text-green-500"><TrendingUp size={16} className="shrink-0"/> {translations.grow.tabs[3][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('grow', 'cat_rebalance'); }}>
                             <div className="flex items-center gap-3 text-indigo-400"><RefreshCw size={16} className="shrink-0"/> {translations.grow.tabs[4][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full bg-[#1e1e1e] rounded-2xl p-6 text-left relative border border-transparent mb-8"
            
          >
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-4 text-gray-100 transition-colors">
                 <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-[#2a2a2a]">
                   <BookOpen size={24} className="theme-icon" />
                 </div>
                 <div className="text-left">
                   <h2 className="text-lg font-medium">{translations.landing.categories.legacy.title}</h2>
                   <div className="text-xs text-gray-400">{translations.landing.categories.legacy.desc[lang]}</div>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2a2a2a]">
              {expandedCard !== 'legacy' && (<div className="flex items-center gap-4 transition-colors">
                 <GraduationCap size={18} className="text-sky-500" />
                 <Building size={18} className="text-slate-400" />
                 <HeartHandshake size={18} className="text-pink-500" />
                 <ReceiptText size={18} className="text-orange-500" />
                 <Gift size={18} className="text-teal-400" />
              </div>)}
              <button type="button" onClick={(e) => toggleExpand('legacy', e)} className="ml-auto text-gray-500 hover:text-gray-100 p-1 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                 <ChevronDown size={20} className={`transform transition-transform ${expandedCard === 'legacy' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <AnimatePresence>
               {expandedCard === 'legacy' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                     <div className="flex flex-col gap-2 mt-4 mb-4">
                        {translations.landing.categories.legacy.long[lang].split(/\r?\n\r?\n/).map((item, idx) => {
                           const match = item.match(/^(\d+)\s+(.*)$/);
                           if (match) {
                              let text = match[2];
                              text = text.replace(/;?$/, '.');
                              return (
                                 <div key={idx} className="flex gap-3 text-xs text-gray-400 text-left leading-relaxed">
                                    <span className="w-3 shrink-0 font-medium text-gray-500">{match[1]}</span>
                                    <span>{text}</span>
                                 </div>
                              );
                           }
                           return <p key={idx} className="text-xs text-gray-400 text-left leading-relaxed">{item}</p>;
                        })}
                     </div>
                     <div className="pt-4 mt-4 space-y-3 text-sm text-gray-400 border-t border-[#2a2a2a]">
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('legacy', 'cat_pembelajaran'); }}>
                             <div className="flex items-center gap-3 text-sky-500"><GraduationCap size={16} className="shrink-0"/> {translations.legacy.tabs[0][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('legacy', 'cat_tatakelola'); }}>
                             <div className="flex items-center gap-3 text-slate-400"><Building size={16} className="shrink-0"/> {translations.legacy.tabs[1][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('legacy', 'cat_amal'); }}>
                             <div className="flex items-center gap-3 text-pink-500"><HeartHandshake size={16} className="shrink-0"/> {translations.legacy.tabs[2][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('legacy', 'cat_likuidasi'); }}>
                             <div className="flex items-center gap-3 text-orange-500"><ReceiptText size={16} className="shrink-0"/> {translations.legacy.tabs[3][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                         <div className="flex items-center justify-between group cursor-pointer hover:text-gray-100 transition-colors" onClick={(e) => { e.stopPropagation(); onNavigate('legacy', 'cat_transfer'); }}>
                             <div className="flex items-center gap-3 text-teal-400"><Gift size={16} className="shrink-0"/> {translations.legacy.tabs[4][lang]}</div>
                             <ChevronRight size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        </div>
<motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center mt-6 space-x-4"
        >
          <button 
             className="flex-1 py-3 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-[#2a2a2a] transition-colors"
             title={translations.bottomNav.more[lang]}
             onClick={onUnavailable}
          >
             <MoreHorizontal size={24} />
          </button>
          <button 
             className="flex-1 py-3 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-[#2a2a2a] transition-colors"
             title={translations.bottomNav.favorites[lang]}
             onClick={onUnavailable}
          >
             <Star size={24} />
          </button>
          <button 
             onClick={() => onNavigate('profile')}
             className="flex-1 py-3 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-[#2a2a2a] transition-colors"
             title={translations.bottomNav.profile[lang]}
          >
             <User size={24} />
          </button>
          <button 
             onClick={() => onNavigate('settings')}
             className="flex-1 py-3 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-100 hover:bg-[#2a2a2a] transition-colors"
             title={translations.bottomNav.settings[lang]}
          >
             <Settings size={24} />
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
