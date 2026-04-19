import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  Receipt,
  Barcode,
  X,
  PlusCircle,
  Filter,
  CheckCircle2,
  Package,
  ChevronRight,
  Pill
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Medicine, SaleItem, MedicineCategory } from '../types';

const categories: { id: MedicineCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'الكل' },
  { id: 'Antibiotics', label: 'مضادات' },
  { id: 'Painkillers', label: 'مسكنات' },
  { id: 'Vitamins', label: 'فيتامينات' },
  { id: 'Supplements', label: 'مكملات' },
  { id: 'Chronic', label: 'مزمنة' },
  { id: 'Ointments', label: 'مراهم' },
];

const mockMedicines: Medicine[] = [
  { id: '1', name: 'بانادول إكسترا', scientificName: 'باراسيتامول + كافيين', barcode: '6281234567890', category: 'Painkillers', price: 15.50, costPrice: 10, stock: 52, minStock: 10, expiryDate: '2025-12' },
  { id: '2', name: 'أوجمنتين 1جم', scientificName: 'أموكسيسيلين كلافولانات', barcode: '6280987654321', category: 'Antibiotics', price: 85.00, costPrice: 65, stock: 8, minStock: 5, expiryDate: '2024-11' },
  { id: '3', name: 'سنتريوم مع لوتين', scientificName: 'فيتامينات متعددة', barcode: '6284561237890', category: 'Vitamins', price: 65.00, costPrice: 45, stock: 12, minStock: 3, expiryDate: '2026-05' },
  { id: '4', name: 'فولتارين جل 50جم', scientificName: 'ديكلوفيناك صوديوم', barcode: '6283216549870', category: 'Ointments', price: 22.00, costPrice: 15, stock: 30, minStock: 8, expiryDate: '2025-08' },
  { id: '5', name: 'أوميبرازول 20مجم', scientificName: 'أوميبرازول', barcode: '6281112223334', category: 'Chronic', price: 42.00, costPrice: 30, stock: 15, minStock: 5, expiryDate: '2025-01' },
  { id: '6', name: 'فيتامين سي 1000مجم', scientificName: 'حمض الأسكوربيك', barcode: '6285556667778', category: 'Vitamins', price: 18.50, costPrice: 12, stock: 100, minStock: 20, expiryDate: '2026-10' },
];

export default function POS() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<MedicineCategory | 'All'>('All');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (medicine: Medicine) => {
    const existing = cart.find(item => item.medicineId === medicine.id);
    if (existing) {
      setCart(cart.map(item => 
        item.medicineId === medicine.id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        medicineId: medicine.id,
        name: medicine.name,
        quantity: 1,
        price: medicine.price,
        total: medicine.price
      }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.medicineId === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, total: newQty * item.price };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.medicineId !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax - discount;

  const filteredMedicines = mockMedicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.barcode.includes(searchTerm);
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#f8fbff] overflow-hidden" dir="rtl">
      {/* Products Side */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Professional Header for POS */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">نافذة البيع الفوري</h2>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 flex-shrink-0">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-widest">متصل بالنظام</span>
            </div>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 card-shadow text-slate-600">
            <Barcode className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">آخر مسح: 628123...</span>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="ابحث بالاسم، الاسم العلمي، أو قم بمسح الباركود مباشرة..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border-2",
                  activeCategory === cat.id 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:text-slate-800"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optimized Grid - More Minimalist and Professional */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 no-scrollbar pb-6">
          {filteredMedicines.map(medicine => (
            <div 
              key={medicine.id}
              onClick={() => addToCart(medicine)}
              className="group relative bg-white border border-slate-200 rounded-2xl p-4 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Status Indicator */}
              <div className="absolute top-0 right-0 w-12 h-12">
                 <div className={cn(
                   "absolute top-0 right-0 w-[150%] h-6 translate-x-[30%] rotate-45 flex items-center justify-center text-[8px] font-black text-white",
                   medicine.stock > 10 ? "bg-emerald-500" : "bg-rose-500"
                 )}>
                   {medicine.stock > 10 ? "متوفر" : "منخفض"}
                 </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                    <Pill className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{medicine.name}</h4>
                </div>
                
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight line-clamp-1">
                    {medicine.scientificName}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                     <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        <Package className="w-3 h-3" />
                        <span>{medicine.stock} قطعة</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">السعر</span>
                  <span className="text-lg font-black text-slate-900 font-mono tracking-tighter">
                    {medicine.price.toFixed(2)} <small className="text-[10px] font-bold">ر.س</small>
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Side - More Refined and Data-Focus */}
      <aside className="w-[450px] bg-white border-r border-slate-100 flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-20">
        <div className="p-6 bg-slate-900 border-b border-white/5">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg">سلة البيع</h3>
                <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase">Transaction #48922</p>
              </div>
            </div>
            <button 
              onClick={() => setCart([])}
              className="text-xs font-bold text-white/40 hover:text-white transition-colors"
            >
              إلغاء الكل
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-slate-50/30">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-12">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                 <Receipt className="w-10 h-10 text-slate-300" />
              </div>
              <h4 className="text-slate-800 font-bold">السلة فارغة حالياً</h4>
              <p className="text-xs text-slate-400 mt-2 font-medium">قم بإضافة الأدوية من القائمة الجانبية أو عن طريق مسح الباركود لبدء البيع.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.medicineId} className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md animate-in slide-in-from-left-4 duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h5 className="text-sm font-black text-slate-800">{item.name}</h5>
                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">UNIT PRICE: {item.price.toFixed(2)}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.medicineId)} className="text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 px-2 border border-slate-100">
                    <button onClick={() => updateQuantity(item.medicineId, -1)} className="p-1 hover:bg-white rounded-lg text-slate-400 transition-all">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-black text-sm text-slate-800 font-mono">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.medicineId, 1)} className="p-1 hover:bg-white rounded-lg text-primary transition-all">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-black text-slate-900 font-mono tracking-tighter text-base">{item.total.toFixed(2)} <span className="text-[10px]">ر.س</span></p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Financial Summary panel */}
        <div className="p-8 bg-white border-t border-slate-200 rounded-t-[3rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center px-2">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">إجمالي المنتجات</span>
              <span className="font-black text-slate-800 font-mono">{subtotal.toFixed(2)} ر.س</span>
            </div>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">ضريبة القيمة المضافة</span>
                <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">15%</span>
              </div>
              <span className="font-black text-slate-800 font-mono">+{tax.toFixed(2)} ر.س</span>
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">الخصومات</span>
              <button 
                onClick={() => setDiscount(prev => prev === 0 ? 15 : 0)}
                className={cn("font-black font-mono transition-all", discount > 0 ? "text-rose-500" : "text-primary hover:underline")}
              >
                {discount > 0 ? `-${discount.toFixed(2)} ر.س` : "أضف خصم +"}
              </button>
            </div>
            
            <div className="pt-6 mt-4 border-t-2 border-dashed border-slate-100 relative">
               <div className="absolute -top-3 left-0 right-0 flex justify-between px-4">
                  <div className="w-6 h-6 bg-white rounded-full -ml-8 border-r border-slate-100"></div>
                  <div className="w-6 h-6 bg-white rounded-full -mr-8 border-l border-slate-100"></div>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-black text-xl">المطلوب سداده</span>
                  <div className="text-left">
                    <p className="text-3xl font-black text-primary font-mono tracking-tighter">{total.toFixed(2)}</p>
                    <p className="text-[10px] text-primary/60 font-black uppercase text-center -mt-1 tracking-widest">ريال سعودي</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:border-primary hover:text-primary transition-all group">
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 group-hover:border-primary/20">
                <Banknote className="w-4 h-4" />
              </div>
              نقدي
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:border-primary hover:text-primary transition-all group">
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 group-hover:border-primary/20">
                <CreditCard className="w-4 h-4" />
              </div>
              شبكة / بطاقة
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-slate-900/30 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30 disabled:shadow-none disabled:active:scale-100 flex items-center justify-center gap-4 group"
          >
            <span className="text-sm tracking-widest">اعتماد وطباعة الفاتورة</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
          </button>
        </div>
      </aside>
    </div>
  );
}
