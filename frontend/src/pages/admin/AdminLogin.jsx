import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import api, { getCsrfCookie } from '../../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sanctum CSRF handshake
      await getCsrfCookie();

      // Attempt admin login
      const response = await api.post('/admin/login', {
        email: email,
        password: password
      });
      const { token, user } = response.data;

      // Store credentials in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('adminUser', JSON.stringify(user));

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      const msg = err.response?.data?.message || 'Identifiants de connexion invalides ou rôle insuffisant.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden font-body-md">
      {/* Decorative ocean gradient blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#004655]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E76F51]/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl p-8 rounded-3xl relative z-10"
      >
        {/* Brand/Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#004655]/5 flex items-center justify-center mx-auto mb-4 text-[#004655]">
            <ShieldAlert size={32} />
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-[#004655]">Azul Surf Morocco</h2>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
        </div>

        {/* Errors */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 mb-6"
          >
            <AlertCircle size={16} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder=" "
              className="peer w-full bg-white/50 border border-outline-variant/30 rounded-xl pt-6 pb-2 px-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2.5 text-[10px] font-bold text-[#E76F51] uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left 
                peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100
                peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#E76F51] peer-focus:translate-y-0 peer-focus:scale-100
                -translate-y-1 scale-100"
            >
              Adresse Email
            </label>
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder=" "
              className="peer w-full bg-white/50 border border-outline-variant/30 rounded-xl pt-6 pb-2 px-4 text-sm font-medium text-slate-800 outline-hidden transition-all duration-200 focus:border-[#E76F51] focus:bg-white focus:ring-2 focus:ring-[#E76F51]/10 placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2.5 text-[10px] font-bold text-[#E76F51] uppercase tracking-wider transition-all duration-200 pointer-events-none origin-left 
                peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100
                peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#E76F51] peer-focus:translate-y-0 peer-focus:scale-100
                -translate-y-1 scale-100"
            >
              Mot de Passe
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-[#E76F51] text-white hover:bg-[#d46247] disabled:bg-slate-400 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#E76F51]/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <span>Se Connecter</span>
            )}
          </motion.button>
        </form>

        {/* Footer info */}
        <div className="text-center mt-8 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Azul Surf Morocco • Espace Sécurisé</p>
        </div>
      </motion.div>
    </div>
  );
}
