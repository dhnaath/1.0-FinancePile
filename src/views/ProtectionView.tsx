import React from 'react';
import { ArrowLeft, Lock, KeyRound, HardDrive, Fingerprint, ShieldAlert, Shield } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function ProtectionView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('ProtectionView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Shield size={20} className="text-gray-400" /> Proteksi Aset</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Manajemen Brankas Digital</h3>
        
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada data brankas digital.</p>
        </div>

        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Akses Fisik & Mandat Darurat</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada mandat darurat yang.didaftarkan.</p>
        </div>
      </div>
    </div>
  );
}
