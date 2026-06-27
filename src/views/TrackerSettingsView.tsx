import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Tags, Calendar, DownloadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function TrackerSettingsView({ onBack, onUnavailable }: { onBack: () => void, onUnavailable?: () => void }) {
  const [backupStatus, setBackupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleBackup = async () => {
    const token = localStorage.getItem('googleAccessToken');
    if (!token) {
      alert('Silakan Masuk dengan Google terlebih dahulu di halaman Profil.');
      return;
    }

    setBackupStatus('loading');
    try {
      // Create data object to backup
      const transactions = localStorage.getItem('transactions_data');
      const backupData = {
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
        transactions: transactions ? JSON.parse(transactions) : [],
        categories: []
      };

      const response = await fetch('/api/drive/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: token,
          backupData
        })
      });

      if (!response.ok) {
        throw new Error('Gagal mencadangkan ke Google Drive');
      }

      setBackupStatus('success');
      setTimeout(() => setBackupStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setBackupStatus('error');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] sm:max-w-md w-full relative z-50">
      <div className="flex items-center gap-6 p-4 pt-5 mb-2">
        <button onClick={onBack}><ArrowLeft size={24} className="text-gray-100 hover:text-gray-100 transition-colors" /></button>
        <h1 className="text-lg font-normal text-gray-100">Pengaturan Tracker</h1>
      </div>

      <div className="p-4 space-y-2">
        <div className="py-2 space-y-1">
           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <BookOpen size={24} className="text-[#00bcd4]" />
              <div className="flex flex-col">
                 <span className="text-base text-gray-100 font-normal">Kategori Utama</span>
                 <span className="text-sm text-gray-400">Atur kategori pemasukan & pengeluaran</span>
              </div>
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <Tags size={24} className="text-[#4caf50]" />
              <div className="flex flex-col">
                 <span className="text-base text-gray-100 font-normal">Manajemen Label</span>
                 <span className="text-sm text-gray-400">Kelola tag kustom untuk transaksi</span>
              </div>
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <Calendar size={24} className="text-[#ff9800]" />
              <div className="flex flex-col">
                 <span className="text-base text-gray-100 font-normal">Siklus Bulanan</span>
                 <span className="text-sm text-gray-400">Dimulai setiap tanggal 1</span>
              </div>
           </div>

           <div className="h-[1px] bg-[#2a2a2a] my-4"></div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer relative" onClick={handleBackup}>
              <DownloadCloud size={24} className="text-gray-400" />
              <div className="flex flex-col">
                 <span className="text-base text-gray-100 font-normal">Pencadangan Tracker</span>
                 <span className="text-sm text-gray-400">
                   {backupStatus === 'loading' ? 'Mencadangkan...' : 'Sinkronkan ke Google Drive'}
                 </span>
              </div>
              {backupStatus === 'loading' && (
                <div className="absolute right-4 w-5 h-5 border-2 border-t-white border-transparent rounded-full animate-spin"></div>
              )}
              {backupStatus === 'success' && (
                <CheckCircle2 className="absolute right-4 text-[#4caf50]" size={20} />
              )}
              {backupStatus === 'error' && (
                <AlertCircle className="absolute right-4 text-red-500" size={20} />
              )}
           </div>

           <div className="flex items-center gap-6 py-4 px-2 cursor-pointer" onClick={onUnavailable}>
              <FileText size={24} className="text-gray-400" />
              <span className="text-base text-gray-100 font-normal">Laporan & Ekspor Berkas</span>
           </div>
        </div>
      </div>
    </div>
  );
}
