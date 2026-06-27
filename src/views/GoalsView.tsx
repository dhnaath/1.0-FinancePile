import React, { useState } from 'react';
import { ChevronLeft, Plus, Target, ShieldAlert, GraduationCap, Umbrella, Plane, ChevronRight, Crown, LifeBuoy } from 'lucide-react';
import { motion } from 'motion/react';
import { useDeletedItems } from '../hooks/useDeletedItems';

export function GoalsView({ onBack }: { onBack: () => void }) {
  const { deletedIds, markDeleted } = useDeletedItems('deleted_goals');
  const [goals, setGoals] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('goals_list');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const removeGoal = (id: number) => {
    markDeleted(id);
    setGoals(g => g.filter(x => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#121212] p-4 font-sans text-gray-100 flex flex-col pb-20 relative">
      <div className="flex justify-between items-center mb-6 pt-2">
        <div className="flex items-center gap-3">
           <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
              <ChevronLeft size={28} strokeWidth={2} />
           </button>
           <h1 className="text-lg font-normal tracking-wide text-gray-100 flex items-center gap-2"><LifeBuoy size={20} className="text-gray-400" /> Tujuan Keuangan</h1>
        </div>
        <button onClick={() => alert("Fitur tambah tujuan segera tersedia!")} className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-[#4caf50] hover:bg-[#2a2a2a] transition-colors">
          <Plus size={18} />
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#1e3c72] to-[#121212] rounded-3xl p-6 border border-[#2a5298] shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-gray-100 opacity-5">
          <Umbrella size={140} />
        </div>
        <p className="text-sm font-medium text-blue-300 mb-1 relative z-10">Total Tabungan Tujuan</p>
        <p className="text-2xl font-medium text-gray-100 tracking-tight mb-4 relative z-10">Rp 0</p>
        
        <div className="w-full bg-[#1e1e1e] rounded-full h-2.5 mb-2 relative z-10 overflow-hidden border border-[#3b6ab8]/30">
          <div className="bg-[#00bcd4] h-2.5 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-blue-200 relative z-10 font-medium">
           <span>0% Terkumpul</span>
           <span>Target: Rp 0</span>
        </div>
      </div>

      <h2 className="text-sm font-medium text-gray-500 mb-4 px-1 uppercase tracking-wider">Perencanaan Anda</h2>

      {goals.length === 0 ? (
        <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-dashed border-[#2a2a2a] text-center mb-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors">
           <Target size={32} className="text-gray-500 mb-3" />
           <p className="text-sm text-gray-400">Belum ada target perencanaan</p>
           <p className="text-xs text-[#00bcd4] mt-2 font-medium">Buat Tujuan Keuangan Baru</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, idx) => {
          const progress = (goal.current / goal.target) * 100;
          return (
             <div key={goal.id} className="relative mb-4 bg-[#1e1e1e]/60 rounded-2xl overflow-hidden border border-[#2a2a2a]">
                 <div className="absolute inset-0 flex items-center justify-between px-6 z-0">
                   <div className="flex items-center gap-2 text-blue-400">
                      <span className="text-xs font-medium uppercase tracking-widest">Arsip</span>
                   </div>
                   <div className="flex items-center gap-2 text-red-500">
                      <span className="text-xs font-medium uppercase tracking-widest">Hapus</span>
                   </div>
                 </div>
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => {
                 if (info.offset.x < -100) {
                    if (window.confirm("Hapus tujuan ini?")) {
                      removeGoal(goal.id);
                    }
                 } else if (info.offset.x > 100) {
                    alert("Tujuan diarsipkan.");
                    removeGoal(goal.id);
                 }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1e1e1e] border-y border-[#2a2a2a] p-5 rounded-2xl cursor-pointer hover:bg-[#2a2a2a] transition-colors relative z-10"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${goal.color}`}>
                    {goal.icon}
                 </div>
                 <div className="flex-1">
                    <h3 className="font-medium text-base text-gray-100">{goal.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Target: {goal.date}</p>
                 </div>
                 <ChevronRight size={20} className="text-gray-500" />
              </div>
              
              <div className="flex justify-between items-end mb-2">
                 <div className="text-sm font-medium text-gray-400">
                   Rp {goal.current.toLocaleString('id-ID')}
                 </div>
                 <div className="text-xs text-gray-500">
                   dari Rp {goal.target.toLocaleString('id-ID')}
                 </div>
              </div>
              
              <div className="w-full bg-[#121212] rounded-full h-2 border border-[#2a2a2a] overflow-hidden">
                 <div 
                   className="h-full rounded-full bg-[#4caf50]" 
                   style={{ width: `${progress}%` }}
                 ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Progress</span>
                <span className="text-xs font-medium text-[#4caf50]">{progress.toFixed(1)}%</span>
              </div>
            </motion.div>
             </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
