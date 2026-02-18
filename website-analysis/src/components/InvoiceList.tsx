import { mockInvoices, Invoice, InvoiceStatus } from '../data/mockData';
import { Badge } from './ui/badge';

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  active: { label: 'Active', className: 'bg-slate-100 text-slate-800 border-slate-300' },
  partially_funded: { label: 'Partially Funded', className: 'bg-blue-100 text-blue-800 border-blue-300' },
  funded: { label: 'Funded', className: 'bg-green-100 text-green-800 border-green-300' }
};

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const statusStyle = statusConfig[invoice.status];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl text-slate-900 mb-1">
            {invoice.animal_name} ({invoice.animal_type})
          </h3>
          <p className="text-slate-600">{invoice.medical_condition}</p>
        </div>
        <Badge variant="outline" className={statusStyle.className}>
          {statusStyle.label}
        </Badge>
      </div>
      <div className="text-right">
        <p className="text-3xl text-slate-900">${invoice.estimated_cost.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default function InvoiceList() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl mb-3">Pending Vet Bills</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          These are the veterinary bills we're currently fundraising for. Every contribution helps us provide 
          the care these animals desperately need.
        </p>
      </div>

      {mockInvoices.length === 0 ? (
        <div className="text-center text-slate-600 py-12">
          <p>No pending bills at the moment. Thank you for your support!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}
