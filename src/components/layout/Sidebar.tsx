"use client";

import React from 'react';
import { LayoutDashboard, Camera, Calendar, Wrench, BarChart3, Users, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'equipment', label: 'Equipment', icon: Camera },
    { id: 'rentals', label: 'Rentals', icon: Calendar },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'employees', label: 'Crew Members', icon: Users },
  ];

  return (
    <div className="w-64 bg-card h-screen border-r hidden lg:flex lg:flex-col transition-colors sticky top-0">
       <div className="p-4 border-b">
         <div className="bg-gradient-to-r from-cna-green-500 to-cna-blue-500 rounded-lg p-3 text-center shadow-md">
           <div className="flex items-center justify-center mb-1">
             <Leaf className="w-4 h-4 text-white mr-1" />
             <span className="text-white text-sm font-semibold">Eco-Certified</span>
           </div>
           <p className="text-white/80 text-xs">Carbon Neutral Operations</p>
         </div>
       </div>

      <nav className="mt-6 flex-grow">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cna-blue-100 to-cna-purple-100 dark:from-cna-blue-900/50 dark:to-cna-purple-900/50 text-cna-blue-900 dark:text-cna-blue-100 shadow-sm scale-105'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-cna-blue-500' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center">
              <Camera className="w-4 h-4 mr-2 text-cna-blue-500" />
              Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-cna-green-500 mr-2" />
                <span>Ready</span>
              </div>
              <span className="font-bold text-foreground">127</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-cna-purple-500 mr-2" />
                <span>Maintenance</span>
              </div>
              <span className="font-bold text-foreground">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 text-cna-blue-500 mr-2" />
                <span>Rented</span>
              </div>
              <span className="font-bold text-foreground">34</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
