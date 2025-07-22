"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Package, Eye, Edit } from 'lucide-react';
import type { Equipment } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface EquipmentCardProps {
  equipment: Equipment;
  onViewDetails: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onViewDetails, onEdit }) => {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'ready': return 'default';
      case 'maintenance': return 'destructive';
      case 'in_use': return 'secondary';
      default: return 'outline';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 dark:text-green-400';
      case 'good': return 'text-blue-600 dark:text-blue-400';
      case 'fair': return 'text-yellow-600 dark:text-yellow-400';
      case 'poor': return 'text-red-600 dark:text-red-400';
      default: return 'text-muted-foreground';
    }
  };
  
  const availabilityPercentage = equipment.quantity > 0 ? (equipment.available / equipment.quantity) * 100 : 0;
  
  const getProgressColor = () => {
    if (availabilityPercentage > 50) return "bg-green-500";
    if (availabilityPercentage > 20) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image src={equipment.image} alt={equipment.name} fill className="object-cover" data-ai-hint="cinema equipment"/>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg truncate mr-2">{equipment.name}</CardTitle>
          <Badge variant={getStatusVariant(equipment.status)} className="capitalize">
            {equipment.status.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{equipment.category}</p>
        
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              <span>{equipment.available}/{equipment.quantity} available</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{equipment.location}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Condition:</span>
              <span className={`font-medium capitalize ${getConditionColor(equipment.condition)}`}>
                {equipment.condition}
              </span>
            </div>
        </div>
        
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Availability</span>
                <span className="text-sm font-medium text-foreground">
                {Math.round(availabilityPercentage)}%
                </span>
            </div>
            <Progress value={availabilityPercentage} indicatorClassName={getProgressColor()} />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2 w-full">
          <Button onClick={() => onViewDetails(equipment)} className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button onClick={() => onEdit(equipment)} variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
