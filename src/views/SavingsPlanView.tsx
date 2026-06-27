import React, { useState } from 'react';
import { ArrowLeft, PiggyBank, Target, Calendar, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useDeletedItems } from '../hooks/useDeletedItems';
import { useScrollRestore } from '../hooks/useScrollRestore';

export function SavingsPlanView({ onBack }: { onBack: () => void }) {
  const { ref, onScroll } = useScrollRestore('SavingsPlanView_scroll');
  const { deletedIds, markDeleted } = useDeletedItems('deleted_savings');
  const [plans, setPlans] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('savings_plans');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const removePlan = (id: number) => {
    markDeleted(id);
    setPlans(p => p.filter(plan => plan.id !== id));
  };

  const totalMonthly = plans.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] relative">
      <div className="p-4 flex items-center justify-between pt-6 shrink-0 bg-[#121212]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><PiggyBank size={20} className="text-gray-400" /> Tabungan Berkala</h1>
        </div>
        <button onClick={() => {}} className="text-[#4caf50] p-1.5 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors">
          <Plus size={20} />
        </button>
      </div>
      
      <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/30 rounded-2xl p-6 mb-8 text-center text-gray-100 relative">
            <PiggyBank size={32} className="text-emerald-400 mx-auto mb-3" />
            <div className="text-gray-400 text-sm mb-1">Total Tabungan Otomatis</div>
            <div className="text-2xl font-bold tracking-tight">Rp 0</div>
         </div>

         <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Aturan Autodebet</h3>
         <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada aturan autodebet.</p>
         </div>
      </div>
    </div>
  );
}
