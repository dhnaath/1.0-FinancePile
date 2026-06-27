import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Plus, Trash2, FileText, Palette, CalendarClock, Receipt, CreditCard, Clock, Landmark, Home, Car, User, Smartphone, Building, Banknote, TrendingUp, Wallet, Users, MoreHorizontal, Briefcase, Coins } from 'lucide-react';
import { useDebts, Fee } from '../hooks/useDebts';


const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Kartu Kredit': return <CreditCard size={18} className="shrink-0" />;
    case 'PayLater': return <Clock size={18} className="shrink-0" />;
    case 'KTA': return <Landmark size={18} className="shrink-0" />;
    case 'KPR': return <Home size={18} className="shrink-0" />;
    case 'KKB': return <Car size={18} className="shrink-0" />;
    case 'Kredit Pegawai': return <Briefcase size={18} className="shrink-0" />;
    case 'Cash Line': return <Coins size={18} className="shrink-0" />;
    case 'Pinjaman Pribadi': return <User size={18} className="shrink-0" />;
    case 'Pinjaman Online': return <Smartphone size={18} className="shrink-0" />;
    case 'Tabungan Bank': return <Building size={18} className="shrink-0" />;
    case 'Uang Tunai / Cash': return <Banknote size={18} className="shrink-0" />;
    case 'Aset Tidak Lancar': return <Home size={18} className="shrink-0" />;
    case 'Reksa Dana / Portofolio': return <TrendingUp size={18} className="shrink-0" />;
    case 'Dompet Digital / e-Wallet': return <Wallet size={18} className="shrink-0" />;
    case 'Piutang': return <Users size={18} className="shrink-0" />;
    case 'Lainnya': return <MoreHorizontal size={18} className="shrink-0" />;
    default: return <FileText size={18} className="shrink-0" />;
  }
}
export function AddCardView({ onBack, editDebtId }: { onBack: () => void, editDebtId?: string | null }) {
  const { debts, addDebt, updateDebt } = useDebts();
  const [dueDateEnabled, setDueDateEnabled] = useState(false);
  const [installmentsEnabled, setInstallmentsEnabled] = useState(false);
  const [feesEnabled, setFeesEnabled] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Kartu Kredit',
    amount: '',
    limit: '',
    description: '',
    statementDate: '',
    dueDate: '',
    color: '#1976d2',
    remainingInstallments: '',
    fees: [] as Fee[],
    accountClass: 'kredit' as 'debit' | 'kredit',
    penalty: '',
    penaltyFrequency: 'bulanan' as 'harian' | 'bulanan',
    startDate: '',
    tenor: '',
    principalAmount: '',
    interestRate: '',
    monthlyInstallment: '',
    totalPaid: '',
    status: 'aktif' as 'aktif' | 'lunas' | 'menunggak'
  });

  useEffect(() => {
    if (editDebtId) {
      const debt = debts.find(d => d.id === editDebtId);
      if (debt) {
        setFormData({
          name: debt.name,
          type: debt.type,
          amount: debt.amount.toString(),
          limit: debt.limit ? debt.limit.toString() : '',
          description: debt.description || '',
          statementDate: debt.statementDate || '',
          dueDate: debt.dueDate || '',
          color: debt.color || '#1976d2',
          remainingInstallments: debt.remainingInstallments ? debt.remainingInstallments.toString() : '',
          fees: debt.fees || [],
          accountClass: debt.accountClass || 'kredit',
          penalty: debt.penalty ? debt.penalty.toString() : '',
          penaltyFrequency: debt.penaltyFrequency || 'bulanan',
          startDate: debt.startDate || '',
          tenor: debt.tenor ? debt.tenor.toString() : '',
          principalAmount: debt.principalAmount ? debt.principalAmount.toString() : '',
          interestRate: debt.interestRate ? debt.interestRate.toString() : '',
          monthlyInstallment: debt.monthlyInstallment ? debt.monthlyInstallment.toString() : '',
          totalPaid: debt.totalPaid ? debt.totalPaid.toString() : '',
          status: debt.status || 'aktif'
        });
        if (debt.statementDate || debt.dueDate) {
          setDueDateEnabled(true);
        }
        if (debt.remainingInstallments) {
          setInstallmentsEnabled(true);
        }
        if (debt.fees && debt.fees.length > 0) {
          setFeesEnabled(true);
        }
      }
    }
  }, [editDebtId, debts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFee = () => {
    setFormData({
      ...formData,
      fees: [...formData.fees, { id: crypto.randomUUID(), name: '', amount: 0, frequency: 'bulanan' }]
    });
  };

  const handleUpdateFee = (id: string, field: keyof Fee, value: string | number) => {
    setFormData({
      ...formData,
      fees: formData.fees.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const handleRemoveFee = (id: string) => {
    setFormData({
      ...formData,
      fees: formData.fees.filter(f => f.id !== id)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    if (editDebtId) {
      updateDebt({
        id: editDebtId,
        name: formData.name,
        type: formData.type,
        amount: parseFloat(formData.amount) || 0,
        limit: parseFloat(formData.limit) || 0,
        description: formData.description,
        statementDate: dueDateEnabled ? formData.statementDate : undefined,
        dueDate: dueDateEnabled ? formData.dueDate : undefined,
        remainingInstallments: installmentsEnabled && formData.remainingInstallments ? parseInt(formData.remainingInstallments) : undefined,
        color: formData.color,
        fees: feesEnabled ? formData.fees : [],
        accountClass: formData.accountClass,
        penalty: formData.penalty ? parseFloat(formData.penalty) : undefined,
        penaltyFrequency: formData.penaltyFrequency,
        startDate: formData.startDate || undefined,
        tenor: formData.tenor ? parseInt(formData.tenor) : undefined,
        principalAmount: formData.principalAmount ? parseFloat(formData.principalAmount) : undefined,
        interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
        monthlyInstallment: formData.monthlyInstallment ? parseFloat(formData.monthlyInstallment) : undefined,
        totalPaid: formData.totalPaid ? parseFloat(formData.totalPaid) : undefined,
        status: formData.status
      });
    } else {
      addDebt({
        name: formData.name,
        type: formData.type,
        amount: parseFloat(formData.amount) || 0,
        limit: parseFloat(formData.limit) || 0,
        description: formData.description,
        statementDate: dueDateEnabled ? formData.statementDate : undefined,
        dueDate: dueDateEnabled ? formData.dueDate : undefined,
        remainingInstallments: installmentsEnabled && formData.remainingInstallments ? parseInt(formData.remainingInstallments) : undefined,
        color: formData.color,
        fees: feesEnabled ? formData.fees : [],
        accountClass: formData.accountClass,
        penalty: formData.penalty ? parseFloat(formData.penalty) : undefined,
        penaltyFrequency: formData.penaltyFrequency,
        startDate: formData.startDate || undefined,
        tenor: formData.tenor ? parseInt(formData.tenor) : undefined,
        principalAmount: formData.principalAmount ? parseFloat(formData.principalAmount) : undefined,
        interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
        monthlyInstallment: formData.monthlyInstallment ? parseFloat(formData.monthlyInstallment) : undefined,
        totalPaid: formData.totalPaid ? parseFloat(formData.totalPaid) : undefined,
        status: formData.status
      });
    }
    
    onBack();
  };

  const debtTypes = formData.accountClass === 'kredit' ? [
    'Kartu Kredit',
    'PayLater',
    'KTA',
    'KPR',
    'KKB',
    'Kredit Pegawai',
    'Cash Line',
    'Pinjaman Pribadi',
    'Pinjaman Online',
    'Lainnya'
  ] : [
    'Tabungan Bank',
    'Uang Tunai / Cash',
    'Aset Tidak Lancar',
    'Reksa Dana / Portofolio',
    'Dompet Digital / e-Wallet',
    'Piutang',
    'Lainnya'
  ];

  useEffect(() => {
    if (!editDebtId) {
       setFormData(f => ({ ...f, type: formData.accountClass === 'kredit' ? 'Kartu Kredit' : 'Tabungan Bank' }))
    }
  }, [formData.accountClass, editDebtId]);

  const colors = ['#ff0000', '#ff9800', '#ffeb3b', '#22c55e', '#0000ff', '#4b0082', '#9400d3'];

  return (
    <div className="min-h-screen bg-transparent p-4 font-sans text-gray-100 pb-20">
      <div className="flex items-center gap-2 mb-6 pt-2">
        <button onClick={onBack} className="p-1 -ml-1 text-gray-400 hover:text-gray-100 transition-colors">
          <ChevronLeft size={28} strokeWidth={2} />
        </button>
        <h1 className="text-lg font-normal tracking-wide text-gray-100">{editDebtId ? 'Edit Pinjaman / Kredit' : 'Tambah Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="relative border border-[#2a2a2a] rounded-2xl px-4 pt-3 pb-2 focus-within:border-gray-500 bg-[#1e1e1e]">
           <legend className="text-xs font-medium text-gray-400 px-1 ml-1 absolute -top-2.5 bg-[#121212]">Nama Pinjaman</legend>
           <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-600 text-base" placeholder="KPR Mandiri" />
        </fieldset>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-4 bg-[#1e1e1e] flex flex-col justify-center gap-3">
            <label className="text-xs font-medium text-gray-400">Jenis Kredit</label>
            <div className="grid grid-cols-3 gap-2">
              {debtTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, type }))}
                  className={`flex items-start gap-2 p-3 rounded-xl border transition-colors text-left ${formData.type === type ? 'bg-[#2b4c7e] border-[#4a72ff] text-white' : 'bg-[#222] border-[#333] text-gray-400 hover:bg-[#2a2a2a]'}`}
                >
                  {getTypeIcon(type)}
                  <span className="text-sm font-medium leading-tight">{type}</span>
                </button>
              ))}
            </div>
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
           <label className="text-xs font-medium text-gray-400">Tanggal Mulai</label>
           <input name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="w-full bg-transparent outline-none font-medium text-gray-100 text-base" />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
               <label className="text-xs font-medium text-gray-400">Tenor (Bulan)</label>
               <input name="tenor" value={formData.tenor} onChange={handleChange} type="number" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="12" />
           </div>
           <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
               <label className="text-xs font-medium text-gray-400">Bunga (%)</label>
               <input name="interestRate" value={formData.interestRate} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="1.5" />
           </div>
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Pokok Pinjaman (Rp)</label>
            <input name="principalAmount" value={formData.principalAmount} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="0" />
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Cicilan per Bulan (Rp)</label>
            <input name="monthlyInstallment" value={formData.monthlyInstallment} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="0" />
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Sisa Pokok (Rp)</label>
            <input required name="amount" value={formData.amount} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="0" />
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Total Dibayar (Rp)</label>
            <input name="totalPaid" value={formData.totalPaid} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="0" />
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-transparent outline-none font-medium text-gray-100 text-base appearance-none cursor-pointer">
              <option value="aktif" className="bg-[#1e1e1e]">Aktif</option>
              <option value="lunas" className="bg-[#1e1e1e]">Lunas</option>
              <option value="menunggak" className="bg-[#1e1e1e]">Menunggak</option>
            </select>
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center">
            <label className="text-xs font-medium text-gray-400 mb-1">Plafon kredit - Opsional</label>
            <input name="limit" value={formData.limit} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="0" />
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Denda berjalan - Opsional</label>
            <div className="flex items-center gap-3">
              <input name="penalty" value={formData.penalty} onChange={handleChange} type="number" step="0.01" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="Nominal Denda (Rp)" />
              <select name="penaltyFrequency" value={formData.penaltyFrequency} onChange={handleChange} className="bg-[#222] border border-[#333] text-gray-100 text-sm px-3 py-2 rounded-xl outline-none appearance-none cursor-pointer">
                <option value="harian" className="bg-[#1e1e1e]">Harian</option>
                <option value="bulanan" className="bg-[#1e1e1e]">Bulanan</option>
              </select>
            </div>
        </div>

        <div className="relative border border-[#2a2a2a] rounded-2xl px-4 py-3 bg-[#1e1e1e] flex flex-col justify-center gap-2">
            <label className="text-xs font-medium text-gray-400">Catatan</label>
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400 shrink-0" size={20} />
              <input name="description" value={formData.description} onChange={handleChange} type="text" className="w-full bg-transparent outline-none font-medium text-gray-100 placeholder:text-gray-500 text-base" placeholder="Informasi tambahan" />
            </div>
        </div>

        <div className="flex flex-col py-4 px-4 border border-[#2a2a2a] rounded-2xl bg-[#1e1e1e] gap-3">
          <div className="flex items-center gap-2">
            <Palette className="text-gray-400" size={18} />
            <span className="font-medium text-gray-300 text-sm">Warna</span>
          </div>
          <div className="flex items-center gap-3">
             {colors.map(color => (
                <button 
                  type="button" 
                  key={color} 
                  onClick={() => setFormData({...formData, color})}
                  className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
             ))}
          </div>
        </div>

        <div className="border border-[#2a2a2a] rounded-2xl bg-[#1e1e1e] overflow-hidden">
          <div onClick={() => setDueDateEnabled(!dueDateEnabled)} className="flex justify-between items-center py-4 px-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <span className="font-medium text-gray-300 text-base">Jadwal Tagihan</span>
            </div>
            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${dueDateEnabled ? 'bg-[#1976d2] justify-end' : 'bg-[#333] justify-start'}`}>
               <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          {dueDateEnabled && (
            <div className="p-4 bg-[#1a1a1a] border-b border-[#2a2a2a]">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-xs font-medium text-gray-400 mb-2">Tanggal Cetak Tagihan</p>
                    <div className="flex items-center gap-2 border border-[#333] bg-[#222] px-3 py-2 rounded-xl">
                       <Calendar className="text-gray-400" size={18} />
                       <input name="statementDate" value={formData.statementDate} onChange={handleChange} type="number" min="1" max="31" className="w-full bg-transparent outline-none text-gray-100 text-sm" placeholder="Tgl (1-31)" />
                    </div>
                 </div>
                 <div>
                    <p className="text-xs font-medium text-gray-400 mb-2">Jatuh Tempo</p>
                    <div className="flex items-center gap-2 border border-[#333] bg-[#222] px-3 py-2 rounded-xl">
                       <Calendar className="text-gray-400" size={18} />
                       <input name="dueDate" value={formData.dueDate} onChange={handleChange} type="number" min="1" max="31" className="w-full bg-transparent outline-none text-gray-100 text-sm" placeholder="Tgl (1-31)" />
                    </div>
                 </div>
              </div>
              <p className="text-xs font-normal text-gray-500 leading-relaxed mt-4">
                Catat tanggal tagihan agar Anda bisa merencanakan arus kas sebelum jatuh tempo.
              </p>
            </div>
          )}

          <div onClick={() => setInstallmentsEnabled(!installmentsEnabled)} className="flex justify-between items-center py-4 px-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-gray-400" size={20} />
              <span className="font-medium text-gray-300 text-base">Jumlah Cicilan</span>
            </div>
            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${installmentsEnabled ? 'bg-[#1976d2] justify-end' : 'bg-[#333] justify-start'}`}>
               <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          {installmentsEnabled && (
            <div className="p-4 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <p className="text-xs font-medium text-gray-400 mb-2">Sisa Tenor</p>
                <div className="flex items-center border border-[#333] bg-[#222] px-3 py-2 rounded-xl">
                   <input name="remainingInstallments" value={formData.remainingInstallments} onChange={handleChange} type="number" min="1" className="w-full bg-transparent outline-none text-gray-100 text-sm" placeholder="Opsional (12)" />
                </div>
            </div>
          )}

          <div onClick={() => setFeesEnabled(!feesEnabled)} className="flex justify-between items-center py-4 px-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors">
            <div className="flex items-center gap-3">
              <Receipt className="text-gray-400" size={20} />
              <span className="font-medium text-gray-300 text-base">Biaya Tambahan</span>
            </div>
            <div className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${feesEnabled ? 'bg-[#1976d2] justify-end' : 'bg-[#333] justify-start'}`}>
               <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {feesEnabled && (
          <div className="space-y-3 pb-2">
            {formData.fees.map((fee, idx) => (
              <div key={fee.id} className="p-3 border border-[#2a2a2a] rounded-2xl bg-[#1a1a1a]">
                <div className="flex justify-between items-center mb-3">
                   <h4 className="text-xs font-medium text-gray-400 tracking-wider">Biaya #{idx+1}</h4>
                   <button type="button" onClick={() => handleRemoveFee(fee.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                     <Trash2 size={14} />
                   </button>
                </div>
                <div className="space-y-3">
                  <div className="relative border border-[#2a2a2a] rounded-xl px-3 py-2 bg-[#121212] flex flex-col">
                     <label className="text-xs font-medium text-gray-500">Nama biaya</label>
                     <input value={fee.name} onChange={(e) => handleUpdateFee(fee.id, 'name', e.target.value)} type="text" className="w-full bg-transparent outline-none text-gray-100 text-sm mt-1" placeholder="Biaya Admin" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative border border-[#2a2a2a] rounded-xl px-3 py-2 bg-[#121212] flex flex-col">
                       <label className="text-xs font-medium text-gray-500">Jumlah (Rp)</label>
                       <input value={fee.amount || ''} onChange={(e) => handleUpdateFee(fee.id, 'amount', parseFloat(e.target.value) || 0)} type="number" step="0.01" className="w-full bg-transparent outline-none text-gray-100 text-sm mt-1" placeholder="0" />
                    </div>
                    <div className="relative border border-[#2a2a2a] rounded-xl px-3 py-2 bg-[#121212] flex flex-col">
                       <label className="text-xs font-medium text-gray-500">Frekuensi</label>
                       <select value={fee.frequency} onChange={(e) => handleUpdateFee(fee.id, 'frequency', e.target.value)} className="w-full bg-transparent outline-none text-gray-100 text-sm mt-1 appearance-none cursor-pointer">
                         <option value="sekali" className="bg-[#121212] text-gray-100">Sekali (Di Awal)</option>
                         <option value="bulanan" className="bg-[#121212] text-gray-100">Bulanan</option>
                         <option value="tahunan" className="bg-[#121212] text-gray-100">Tahunan</option>
                       </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddFee} className="w-full py-3 flex items-center justify-center gap-2 border border-dashed border-[#2a2a2a] rounded-2xl text-gray-400 hover:text-gray-100 hover:border-gray-500 transition-colors">
              <Plus size={16} />
              <span className="text-sm font-medium">Tambah Komponen Biaya</span>
            </button>
          </div>
        )}

        <button type="submit" className="w-full py-4 bg-[#1976d2] text-gray-100 font-medium rounded-2xl text-base mt-4 active:scale-95 transition-transform shadow-md">
          Simpan Pinjaman
        </button>
      </form>
    </div>
  );
}
