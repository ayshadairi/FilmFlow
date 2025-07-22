"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StartPage } from '@/components/start-page/StartPage';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { EquipmentList } from '@/components/equipment/EquipmentList';
import { RentalsList } from '@/components/rentals/RentalsList';
import { SustainabilityPlanner } from '@/components/sustainability/SustainabilityPlanner';
import { mockEquipment, mockRentals } from '@/data/mockData';
import { Login } from '@/components/auth/Login';

export default function Home() {
  const { user } = useAuth();
  const [showStartPage, setShowStartPage] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    if (showStartPage) {
      return <StartPage onEnter={() => setShowStartPage(false)} />;
    }
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'equipment':
        return <EquipmentList equipment={mockEquipment} searchQuery={searchQuery} />;
      case 'rentals':
        return <RentalsList rentals={mockRentals} />;
      case 'sustainability':
        return <SustainabilityPlanner />;
      case 'maintenance':
        return <div className="text-center py-12 text-muted-foreground">Maintenance module coming soon...</div>;
      case 'analytics':
        return <div className="text-center py-12 text-muted-foreground">Analytics module coming soon...</div>;
      case 'employees':
        return <div className="text-center py-12 text-muted-foreground">Crew Members module coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
