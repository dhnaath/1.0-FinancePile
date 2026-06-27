import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Award, Briefcase } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function HumanCapitalView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('HumanCapitalView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Pengembangan Diri</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2a2a2a] mb-8 relative overflow-hidden text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
               <GraduationCap size={32} className="text-blue-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-100 mb-2">Human Capital (Nilai Karir)</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
               Kemampuan, pendidikan, dan pengalaman yang Anda miliki sebagai aset tidak berwujud yang menghasilkan pendapatan jangka panjang.
            </p>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Investasi Pendidikan & Skill</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada rekam jejak pendidikan dan skill didaftarkan.</p>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Jaringan & Relasi (Social Capital)</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada rekam jaringan atau relasi aktif didaftarkan.</p>
        </div>
      </div>
    </div>
  );
}
