import React from 'react';
import { ArrowLeft, Activity, Compass, PiggyBank, GraduationCap, Car } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function FinancialHealthView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('FinancialHealthView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Cek Kesehatan Finansial</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada data untuk cek kesehatan finansial.</p>
         </div>
      </div>
    </div>
  );
}

export function PortfolioRecommendationView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('PortfolioRecommendationView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Rekomendasi Portofolio</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada rekomendasi portofolio berdasarkan profil Anda.</p>
         </div>
      </div>
    </div>
  );
}

export function MortgageSimulatorView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('MortgageSimulatorView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Simulasi KPR & Kredit</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <PiggyBank size={32} className="text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Masukan plafon, tenor, dan suku bunga untuk memulai simulasi KPR/Kredit.</p>
         </div>
      </div>
    </div>
  );
}

export function ChildEducationPlanView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('ChildEducationPlanView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Rencana Pendidikan</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada rencana pendidikan yang didaftarkan.</p>
         </div>
      </div>
    </div>
  );
}
