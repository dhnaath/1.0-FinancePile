import React from 'react';
import { ArrowLeft, Target, Zap } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function RiskProfileView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('RiskProfileView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Profil Risiko</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada evaluasi profil risiko.</p>
        </div>

        <button className="w-full mt-8 py-4 bg-[#2a2a2a] hover:bg-[#2a2a2a] text-gray-100 font-medium rounded-xl transition-colors border border-[#2a2a2a]">
          Mulai Evaluasi Profil
        </button>
      </div>
    </div>
  );
}
