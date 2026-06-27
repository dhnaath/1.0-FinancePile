import React from 'react';
import { ArrowLeft, Heart, HandCoins, Building2, BookOpen } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function PhilanthropyView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('PhilanthropyView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Charitable Contribution</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/30 rounded-2xl p-6 mb-8 text-center text-gray-100">
           <Heart size={32} className="text-emerald-400 mx-auto mb-3" />
           <div className="text-gray-400 text-sm mb-1">Total Kontribusi Sosial (YTD)</div>
           <div className="text-2xl font-bold tracking-tight">Rp 0</div>
           <button className="mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors">
              Catat Pengeluaran Baru
           </button>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Kalkulator Zakat</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada perhitungan zakat.</p>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Alokasi Sadaqah & Waqaf</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada alokasi sadaqah atau waqaf.</p>
        </div>

      </div>
    </div>
  );
}
