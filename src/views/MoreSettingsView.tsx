import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useScrollRestore } from '../hooks/useScrollRestore';
import { useLanguage } from '../hooks/useLanguage';

export function MoreSettingsView({ onBack, onUnavailable }: { onBack: () => void, onUnavailable?: () => void }) {
  const { ref, onScroll } = useScrollRestore('MoreSettingsView_scroll');
  const lang = useLanguage();
  
  const getLanguageLabel = () => {
    switch(lang) {
      case 'id': return 'IDN';
      case 'en': return 'ENG';
      case 'ms': return 'MYS';
      case 'zh': return '中文';
      default: return 'IDN';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] sm:max-w-md w-full relative z-50">
      <div className="flex items-center gap-6 p-4 pt-5 mb-2">
        <button onClick={onBack}><ArrowLeft size={24} className="text-gray-100 hover:text-gray-100 transition-colors" /></button>
        <h1 className="text-lg font-normal text-gray-100">Pengaturan lainnya</h1>
      </div>

      <div ref={ref} onScroll={onScroll} className="overflow-y-auto pb-10">
         {/* Umum */}
         <div className="mt-4 mb-2 px-4">
            <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-1">Umum</h2>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Bahasa</p>
               <p className="text-sm text-gray-400">{getLanguageLabel()}</p>
            </div>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Layar awal</p>
               <p className="text-sm text-gray-400">Beranda</p>
            </div>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Tipe transaksi default</p>
               <p className="text-sm text-gray-400">Pengeluaran</p>
            </div>
         </div>

         <div className="h-[1px] bg-[#2a2a2a] my-1 mx-4"></div>

         {/* Tampilan */}
         <div className="mt-4 mb-2 px-4">
            <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-1">Tampilan</h2>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Format mata uang</p>
               <p className="text-sm text-gray-400">Rp 1.234.567,00</p>
            </div>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Mode tampilan transaksi</p>
               <p className="text-sm text-gray-400">Daftar</p>
            </div>
            <div className="py-3 flex justify-between items-center cursor-pointer pr-1" onClick={onUnavailable}>
               <div className="flex-1 pr-6">
                 <p className="text-base text-gray-100 font-normal">Waktu transaksi</p>
                 <p className="text-sm text-gray-400 leading-snug tracking-tight">Tampilkan waktu transaksi dan opsi pelacakan waktu</p>
               </div>
               <div className="w-11 h-6 bg-[#4a72ff] rounded-full flex items-center p-1 justify-end shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
               </div>
            </div>
         </div>

         <div className="h-[1px] bg-[#2a2a2a] my-2 mx-4"></div>

         {/* Tanggal */}
         <div className="mt-4 mb-2 px-4">
            <h2 className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-1">Tanggal</h2>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Hari pertama minggu</p>
               <p className="text-sm text-gray-400">Minggu</p>
            </div>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Hari pertama bulan</p>
               <p className="text-sm text-gray-400">1</p>
            </div>
            <div className="py-3 cursor-pointer" onClick={onUnavailable}>
               <p className="text-base text-gray-100 font-normal">Hari pertama tahun</p>
               <p className="text-sm text-gray-400">Januari 01</p>
            </div>
         </div>
      </div>
    </div>
  );
}
