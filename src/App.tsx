import { useState, useEffect } from 'react';
import Home from './components/Home';
import PetDetail from './components/PetDetail';
import AddNewCase from './components/AddNewCase';
import AdminDashboard from './components/AdminDashboard';
import EditCase from './components/EditCase';
import { fetchInvoices, Invoice } from './lib/supabase';

export default function App() {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'admin-dashboard' | 'admin-add-case' | 'admin-edit-case'>('home');
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Failed to load invoices:', error);
      }
    };

    loadInvoices();
  }, [refreshKey]);

  const selectedPet = selectedPetId 
    ? invoices.find(pet => pet.id === selectedPetId) 
    : null;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (currentView === 'admin-dashboard') {
    return (
      <AdminDashboard 
        onBack={() => setCurrentView('home')} 
        onAddNewCase={() => setCurrentView('admin-add-case')}
        onEditCase={(petId) => {
          setEditingPetId(petId);
          setCurrentView('admin-edit-case');
        }}
      />
    );
  }

  if (currentView === 'admin-add-case') {
    return <AddNewCase onBack={() => {
      setCurrentView('admin-dashboard');
      handleRefresh();
    }} />;
  }

  if (currentView === 'admin-edit-case' && editingPetId) {
    return (
      <EditCase 
        petId={editingPetId} 
        onBack={() => {
          setEditingPetId(null);
          setCurrentView('admin-dashboard');
          handleRefresh();
        }}
      />
    );
  }

  if (selectedPet) {
    return (
      <PetDetail 
        pet={selectedPet} 
        onBack={() => setSelectedPetId(null)} 
      />
    );
  }

  return <Home onSelectPet={(id) => setSelectedPetId(id)} onAdminClick={() => setCurrentView('admin-dashboard')} />;
}
