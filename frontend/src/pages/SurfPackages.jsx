import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const packages = [
  {
    id: 1,
    category: "Cours",
    name: "Surf Lessons Only",
    service_type: "surf_lesson",
    description: "Parfait pour apprendre ou se perfectionner à la séance.",
    price: "À partir de 35€",
    features: [
      { text: "1 Session (35€)", included: true },
      { text: "Session privée (45€)", included: true },
      { text: "Surf guiding (50€)", included: true },
      { text: "Promo 2 sessions/jour (50€)", included: true }
    ],
    popular: false
  },
  {
    id: 2,
    category: "Hébergement",
    name: "Chambre Privée (Hébergement Seul)",
    service_type: "room",
    description: "Votre espace privé au calme face à l'océan.",
    price: "30€ / jour",
    features: [
      { text: "Chambre privée (2 lits)", included: true },
      { text: "Petit-déjeuner inclus", included: true },
      { text: "Aucune activité incluse", included: false }
    ],
    popular: false
  },
  {
    id: 3,
    category: "Hébergement",
    name: "Chambre Partagée (Hébergement Seul)",
    service_type: "room",
    description: "Ambiance conviviale et reposante à petit prix.",
    price: "20€ / jour",
    features: [
      { text: "Lit en dortoir", included: true },
      { text: "Petit-déjeuner inclus", included: true },
      { text: "Aucune activité incluse", included: false }
    ],
    popular: false
  },
  {
    id: 4,
    category: "Séjour",
    name: "Free Surf Stay",
    service_type: "package",
    description: "Liberté totale pour surfer à votre propre rythme.",
    price: "449€",
    features: [
      { text: "7 Nuits / 6 Jours", included: true },
      { text: "Demi-pension", included: true },
      { text: "Transfert Aéroport Agadir", included: true },
      { text: "Matériel de surf inclus", included: true },
      { text: "Pas de cours de surf", included: false }
    ],
    popular: false
  },
  {
    id: 5,
    category: "Séjour",
    name: "Surf Package (Sans Transfert)",
    service_type: "package",
    description: "L'essentiel de l'expérience surf sans le transport.",
    price: "589€",
    features: [
      { text: "7 Nuits / 6 Jours", included: true },
      { text: "Demi-pension", included: true },
      { text: "2 Sessions de surf/jour avec moniteur", included: true },
      { text: "Matériel inclus", included: true },
      { text: "Excursions & BBQ", included: true }
    ],
    popular: false
  },
  {
    id: 6,
    category: "Séjour",
    name: "Surf Guiding Package",
    service_type: "guiding",
    description: "Pour les surfeurs autonomes à la recherche des meilleurs spots.",
    price: "689€",
    features: [
      { text: "7 Nuits / 6 Jours", included: true },
      { text: "Demi-pension", included: true },
      { text: "2 Sessions de guiding/jour", included: true },
      { text: "Guides professionnels", included: true },
      { text: "Transfert Aéroport Agadir", included: true }
    ],
    popular: false
  },
  {
    id: 7,
    category: "Séjour",
    name: "Full Surf Package",
    service_type: "package",
    description: "L'expérience tout-inclus ultime pour un séjour sans soucis.",
    price: "689€",
    features: [
      { text: "7 Nuits / 6 Jours", included: true },
      { text: "Demi-pension", included: true },
      { text: "2 Sessions de surf/jour avec moniteur", included: true },
      { text: "Transfert Aéroport Agadir", included: true },
      { text: "Excursions & BBQ", included: true }
    ],
    popular: true
  }
];

export default function SurfPackages() {
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
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
          <h1 className="font-display-lg text-display-lg text-white mb-6">Surf Packages</h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">
            Experience the intersection of Moroccan tradition and modern luxury. Our curated packages offer a seamless journey into the rhythmic heart of the Atlantic.
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
                  Plus Populaire
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
                Réserver
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Standard in Every Package</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Luxury and care are foundational to the Azul experience. No matter your choice, we ensure your stay is effortless.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">local_airport</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">Transfers</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Agadir airport pick-up and drop-off</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">Healthy Dining</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Daily Moroccan breakfast and dinner</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">surfing</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">Equipment</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">High-quality boards and wetsuits</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">wifi</span>
              </div>
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-2">Connectivity</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">High-speed fiber optic internet</p>
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
              "Azul is more than a surf camp; it's a profound restoration of the spirit. The waves of Mirleft are world-class, but it’s the hospitality and the quiet luxury of the villa that stay with you long after you leave."
            </p>
            <div className="flex flex-col items-center">
              <span className="font-label-md text-label-md uppercase tracking-[0.3em] text-white">Elena Rossi</span>
              <span className="font-body-md text-body-md text-white/60">Milan, Italy</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
