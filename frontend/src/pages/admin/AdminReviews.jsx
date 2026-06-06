import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Star, Plus, Edit, Trash2, Loader2, X,
  Check, AlertCircle, Info, Sparkles, StarHalf
} from 'lucide-react';
import api from '../../services/api';

export default function AdminReviews() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  
  // Alert notifications
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isApproved, setIsApproved] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/reviews');
      if (response.data && response.data.data) {
        setReviews(response.data.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('Fetch reviews error:', err);
      setError(t('adminReviews.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedReview(null);
    setClientName('');
    setRating(5);
    setReviewText('');
    setIsApproved(true);
    setIsActive(true);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (review) => {
    setSelectedReview(review);
    setClientName(review.client_name || '');
    setRating(review.rating || 5);
    setReviewText(review.review_text || '');
    setIsApproved(review.is_approved !== undefined ? review.is_approved : true);
    setIsActive(review.is_active !== undefined ? review.is_active : true);
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    if (!clientName.trim()) {
      setError(t('adminReviews.nameRequired'));
      setSubmitLoading(false);
      return;
    }
    if (!reviewText.trim()) {
      setError('Le texte de l\'avis est requis.');
      setSubmitLoading(false);
      return;
    }

    const payload = {
      client_name: clientName,
      rating: Number(rating),
      review_text: reviewText,
      is_approved: isApproved,
      is_active: isActive
    };

    try {
      if (selectedReview) {
        // Standard JSON PUT request
        await api.put(`/admin/reviews/${selectedReview.id}`, payload);
        setSuccess(t('adminReviews.updateSuccess'));
      } else {
        // Standard JSON POST request
        await api.post('/admin/reviews', payload);
        setSuccess(t('adminReviews.createSuccess'));
      }

      fetchReviews();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submit review error:', err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError('Une erreur est survenue lors de l\'enregistrement.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const toggleApproval = async (review) => {
    setStatusLoadingId(review.id);
    try {
      await api.put(`/admin/reviews/${review.id}`, {
        ...review,
        is_approved: !review.is_approved
      });
      setSuccess(`Statut d'approbation mis à jour.`);
      fetchReviews();
    } catch (err) {
      console.error('Toggle approval error:', err);
      setError(t('adminReviews.approvalError'));
    } finally {
      setStatusLoadingId(null);
    }
  };

  const triggerDeleteConfirm = (review) => {
    setReviewToDelete(review);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    setDeleteLoadingId(reviewToDelete.id);
    setIsDeleteConfirmOpen(false);
    setError('');
    
    try {
      await api.delete(`/admin/reviews/${reviewToDelete.id}`);
      setSuccess(t('adminReviews.deleteSuccess'));
      fetchReviews();
    } catch (err) {
      console.error('Delete review error:', err);
      setError('Erreur lors de la suppression de l\'avis.');
    } finally {
      setDeleteLoadingId(null);
      setReviewToDelete(null);
    }
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          className={i <= count ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
        />
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200/50">
        <div>
          <h2 className="font-headline-md text-3xl font-bold text-[#004655]">{t('adminReviews.title')}</h2>
          <p className="text-xs text-slate-400 mt-1">{t('adminReviews.subtitle')}</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#d46247] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#E76F51]/15 hover:shadow-lg cursor-pointer border-none"
        >
          <Plus size={16} />
          <span>{t('adminReviews.addReview')}</span>
        </button>
      </header>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
          >
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError('')} className="text-rose-400 hover:text-rose-700 bg-transparent border-none cursor-pointer">
              <X size={16} />
            </button>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3"
          >
            <Check size={18} className="text-emerald-500 shrink-0" />
            <span className="flex-1">{success}</span>
            <button onClick={() => setSuccess('')} className="text-emerald-400 hover:text-emerald-700 bg-transparent border-none cursor-pointer">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-slate-200/80 shadow-xs rounded-3xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-[#004655] text-sm">{t('adminReviews.collectedReviews')} ({reviews.length})</h3>
          <span className="bg-[#004655]/5 text-[#004655] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            CMS Actif
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="animate-spin text-[#E76F51]" size={36} />
              <p className="text-sm font-medium">{t('adminReviews.loading')}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Info size={36} className="text-slate-300" />
              <p className="text-sm font-medium">{t('adminReviews.emptyState')}</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">{t('adminReviews.colClient')}</th>
                  <th className="px-6 py-4">{t('adminReviews.colRating')}</th>
                  <th className="px-6 py-4 w-96">{t('adminReviews.colMessage')}</th>
                  <th className="px-6 py-4">{t('adminReviews.colApproved')}</th>
                  <th className="px-6 py-4">{t('adminReviews.colVisibility')}</th>
                  <th className="px-6 py-4 text-right">{t('adminReviews.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-[#FDFBF7]/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#004655]">
                      {review.client_name}
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-xs">
                      <p className="line-clamp-2 leading-relaxed" title={review.review_text}>
                        {review.review_text}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {statusLoadingId === review.id ? (
                        <Loader2 size={14} className="animate-spin text-slate-400" />
                      ) : (
                        <button
                          onClick={() => toggleApproval(review)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-colors ${
                            review.is_approved 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-250 hover:bg-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-250 hover:bg-amber-100'
                          }`}
                        >
                          {review.is_approved ? t('adminReviews.yes') : t('adminReviews.pending')}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        review.is_active 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {review.is_active ? t('adminReviews.active') : t('adminReviews.hidden')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {deleteLoadingId === review.id ? (
                          <Loader2 size={16} className="animate-spin text-slate-400 mr-2" />
                        ) : (
                          <>
                            <button
                              onClick={() => openEditModal(review)}
                              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => triggerDeleteConfirm(review)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
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
      </div>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 bg-[#004655] text-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Sparkles className="text-[#E76F51] h-5 w-5" />
                    {selectedReview ? t('adminReviews.editReview') : t('adminReviews.createReview')}
                  </h3>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest mt-0.5">
                    {selectedReview ? `Témoignage ID: #${selectedReview.id}` : 'Avis client Azul Surf'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminReviews.clientName')}</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t('adminReviews.clientNamePlaceholder')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminReviews.rating')}</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                    >
                      <option value="5">{t('adminReviews.stars5')}</option>
                      <option value="4">{t('adminReviews.stars4')}</option>
                      <option value="3">{t('adminReviews.stars3')}</option>
                      <option value="2">{t('adminReviews.stars2')}</option>
                      <option value="1">{t('adminReviews.stars1')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminReviews.reviewMessage')}</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t('adminReviews.reviewMessagePlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                  />
                </div>

                {/* Status Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-[#004655]/5 rounded-2xl border border-[#004655]/10">
                    <div>
                      <span className="text-xs font-bold text-[#004655] uppercase tracking-wider block">{t('adminReviews.colApproved')}</span>
                      <span className="text-[10px] text-slate-500">{t('adminReviews.validatePublish')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsApproved(!isApproved)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer outline-none border-none p-0 flex items-center ${
                        isApproved ? 'bg-[#E76F51]' : 'bg-slate-300'
                      }`}
                    >
                      <motion.span 
                        layout
                        className="w-4 h-4 bg-white rounded-full absolute shadow-sm"
                        animate={{ left: isApproved ? '26px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#004655]/5 rounded-2xl border border-[#004655]/10">
                    <div>
                      <span className="text-xs font-bold text-[#004655] uppercase tracking-wider block">Actif</span>
                      <span className="text-[10px] text-slate-500">{t('adminReviews.visibleSite')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsActive(!isActive)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer outline-none border-none p-0 flex items-center ${
                        isActive ? 'bg-[#E76F51]' : 'bg-slate-300'
                      }`}
                    >
                      <motion.span 
                        layout
                        className="w-4 h-4 bg-white rounded-full absolute shadow-sm"
                        animate={{ left: isActive ? '26px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold text-sm transition-colors cursor-pointer bg-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="px-6 py-2.5 rounded-xl bg-[#004655] hover:bg-[#003844] text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer border-none disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t('adminReviews.saving')}</span>
                      </>
                    ) : (
                      <span>{t('adminReviews.save')}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 p-6 space-y-4"
            >
              <div className="h-12 w-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mx-auto">
                <Trash2 size={20} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-base font-bold text-slate-900">{t('adminReviews.deleteConfirmTitle')}</h3>
                <p className="text-xs text-slate-500">
                  {t('adminReviews.deleteConfirmDesc')} <span className="font-semibold text-slate-700">"{reviewToDelete?.client_name}"</span> ? {t('adminReviews.deleteConfirmWarning')}
                </p>
              </div>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold text-sm transition-colors cursor-pointer bg-white"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all shadow-md cursor-pointer border-none"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
