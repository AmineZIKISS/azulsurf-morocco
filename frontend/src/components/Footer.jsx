import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(t('footer.subscribeAlert'));
  };

  // Framer Motion variants for scroll entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 18 
      } 
    }
  };

  return (
    <footer className="bg-[#FDFBF7] border-t border-black/5 relative overflow-hidden">
      {/* Dynamic Grid Reveal on Scroll */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto relative z-10"
      >
        {/* Column 1: Brand & Socials */}
        <motion.div variants={columnVariants} className="space-y-6">
          <Link className="flex items-center space-x-1.5 font-headline-md text-xl text-primary" to="/">
            <span className="font-bold tracking-[0.25em]">AZUL</span> 
            <span className="font-light tracking-[0.15em] opacity-80 text-[0.8em]">SURF</span>
          </Link>
          <p className="text-on-surface-variant/80 font-body-md text-sm leading-relaxed max-w-xs">
            {t('footer.brandDescription')}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <motion.a 
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white transition-colors duration-300"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.15, rotate: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white transition-colors duration-300"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Column 2: Experiences */}
        <motion.div variants={columnVariants} className="space-y-6">
          <h4 className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">{t('footer.experiences')}</h4>
          <ul className="space-y-3 font-body-md text-sm">
            <li>
              <Link 
                className="inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-primary text-on-surface-variant/80" 
                to="/surf-school"
              >
                {t('nav.surfSchool')}
              </Link>
            </li>
            <li>
              <Link 
                className="inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-primary text-on-surface-variant/80" 
                to="/surf-guiding"
              >
                {t('nav.surfGuiding')}
              </Link>
            </li>
            <li>
              <Link 
                className="inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-primary text-on-surface-variant/80" 
                to="/surf-packages"
              >
                {t('nav.surfPackages')}
              </Link>
            </li>
            <li>
              <Link 
                className="inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-primary text-on-surface-variant/80" 
                to="/gallery"
              >
                {t('nav.gallery')}
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 3: Contact */}
        <motion.div variants={columnVariants} className="space-y-6">
          <h4 className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">{t('footer.contactUs')}</h4>
          <ul className="space-y-4 font-body-md text-sm text-on-surface-variant/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <span>
                {t('footer.address').split('\n').map((line, i) => (
                  <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href="mailto:hello@azulsurfmirleft.com" className="hover:text-primary transition-colors">
                hello@azulsurfmirleft.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <a href="tel:+212528123456" className="hover:text-primary transition-colors">
                +212 (0) 528 123 456
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Column 4: Newsletter */}
        <motion.div variants={columnVariants} className="space-y-6">
          <h4 className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">{t('footer.newsletter')}</h4>
          <p className="font-body-md text-sm text-on-surface-variant/80">
            {t('footer.newsletterDesc')}
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant/60 focus:border-primary py-2.5 px-0 font-body-md text-sm text-on-surface transition-colors placeholder:text-outline-variant/80" 
                placeholder={t('footer.emailPlaceholder')}
                type="email"
                required
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#E76F51] text-white py-3 rounded-full font-label-md text-xs uppercase tracking-widest hover:bg-[#d46247] transition-colors shadow-md shadow-[#E76F51]/10 hover:shadow-lg hover:shadow-[#E76F51]/20 cursor-pointer flex items-center justify-center gap-2"
              type="submit"
            >
              <span>{t('footer.subscribe')}</span>
              <ArrowRight size={14} />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Copyright Bar */}
      <div className="border-t border-black/5 py-8 text-center px-margin-mobile">
        <p className="font-body-md text-xs text-on-surface-variant/60 tracking-wider">
          {t('footer.copyright', { year: new Date().getFullYear() })} | <Link to="/" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link>
        </p>
      </div>
    </footer>
  );
}
