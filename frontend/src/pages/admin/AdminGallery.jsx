import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Image as ImageIcon, Plus, Edit, Trash2, Loader2, X,
  Check, AlertCircle, Info, Globe, Sparkles, Filter
} from 'lucide-react';
import api from '../../services/api';

export default function AdminGallery() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  
  // Alert notifications
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form State
  const [titleFr, setTitleFr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Surf');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Filtering
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Translation tab inside the form
  const [formLang, setFormLang] = useState('fr');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchGallery = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/gallery');
      if (response.data && response.data.data) {
        setItems(response.data.data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error('Fetch gallery error:', err);
      setError(t('adminGallery.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedItem(null);
    setTitleFr('');
    setTitleEn('');
    setCategory('Surf');
    setIsActive(true);
    setImageFile(null);
    setImagePreview('');
    setFormLang('fr');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setTitleFr(item.title?.fr || item.title || '');
    setTitleEn(item.title?.en || '');
    setCategory(item.category || 'Surf');
    setIsActive(item.is_active !== undefined ? item.is_active : true);
    setImageFile(null);
    setImagePreview(item.image_path || ''); // URL of the uploaded image
    setFormLang('fr');
    setError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError(t('adminGallery.sizeError'));
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    // For new item, image is required
    if (!selectedItem && !imageFile) {
      setError(t('adminGallery.imageRequired'));
      setSubmitLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      
      // Title is optional, but if filled we send it
      if (titleFr || titleEn) {
        formData.append('title[fr]', titleFr || titleEn);
        formData.append('title[en]', titleEn || titleFr);
      }
      
      formData.append('category', category);
      formData.append('is_active', isActive ? '1' : '0');

      if (imageFile) {
        formData.append('image_path', imageFile);
      }

      if (selectedItem) {
        formData.append('_method', 'PUT');
        await api.post(`/admin/gallery/${selectedItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess(t('adminGallery.updateSuccess'));
      } else {
        await api.post('/admin/gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess(t('adminGallery.createSuccess'));
      }

      fetchGallery();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submit gallery error:', err);
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

  const triggerDeleteConfirm = (item) => {
    setItemToDelete(item);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoadingId(itemToDelete.id);
    setIsDeleteConfirmOpen(false);
    setError('');
    
    try {
      await api.delete(`/admin/gallery/${itemToDelete.id}`);
      setSuccess(t('adminGallery.deleteSuccess'));
      fetchGallery();
    } catch (err) {
      console.error('Delete gallery error:', err);
      setError(t('adminGallery.deleteError'));
    } finally {
      setDeleteLoadingId(null);
      setItemToDelete(null);
    }
  };

  const filteredItems = items.filter(item => {
    if (filterCategory === 'All') return true;
    return item.category === filterCategory;
  });

  const categories = ['Surf', 'Camp', 'Activities', 'Trips', 'Food'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200/50">
        <div>
          <h2 className="font-headline-md text-3xl font-bold text-[#004655]">{t('adminGallery.title')}</h2>
          <p className="text-xs text-slate-400 mt-1">{t('adminGallery.subtitle')}</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#d46247] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#E76F51]/15 hover:shadow-lg cursor-pointer border-none"
        >
          <Plus size={16} />
          <span>{t('adminGallery.addPhoto')}</span>
        </button>
      </header>

      {/* Notifications */}
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

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/85 shadow-2xs">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1.5">
          <Filter size={14} />
          {t('adminGallery.filter')}
        </span>
        <button
          onClick={() => setFilterCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
            filterCategory === 'All' 
              ? 'bg-[#004655] text-white border-[#004655]' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {t('adminGallery.all')} ({items.length})
        </button>
        {categories.map(cat => {
          const count = items.filter(i => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                filterCategory === cat 
                  ? 'bg-[#004655] text-white border-[#004655]' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-200/80 rounded-3xl gap-3">
          <Loader2 className="animate-spin text-[#E76F51]" size={36} />
          <p className="text-sm font-medium">{t('adminGallery.loading')}</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-200/80 rounded-3xl gap-3">
          <Info size={36} className="text-slate-300" />
          <p className="text-sm font-medium">{t('adminGallery.emptyState')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md ${
                item.is_active ? 'border-slate-200' : 'border-slate-200 opacity-60'
              }`}
            >
              {/* Photo Area */}
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                <img 
                  src={item.image_path} 
                  alt={item.title?.fr || 'Gallery item'} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category tag */}
                <span className="absolute top-2 left-2 bg-[#004655] text-white font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                  {item.category}
                </span>

                {/* Inactive overlay flag */}
                {!item.is_active && (
                  <span className="absolute top-2 right-2 bg-slate-800 text-white font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                    Inactif
                  </span>
                )}
              </div>

              {/* Text Info & actions */}
              <div className="p-3.5 space-y-3">
                <div className="min-h-8">
                  <h4 className="font-semibold text-slate-800 text-xs truncate">
                    {item.title?.fr || item.title?.en || t('adminGallery.untitled')}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {t('adminGallery.addedOn')} {new Date(item.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="flex gap-2 justify-end border-t border-slate-100 pt-2.5">
                  {deleteLoadingId === item.id ? (
                    <Loader2 size={16} className="animate-spin text-slate-400" />
                  ) : (
                    <>
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer transition-colors"
                        title="Modifier"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        onClick={() => triggerDeleteConfirm(item)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                    {selectedItem ? t('adminGallery.editPhoto') : t('adminGallery.addPhoto')}
                  </h3>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest mt-0.5">
                    {selectedItem ? `Photo ID: #${selectedItem.id}` : 'Nouveau visuel Azul Surf'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="flex border-b border-slate-100 pb-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormLang('fr')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                      formLang === 'fr' ? 'bg-[#004655] text-white border-[#004655]' : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    <Globe size={12} />
                    <span>{t('adminGallery.langFr')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLang('en')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                      formLang === 'en' ? 'bg-[#004655] text-white border-[#004655]' : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    <Globe size={12} />
                    <span>{t('adminGallery.langEn')}</span>
                  </button>
                </div>

                <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  {formLang === 'fr' ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminGallery.titleFr')}</label>
                      <input
                        type="text"
                        value={titleFr}
                        onChange={(e) => setTitleFr(e.target.value)}
                        placeholder={t('adminGallery.titleFrPlaceholder')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminGallery.titleEn')}</label>
                      <input
                        type="text"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        placeholder={t('adminGallery.titleEnPlaceholder')}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('adminGallery.category')}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#004655]/20 focus:border-[#004655] text-sm text-slate-800"
                  >
                    <option value="Surf">{t('adminGallery.catSurf')}</option>
                    <option value="Camp">{t('adminGallery.catCamp')}</option>
                    <option value="Activities">{t('adminGallery.catActivities')}</option>
                    <option value="Trips">{t('adminGallery.catTrips')}</option>
                    <option value="Food">{t('adminGallery.catFood')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t('adminGallery.image')}</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-[#004655] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer h-32 relative overflow-hidden"
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-semibold">{t('adminGallery.changeImage')}</span>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1">
                          <ImageIcon className="text-slate-400 mx-auto h-8 w-8" />
                          <p className="text-[11px] text-slate-500 font-medium">{t('adminGallery.selectPhoto')}</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 bg-[#004655]/5 rounded-2xl border border-[#004655]/10">
                      <div>
                        <span className="text-xs font-bold text-[#004655] uppercase tracking-wider block">{t('adminGallery.visiblePublic')}</span>
                        <span className="text-[10px] text-slate-500">{t('adminGallery.showInGallery')}</span>
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
                        <span>{t('adminGallery.saving')}</span>
                      </>
                    ) : (
                      <span>{t('adminGallery.save')}</span>
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
                <h3 className="text-base font-bold text-slate-900">{t('adminGallery.deleteConfirmTitle')}</h3>
                <p className="text-xs text-slate-500">
                  Voulez-vous vraiment supprimer définitivement cette photo de votre galerie ?
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
