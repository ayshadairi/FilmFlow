"use client";

import React, { useState } from 'react';
import { Calendar, User, Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Rental } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RentalsListProps {
  rentals: Rental[];
}

export const RentalsList: React.FC<RentalsListProps> = ({ rentals }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredRentals = rentals.filter(rental => selectedStatus === 'all' || rental.status === selectedStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'returned': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'active': return 'default';
      case 'returned': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Rentals</h2>
          <p className="text-muted-foreground">Track and manage equipment rentals</p>
        </div>
        <Button>New Rental</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Rentals</CardTitle>
            <div className="w-40">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="returned">Returned</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Rented By</TableHead>
                  <TableHead>Rental Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRentals.map((rental) => (
                  <TableRow key={rental.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-muted-foreground mr-2" />
                        {rental.equipmentName} (x{rental.quantity})
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <div>
                            <div>{rental.employeeName}</div>
                            <div className="text-xs text-muted-foreground">{rental.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                        </div>
                        {rental.returnDate && (
                            <div className="text-xs text-green-600 mt-1 ml-6">
                            Returned: {formatDate(rental.returnDate)}
                            </div>
                        )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(rental.status)} className="capitalize">
                        {getStatusIcon(rental.status)}
                        <span className="ml-1.5">{rental.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        {rental.status === 'active' && (
                          <Button variant="outline" size="sm">Return</Button>
                        )}
                        {rental.status === 'overdue' && (
                          <Button variant="destructive" size="sm">Follow Up</Button>
                        )}
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredRentals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No rentals found for this status.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
