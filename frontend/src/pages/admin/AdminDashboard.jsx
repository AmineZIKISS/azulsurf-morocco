import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, Settings, LogOut, Loader2, 
  Check, X, AlertCircle, Phone, Mail, Users, Info, Shield, ArrowRight, Package,
  BedDouble, Compass, Image, Star
} from 'lucide-react';
import api from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/reservations');
      setReservations(response.data);
    } catch (err) {
      console.error('Fetch reservations error:', err);
      setError(t('adminDashboard.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setActionLoadingId(id);
    try {
      await api.put(`/admin/reservations/${id}/status`, { status });
      // Update state locally
      setReservations(prev => 
        prev.map(r => r.id === id ? { ...r, status } : r)
      );
    } catch (err) {
      console.error('Update status error:', err);
      alert(t('adminDashboard.updateError'));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Helper stats
  const total = reservations.length;
  const pending = reservations.filter(r => r.status === 'Pending').length;
  const confirmed = reservations.filter(r => r.status === 'Confirmed').length;
  const cancelled = reservations.filter(r => r.status === 'Cancelled').length;

  const getServiceLabel = (reservation) => {
    const type = reservation.service_type;
    if (type === 'package') {
      return reservation.package?.name || 'Package Tout-Inclus';
    }
    if (type === 'surf_lesson') {
      const lesson = reservation.surf_lesson || reservation.surfLesson;
      return lesson?.name || 'Cours de Surf';
    }
    if (type === 'room') {
      return reservation.room?.name || 'Chambre Surf Camp';
    }
    if (type === 'guiding') {
      const guiding = reservation.guiding_service || reservation.guidingService;
      return guiding?.name || 'Surf Guiding';
    }
    return type;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const formatServiceType = (type) => {
    switch (type) {
      case 'room': return t('adminDashboard.serviceRoom');
      case 'package': return t('adminDashboard.servicePackage');
      case 'surf_lesson': return t('adminDashboard.serviceLesson');
      case 'guiding': return t('adminDashboard.serviceGuiding');
      default: return type;
    }
  };

  const formatStatusLabel = (status) => {
    switch (status) {
      case 'Pending': return t('adminDashboard.statusPending');
      case 'Confirmed': return t('adminDashboard.statusConfirmed');
      case 'Cancelled': return t('adminDashboard.statusCancelled');
      default: return status;
    }
  };

  // Locale-aware date formatting for the period column
  const formatPeriodDate = (dateStr) => {
    const lang = i18n.language?.substring(0, 2) || 'fr';
    const localeMap = { en: 'en-US', fr: 'fr-FR', es: 'es-ES' };
    return new Date(dateStr).toLocaleDateString(localeMap[lang] || 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/50">
          <div>
            <h2 className="font-headline-md text-3xl font-bold text-[#004655]">{t('adminDashboard.title')}</h2>
            <p className="text-xs text-slate-400 mt-1">{t('adminDashboard.subtitle')}</p>
          </div>
          <button 
            onClick={fetchReservations}
            disabled={loading}
            className="p-2.5 rounded-full hover:bg-slate-200/50 transition-colors text-[#004655]"
            title={t('adminDashboard.refresh')}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Calendar size={20} />}
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('adminDashboard.total')}</span>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold text-[#004655]">{total}</span>
              <div className="bg-slate-50 p-2 rounded-xl text-slate-500">
                <Calendar size={18} />
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">{t('adminDashboard.pending')}</span>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold text-amber-600">{pending}</span>
              <div className="bg-amber-50 p-2 rounded-xl text-amber-500">
                <Loader2 size={18} className={loading ? "animate-spin" : ""} />
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">{t('adminDashboard.confirmed')}</span>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold text-emerald-600">{confirmed}</span>
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-500">
                <Check size={18} />
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">{t('adminDashboard.cancelled')}</span>
            <div className="flex justify-between items-end mt-2">
              <span className="text-3xl font-bold text-rose-600">{cancelled}</span>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
                <X size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Error notification */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3.5 rounded-2xl text-xs flex items-center gap-2 mb-6">
            <AlertCircle size={16} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Reservations Table Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-[#004655] text-base">{t('adminDashboard.reservationHistory')}</h3>
            <span className="bg-[#004655]/5 text-[#004655] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {reservations.length} {t('adminDashboard.requests')}
            </span>
          </div>

          <div className="overflow-x-auto">
            {loading && reservations.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="animate-spin text-[#E76F51]" size={36} />
                <p className="text-sm">{t('adminDashboard.loadingData')}</p>
              </div>
            ) : reservations.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Info size={36} className="text-slate-300" />
                <p className="text-sm">{t('adminDashboard.noReservations')}</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">{t('adminDashboard.clientCol')}</th>
                    <th className="px-6 py-4">{t('adminDashboard.contactCol')}</th>
                    <th className="px-6 py-4">{t('adminDashboard.serviceCol')}</th>
                    <th className="px-6 py-4">{t('adminDashboard.periodCol')}</th>
                    <th className="px-6 py-4 text-center">{t('adminDashboard.travelersCol')}</th>
                    <th className="px-6 py-4">{t('adminDashboard.statusCol')}</th>
                    <th className="px-6 py-4 text-right">{t('adminDashboard.actionsCol')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/20 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4 font-semibold text-[#004655]">
                        {res.name}
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} className="text-[#004655]/50 shrink-0" />
                          <span className="truncate max-w-[150px]">{res.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone size={12} className="text-[#004655]/50 shrink-0" />
                          <span>{res.phone}</span>
                        </div>
                      </td>

                      {/* Service Type */}
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#E76F51]">
                            {formatServiceType(res.service_type)}
                          </span>
                          <p className="text-xs text-slate-700 truncate max-w-[180px]" title={getServiceLabel(res)}>
                            {getServiceLabel(res)}
                          </p>
                        </div>
                      </td>

                      {/* Période */}
                      <td className="px-6 py-4 font-medium text-slate-600">
                        <span className="whitespace-nowrap text-xs">
                          {formatPeriodDate(res.check_in)} — {formatPeriodDate(res.check_out)}
                        </span>
                      </td>

                      {/* Number of People */}
                      <td className="px-6 py-4 text-center font-bold text-slate-700">
                        {res.number_of_people}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(res.status)}`}>
                          {formatStatusLabel(res.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {actionLoadingId === res.id ? (
                            <Loader2 size={16} className="animate-spin text-slate-400 mr-2" />
                          ) : (
                            <>
                              {res.status !== 'Confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(res.id, 'Confirmed')}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-colors cursor-pointer"
                                  title={t('adminDashboard.approve')}
                                >
                                  <Check size={14} />
                                </button>
                              )}
                              {res.status !== 'Cancelled' && (
                                <button
                                  onClick={() => handleUpdateStatus(res.id, 'Cancelled')}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                                  title={t('adminDashboard.reject')}
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
    </>
  );
}
