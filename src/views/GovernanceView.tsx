import React from 'react';
import { ArrowLeft, BookOpen, Users2, ShieldAlert, BadgeCheck } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function GovernanceView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('GovernanceView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Tata Kelola</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-800/30 rounded-2xl p-6 mb-8 text-center text-gray-100">
           <Users2 size={32} className="text-indigo-400 mx-auto mb-3" />
           <div className="text-lg font-bold tracking-tight mb-2">Konstitusi Keluarga</div>
           <p className="text-indigo-200/70 text-sm leading-relaxed max-w-xs mx-auto">
              Kesepakatan nilai-nilai inti keluarga dan kerangka kerja untuk pengambilan keputusan lintas generasi.
           </p>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Literasi Finansial Generasi Penerus</h3>
        <div className="space-y-4 mb-8">
           <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                    <BadgeCheck size={20} />
                 </div>
                 <div>
                    <h4 className="text-gray-100 font-medium">Kurikulum Usia 13-17</h4>
                    <p className="text-gray-500 text-xs mt-0.5">Pengenalan budgeting & menabung</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#2a2a2a] p-3 rounded-lg">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                 Budi Santoso telah menyelesaikan modul 1 (Budgeting)
              </div>
           </div>
           <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                    <BookOpen size={20} />
                 </div>
                 <div>
                    <h4 className="text-gray-100 font-medium">Kurikulum Usia 18+</h4>
                    <p className="text-gray-500 text-xs mt-0.5">Pemahaman kredit & investasi dasar</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#2a2a2a] p-3 rounded-lg">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a]"></span>
                 Belum ada generasi penerus di kategori usia ini.
              </div>
           </div>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Mekanisme Resolusi Konflik</h3>
        <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] flex items-start gap-4">
           <div className="pt-1">
              <ShieldAlert className="text-orange-400" size={24} />
           </div>
           <div>
              <h4 className="text-gray-100 font-medium text-sm mb-1">Dewan Keluarga Tetap</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                 Dibentuk untuk menengahi perbedaan pendapat dalam pengelolaan harta waris atau bisnis keluarga.
              </p>
              <div className="bg-[#2a2a2a] px-3 py-2 rounded-lg text-xs text-gray-400 border border-[#2a2a2a]">
                 Penengah Eksternal: Dr. H. Rahman, MA (Konsultan)
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
