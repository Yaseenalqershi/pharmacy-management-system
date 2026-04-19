import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Printer
} from 'lucide-react';
import { cn } from '../utils/cn';

const data = [
  { month: 'يناير', sales: 45000 },
  { month: 'فبراير', sales: 52000 },
  { month: 'مارس', sales: 48000 },
  { month: 'ابريل', sales: 61000 },
  { month: 'مايو', sales: 55000 },
  { month: 'يونيو', sales: 67000 },
];

const categoryData = [
  { name: 'أدوية الضغط', value: 40, color: '#0891b2' },
  { name: 'المسكنات', value: 30, color: '#059669' },
  { name: 'المضادات', value: 20, color: '#f59e0b' },
  { name: 'أخرى', value: 10, color: '#e11d48' },
];

export default function Reports() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">التقارير والإحصائيات</h2>
          <p className="text-slate-500 font-medium">تحليل شامل للمبيعات، الأرباح، والمخزون.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Printer className="w-4 h-4" />
            طباعة
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" />
            تصدير PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">إجمالي الأرباح</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">42,500 ر.س</h3>
            <span className="flex items-center text-secondary text-xs font-bold mb-1">
              <ArrowUpRight className="w-4 h-4" />
              +14%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">عدد الفواتير</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">1,240</h3>
            <span className="flex items-center text-secondary text-xs font-bold mb-1">
              <ArrowUpRight className="w-4 h-4" />
              +8%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">متوسط السلة</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">85 ر.س</h3>
            <span className="flex items-center text-danger text-xs font-bold mb-1">
              <ArrowDownRight className="w-4 h-4" />
              -2%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">نمو العملاء</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-slate-800">12%</h3>
            <span className="flex items-center text-secondary text-xs font-bold mb-1">
              <ArrowUpRight className="w-4 h-4" />
              +5%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 card-shadow">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">نمو المبيعات الشهري</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Calendar className="w-4 h-4" />
              سنة 2024
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="#0891b2" strokeWidth={4} fillOpacity={1} fill="url(#chartGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 card-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-8">توزيع المبيعات حسب الصنف</h3>
          <div className="h-[350px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-4 justify-center pr-8 border-r border-slate-50">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.value}% من المبيعات</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
