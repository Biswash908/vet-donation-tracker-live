import { ArrowLeft, FileText, Heart, Instagram, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import type { Invoice } from '../lib/supabase';

interface PetDetailProps {
  pet: Invoice;
  onBack: () => void;
}

export default function PetDetail({ pet, onBack }: PetDetailProps) {
  const [invoicesOpen, setInvoicesOpen] = useState(false);
  const totalDonated = (pet.donations || []).reduce((sum, d) => sum + d.amount, 0);
  const progressPercentage = Math.round((totalDonated / pet.estimated_cost) *100);
  const stillNeeded = pet.estimated_cost - totalDonated;
  const isFunded = totalDonated >= pet.estimated_cost;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Ensure URL has protocol
  const formatPaymentLink = (url: string | undefined): string => {
    if (!url) return '';
    // If URL already has protocol, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Otherwise, prepend https://
    return `https://${url}`;
  };

  const handleDonateClick = () => {
    if (pet.payment_link) {
      const formattedUrl = formatPaymentLink(pet.payment_link);
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16 sm:h-20">
            <Button 
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="gap-2 text-[#0a0a0a] hover:bg-slate-100"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            
            <div className="flex-1">
              <h1 className="text-[18px] sm:text-[20px] text-[#0f172b] leading-6">
                JLT Cat Lovers' Group
              </h1>
              <p className="text-xs text-[#45556c]">Pet Details</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-[1536px] mx-auto">
        {/* Mobile View - Reordered */}
        <div className="lg:hidden space-y-6">
          {/* 1. Pet Header Card - Name above photo */}
          <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[30px] text-[#0a0a0a] leading-9 mb-1">
                  {pet.animal_name}
                </h2>
              </div>
              <div className={`px-2.5 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-xs leading-4 ${
                isFunded 
                  ? 'bg-[#dcfce7] text-[#016630]' 
                  : 'bg-[#dbeafe] text-[#193cb8]'
              }`}>
                {isFunded ? 'funded' : 'partially funded'}
              </div>
            </div>

            {/* Pet Image */}
            {pet.pet_photo && (
              <div className="rounded-[10px] overflow-hidden">
                <img 
                  src={pet.pet_photo} 
                  alt={pet.animal_name}
                  className="w-full h-[250px] sm:h-[300px] object-cover"
                />
              </div>
            )}
            {!pet.pet_photo && (
              <div className="rounded-[10px] overflow-hidden bg-[#f0f0f0] h-[250px] sm:h-[300px] flex items-center justify-center">
                <p className="text-[#45556c]">No photo available</p>
              </div>
            )}
          </div>

          {/* 2. Donation Progress Bar */}
          <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="text-[56px] sm:text-[60px] font-bold text-[#0f172b] mb-1 leading-none">
                  AED {totalDonated.toFixed(2)}
                </div>
                <div className="text-sm text-[#45556c] mt-1">
                  raised of AED {pet.estimated_cost.toFixed(2)} goal
                </div>
              </div>
              {/* Invoice Button - Always visible in mobile */}
              <button
                onClick={() => setInvoicesOpen(!invoicesOpen)}
                className="flex items-center gap-1 text-[#155dfc] hover:text-[#1447e6] transition-colors shrink-0"
              >
                <FileText className="size-4" />
                <span className="text-sm font-medium">Invoice</span>
                {invoicesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>
            </div>

{/* Invoice Dropdown */}
{invoicesOpen && (
  <div className="mb-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
    <h4 className="text-sm font-medium text-[#0f172b] mb-3">Uploaded Invoices</h4>
    <div className="space-y-2">
      {pet.invoice_file ? (() => {
        // Parse the invoice file(s)
        let invoiceUrls: string[] = [];
        try {
          const parsed = JSON.parse(pet.invoice_file);
          invoiceUrls = Array.isArray(parsed) ? parsed : [pet.invoice_file];
        } catch {
          invoiceUrls = [pet.invoice_file];
        }

        // Map over them with sequential names
        return invoiceUrls.map((url, index) => (
          <button 
            key={index}
            onClick={() => window.open(url, '_blank')}
            className="flex items-center gap-2 text-sm text-[#155dfc] hover:underline w-full text-left"
          >
            <FileText className="size-4 flex-shrink-0" />
            <span className="truncate">{`Invoice ${index + 1}`}</span>
          </button>
        ));
      })() : (
        <p className="text-sm text-[#64748b]">No invoices uploaded yet</p>
      )}
    </div>
  </div>
)}

            {/* Progress Bar */}
            <div className="w-full bg-[#e2e8f0] rounded-full h-3 mb-6">
              <div
                className="bg-[#155dfc] h-3 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>

            {/* 3. Donate Button */}
            <Button 
              className="w-full bg-[#155dfc] hover:bg-[#1447e6] text-white h-12 text-base gap-2"
              onClick={handleDonateClick}
            >
              <Heart className="size-5" />
              Donate Now
            </Button>
            <p className="text-xs text-center text-[#64748b] mt-3">
              You'll be redirected to the veterinary clinic's secure payment page
            </p>
          </div>

          {/* 4. Details */}
          <div className="space-y-6">
            {/* Pet's Story */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
<h3 className="text-[20px] font-medium text-[#0f172b] mb-3 leading-7">
  {pet.animal_name}'s Story
</h3>
              <p className="text-[15px] text-[#45556c] leading-6 whitespace-pre-wrap">
                {pet.pet_story}
              </p>
            </div>

            {/* Medical Condition */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <h3 className="text-[20px] font-medium text-[#0f172b] mb-3 leading-7">
                Medical Condition
              </h3>
              <p className="text-[15px] text-[#45556c] leading-6">
                {pet.medical_condition}
              </p>
            </div>

            {/* Recent Donations */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <h3 className="text-[20px] font-medium text-[#0f172b] mb-1 leading-7">
                Recent Donations
              </h3>
              <p className="text-sm text-[#45556c] mb-6">
                {(pet.donations || []).length} generous {(pet.donations || []).length === 1 ? 'donor' : 'donors'}
              </p>

              <div className="space-y-3">
                {(pet.donations || []).map((donation) => (
                  <div 
                    key={donation.id}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] text-[#0f172b] font-medium">
                          {donation.donor_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-[#45556c]">
                          {formatDate(donation.created_at)}
                        </p>
                      </div>
                      <p className="text-[17px] font-semibold text-[#16a34a]">
                        AED {donation.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Journey - Mobile */}
            {pet.instagram_link && (
              <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                <h3 className="text-[17px] font-medium text-[#0f172b] mb-4">
                  Follow Our Journey
                </h3>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-[#e2e8f0]"
                  onClick={() => window.open(pet.instagram_link, '_blank')}
                >
                  <Instagram className="size-4" />
                  View on Instagram
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop View - Original Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pet Header Card */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-[30px] text-[#0a0a0a] leading-9 mb-1">
                    {pet.animal_name}
                  </h2>
                </div>
                <div className={`px-2.5 py-0.5 rounded-lg border border-[rgba(0,0,0,0.1)] text-xs leading-4 ${
                  isFunded 
                    ? 'bg-[#dcfce7] text-[#016630]' 
                    : 'bg-[#dbeafe] text-[#193cb8]'
                }`}>
                  {isFunded ? 'funded' : 'partially funded'}
                </div>
              </div>

              {/* Pet Image */}
              {pet.pet_photo && (
                <div className="rounded-[10px] overflow-hidden">
                  <img 
                    src={pet.pet_photo} 
                    alt={pet.animal_name}
                    className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
                  />
                </div>
              )}
              {!pet.pet_photo && (
                <div className="rounded-[10px] overflow-hidden bg-[#f0f0f0] h-[250px] sm:h-[300px] lg:h-[400px] flex items-center justify-center">
                  <p className="text-[#45556c]">No photo available</p>
                </div>
              )}
            </div>

            {/* Pet's Story */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
<h3 className="text-[20px] font-medium text-[#0f172b] mb-3 leading-7">
  {pet.animal_name}'s Story
</h3>
              <p className="text-[15px] text-[#45556c] leading-6 whitespace-pre-wrap">
                {pet.pet_story}
              </p>
            </div>

            {/* Medical Condition */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <h3 className="text-[20px] font-medium text-[#0f172b] mb-3 leading-7">
                Medical Condition
              </h3>
              <p className="text-[15px] text-[#45556c] leading-6">
                {pet.medical_condition}
              </p>
            </div>

            {/* Recent Donations */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <h3 className="text-[20px] font-medium text-[#0f172b] mb-1 leading-7">
                Recent Donations
              </h3>
              <p className="text-sm text-[#45556c] mb-6">
                {(pet.donations || []).length} generous {(pet.donations || []).length === 1 ? 'donor' : 'donors'}
              </p>

              <div className="space-y-3">
                {(pet.donations || []).map((donation) => (
                  <div 
                    key={donation.id}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] text-[#0f172b] font-medium">
                          {donation.donor_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-[#45556c]">
                          {formatDate(donation.created_at)}
                        </p>
                      </div>
                      <p className="text-[17px] font-semibold text-[#16a34a]">
                        AED {donation.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[17px] font-medium text-[#0f172b]">
                  Funding Progress
                </h3>
                
                {/* Invoice Dropdown Toggle */}
                <button
                  onClick={() => setInvoicesOpen(!invoicesOpen)}
                  className="flex items-center gap-1 text-[#155dfc] hover:text-[#1447e6] transition-colors"
                >
                  <FileText className="size-4" />
                  <span className="text-sm font-medium">Invoice</span>
                  {invoicesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>

{/* Invoice Dropdown - Desktop */}
{invoicesOpen && (
  <div className="mb-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
    <h4 className="text-sm font-medium text-[#0f172b] mb-3">Uploaded Invoices</h4>
    <div className="space-y-2">
      {pet.invoice_file ? (() => {
        let invoiceUrls: string[] = [];
        try {
          const parsed = JSON.parse(pet.invoice_file);
          invoiceUrls = Array.isArray(parsed) ? parsed : [pet.invoice_file];
        } catch {
          invoiceUrls = [pet.invoice_file];
        }

        // Map over them with sequential names
        return invoiceUrls.map((url, index) => (
          <button 
            key={index}
            onClick={() => window.open(url, '_blank')}
            className="flex items-center gap-2 text-sm text-[#155dfc] hover:underline w-full text-left"
          >
            <FileText className="size-4 flex-shrink-0" />
            <span className="truncate">{`Invoice ${index + 1}`}</span>
          </button>
        ));
      })() : (
        <p className="text-sm text-[#64748b]">No invoices uploaded yet</p>
      )}
    </div>
  </div>
)}

              {/* Progress Info */}
              <div className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-[#45556c]">Progress</span>
                  <span className="text-lg font-semibold text-[#0f172b]">{progressPercentage}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-[#e2e8f0] rounded-full h-3 mb-4">
                  <div
                    className="bg-[#155dfc] h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Funding Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-[#45556c]">Total Needed</span>
                  <span className="text-[17px] font-semibold text-[#0f172b]">
                    AED {pet.estimated_cost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-[#45556c]">Raised So Far</span>
                  <span className="text-[17px] font-semibold text-[#16a34a]">
                    AED {totalDonated.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#e2e8f0]">
                  <span className="text-[15px] font-medium text-[#0f172b]">Still Needed</span>
                  <span className="text-[20px] font-bold text-[#155dfc]">
                    AED {stillNeeded > 0 ? stillNeeded.toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>

              {/* Donate Button */}
              <Button 
                className="w-full bg-[#155dfc] hover:bg-[#1447e6] text-white h-12 text-base gap-2"
                onClick={handleDonateClick}
              >
                <Heart className="size-5" />
                Donate Now
              </Button>
              
              <p className="text-xs text-center text-[#64748b] mt-3">
                You'll be redirected to the veterinary clinic's secure payment page
              </p>
            </div>

            {/* Follow Journey */}
            {pet.instagram_link && (
              <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                <h3 className="text-[17px] font-medium text-[#0f172b] mb-4">
                  Follow Our Journey
                </h3>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-[#e2e8f0]"
                  onClick={() => window.open(pet.instagram_link, '_blank')}
                >
                  <Instagram className="size-4" />
                  View on Instagram
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
