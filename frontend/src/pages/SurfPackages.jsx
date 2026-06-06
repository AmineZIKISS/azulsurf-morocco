import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useTranslation } from 'react-i18next';

export default function SurfPackages() {
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const { t } = useTranslation();

  const packages = [
    {
      id: 1,
      category: t('surfPackages.pkg1Category'),
      name: t('surfPackages.pkg1Name'),
      service_type: "surf_lesson",
      description: t('surfPackages.pkg1Desc'),
      price: t('surfPackages.pkg1Price'),
      features: [
        { text: t('surfPackages.pkg1F1'), included: true },
        { text: t('surfPackages.pkg1F2'), included: true },
        { text: t('surfPackages.pkg1F3'), included: true },
        { text: t('surfPackages.pkg1F4'), included: true }
      ],
      popular: false
    },
    {
      id: 2,
      category: t('surfPackages.pkg2Category'),
      name: t('surfPackages.pkg2Name'),
      service_type: "room",
      description: t('surfPackages.pkg2Desc'),
      price: t('surfPackages.pkg2Price'),
      features: [
        { text: t('surfPackages.pkg2F1'), included: true },
        { text: t('surfPackages.pkg2F2'), included: true },
        { text: t('surfPackages.pkg2F3'), included: false }
      ],
      popular: false
    },
    {
      id: 3,
      category: t('surfPackages.pkg3Category'),
      name: t('surfPackages.pkg3Name'),
      service_type: "room",
      description: t('surfPackages.pkg3Desc'),
      price: t('surfPackages.pkg3Price'),
      features: [
        { text: t('surfPackages.pkg3F1'), included: true },
        { text: t('surfPackages.pkg3F2'), included: true },
        { text: t('surfPackages.pkg3F3'), included: false }
      ],
      popular: false
    },
    {
      id: 4,
      category: t('surfPackages.pkg4Category'),
      name: t('surfPackages.pkg4Name'),
      service_type: "package",
      description: t('surfPackages.pkg4Desc'),
      price: t('surfPackages.pkg4Price'),
      features: [
        { text: t('surfPackages.pkg4F1'), included: true },
        { text: t('surfPackages.pkg4F2'), included: true },
        { text: t('surfPackages.pkg4F3'), included: true },
        { text: t('surfPackages.pkg4F4'), included: true },
        { text: t('surfPackages.pkg4F5'), included: false }
      ],
      popular: false
    },
    {
      id: 5,
      category: t('surfPackages.pkg5Category'),
      name: t('surfPackages.pkg5Name'),
      service_type: "package",
      description: t('surfPackages.pkg5Desc'),
      price: t('surfPackages.pkg5Price'),
      features: [
        { text: t('surfPackages.pkg5F1'), included: true },
        { text: t('surfPackages.pkg5F2'), included: true },
        { text: t('surfPackages.pkg5F3'), included: true },
        { text: t('surfPackages.pkg5F4'), included: true },
        { text: t('surfPackages.pkg5F5'), included: true }
      ],
      popular: false
    },
    {
      id: 6,
      category: t('surfPackages.pkg6Category'),
      name: t('surfPackages.pkg6Name'),
      service_type: "guiding",
      description: t('surfPackages.pkg6Desc'),
      price: t('surfPackages.pkg6Price'),
      features: [
        { text: t('surfPackages.pkg6F1'), included: true },
        { text: t('surfPackages.pkg6F2'), included: true },
        { text: t('surfPackages.pkg6F3'), included: true },
        { text: t('surfPackages.pkg6F4'), included: true },
        { text: t('surfPackages.pkg6F5'), included: true }
      ],
      popular: false
    },
    {
      id: 7,
      category: t('surfPackages.pkg7Category'),
      name: t('surfPackages.pkg7Name'),
      service_type: "package",
      description: t('surfPackages.pkg7Desc'),
      price: t('surfPackages.pkg7Price'),
      features: [
        { text: t('surfPackages.pkg7F1'), included: true },
        { text: t('surfPackages.pkg7F2'), included: true },
        { text: t('surfPackages.pkg7F3'), included: true },
        { text: t('surfPackages.pkg7F4'), included: true },
        { text: t('surfPackages.pkg7F5'), included: true }
      ],
      popular: true
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[614px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="A cinematic, wide-angle shot of a serene Atlantic coastline at dawn." 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWxBbIzo8uXQDmYxANtRPX8k9cW-aO58g7_FL94_wtmRf6qJ6fLEsjZnToqZF6XgCggmagL0W00TFTGm6ift6lMfttA0-EoClMSm01g21AKZRlSaW7DEv7ZQZDXTry0lLBfbiDnQlmupmS2VvbnGx8Rrz72RYavbK-kYJ9EnDmZEXZw5_ZkNVRIfrTMAWS4J-M8WiFW6Rgc7L_cf5Y4XvUe9Or6DLeIPWVokbSfTsvc4k2AoYVggjkznht8l2WEvLSzCUpFkBSwq8"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile">
          <h1 className="font-display-lg text-display-lg text-white mb-6">{t('surfPackages.heroTitle')}</h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">
            {t('surfPackages.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((item) => (
            <div 
              key={item.id} 
              className={
                item.popular 
                  ? "relative bg-surface-container-lowest p-10 flex flex-col h-full shadow-[0px_15px_40px_rgba(0,95,115,0.06)] border-t-4 border-primary transition-all duration-300 hover:-translate-y-2 rounded-lg"
                  : "bg-surface-container-lowest p-10 flex flex-col h-full shadow-[0px_10px_30px_rgba(0,95,115,0.03)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_20px_40px_rgba(0,95,115,0.05)] rounded-lg"
              }
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 font-label-md text-[10px] uppercase tracking-[0.2em]">
                  {t('surfPackages.mostPopular')}
                </div>
              )}
              <span className="font-label-md text-label-md text-primary-container mb-4 uppercase tracking-widest">
                {item.category}
              </span>
              <h3 className="font-headline-lg text-headline-lg mb-2 text-primary">
                {item.name}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {item.description}
              </p>
              <div className="text-primary-container font-headline-md text-headline-md mb-8">
                {item.price}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span 
                      className={`material-symbols-outlined ${feature.included ? 'text-primary' : 'text-slate-400'}`} 
                      style={{ fontSize: '20px' }}
                    >
                      {feature.included ? 'check_circle' : 'cancel'}
                    </span>
                    <span className={`font-body-md text-body-md ${!feature.included ? 'text-on-surface-variant/60 line-through' : ''}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openBookingModal(item.name)}
                className="w-full py-4 font-label-md text-label-md uppercase tracking-widest transition-colors duration-300 hover:opacity-90 bg-[#E76F51] text-white text-center rounded-sm cursor-pointer"
              >
                {t('surfPackages.bookButton')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{t('surfPackages.standardTitle')}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              {t('surfPackages.standardSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">local_airport</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">{t('surfPackages.transfers')}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{t('surfPackages.transfersDesc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">{t('surfPackages.healthyDining')}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{t('surfPackages.healthyDiningDesc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">surfing</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">{t('surfPackages.equipment')}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{t('surfPackages.equipmentDesc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">wifi</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">{t('surfPackages.connectivity')}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{t('surfPackages.connectivityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-section-padding px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto bg-primary py-20 px-10 md:px-32 relative">
          <div className="absolute top-10 left-10 opacity-10">
            <span className="material-symbols-outlined text-white text-9xl">format_quote</span>
          </div>
          <div className="relative z-10 text-center">
            <p className="font-headline-lg text-headline-lg text-white mb-10 italic leading-relaxed">
              {t('surfPackages.testimonial')}
            </p>
            <div className="flex flex-col items-center">
              <span className="font-label-md text-label-md uppercase tracking-[0.3em] text-white">{t('surfPackages.testimonialAuthor')}</span>
              <span className="font-body-md text-body-md text-white/60">{t('surfPackages.testimonialLocation')}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
