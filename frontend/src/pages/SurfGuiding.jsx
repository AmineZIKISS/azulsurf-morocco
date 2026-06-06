import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

export default function SurfGuiding() {
  const { openBookingModal } = useBooking();
  const { t } = useTranslation();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[819px] min-h-[600px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Surfer catching a wave at sunrise" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9dPkQ6KLpVr-sD1SoF3sx_J8AmS2s0URdJf9QsIASwlPjYZmyRab-n8h4H0cHu2NyAGqh19G6r1F77pTyqmyEY00NFIvMb7XTZVOkHwzSU_lUwLBXxhrCzxLx9Kx2XFhlnpFPEh_lEzfLgRtCr09D0nVHSDraRE6FnKPbRnNulodo0laeQtxPszRPssbdpoKmRo8JDEtIJ4_s1Qc-ec3Y9tFUb_-c0PxqE2Pf4-ejLb5voyIPG2-sl_w7w6MmVUJjHS95FC42DvA"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto text-white">
          <h1 className="font-display-lg text-display-lg mb-6 drop-shadow-lg">{t('surfGuiding.heroTitle')}</h1>
          <p className="font-body-lg text-body-lg text-white/90 drop-shadow-md">{t('surfGuiding.heroSubtitle')}</p>
        </div>
      </section>

      {/* The Guiding Philosophy */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <img 
              alt="Surfboards lined up on the beach" 
              className="w-full h-[600px] object-cover rounded-DEFAULT shadow-[0_10px_40px_-10px_rgba(0,95,115,0.08)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFtm2TTaHQtBLh00J0TVhf8g0DCV0vQmmEfYvfl9uYER07ERvvZjBxguT_iBx3IyO2MvfjmdLRR1B7PqhPwyWL1hI4Z5yKE1IuOgHIDWULG05DmSQn2mcE-X6QJiEP1RmgCcyFUyRfkN_nwVUIUcF4HVprWSEYNromDqeO8nl83-l80qdM2xwEU73i0lSyxj6DDoCCXwX4f99byr6Xu9_2lyc8rdplRS5v4Rk5sztYngoZuaeU1GtP7bE9GxsGuw-KC-KTDG2-2to"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="font-headline-lg text-headline-lg text-primary">{t('surfGuiding.approachTitle')}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {t('surfGuiding.approachP1')}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {t('surfGuiding.approachP2')}
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">schedule</span>
                <span className="font-body-md text-body-md text-on-surface-variant">{t('surfGuiding.tidePerfect')}</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">explore</span>
                <span className="font-body-md text-body-md text-on-surface-variant">{t('surfGuiding.exclusiveAccess')}</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">person_search</span>
                <span className="font-body-md text-body-md text-on-surface-variant">{t('surfGuiding.tailoredWaves')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t border-surface-variant">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-headline-lg text-headline-lg text-primary">{t('surfGuiding.ctaTitle')}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{t('surfGuiding.ctaSubtitle')}</p>
          <button 
            onClick={() => openBookingModal('Surf Guiding Package')}
            className="inline-block bg-[#E76F51] text-white px-8 py-4 font-label-md text-label-md uppercase tracking-wider rounded-DEFAULT hover:bg-[#d55e42] transition-all shadow-[0_4px_14px_0_rgba(231,111,81,0.25)] hover:shadow-[0_6px_20px_rgba(231,111,81,0.23)] hover:-translate-y-0.5 text-center cursor-pointer"
          >
            {t('surfGuiding.ctaButton')}
          </button>
        </div>
      </section>
    </main>
  );
}
