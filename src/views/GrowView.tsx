import React from 'react';
import { ArrowLeft, TrendingUp, Activity, PieChart, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../translations';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function GrowView({ currentTab, onBack, onSelectTab, onUnavailable }: { currentTab: string, onBack: () => void, onSelectTab?: (tab: string) => void, onUnavailable?: () => void }) {
  const { ref, onScroll } = useScrollRestore('GrowView_scroll');
  const lang = useLanguage();

  
  let title = translations.grow.viewTitle[lang];
  let Icon = TrendingUp;
  let iconColor = "text-gray-400";
  
  if (currentTab === 'cat_profil') { title = translations.grow.tabs[0][lang]; Icon = Activity; iconColor = "text-rose-500"; }
  if (currentTab === 'cat_alokasi') { title = translations.grow.tabs[1][lang]; Icon = PieChart; iconColor = "text-blue-400"; }
  if (currentTab === 'cat_efektif') { title = translations.grow.tabs[2][lang]; Icon = Zap; iconColor = "text-yellow-500"; }
  if (currentTab === 'cat_bunga') { title = translations.grow.tabs[3][lang]; Icon = TrendingUp; iconColor = "text-green-500"; }
  if (currentTab === 'cat_rebalance') { title = translations.grow.tabs[4][lang]; Icon = RefreshCw; iconColor = "text-indigo-400"; }

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
