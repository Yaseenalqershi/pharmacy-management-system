import React from 'react';
import { 
  User, 
  Settings as SettingIcon, 
  Bell, 
  ShieldCheck, 
  Database, 
  Globe, 
  Printer, 
  Camera,
  Save,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';

const SettingsSection = ({ title, description, children }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
    <div className="p-6 border-b border-slate-50">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm font-medium">{description}</p>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, description, children }: any) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <p className="text-sm font-bold text-slate-800">{label}</p>
      <p className="text-xs text-slate-400 font-medium">{description}</p>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

export default function Settings() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">إعدادات النظام</h2>
          <p className="text-slate-500 font-medium">تخصيص تفضيلات الصيدلية وإدارة المستخدمين.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Save className="w-4 h-4" />
          حفظ جميع التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SettingsSection title="إعدادات الحساب" description="المعلومات الشخصية والبيانات الأساسية للمستخدم.">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border-2 border-slate-200">
                <User className="w-12 h-12" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">الاسم بالكامل</label>
                <input type="text" defaultValue="د. أحمد محمد" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">البريد الإلكتروني</label>
                <input type="email" defaultValue="admin@pharma.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold" />
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="إعدادات الصيدلية" description="تخصيص هوية الصيدلية وبيانات الفواتير.">
          <div className="space-y-8">
            <SettingItem label="اسم الصيدلية" description="سيظهر هذا الاسم في الفواتير والتقارير.">
              <input type="text" defaultValue="صيدلية الشفاء المتكاملة" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold w-64" />
            </SettingItem>
            <div className="h-[1px] bg-slate-50"></div>
            <SettingItem label="الرقم الضريبي" description="المستخدم في فواتير ضريبة القيمة المضافة.">
              <input type="text" defaultValue="123456789012345" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold w-64 font-mono text-left" />
            </SettingItem>
            <div className="h-[1px] bg-slate-50"></div>
            <SettingItem label="اللغة التلقائية" description="لغة الواجهة وتقارير المخرجات.">
              <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold w-64">
                <option>العربية (RTL)</option>
                <option>English (LTR)</option>
              </select>
            </SettingItem>
          </div>
        </SettingsSection>

        <SettingsSection title="الأمان والصلاحيات" description="إدارة الوصول وكلمات المرور.">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">المصادقة الثنائية (2FA)</p>
                  <p className="text-xs text-slate-400 font-medium">إضافة طبقة حماية إضافية لحسابك.</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <button className="flex items-center justify-between w-full p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                  <SettingIcon className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-800 text-right">إدارة صلاحيات الموظفين</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </SettingsSection>

        <SettingsSection title="النسخ الاحتياطي" description="حماية بياناتك من الفقدان.">
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
              <Database className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h4 className="font-bold text-slate-800">النسخ الاحتياطي السحابي نشط</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">آخر نسخة احتياطية تمت بنجاح اليوم في تمام الساعة 12:45 ظهراً.</p>
            </div>
            <button className="bg-white text-primary border border-primary/20 px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all">
              بدء نسخة فورية
            </button>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
