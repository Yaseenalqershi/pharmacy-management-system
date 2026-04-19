import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  History,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Supplier } from '../types';

const mockSuppliers: Supplier[] = [
  { id: '1', name: 'شركة سقالة الطبية', phone: '0112233445', email: 'info@sqala.com', address: 'طريق المطار، الرياض', debt: 15400.00, createdAt: '2022-05-10' },
  { id: '2', name: 'توزيع الأدوية الدولية', phone: '0129988776', email: 'sales@interdrug.com', debt: 0, createdAt: '2023-01-15' },
  { id: '3', name: 'لوازم الصحة المحدودة', phone: '0134455667', debt: 2450.50, createdAt: '2023-11-20' },
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = mockSuppliers.filter(s => 
    s.name.includes(searchTerm)
  );

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة الموردين</h2>
          <p className="text-slate-500 font-medium">إدارة شركات التوزيع والمستحقات المالية.</p>
        </div>
        <button className="bg-secondary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          إضافة مورد جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="البحث باسم المورد..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-sm font-bold text-slate-600">المورد</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">التواصل</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">العنوان</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">المستحقات</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{supplier.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">منذ {supplier.createdAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Phone className="w-3 h-3" />
                        <span className="font-mono">{supplier.phone}</span>
                      </div>
                      {supplier.email && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Mail className="w-3 h-3" />
                          <span>{supplier.email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {supplier.address ? (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{supplier.address}</span>
                      </div>
                    ) : (
                      <span className="text-slate-300 text-xs">غير محدد</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className={cn(
                        "text-sm font-bold",
                        supplier.debt > 0 ? "text-danger" : "text-secondary"
                      )}>
                        {supplier.debt.toLocaleString()} ر.س
                      </span>
                      {supplier.debt > 10000 && (
                        <div className="flex items-center gap-1 text-[10px] text-danger font-bold mt-0.5 animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          متجاوز الحد
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <History className="w-3.5 h-3.5" />
                        سجل العمليات
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 shadow-sm transition-all">
                        <CreditCard className="w-3.5 h-3.5" />
                        تسوية
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
