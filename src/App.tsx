import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  Truck, 
  Users, 
  UserSquare2, 
  BarChart3, 
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { cn } from './utils/cn';

import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import POS from './pages/POS';
import Purchases from './pages/Purchases';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

interface SidebarItemProps {
  icon: any;
  label: string;
  to: string;
  active?: boolean;
  key?: string;
}

const SidebarItem = ({ icon: Icon, label, to, active }: SidebarItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/30" 
        : "text-slate-500 hover:bg-slate-100 hover:text-primary"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-primary transition-colors")} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
        <Menu className="w-5 h-5" />
      </button>
      <div className="relative hidden md:flex items-center">
        <Search className="w-4 h-4 absolute left-3 text-slate-400" />
        <input 
          type="text" 
          placeholder="بحث سريع..." 
          className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <button className="p-2 hover:bg-slate-100 rounded-full relative text-slate-600">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-800">د. أحمد محمد</p>
          <p className="text-xs text-slate-500">مدير النظام</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold">
          أ
        </div>
      </div>
    </div>
  </nav>
);

export default function App() {
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', to: '/' },
    { icon: Pill, label: 'الأدوية', to: '/medicines' },
    { icon: ShoppingCart, label: 'نقطة البيع', to: '/pos' },
    { icon: Truck, label: 'المشتريات', to: '/purchases' },
    { icon: Users, label: 'العملاء', to: '/customers' },
    { icon: UserSquare2, label: 'الموردين', to: '/suppliers' },
    { icon: BarChart3, label: 'التقارير', to: '/reports' },
    { icon: SettingsIcon, label: 'الإعدادات', to: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">فارما سوفت</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Pharmacy Pro</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.to}
              {...item}
              active={location.pathname === item.to}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-danger hover:bg-danger/5 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
