"use client";

import React from 'react';
import { Camera, Calendar, Wrench, TrendingUp, Leaf, Award, AlertTriangle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { mockEquipment, mockRentals, mockMaintenanceTasks } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Dashboard: React.FC = () => {
  const totalEquipment = mockEquipment.reduce((sum, item) => sum + item.quantity, 0);
  const availableEquipment = mockEquipment.reduce((sum, item) => sum + item.available, 0);
  const activeRentals = mockRentals.filter(rental => rental.status === 'active').length;
  const overdueRentals = mockRentals.filter(rental => rental.status === 'overdue').length;
  const maintenanceTasks = mockMaintenanceTasks.filter(task => task.status !== 'completed').length;

  const recentActivity = [
    { type: 'rental', message: 'ARRI Alexa Mini LF checked out by Marcus Chen', time: '2 hours ago' },
    { type: 'return', message: 'SkyPanel S60-C returned by David Kim', time: '4 hours ago' },
    { type: 'maintenance', message: 'Sound Devices 833 sent for calibration', time: '1 day ago' },
    { type: 'rental', message: 'DJI Ronin 4D checked out by Elena Rodriguez', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">EcoLens Dashboard</h2>
            <p className="text-muted-foreground">Sustainable film production equipment management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-cna-green-500 to-cna-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-semibold">Carbon Neutral</span>
            </div>
            <div className="bg-gradient-to-r from-cna-purple-500 to-cna-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">Eco-Certified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Equipment"
          value={totalEquipment}
          icon={Camera}
          color="cna-blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Available"
          value={availableEquipment}
          icon={TrendingUp}
          color="cna-green"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Active Rentals"
          value={activeRentals}
          icon={Calendar}
          color="cna-purple"
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Needs Maintenance"
          value={maintenanceTasks}
          icon={Wrench}
          color="cna-red"
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Camera className="w-5 h-5 mr-2 text-cna-blue-500" />
              Equipment by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from(new Set(mockEquipment.map(item => item.category))).map(category => {
              const categoryItems = mockEquipment.filter(item => item.category === category);
              const totalInCategory = categoryItems.reduce((sum, item) => sum + item.quantity, 0);
              const availableInCategory = categoryItems.reduce((sum, item) => sum + item.available, 0);
              const percentage = totalInCategory > 0 ? (availableInCategory / totalInCategory) * 100 : 0;

              return (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{category}</span>
                    <span className="text-sm text-muted-foreground">{availableInCategory}/{totalInCategory}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-cna-green-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${
                    activity.type === 'rental' ? 'bg-cna-blue-500' :
                    activity.type === 'return' ? 'bg-cna-green-500' :
                    'bg-cna-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {overdueRentals > 0 && (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Overdue Items</AlertTitle>
            <AlertDescription>
            {overdueRentals} overdue equipment checkout{overdueRentals > 1 ? 's' : ''} require attention.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
