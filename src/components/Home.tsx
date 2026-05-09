import { Input } from '@/components/ui/input';
import { fetchInvoices, fetchVets, Invoice, Vet } from '@/lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import svgPaths from '@/imports/svg-2n5pj4qi5n';


const logo = '/JLT.png';

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex-1 lg:flex-none lg:w-[500px]">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5 pointer-events-none">
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <path
            d={svgPaths.pcddfd00}
            stroke="#90A1B9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d="M17.5 17.5L13.9167 13.9167"
            stroke="#90A1B9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </svg>
      </div>

      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-[50px] bg-[#f1f5f9] border-0 text-[13px] text-[#717182]"
      />
    </div>
  );
}

// ─── Vet Filter Button + Dropdown ─────────────────────────────────────────────

function VetFilter({
  vets,
  selected,
  onSelect,
}: {
  vets: Vet[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedVet = vets.find(v => v.id === selected);
  const isActive = !!selectedVet;

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
        zIndex: 99999,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedButton = buttonRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);
      if (!clickedButton && !clickedDropdown) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => setOpen(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [open]);

  return (
    <div className="relative flex-shrink-0 w-[160px] sm:w-[180px]">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`
          w-full h-[50px] px-3 rounded-xl
          flex items-center gap-2
          border transition-all text-[13px] font-medium
          ${isActive
            ? 'bg-[#155dfc] text-white border-[#155dfc]'
            : 'bg-[#f1f5f9] border-0 text-[#64748b] hover:bg-[#e8edf5]'
          }
        `}
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M9 19h6" />
        </svg>
        <span className="flex-1 text-left truncate">
          {selectedVet ? selectedVet.name : 'All vets'}
        </span>
      </button>

      {open && createPortal(
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="w-max bg-white border border-[#e2e8f0] rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-[#f1f5f9]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
              Filter by vet
            </p>
          </div>
          <div className="py-1 max-h-64 overflow-y-auto">
            {[{ id: '', name: 'All vets' }, ...vets].map(vet => {
              const isSelected = selected === vet.id;
              return (
                <button
                  key={vet.id || 'all'}
                  type="button"
                  onClick={() => {
                    onSelect(vet.id);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2.5 text-[13px]
                    flex items-center justify-between gap-4
                    transition-colors whitespace-nowrap
                    ${isSelected
                      ? 'bg-[#eff6ff] text-[#155dfc] font-semibold'
                      : 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]'
                    }
                  `}
                >
                  <span>{vet.name}</span>
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vets, setVets] = useState<Vet[]>([]);
  const [selectedVetFilter, setSelectedVetFilter] = useState<string>(searchParams.get('vet') || '');

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        const data = await Promise.race([fetchInvoices(), timeoutPromise]) as Invoice[];
        setInvoices(data);
        try {
          const vetsData = await fetchVets();
          setVets(vetsData);
        } catch (vetError) {
          console.error('Failed to load vets:', vetError);
        }
      } catch (err) {
        console.error('Failed to load invoices:', err);
        setError('Failed to load campaigns. Please check your connection and try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Sync selectedVetFilter with URL
  const handleVetFilterChange = (vetId: string) => {
    setSelectedVetFilter(vetId);
    if (vetId) {
      setSearchParams({ vet: vetId });
    } else {
      setSearchParams({});
    }
  };

  const totalRaised = invoices.reduce((sum, pet) =>
    sum + (pet.donations?.reduce((donSum, d) => donSum + d.amount, 0) || 0), 0
  );
  const totalGoal = invoices.reduce((sum, pet) => sum + pet.estimated_cost, 0);
  const overallProgress = totalGoal > 0 ? Math.round((totalRaised / totalGoal) * 100) : 0;
  const activeCampaigns = invoices.filter(pet => {
    const totalDonated = pet.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
    return totalDonated < pet.estimated_cost;
  }).length;

  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      invoice.animal_name.toLowerCase().includes(query) ||
      invoice.animal_type.toLowerCase().includes(query) ||
      invoice.medical_condition.toLowerCase().includes(query) ||
      (invoice.vet_name && invoice.vet_name.toLowerCase().includes(query))
    );
    const matchesVetFilter = !selectedVetFilter || String(invoice.vet_id) === String(selectedVetFilter);
    return matchesSearch && matchesVetFilter;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-b from-[#eff6ff] to-white min-h-screen pb-20 flex flex-col">
        {/* 
          Key fix: w-full on main ensures it always stretches full width,
          so children with no mx-auto stay left-aligned regardless of content.
        */}
        <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-20 max-w-[1536px] mx-auto flex-1 w-full">

          {/* Organization Section */}
          <div className="max-w-[896px] mx-auto mb-6 lg:mb-8 text-center">
            <div className="mb-6 lg:mb-8 flex justify-center">
              <div className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
                <img
                  src={logo}
                  alt="JLT Cats logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 mx-auto rounded-full object-cover"
                />
              </div>
            </div>
            <p className="text-[14px] lg:text-[16.7px] text-[#314158] leading-[22px] lg:leading-[29.25px] mb-8 max-w-2xl mx-auto">
              Please help us help the cats of JLT 🐈 🐈‍⬛
            </p>

            {/* Overall Progress */}
            <div className="w-full space-y-3 pb-8 lg:pb-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs lg:text-[15px] font-bold text-[#0f172b] leading-4 lg:leading-6">
                  AED {totalRaised.toLocaleString()} raised of AED {totalGoal.toLocaleString()} goal
                </p>
                <p className="text-xs lg:text-[15px] text-[#45556c] leading-4 lg:leading-6 whitespace-nowrap">
                  {activeCampaigns} active campaigns • {overallProgress}%
                </p>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-2 lg:h-4">
                <div
                  className="bg-[#155dfc] h-2 lg:h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(overallProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Search + Filter Row — no mx-auto, always anchored left */}
          <div className="mb-8 lg:mb-10">
            <div className="flex items-center gap-2 max-w-2xl">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by pet name, type, condition, or vet..."
              />
              {vets.length > 0 && (
                <VetFilter
                  vets={vets}
                  selected={selectedVetFilter}
                  onSelect={handleVetFilterChange}
                />
              )}
            </div>

            {/* Active filter pill */}
            {selectedVetFilter && (
              <div className="mt-2.5 flex items-center gap-1.5 max-w-2xl">

                  <button
                    type="button"
                    onClick={() => handleVetFilterChange('')}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#155dfc]/10 transition-colors ml-0.5"
                    aria-label="Remove vet filter"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                      <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Loading campaigns...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  fetchInvoices()
                    .then(setInvoices)
                    .catch(() => setError('Failed to load campaigns. Please check your connection and try refreshing the page.'))
                    .finally(() => setLoading(false));
                }}
                className="px-4 py-2 bg-[#155dfc] text-white rounded-lg hover:bg-[#1447e6] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Card container — min-h prevents page from collapsing when empty */}
          <div className="min-h-[50vh]">
            {!loading && (
              <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {filteredInvoices.map((pet) => (
                  <CampaignCardDesktop key={pet.id} pet={pet} onClick={() => navigate(`/pet/${pet.id}`)} />
                ))}
              </div>
            )}

            {!loading && (
              <div className="lg:hidden space-y-4">
                {filteredInvoices.map((pet) => (
                  <CampaignCardMobile key={pet.id} pet={pet} onClick={() => navigate(`/pet/${pet.id}`)} />
                ))}
              </div>
            )}

          {!loading && !error && filteredInvoices.length === 0 && invoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No campaigns available yet.</p>
            </div>
          )}
          {!loading && !error && filteredInvoices.length === 0 && invoices.length > 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No campaigns found for this vet.</p>
            </div>
          )}
          </div>

        </main>

        {/* Admin Button */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
          <button
            onClick={() => navigate('/admin-login')}
            className="text-sm px-6 py-2.5 border-2 border-[#155dfc] text-[#155dfc] bg-transparent rounded-lg hover:bg-[#155dfc]/10 focus:ring-2 focus:ring-[#155dfc]/30 focus:ring-offset-2 transition-colors font-medium"
          >
            Log in as admin
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface CampaignCardProps {
  pet: Invoice;
  onClick: () => void;
}

function resolveStatus(pet: Invoice) {
  const totalDonated = pet.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  let displayStatus = pet.status;
  if (pet.status === 'pending' && totalDonated > 0) displayStatus = 'partially_funded';
  if (totalDonated >= pet.estimated_cost) displayStatus = 'funded';
  return { totalDonated, displayStatus };
}

const STATUS_STYLES: Record<string, { border: string; bg: string; color: string }> = {
  pending:          { border: '#fde047', bg: '#fef3c7', color: '#92400e' },
  active:           { border: '#7dd3fc', bg: '#dbeafe', color: '#193cb8' },
  partially_funded: { border: '#fecaca', bg: '#fca5a5', color: '#7f1d1d' },
  closed:           { border: '#d1d5db', bg: '#e5e7eb', color: '#374151' },
  funded:           { border: '#86efac', bg: '#dcfce7', color: '#16a34a' },
};

function getProfilePhoto(pet: Invoice): string {
  const fallback = 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop';
  if (!pet.pet_photo) return fallback;
  try {
    const parsed = JSON.parse(pet.pet_photo);
    const photos = Array.isArray(parsed) ? parsed : [pet.pet_photo];
    return photos[0] || fallback;
  } catch {
    return pet.pet_photo || fallback;
  }
}

// ─── Desktop Card ─────────────────────────────────────────────────────────────

function CampaignCardDesktop({ pet, onClick }: CampaignCardProps) {
  const { totalDonated, displayStatus } = resolveStatus(pet);
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);
  const isFunded = totalDonated >= pet.estimated_cost;
  const petImage = getProfilePhoto(pet);
  const s = STATUS_STYLES[displayStatus] ?? STATUS_STYLES.pending;

  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
      onClick={onClick}
    >
      <div className="relative h-64 bg-slate-100 overflow-hidden flex items-center justify-center pointer-events-none">
        <img src={petImage} alt={pet.animal_name} className="h-full !w-auto object-contain block mx-auto pointer-events-none" />
        <div className="absolute bottom-5 left-5">
          <div
            className="px-2.5 py-0.5 rounded-lg border text-xs leading-4 font-medium shadow-sm"
            style={{ borderColor: s.border, backgroundColor: s.bg, color: s.color }}
          >
            {displayStatus.replace('_', ' ')}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[16.7px] lg:text-[17px] text-[#0f172b] mb-0 leading-7 min-h-[56px]">
          {pet.animal_name}: {pet.medical_condition}
        </h3>
        <div className={`h-2 rounded-full mb-3 ${isFunded ? 'bg-[#155dfc]' : 'bg-[#e2e8f0]'}`}>
          {!isFunded && (
            <div className="bg-[#155dfc] h-2 rounded-full transition-all" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
          )}
        </div>
        <p className="text-[16.7px] font-bold text-[#0f172b] leading-7">
          AED {totalDonated.toLocaleString()} raised of AED {pet.estimated_cost.toLocaleString()} goal
        </p>
      </div>
    </div>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function CampaignCardMobile({ pet, onClick }: CampaignCardProps) {
  const { totalDonated, displayStatus } = resolveStatus(pet);
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);
  const isFunded = totalDonated >= pet.estimated_cost;
  const petImage = getProfilePhoto(pet);
  const s = STATUS_STYLES[displayStatus] ?? STATUS_STYLES.pending;

  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-[17px]"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="relative flex-shrink-0 w-[110px] h-[110px] rounded-[10px] overflow-hidden bg-slate-900 flex items-center justify-center pointer-events-none">
          <img src={petImage} alt={pet.animal_name} className="max-h-full max-w-full w-auto h-auto object-contain block mx-auto pointer-events-none" />
        </div>
        <div className="flex-1 min-w-0 relative">
          <p className="text-[11.4px] text-[#5b7aa6] leading-4 mb-1">
            {pet.donations?.length || 0} {(pet.donations?.length || 0) === 1 ? 'donation' : 'donations'}
          </p>
          <h3 className="text-[13px] font-medium text-[#0f172a] leading-5 mb-3 pr-20">
            Help {pet.animal_name} - {pet.medical_condition}
          </h3>
          <div className="absolute top-0 right-0">
            <div
              className="px-2.5 py-0.5 rounded-lg border text-xs leading-4 font-medium shadow-sm"
              style={{ borderColor: s.border, backgroundColor: s.bg, color: s.color }}
            >
              {displayStatus.replace('_', ' ')}
            </div>
          </div>
          <div className={`h-1.5 rounded-full mb-2 ${isFunded ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`}>
            {!isFunded && (
              <div className="bg-[#2563eb] h-1.5 rounded-full transition-all" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
            )}
          </div>
          <p className="text-[13px] font-semibold text-[#0f172a] leading-5">
            AED {totalDonated.toLocaleString()} / {pet.estimated_cost.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
