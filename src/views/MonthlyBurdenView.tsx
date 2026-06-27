import React from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useDebts } from '../hooks/useDebts';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function MonthlyBurdenView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('MonthlyBurdenView_scroll');
  const { debts } = useDebts();
  
  const filteredDebts = debts.filter(d => (d.accountClass || 'kredit') === 'kredit');
  
  let bebanBulanan = filteredDebts.reduce((sum, d) => sum + (d.monthlyPayment || 0), 0);
  filteredDebts.forEach(debt => {
    if (debt.fees) {
      debt.fees.forEach(fee => {
        if (fee.frequency === 'bulanan') bebanBulanan += fee.amount;
        else if (fee.frequency === 'tahunan') bebanBulanan += (fee.amount / 12);
      });
    }
  });

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2">
          <Calculator size={20} className="text-gray-400" /> Estimasi Beban Bulanan
        </h1>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
        <div className="bg-[#1e1e1e] rounded-2xl p-6 mb-6 border border-[#2a2a2a]">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Total Estimasi Beban</p>
          <p className="text-3xl font-medium text-gray-100">{formatIDR(bebanBulanan)}<span className="text-sm text-gray-500 font-normal">/bln</span></p>
        </div>

        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1">Rincian Beban</h2>
        <div className="space-y-3">
          {filteredDebts.map(debt => {
            let itemBurden = debt.monthlyPayment || 0;
            if (debt.fees) {
              debt.fees.forEach(fee => {
                if (fee.frequency === 'bulanan') itemBurden += fee.amount;
                else if (fee.frequency === 'tahunan') itemBurden += (fee.amount / 12);
              });
            }

            if (itemBurden === 0) return null;

            return (
              <div key={debt.id} className="bg-[#1a1a1a] p-4 rounded-xl flex justify-between items-center border border-[#222]">
                <div className="flex flex-col">
                  <span className="text-gray-200 font-medium">{debt.name}</span>
                  <span className="text-xs text-gray-500">{debt.bank}</span>
                </div>
                <span className="text-red-400 font-medium">{formatIDR(itemBurden)}</span>
              </div>
            );
          })}
          {filteredDebts.every(d => !d.monthlyPayment && (!d.fees || d.fees.length === 0)) && (
            <div className="text-center p-6 border border-dashed border-[#333] rounded-xl">
              <p className="text-gray-500 text-sm">Belum ada data beban bulanan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
