"use client";

import React, { useState } from 'react';
import { Plus, Grid, List, Search } from 'lucide-react';
import type { Equipment } from '@/types';
import { EquipmentCard } from './EquipmentCard';
import { EquipmentModal } from './EquipmentModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EquipmentListProps {
  equipment: Equipment[];
  searchQuery: string;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipment, searchQuery }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(equipment.map(item => item.category)))];
  const statuses = ['all', 'ready', 'maintenance', 'in_use', 'retired'];

  const filteredEquipment = equipment.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleEdit = (equipment: Equipment) => {
    // In a real app, this would open an edit form/modal
    console.log('Edit equipment:', equipment);
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Equipment</h2>
          <p className="text-muted-foreground">Manage your company equipment inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status === 'all' ? 'All Statuses' : status.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredEquipment.length} of {equipment.length} items
      </div>

      {filteredEquipment.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredEquipment.map(item => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
           <Search className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No equipment found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {isModalOpen && selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
