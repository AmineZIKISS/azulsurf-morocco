import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Plus, Edit, Trash2, Loader2, X, Image as ImageIcon,
  Check, AlertCircle, Info, Globe, Sparkles
} from 'lucide-react';
import api from '../../services/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  
  // Alert notifications
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Form State
  const [titleFr, setTitleFr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionFr, setDescriptionFr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [type, setType] = useState('Surf Guiding');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Translation tab inside the form
  const [formLang, setFormLang] = useState('fr');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/guiding-services');
      if (response.data && response.data.data) {
        setServices(response.data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Fetch services error:', err);
      setError('Impossible de charger les services de guidage. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedService(null);
    setTitleFr('');
    setTitleEn('');
    setDescriptionFr('');
    setDescriptionEn('');
    setType('Surf Guiding');
    setPrice('');
    setIsActive(true);
    setImageFile(null);
    setImagePreview('');
    setFormLang('fr');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setTitleFr(service.title?.fr || service.title || '');
    setTitleEn(service.title?.en || '');
    setDescriptionFr(service.description?.fr || service.description || '');
    setDescriptionEn(service.description?.en || '');
    setType(service.type || 'Surf Guiding');
    setPrice(service.price || '');
    setIsActive(service.is_active !== undefined ? service.is_active : true);
    setImageFile(null);
    setImagePreview(service.image || ''); // URL of the uploaded image
    setFormLang('fr');
    setError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("L'image est trop volumineuse. Taille maximale autorisée: 2 Mo.");
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

    if (!titleFr.trim() && !titleEn.trim()) {
      setError('Veuillez renseigner au moins un titre (FR ou EN).');
      setSubmitLoading(false);
      return;
    }
    if (!price || isNaN(price) || Number(price) < 0) {
      setError('Veuillez saisir un tarif valide.');
      setSubmitLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title[fr]', titleFr || titleEn);
      formData.append('title[en]', titleEn || titleFr);
      formData.append('description[fr]', descriptionFr || descriptionEn);
      formData.append('description[en]', descriptionEn || descriptionFr);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('is_active', isActive ? '1' : '0');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (selectedService) {
        formData.append('_method', 'PUT');
        await api.post(`/admin/guiding-services/${selectedService.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Service de guidage mis à jour avec succès.');
      } else {
        await api.post('/admin/guiding-services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Service de guidage créé avec succès.');
      }

      fetchServices();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submit service error:', err);
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

  const triggerDeleteConfirm = (service) => {
    setServiceToDelete(service);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    setDeleteLoadingId(serviceToDelete.id);
    setIsDeleteConfirmOpen(false);
    setError('');
    
    try {
      await api.delete(`/admin/guiding-services/${serviceToDelete.id}`);
      setSuccess('Service supprimé avec succès.');
      fetchServices();
    } catch (err) {
      console.error('Delete service error:', err);
      setError('Erreur lors de la suppression du service.');
    } finally {
      setDeleteLoadingId(null);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200/50">
        <div>
          <h2 className="font-headline-md text-3xl font-bold text-[#004655]">Gestion des Excursions</h2>
          <p className="text-xs text-slate-400 mt-1">Gérez les excursions, visites guidées et sessions de surf guidées.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#d46247] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#E76F51]/15 hover:shadow-lg cursor-pointer border-none"
        >
          <Plus size={16} />
          <span>Ajouter un Service</span>
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
          <h3 className="font-semibold text-[#004655] text-sm">Services de guidage ({services.length})</h3>
          <span className="bg-[#004655]/5 text-[#004655] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            CMS Actif
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="animate-spin text-[#E76F51]" size={36} />
              <p className="text-sm font-medium">Chargement des guidages...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Info size={36} className="text-slate-300" />
              <p className="text-sm font-medium">Aucun service de guidage configuré. Cliquez sur "Ajouter un Service" pour démarrer.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 w-24">Image</th>
                  <th className="px-6 py-4">Titre / Description</th>
                  <th className="px-6 py-4">Catégorie / Type</th>
                  <th className="px-6 py-4">Tarif</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-[#FDFBF7]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 bg-slate-50 border border-slate-150 rounded-lg overflow-hidden flex items-center justify-center relative shadow-xs">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title?.fr || 'Guiding Service'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="text-slate-300 h-6 w-6" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-semibold text-[#004655]">
                        {service.title?.fr || service.title?.en || 'Service sans nom'}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5" title={service.description?.fr || service.description?.en}>
                        {service.description?.fr || service.description?.en || 'Aucune description'}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-600">
                      <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs">
                        {service.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#004655]">
                      {Number(service.price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        service.is_active 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {service.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {deleteLoadingId === service.id ? (
                          <Loader2 size={16} className="animate-spin text-slate-400 mr-2" />
                        ) : (
                          <>
                            <button
                              onClick={() => openEditModal(service)}
                              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => triggerDeleteConfirm(service)}
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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 bg-[#004655] text-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Sparkles className="text-[#E76F51] h-5 w-5" />
                    {selectedService ? 'Modifier le Service' : 'Créer un Service'}
                  </h3>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest mt-0.5">
                    {selectedService ? `Service ID: #${selectedService.id}` : 'Nouvelle offre de guidage'}
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
                    <span>Français (FR)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLang('en')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                      formLang === 'en' ? 'bg-[#004655] text-white border-[#004655]' : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    <Globe size={12} />
                    <span>English (EN)</span>
                  </button>
                </div>

                <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  {formLang === 'fr' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Titre du Service (FR)</label>
                        <input
                          type="text"
                          value={titleFr}
                          onChange={(e) => setTitleFr(e.target.value)}
                          placeholder="Ex: Excursion Légendaire à Legzira"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description (FR)</label>
                        <textarea
                          rows={3}
                          value={descriptionFr}
                          onChange={(e) => setDescriptionFr(e.target.value)}
                          placeholder="Durée du trajet, visites, guides, ce qui est inclus..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Title (EN)</label>
                        <input
                          type="text"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          placeholder="Ex: Legendary Excursion to Legzira"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description (EN)</label>
                        <textarea
                          rows={3}
                          value={descriptionEn}
                          onChange={(e) => setDescriptionEn(e.target.value)}
                          placeholder="Travel time, places visited, guide details..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catégorie / Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#004655]/20 focus:border-[#004655] text-sm text-slate-800"
                    >
                      <option value="Surf Guiding">Surf Guiding</option>
                      <option value="Local Area Guiding">Local Area Guiding</option>
                      <option value="Adventure Guiding">Adventure Guiding</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tarif (EUR €)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 60"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Image de l'excursion</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-[#004655] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer h-32 relative overflow-hidden"
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-semibold">Changer d'image</span>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1">
                          <ImageIcon className="text-slate-400 mx-auto h-8 w-8" />
                          <p className="text-[11px] text-slate-500 font-medium">Téléverser une photo</p>
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
                        <span className="text-xs font-bold text-[#004655] uppercase tracking-wider block">Statut Actif</span>
                        <span className="text-[10px] text-slate-500">Rendre visible sur le site</span>
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
                        <span>Enreg...</span>
                      </>
                    ) : (
                      <span>Enregistrer</span>
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
                <h3 className="text-base font-bold text-slate-900">Supprimer ce service ?</h3>
                <p className="text-xs text-slate-500">
                  Voulez-vous vraiment supprimer le service <span className="font-semibold text-slate-700">"{serviceToDelete?.title?.fr || serviceToDelete?.title?.en || serviceToDelete?.title}"</span> ? Cette action est définitive.
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
