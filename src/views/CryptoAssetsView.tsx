import React from 'react';
import { ArrowLeft, Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function CryptoAssetsView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('CryptoAssetsView_scroll');
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide">Aset Kripto</h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-orange-900/30 mb-8">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-gray-400 text-sm mb-1">Total Nilai Kripto</div>
                  <div className="text-gray-100 text-2xl font-bold">Rp 0</div>
               </div>
               <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                  <Bitcoin size={24} />
               </div>
            </div>
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Portofolio</h3>
         
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada portofolio aset kripto.</p>
         </div>
      </div>
    </div>
  );
}
