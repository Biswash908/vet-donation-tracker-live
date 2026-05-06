import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { fetchVets, addVet, deleteVet, type Vet } from '../lib/supabase';

interface VetManagementProps {
  onBack: () => void;
}

export default function VetManagement({ onBack }: VetManagementProps) {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [newVetName, setNewVetName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadVets();
  }, []);

  const loadVets = async () => {
    setLoading(true);
    try {
      const data = await fetchVets();
      setVets(data);
    } catch (error) {
      console.error('Failed to load vets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVet = async () => {
    if (!newVetName.trim()) {
      alert('Please enter a vet name');
      return;
    }

    setIsAdding(true);
    try {
      const newVet = await addVet(newVetName.trim());
      if (newVet) {
        setVets([...vets, newVet]);
        setNewVetName('');
      }
    } catch (error) {
      console.error('Failed to add vet:', error);
      alert('Failed to add vet. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteVet = async (vetId: string) => {
    if (!window.confirm('Are you sure you want to delete this vet?')) {
      return;
    }

    setIsDeleting(vetId);
    try {
      await deleteVet(vetId);
      setVets(vets.filter(v => v.id !== vetId));
    } catch (error) {
      console.error('Failed to delete vet:', error);
      alert('Failed to delete vet. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3 h-auto min-h-16 sm:min-h-20 py-3 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button 
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 text-[#0a0a0a] hover:bg-slate-100 flex-shrink-0"
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="border-l border-[#e2e8f0] h-8 hidden sm:block" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl text-[#0a0a0a] font-normal">
                  Manage Veterinarians
                </h1>
                <p className="text-xs sm:text-sm text-[#717182]">Add or remove vets/clinics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Add New Vet Form */}
        <Card className="mb-8 border-[#e2e8f0]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0a0a0a]">Add New Veterinarian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-col sm:flex-row">
              <Input
                placeholder="e.g., Dr. Smith's Clinic or Animal Hospital Dubai"
                value={newVetName}
                onChange={(e) => setNewVetName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddVet()}
                className="flex-1 h-10"
              />
              <Button
                onClick={handleAddVet}
                disabled={isAdding || !newVetName.trim()}
                className="bg-[#155dfc] hover:bg-[#1447e6] gap-2 h-10 px-4 whitespace-nowrap"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">Add Vet</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vets List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Loading vets...</p>
          </div>
        ) : vets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No veterinarians added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vets.map((vet) => (
              <div
                key={vet.id}
                className="bg-white border border-[#e2e8f0] rounded-[10px] p-4 flex items-center justify-between hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-base font-medium text-[#0a0a0a]">{vet.name}</h3>
                  <p className="text-xs text-[#717182] mt-1">
                    Added {new Date(vet.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteVet(vet.id)}
                  disabled={isDeleting === vet.id}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
