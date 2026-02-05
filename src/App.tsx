'use client';

import { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { isAdminLoggedIn } from './lib/auth';

type Page = 'home' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [keySequence, setKeySequence] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if admin is already logged in
  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn());
  }, []);

  // Keyboard shortcut to access admin
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Update key sequence
      setKeySequence((prev) => {
        const newSequence = (prev + e.key).slice(-5); // Keep last 5 characters
        
        // Check if user typed "admin"
        if (newSequence === 'admin') {
          setCurrentPage(isLoggedIn ? 'admin-dashboard' : 'admin-login');
          return '';
        }
        
        return newSequence;
      });
    };

    // Alternative: Ctrl/Cmd + Shift + A shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (currentPage === 'home') {
          setCurrentPage(isLoggedIn ? 'admin-dashboard' : 'admin-login');
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoggedIn, currentPage]);

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'admin-login' && (
        <AdminLogin
          onLogin={handleAdminLogin}
          navigateTo={(page) => setCurrentPage(page)}
        />
      )}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard onBackToPublic={handleAdminLogout} />
      )}
    </div>
  );
}
