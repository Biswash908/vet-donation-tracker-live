import { Plus, Edit, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { fetchInvoices, Invoice } from '../lib/supabase';

interface AdminDashboardProps {
  onBack: () => void;
  onAddNewCase: () => void;
  onEditCase: (petId: string) => void;
}

export default function AdminDashboard({ onBack, onAddNewCase, onEditCase }: AdminDashboardProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Failed to load invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3 h-auto min-h-16 sm:min-h-20 py-3 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button 
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 text-[#0a0a0a] hover:bg-slate-100 flex-shrink-0"
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="border-l border-[#e2e8f0] h-8 hidden sm:block" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl text-[#0a0a0a] font-normal">
                  JLT Cat Lovers' Group
                </h1>
                <p className="text-xs sm:text-sm text-[#717182]">Admin Dashboard</p>
              </div>
            </div>
            
            <Button 
              onClick={onAddNewCase}
              className="bg-[#155dfc] hover:bg-[#1447e6] gap-1 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-lg text-sm sm:text-base whitespace-nowrap"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add New Case</span>
              <span className="sm:hidden">Add New Case</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <h2 className="text-[20px] text-[#0a0a0a] mb-6">All Cases</h2>

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Loading cases...</p>
          </div>
        )}

        {/* Cases Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.map((pet) => (
              <CaseCard 
                key={pet.id} 
                pet={pet}
                onEdit={() => onEditCase(pet.id)}
              />
            ))}
          </div>
        )}

        {!loading && invoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No cases yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}

interface CaseCardProps {
  pet: Invoice;
  onEdit: () => void;
}

function CaseCard({ pet, onEdit }: CaseCardProps) {
  const totalDonated = pet.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  const remaining = pet.estimated_cost - totalDonated;
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);
  
  // Determine status
  let status: 'pending' | 'partially funded' | 'funded' | 'active' = 'pending';
  let statusColor = 'bg-[#fef3c7] text-[#92400e]';
  
  if (totalDonated >= pet.estimated_cost) {
    status = 'funded';
    statusColor = 'bg-[#dcfce7] text-[#016630]';
  } else if (totalDonated > 0) {
    status = 'partially funded';
    statusColor = 'bg-[#dbeafe] text-[#193cb8]';
  } else if (pet.status === 'active') {
    status = 'active';
    statusColor = 'bg-[#e0e7ff] text-[#3730a3]';
  }

  return (
    <div 
      onClick={onEdit}
      className="bg-white border border-[#e2e8f0] rounded-[10px] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative hover:border-[#155dfc]"
    >
      {/* Header with name and status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-[17px] text-[#0a0a0a] font-medium mb-1">
            {pet.animal_name}
          </h3>
          <p className="text-sm text-[#717182]">
            {pet.medical_condition}
          </p>
        </div>
        
        <div className={`px-2 py-0.5 rounded-md text-xs ${statusColor} ml-2 shrink-0`}>
          {status}
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Total Debt:</span>
          <span className="text-[#0a0a0a] font-medium">${pet.estimated_cost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Amount Paid:</span>
          <span className="text-[#16a34a] font-medium">${totalDonated.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Remaining:</span>
          <span className="text-[#155dfc] font-semibold">
            ${remaining > 0 ? remaining.toFixed(2) : '0.00'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#45556c]">Progress</span>
          <span className="text-xs font-semibold text-[#0a0a0a]">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-[#e2e8f0] rounded-full h-2">
          <div
            className="bg-[#155dfc] h-2 rounded-full transition-all"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
