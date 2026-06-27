import React from 'react';
import { ArrowLeft, Wallet, RefreshCw, Target, CreditCard, PiggyBank, Calculator, AlertCircle, BookOpen, Clock, Settings, ArrowRight, ArrowDownToLine, Smartphone, CalendarClock, Tags, Bot, Receipt, Banknote, ArrowRightLeft, Activity } from 'lucide-react';
import { EmiCalculatorView } from '../components/EmiCalculatorView';
import { HomeView } from './HomeView';
import { HomeView as CreditCardDashboard } from '../components/HomeView';
import { MenuListItem } from '../components/MenuListItem';
import { DebtManagerView } from './DebtManagerView';
import { SubscriptionManagerView } from './SubscriptionManagerView';
import { SavingsPlanView } from './SavingsPlanView';
import { TaxPlannerView } from './TaxPlannerView';
import { EmergencyFundView, ExpenseCategoryView, BillRemindersView, BankMutationsView } from './FlowExtraViews';
import { MonthlyBurdenView } from './MonthlyBurdenView';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../translations';
import { ScrollContainer } from '../components/ScrollContainer';

export function FlowView({ currentTab, onBack, onSelectTab, onNavigate, onUnavailable }: { currentTab: string, onBack: () => void, onSelectTab?: (tab: string) => void, onNavigate: (view: string) => void, onUnavailable?: () => void }) {
  const lang = useLanguage();

  if (!currentTab) {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={onBack} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><RefreshCw size={20} className="text-gray-400" /> {translations.flow.viewTitle[lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-main" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('cat_liabilitas')} icon={CreditCard} title={translations.flow.tabs[0][lang]} />
          <MenuListItem onClick={() => onSelectTab?.('cat_pengeluaran')} icon={ArrowRightLeft} title={translations.flow.tabs[1][lang]} />
          <MenuListItem onClick={() => onSelectTab?.('cat_kredit')} icon={Banknote} title={translations.flow.tabs[2][lang]} />
          <MenuListItem onClick={() => onSelectTab?.('cat_pajak')} icon={Receipt} title={translations.flow.tabs[3][lang]} />
          <MenuListItem onClick={() => onSelectTab?.('cat_otomatisasi')} icon={Activity} title={translations.flow.tabs[4][lang]} />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'cat_liabilitas') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onBack()} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><CreditCard size={20} className="text-red-500" /> {translations.flow.tabs[0][lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-cat-liabilitas" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('liability')} icon={CreditCard} title="Manajemen Akun" desc={translations.flow.tabs[0].desc[lang]} />
          <MenuListItem onClick={() => onSelectTab?.('monthly_burden')} icon={Calculator} title="Estimasi Beban Bulanan" desc="Kalkulasi estimasi cicilan dan beban bulanan." />
          <MenuListItem onClick={() => onSelectTab?.('emi_calculator')} icon={Calculator} title="Kalkulator Cicilan (EMI)" desc="Simulasi dan hitung cicilan kredit." />
          <MenuListItem onClick={() => onSelectTab?.('bill_reminders')} icon={CalendarClock} title="Pengingat Tagihan" desc="Jatuh tempo langganan dan kredit." />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'cat_pengeluaran') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onBack()} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><ArrowRightLeft size={20} className="text-orange-500" /> {translations.flow.tabs[1][lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-cat-pengeluaran" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('cashflow')} icon={RefreshCw} title="Arus Kas" desc={translations.flow.tabs[1].desc[lang]} />
          <MenuListItem onClick={() => onSelectTab?.('budget')} icon={Target} title="Anggaran" desc="Pengaturan porsi anggaran serta manajemen pengeluaran rutin dan langganan." />
          <MenuListItem onClick={() => onSelectTab?.('expense_cat')} icon={Tags} title="Kategori Pengeluaran" desc="Pengelompokan sistematis setiap pos biaya." />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'cat_kredit') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onBack()} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Banknote size={20} className="text-emerald-400" /> {translations.flow.tabs[2][lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-cat-kredit" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('liquidity')} icon={Wallet} title="Likuiditas" desc={translations.flow.tabs[2].desc[lang]} />
          <MenuListItem onClick={() => onSelectTab?.('bank_sync')} icon={BookOpen} title="Mutasi Rekening" desc="Sinkronisasi buku bank digital open API." />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'cat_pajak') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onBack()} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Receipt size={20} className="text-rose-500" /> {translations.flow.tabs[3][lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-cat-pajak" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('tax')} icon={Calculator} title="Perencanaan Pajak" desc={translations.flow.tabs[3].desc[lang]} />
          <MenuListItem onClick={() => onSelectTab?.('emergency')} icon={AlertCircle} title="Dana Darurat" desc="Pantauan ketahanan kas darurat likuid." />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'cat_otomatisasi') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onBack()} className="text-gray-100 p-1 hover:text-gray-100 transition-colors"><ArrowLeft size={24} /></button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><Activity size={20} className="text-cyan-500" /> {translations.flow.tabs[4][lang]}</h1>
        </div>
        <ScrollContainer id="flow-view-cat-otomatisasi" className="flex-1 overflow-y-auto p-6 pb-20">
          <MenuListItem onClick={() => onSelectTab?.('savings')} icon={PiggyBank} title="Tabungan Berkala" desc={translations.flow.tabs[4].desc[lang]} />
        </ScrollContainer>
      </div>
    );
  }

  if (currentTab === 'liability') return <DebtManagerView onBack={() => onSelectTab?.('cat_liabilitas')} />;
  if (currentTab === 'liquidity') return <CreditCardDashboard onNavigate={onNavigate} onBack={() => onSelectTab?.('cat_kredit')} fixedTab="debit" customTitle="Likuiditas & Aset Lancar" onEditDebt={() => {}} />;
  
  if (currentTab === 'cashflow') {
    return (
      <div className="flex flex-col min-h-screen bg-[#121212] relative">
        <div className="p-4 flex items-center gap-3 pt-6 shrink-0 bg-[#121212]">
          <button onClick={() => onSelectTab?.('cat_pengeluaran')} className="text-gray-100 p-1 hover:text-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-100 tracking-wide flex items-center gap-2"><ArrowRightLeft size={20} className="text-orange-500" /> Arus Kas</h1>
        </div>
        <div className="flex-1 overflow-y-auto relative pb-20">
           <HomeView onNavigate={onNavigate} onBack={() => onSelectTab?.('cat_pengeluaran')} onUnavailable={onUnavailable} />
        </div>
      </div>
    );
  }

  if (currentTab === 'budget') return <SubscriptionManagerView onBack={() => onSelectTab?.('cat_pengeluaran')} onSettings={() => onNavigate('sub_settings')} />;
  if (currentTab === 'savings') return <SavingsPlanView onBack={() => onSelectTab?.('cat_otomatisasi')} />;
  if (currentTab === 'tax') return <TaxPlannerView onBack={() => onSelectTab?.('cat_pajak')} />;
  
  if (currentTab === 'emergency') return <EmergencyFundView onBack={() => onSelectTab?.('cat_pajak')} />;
  if (currentTab === 'expense_cat') return <ExpenseCategoryView onBack={() => onSelectTab?.('cat_pengeluaran')} />;
  if (currentTab === 'bill_reminders') return <BillRemindersView onBack={() => onSelectTab?.('cat_liabilitas')} />;
  if (currentTab === 'monthly_burden') return <MonthlyBurdenView onBack={() => onSelectTab?.('cat_liabilitas')} />;
  if (currentTab === 'emi_calculator') return <EmiCalculatorView onBack={() => onSelectTab?.('cat_liabilitas')} />;
  if (currentTab === 'bank_sync') return <BankMutationsView onBack={() => onSelectTab?.('cat_kredit')} />;

  return null;
}
