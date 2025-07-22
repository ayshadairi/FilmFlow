import type { Equipment, Rental, Employee, MaintenanceTask } from '@/types';

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'ARRI Alexa Mini LF',
    category: 'Cameras',
    quantity: 8,
    available: 5,
    status: 'ready',
    condition: 'excellent',
    location: 'Camera Department - Bay A',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
    purchaseDate: '2023-08-01',
    warranty: '2026-08-01',
    notes: 'Professional cinema camera with large format sensor',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Sensor': 'Large Format 4.5K', 'Recording': 'ARRIRAW, ProRes', 'Frame Rates': 'Up to 90fps', 'Mount': 'LPL Mount', 'Power': '150' }
  },
  {
    id: '2',
    name: 'Canon CN-E 24-70mm T2.8',
    category: 'Lenses',
    quantity: 12,
    available: 9,
    status: 'ready',
    condition: 'good',
    location: 'Lens Storage - Vault 1',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-08-01',
    purchaseDate: '2023-09-15',
    warranty: '2026-09-15',
    notes: 'Professional cinema zoom lens with constant aperture',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Focal Length': '24-70mm', 'Aperture': 'T2.8 Constant', 'Mount': 'EF Mount', 'Weight': '1.76kg', 'Power': '0' }
  },
  {
    id: '3',
    name: 'DJI Ronin 4D',
    category: 'Stabilizers',
    quantity: 6,
    available: 4,
    status: 'ready',
    condition: 'excellent',
    location: 'Grip Department - Section C',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-07-20',
    purchaseDate: '2023-10-01',
    warranty: '2025-10-01',
    notes: 'Professional cinema camera with integrated gimbal system',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Sensor': 'Full-Frame 6K', 'Stabilization': '4-Axis Gimbal', 'Recording': 'ProRes RAW', 'Battery Life': '2.5 hours', 'Power': '65' }
  },
  {
    id: '4',
    name: 'ARRI SkyPanel S60-C',
    category: 'Lighting',
    quantity: 20,
    available: 15,
    status: 'ready',
    condition: 'excellent',
    location: 'Lighting Department - Grid A',
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-08-10',
    purchaseDate: '2023-07-15',
    warranty: '2026-07-15',
    notes: 'Professional LED panel with full color spectrum',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Power': '400', 'Color Temperature': '2800K-10000K', 'CRI': '>95', 'Control': 'DMX, Wireless' }
  },
  {
    id: '5',
    name: 'Sound Devices 833',
    category: 'Audio',
    quantity: 8,
    available: 6,
    status: 'maintenance',
    condition: 'good',
    location: 'Sound Department - Rack 2',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-09-01',
    purchaseDate: '2023-05-01',
    warranty: '2026-05-01',
    notes: 'Professional field mixer and recorder',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Channels': '8 Input / 12 Track', 'Recording': '32-bit float', 'Connectivity': 'Dante, AES', 'Power': '18' }
  },
  {
    id: '6',
    name: 'Teradek Bolt 4K LT 750',
    category: 'Wireless Video',
    quantity: 10,
    available: 7,
    status: 'ready',
    condition: 'excellent',
    location: 'Video Village - Rack A',
    lastMaintenance: '2024-01-30',
    nextMaintenance: '2024-07-30',
    purchaseDate: '2023-11-15',
    warranty: '2026-11-15',
    notes: 'Zero-delay wireless video transmission system',
    image: 'https://placehold.co/600x400.png',
    specifications: { 'Resolution': '4K60p, 1080p120', 'Range': '750ft / 230m', 'Latency': '<1ms', 'Power': '20' }
  }
];

export const mockRentals: Rental[] = [
  { id: '1', equipmentId: '1', equipmentName: 'ARRI Alexa Mini LF', employeeId: 'emp1', employeeName: 'Marcus Chen', department: 'Camera Department', startDate: '2024-03-15', endDate: '2024-03-25', status: 'active', notes: 'Principal photography - Feature film "Green Horizon"', quantity: 1 },
  { id: '2', equipmentId: '3', equipmentName: 'DJI Ronin 4D', employeeId: 'emp2', employeeName: 'Elena Rodriguez', department: 'Camera Department', startDate: '2024-03-18', endDate: '2024-03-22', status: 'active', notes: 'Handheld sequences for documentary project', quantity: 1 },
  { id: '3', equipmentId: '4', equipmentName: 'ARRI SkyPanel S60-C', employeeId: 'emp3', employeeName: 'David Kim', department: 'Lighting Department', startDate: '2024-03-10', endDate: '2024-03-17', returnDate: '2024-03-17', status: 'returned', notes: 'Interior lighting setup for commercial shoot', quantity: 4 },
  { id: '4', equipmentId: '5', equipmentName: 'Sound Devices 833', employeeId: 'emp4', employeeName: 'Sophie Williams', department: 'Sound Department', startDate: '2024-03-12', endDate: '2024-03-19', status: 'overdue', notes: 'Location sound recording for indie film', quantity: 1 }
];

export const mockEmployees: Employee[] = [
  { id: 'emp1', name: 'Marcus Chen', email: 'marcus.chen@cnafilm.com', department: 'Camera Department', role: 'Director of Photography' },
  { id: 'emp2', name: 'Elena Rodriguez', email: 'elena.rodriguez@cnafilm.com', department: 'Camera Department', role: 'Camera Operator' },
  { id: 'emp3', name: 'David Kim', email: 'david.kim@cnafilm.com', department: 'Lighting Department', role: 'Gaffer' },
  { id: 'emp4', name: 'Sophie Williams', email: 'sophie.williams@cnafilm.com', department: 'Sound Department', role: 'Sound Mixer' }
];

export const mockMaintenanceTasks: MaintenanceTask[] = [
  { id: '1', equipmentId: '5', equipmentName: 'Sound Devices 833', taskType: 'repair', description: 'Input channel calibration and firmware update', priority: 'high', assignedTo: 'Audio Tech Team', dueDate: '2024-03-25', status: 'in_progress', estimatedCost: 250 },
  { id: '2', equipmentId: '2', equipmentName: 'Canon CN-E 24-70mm T2.8', taskType: 'routine', description: 'Lens cleaning and focus calibration', priority: 'medium', assignedTo: 'Lens Technician', dueDate: '2024-04-01', status: 'pending', estimatedCost: 180 }
];
