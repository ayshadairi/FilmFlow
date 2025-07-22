export interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  status: 'ready' | 'maintenance' | 'in_use' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  purchaseDate: string;
  warranty: string;
  notes: string;
  image: string;
  specifications: Record<string, string>;
}

export interface Rental {
  id: string;
  equipmentId: string;
  equipmentName: string;
  employeeId: string;
  employeeName: string;
  department: string;
  startDate: string;
  endDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  notes: string;
  quantity: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  equipmentName: string;
  taskType: 'routine' | 'repair' | 'inspection';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  estimatedCost: number;
  actualCost?: number;
  completedDate?: string;
}
