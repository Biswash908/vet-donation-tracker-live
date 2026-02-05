'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Phone, Mail } from 'lucide-react';
import { fetchCasesWithDonations, Case, Donation } from '../lib/database';

interface CaseWithTotal extends Case {
  total_paid: number;
  donations: Donation[];
}

export default function Homepage() {
  const [cases, setCases] = useState<CaseWithTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const invoices = cases; // Declare the invoices variable

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    const { data } = await fetchCasesWithDonations();
    if (data) {
      setCases(data);
    }
    setLoading(false);
  };

  // Calculate aggregate metrics from cases and their donations
  const totalDebt = cases.reduce((sum, c) => sum + c.estimated_cost, 0);
  const totalPaid = cases.reduce((sum, c) => sum + c.total_paid, 0);
  const totalRemaining = totalDebt - totalPaid;
  const percentagePaid = totalDebt > 0 ? Math.round((totalPaid / totalDebt) * 100) : 0;

  const handleDonate = (paymentLink?: string) => {
    if (paymentLink) {
      window.open(paymentLink, '_blank');
    } else {
      alert('Payment link not available for this case');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-slate-100 text-slate-800',
      partially_funded: 'bg-blue-100 text-blue-800',
      funded: 'bg-green-100 text-green-800',
      closed: 'bg-slate-100 text-slate-800'
    };
    return colors[status] || colors.active;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl text-slate-900">VET DONATION TRACKER</h1>
              <p className="text-sm text-slate-600 mt-1">Transparent fundraising for animal rescue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Help us care for animals in need section */}
        <div className="mb-8">
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-slate-900 mb-3">Help Us Care for Animals in Need</h2>
                <p className="text-slate-600 text-base max-w-3xl mx-auto">
                  Every dollar you contribute goes directly toward providing essential veterinary care for rescue animals. Your generosity saves lives.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                {/* Funds Raised Progress */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-700">Funds Raised</span>
                    <span className="text-xl text-slate-900">
                      ${totalPaid.toLocaleString()} ({percentagePaid}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-300 rounded-full h-2.5">
                    <div
                      className="bg-slate-900 h-2.5 rounded-full transition-all"
                      style={{ width: `${Math.min(percentagePaid, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    ${totalRemaining.toLocaleString()} remaining to reach our goal
                  </p>
                </div>

                {/* Total Needed and Already Donated Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="pt-6 pb-6 text-center">
                      <p className="text-sm text-blue-700 mb-2">Total Needed</p>
                      <p className="text-3xl text-blue-900">${totalDebt.toLocaleString()}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-100">
                    <CardContent className="pt-6 pb-6 text-center">
                      <p className="text-sm text-green-700 mb-2">Already Donated</p>
                      <p className="text-3xl text-green-900">${totalPaid.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Currently fundraising text */}
                <p className="text-center text-sm text-slate-600 mb-4">
                  Currently fundraising for {cases.length} pending vet bills
                </p>

                {/* Make a Donation Button */}
                <div className="text-center">
                  <Button
                    onClick={() => {
                      // Scroll to the pending bills section
                      document.getElementById('pending-bills')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-base"
                  >
                    Make a Donation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Treatment Cases */}
        <div id="pending-bills">
          <h2 className="text-xl text-slate-900 mb-4">Pending Veterinary Bills</h2>
          {loading ? (
            <div className="text-center py-8 text-slate-600">Loading cases...</div>
          ) : cases.length === 0 ? (
            <div className="text-center py-8 text-slate-600">No cases yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {cases.map((caseItem) => {
                const remaining = caseItem.estimated_cost - caseItem.total_paid;
                const caseProgress = caseItem.estimated_cost > 0 ? Math.round((caseItem.total_paid / caseItem.estimated_cost) * 100) : 0;

                return (
                  <Card key={caseItem.id} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{caseItem.animal_name}</CardTitle>
                            <Badge variant="outline" className={getStatusColor(caseItem.status)}>
                              {caseItem.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            {caseItem.medical_condition}
                          </CardDescription>
                        </div>
                        <Button
                          onClick={() => handleDonate(caseItem.payment_link)}
                          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Heart className="size-4" />
                          Donate
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Cost Information */}
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-600">Total Cost</p>
                            <p className="text-2xl text-slate-900">${caseItem.estimated_cost.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">Remaining</p>
                            <p className="text-2xl text-blue-700">${remaining.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Progress Bar for this case */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-600">Funding Progress</span>
                            <span className="text-xs text-slate-900">{caseProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(caseProgress, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* How Donations Work */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 space-y-2">
            <p>1. Browse the treatment cases above and choose one to support</p>
            <p>2. Click "Donate" to be redirected to the veterinary clinic's secure payment system</p>
            <p>3. Complete your donation directly with the vet clinic</p>
            <p>4. Your contribution helps save lives and gets tracked here transparently</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
