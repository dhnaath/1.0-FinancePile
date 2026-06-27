import React from 'react';
import { ArrowLeft, Settings, Brain, Network, Briefcase, Landmark, BookOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../translations';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function BuildView({ currentTab, onBack, onSelectTab, onUnavailable }: { currentTab: string, onBack: () => void, onSelectTab?: (tab: string) => void, onUnavailable?: () => void }) {
  const { ref, onScroll } = useScrollRestore('BuildView_scroll');
  const lang = useLanguage();

  
  let title = translations.build.viewTitle[lang];
  let Icon = Settings;
  let iconColor = "text-gray-400";
  
  if (currentTab === 'cat_modal') { title = translations.build.tabs[0][lang]; Icon = Brain; iconColor = "text-purple-500"; }
  if (currentTab === 'cat_jaringan') { title = translations.build.tabs[1][lang]; Icon = Network; iconColor = "text-blue-500"; }
  if (currentTab === 'cat_portofolio') { title = translations.build.tabs[2][lang]; Icon = Briefcase; iconColor = "text-amber-500"; }
  if (currentTab === 'cat_kekayaan') { title = translations.build.tabs[3][lang]; Icon = Landmark; iconColor = "text-green-600"; }
  if (currentTab === 'cat_pembukuan') { title = translations.build.tabs[4][lang]; Icon = BookOpen; iconColor = "text-orange-400"; }

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
