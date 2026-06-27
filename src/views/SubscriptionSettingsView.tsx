import React from 'react';
import { ArrowLeft, Bell, Calendar, CreditCard, Shield, ChevronRight } from 'lucide-react';

export function SubscriptionSettingsView({ onBack, onUnavailable }: { onBack: () => void, onUnavailable?: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] sm:max-w-md w-full relative z-50">
      <div className="flex items-center gap-6 p-4 pt-5 mb-2">
        <button onClick={onBack}><ArrowLeft size={24} className="text-gray-100 hover:text-gray-100 transition-colors" /></button>
        <h1 className="text-lg font-normal text-gray-100">Pengaturan Subscriptions</h1>
      </div>

      <div className="p-4 space-y-2">
        <div className="py-2 space-y-1">
           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <Bell size={24} className="text-[#ff9800]" />
              <div className="flex flex-col flex-1">
                 <span className="text-base text-gray-100 font-normal">Pengingat Tagihan</span>
                 <span className="text-sm text-gray-400">3 hari sebelum jatuh tempo</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <CreditCard size={24} className="text-[#1976d2]" />
              <div className="flex flex-col flex-1">
                 <span className="text-base text-gray-100 font-normal">Metode Pembayaran Default</span>
                 <span className="text-sm text-gray-400">BCA Akhiran 4829</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <Calendar size={24} className="text-[#4caf50]" />
              <div className="flex flex-col flex-1">
                 <span className="text-base text-gray-100 font-normal">Mata Uang Layanan Asing</span>
                 <span className="text-sm text-gray-400">Konversi Otomatis (IDR)</span>
              </div>
              <div className="w-10 h-5 bg-[#4caf50] rounded-full flex items-center p-1 cursor-pointer justify-end">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <Shield size={24} className="text-purple-400" />
              <div className="flex flex-col flex-1">
                 <span className="text-base text-gray-100 font-normal">Privasi Berlangganan</span>
                 <span className="text-sm text-gray-400">Sembunyikan nominal di Dasbor</span>
              </div>
              <div className="w-10 h-5 bg-[#2a2a2a] rounded-full flex items-center p-1 cursor-pointer">
                 <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
