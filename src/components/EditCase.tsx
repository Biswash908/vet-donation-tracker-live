import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Trash2, Plus, X, Save, FileText, Loader2, Link } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { fetchInvoiceById, updateInvoice, deleteInvoice, addDonation, deleteDonation, uploadFileToStorage, type Invoice, type Donation, type DonationLink } from '../lib/supabase';
import MultiPhotoUpload from './MultiPhotoUpload';

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
    pet_story: '',
    instagram_link: '',
    status: 'pending' as any
  });
  const [donationLinks, setDonationLinks] = useState<DonationLink[]>([{ url: '', label: '' }]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newDonation, setNewDonation] = useState({
    amount: '',
    donor_name: ''
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [originalPhotoUrls, setOriginalPhotoUrls] = useState<string[]>([]);
  const [invoiceFiles, setInvoiceFiles] = useState<File[]>([]);
  const [existingInvoiceUrls, setExistingInvoiceUrls] = useState<string[]>([]);
  const [originalInvoiceUrls, setOriginalInvoiceUrls] = useState<string[]>([]);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const data = await fetchInvoiceById(petId);
        if (data) {
          setPet(data);
          setEditedCase({
            animal_name: data.animal_name || '',
            medical_condition: data.medical_condition || '',
            estimated_cost: (data.estimated_cost != null ? data.estimated_cost : 0).toString(),
            pet_story: data.pet_story || '',
            instagram_link: data.instagram_link || '',
            status: data.status
          });

          // Parse payment_link: supports legacy single URL or new JSON array of DonationLink
          if (data.payment_link) {
            try {
              const parsed = JSON.parse(data.payment_link);
              if (Array.isArray(parsed)) {
                setDonationLinks(parsed.length > 0 ? parsed : [{ url: '', label: '' }]);
              } else {
                setDonationLinks([{ url: parsed, label: '' }]);
              }
            } catch {
              setDonationLinks([{ url: data.payment_link, label: '' }]);
            }
          } else {
            setDonationLinks([{ url: '', label: '' }]);
          }
          setDonations(data.donations || []);

          // Parse existing photo URLs (can be JSON array or single URL)
          const photoUrls = data.pet_photo
            ? (() => {
              try {
                const parsed = JSON.parse(data.pet_photo);
                console.log('[v0] Parsed photos:', parsed);
                return Array.isArray(parsed) ? parsed : [data.pet_photo];
              } catch {
                console.log('[v0] Failed to parse photos, using raw:', data.pet_photo);
                return [data.pet_photo];
              }
            })()
            : [];
          console.log('[v0] Setting existing photo URLs:', photoUrls);
          setPhotoUrls(photoUrls);
          setOriginalPhotoUrls(photoUrls);

          // Parse existing invoice URLs (can be JSON array or single URL)
          const urls = data.invoice_file
            ? (() => {
              try {
                const parsed = JSON.parse(data.invoice_file);
                console.log('[v0] Parsed invoices:', parsed);
                return Array.isArray(parsed) ? parsed : [data.invoice_file];
              } catch {
                console.log('[v0] Failed to parse, using raw:', data.invoice_file);
                return [data.invoice_file];
              }
            })()
            : [];
          console.log('[v0] Setting existing invoice URLs:', urls);
          setExistingInvoiceUrls(urls);
          setOriginalInvoiceUrls(urls);
        }
      } catch (error) {
        console.error('Failed to load pet:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPet();
  }, [petId]);

  // beforeunload: warn when closing tab/window with unsaved changes (must be before early returns)
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!pet) return;
      const origCost = pet.estimated_cost != null ? pet.estimated_cost.toString() : '0';
      const changed =
        editedCase.animal_name !== (pet.animal_name || '') ||
        editedCase.medical_condition !== (pet.medical_condition || '') ||
        editedCase.estimated_cost !== origCost ||
        editedCase.pet_story !== (pet.pet_story || '') ||
        editedCase.instagram_link !== (pet.instagram_link || '') ||
        editedCase.status !== pet.status ||
        photoFiles !== null ||
        invoiceFiles.length > 0 ||
        JSON.stringify(existingInvoiceUrls) !== JSON.stringify(originalInvoiceUrls);
      if (changed) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [pet, editedCase, photoFiles, photoUrls, invoiceFiles, existingInvoiceUrls, originalInvoiceUrls]);

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
  const cost = parseFloat(editedCase.estimated_cost) || 0;
  const progressPercentage = cost > 0 ? Math.round((totalDonated / cost) * 100) : 0;
  const remaining = cost - totalDonated;

  const hasUnsavedChanges = (): boolean => {
    if (!pet) return false;
    const origCost = pet.estimated_cost != null ? pet.estimated_cost.toString() : '0';
    return (
      editedCase.animal_name !== (pet.animal_name || '') ||
      editedCase.medical_condition !== (pet.medical_condition || '') ||
      editedCase.estimated_cost !== origCost ||
      editedCase.pet_story !== (pet.pet_story || '') ||
      editedCase.instagram_link !== (pet.instagram_link || '') ||
      editedCase.status !== pet.status ||
      photoFiles.length > 0 ||
      JSON.stringify(photoUrls) !== JSON.stringify(originalPhotoUrls) ||
      invoiceFiles.length > 0 ||
      JSON.stringify(existingInvoiceUrls) !== JSON.stringify(originalInvoiceUrls)
    );
  };

  const handleBack = () => {
    if (hasUnsavedChanges() && !confirm('You have unsaved changes. Are you sure you want to leave? Your changes will not be saved.')) {
      return;
    }
    onBack();
  };

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
        payment_link: JSON.stringify(donationLinks.filter(l => l.url.trim() !== '')),
        pet_story: editedCase.pet_story,
        instagram_link: editedCase.instagram_link,
        status: editedCase.status as any
      };

      // 1. FILTER: Keep only existing remote URLs from the preview list
      // This removes any Base64 strings (data:...) from the array we send to the DB
      const existingRemoteUrls = photoUrls.filter(url => url.startsWith('http'));

      // 2. UPLOAD: Process the actual File objects
      const newPhotoUrls: string[] = [];
      if (photoFiles.length > 0) {
        for (const file of photoFiles) {
          const timestamp = Date.now();
          const photoPath = `pet-photos/${timestamp}-${file.name}`;
          const photoUrl = await uploadFileToStorage(file, 'pet-images', photoPath);

          if (!photoUrl) {
            throw new Error(`Failed to upload ${file.name}`);
          }
          newPhotoUrls.push(photoUrl);
        }
      }

      // 3. COMBINE: Merge existing hosted URLs with the new ones just uploaded
      const finalPhotoUrls = [...existingRemoteUrls, ...newPhotoUrls];

      // Update pet_photo only with clean URLs
      updates.pet_photo = finalPhotoUrls.length > 0 ? JSON.stringify(finalPhotoUrls) : null;

      // ... Handle Invoices (same logic: filter existing vs new) ...
      const finalInvoiceUrls = [...existingInvoiceUrls]; // Add logic here if you want to upload new invoices too
      updates.invoice_file = finalInvoiceUrls.length > 0 ? JSON.stringify(finalInvoiceUrls) : null;

      await updateInvoice(petId, updates);

      alert('Case saved successfully!');
      setPhotoFiles([]);
      setPhotoUrls(finalPhotoUrls);
      setOriginalPhotoUrls(finalPhotoUrls);
      onBack();
    } catch (error: any) {
      console.error('Error saving case:', error);
      alert(`Failed to save: ${error.message || 'Unknown error'}`);
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
          <div className="flex items-center gap-3">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              className="gap-2 text-[#0a0a0a] hover:bg-slate-100 p-0"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="text-lg sm:text-xl font-semibold text-[#0f172b]">Case Management</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        {/* Mobile View - Stacked Layout */}
        <div className="lg:hidden space-y-6">
          {/* 1. Basic Information */}
          <Card className="bg-white border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
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
            </CardContent>
          </Card>

          {/* 2. Pet Photos */}
          <div className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden min-w-0">
            <div className="px-4 pt-3 pb-0">
              <h3 className="text-base font-semibold text-[#0f172b]">Pet Photos</h3>
            </div>
            <div className="px-4 py-2">
              <MultiPhotoUpload
                photos={photoUrls}
                onUpload={(files) => {
                  setPhotoFiles(prev => [...prev, ...files]);
                  files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target?.result) {
                        setPhotoUrls(prev => [...prev, e.target.result as string]);
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
                onRemove={(index) => {
                  const urlToRemove = photoUrls[index];
                  if (urlToRemove.startsWith('data:')) {
                    const newPhotosBeforeThisOne = photoUrls
                      .slice(0, index)
                      .filter(url => url.startsWith('data:')).length;
                    setPhotoFiles(prev => prev.filter((_, i) => i !== newPhotosBeforeThisOne));
                  }
                  setPhotoUrls(prev => prev.filter((_, i) => i !== index));
                }}
              />
            </div>
          </div>

          {/* 3. Pet's Story */}
          <Card className="bg-white border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg">Pet's Story</CardTitle>
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

          {/* 4. Donations */}
          <Card className="bg-white border-[#e2e8f0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Donations</CardTitle>
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555] font-medium">AED</span>
                        <Input
                          id="donation-amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={newDonation.amount}
                          onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                          className="pl-11 bg-[#f6f6f6] border-[#e5e5e5]"
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

          {/* 5. Financial Summary */}
          <Card className="bg-white border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg">Financial Summary</CardTitle>
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

          {/* 6. Links & Documents */}
          <Card className="bg-white border-[#e2e8f0]">
            <CardHeader>
              <CardTitle className="text-lg">Links & Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Donation Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Donation Links</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs border-[#e2e8f0]"
                    onClick={() => setDonationLinks(prev => [...prev, { url: '', label: '' }])}
                  >
                    <Plus className="size-3" />
                    Add Link
                  </Button>
                </div>
                <p className="text-xs text-[#64748b]">One link shows a single "Donate Now" button. Multiple links show separate buttons.</p>
                <div className="space-y-2">
                  {donationLinks.map((link, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          placeholder="Button label (e.g. Donate 100 AED)"
                          value={link.label}
                          onChange={(e) => setDonationLinks(prev => prev.map((l, j) => j === i ? { ...l, label: e.target.value } : l))}
                          className="bg-[#f3f3f5] border-0 text-sm h-9"
                        />
                        <Input
                          placeholder="https://payment-link.com"
                          value={link.url}
                          onChange={(e) => setDonationLinks(prev => prev.map((l, j) => j === i ? { ...l, url: e.target.value } : l))}
                          className="bg-[#f3f3f5] border-0 text-sm h-9"
                        />
                      </div>
                      {donationLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 mt-1 shrink-0"
                          onClick={() => setDonationLinks(prev => prev.filter((_, j) => j !== i))}
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
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
                <Label htmlFor="invoice-file">Invoices (Optional - multiple allowed)</Label>
                <Input
                  id="invoice-file"
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length) setInvoiceFiles(prev => [...prev, ...files]);
                    e.target.value = '';
                  }}
                  className="bg-[#f3f3f5] border-0"
                />
                {existingInvoiceUrls.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#64748b]">Existing invoices:</p>
                    {existingInvoiceUrls.map((url, i) => (
                      <div key={url} className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg bg-[#f8fafc]">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#155dfc] hover:underline truncate min-w-0">
                          <FileText className="size-4 shrink-0" />
                          {url.split('/').pop() || `Invoice ${i + 1}`}
                        </a>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setExistingInvoiceUrls(prev => prev.filter((_, j) => j !== i))}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {invoiceFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#64748b]">New invoices to upload:</p>
                    {invoiceFiles.map((file, i) => (
                      <div key={`${file.name}-${i}`} className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg bg-[#eff6ff]">
                        <span className="text-sm text-[#0f172b] truncate min-w-0">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setInvoiceFiles(prev => prev.filter((_, j) => j !== i))}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {isSaving && invoiceFiles.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-[#45556c]">
                    <Loader2 className="size-4 animate-spin text-[#155dfc]" />
                    <span>Uploading {invoiceFiles.length} invoice(s)...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 7. Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              className="w-full bg-[#155dfc] hover:bg-[#1447e6] h-11 gap-2"
              disabled={isSaving || isDeleting}
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving changes...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              onClick={handleDelete}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-11 gap-2"
              disabled={isSaving || isDeleting}
            >
              <Trash2 className="size-4" />
              {isDeleting ? 'Deleting...' : 'Delete Case'}
            </Button>
          </div>
        </div>

        {/* Desktop View - Columnar Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6">
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
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555] font-medium">AED</span>
                          <Input
                            id="donation-amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDonation.amount}
                            onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                            className="pl-11 bg-[#f6f6f6] border-[#e5e5e5]"
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

                {/* Donation Links */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Donation Links</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs border-[#e2e8f0]"
                      onClick={() => setDonationLinks(prev => [...prev, { url: '', label: '' }])}
                    >
                      <Plus className="size-3" />
                      Add Link
                    </Button>
                  </div>
                  <p className="text-xs text-[#64748b]">One link shows a single "Donate Now" button. Multiple links show separate buttons.</p>
                  <div className="space-y-2">
                    {donationLinks.map((link, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-1">
                          <Input
                            placeholder="Button label (e.g. Donate 100 AED)"
                            value={link.label}
                            onChange={(e) => setDonationLinks(prev => prev.map((l, j) => j === i ? { ...l, label: e.target.value } : l))}
                            className="bg-[#f3f3f5] border-0 text-sm h-9"
                          />
                          <Input
                            placeholder="https://payment-link.com"
                            value={link.url}
                            onChange={(e) => setDonationLinks(prev => prev.map((l, j) => j === i ? { ...l, url: e.target.value } : l))}
                            className="bg-[#f3f3f5] border-0 text-sm h-9"
                          />
                        </div>
                        {donationLinks.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 mt-1 shrink-0"
                            onClick={() => setDonationLinks(prev => prev.filter((_, j) => j !== i))}
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
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
                  <Label htmlFor="invoice-file">Invoices (Optional - multiple allowed)</Label>
                  <Input
                    id="invoice-file"
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length) setInvoiceFiles(prev => [...prev, ...files]);
                      e.target.value = '';
                    }}
                    className="bg-[#f3f3f5] border-0"
                  />
                  {existingInvoiceUrls.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-[#64748b]">Existing invoices:</p>
                      {existingInvoiceUrls.map((url, i) => (
                        <div key={url} className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg bg-[#f8fafc]">
                          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#155dfc] hover:underline truncate min-w-0">
                            <FileText className="size-4 shrink-0" />
                            {url.split('/').pop() || `Invoice ${i + 1}`}
                          </a>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setExistingInvoiceUrls(prev => prev.filter((_, j) => j !== i))}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {invoiceFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-[#64748b]">New invoices to upload:</p>
                      {invoiceFiles.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg bg-[#eff6ff]">
                          <span className="text-sm text-[#0f172b] truncate min-w-0">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setInvoiceFiles(prev => prev.filter((_, j) => j !== i))}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {isSaving && invoiceFiles.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-[#45556c]">
                      <Loader2 className="size-4 animate-spin text-[#155dfc]" />
                      <span>Uploading {invoiceFiles.length} invoice(s)...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pet Photos & Summary */}
          <div className="space-y-6">
            {/* Pet Photos */}
            <div className="bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden min-w-0">
              <div className="px-4 pt-3 pb-0">
                <h3 className="text-lg font-semibold text-[#0f172b]">Pet Photos</h3>
              </div>
              <div className="px-4 py-2">
                <MultiPhotoUpload
                  photos={photoUrls}
                  onUpload={(files) => {
                    setPhotoFiles(prev => [...prev, ...files]);
                    files.forEach(file => {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (e.target?.result) {
                          setPhotoUrls(prev => [...prev, e.target.result as string]);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }}
                  onRemove={(index) => {
                    const urlToRemove = photoUrls[index];
                    if (urlToRemove.startsWith('data:')) {
                      const newPhotosBeforeThisOne = photoUrls
                        .slice(0, index)
                        .filter(url => url.startsWith('data:')).length;
                      setPhotoFiles(prev => prev.filter((_, i) => i !== newPhotosBeforeThisOne));
                    }
                    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
                  }}
                />
              </div>
            </div>

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
                disabled={isSaving || isDeleting}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-11 gap-2"
                disabled={isSaving || isDeleting}
              >
                <Trash2 className="size-4" />
                {isDeleting ? 'Deleting...' : 'Delete Case'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
