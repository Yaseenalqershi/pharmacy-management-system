import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Pill, 
  Package, 
  AlertCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Barcode
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Medicine, MedicineCategory } from '../types';

const categories: { id: MedicineCategory; label: string; color: string }[] = [
  { id: 'Antibiotics', label: 'مضادات حيوية', color: 'bg-blue-100 text-blue-700' },
  { id: 'Painkillers', label: 'مسكنات', color: 'bg-purple-100 text-purple-700' },
  { id: 'Vitamins', label: 'فيتامينات', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'Supplements', label: 'مكملات غذائية', color: 'bg-green-100 text-green-700' },
  { id: 'Chronic', label: 'أدوية مزمنة', color: 'bg-red-100 text-red-700' },
  { id: 'Ointments', label: 'كريمات ومراهم', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'Other', label: 'أخرى', color: 'bg-slate-100 text-slate-700' },
];

const mockMedicines: Medicine[] = [
  { 
    id: '1', 
    name: 'بانادول إكسترا', 
    scientificName: 'باراسيتامول + كافيين', 
    barcode: '6281234567890', 
    category: 'Painkillers', 
    price: 15.50, 
    costPrice: 10.00, 
    stock: 50, 
    minStock: 10, 
    expiryDate: '2025-12-30' 
  },
  { 
    id: '2', 
    name: 'أوجمنتين 1جم', 
    scientificName: 'أموكسيسيلين + كلافولانيك أسيد', 
    barcode: '6280987654321', 
    category: 'Antibiotics', 
    price: 85.00, 
    costPrice: 65.00, 
    stock: 24, 
    minStock: 5, 
    expiryDate: '2024-11-15' 
  },
  { 
    id: '3', 
    name: 'سنتريوم مع لوتين', 
    scientificName: 'فيتامينات متعددة', 
    barcode: '6284561237890', 
    category: 'Vitamins', 
    price: 65.00, 
    costPrice: 45.00, 
    stock: 12, 
    minStock: 3, 
    expiryDate: '2026-05-20' 
  },
  { 
    id: '4', 
    name: 'فولتارين جل 50جم', 
    scientificName: 'ديكلوفيناك صوديوم', 
    barcode: '6283216549870', 
    category: 'Ointments', 
    price: 22.00, 
    costPrice: 15.00, 
    stock: 30, 
    minStock: 8, 
    expiryDate: '2025-08-10' 
  },
];

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory | 'All'>('All');

  const filteredMedicines = mockMedicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة الأدوية</h2>
          <p className="text-slate-500 font-medium">إضافة، تعديل، ومتابعة مخزون الأدوية.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          إضافة دواء جديد
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 card-shadow flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="البحث بالاسم، الاسم العلمي، أو الباركود..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
              selectedCategory === 'All' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            الكل
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                selectedCategory === cat.id ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الدواء</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">التصنيف</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">المخزون</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">السعر</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الصلاحية</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الباركود</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{medicine.name}</p>
                        <p className="text-xs text-slate-400">{medicine.scientificName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase",
                      categories.find(c => c.id === medicine.category)?.color
                    )}>
                      {categories.find(c => c.id === medicine.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className={cn(
                        "text-sm font-bold",
                        medicine.stock <= medicine.minStock ? "text-danger" : "text-slate-800"
                      )}>
                        {medicine.stock}
                      </span>
                      {medicine.stock <= medicine.minStock && (
                        <div className="flex items-center gap-1 text-[10px] text-danger font-bold mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          منخفض
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-800 text-sm">
                    {medicine.price.toFixed(2)} ر.س
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {medicine.expiryDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Barcode className="w-4 h-4" />
                      {medicine.barcode}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-slate-400">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-danger/10 hover:text-danger rounded-lg transition-all text-slate-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium tracking-wide font-mono">
            عرض {filteredMedicines.length} من {mockMedicines.length} أدوية
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-30" disabled>
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold text-center">...</button>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
