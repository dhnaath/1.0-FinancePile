import React from 'react';
import { ArrowLeft, Umbrella, Activity, Plus } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function InsuranceView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('InsuranceView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center justify-between pt-6 shrink-0 bg-[#121212]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Umbrella size={20} className="text-gray-400" /> Asuransi</h1>
        </div>
        <button className="text-emerald-400 p-1 hover:text-emerald-300 transition-colors">
          <Plus size={24} />
        </button>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 rounded-2xl">
            <div className="text-gray-400 text-xs mb-1">Total Premi Tahunan</div>
            <div className="text-gray-100 font-semibold text-lg">Rp 0</div>
          </div>
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 rounded-2xl">
            <div className="text-gray-400 text-xs mb-1">Total Pertanggungan</div>
            <div className="text-emerald-400 font-semibold text-lg">Rp 0</div>
          </div>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Polis Aktif</h3>

        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada polis aktif.</p>
        </div>
      </div>
    </div>
  );
}
