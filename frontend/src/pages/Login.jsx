import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import api, { getCsrfCookie } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      await getCsrfCookie();

      const response = await api.post('/admin/login', {
        email: email,
        password: password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      const msg = err.response?.data?.message || 'Identifiants de connexion invalides.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Full-screen coastal background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Dark teal overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A3F5C]/80 via-[#004655]/70 to-[#0A3F5C]/85" />

      {/* Animated ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#E76F51]/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#0A3F5C]/20 blur-[100px] pointer-events-none" />

      {/* Glassmorphism Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="backdrop-blur-xl bg-white/[0.92] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.3)] rounded-2xl p-10">
          {/* Brand Header */}
          <div className="text-center mb-9">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A3F5C] to-[#004655] flex items-center justify-center shadow-lg shadow-[#0A3F5C]/30 mb-5"
            >
              <Waves size={28} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A3F5C]">
              Portail d'Administration
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 uppercase tracking-[0.2em] font-semibold">
              Azul Surf Morocco
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 mb-6"
            >
              <AlertCircle size={15} className="shrink-0 text-rose-500" />
              <span className="font-medium">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder=" "
                className="peer w-full bg-slate-50/80 border border-slate-200/80 rounded-xl pt-6 pb-2.5 pl-12 pr-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 placeholder-transparent disabled:opacity-60"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#E76F51] transition-colors duration-200">
                <Mail size={16} />
              </span>
              <label
                htmlFor="login-email"
                className="absolute left-12 top-2 text-[10px] font-bold text-[#E76F51] uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left
                  peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                  peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#E76F51] peer-focus:top-2 peer-focus:translate-y-0"
              >
                Adresse Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder=" "
                className="peer w-full bg-slate-50/80 border border-slate-200/80 rounded-xl pt-6 pb-2.5 pl-12 pr-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 placeholder-transparent disabled:opacity-60"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#E76F51] transition-colors duration-200">
                <Lock size={16} />
              </span>
              <label
                htmlFor="login-password"
                className="absolute left-12 top-2 text-[10px] font-bold text-[#E76F51] uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left
                  peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                  peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#E76F51] peer-focus:top-2 peer-focus:translate-y-0"
              >
                Mot de Passe
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, boxShadow: '0 12px 35px rgba(231, 111, 81, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#E76F51] to-[#e8856b] text-white disabled:from-slate-400 disabled:to-slate-400 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#E76F51]/20 flex items-center justify-center gap-2.5 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Connexion en cours…</span>
                </>
              ) : (
                <span>Se Connecter</span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Espace sécurisé</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Footer Note */}
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            Accès réservé aux administrateurs autorisés.
            <br />
            © {new Date().getFullYear()} Azul Surf Morocco — Mirleft, Maroc
          </p>
        </div>
      </motion.div>
    </div>
  );
}
