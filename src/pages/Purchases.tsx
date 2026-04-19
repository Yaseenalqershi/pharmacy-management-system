import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  Package, 
  Truck, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ChevronDown,
  Eye
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Purchase } from '../types';

const mockPurchases: Purchase[] = [
  { id: 'ORD-001', supplierId: 'شركة سقالة الطبية', total: 12500, status: 'Received', createdAt: '2024-04-10', items: [] },
  { id: 'ORD-002', supplierId: 'توزيع الأدوية الدولية', total: 4500, status: 'Pending', createdAt: '2024-04-18', items: [] },
  { id: 'ORD-003', supplierId: 'لوازم الصحة المحدودة', total: 2450.50, status: 'Cancelled', createdAt: '2024-04-15', items: [] },
];

const StatusBadge = ({ status }: { status: Purchase['status'] }) => {
  const configs = {
    Received: { label: 'تم الاستلام', icon: CheckCircle2, class: 'bg-secondary/10 text-secondary border-secondary/20' },
    Pending: { label: 'قيد الانتظار', icon: Clock, class: 'bg-amber-100 text-amber-700 border-amber-200' },
    Cancelled: { label: 'ملغي', icon: XCircle, class: 'bg-danger/10 text-danger border-danger/20' },
  };
  const config = configs[status];
  const Icon = config.icon;
  
  return (
    <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit", config.class)}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </div>
  );
};

export default function Purchases() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إدارة المشتريات</h2>
          <p className="text-slate-500 font-medium">طلبات الشراء وفواتير الموردين وتحديث المخزون.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          طلب شراء جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">طلبات الشهر</p>
            <h4 className="text-xl font-bold text-slate-800">24 طلب</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex items-center gap-4">
          <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">قيمة المشتريات</p>
            <h4 className="text-xl font-bold text-slate-800">54,200 ر.س</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">طلبات قيد الانتظار</p>
            <h4 className="text-xl font-bold text-slate-800">3 طلبات</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 card-shadow">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="البحث برقم الطلب أو المورد..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-xs"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">
            <Filter className="w-4 h-4" />
            فلترة
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">رقم الطلب</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">المورد</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">التاريخ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">القيمة الإجمالية</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الحالة</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockPurchases.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{order.supplierId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{order.createdAt}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-800 text-sm">
                    {order.total.toLocaleString()} ر.س
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all" title="عرض التفاصيل">
                      <Eye className="w-4 h-4" />
                    </button>
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
