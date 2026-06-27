import React from 'react';
import { ArrowLeft, Diamond, KeyRound, ReceiptText, Building2 } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function ValuablesInventoryView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('ValuablesInventoryView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Inventaris Barang Berharga</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center">
            <p className="text-gray-500 text-sm">Belum ada barang berharga.</p>
         </div>
      </div>
    </div>
  );
}

export function DigitalWillView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('DigitalWillView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Pesan Terakhir (Digital Will)</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-center items-center h-48 text-center">
            <KeyRound size={32} className="text-emerald-400 mb-3" />
            <h3 className="text-emerald-400 text-sm font-medium mb-1">Brankas Terkunci</h3>
            <p className="text-gray-400 text-xs">Data rahasia ini hanya bisa dibuka oleh pengacara keluarga sesuai klausul kematian.</p>
         </div>
      </div>
    </div>
  );
}

export function EstateTaxView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('EstateTaxView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Simulasi Pajak Waris/Hibah</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-orange-900/30 text-center">
            <ReceiptText size={32} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-gray-100 text-sm font-medium mb-1">Estimasi BPHTB Turun Waris</h3>
            <p className="text-gray-500 text-xs mt-2">Anda belum melakukan simulasi.</p>
         </div>
      </div>
    </div>
  );
}

export function FamilyFoundationView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('FamilyFoundationView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Yayasan Keluarga</h1>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] text-center h-48 flex flex-col items-center justify-center">
            <Building2 size={32} className="text-gray-500 mb-3" />
            <h3 className="text-gray-100 text-sm font-medium mb-1">Yayasan Belum Dibentuk</h3>
            <p className="text-gray-500 text-xs max-w-xs">Buat entitas hukum tersendiri untuk mengelola kegiatan sosial keluarga secara profesional layaknya CSR.</p>
         </div>
      </div>
    </div>
  );
}
