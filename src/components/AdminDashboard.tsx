import { Plus, Edit, ArrowLeft, Stethoscope, Funnel, CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useMemo, useState, useEffect, useLayoutEffect, useRef, type ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { fetchInvoices, Invoice } from '../lib/supabase';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'partially_funded', label: 'Partial' },
  { value: 'funded', label: 'Funded' },
  { value: 'closed', label: 'Closed' },
] as const;

type StatusType = (typeof STATUS_OPTIONS)[number]['value'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusFilters, setStatusFilters] = useState<StatusType[]>([]);
  const [sortByCreated, setSortByCreated] = useState<'newest' | 'oldest'>('newest');
  const [statusOpen, setStatusOpen] = useState(false);
  const statusButtonRef = useRef<HTMLButtonElement | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (!adminStatus) {
      navigate("/admin-login");
      return;
    }
    setIsAdmin(true);
  }, [navigate]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        statusOpen &&
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(target) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(target)
      ) {
        setStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [statusOpen]);

  // Position the dropdown using a portal so it escapes any parent stacking contexts.
  useEffect(() => {
    if (!statusOpen) {
      setDropdownStyle(null);
      return;
    }

    const updatePosition = () => {
      const btn = statusButtonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: 260,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [statusOpen]);

  const filteredInvoices = useMemo(() => {
    const activeStatuses = statusFilters.length > 0 ? statusFilters : STATUS_OPTIONS.map((option) => option.value);
    const result = invoices.filter((invoice: Invoice) => activeStatuses.includes(invoice.status as StatusType));

    return [...result].sort((a: Invoice, b: Invoice) => {
      const aDate = new Date(a.created_at).getTime();
      const bDate = new Date(b.created_at).getTime();
      return sortByCreated === 'newest' ? bDate - aDate : aDate - bDate;
    });
  }, [invoices, statusFilters, sortByCreated]);

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3 h-auto min-h-16 sm:min-h-20 py-3 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button 
                onClick={() => navigate('/')}
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
            
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={() => navigate('/vet-management')}
                variant="outline"
                className="border-[#e2e8f0] gap-1 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-lg text-sm sm:text-base whitespace-nowrap text-[#0a0a0a]"
              >
                <Stethoscope className="size-4" />
                <span className="hidden sm:inline">Manage Vets</span>
                <span className="sm:hidden">Vets</span>
              </Button>
              <Button 
                onClick={() => navigate('/admin-add-case')}
                className="bg-[#155dfc] hover:bg-[#1447e6] gap-1 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-lg text-sm sm:text-base whitespace-nowrap"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">Add New Case</span>
                <span className="sm:hidden">Add New Case</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[20px] text-[#0a0a0a]">All Cases</h2>
            <p className="text-sm text-[#717182] mt-1">Compact status and date controls keep the dashboard clean.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <Funnel className="h-4 w-4 text-slate-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Status</span>
              <button
                type="button"
                ref={statusButtonRef}
                onClick={() => setStatusOpen((open: boolean) => !open)}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {statusFilters.length === 0 ? 'All' : `${statusFilters.length} selected`}
                <ChevronDown className={`h-4 w-4 text-slate-500 transition ${statusOpen ? 'rotate-180' : ''}`} />
              </button>

              {statusOpen && dropdownStyle && createPortal(
                <div
                  ref={statusDropdownRef}
                  style={{
                    position: 'absolute',
                    left: `${dropdownStyle.left}px`,
                    top: `${dropdownStyle.top}px`,
                    zIndex: 9999,
                    width: `${dropdownStyle.width}px`,
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900">Choose statuses</span>
                    <button
                      type="button"
                      onClick={() => setStatusFilters([])}
                      className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      All
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {STATUS_OPTIONS.map((option) => {
                      const selected = statusFilters.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setStatusFilters((current) => {
                              if (current.includes(option.value)) {
                                return current.filter((status) => status !== option.value);
                              }
                              return [...current, option.value];
                            });
                          }}
                          className={`w-full rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition ${selected ? 'border-[#155dfc] bg-[#eff6ff] text-[#155dfc]' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>,
                document.body
              )}
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 shadow-sm">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">Date</span>
              <select
                value={sortByCreated}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortByCreated(e.target.value as 'newest' | 'oldest')}
                className="min-w-[92px] rounded-full border border-transparent bg-transparent px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-transparent focus:ring-0"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Loading cases...</p>
          </div>
        )}

        {/* Cases Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((pet) => (
              <CaseCard 
                key={pet.id} 
                pet={pet}
                onEdit={() => navigate(`/admin-edit-case/${pet.id}`)}
              />
            ))}
          </div>
        )}

        {!loading && filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {invoices.length === 0
                ? 'No cases yet.'
                : 'No cases match the selected filter.'}
            </p>
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
  
  // Use stored status with consistent color mapping
  let displayStatus = pet.status;
  let statusColor = 'bg-[#fef3c7] text-[#92400e]'; // pending
  
  if (displayStatus === 'pending') {
    statusColor = 'bg-[#fef3c7] text-[#92400e]';
  } else if (displayStatus === 'active') {
    statusColor = 'bg-[#dbeafe] text-[#193cb8]';
  } else if (displayStatus === 'partially_funded') {
    statusColor = 'bg-[#fca5a5] text-[#7f1d1d]';
  } else if (displayStatus === 'funded' || displayStatus === 'closed') {
    statusColor = 'bg-[#dcfce7] text-[#16a34a]';
  }

  return (
      <div 
    onClick={onEdit}
    className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative hover:border-[#155dfc]"
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
          <p className="text-xs text-slate-500 mt-1">
            Created {new Date(pet.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        
        <div 
          className="px-2.5 py-0.5 rounded-lg text-xs font-medium ml-2 shrink-0 border"
          style={{
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: displayStatus === 'pending' ? '#fef3c7' : displayStatus === 'active' ? '#dbeafe' : displayStatus === 'partially_funded' ? '#fca5a5' : displayStatus === 'closed' ? '#e5e7eb' : '#dcfce7',
            color: displayStatus === 'pending' ? '#92400e' : displayStatus === 'active' ? '#193cb8' : displayStatus === 'partially_funded' ? '#7f1d1d' : displayStatus === 'closed' ? '#374151' : '#16a34a'
          }}
        >
          {displayStatus.replace('_', ' ')}
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Total Debt:</span>
          <span className="text-[#0a0a0a] font-medium">AED {pet.estimated_cost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Amount Paid:</span>
          <span className="text-[#16a34a] font-medium">AED {totalDonated.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#45556c]">Remaining:</span>
          <span className="text-[#155dfc] font-semibold">
            AED {remaining > 0 ? remaining.toFixed(2) : '0.00'}
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
