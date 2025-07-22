"use client";

import React from 'react';
import type { LucideProps } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<LucideProps>;
  color: 'cna-blue' | 'cna-green' | 'cna-purple' | 'cna-red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    'cna-blue': 'bg-gradient-to-br from-cna-blue-100 to-cna-blue-50 text-cna-blue-600 dark:from-cna-blue-900/30 dark:to-cna-blue-800/30 dark:text-cna-blue-400',
    'cna-green': 'bg-gradient-to-br from-cna-green-100 to-cna-green-50 text-cna-green-600 dark:from-cna-green-900/30 dark:to-cna-green-800/30 dark:text-cna-green-400',
    'cna-purple': 'bg-gradient-to-br from-cna-purple-100 to-cna-purple-50 text-cna-purple-600 dark:from-cna-purple-900/30 dark:to-cna-purple-800/30 dark:text-cna-purple-400',
    'cna-red': 'bg-gradient-to-br from-red-100 to-red-50 text-red-600 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-400'
  };

  return (
    <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mt-1">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${trend.isPositive ? 'text-cna-green-600 dark:text-cna-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-xl shadow-md ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
