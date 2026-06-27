import React, { useState } from 'react';
import { ChevronLeft, Plus, Play, Pause, AlertCircle, RefreshCw, Settings, Trash2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDeletedItems } from '../hooks/useDeletedItems';

export function SubscriptionManagerView({ onBack, onSettings }: { onBack: () => void, onSettings: () => void }) {
  const { deletedIds, markDeleted } = useDeletedItems('deleted_subscriptions');
  const [subscriptions, setSubscriptions] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('subscriptions_list');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleStatus = (id: number) => {
    setSubscriptions(subs => subs.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s));
  };

  const removeSub = (id: number) => {
    markDeleted(id);
    setSubscriptions(subs => subs.filter(s => s.id !== id));
  };

  const totalMonthly = subscriptions.filter(s => s.status === 'active').reduce((acc, curr) => acc + curr.price, 0);
  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const pausedCount = subscriptions.filter(s => s.status === 'paused').length;

  return (
    <div className="min-h-screen bg-[#121212] p-4 font-sans text-gray-100 flex flex-col pb-20 relative">
      <div className="flex justify-between items-center mb-6 pt-2">
        <div className="flex items-center gap-3">
           <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
              <ChevronLeft size={28} strokeWidth={2} />
           </button>
           <h1 className="text-lg font-normal tracking-wide text-gray-100 flex items-center gap-2"><Target size={20} className="text-gray-400" /> Pembayaran Berulang</h1>
        </div>
        <div className="flex gap-2">
           <button className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:bg-[#2a2a2a] transition-colors" onClick={onSettings}>
             <Settings size={18} />
           </button>
           <button onClick={() => {}} className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-[#4caf50] hover:bg-[#2a2a2a] transition-colors">
             <Plus size={18} />
           </button>
        </div>
      </div>

      <div className="mb-6">
         <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] shadow-md">
           <p className="text-sm font-medium text-gray-400 mb-1">Total Bulanan Estimasi</p>
           <p className="text-2xl font-medium text-gray-100 tracking-tight">Rp {totalMonthly.toLocaleString('id-ID')}</p>
           <div className="mt-4 flex gap-2">
             <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#2a2a2a] px-2.5 py-1.5 rounded-full">
               <RefreshCw size={12} className="text-[#00bcd4]" /> {activeCount} Aktif
             </div>
             {pausedCount > 0 && (
               <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#2a2a2a] px-2.5 py-1.5 rounded-full">
                 <AlertCircle size={12} className="text-[#ff9800]" /> {pausedCount} Menunggu
               </div>
             )}
           </div>
         </div>
      </div>

      <h2 className="text-sm font-medium text-gray-500 mb-4 px-1 uppercase tracking-wider">Daftar Pembayaran</h2>
      
      {subscriptions.length === 0 ? (
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada daftar pembayaran rutin.</p>
        </div>
      ) : (
      <div className="space-y-3">
        <AnimatePresence>
        {subscriptions.map(sub => (
          <div key={sub.id} className="relative mb-3 bg-[#1e1e1e]/60 rounded-2xl overflow-hidden border border-[#2a2a2a]">
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
                     if (window.confirm("Apakah Anda yakin ingin menghapus langganan ini?")) {
                       removeSub(sub.id);
                     }
                  } else if (info.offset.x > 100) {
                     alert("Langganan diarsipkan.");
                     removeSub(sub.id);
                  }
               }}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="w-full bg-[#1e1e1e] border-y border-[#2a2a2a] rounded-2xl p-4 flex items-center gap-4 relative z-10 hover:bg-[#2a2a2a] transition-colors"
             >
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-gray-100 text-lg font-bold ${sub.color}`}>
                 {sub.icon}
               </div>
               <div className="flex-1">
                 <h3 className="text-base font-medium text-gray-100">{sub.name}</h3>
                 <p className="text-xs text-gray-400 mt-0.5">Rp {sub.price.toLocaleString('id-ID')} • {sub.nextBilling}</p>
               </div>
               <div onClick={(e) => { e.stopPropagation(); toggleStatus(sub.id); }}>
                 {sub.status === 'active' ? (
                   <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400 cursor-pointer hover:text-gray-100 transition-colors">
                     <Pause size={16} />
                   </div>
                 ) : (
                   <div className="w-8 h-8 rounded-full bg-[#1b2f21] flex items-center justify-center text-[#4caf50] cursor-pointer hover:bg-[#2e5238] transition-colors">
                     <Play size={16} />
                   </div>
                 )}
               </div>
             </motion.div>
          </div>
        ))}
        </AnimatePresence>
      </div>
      )}
    </div>
  );
}
