import { mockInvoices, mockDonations } from '../data/mockData';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface DonationSummaryProps {
  onDonateClick: () => void;
}

export default function DonationSummary({ onDonateClick }: DonationSummaryProps) {
  // Calculate totals
  const totalNeeded = mockInvoices.reduce((sum, invoice) => sum + invoice.estimated_cost, 0);
  const totalDonated = mockDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const percentageFunded = Math.round((totalDonated / totalNeeded) * 100);
  const remaining = totalNeeded - totalDonated;
  const invoiceCount = mockInvoices.length;

  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl mb-4">Help Us Care for Animals in Need</h1>
      <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
        Every dollar you contribute goes directly toward providing essential veterinary care for rescue animals. 
        Your generosity saves lives.
      </p>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-700">Funds Raised</span>
            <span className="text-2xl text-slate-900">
              ${totalDonated.toLocaleString()} ({percentageFunded}%)
            </span>
          </div>
          <Progress value={percentageFunded} className="h-3 mb-2" />
          <p className="text-sm text-slate-600">
            ${remaining.toLocaleString()} remaining to reach our goal
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Total Needed</p>
            <p className="text-3xl text-blue-900">${totalNeeded.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">Already Donated</p>
            <p className="text-3xl text-green-900">${totalDonated.toLocaleString()}</p>
          </div>
        </div>

        {/* Invoice Count */}
        <p className="text-slate-600 mb-6">
          Currently fundraising for <span className="font-semibold">{invoiceCount}</span> pending vet bills
        </p>

        {/* Donate Button */}
        <Button 
          onClick={onDonateClick}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
        >
          Make a Donation
        </Button>
      </div>
    </div>
  );
}
