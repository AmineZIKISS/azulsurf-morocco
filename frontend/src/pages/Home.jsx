import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ArrowRight, Sparkles, X, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format, parseISO, startOfDay } from 'date-fns';
import { fr, es, enUS } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker-coastal.css';
import api from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

// Map i18n language codes to date-fns locale objects
const dateFnsLocales = { fr, es, en: enUS };

// ── Custom transparent input that react-datepicker controls ──────────────────
const DateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="azul-datepicker-input text-left w-full cursor-pointer"
  >
    {value || <span className="italic font-normal" style={{ color: 'rgba(90,114,120,0.55)', fontSize: '0.875rem' }}>{placeholder}</span>}
  </button>
));
DateInput.displayName = 'DateInput';

// ── Luxury Calendar Container & Legend ─────────────────────────────────────────
const CalendarLegend = ({ className, children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-[0_20px_60px_rgba(10,63,92,0.1)] overflow-hidden">
      <div className="p-6">
        <div className={className} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
          {children}
        </div>
      </div>
      <div className="border-t md:border-t-0 md:border-l border-slate-100 p-6 flex flex-col justify-center bg-white min-w-[200px]">
        <h4 className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold mb-5 font-headline-md">{t('home.calendarLegend')}</h4>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#F07167] shadow-[0_0_8px_rgba(240,113,103,0.4)] shrink-0" />
            <span className="text-xs text-slate-700 font-medium">{t('home.selected')}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full border-2 border-[#0A3F5C] bg-transparent shrink-0" />
            <span className="text-xs text-slate-700 font-medium">{t('home.today')}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300 shrink-0" />
            <span className="text-xs text-slate-400 line-through">{t('home.booked')}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-teal-50 border border-teal-100 shrink-0" />
            <span className="text-xs text-slate-600">{t('home.available')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLocale = dateFnsLocales[i18n.language?.substring(0, 2)] || fr;

  const { openBookingModal } = useBooking();
  const [showToast, setShowToast] = useState(false);
  const guestOptions = t('home.guestOptions', { returnObjects: true });
  const [booking, setFormData] = useState({
    checkIn: null,
    checkOut: null,
    guests: guestOptions[1] || '2 Guests',
  });

  const [bookedDates, setBookedDates] = useState([]);
  const [datesLoading, setDatesLoading] = useState(true);

  // Fetch booked dates on mount
  useEffect(() => {
    api.get('/booked-dates')
      .then(res => {
        const dates = (res.data.booked_dates || []).map(d => startOfDay(parseISO(d)));
        setBookedDates(dates);
      })
      .catch(err => console.warn('Could not load booked dates:', err))
      .finally(() => setDatesLoading(false));
  }, []);

  const toISODate = (date) => date ? format(date, 'yyyy-MM-dd') : '';

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    openBookingModal('', {
      checkIn: booking.checkIn ? toISODate(booking.checkIn) : '',
      checkOut: booking.checkOut ? toISODate(booking.checkOut) : '',
      guests: booking.guests,
    });
  };

  // ── Animation variants ────────────────────────────────────────────────────
  const heroTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20, delay: 0.55 },
    },
  };



  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          Layout: full-bleed image → gradient overlay → text (centered)
          The booking card lives *below* the hero, not overlaid on top.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full" style={{ minHeight: '100vh' }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEOiAC1_-GV_CDCXSKQw8kuGUQ-wWpB9FgB-bHnI7HHM82-iiRKDp3MIZSa8huIPSnaXZXuiDRGgZXD4ppaO4SOkgILe0IDhiu5NsBYCGlqJ65a3SIiEbH4gVC-uyOrEH-FYdLBMmCKVu43y_QRY4sIxxJbbPvGe7YO4NxE60gDESnMPFpeCOL-3hpUFCrr3k88L3q98k6LIYs4hteJGNUv5UMHkTbTTl3Fi2PWFgxNVs-veOALyMeTr0ngZLzPLzyX5KLlDdNUag')",
          }}
        >
          {/* Gradient overlay: dark top-to-bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Hero text — vertically centred, strictly above the booking card */}
        <motion.div
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 pb-40"
          style={{ minHeight: '80vh' }}
        >
          {/* Eyebrow label */}
          <motion.span
            variants={fadeUpVariants}
            className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-white/70 mb-5 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5"
          >
            {t('home.heroBadge')}
          </motion.span>

          {/* Main headline — Serif, large, white, clean */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-white font-headline-lg text-4xl md:text-[58px] md:leading-[1.12] tracking-tight font-bold max-w-3xl mb-5"
          >
            {t('home.heroTitle').split('\n').map((line, i) => (
              <React.Fragment key={i}>{i > 0 && <br className="hidden md:inline" />}{line}</React.Fragment>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-white/80 text-base md:text-lg font-body-lg max-w-xl mx-auto"
          >
            {t('home.heroSubtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOOKING CARD — Fully opaque, sits below the hero image.
          No more overlay / transparency / bleed-through.
      ═══════════════════════════════════════════════════════════════════ */}
      {/* overflow-visible is REQUIRED here — any overflow:hidden would clip the calendar popper */}
      <div className="relative -mt-28 z-40 mx-auto max-w-5xl px-4">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full relative"
        >
          {/* ── Premium booking card ── */}
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_40px_rgba(0,70,85,0.13),0_2px_8px_rgba(0,0,0,0.06)] overflow-visible"
          >
            {/* Card header bar */}
            <div className="bg-[#004655] rounded-t-2xl px-6 py-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E76F51] opacity-90" />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/60">
                {t('home.bookingHeader')}
              </span>
              {datesLoading && (
                <span className="ml-auto flex items-center gap-1.5 text-[9px] font-semibold text-white/40 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] animate-pulse" />
                  {t('home.loadingDates')}
                </span>
              )}
              {!datesLoading && (
                <span className="ml-auto flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400/80 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {t('home.calendarSynced')}
                </span>
              )}
            </div>

            {/* Card body — 3 inputs + button */}
            <div className="flex flex-col md:flex-row items-stretch">

              {/* ── Check-in ── */}
              <div className="flex-1 px-6 py-5 border-b md:border-b-0 md:border-r border-slate-100 group">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#E76F51] uppercase tracking-[0.18em] mb-2.5 select-none">
                  <Calendar size={11} strokeWidth={2.5} />
                  {t('home.checkIn')}
                </label>
                <DatePicker
                  selected={booking.checkIn}
                  onChange={(date) => {
                    const newCheckOut =
                      booking.checkOut && date && booking.checkOut <= date
                        ? null
                        : booking.checkOut;
                    setFormData({ ...booking, checkIn: date, checkOut: newCheckOut });
                  }}
                  excludeDates={bookedDates}
                  minDate={startOfDay(new Date())}
                  placeholderText={t('home.chooseDatePlaceholder')}
                  dateFormat="dd MMM yyyy"
                  locale={currentLocale}
                  calendarClassName="azul-dp-popper"
                  wrapperClassName="azul-datepicker-wrapper"
                  popperClassName="absolute z-[100] w-max inline-block"
                  required
                  customInput={<DateInput placeholder={t('home.chooseDatePlaceholder')} />}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    { name: 'offset', options: { offset: [0, 10] } },
                    { name: 'preventOverflow', options: { padding: 12 } },
                    { name: 'flip', options: { fallbackPlacements: ['top-start'] } },
                  ]}
                  calendarContainer={CalendarLegend}
                />
              </div>

              {/* ── Check-out ── */}
              <div className="flex-1 px-6 py-5 border-b md:border-b-0 md:border-r border-slate-100 group">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#E76F51] uppercase tracking-[0.18em] mb-2.5 select-none">
                  <Calendar size={11} strokeWidth={2.5} />
                  {t('home.checkOut')}
                </label>
                <DatePicker
                  selected={booking.checkOut}
                  onChange={(date) => setFormData({ ...booking, checkOut: date })}
                  excludeDates={bookedDates}
                  minDate={
                    booking.checkIn
                      ? new Date(booking.checkIn.getTime() + 86_400_000)
                      : startOfDay(new Date())
                  }
                  placeholderText={t('home.chooseDatePlaceholder')}
                  dateFormat="dd MMM yyyy"
                  locale={currentLocale}
                  calendarClassName="azul-dp-popper"
                  wrapperClassName="azul-datepicker-wrapper"
                  popperClassName="absolute z-[100] w-max inline-block"
                  required
                  customInput={<DateInput placeholder={t('home.chooseDatePlaceholder')} />}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    { name: 'offset', options: { offset: [0, 10] } },
                    { name: 'preventOverflow', options: { padding: 12 } },
                    { name: 'flip', options: { fallbackPlacements: ['top-start'] } },
                  ]}
                  calendarContainer={CalendarLegend}
                />
              </div>

              {/* ── Guests ── */}
              <div className="flex-1 px-6 py-5 border-b md:border-b-0 border-slate-100 group">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#E76F51] uppercase tracking-[0.18em] mb-2.5 select-none">
                  <Users size={11} strokeWidth={2.5} />
                  {t('home.guests')}
                </label>
                <div className="relative">
                  <select
                    value={booking.guests}
                    onChange={(e) => setFormData({ ...booking, guests: e.target.value })}
                    className="w-full bg-transparent border-none p-0 pr-5 text-[#1a2e34] text-sm font-semibold font-body-md outline-none appearance-none cursor-pointer focus:ring-0"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {guestOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#E76F51] pointer-events-none"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* ── Submit button ── */}
              <div className="px-4 py-4 flex items-center justify-center shrink-0">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(231,111,81,0.38)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#E76F51] hover:bg-[#d46247] text-white px-9 py-3.5 rounded-xl font-label-md text-sm uppercase tracking-widest cursor-pointer shadow-lg shadow-[#E76F51]/20 transition-colors duration-200 flex items-center gap-2.5 whitespace-nowrap"
                >
                  <span>{t('home.submitBooking')}</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>

            {/* Selected dates summary bar (appears after selection) */}
            <AnimatePresence>
              {(booking.checkIn || booking.checkOut) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="border-t border-slate-100 px-6 py-3 bg-slate-50/60 rounded-b-2xl flex items-center gap-3 overflow-hidden"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E76F51] shrink-0" />
                  <p className="text-xs text-slate-500 font-medium">
                    {booking.checkIn && (
                      <span>
                        <span className="font-semibold text-[#004655]">{t('home.arrival')}</span>{' '}
                        {format(booking.checkIn, 'dd MMM yyyy', { locale: currentLocale })}
                      </span>
                    )}
                    {booking.checkIn && booking.checkOut && (
                      <span className="mx-2 text-slate-300">•</span>
                    )}
                    {booking.checkOut && (
                      <span>
                        <span className="font-semibold text-[#004655]">{t('home.departure')}</span>{' '}
                        {format(booking.checkOut, 'dd MMM yyyy', { locale: currentLocale })}
                      </span>
                    )}
                    {booking.checkIn && booking.checkOut && (
                      <>
                        <span className="mx-2 text-slate-300">•</span>
                        <span className="text-[#E76F51] font-semibold">
                          {Math.round(
                            (booking.checkOut - booking.checkIn) / 86_400_000
                          )}{' '}{Math.round((booking.checkOut - booking.checkIn) / 86_400_000) > 1 ? t('home.nights') : t('home.night')}
                        </span>
                      </>
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="font-label-md text-primary tracking-[0.3em] uppercase block mb-4">{t('home.discoverAzul')}</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('home.premiumSurfExperiences')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              icon: 'school',
              title: t('home.surfSchoolTitle'),
              body: t('home.surfSchoolDesc'),
              link: '/lessons',
              cta: t('home.viewPrograms'),
            },
            {
              icon: 'explore',
              title: t('home.surfGuidingTitle'),
              body: t('home.surfGuidingDesc'),
              link: '/guiding',
              cta: t('home.exploreSpots'),
            },
            {
              icon: 'package_2',
              title: t('home.surfPackagesTitle'),
              body: t('home.surfPackagesDesc'),
              link: '/packages',
              cta: t('home.seeAllInclusive'),
            },
          ].map((item) => (
            <div key={item.title} className="bg-surface-container-lowest p-10 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">{item.title}</h3>
              <p className="text-on-surface-variant font-body-md mb-8">{item.body}</p>
              <Link
                className="text-primary font-label-md uppercase tracking-widest flex items-center gap-2 group-hover:underline"
                to={item.link}
              >
                {item.cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GALLERY SECTION (Mosaic)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-xl">
              <span className="font-label-md text-primary tracking-[0.3em] uppercase block mb-4">{t('home.theGallery')}</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('home.galleryTitle')}</h2>
            </div>
            <Link
              to="/gallery"
              className="border border-primary text-primary px-8 py-3 rounded-full font-label-md uppercase tracking-widest hover:bg-primary hover:text-white transition-colors text-center"
            >
              {t('home.seeFullGallery')}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[800px]">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="A luxurious Moroccan villa interior with open architecture."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR8NUU_cQ1C5gb4fTVVBB8_TIyO3yYf6ygff6Q6WEoSxgUHAt56V_stYR1MKBM-HCEkFPijgMiROvYUZRfq1HTa7O8cQVIhb998gXHyoKsnHKfzmV4IZeUlWxCyiXzshngUmjpVMqLFD74HBfw1ueBKaoBDGqqRdwGaO-A02Sv_1IxKSbs0aJMQLZ7SMK2FhsRN6FqZx--T3OEuHDjwkrI7axrgP79jDPFHhyyHSxSMnpWEyqOyINLR6BELGACYEBI0lL6JeL1b9E"
              />
            </div>
            <div className="col-span-2 row-span-1 overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Handcrafted surfboards leaning against a terracotta wall."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmS7R1LdrHK3-shBUe6d-mKYqOd4wDE2gL9pTOq7Nb1VEvlhMLDsW8j9SEhkOQM37aszmx74z8LRss8YpriWSgldEtfhtv1KgsnfzUgC7sHKDjtKLVv0h1d96G-_nTRDna3hzBXUY9vhUNqLexs42gfQHbtWE8WH0BAZMQJIYr8OC0l7yNqzb8rsNxs4Uat6WZyBePO01Kcc8LFuBetZmpFWzhekMJSjULHLaF4UHtgeR_5F4TBH1QPZEeDSoYHba7fRxc8gUBsiY"
              />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Moroccan tagine dish on a rustic wooden table."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrZmKSsbQUjqCi5QGPeBM5ghHx7jyhXevrtsNGm6wTUHWs65OgIZmWqkVKRWryfYB_GHbh_49hZk-BysC2XLMvBy0yG1-yNgsjQquCzZj6QSgoHP2sr8YYdq0FJO6Hg0sdT3KgbhW7CexWCDKddzV238MAUepbrk4lDga0zArUxDib4dfWkBohfu1jPKZHbVdpej3PO9TFgAqrfJdxX5BhkfDZWqtvX6fjq3rTOHh1NxKbU93ruzF1Gd7WeqtWivUMWIauMYHCAUk"
              />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Yoga session on a wooden deck overlooking the cliffs of Mirleft."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBElExz1zcBrV5nROA8MyvJY3vCDCkV7EbMtNP-vE1yY5unlqFDEYLCm47PcqF7sSMG_5oYlvsVFyXLr9ZEcKIZxtee96Wy-a1-1WuC7dROh3wtDRTlJvvRarqNYFit5q2MT4ozzFHrytiUzEUDfMlD9D5qjf86_6PqyT2ugqWjwarN6SRmIRK-hjBcBUOdaFAOf6fXlYcEJzKJ6cq94vMzqKFkEyoHzlwy5sih4i6i8x95cxSDiOAUAD7Iv2RuSjGn0U_VMbDikvU"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          TOAST NOTIFICATION
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 max-w-md w-[90vw]"
          >
            <div className="bg-[#E76F51] p-2 rounded-full text-white shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm text-white">{t('home.bookingReceived')}</p>
              <p className="text-xs text-slate-300 mt-0.5">
                {t('home.bookingDateSummary', {
                  checkIn: booking.checkIn ? format(booking.checkIn, 'dd MMM yyyy', { locale: currentLocale }) : '—',
                  checkOut: booking.checkOut ? format(booking.checkOut, 'dd MMM yyyy', { locale: currentLocale }) : '—',
                  guests: booking.guests,
                })}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
