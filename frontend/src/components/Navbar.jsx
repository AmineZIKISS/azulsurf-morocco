import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
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
    { path: '/gallery', label: 'Galerie' },
    { path: '/surf-packages', label: 'Surf Packages' },
    { path: '/surf-camp', label: 'Surf Camp' },
    { path: '/surf-school', label: 'Surf School' },
    { path: '/surf-guiding', label: 'Surf Guiding' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' }
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
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-1 max-w-container-max mx-auto">
          {/* Logo / Brand Name */}
          <Link 
            className="flex items-center space-x-1.5 font-headline-md text-xl md:text-2xl text-primary transition-opacity duration-300 hover:opacity-90" 
            to="/"
          >
            <span className="font-bold tracking-[0.25em]">AZUL</span> 
            <span className="font-light tracking-[0.15em] opacity-80 text-[0.8em]">SURF</span>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Actions (Language Switcher & CTA Button) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-on-surface-variant text-[11px] font-semibold tracking-wider">
              <span className="text-primary cursor-pointer font-bold hover:opacity-100 transition-opacity">EN</span>
              <span className="opacity-20">|</span>
              <span className="hover:text-primary cursor-pointer opacity-70 hover:opacity-100 transition-all">FR</span>
              <span className="opacity-20">|</span>
              <span className="hover:text-primary cursor-pointer opacity-70 hover:opacity-100 transition-all">AR</span>
            </div>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E76F51] text-white px-7 py-2.5 rounded-full font-label-md text-[13px] uppercase tracking-widest hover:bg-[#d46247] transition-colors shadow-md shadow-[#E76F51]/20 hover:shadow-lg hover:shadow-[#E76F51]/30 cursor-pointer"
              >
                Réserver
              </motion.button>
            </Link>
          </div>

          {/* Mobile Actions: Menu toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <Link to="/contact">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-[#E76F51] text-white px-5 py-2 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-[#d46247] shadow-sm cursor-pointer"
              >
                Réserver
              </motion.button>
            </Link>

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
                        `font-label-md text-base uppercase tracking-widest block transition-colors ${
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
                <div className="flex gap-4 text-xs font-semibold tracking-wider text-on-surface-variant justify-center">
                  <span className="text-primary font-bold cursor-pointer">EN</span>
                  <span className="opacity-20">|</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">FR</span>
                  <span className="opacity-20">|</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">AR</span>
                </div>
                <p className="text-center text-[10px] text-on-surface-variant/60 tracking-wider">
                  HIGH-END COASTAL TRANQUILITY
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
