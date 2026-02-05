import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function AddNewCase() {
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

  const handlePublish = () => {
    if (!newCase.animal_name || !newCase.medical_condition || !newCase.estimated_cost || !newCase.payment_link) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Publishing case:', newCase);
    alert('Case published successfully!');
    
    // Reset form
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl text-slate-900">VET DONATION TRACKER</h1>
            <p className="text-sm text-slate-600 mt-1">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
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
                <Label htmlFor="pet-type">Pet Type</Label>
                <Input
                  id="pet-type"
                  placeholder="e.g., Dog"
                  value={newCase.animal_type}
                  onChange={(e) => setNewCase({ ...newCase, animal_type: e.target.value })}
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
                <Label htmlFor="invoice-file">Invoice Upload (PDF/Image)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="invoice-file"
                    placeholder="invoice.pdf"
                    value={newCase.invoice_file}
                    onChange={(e) => setNewCase({ ...newCase, invoice_file: e.target.value })}
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="size-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pet-photo">Pet Photo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pet-photo"
                    placeholder="pet.jpg"
                    value={newCase.pet_photo}
                    onChange={(e) => setNewCase({ ...newCase, pet_photo: e.target.value })}
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="size-4" />
                  </Button>
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
                <Label htmlFor="instagram">Social Media Link</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/..."
                  value={newCase.instagram_link}
                  onChange={(e) => setNewCase({ ...newCase, instagram_link: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700">
                  Publish Case
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
