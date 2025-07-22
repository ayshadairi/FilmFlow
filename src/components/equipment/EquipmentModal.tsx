"use client";

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Calendar, Package, Wrench, CreditCard, FileText } from 'lucide-react';
import type { Equipment } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface EquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, onClose }) => {
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] grid-rows-[auto_1fr_auto] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">{equipment.name}</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative aspect-video">
              <Image 
                src={equipment.image} 
                alt={equipment.name}
                fill
                className="rounded-lg object-cover border"
                data-ai-hint="cinema equipment detail"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={getStatusVariant(equipment.status)} className="capitalize text-sm">
                  {equipment.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium ml-1 text-foreground">{equipment.available}/{equipment.quantity}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground mr-2">Condition:</span>
                  <span className={`font-medium capitalize ${getConditionColor(equipment.condition)}`}>
                    {equipment.condition}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{equipment.location}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <span className="font-medium text-muted-foreground">Category:</span>
                <span className="ml-2 text-foreground">{equipment.category}</span>
              </div>
            </div>
          </div>

          <Separator/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Maintenance</h3>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Last:</span>
                <span className="font-medium ml-2 text-foreground">{equipment.lastMaintenance}</span>
              </div>
              <div className="flex items-center text-sm">
                <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Next:</span>
                <span className="font-medium ml-2 text-foreground">{equipment.nextMaintenance}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Purchase Info</h3>
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium ml-2 text-foreground">{equipment.purchaseDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Warranty:</span>
                <span className="font-medium ml-2 text-foreground">{equipment.warranty}</span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(equipment.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium text-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {equipment.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    {equipment.notes}
                  </p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="p-6 pt-0 gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Edit Equipment</Button>
          <Button className="bg-cna-green-600 hover:bg-cna-green-700">Request Rental</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
