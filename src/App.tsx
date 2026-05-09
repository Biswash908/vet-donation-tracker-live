import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PetDetail from './components/PetDetail';
import AddNewCase from './components/AddNewCase';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import EditCase from './components/EditCase';
import VetManagement from './components/VetManagement';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-add-case" element={<AddNewCase />} />
        <Route path="/admin-edit-case/:id" element={<EditCase />} />
        <Route path="/vet-management" element={<VetManagement />} />
      </Routes>
    </div>
  );
}
