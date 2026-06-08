import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../context/BookingContext';

// ── Language Switcher sub-component ──────────────────────────────────────────
// mode="dropdown" (default, desktop) — animated dropdown menu
// mode="inline"  (mobile drawer)    — flat row of language buttons
const LanguageSwitcher = ({ className = '', mode = 'dropdown' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.substring(0, 2); // normalize "en-US" → "en"

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    if (mode !== 'dropdown') return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode]);

  // ── Inline (mobile) variant ──
  if (mode === 'inline') {
    return (
      <div className={`flex items-center gap-2 text-on-surface-variant text-[11px] font-semibold tracking-wider ${className}`}>
        {languages.map((lang, idx) => (
          <React.Fragment key={lang.code}>
            {idx > 0 && <span className="opacity-20">|</span>}
            <button
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`transition-all duration-200 cursor-pointer ${
                currentLang === lang.code
                  ? 'text-primary font-bold opacity-100'
                  : 'opacity-70 hover:text-primary hover:opacity-100'
              }`}
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // ── Dropdown (desktop) variant ──
  const currentLabel = languages.find((l) => l.code === currentLang)?.label || 'EN';

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-[13px] uppercase tracking-widest cursor-pointer transition-colors duration-300 hover:text-primary"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        {currentLabel}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md overflow-hidden min-w-[80px] z-50
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2.5 text-[13px] font-label-md uppercase tracking-widest
              transition-colors duration-200 cursor-pointer
              ${currentLang === lang.code
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { openBookingModal } = useBooking();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  // Scroll event listener to apply glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/surf-packages', label: t('nav.surfPackages') },
    { path: '/surf-camp', label: t('nav.surfCamp') },
    { path: '/surf-school', label: t('nav.surfSchool') },
    { path: '/surf-guiding', label: t('nav.surfGuiding') },
    { path: '/about', label: t('nav.aboutUs') },
    { path: '/contact', label: t('nav.contactUs') }
  ];

  // Mobile menu slide and stagger variants
  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 250,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        type: 'spring', 
        damping: 35, 
        stiffness: 300 
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#FDFBF7]/90 backdrop-blur-md shadow-sm border-[#e4e2e1]/30 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-container-max mx-auto">

          {/* ── Group 1: Logo ── */}
          <div className="flex-shrink-0">
            <Link 
              className="flex items-center space-x-1.5 font-headline-md text-xl md:text-2xl text-primary transition-opacity duration-300 hover:opacity-90" 
              to="/"
            >
              <span className="font-bold tracking-[0.25em]">AZUL</span> 
              <span className="font-light tracking-[0.15em] opacity-80 text-[0.8em]">SURF</span>
            </Link>
          </div>

          {/* ── Group 2: Desktop Navigation Links ── */}
          <div className="hidden lg:flex items-center gap-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative py-1 font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                  {/* Sliding Underline with framer-motion */}
                  <AnimatePresence>
                    {(hoveredPath === link.path || (hoveredPath === null && isActive)) && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </div>

          {/* ── Group 3: Actions (Language Switcher + Book Now) ── */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher mode="dropdown" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openBookingModal()}
              className="bg-[#E76F51] text-white px-7 py-2.5 rounded-full font-label-md text-[13px] uppercase tracking-widest hover:bg-[#d46247] transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg shadow-[#E76F51]/20 hover:shadow-[#E76F51]/30 cursor-pointer"
            >
              {t('nav.bookNow')}
            </motion.button>
          </div>

          {/* ── Mobile Actions: Menu toggle ── */}
          <div className="flex lg:hidden items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                openBookingModal();
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#E76F51] text-white px-5 py-2 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-[#d46247] shadow-sm cursor-pointer"
            >
              {t('nav.bookNow')}
            </motion.button>

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-primary p-1 hover:opacity-85 transition-opacity"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay / Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs"
            />

            {/* Side Drawer Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-[#FDFBF7] shadow-2xl flex flex-col justify-between p-8 border-l border-[#e4e2e1]/30"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center pb-6 border-b border-[#e4e2e1]/30">
                <span className="font-headline-md text-lg text-primary font-bold tracking-[0.2em]">AZUL</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links inside drawer */}
              <motion.div className="flex flex-col gap-6 my-auto">
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={linkVariants}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => 
                        `font-label-md text-base uppercase tracking-widest block transition-colors duration-300 ${
                          isActive 
                            ? 'text-primary font-semibold border-l-2 border-primary pl-3' 
                            : 'text-on-surface-variant hover:text-primary pl-3'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer info / Language switch inside drawer */}
              <div className="pt-6 border-t border-[#e4e2e1]/30 space-y-4">
                <LanguageSwitcher mode="inline" className="justify-center text-xs" />
                <p className="text-center text-[10px] text-on-surface-variant/60 tracking-wider">
                  {t('nav.tagline')}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
