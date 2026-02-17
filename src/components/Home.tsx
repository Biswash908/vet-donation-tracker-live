import { Input } from './ui/input';
import { fetchInvoices, Invoice } from '../lib/supabase';
import { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-2n5pj4qi5n';

interface HomeProps {
  onSelectPet: (id: string) => void;
  onAdminClick: () => void;
}

export default function Home({ onSelectPet, onAdminClick }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Calculate overall stats
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
    return (
      invoice.animal_name.toLowerCase().includes(query) ||
      invoice.animal_type.toLowerCase().includes(query) ||
      invoice.medical_condition.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white min-h-screen relative">
      <div className="bg-gradient-to-b from-[#eff6ff] to-white min-h-screen pb-8">
        {/* Header */}
        <header className="bg-white border-b border-[#e2e8f0] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <h1 className="text-[16px] sm:text-[20px] lg:text-[29.9px] font-bold text-[#1447e6] leading-tight sm:leading-9">
                JLT Cat Lovers' Group - Outstanding Vet Bills
              </h1>
              <button 
                onClick={onAdminClick}
                className="hidden lg:block text-sm px-4 py-2 border border-slate-300 rounded hover:bg-slate-50"
              >
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 max-w-[1536px] mx-auto">
          {/* Organization Section */}
          <div className="max-w-[896px] mx-auto mb-8 lg:mb-12 text-center">
            <h2 className="text-2xl lg:text-[28.2px] text-[#0f172b] mb-3 leading-9">
              JLT Cats
            </h2>
            <p className="text-[14px] lg:text-[16.7px] text-[#314158] leading-[22px] lg:leading-[29.25px] mb-6">
              We are a dedicated rescue group based in JLT, working tirelessly to provide medical care and shelter for abandoned cats and dogs. Every donation goes directly to veterinary treatment, helping us save more lives in our community.
            </p>

            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm lg:text-base">
                <span className="font-bold text-[#0f172b]">
                  ${totalRaised.toLocaleString()} raised of ${totalGoal.toLocaleString()} goal
                </span>
                <span className="text-[#45556c]">
                  {activeCampaigns} active campaigns • {overallProgress}%
                </span>
              </div>
              <div className="w-full bg-[#e2e8f0] rounded-full h-4">
                <div
                  className="bg-[#155dfc] h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(overallProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Browse Section */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-[20px] lg:text-[22.3px] text-[#0f172b] mb-2 leading-8">
              Browse veterinary fundraisers
            </h2>
            <p className="text-[14px] lg:text-[15px] text-[#45556c] leading-[22px] lg:leading-6 mb-4">
              Help animals in need get the medical care they deserve
            </p>

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:block max-w-[576px] relative mb-8">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5">
                <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.pcddfd00} stroke="#90A1B9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M17.5 17.5L13.9167 13.9167" stroke="#90A1B9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Search by pet name, type, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-[50px] bg-[#f1f5f9] border-0 text-[13px] text-[#717182]"
              />
            </div>

            {/* Search Bar - Mobile */}
            <div className="lg:hidden relative mb-6">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5">
                <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.pcddfd00} stroke="#90A1B9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d="M17.5 17.5L13.9167 13.9167" stroke="#90A1B9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Search by pet name or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 bg-[#f1f5f9] border-0 text-[13px] text-[#717182]"
              />
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">Loading campaigns...</p>
            </div>
          )}

          {/* Desktop Grid */}
          {!loading && (
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {filteredInvoices.map((pet) => (
                <CampaignCardDesktop
                  key={pet.id}
                  pet={pet}
                  onClick={() => onSelectPet(pet.id)}
                />
              ))}
            </div>
          )}

          {/* Mobile List */}
          {!loading && (
            <div className="lg:hidden space-y-4">
              {filteredInvoices.map((pet) => (
                <CampaignCardMobile
                  key={pet.id}
                  pet={pet}
                  onClick={() => onSelectPet(pet.id)}
                />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No campaigns found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Desktop Campaign Card
interface CampaignCardProps {
  pet: Invoice;
  onClick: () => void;
}

function CampaignCardDesktop({ pet, onClick }: CampaignCardProps) {
  const totalDonated = pet.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);
  const isFunded = totalDonated >= pet.estimated_cost;
  
  // Use stored status, with fallback logic for backwards compatibility
  let displayStatus = pet.status;
  if (pet.status === 'pending' && totalDonated > 0) {
    displayStatus = 'partially_funded';
  }
  if (totalDonated >= pet.estimated_cost) {
    displayStatus = 'funded';
  }
  
  const petImage = pet.pet_photo || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop';

  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-64 bg-[#f1f5f9] overflow-hidden">
        <img
          src={petImage}
          alt={pet.animal_name}
          className="w-full h-full object-cover"
        />
        {/* Status Badge */}
        <div className="absolute bottom-5 left-5">
          <div className={`px-2.5 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-xs leading-4 ${
            displayStatus === 'funded' || displayStatus === 'closed'
              ? 'bg-[#dcfce7] text-[#016630]' 
              : 'bg-[#dbeafe] text-[#193cb8]'
          }`}>
            {displayStatus.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[16.7px] lg:text-[17px] text-[#0f172b] mb-2 leading-7 min-h-[56px]">
          {pet.animal_name}: {pet.medical_condition}
        </h3>

        {/* Progress Bar */}
        <div className={`h-2 rounded-full mb-3 ${
          isFunded ? 'bg-[#155dfc]' : 'bg-[#e2e8f0]'
        }`}>
          {!isFunded && (
            <div
              className="bg-[#155dfc] h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          )}
        </div>

        {/* Amount */}
        <p className="text-[16.7px] font-bold text-[#0f172b] leading-7">
          ${totalDonated.toLocaleString()} raised of ${pet.estimated_cost.toLocaleString()} goal
        </p>
      </div>
    </div>
  );
}

// Mobile Campaign Card
function CampaignCardMobile({ pet, onClick }: CampaignCardProps) {
  const totalDonated = pet.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) * 100);
  const isFunded = totalDonated >= pet.estimated_cost;
  
  // Use stored status, with fallback logic for backwards compatibility
  let displayStatus = pet.status;
  if (pet.status === 'pending' && totalDonated > 0) {
    displayStatus = 'partially_funded';
  }
  if (totalDonated >= pet.estimated_cost) {
    displayStatus = 'funded';
  }
  
  const petImage = pet.pet_photo || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop';

  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-md transition-shadow p-[17px]"
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-[110px] h-[110px] rounded-[10px] overflow-hidden bg-[#f1f5f9]">
          <img
            src={petImage}
            alt={pet.animal_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 relative">
          {/* Donation count */}
          <p className="text-[11.4px] text-[#5b7aa6] leading-4 mb-1">
            {pet.donations?.length || 0} {(pet.donations?.length || 0) === 1 ? 'donation' : 'donations'}
          </p>

          {/* Title */}
          <h3 className="text-[13px] font-medium text-[#0f172a] leading-5 mb-3">
            Help {pet.animal_name} - {pet.medical_condition}
          </h3>

          {/* Status Badge - Positioned absolute on right */}
          <div className="absolute top-0 right-0">
            <div className={`px-2.5 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-[11.8px] leading-4 ${
              displayStatus === 'funded' || displayStatus === 'closed'
                ? 'bg-[#dcfce7] text-[#016630]' 
                : 'bg-[#dbeafe] text-[#193cb8]'
            }`}>
              {displayStatus.replace('_', ' ')}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`h-1.5 rounded-full mb-2 ${
            isFunded ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'
          }`}>
            {!isFunded && (
              <div
                className="bg-[#2563eb] h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            )}
          </div>

          {/* Amount */}
          <p className="text-[13px] font-semibold text-[#0f172a] leading-5">
            ${totalDonated.toLocaleString()} raised of ${pet.estimated_cost.toLocaleString()} goal
          </p>
        </div>
      </div>
    </div>
  );
}
