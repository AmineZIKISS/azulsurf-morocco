import React, { useEffect, useState } from 'react';
import { 
  Package, Shield, BedDouble, Compass, Star, Mail, 
  Clock, CheckCircle2, AlertTriangle, HelpCircle 
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setData(response.data.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Could not connect to the administration API database.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-500">
        <Clock className="animate-spin text-sky-600 h-8 w-8 mr-3" />
        <span className="font-semibold text-sm">Gathering administrative records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-2xl flex items-center space-x-4 max-w-xl mx-auto mt-6">
        <AlertTriangle className="text-rose-500 shrink-0 h-10 w-10" />
        <div>
          <h4 className="font-bold text-sm">Connection Warning</h4>
          <p className="text-xs text-rose-600 mt-1">{error}</p>
          <p className="text-[10px] text-rose-500 mt-2">Ensure the Laravel backend development server is running on port 8000.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Packages', value: data?.total_packages || 0, icon: Package, color: 'bg-blue-500' },
    { title: 'Surf Lesson Types', value: data?.total_surf_lessons || 0, icon: Shield, color: 'bg-indigo-500' },
    { title: 'Camp Rooms types', value: data?.total_rooms || 0, icon: BedDouble, color: 'bg-teal-500' },
    { title: 'Guiding Services', value: data?.total_guiding_services || 0, icon: Compass, color: 'bg-emerald-500' },
    { title: 'Reviews Total', value: data?.total_reviews || 0, icon: Star, color: 'bg-amber-500' },
    { title: 'Unread Messages', value: data?.unread_contacts || 0, icon: Mail, color: 'bg-rose-500', alert: (data?.unread_contacts || 0) > 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Introduction Banner */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl flex justify-between items-center shadow-xs">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to Azul Surf Console</h3>
          <p className="text-slate-500 text-xs mt-1">Real-time statistics overview and content control panels.</p>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i} 
              className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs flex items-center space-x-5 hover:shadow-md transition-shadow"
            >
              <div className={`${card.color} text-white p-4 rounded-2xl shadow-xs shrink-0`}>
                <Icon size={24} />
              </div>
              <div className="min-w-0 flex-grow">
                <span className="text-xs font-semibold text-slate-500 block truncate uppercase tracking-wider">{card.title}</span>
                <span className="text-3xl font-extrabold text-slate-900 block mt-1 tracking-tight">
                  {card.value}
                </span>
                {card.alert && (
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md mt-2">
                    Action Required
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reservation Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Bookings Action Queue</h4>
            <HelpCircle size={16} className="text-slate-450" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50/50 border border-amber-200/60 p-5 rounded-2xl text-center">
              <Clock className="text-amber-500 mx-auto mb-2" size={24} />
              <span className="text-2xl font-black text-slate-900 tracking-tight block">
                {data?.pending_reservations || 0}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pending Bookings</span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-200/60 p-5 rounded-2xl text-center">
              <CheckCircle2 className="text-emerald-500 mx-auto mb-2" size={24} />
              <span className="text-2xl font-black text-slate-900 tracking-tight block">
                {data?.confirmed_reservations || 0}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Confirmed Bookings</span>
            </div>
          </div>
        </div>

        {/* Informational Guidelines Card */}
        <div className="bg-sky-950 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <h4 className="font-bold text-sm uppercase tracking-wider text-sky-350">Quick Reference</h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Use the sidebar to edit packages, active lesson categories, available camp rooms, guiding service details, and read customer inquiries.
            </p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mt-6 relative z-10">
            Azul Surf Morocco Systems
          </div>
        </div>
      </div>
    </div>
  );
}
