import React from 'react';
import { Link } from 'react-router-dom';

export default function SurfCamp() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[819px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Villa patio view overlooking the Atlantic Ocean sunset in Mirleft" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIWn33LShwBWOyP53I6Mc320ImhHG4DZ6aqPWM-lsaLT339xUIcbOm-k3wCz1tmlmCQ4pFwjWKJfpoZo97o23AU9WOGC642_n5BRswUeYeKejc8Zwiw-zdgDmT_uZE7v4V6jA4eFd2V8RscOzQYGpgps5HjhECr2A1XyfP_9wpB-3Q3uOjCrB7rVyDbbZ30p2tnSkDl8FD3Vxp2VGm33t9bBS7LPlelvjpAVLSywunRfIt_g94sYMRottO2IyH9OkTQHhJrR51ByY"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-white">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-lg-mobile mb-6 font-bold">The All-Inclusive Experience</h1>
          <p className="font-body-lg text-body-lg max-w-2xl mx-auto opacity-90">A sanctuary where Moroccan tradition meets the rhythm of the ocean.</p>
        </div>
      </section>

      {/* The Villa Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-headline-lg-mobile text-primary mb-6">The Azul Sanctuary</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Experience the pinnacle of coastal minimalism. Our premium accommodation features ocean-view rooms designed with a refined blend of modern luxury and traditional Moroccan accents. Every space is crafted for profound decompression after a day on the waves.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container">water</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Panoramic Ocean Views</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container">bed</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Minimalist Moroccan Decor</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container">weekend</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Serene Communal Lounges</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-sm shadow-primary-container/5">
            <img 
              alt="Villa Interior room view" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQl4Eb06_FJCM5ZbLckZImnZOiV8Pkr2-NpApRsXcuAN4Y5nKO9-iZccCXw2mfdfqILooxSmghZ253uExGEChLMlRU3M9eUeslWBI_BDBg-5Jv9DueIgZq9xFhIOZRQri0j6n_azV1T7k5nQZAeXSCXzpTC12wsMA-6Ef_FtSxSlSWECz12eyADTnkHYq0x0uwNWOXKcgjTZRcEqMClqH79OmlX-m6CPH45dPrpUK4vCx1om98S04-ZziLS3hhCXO4L-k2vJShSFU"
            />
          </div>
        </div>
      </section>

      {/* A Day at Azul Section (Grid Layout) */}
      <section className="py-section-padding bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-headline-lg-mobile text-primary mb-4">A Day at Azul</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Find your flow with our carefully curated daily rhythm.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Morning */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm shadow-primary-container/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-full mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed">wb_twilight</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Morning</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">07:30 - Morning Yoga</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Awaken the body with gentle coastal flows.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">08:30 - Organic Breakfast</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Fresh local fruits and artisanal breads.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">10:00 - Surf Session 1</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Guided coaching in the morning swell.</span>
                </li>
              </ul>
            </div>
            {/* Afternoon */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm shadow-primary-container/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-full mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed">light_mode</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Afternoon</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">13:00 - Moroccan Lunch</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Nourishing traditional beachside meals.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">15:00 - Surf Session 2</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Free surf or afternoon technical coaching.</span>
                </li>
              </ul>
            </div>
            {/* Evening */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm shadow-primary-container/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-full mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed">nights_stay</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Evening</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">18:00 - Sunset Relaxation</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Mint tea on the terrace as the sun dips.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant mb-1">19:30 - Communal Dinner</span>
                  <span className="font-body-md text-body-md text-secondary text-sm">Sharing stories over slow-cooked tagines.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto text-center">
        <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-headline-lg-mobile text-primary mb-6">Ready for the Waves?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">Join us at Azul Surf Mirleft for an unforgettable coastal retreat.</p>
        <Link 
          to="/contact" 
          className="inline-block bg-[#E76F51] hover:bg-[#d46045] text-white font-label-md text-label-md uppercase tracking-wider px-10 py-4 rounded transition-colors duration-300 shadow-md shadow-[#E76F51]/20 hover:shadow-lg hover:-translate-y-0.5 text-center cursor-pointer"
        >
          Reserve Your Stay
        </Link>
      </section>
    </main>
  );
}
