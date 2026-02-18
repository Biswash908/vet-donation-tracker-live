import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Trash2, Plus, X, Save, FileText } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { fetchInvoiceById, updateInvoice, deleteInvoice, addDonation, deleteDonation, uploadFileToStorage, type Invoice, type Donation } from '../lib/supabase';

interface EditCaseProps {
  petId: string;
  onBack: () => void;
}

export default function EditCase({ petId, onBack }: EditCaseProps) {
  const [pet, setPet] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedCase, setEditedCase] = useState({
    animal_name: '',
    medical_condition: '',
    estimated_cost: '',
    payment_link: '',
    pet_story: '',
    instagram_link: '',
    status: 'pending' as any
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newDonation, setNewDonation] = useState({
    amount: '',
    donor_name: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const data = await fetchInvoiceById(petId);
        if (data) {
          setPet(data);
          setEditedCase({
            animal_name: data.animal_name,
            medical_condition: data.medical_condition,
            estimated_cost: data.estimated_cost.toString(),
            payment_link: data.payment_link || '',
            pet_story: data.pet_story || '',
            instagram_link: data.instagram_link || '',
            status: data.status
          });
          setDonations(data.donations || []);
        }
      } catch (error) {
        console.error('Failed to load pet:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [petId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <p className="text-center text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <p className="text-center text-slate-600">Case not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const progressPercentage = Math.round((totalDonated / parseFloat(editedCase.estimated_cost)) * 100);
  const remaining = parseFloat(editedCase.estimated_cost) - totalDonated;

  const handleSave = async () => {
    if (!editedCase.animal_name || !editedCase.medical_condition || !editedCase.estimated_cost) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      let updates: any = {
        animal_name: editedCase.animal_name,
        medical_condition: editedCase.medical_condition,
        estimated_cost: parseFloat(editedCase.estimated_cost),
        payment_link: editedCase.payment_link,
        pet_story: editedCase.pet_story,
        instagram_link: editedCase.instagram_link,
        status: editedCase.status as any
      };

      // Upload new photo if provided
      if (photoFile) {
        const timestamp = Date.now();
        const photoPath = `pet-photos/${timestamp}-${photoFile.name}`;
        const photoUrl = await uploadFileToStorage(photoFile, 'pet-images', photoPath);
        
        if (!photoUrl) {
          alert('Failed to upload photo. Please try again.');
          setIsSaving(false);
          return;
        }
        
        updates.pet_photo = photoUrl;
      }

      // Upload new invoice if provided
      if (invoiceFile) {
        const timestamp = Date.now();
        const invoicePath = `invoices/${timestamp}-${invoiceFile.name}`;
        const invoiceUrl = await uploadFileToStorage(invoiceFile, 'pet-invoices', invoicePath);
        
        if (!invoiceUrl) {
          alert('Failed to upload invoice. Please try again.');
          setIsSaving(false);
          return;
        }
        
        updates.invoice_file = invoiceUrl;
      }

      await updateInvoice(petId, updates);
      alert('Case saved successfully!');
      setPhotoFile(null);
      setInvoiceFile(null);
      onBack();
    } catch (error) {
      console.error('Error saving case:', error);
      alert('Failed to save case. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${pet.animal_name}'s case? This action cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await deleteInvoice(petId);
        alert('Case deleted successfully!');
        onBack();
      } catch (error) {
        console.error('Error deleting case:', error);
        alert('Failed to delete case. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleAddDonation = async () => {
    if (!newDonation.amount || parseFloat(newDonation.amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    try {
      const donation = await addDonation(petId, {
        amount: parseFloat(newDonation.amount),
        donor_name: newDonation.donor_name || undefined
      });
      if (donation) {
        setDonations([...donations, donation]);
        setNewDonation({ amount: '', donor_name: '' });
        setShowDonationForm(false);
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Failed to add donation. Please try again.');
    }
  };

  const handleDeleteDonation = async (donationId: string) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      try {
        await deleteDonation(donationId);
        setDonations(donations.filter(d => d.id !== donationId));
      } catch (error) {
        console.error('Error deleting donation:', error);
        alert('Failed to delete donation. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Button 
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="gap-2 text-[#0a0a0a] hover:bg-slate-100"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>
          <div>
            <h1 className="text-2xl text-[#0f172b]">JLT Cat Lovers' Group</h1>
            <p className="text-sm text-[#717182] mt-1">Case Management • {pet.animal_name}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pet-name">Pet Name *</Label>
                  <Input
                    id="pet-name"
                    value={editedCase.animal_name}
                    onChange={(e) => setEditedCase({ ...editedCase, animal_name: e.target.value })}
                    className="bg-[#f3f3f5] border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    value={editedCase.status}
                    onChange={(e) => setEditedCase({ ...editedCase, status: e.target.value as Invoice['status'] })}
                    className="w-full h-10 px-3 rounded-lg bg-[#f3f3f5] border-0"
                  >
                    <option value="pending">Pending</option>
                    <option value="partially_funded">Partially Funded</option>
                    <option value="funded">Funded</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">Treatment Description *</Label>
                  <Textarea
                    id="treatment"
                    value={editedCase.medical_condition}
                    onChange={(e) => setEditedCase({ ...editedCase, medical_condition: e.target.value })}
                    rows={4}
                    className="bg-[#f3f3f5] border-0 max-h-32 overflow-y-auto"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Total Cost/Debt Amount *</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={editedCase.estimated_cost}
                    onChange={(e) => setEditedCase({ ...editedCase, estimated_cost: e.target.value })}
                    className="bg-[#f3f3f5] border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-photo">Pet Photo (Optional - Update)</Label>
                  <Input
                    id="pet-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="bg-[#f3f3f5] border-0"
                  />
                  {pet.pet_photo && !photoFile && (
                    <p className="text-sm text-slate-500">Current photo: {pet.pet_photo.split('/').pop()}</p>
                  )}
                  {photoFile && (
                    <p className="text-sm text-blue-600">New photo selected: {photoFile.name}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pet's Story */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-xl">Pet's Story</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="pet-story">Pet Story/Background</Label>
                  <Textarea
                    id="pet-story"
                    value={editedCase.pet_story}
                    onChange={(e) => setEditedCase({ ...editedCase, pet_story: e.target.value })}
                    rows={6}
                    className="bg-[#f3f3f5] border-0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Donations */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Donations</CardTitle>
                  <Button 
                    onClick={() => setShowDonationForm(!showDonationForm)}
                    size="sm"
                    className="bg-[#155dfc] hover:bg-[#1447e6] gap-2"
                  >
                    <Plus className="size-4" />
                    Log New Donation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showDonationForm && (
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 mb-4">
                    <h4 className="text-lg font-medium text-[#0f172b] mb-4">Log New Donation</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="donation-amount">Donation Amount *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]">AED</span>
                          <Input
                            id="donation-amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDonation.amount}
                            onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                            className="pl-7 bg-[#f6f6f6] border-[#e5e5e5]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="donor-name">Donor Name (Optional)</Label>
                        <Input
                          id="donor-name"
                          placeholder="Defaults to Anonymous if empty"
                          value={newDonation.donor_name}
                          onChange={(e) => setNewDonation({ ...newDonation, donor_name: e.target.value })}
                          className="bg-[#f6f6f6] border-[#e5e5e5]"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowDonationForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleAddDonation}
                          className="flex-1 bg-[#4e95ff] hover:bg-[#3b82f6]"
                        >
                          Add Donation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {donations.map((donation) => (
                    <div 
                      key={donation.id}
                      className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-[15px] text-[#0f172b] font-medium">
                          {donation.donor_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-[#45556c]">
                          {formatDate(donation.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-[17px] font-semibold text-[#16a34a]">
                          AED {donation.amount.toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDonation(donation.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {donations.length === 0 && !showDonationForm && (
                    <p className="text-sm text-[#64748b] text-center py-4">
                      No donations yet. Click "Log New Donation" to add one.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Links & Documents */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-xl">Links & Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-link">Vet Payment Link *</Label>
                  <Input
                    id="payment-link"
                    value={editedCase.payment_link}
                    onChange={(e) => setEditedCase({ ...editedCase, payment_link: e.target.value })}
                    className="bg-[#f3f3f5] border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Social Media Link</Label>
                  <Input
                    id="instagram"
                    value={editedCase.instagram_link}
                    onChange={(e) => setEditedCase({ ...editedCase, instagram_link: e.target.value })}
                    className="bg-[#f3f3f5] border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoice-file">Invoice Document (Optional)</Label>
                  <Input
                    id="invoice-file"
                    type="file"
                    onChange={(e) => setInvoiceFile(e.target.files?.[0] || null)}
                    className="bg-[#f3f3f5] border-0"
                  />
                  {pet.invoice_file && !invoiceFile && (
                    <div className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg bg-[#f8fafc]">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-[#155dfc]" />
                        <a 
                          href={pet.invoice_file} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-[#155dfc] hover:underline"
                        >
                          {pet.invoice_file.split('/').pop()}
                        </a>
                      </div>
                    </div>
                  )}
                  {invoiceFile && (
                    <p className="text-sm text-blue-600">New invoice selected: {invoiceFile.name}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pet Photo & Summary */}
          <div className="space-y-6">
            {/* Pet Photo */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-xl">Pet Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#f1f5f9] mb-4">
                  {pet.pet_photo ? (
                    <>
                      <img
                        src={pet.pet_photo}
                        alt={pet.animal_name}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                        <X className="size-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#45556c]">
                      No photo uploaded
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="bg-white border-[#e2e8f0]">
              <CardHeader>
                <CardTitle className="text-xl">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#45556c]">Total Debt:</span>
                    <span className="text-[#0f172b] font-semibold">AED {parseFloat(editedCase.estimated_cost).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#45556c]">Amount Paid:</span>
                    <span className="text-[#16a34a] font-semibold">AED {totalDonated.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-[#e2e8f0]">
                    <span className="text-[#0f172b] font-medium">Remaining:</span>
                    <span className="text-[#155dfc] font-bold">AED {remaining > 0 ? remaining.toFixed(2) : '0.00'}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#45556c]">Progress</span>
                    <span className="text-xs font-semibold text-[#0f172b]">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-[#e2e8f0] rounded-full h-3">
                    <div
                      className="bg-[#155dfc] h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleSave}
                className="w-full bg-[#155dfc] hover:bg-[#1447e6] h-11 gap-2"
              >
                <Save className="size-4" />
                Save Changes
              </Button>
              <Button 
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-11 gap-2"
              >
                <Trash2 className="size-4" />
                Delete Case
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
