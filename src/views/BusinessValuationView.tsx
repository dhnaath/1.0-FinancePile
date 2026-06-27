import React from 'react';
import { ArrowLeft, Store, LineChart, Briefcase } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function BusinessValuationView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('BusinessValuationView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Valuasi Bisnis</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
               <Store size={32} className="text-blue-400" />
            </div>
            <div className="text-gray-400 text-sm mb-1">Estimasi Total Ekuitas Bisnis</div>
            <div className="text-gray-100 text-2xl font-bold">Rp 0</div>
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Portofolio Kepemilikan</h3>
         
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] mb-8 text-center">
            <p className="text-gray-500 text-sm">Belum ada portofolio bisnis.</p>
         </div>
      </div>
    </div>
  );
}
