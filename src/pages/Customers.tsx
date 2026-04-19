import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  MapPin, 
  Calendar, 
  History, 
  CreditCard,
  MoreVertical,
  Star
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Customer } from '../types';

const mockCustomers: Customer[] = [
  { id: '1', name: 'محمد علي العمري', phone: '0501234567', address: 'حي النرجس، الرياض', loyaltyPoints: 450, debt: 0, createdAt: '2023-10-12' },
  { id: '2', name: 'سارة يوسف', phone: '0559876543', address: 'شارع التخصصي', loyaltyPoints: 1250, debt: 85.50, createdAt: '2024-01-05' },
  { id: '3', name: 'أحمد محمود', phone: '0543210987', loyaltyPoints: 80, debt: 0, createdAt: '2024-03-20' },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة العملاء</h2>
          <p className="text-slate-500 font-medium">متابعة حسابات العملاء وبرامج الولاء.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          إضافة عميل جديد
        </button>
      </div>

      <div className="relative max-w-2xl">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="ابحث عن عميل بالاسم أو رقم الهاتف..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden group hover:border-primary/30 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {customer.name[0]}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-bold">
                  <Star className="w-3 h-3 fill-amber-600" />
                  برنامج الولاء
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-800">{customer.name}</h4>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                  <Phone className="w-4 h-4" />
                  <span className="font-mono">{customer.phone}</span>
                </div>
              </div>

              {customer.address && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>{customer.address}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">نقاط الولاء</p>
                  <p className="font-bold text-slate-800">{customer.loyaltyPoints} نقطة</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">الديون المستحقة</p>
                  <p className={cn("font-bold", customer.debt > 0 ? "text-danger" : "text-secondary")}>
                    {customer.debt.toFixed(2)} ر.س
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                <Calendar className="w-3 h-3" />
                تاريخ الانضمام: {customer.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white rounded-lg text-slate-400 transition-colors shadow-sm">
                  <History className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg text-slate-400 transition-colors shadow-sm">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
