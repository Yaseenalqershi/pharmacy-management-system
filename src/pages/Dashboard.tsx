import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users as UsersIcon, 
  AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../utils/cn';

const data = [
  { name: 'السبت', sales: 4000, profit: 2400 },
  { name: 'الأحد', sales: 3000, profit: 1398 },
  { name: 'الاثتين', sales: 2000, profit: 9800 },
  { name: 'الثلاثاء', sales: 2780, profit: 3908 },
  { name: 'الأربعاء', sales: 1890, profit: 4800 },
  { name: 'الخميس', sales: 2390, profit: 3800 },
  { name: 'الجمعة', sales: 3490, profit: 4300 },
];

const categoriesData = [
  { name: 'مضادات', value: 400, color: '#0891b2' },
  { name: 'مسكنات', value: 300, color: '#059669' },
  { name: 'فيتامينات', value: 300, color: '#f59e0b' },
  { name: 'أخرى', value: 200, color: '#e11d48' },
];

const StatCard = ({ title, value, change, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={cn("flex items-center gap-1 text-sm font-bold", trend === 'up' ? "text-secondary" : "text-danger")}>
        {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  </div>
);

const RecentSale = ({ name, time, amount, status }: any) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
        {name[0]}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-slate-800">{amount} ر.س</p>
      <p className={cn("text-[10px] font-bold uppercase", status === 'مكتمل' ? "text-secondary" : "text-amber-500")}>
        {status}
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">أهلاً بك، د. أحمد 👋</h2>
          <p className="text-slate-500 font-medium">إليك ملخص أداء الصيدلية لهذا اليوم.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">تحميل التقرير</button>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">+ بيع جديد</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي المبيعات" 
          value="12,450 ر.س" 
          change="+12.5%" 
          icon={DollarSign} 
          color="bg-primary" 
          trend="up" 
        />
        <StatCard 
          title="الأدوية في المخزن" 
          value="1,240" 
          change="+5.2%" 
          icon={Package} 
          color="bg-secondary" 
          trend="up" 
        />
        <StatCard 
          title="عملاء اليوم" 
          value="48" 
          change="-2.4%" 
          icon={UsersIcon} 
          color="bg-accent" 
          trend="down" 
        />
        <StatCard 
          title="تنبيهات الصلاحية" 
          value="12" 
          change="3 جديدة" 
          icon={AlertTriangle} 
          color="bg-danger" 
          trend="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">تحليل المبيعات</h3>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-bold outline-none px-2 py-1">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0891b2" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow text-center">
          <h3 className="font-bold text-slate-800 mb-6 text-right">الأصناف الأكثر طلباً</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <h3 className="font-bold text-slate-800 mb-4">آخر العمليات</h3>
          <div className="space-y-1">
            <RecentSale name="محمد علي العمري" time="منذ 5 دقائق" amount="125.00" status="مكتمل" />
            <RecentSale name="سارة يوسف" time="منذ 15 دقيقة" amount="45.50" status="مكتمل" />
            <RecentSale name="خالد محمود" time="منذ 40 دقيقة" amount="310.00" status="معلق" />
            <RecentSale name="أحمد حسن" time="منذ ساعة" amount="89.00" status="مكتمل" />
          </div>
          <button className="w-full mt-4 py-2 text-primary text-sm font-bold hover:bg-primary/5 rounded-xl transition-colors">عرض جميع العمليات</button>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <h3 className="font-bold text-slate-800 mb-4">تنبيهات المخزون</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-danger/5 rounded-xl border border-danger/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-danger rounded-lg">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">بانادول إكسترا</p>
                  <p className="text-xs text-danger font-medium">باقي 5 عبوات فقط</p>
                </div>
              </div>
              <button className="text-xs font-bold bg-white border border-danger/20 text-danger px-3 py-1.5 rounded-lg hover:bg-danger hover:text-white transition-all underline decoration-dotted">طلب شراء</button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">أوجمنتين 1جم</p>
                  <p className="text-xs text-amber-600 font-medium">باقي 12 عبوة</p>
                </div>
              </div>
              <button className="text-xs font-bold bg-white border border-amber-200 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-500 hover:text-white transition-all underline decoration-dotted">طلب شراء</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
