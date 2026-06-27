import React from 'react';
import { ArrowLeft, ShieldCheck, Smartphone, Mail, Key, Lock } from 'lucide-react';

export function AccountSecurityView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-screen bg-[#121212] relative overflow-hidden">
      <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
        <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Lock size={20} className="text-gray-400" /> Keamanan Akun</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 pb-20">
        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Metode Otentikasi</h3>
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2a2a2a] text-center mb-8">
            <p className="text-gray-500 text-sm">Belum ada metode otentikasi tambahan yang diatur.</p>
        </div>
      </div>
    </div>
  );
}
