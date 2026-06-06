import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, ChevronDown, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format, parseISO, startOfDay } from 'date-fns';
import { fr, es, enUS } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker-coastal.css';
import api, { getCsrfCookie } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

// Map i18n language codes to date-fns locale objects
const dateFnsLocales = { fr, es, en: enUS };

// Reusable Premium Floating Label Input Component
const FloatingInput = ({ label, id, name, type = 'text', value, onChange, required, disabled, error }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full bg-white/40 border ${
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : 'border-outline-variant/30 focus:border-[#E76F51] focus:ring-[#E76F51]/10'
        } rounded-xl pt-6 pb-2 px-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:bg-white focus:ring-2 placeholder-transparent`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2.5 text-[10px] font-bold ${
          error ? 'text-rose-500/90' : 'text-[#E76F51]'
        } uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left 
          peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100
          peer-focus:text-[10px] peer-focus:font-bold ${
            error ? 'peer-focus:text-rose-500/90' : 'peer-focus:text-[#E76F51]'
          } peer-focus:translate-y-0 peer-focus:scale-100
          -translate-y-1 scale-100`}
      >
        {label}
      </label>
      {error && (
        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1.5 pl-1">
          <AlertCircle size={12} className="shrink-0 text-rose-500" />
          <span>{error[0] || error}</span>
        </p>
      )}
    </div>
  );
};

// Reusable Premium Floating Label Textarea Component
const FloatingTextarea = ({ label, id, name, value, onChange, disabled, rows = 3, error }) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        placeholder=" "
        className={`peer w-full bg-white/40 border ${
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10' : 'border-outline-variant/30 focus:border-[#E76F51] focus:ring-[#E76F51]/10'
        } rounded-xl pt-6 pb-2 px-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:bg-white focus:ring-2 resize-none placeholder-transparent`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2.5 text-[10px] font-bold ${
          error ? 'text-rose-500/90' : 'text-[#E76F51]'
        } uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left 
          peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100
          peer-focus:text-[10px] peer-focus:font-bold ${
            error ? 'peer-focus:text-rose-500/90' : 'peer-focus:text-[#E76F51]'
          } peer-focus:translate-y-0 peer-focus:scale-100
          -translate-y-1 scale-100`}
      >
        {label}
      </label>
      {error && (
        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1.5 pl-1">
          <AlertCircle size={12} className="shrink-0 text-rose-500" />
          <span>{error[0] || error}</span>
        </p>
      )}
    </div>
  );
};

// ── Custom trigger button for the DatePicker (matches Hero style) ─────────────
const ModalDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="w-full bg-white/40 border border-outline-variant/30 rounded-xl py-3 px-4 text-sm text-left font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 cursor-pointer"
  >
    {value || <span className="text-slate-400 font-normal italic" style={{ fontSize: '0.8125rem' }}>{placeholder}</span>}
  </button>
));
ModalDateInput.displayName = 'ModalDateInput';

// ── Compact Calendar Legend container for the modal context ───────────────────
const ModalCalendarLegend = ({ className, children, t }) => (
  <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(10,63,92,0.12)] overflow-hidden">
    <div className="p-5">
      <div className={className} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        {children}
      </div>
    </div>
    <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/60 flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F07167] shadow-[0_0_6px_rgba(240,113,103,0.4)] shrink-0" />
        <span className="text-[9px] text-slate-600 font-semibold uppercase tracking-wider">{t('booking.calendarSelected')}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#0A3F5C] bg-transparent shrink-0" />
        <span className="text-[9px] text-slate-600 font-semibold uppercase tracking-wider">{t('booking.calendarToday')}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300 shrink-0" />
        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider line-through">{t('booking.calendarBooked')}</span>
      </div>
    </div>
  </div>
);

export default function BookingModal() {
  const { isBookingModalOpen: isOpen, closeBookingModal: onClose, selectedService, initialData } = useBooking();
  const { t, i18n } = useTranslation();
  const currentLocale = dateFnsLocales[i18n.language?.substring(0, 2)] || fr;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPackage: '',
    additionalMessage: '',
  });

  // ── Local date state as Date objects (for react-datepicker) ────────────
  const [localCheckIn, setLocalCheckIn] = useState(null);
  const [localCheckOut, setLocalCheckOut] = useState(null);

  // ── Booked dates from backend ─────────────────────────────────────────
  const [bookedDates, setBookedDates] = useState([]);
  const [datesLoading, setDatesLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [selectOpen, setSelectOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  // ── 7 packages matching the business model in SurfPackages.jsx ──────────
  const packages = [
    { value: 'Surf Lessons Only',                      label: 'Surf Lessons Only',                      service_type: 'surf_lesson' },
    { value: 'Chambre Privée (Hébergement Seul)',       label: 'Chambre Privée (Hébergement Seul)',       service_type: 'room' },
    { value: 'Chambre Partagée (Hébergement Seul)',     label: 'Chambre Partagée (Hébergement Seul)',     service_type: 'room' },
    { value: 'Free Surf Stay',                         label: 'Free Surf Stay',                         service_type: 'package' },
    { value: 'Surf Package (Sans Transfert)',           label: 'Surf Package (Sans Transfert)',           service_type: 'package' },
    { value: 'Surf Guiding Package',                   label: 'Surf Guiding Package',                   service_type: 'guiding' },
    { value: 'Full Surf Package',                      label: 'Full Surf Package',                      service_type: 'package' },
  ];

  // Format dates to locale-aware friendly text (accepts Date objects or ISO strings)
  const formatDateLocale = (dateVal) => {
    if (!dateVal) return '';
    const date = dateVal instanceof Date ? dateVal : new Date(dateVal);
    if (isNaN(date.getTime())) return String(dateVal);
    const lang = i18n.language?.substring(0, 2) || 'fr';
    const localeMap = { en: 'en-US', fr: 'fr-FR', es: 'es-ES' };
    return date.toLocaleDateString(localeMap[lang] || 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Helper: parse an ISO string like "2026-06-15" into a Date object
  const parseDateStr = (str) => {
    if (!str) return null;
    const d = new Date(str + 'T00:00:00');
    return isNaN(d.getTime()) ? null : startOfDay(d);
  };

  // Reset state on open/close, and pre-fill from incoming initialData
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError('');
      setErrors({});
      setSelectOpen(false);
      setIsCheckInOpen(false);
      setIsCheckOutOpen(false);

      // If a package_name was passed (from a SurfPackages card), auto-select it in the dropdown
      const incomingPackage = initialData?.package_name || '';

      // Initialize local dates from hero booking form (may be null when coming from SurfPackages)
      setLocalCheckIn(parseDateStr(initialData?.checkIn));
      setLocalCheckOut(parseDateStr(initialData?.checkOut));

      setFormData({
        name: '',
        email: '',
        phone: '',
        selectedPackage: incomingPackage,
        additionalMessage: '',
      });

      // Fetch booked dates from backend
      setDatesLoading(true);
      api.get('/booked-dates')
        .then(res => {
          const dates = (res.data.booked_dates || []).map(d => startOfDay(parseISO(d)));
          setBookedDates(dates);
        })
        .catch(err => console.warn('Could not load booked dates in modal:', err))
        .finally(() => setDatesLoading(false));
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Wrap the calendar legend to inject t()
  const CalendarLegendWithT = (props) => <ModalCalendarLegend {...props} t={t} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});

    // Extract guests count integer
    let guestsCount = 2;
    if (initialData?.guests) {
      const match = initialData.guests.match(/\d+/);
      if (match) {
        guestsCount = parseInt(match[0]);
      }
    }

    // Resolve backend service_type from the selected package name
    const selectedPkg = packages.find(p => p.value === formData.selectedPackage);
    const resolvedServiceType = selectedPkg?.service_type || 'room';

    // Serialize Date objects to ISO strings for the API
    const toISODate = (d) => d ? format(d, 'yyyy-MM-dd') : '';

    // Build the payload mapping — use local dates (editable in modal)
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service_type: resolvedServiceType,
      number_of_people: guestsCount,
      check_in: toISODate(localCheckIn),
      check_out: toISODate(localCheckOut),
      message: formData.selectedPackage
        ? `${t('booking.packPrefix', { pack: formData.selectedPackage })}${formData.additionalMessage.trim() ? ' — ' + formData.additionalMessage.trim() : ''}`
        : formData.additionalMessage.trim(),
    };

    try {
      await getCsrfCookie();
      await api.post('/reservations', payload);
      setSuccess(true);
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose(true);
      }, 3000);
    } catch (err) {
      console.error('Reservation submit error:', err);
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        const msg = err.response?.data?.message || t('booking.submitError');
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(false)}
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="bg-[#FDFBF7]/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 max-w-lg w-full relative z-10 overflow-visible max-h-[90vh] overflow-y-auto"
          >
            {success ? (
              /* Success View */
              <div className="text-center py-8 space-y-6">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="font-headline-md text-2xl text-primary font-bold">{t('booking.requestSent')}</h3>
                  <p className="text-on-surface-variant/80 text-sm max-w-md mx-auto leading-relaxed">
                    {t('booking.requestSentDesc')}
                  </p>
                </motion.div>
              </div>
            ) : (
              /* Form View */
              <div className="space-y-6 text-left">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
                  <div>
                    <h3 className="font-headline-md text-xl text-primary font-bold">{t('booking.finalizeRequest')}</h3>
                    <p className="text-xs text-on-surface-variant/85 mt-1 font-semibold">
                      {localCheckIn && localCheckOut
                        ? <>{t('booking.stayFrom', { checkIn: formatDateLocale(localCheckIn), checkOut: formatDateLocale(localCheckOut) })}{initialData?.guests ? ` • ${initialData.guests}` : ''}</>
                        : <>{t('booking.selectDatesBelow')}{initialData?.guests ? ` • ${initialData.guests}` : ''}</>}
                    </p>
                  </div>
                  <button
                    onClick={() => onClose(false)}
                    className="text-on-surface-variant/70 hover:text-primary transition-colors p-1 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* General API Error Notification */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={16} className="text-rose-500 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* ── Custom Calendar Date Selectors ─────────────────── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Check-in */}
                    <div className="relative w-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar size={11} strokeWidth={2.5} className="text-[#E76F51]" />
                        <label className="text-[10px] font-bold text-[#E76F51] uppercase tracking-wider">
                          {t('booking.arrivalDate')}
                        </label>
                        {datesLoading && (
                          <span className="ml-auto flex items-center gap-1 text-[8px] font-semibold text-slate-400 uppercase tracking-wider">
                            <span className="w-1 h-1 rounded-full bg-[#E76F51] animate-pulse" />
                            {t('booking.loading')}
                          </span>
                        )}
                      </div>
                      
                      <ModalDateInput
                        value={formatDateLocale(localCheckIn)}
                        onClick={() => {
                          if (!loading) {
                            setIsCheckInOpen(!isCheckInOpen);
                            setIsCheckOutOpen(false);
                            setSelectOpen(false);
                          }
                        }}
                        placeholder={t('booking.chooseDate')}
                      />

                      <AnimatePresence>
                        {isCheckInOpen && (
                          <>
                            {/* Backdrop click-outside helper */}
                            <div className="fixed inset-0 z-[50]" onClick={() => setIsCheckInOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-[60] mt-2 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full max-w-[90vw]"
                            >
                              <DatePicker
                                selected={localCheckIn}
                                onChange={(date) => {
                                  setLocalCheckIn(date);
                                  setIsCheckInOpen(false);
                                  // Auto-clear checkout if it's now before or equal to the new checkin
                                  if (localCheckOut && date && localCheckOut <= date) {
                                    setLocalCheckOut(null);
                                  }
                                  if (errors.check_in) setErrors({ ...errors, check_in: null });
                                }}
                                excludeDates={bookedDates}
                                minDate={startOfDay(new Date())}
                                inline
                                locale={currentLocale}
                                calendarClassName="azul-dp-popper"
                                calendarContainer={CalendarLegendWithT}
                              />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      {errors.check_in && (
                        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1.5 pl-1">
                          <AlertCircle size={12} className="shrink-0 text-rose-500" />
                          <span>{errors.check_in[0] || errors.check_in}</span>
                        </p>
                      )}
                    </div>

                    {/* Check-out */}
                    <div className="relative w-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar size={11} strokeWidth={2.5} className="text-[#E76F51]" />
                        <label className="text-[10px] font-bold text-[#E76F51] uppercase tracking-wider">
                          {t('booking.departureDate')}
                        </label>
                      </div>

                      <ModalDateInput
                        value={formatDateLocale(localCheckOut)}
                        onClick={() => {
                          if (!loading) {
                            setIsCheckOutOpen(!isCheckOutOpen);
                            setIsCheckInOpen(false);
                            setSelectOpen(false);
                          }
                        }}
                        placeholder={t('booking.chooseDate')}
                      />

                      <AnimatePresence>
                        {isCheckOutOpen && (
                          <>
                            {/* Backdrop click-outside helper */}
                            <div className="fixed inset-0 z-[50]" onClick={() => setIsCheckOutOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-[60] mt-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 top-full max-w-[90vw]"
                            >
                              <DatePicker
                                selected={localCheckOut}
                                onChange={(date) => {
                                  setLocalCheckOut(date);
                                  setIsCheckOutOpen(false);
                                  if (errors.check_out) setErrors({ ...errors, check_out: null });
                                }}
                                excludeDates={bookedDates}
                                minDate={
                                  localCheckIn
                                    ? new Date(localCheckIn.getTime() + 86_400_000)
                                    : startOfDay(new Date())
                                }
                                inline
                                locale={currentLocale}
                                calendarClassName="azul-dp-popper"
                                calendarContainer={CalendarLegendWithT}
                              />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      {errors.check_out && (
                        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1.5 pl-1">
                          <AlertCircle size={12} className="shrink-0 text-rose-500" />
                          <span>{errors.check_out[0] || errors.check_out}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <FloatingInput
                    label={t('booking.fullName')}
                    id="booking_name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    error={errors.name}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput
                      label={t('booking.emailAddress')}
                      id="booking_email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      error={errors.email}
                    />
                    <FloatingInput
                      label={t('booking.phoneNumber')}
                      id="booking_phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      error={errors.phone}
                    />
                  </div>

                  {/* Custom Premium Select Dropdown */}
                  <div className="relative space-y-1.5">
                    <label className="text-[10px] font-bold text-[#E76F51] uppercase tracking-wider block">
                      {t('booking.serviceType')}
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          if (!loading) {
                            setSelectOpen(!selectOpen);
                            setIsCheckInOpen(false);
                            setIsCheckOutOpen(false);
                          }
                        }}
                        disabled={loading}
                        className="w-full bg-white/40 border border-outline-variant/30 rounded-xl py-3.5 px-4 text-sm text-left font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 flex items-center justify-between cursor-pointer"
                      >
                        <span>
                          {packages.find(p => p.value === formData.selectedPackage)?.label || t('booking.choosePack')}
                        </span>
                        <motion.div
                          animate={{ rotate: selectOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#E76F51]"
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {selectOpen && (
                          <>
                            {/* Backdrop click-outside helper for dropdown */}
                            <div className="fixed inset-0 z-30" onClick={() => setSelectOpen(false)} />
                            <motion.ul
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-40 w-full mt-2 bg-[#FDFBF7] border border-outline-variant/30 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-hidden divide-y divide-slate-100"
                            >
                              {packages.map((pkg) => (
                                <li key={pkg.value}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, selectedPackage: pkg.value });
                                      setSelectOpen(false);
                                      if (errors.service_type) {
                                        setErrors({ ...errors, service_type: null });
                                      }
                                    }}
                                    className={`w-full text-left px-4 py-3.5 text-sm transition-colors hover:bg-[#E76F51]/5 hover:text-[#E76F51] ${
                                      formData.selectedPackage === pkg.value
                                        ? 'bg-[#E76F51]/10 text-[#E76F51] font-semibold'
                                        : 'text-slate-700'
                                    }`}
                                  >
                                    {pkg.label}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.service_type && (
                      <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1.5 pl-1">
                        <AlertCircle size={12} className="shrink-0 text-rose-500" />
                        <span>{errors.service_type[0] || errors.service_type}</span>
                      </p>
                    )}
                  </div>

                  <FloatingTextarea
                    label={t('booking.messageOptional')}
                    id="booking_message"
                    name="additionalMessage"
                    value={formData.additionalMessage}
                    onChange={handleChange}
                    disabled={loading}
                    error={errors.additionalMessage}
                  />

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={!loading && localCheckIn && localCheckOut ? { scale: 1.02 } : {}}
                      whileTap={!loading && localCheckIn && localCheckOut ? { scale: 0.98 } : {}}
                      disabled={loading || !localCheckIn || !localCheckOut}
                      className="w-full bg-[#E76F51] text-white hover:bg-[#d46247] disabled:bg-slate-400 disabled:cursor-not-allowed py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors shadow-lg shadow-[#E76F51]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>{t('booking.processing')}</span>
                        </>
                      ) : !localCheckIn || !localCheckOut ? (
                        <span>{t('booking.selectYourDates')}</span>
                      ) : (
                        <span>{t('booking.sendRequest')}</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
