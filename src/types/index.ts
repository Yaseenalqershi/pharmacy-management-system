export type MedicineCategory = 
  | 'Antibiotics' 
  | 'Painkillers' 
  | 'Vitamins' 
  | 'Supplements' 
  | 'Chronic' 
  | 'Ointments' 
  | 'Other';

export interface Medicine {
  id: string;
  name: string;
  scientificName?: string;
  barcode: string;
  category: MedicineCategory;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  expiryDate: string;
  description?: string;
  alternatives?: string[]; // IDs of other medicines
}

export interface SaleItem {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'Cash' | 'Card' | 'Credit';
  status: 'Completed' | 'Refunded' | 'Cancelled';
  createdAt: string;
}

export interface PurchaseItem {
  medicineId: string;
  name: string;
  quantity: number;
  costPrice: number;
  total: number;
}

export interface Purchase {
  id: string;
  supplierId: string;
  items: PurchaseItem[];
  total: number;
  status: 'Pending' | 'Received' | 'Cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  loyaltyPoints: number;
  debt: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  debt: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Pharmacist' | 'StockManager' | 'Accountant';
  permissions: string[];
}
