import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { createInvoice, uploadFileToStorage } from '../lib/supabase';

interface AddNewCaseProps {
  onBack: () => void;
}

export default function AddNewCase({ onBack }: AddNewCaseProps) {
  const [newCase, setNewCase] = useState({
    animal_name: '',
    medical_condition: '',
    estimated_cost: '',
    payment_link: '',
    pet_photo: '',
    pet_story: '',
    instagram_link: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      console.log('[v0] Photo selected:', file.name);
    }
  };

  const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceFile(file);
      console.log('[v0] Invoice selected:', file.name);
    }
  };

  const handlePublish = async () => {
    if (!newCase.animal_name || !newCase.medical_condition || !newCase.estimated_cost || !newCase.payment_link) {
      alert('Please fill in all required fields');
      return;
    }

    if (!photoFile) {
      alert('Please upload a photo of the pet');
      return;
    }

    setIsLoading(true);
    try {
      let photoUrl: string | null = null;
      let invoiceUrl: string | null = null;

      // Upload photo to Supabase Storage
      if (photoFile) {
        const timestamp = Date.now();
        const photoPath = `pet-photos/${timestamp}-${photoFile.name}`;
        photoUrl = await uploadFileToStorage(photoFile, 'pet-images', photoPath);
        
        if (!photoUrl) {
          alert('Failed to upload photo. Please try again.');
          setIsLoading(false);
          return;
        }
      }

      // Upload invoice file to Supabase Storage if provided
      if (invoiceFile) {
        const timestamp = Date.now();
        const invoicePath = `invoices/${timestamp}-${invoiceFile.name}`;
        invoiceUrl = await uploadFileToStorage(invoiceFile, 'pet-invoices', invoicePath);
      }

      const invoiceData = {
        animal_name: newCase.animal_name,
        animal_type: 'Unknown',
        medical_condition: newCase.medical_condition,
        estimated_cost: parseFloat(newCase.estimated_cost),
        payment_link: newCase.payment_link,
        pet_photo: photoUrl,
        pet_story: newCase.pet_story || null,
        instagram_link: newCase.instagram_link || null,
        invoice_file: invoiceUrl || null,
        status: 'pending' as const
      };

      await createInvoice(invoiceData);
      alert('Case published successfully!');
      
      // Reset form
      setNewCase({
        animal_name: '',
        medical_condition: '',
        estimated_cost: '',
        payment_link: '',
        pet_photo: '',
        pet_story: '',
        instagram_link: ''
      });
      setPhotoFile(null);
      setInvoiceFile(null);
      
      onBack();
    } catch (error) {
      console.error('Error publishing case:', error);
      alert('Failed to publish case. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start h-16 sm:h-20 gap-4">
            <Button 
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="gap-2 text-[#0a0a0a] hover:bg-slate-100"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div className="border-l border-[#e2e8f0] h-8 hidden sm:block" />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl text-[#0a0a0a] font-normal">
                JLT Cat Lovers' Group
              </h1>
              <p className="text-sm text-[#717182]">Add New Case</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Case</CardTitle>
            <CardDescription>Enter the details for the new case</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                  rows={4}
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
                <Label htmlFor="photo-upload">Pet Photo *</Label>
                <div className="relative">
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="photo-upload"
                    className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="size-5 text-blue-600" />
                    <span className="text-blue-600">
                      {photoFile ? photoFile.name : 'Click to upload pet photo'}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pet-story">Pet Story/Background</Label>
                <Textarea
                  id="pet-story"
                  placeholder="Share the pet's story..."
                  value={newCase.pet_story}
                  onChange={(e) => setNewCase({ ...newCase, pet_story: e.target.value })}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoice-upload">Invoice/Receipt (Optional)</Label>
                <div className="relative">
                  <input
                    id="invoice-upload"
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={handleInvoiceUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="invoice-upload"
                    className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="size-5 text-gray-600" />
                    <span className="text-gray-600">
                      {invoiceFile ? invoiceFile.name : 'Click to upload invoice (PDF/Image)'}
                    </span>
                  </label>
                </div>
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

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onBack} disabled={isLoading}>
                  <ArrowLeft className="size-4" />
                  Cancel
                </Button>
                <Button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish Case'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
