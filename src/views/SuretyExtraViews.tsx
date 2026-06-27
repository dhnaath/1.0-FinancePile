import React from 'react';
import { ArrowLeft, Calculator, FileText, Users, Activity, Car, HeartCrack } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function InsuranceCalculatorView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('InsuranceCalculatorView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Kalkulator Uang Pertanggungan</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2a2a2a] text-center">
            <Calculator size={32} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-gray-100 text-sm font-medium mb-1">Human Life Value (HLV)</h3>
            <p className="text-gray-500 text-xs">Anda belum menghitung nilai pertanggungan.</p>
         </div>
      </div>
    </div>
  );
}

export function ClaimsHistoryView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('ClaimsHistoryView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Pencatatan Klaim Riwayat</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada riwayat klaim.</p>
         </div>
      </div>
    </div>
  );
}

export function BeneficiaryManagerView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('BeneficiaryManagerView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Penerima Manfaat Polis</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada penerima manfaat.</p>
         </div>
      </div>
    </div>
  );
}

export function HealthRiskView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('HealthRiskView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Evaluasi Risiko Kesehatan</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada data evaluasi risiko.</p>
         </div>
      </div>
    </div>
  );
}

export function CriticalIllnessView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('CriticalIllnessView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><HeartCrack size={20} className="text-gray-400" /> Penyakit Kritis (CI)</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada pertanggungan penyakit kritis.</p>
         </div>
      </div>
    </div>
  );
}

export function GeneralInsuranceView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('GeneralInsuranceView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Asuransi Umum</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada data asuransi umum.</p>
         </div>
      </div>
    </div>
  );
}

export function UnitLinkComparisonView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('UnitLinkComparisonView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Unit Link vs Tradisional</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada perbandingan unit link vs tradisional.</p>
         </div>
      </div>
    </div>
  );
}

export function EndowmentView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('EndowmentView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Asuransi Dwiguna</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada polis dwiguna.</p>
         </div>
      </div>
    </div>
  );
}

export function TermLifeView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('TermLifeView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Term Life / Berjangka</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada polis term life.</p>
         </div>
      </div>
    </div>
  );
}
