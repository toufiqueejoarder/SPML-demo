// Mock data for SPML Demo - Secure Property Management Limited

export interface Project {
  id: string;
  name: string;
  nameBn: string;
  location: string;
  coordinates: [number, number];
  totalUnits: number;
  soldUnits: number;
  bookedUnits: number;
  availableUnits: number;
  pricePerKatha: number;
  projectedPrice2028: number;
  projectedPrice2030: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  milestones: Milestone[];
  brochureUrl: string;
  surveillanceImage: string;
  droneImages: string[];
}

export interface NearbyPlace {
  name: string;
  type: 'education' | 'health' | 'transport' | 'shopping' | 'leisure';
  distance: string;
}

export interface Milestone {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'planned';
  completedDate?: string;
  targetDate: string;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'NRB' | 'Local';
  kycStatus: 'verified' | 'pending' | 'rejected';
  profileImage: string;
  properties: InvestorProperty[];
  totalInvestment: number;
  totalAppreciation: number;
}

export interface InvestorProperty {
  projectId: string;
  unitNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  installments: Installment[];
  documents: Document[];
}

export interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'upcoming' | 'overdue';
  receiptUrl?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'allotment' | 'deed' | 'receipt' | 'mutation';
  url: string;
  uploadedDate: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: 'hot' | 'warm' | 'cold';
  interestedProject: string;
  budget: string;
  source: string;
  assignedTo: string;
  createdAt: string;
  lastContact?: string;
  followUpDate?: string;
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'closed' | 'lost';
  dripStage: number;
}

export interface ResaleListing {
  id: string;
  projectId: string;
  unitNumber: string;
  ownerId: string;
  askingPrice: number;
  originalPrice: number;
  status: 'available' | 'negotiation' | 'sold';
  listedDate: string;
  commission: number;
}

export interface RentalUnit {
  id: string;
  projectId: string;
  unitNumber: string;
  ownerId: string;
  status: 'occupied' | 'vacant' | 'listed';
  monthlyRent: number;
  tenant?: Tenant;
  maintenanceTickets: MaintenanceTicket[];
  rentHistory: RentPayment[];
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  leaseStart: string;
  leaseEnd: string;
}

export interface MaintenanceTicket {
  id: string;
  issue: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface RentPayment {
  month: string;
  amount: number;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  userId: string;
}

// Initial Mock Data
export const initialProjects: Project[] = [
  {
    id: 'bashundhara',
    name: 'Bashundhara Residences',
    nameBn: 'বসুন্ধরা রেসিডেন্স',
    location: 'Bashundhara R/A, Dhaka',
    coordinates: [23.8195, 90.4303],
    totalUnits: 50,
    soldUnits: 35,
    bookedUnits: 5,
    availableUnits: 10,
    pricePerKatha: 35000,
    projectedPrice2028: 75000,
    projectedPrice2030: 115000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    description: 'Premium residential plots in the heart of Bashundhara, offering excellent connectivity and modern amenities.',
    amenities: ['24/7 Security', 'Gated Community', 'Parks & Gardens', 'Wide Roads', 'Underground Utilities'],
    nearbyPlaces: [
      { name: 'Bashundhara City', type: 'shopping', distance: '2.5 km' },
      { name: 'AIUB', type: 'education', distance: '1.2 km' },
      { name: 'United Hospital', type: 'health', distance: '3 km' },
      { name: 'Airport', type: 'transport', distance: '8 km' },
    ],
    milestones: [
      { id: 'm1', name: 'Land Acquisition', status: 'completed', completedDate: '2024-06-15', targetDate: '2024-06-30' },
      { id: 'm2', name: 'Piling Complete', status: 'completed', completedDate: '2025-01-20', targetDate: '2025-01-31' },
      { id: 'm3', name: 'Foundation', status: 'in_progress', targetDate: '2026-06-30' },
      { id: 'm4', name: 'Structure', status: 'planned', targetDate: '2026-12-31' },
      { id: 'm5', name: 'Interior & Handover', status: 'planned', targetDate: '2027-06-30' },
    ],
    brochureUrl: '/brochures/bashundhara.pdf',
    surveillanceImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    droneImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
  },
  {
    id: 'purbachal',
    name: 'Purbachal Model Town',
    nameBn: 'পূর্বাচল মডেল টাউন',
    location: 'Purbachal, Dhaka',
    coordinates: [23.8365, 90.5176],
    totalUnits: 120,
    soldUnits: 80,
    bookedUnits: 15,
    availableUnits: 25,
    pricePerKatha: 28000,
    projectedPrice2028: 65000,
    projectedPrice2030: 100000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ],
    description: 'Strategically located plots in Purbachal New Town with excellent future growth potential.',
    amenities: ['Metro Rail Access', '300ft Road', 'Commercial Zone', 'Educational Hub', 'Healthcare Facilities'],
    nearbyPlaces: [
      { name: 'Purbachal Metro Station', type: 'transport', distance: '500m' },
      { name: 'Purbachal 300ft Road', type: 'transport', distance: '200m' },
      { name: 'Proposed University', type: 'education', distance: '1.5 km' },
      { name: 'Planned Hospital', type: 'health', distance: '2 km' },
    ],
    milestones: [
      { id: 'm1', name: 'Land Acquisition', status: 'completed', completedDate: '2024-03-15', targetDate: '2024-03-31' },
      { id: 'm2', name: 'Development Plan', status: 'completed', completedDate: '2024-09-20', targetDate: '2024-09-30' },
      { id: 'm3', name: 'Infrastructure', status: 'in_progress', targetDate: '2026-03-31' },
      { id: 'm4', name: 'Utility Setup', status: 'planned', targetDate: '2026-09-30' },
      { id: 'm5', name: 'Handover', status: 'planned', targetDate: '2027-03-31' },
    ],
    brochureUrl: '/brochures/purbachal.pdf',
    surveillanceImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    droneImages: [
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800',
    ],
  },
  {
    id: 'secure-green',
    name: 'Secure Green City',
    nameBn: 'সিকিউর গ্রিন সিটি',
    location: 'Keraniganj, Dhaka',
    coordinates: [23.7104, 90.3456],
    totalUnits: 40,
    soldUnits: 38,
    bookedUnits: 2,
    availableUnits: 0,
    pricePerKatha: 22000,
    projectedPrice2028: 50000,
    projectedPrice2030: 80000,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    ],
    description: 'Eco-friendly residential community with sustainable living features. Almost sold out!',
    amenities: ['Solar Power', 'Rainwater Harvesting', 'Organic Gardens', 'Community Center', 'Playground'],
    nearbyPlaces: [
      { name: 'Buriganga River', type: 'leisure', distance: '1 km' },
      { name: 'Local Market', type: 'shopping', distance: '500m' },
      { name: 'Primary School', type: 'education', distance: '800m' },
      { name: 'Health Center', type: 'health', distance: '1.2 km' },
    ],
    milestones: [
      { id: 'm1', name: 'Land Acquisition', status: 'completed', completedDate: '2023-06-15', targetDate: '2023-06-30' },
      { id: 'm2', name: 'Development', status: 'completed', completedDate: '2024-06-20', targetDate: '2024-06-30' },
      { id: 'm3', name: 'Infrastructure', status: 'completed', completedDate: '2025-01-15', targetDate: '2025-01-31' },
      { id: 'm4', name: 'Utility Setup', status: 'completed', completedDate: '2025-06-20', targetDate: '2025-06-30' },
      { id: 'm5', name: 'Handover', status: 'in_progress', targetDate: '2026-06-30' },
    ],
    brochureUrl: '/brochures/secure-green.pdf',
    surveillanceImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    droneImages: [
      'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800',
    ],
  },
];

export const initialInvestors: Investor[] = [
  {
    id: 'inv-001',
    name: 'Mr. Karim Rahman',
    email: 'karim.rahman@email.com',
    phone: '+1 (555) 123-4567',
    type: 'NRB',
    kycStatus: 'verified',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    totalInvestment: 8500000,
    totalAppreciation: 2125000,
    properties: [
      {
        projectId: 'bashundhara',
        unitNumber: 'B-12',
        purchaseDate: '2024-03-15',
        purchasePrice: 3500000,
        currentValue: 4375000,
        installments: [
          { id: 'inst-1', amount: 500000, dueDate: '2024-03-15', paidDate: '2024-03-15', status: 'paid' },
          { id: 'inst-2', amount: 500000, dueDate: '2024-06-15', paidDate: '2024-06-14', status: 'paid' },
          { id: 'inst-3', amount: 500000, dueDate: '2024-09-15', paidDate: '2024-09-15', status: 'paid' },
          { id: 'inst-4', amount: 500000, dueDate: '2024-12-15', paidDate: '2024-12-10', status: 'paid' },
          { id: 'inst-5', amount: 500000, dueDate: '2025-03-15', paidDate: '2025-03-14', status: 'paid' },
          { id: 'inst-6', amount: 500000, dueDate: '2025-06-15', paidDate: '2025-06-15', status: 'paid' },
          { id: 'inst-7', amount: 500000, dueDate: '2026-03-15', status: 'upcoming' },
        ],
        documents: [
          { id: 'doc-1', name: 'Allotment Letter', type: 'allotment', url: '/docs/allotment.pdf', uploadedDate: '2024-03-20' },
          { id: 'doc-2', name: 'Sale Deed', type: 'deed', url: '/docs/deed.pdf', uploadedDate: '2024-04-15' },
        ],
      },
      {
        projectId: 'purbachal',
        unitNumber: 'P-45',
        purchaseDate: '2024-06-20',
        purchasePrice: 5000000,
        currentValue: 6250000,
        installments: [
          { id: 'inst-8', amount: 1000000, dueDate: '2024-06-20', paidDate: '2024-06-20', status: 'paid' },
          { id: 'inst-9', amount: 800000, dueDate: '2024-09-20', paidDate: '2024-09-18', status: 'paid' },
          { id: 'inst-10', amount: 800000, dueDate: '2024-12-20', paidDate: '2024-12-20', status: 'paid' },
          { id: 'inst-11', amount: 800000, dueDate: '2025-03-20', paidDate: '2025-03-19', status: 'paid' },
          { id: 'inst-12', amount: 800000, dueDate: '2025-06-20', paidDate: '2025-06-20', status: 'paid' },
          { id: 'inst-13', amount: 800000, dueDate: '2026-03-20', status: 'upcoming' },
        ],
        documents: [
          { id: 'doc-3', name: 'Allotment Letter', type: 'allotment', url: '/docs/allotment-p45.pdf', uploadedDate: '2024-06-25' },
        ],
      },
    ],
  },
  {
    id: 'inv-002',
    name: 'Ms. Fatima Akter',
    email: 'fatima.akter@email.com',
    phone: '+880 1712 345678',
    type: 'Local',
    kycStatus: 'verified',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    totalInvestment: 3500000,
    totalAppreciation: 700000,
    properties: [
      {
        projectId: 'bashundhara',
        unitNumber: 'B-28',
        purchaseDate: '2024-09-10',
        purchasePrice: 3500000,
        currentValue: 4200000,
        installments: [
          { id: 'inst-14', amount: 700000, dueDate: '2024-09-10', paidDate: '2024-09-10', status: 'paid' },
          { id: 'inst-15', amount: 700000, dueDate: '2024-12-10', paidDate: '2024-12-08', status: 'paid' },
          { id: 'inst-16', amount: 700000, dueDate: '2025-03-10', paidDate: '2025-03-10', status: 'paid' },
          { id: 'inst-17', amount: 700000, dueDate: '2025-06-10', status: 'overdue' },
          { id: 'inst-18', amount: 700000, dueDate: '2025-09-10', status: 'upcoming' },
        ],
        documents: [
          { id: 'doc-4', name: 'Allotment Letter', type: 'allotment', url: '/docs/allotment-b28.pdf', uploadedDate: '2024-09-15' },
        ],
      },
    ],
  },
  {
    id: 'inv-003',
    name: 'Mr. Arif Khan',
    email: 'arif.khan@email.com',
    phone: '+880 1898 765432',
    type: 'Local',
    kycStatus: 'pending',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    totalInvestment: 2800000,
    totalAppreciation: 0,
    properties: [
      {
        projectId: 'purbachal',
        unitNumber: 'P-112',
        purchaseDate: '2026-02-01',
        purchasePrice: 2800000,
        currentValue: 2800000,
        installments: [
          { id: 'inst-19', amount: 560000, dueDate: '2026-02-01', paidDate: '2026-02-01', status: 'paid' },
          { id: 'inst-20', amount: 560000, dueDate: '2026-05-01', status: 'upcoming' },
          { id: 'inst-21', amount: 560000, dueDate: '2026-08-01', status: 'upcoming' },
          { id: 'inst-22', amount: 560000, dueDate: '2026-11-01', status: 'upcoming' },
          { id: 'inst-23', amount: 560000, dueDate: '2027-02-01', status: 'upcoming' },
        ],
        documents: [],
      },
    ],
  },
];

export const initialLeads: Lead[] = [
  // HOT Leads (5)
  { id: 'lead-001', name: 'Ahmed Hassan', email: 'ahmed.h@email.com', phone: '+880 1911 111111', score: 'hot', interestedProject: 'bashundhara', budget: '৳40-50 Lakh', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2026-02-20', lastContact: '2026-02-24', status: 'negotiation', dripStage: 4 },
  { id: 'lead-002', name: 'Sarah Miller', email: 'sarah.m@email.com', phone: '+1 555 222 3333', score: 'hot', interestedProject: 'purbachal', budget: '৳30-40 Lakh', source: 'Referral', assignedTo: 'Sales Team B', createdAt: '2026-02-18', lastContact: '2026-02-23', status: 'qualified', dripStage: 3 },
  { id: 'lead-003', name: 'Mohammad Ali', email: 'moh.ali@email.com', phone: '+880 1722 333444', score: 'hot', interestedProject: 'bashundhara', budget: '৳50+ Lakh', source: 'Facebook Ad', assignedTo: 'Sales Team A', createdAt: '2026-02-22', lastContact: '2026-02-25', status: 'negotiation', dripStage: 4 },
  { id: 'lead-004', name: 'Nusrat Jahan', email: 'nusrat.j@email.com', phone: '+880 1833 444555', score: 'hot', interestedProject: 'purbachal', budget: '৳25-35 Lakh', source: 'Google Ad', assignedTo: 'Sales Team C', createdAt: '2026-02-21', lastContact: '2026-02-24', status: 'qualified', dripStage: 3 },
  { id: 'lead-005', name: 'David Chen', email: 'david.c@email.com', phone: '+1 555 444 5555', score: 'hot', interestedProject: 'bashundhara', budget: '৳60+ Lakh', source: 'NRB Event', assignedTo: 'Sales Team B', createdAt: '2026-02-19', lastContact: '2026-02-25', status: 'negotiation', dripStage: 5 },
  
  // WARM Leads (10)
  { id: 'lead-006', name: 'Rahim Uddin', email: 'rahim.u@email.com', phone: '+880 1944 555666', score: 'warm', interestedProject: 'purbachal', budget: '৳20-30 Lakh', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2026-02-15', lastContact: '2026-02-20', status: 'contacted', dripStage: 2 },
  { id: 'lead-007', name: 'Tasnim Rahman', email: 'tasnim.r@email.com', phone: '+880 1855 666777', score: 'warm', interestedProject: 'secure-green', budget: '৳15-25 Lakh', source: 'Referral', assignedTo: 'Sales Team C', createdAt: '2026-02-14', lastContact: '2026-02-19', status: 'contacted', dripStage: 2 },
  { id: 'lead-008', name: 'James Wilson', email: 'james.w@email.com', phone: '+44 20 7946 0958', score: 'warm', interestedProject: 'bashundhara', budget: '৳45-55 Lakh', source: 'UK Event', assignedTo: 'Sales Team B', createdAt: '2026-02-12', lastContact: '2026-02-18', status: 'qualified', dripStage: 3 },
  { id: 'lead-009', name: 'Salma Begum', email: 'salma.b@email.com', phone: '+880 1766 777888', score: 'warm', interestedProject: 'purbachal', budget: '৳30-40 Lakh', source: 'Facebook Ad', assignedTo: 'Sales Team A', createdAt: '2026-02-10', status: 'new', dripStage: 1 },
  { id: 'lead-010', name: 'Imran Hossain', email: 'imran.h@email.com', phone: '+880 1677 888999', score: 'warm', interestedProject: 'bashundhara', budget: '৳35-45 Lakh', source: 'Google Ad', assignedTo: 'Sales Team C', createdAt: '2026-02-08', lastContact: '2026-02-15', status: 'contacted', dripStage: 2 },
  { id: 'lead-011', name: 'Priya Das', email: 'priya.d@email.com', phone: '+880 1588 999000', score: 'warm', interestedProject: 'secure-green', budget: '৳20-30 Lakh', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2026-02-06', status: 'new', dripStage: 1 },
  { id: 'lead-012', name: 'Kabir Ahmed', email: 'kabir.a@email.com', phone: '+880 1499 000111', score: 'warm', interestedProject: 'purbachal', budget: '৳25-35 Lakh', source: 'Referral', assignedTo: 'Sales Team B', createdAt: '2026-02-04', lastContact: '2026-02-12', status: 'contacted', dripStage: 2 },
  { id: 'lead-013', name: 'Lisa Brown', email: 'lisa.b@email.com', phone: '+1 555 666 7777', score: 'warm', interestedProject: 'bashundhara', budget: '৳50-60 Lakh', source: 'NRB Event', assignedTo: 'Sales Team B', createdAt: '2026-02-02', lastContact: '2026-02-10', status: 'qualified', dripStage: 3 },
  { id: 'lead-014', name: 'Nasir Mahmud', email: 'nasir.m@email.com', phone: '+880 1300 111222', score: 'warm', interestedProject: 'purbachal', budget: '৳28-38 Lakh', source: 'Google Ad', assignedTo: 'Sales Team C', createdAt: '2026-01-28', lastContact: '2026-02-08', status: 'contacted', dripStage: 2 },
  { id: 'lead-015', name: 'Ruma Akter', email: 'ruma.a@email.com', phone: '+880 1211 222333', score: 'warm', interestedProject: 'bashundhara', budget: '৳40-50 Lakh', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2026-01-25', status: 'new', dripStage: 1 },
  
  // COLD Leads (15)
  { id: 'lead-016', name: 'Sharif Islam', email: 'sharif.i@email.com', phone: '+880 1122 333444', score: 'cold', interestedProject: 'purbachal', budget: 'Not specified', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2026-01-20', status: 'new', dripStage: 0 },
  { id: 'lead-017', name: 'Maria Garcia', email: 'maria.g@email.com', phone: '+34 91 123 4567', score: 'cold', interestedProject: 'bashundhara', budget: 'Not specified', source: 'Website', assignedTo: 'Sales Team B', createdAt: '2026-01-18', status: 'new', dripStage: 0 },
  { id: 'lead-018', name: 'Kamal Hasan', email: 'kamal.h@email.com', phone: '+880 1033 444555', score: 'cold', interestedProject: 'secure-green', budget: '৳15-20 Lakh', source: 'Facebook Ad', assignedTo: 'Sales Team C', createdAt: '2026-01-15', status: 'new', dripStage: 0 },
  { id: 'lead-019', name: 'Jennifer Lee', email: 'jennifer.l@email.com', phone: '+1 555 888 9999', score: 'cold', interestedProject: 'purbachal', budget: 'Not specified', source: 'Google Ad', assignedTo: 'Sales Team A', createdAt: '2026-01-12', status: 'new', dripStage: 0 },
  { id: 'lead-020', name: 'Rafiq Chowdhury', email: 'rafiq.c@email.com', phone: '+880 1944 555666', score: 'cold', interestedProject: 'bashundhara', budget: '৳30-40 Lakh', source: 'Referral', assignedTo: 'Sales Team B', createdAt: '2026-01-10', status: 'new', dripStage: 0 },
  { id: 'lead-021', name: 'Anna Smith', email: 'anna.s@email.com', phone: '+44 20 7946 1234', score: 'cold', interestedProject: 'purbachal', budget: 'Not specified', source: 'UK Event', assignedTo: 'Sales Team B', createdAt: '2026-01-08', status: 'new', dripStage: 0 },
  { id: 'lead-022', name: 'Habib Rahman', email: 'habib.r@email.com', phone: '+880 1855 666777', score: 'cold', interestedProject: 'secure-green', budget: '৳18-25 Lakh', source: 'Website', assignedTo: 'Sales Team C', createdAt: '2026-01-05', status: 'new', dripStage: 0 },
  { id: 'lead-023', name: 'Michael Johnson', email: 'michael.j@email.com', phone: '+1 555 111 2222', score: 'cold', interestedProject: 'bashundhara', budget: 'Not specified', source: 'NRB Event', assignedTo: 'Sales Team A', createdAt: '2026-01-02', status: 'new', dripStage: 0 },
  { id: 'lead-024', name: 'Sultana Razia', email: 'sultana.r@email.com', phone: '+880 1766 777888', score: 'cold', interestedProject: 'purbachal', budget: '৳22-32 Lakh', source: 'Facebook Ad', assignedTo: 'Sales Team A', createdAt: '2025-12-28', status: 'new', dripStage: 0 },
  { id: 'lead-025', name: 'Robert Taylor', email: 'robert.t@email.com', phone: '+1 555 333 4444', score: 'cold', interestedProject: 'bashundhara', budget: 'Not specified', source: 'Google Ad', assignedTo: 'Sales Team B', createdAt: '2025-12-25', status: 'new', dripStage: 0 },
  { id: 'lead-026', name: 'Mina Parveen', email: 'mina.p@email.com', phone: '+880 1677 888999', score: 'cold', interestedProject: 'secure-green', budget: '৳16-22 Lakh', source: 'Website', assignedTo: 'Sales Team C', createdAt: '2025-12-22', status: 'new', dripStage: 0 },
  { id: 'lead-027', name: 'Chris Anderson', email: 'chris.a@email.com', phone: '+61 2 9876 5432', score: 'cold', interestedProject: 'purbachal', budget: 'Not specified', source: 'Website', assignedTo: 'Sales Team A', createdAt: '2025-12-20', status: 'new', dripStage: 0 },
  { id: 'lead-028', name: 'Jamal Uddin', email: 'jamal.u@email.com', phone: '+880 1588 999000', score: 'cold', interestedProject: 'bashundhara', budget: '৳35-45 Lakh', source: 'Referral', assignedTo: 'Sales Team B', createdAt: '2025-12-18', status: 'new', dripStage: 0 },
  { id: 'lead-029', name: 'Emma Davis', email: 'emma.d@email.com', phone: '+44 20 7946 5678', score: 'cold', interestedProject: 'purbachal', budget: 'Not specified', source: 'UK Event', assignedTo: 'Sales Team C', createdAt: '2025-12-15', status: 'new', dripStage: 0 },
  { id: 'lead-030', name: 'Iqbal Hossain', email: 'iqbal.h@email.com', phone: '+880 1499 000111', score: 'cold', interestedProject: 'secure-green', budget: '৳20-28 Lakh', source: 'Google Ad', assignedTo: 'Sales Team A', createdAt: '2025-12-10', status: 'new', dripStage: 0 },
];

export const initialResaleListings: ResaleListing[] = [
  { id: 'resale-001', projectId: 'bashundhara', unitNumber: 'B-05', ownerId: 'inv-001', askingPrice: 4800000, originalPrice: 3200000, status: 'available', listedDate: '2026-01-15', commission: 0.025 },
  { id: 'resale-002', projectId: 'purbachal', unitNumber: 'P-22', ownerId: 'inv-002', askingPrice: 3500000, originalPrice: 2600000, status: 'negotiation', listedDate: '2026-01-20', commission: 0.03 },
  { id: 'resale-003', projectId: 'secure-green', unitNumber: 'SG-18', ownerId: 'inv-001', askingPrice: 2800000, originalPrice: 2000000, status: 'sold', listedDate: '2025-12-01', commission: 0.025 },
];

export const initialRentalUnits: RentalUnit[] = [
  {
    id: 'rental-001',
    projectId: 'secure-green',
    unitNumber: 'SG-08',
    ownerId: 'inv-001',
    status: 'occupied',
    monthlyRent: 25000,
    tenant: {
      id: 'tenant-001',
      name: 'Mr. Rashid Kabir',
      phone: '+880 1711 123456',
      email: 'rashid.k@email.com',
      leaseStart: '2025-06-01',
      leaseEnd: '2026-05-31',
    },
    maintenanceTickets: [
      { id: 'mt-001', issue: 'AC not cooling properly', status: 'resolved', createdAt: '2025-12-10', resolvedAt: '2025-12-12' },
      { id: 'mt-002', issue: 'Water leakage in bathroom', status: 'in_progress', createdAt: '2026-02-20' },
    ],
    rentHistory: [
      { month: '2026-02', amount: 25000, paidDate: '2026-02-05', status: 'paid' },
      { month: '2026-01', amount: 25000, paidDate: '2026-01-03', status: 'paid' },
      { month: '2025-12', amount: 25000, paidDate: '2025-12-05', status: 'paid' },
    ],
  },
  {
    id: 'rental-002',
    projectId: 'secure-green',
    unitNumber: 'SG-15',
    ownerId: 'inv-002',
    status: 'occupied',
    monthlyRent: 22000,
    tenant: {
      id: 'tenant-002',
      name: 'Ms. Shirin Akter',
      phone: '+880 1811 234567',
      email: 'shirin.a@email.com',
      leaseStart: '2025-09-01',
      leaseEnd: '2026-08-31',
    },
    maintenanceTickets: [],
    rentHistory: [
      { month: '2026-02', amount: 22000, status: 'pending' },
      { month: '2026-01', amount: 22000, paidDate: '2026-01-08', status: 'paid' },
      { month: '2025-12', amount: 22000, paidDate: '2025-12-10', status: 'paid' },
    ],
  },
  {
    id: 'rental-003',
    projectId: 'secure-green',
    unitNumber: 'SG-22',
    ownerId: 'inv-001',
    status: 'listed',
    monthlyRent: 28000,
    maintenanceTickets: [],
    rentHistory: [],
  },
];

export const initialSupportTickets: SupportTicket[] = [
  { id: 'ticket-001', subject: 'Payment receipt not received', description: 'I made a payment on Feb 10 but haven\'t received the receipt.', status: 'open', priority: 'medium', createdAt: '2026-02-15', userId: 'inv-002' },
  { id: 'ticket-002', subject: 'Document access issue', description: 'Unable to download my allotment letter.', status: 'in_progress', priority: 'high', createdAt: '2026-02-12', userId: 'inv-001' },
  { id: 'ticket-003', subject: 'KYC verification pending', description: 'My KYC has been pending for 2 weeks.', status: 'open', priority: 'high', createdAt: '2026-02-20', userId: 'inv-003' },
  { id: 'ticket-004', subject: 'Update contact information', description: 'Please update my phone number.', status: 'resolved', priority: 'low', createdAt: '2026-02-08', userId: 'inv-001' },
];

// Analytics mock data
export const monthlyCollections = [
  { month: 'Sep 2025', collected: 12500000, target: 15000000 },
  { month: 'Oct 2025', collected: 18200000, target: 15000000 },
  { month: 'Nov 2025', collected: 14800000, target: 16000000 },
  { month: 'Dec 2025', collected: 22100000, target: 20000000 },
  { month: 'Jan 2026', collected: 16500000, target: 18000000 },
  { month: 'Feb 2026', collected: 8900000, target: 18000000 },
];

export const pageViews = [
  { page: 'Homepage', views: 12500, uniqueVisitors: 8200, avgDuration: '2m 45s' },
  { page: 'Bashundhara', views: 8900, uniqueVisitors: 5600, avgDuration: '4m 12s' },
  { page: 'Purbachal', views: 7200, uniqueVisitors: 4800, avgDuration: '3m 58s' },
  { page: 'Secure Green', views: 3100, uniqueVisitors: 2200, avgDuration: '3m 22s' },
  { page: 'Contact', views: 2800, uniqueVisitors: 2100, avgDuration: '1m 30s' },
];

export const demandHeatmapData = [
  { region: 'Bashundhara', lat: 23.8195, lng: 90.4303, demand: 95 },
  { region: 'Purbachal', lat: 23.8365, lng: 90.5176, demand: 88 },
  { region: 'Uttara', lat: 23.8759, lng: 90.3795, demand: 82 },
  { region: 'Gulshan', lat: 23.7925, lng: 90.4078, demand: 78 },
  { region: 'Dhanmondi', lat: 23.7461, lng: 90.3742, demand: 65 },
  { region: 'Keraniganj', lat: 23.7104, lng: 90.3456, demand: 55 },
  { region: 'Mirpur', lat: 23.8042, lng: 90.3537, demand: 48 },
  { region: 'Mohammadpur', lat: 23.7662, lng: 90.3587, demand: 42 },
];
