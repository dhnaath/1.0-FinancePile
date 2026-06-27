import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Building, HeartHandshake, ReceiptText, Gift } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../translations';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function LegacyView({ currentTab, onBack, onSelectTab, onUnavailable }: { currentTab: string, onBack: () => void, onSelectTab?: (tab: string) => void, onUnavailable?: () => void }) {
  const { ref, onScroll } = useScrollRestore('LegacyView_scroll');
  const lang = useLanguage();

  
  let title = translations.legacy.viewTitle[lang];
  let Icon = BookOpen;
  let iconColor = "text-gray-400";
  
  if (currentTab === 'cat_pembelajaran') { title = translations.legacy.tabs[0][lang]; Icon = GraduationCap; iconColor = "text-sky-500"; }
  if (currentTab === 'cat_tatakelola') { title = translations.legacy.tabs[1][lang]; Icon = Building; iconColor = "text-slate-400"; }
  if (currentTab === 'cat_amal') { title = translations.legacy.tabs[2][lang]; Icon = HeartHandshake; iconColor = "text-pink-500"; }
  if (currentTab === 'cat_likuidasi') { title = translations.legacy.tabs[3][lang]; Icon = ReceiptText; iconColor = "text-orange-500"; }
  if (currentTab === 'cat_transfer') { title = translations.legacy.tabs[4][lang]; Icon = Gift; iconColor = "text-teal-400"; }

  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Icon size={20} className={iconColor} /> {title}</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 flex flex-col items-center justify-center p-6 pb-20 text-[#666]">
        <p className="text-sm">Segera Hadir / Coming Soon</p>
      </div>
    </div>
  );
}
