'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, ArrowLeft, LogOut } from 'lucide-react';
import PetDetail from './PetDetail';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { fetchCases, addCase, addDonation, updateCase, Case, Donation } from '../lib/database';
import { logoutAdmin } from '../lib/auth';

type View = 'dashboard' | 'case-detail';
type CaseStatus = 'pending' | 'partially_funded' | 'funded' | 'closed';

interface CaseWithDonations extends Case {
  donations: Donation[];
}

export default function AdminDashboard({ onBackToPublic }: { onBackToPublic: () => void }) {
  const [cases, setCases] = useState<CaseWithDonations[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [showAddCaseDialog, setShowAddCaseDialog] = useState(false);
  const [showAddDonationDialog, setShowAddDonationDialog] = useState(false);

  // Form state for new case
  const [newCase, setNewCase] = useState({
    animal_name: '',
    animal_type: '',
    medical_condition: '',
    estimated_cost: '',
    payment_link: '',
    invoice_file: '',
    pet_photo: '',
    pet_story: '',
    instagram_link: ''
  });

  // Form state for new donation
  const [newDonation, setNewDonation] = useState({
    amount: '',
    donor_name: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Load cases from Supabase
  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    const { data, error } = await fetchCases();
    if (!error) {
      // Transform data to include empty donations array if needed
      const casesWithDonations = data.map(c => ({
        ...c,
        donations: [] as Donation[]
      }));
      setCases(casesWithDonations);
    }
    setLoading(false);
  };

  const selectedCase = cases.find(c => c.id === selectedCaseId);

  const getStatusColor = (status: CaseStatus) => {
    const colors: Record<CaseStatus, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      partially_funded: 'bg-blue-100 text-blue-800',
      funded: 'bg-green-100 text-green-800',
      closed: 'bg-slate-100 text-slate-800'
    };
    return colors[status];
  };

  const calculateTotalPaid = (donations: Donation[]) => {
    return donations.reduce((sum, d) => sum + d.amount, 0);
  };

  const handleAddCase = async () => {
    if (!newCase.animal_name || !newCase.medical_condition || !newCase.estimated_cost || !newCase.payment_link) {
      return;
    }

    const caseData = {
      animal_name: newCase.animal_name,
      animal_type: newCase.animal_type,
      medical_condition: newCase.medical_condition,
      estimated_cost: parseFloat(newCase.estimated_cost),
      status: 'pending' as CaseStatus,
      payment_link: newCase.payment_link,
      invoice_file: newCase.invoice_file,
      pet_photo: newCase.pet_photo,
      pet_story: newCase.pet_story,
      instagram_link: newCase.instagram_link
    };

    const { data, error } = await addCase(caseData);
    
    if (!error && data) {
      setCases([{ ...data, donations: [] }, ...cases]);
      setShowAddCaseDialog(false);
      setNewCase({
        animal_name: '',
        animal_type: '',
        medical_condition: '',
        estimated_cost: '',
        payment_link: '',
        invoice_file: '',
        pet_photo: '',
        pet_story: '',
        instagram_link: ''
      });
    }
  };

  const handleAddDonation = async () => {
    if (!newDonation.amount || !selectedCase) {
      return;
    }

    const { data, error } = await addDonation(selectedCase.id, {
      amount: parseFloat(newDonation.amount),
      donor_name: newDonation.donor_name || 'Anonymous',
      date: newDonation.date
    });

    if (!error && data) {
      const updatedCases = cases.map(c => {
        if (c.id === selectedCaseId) {
          const donations = [...c.donations, data];
          const totalPaid = calculateTotalPaid(donations);
          let newStatus: CaseStatus = c.status;
          
          if (totalPaid >= c.estimated_cost) {
            newStatus = 'funded';
          } else if (totalPaid > 0) {
            newStatus = 'partially_funded';
          }

          return {
            ...c,
            donations,
            status: newStatus
          };
        }
        return c;
      });

      setCases(updatedCases);
      setShowAddDonationDialog(false);
      setNewDonation({
        amount: '',
        donor_name: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleUpdateCase = async (field: keyof Case, value: any) => {
    if (!selectedCaseId) return;

    const { error } = await updateCase(selectedCaseId, { [field]: value });
    
    if (!error) {
      const updatedCases = cases.map(c => 
        c.id === selectedCaseId ? { ...c, [field]: value } : c
      );
      setCases(updatedCases);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    onBackToPublic();
  };

  const viewCaseDetail = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView('case-detail');
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCaseId(null);
  };

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Back to Public View button */}
        <button
          onClick={handleLogout}
          className="fixed bottom-6 left-6 z-50 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-100 text-sm shadow-lg flex items-center gap-2"
        >
          <LogOut className="size-4" />
          Logout
        </button>

        {/* Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl text-slate-900">VET DONATION TRACKER</h1>
                <p className="text-sm text-slate-600 mt-1">Admin Dashboard</p>
              </div>
              <Button
                onClick={() => setShowAddCaseDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add New Case
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl text-slate-900 mb-4">All Cases</h2>
          
          {loading ? (
            <div className="text-center py-8 text-slate-600">Loading cases...</div>
          ) : cases.length === 0 ? (
            <div className="text-center py-8 text-slate-600">No cases yet. Create one to get started!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => {
                const totalPaid = calculateTotalPaid(caseItem.donations);
                const remaining = caseItem.estimated_cost - totalPaid;
                const percentagePaid = Math.round((totalPaid / caseItem.estimated_cost) * 100);

                return (
                  <Card
                    key={caseItem.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
                    onClick={() => viewCaseDetail(caseItem.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{caseItem.animal_name}</CardTitle>
                        <Badge variant="outline" className={getStatusColor(caseItem.status)}>
                          {caseItem.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>{caseItem.medical_condition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total Debt:</span>
                          <span className="font-semibold text-slate-900">
                            ${caseItem.estimated_cost.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Amount Paid:</span>
                          <span className="font-semibold text-green-700">
                            ${totalPaid.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Remaining:</span>
                          <span className="font-semibold text-blue-700">
                            ${remaining.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Progress</span>
                            <span className="text-slate-900">{percentagePaid}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(percentagePaid, 100)}%` }}
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

        {/* Add Case Dialog */}
        <Dialog open={showAddCaseDialog} onOpenChange={setShowAddCaseDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Case</DialogTitle>
              <DialogDescription>Enter the details for the new case</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="pet-name">Pet Name *</Label>
                <Input
                  id="pet-name"
                  placeholder="e.g., Max"
                  value={newCase.animal_name}
                  onChange={(e) => setNewCase({ ...newCase, animal_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment Description *</Label>
                <Textarea
                  id="treatment"
                  placeholder="Describe the treatment needed..."
                  value={newCase.medical_condition}
                  onChange={(e) => setNewCase({ ...newCase, medical_condition: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Total Cost/Debt Amount *</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newCase.estimated_cost}
                  onChange={(e) => setNewCase({ ...newCase, estimated_cost: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-link">Vet Payment Link *</Label>
                <Input
                  id="payment-link"
                  placeholder="https://..."
                  value={newCase.payment_link}
                  onChange={(e) => setNewCase({ ...newCase, payment_link: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-photo">Pet Photo URL</Label>
                <Input
                  id="pet-photo"
                  placeholder="https://example.com/photo.jpg"
                  value={newCase.pet_photo}
                  onChange={(e) => setNewCase({ ...newCase, pet_photo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-story">Pet Story/Background</Label>
                <Textarea
                  id="pet-story"
                  placeholder="Share the pet's story..."
                  value={newCase.pet_story}
                  onChange={(e) => setNewCase({ ...newCase, pet_story: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Social Media Link</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/..."
                  value={newCase.instagram_link}
                  onChange={(e) => setNewCase({ ...newCase, instagram_link: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCaseDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCase} className="bg-blue-600 hover:bg-blue-700">
                Publish Case
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Case Detail View
  if (currentView === 'case-detail' && selectedCase) {
    return (
      <PetDetail
        pet={selectedCase}
        donations={selectedCase.donations}
        onBack={backToDashboard}
      />
    );
  }

  return null;
}
