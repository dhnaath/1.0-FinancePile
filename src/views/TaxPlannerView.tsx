import React from 'react';
import { ArrowLeft, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function TaxPlannerView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('TaxPlannerView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Calculator size={20} className="text-gray-400" /> Perencanaan Pajak</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-indigo-900/30 mb-8 flex items-center justify-between">
            <div>
               <div className="text-gray-400 text-sm mb-1">Estimasi PPh 21 Kurang Bayar</div>
               <div className="text-indigo-400 text-2xl font-bold">Rp 0</div>
               <div className="text-gray-500 text-xs mt-1">Estimasi aman berdasarkan PPh ditanggung perusahaan.</div>
            </div>
            <Calculator size={48} className="text-indigo-500/20" />
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Aset & Pajak Terkait</h3>
         <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] mb-8 overflow-hidden">
            <div className="p-8 text-center">
               <p className="text-gray-500 text-sm">Belum ada aset & pajak terkait.</p>
            </div>
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Bukti Potong & Dokumen</h3>
         <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] mb-8 overflow-hidden">
            <div className="p-8 text-center">
               <p className="text-gray-500 text-sm">Belum ada bukti potong & dokumen yang diunggah.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
