import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Eye, Trash2, Loader2, X, AlertCircle, Info, Check,
  Phone, Calendar, User, Sparkles
} from 'lucide-react';
import api from '../../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoadingId, setDetailLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  
  // Alert notifications
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/contacts');
      if (response.data && response.data.data) {
        setMessages(response.data.data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
      setError('Impossible de charger les messages. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const openDetailModal = async (msg) => {
    setDetailLoadingId(msg.id);
    setError('');
    try {
      // Fetch specific message details.
      // The Laravel endpoint App\Http\Controllers\Admin\ContactController@show
      // automatically marks the message as read if it isn't.
      const response = await api.get(`/admin/contacts/${msg.id}`);
      if (response.data && response.data.data) {
        setSelectedMessage(response.data.data);
        setIsDetailOpen(true);
        
        // Update local list state to show it is read
        setMessages(prev => 
          prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m)
        );
      }
    } catch (err) {
      console.error('Fetch message detail error:', err);
      setError('Erreur lors du chargement des détails du message.');
    } finally {
      setDetailLoadingId(null);
    }
  };

  const triggerDeleteConfirm = (msg) => {
    setMessageToDelete(msg);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    setDeleteLoadingId(messageToDelete.id);
    setIsDeleteConfirmOpen(false);
    setError('');
    
    try {
      await api.delete(`/admin/contacts/${messageToDelete.id}`);
      setSuccess('Message supprimé avec succès.');
      fetchMessages();
      if (selectedMessage?.id === messageToDelete.id) {
        setIsDetailOpen(false);
      }
    } catch (err) {
      console.error('Delete message error:', err);
      setError('Erreur lors de la suppression du message.');
    } finally {
      setDeleteLoadingId(null);
      setMessageToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200/50">
        <div>
          <h2 className="font-headline-md text-3xl font-bold text-[#004655]">Messages de Contact</h2>
          <p className="text-xs text-slate-400 mt-1">Lisez et gérez les demandes d'informations reçues via le formulaire du site.</p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-slate-200 cursor-pointer disabled:opacity-75"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
          <span>Actualiser</span>
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
          <h3 className="font-semibold text-[#004655] text-sm">Boîte de réception ({messages.length} messages)</h3>
          <span className="bg-[#004655]/5 text-[#004655] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            Boîte active
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="animate-spin text-[#E76F51]" size={36} />
              <p className="text-sm font-medium">Chargement de la boîte de réception...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Info size={36} className="text-slate-300" />
              <p className="text-sm font-medium">Aucun message de contact reçu.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 w-28">Statut</th>
                  <th className="px-6 py-4">Expéditeur</th>
                  <th className="px-6 py-4">Sujet / Intérêt</th>
                  <th className="px-6 py-4">Date de réception</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {messages.map((msg) => (
                  <tr key={msg.id} className={`hover:bg-[#FDFBF7]/30 transition-colors ${!msg.is_read ? 'font-semibold bg-[#004655]/[0.01]' : 'text-slate-650'}`}>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${
                        msg.is_read 
                          ? 'bg-slate-100 text-slate-500 border-slate-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {msg.is_read ? 'Lu' : 'Non lu'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#004655]">{msg.full_name}</div>
                      <div className="text-xs text-slate-400 font-normal">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="truncate text-slate-700">{msg.subject || 'Aucun objet'}</div>
                      {msg.selected_service && (
                        <span className="text-[10px] text-[#E76F51] bg-[#E76F51]/5 border border-[#E76F51]/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                          Intérêt: {msg.selected_service}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {detailLoadingId === msg.id ? (
                          <Loader2 size={14} className="animate-spin text-slate-450 mr-2" />
                        ) : deleteLoadingId === msg.id ? (
                          <Loader2 size={14} className="animate-spin text-slate-450 mr-2" />
                        ) : (
                          <>
                            <button
                              onClick={() => openDetailModal(msg)}
                              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#004655] border border-slate-200 transition-colors cursor-pointer"
                              title="Lire le message"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => triggerDeleteConfirm(msg)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                              title="Supprimer"
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

      {/* READ DETAIL MODAL */}
      <AnimatePresence>
        {isDetailOpen && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-[#004655] text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Mail className="text-[#E76F51] h-5 w-5" />
                  <div>
                    <h3 className="text-base font-bold tracking-tight">Lecture du Message</h3>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mt-0.5">
                      Date: {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="text-white/60 hover:text-white bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              {/* Message Details */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-800 text-sm">
                
                {/* Sender Metadata Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User size={16} className="text-[#004655]" />
                    <span className="font-bold">{selectedMessage.full_name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" />
                      <a href={`mailto:${selectedMessage.email}`} className="hover:underline hover:text-[#004655]">
                        {selectedMessage.email}
                      </a>
                    </div>
                    {selectedMessage.phone_number && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <a href={`tel:${selectedMessage.phone_number}`} className="hover:underline">
                          {selectedMessage.phone_number}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Interest */}
                {selectedMessage.selected_service && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service d'intérêt:</span>
                    <span className="bg-[#E76F51]/10 text-[#E76F51] font-semibold text-xs px-2.5 py-0.5 rounded-lg border border-[#E76F51]/20">
                      {selectedMessage.selected_service}
                    </span>
                  </div>
                )}

                {/* Subject */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Sujet</span>
                  <div className="font-semibold text-[#004655] text-base border-b border-slate-100 pb-2">
                    {selectedMessage.subject || 'Aucun objet'}
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Message</span>
                  <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-line text-xs">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => triggerDeleteConfirm(selectedMessage)}
                    className="flex items-center gap-1.5 text-rose-600 hover:text-rose-800 bg-transparent border-none cursor-pointer text-xs font-semibold"
                  >
                    <Trash2 size={14} />
                    Supprimer ce message
                  </button>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="px-5 py-2 rounded-xl bg-[#004655] hover:bg-[#003844] text-white font-semibold text-xs cursor-pointer border-none shadow"
                  >
                    Fermer
                  </button>
                </div>
              </div>
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
                <h3 className="text-base font-bold text-slate-900">Supprimer le Message ?</h3>
                <p className="text-xs text-slate-500">
                  Voulez-vous vraiment supprimer définitivement ce message de <span className="font-semibold text-slate-700">"{messageToDelete?.full_name}"</span> ? cette action est irréversible.
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
