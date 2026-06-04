import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import api from '../services/api';

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

export default function BookingModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: 'room',
    additionalMessage: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [selectOpen, setSelectOpen] = useState(false);

  const services = [
    { value: 'room', label: 'Hébergement Surf Camp (Chambre)' },
    { value: 'package', label: 'Package Tout-Inclus' },
    { value: 'surf_lesson', label: 'Cours de Surf (École)' },
    { value: 'guiding', label: 'Guidage / Surf Guiding' },
  ];

  // Format dates to friendly French
  const formatDateFrench = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError('');
      setErrors({});
      setSelectOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: 'room',
        additionalMessage: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

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

    // Build the payload mapping
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.service_type,
      number_of_people: guestsCount,
      check_in: initialData?.checkIn || new Date().toISOString().split('T')[0],
      check_out: initialData?.checkOut || new Date().toISOString().split('T')[0],
      message: formData.additionalMessage.trim(),
    };

    try {
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
        const msg = err.response?.data?.message || 'Une erreur est survenue lors de la soumission.';
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
            className="bg-[#FDFBF7]/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 max-w-lg w-full relative z-10 overflow-visible"
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
                  <h3 className="font-headline-md text-2xl text-primary font-bold">Réservation Confirmée !</h3>
                  <p className="text-on-surface-variant/80 text-sm max-w-xs mx-auto leading-relaxed">
                    Votre demande a bien été reçue. Notre équipe vous contactera par e-mail ou par téléphone sous 24 heures pour finaliser votre séjour.
                  </p>
                </motion.div>
              </div>
            ) : (
              /* Form View */
              <div className="space-y-6 text-left">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
                  <div>
                    <h3 className="font-headline-md text-xl text-primary font-bold">Finaliser la Demande</h3>
                    {initialData && (
                      <p className="text-xs text-on-surface-variant/85 mt-1 font-semibold">
                        Séjour du {formatDateFrench(initialData.checkIn)} au {formatDateFrench(initialData.checkOut)} • {initialData.guests}
                      </p>
                    )}
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
                  <FloatingInput
                    label="Nom Complet"
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
                      label="Adresse Email"
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
                      label="Numéro de Téléphone"
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
                      Type de Service Souhaité
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => !loading && setSelectOpen(!selectOpen)}
                        disabled={loading}
                        className="w-full bg-white/40 border border-outline-variant/30 rounded-xl py-3.5 px-4 text-sm text-left font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 flex items-center justify-between cursor-pointer"
                      >
                        <span>
                          {services.find(s => s.value === formData.service_type)?.label || 'Choisir un service'}
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
                              {services.map((service) => (
                                <li key={service.value}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, service_type: service.value });
                                      setSelectOpen(false);
                                      if (errors.service_type) {
                                        setErrors({ ...errors, service_type: null });
                                      }
                                    }}
                                    className={`w-full text-left px-4 py-3.5 text-sm transition-colors hover:bg-[#E76F51]/5 hover:text-[#E76F51] ${
                                      formData.service_type === service.value
                                        ? 'bg-[#E76F51]/10 text-[#E76F51] font-semibold'
                                        : 'text-slate-700'
                                    }`}
                                  >
                                    {service.label}
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
                    label="Message / Remarques (Optionnel)"
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="w-full bg-[#E76F51] text-white hover:bg-[#d46247] disabled:bg-slate-400 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors shadow-lg shadow-[#E76F51]/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Traitement en cours...</span>
                        </>
                      ) : (
                        <span>Confirmer ma Réservation</span>
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
