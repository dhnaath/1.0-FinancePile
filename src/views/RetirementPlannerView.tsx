import React from 'react';
import { ArrowLeft, Clock, Sunrise, Target, TrendingUp } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function RetirementPlannerView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('RetirementPlannerView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Perencanaan Pensiun</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2a2a2a] mb-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-5">
               <Sunrise size={120} />
            </div>
            <div className="flex justify-between items-end mb-6 relative">
               <div>
                  <div className="text-gray-400 text-sm mb-1">Target Usia Pensiun</div>
                  <div className="text-gray-100 text-2xl font-bold">-</div>
               </div>
               <div className="text-right">
                  <div className="text-gray-500 text-xs mb-1">Waktu Tersisa</div>
                  <div className="text-emerald-400 font-medium">-</div>
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs mb-1">
                     <span className="text-gray-400">Target Dana Pribadi (FIRE)</span>
                     <span className="text-gray-100 font-medium">Rp 0</span>
                  </div>
                  <div className="w-full bg-[#121212] rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">Estimasi Saat Ini: Rp 0</div>
               </div>
            </div>
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Aset Program Pensiun</h3>
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada aset pensiun (JHT/DPLK).</p>
         </div>

         <button className="w-full mt-8 py-4 bg-[#2a2a2a] hover:bg-[#2a2a2a] text-gray-100 font-medium rounded-xl transition-colors border border-[#2a2a2a] flex items-center justify-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" /> Simulasi Tambah Top-Up
         </button>
      </div>
    </div>
  );
}
