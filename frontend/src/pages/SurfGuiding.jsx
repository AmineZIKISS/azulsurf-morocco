import React from 'react';
import { Link } from 'react-router-dom';

export default function SurfGuiding() {
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
          <h1 className="font-display-lg text-display-lg mb-6 drop-shadow-lg">Beyond the Known: Surf Guiding in Mirleft</h1>
          <p className="font-body-lg text-body-lg text-white/90 drop-shadow-md">Let our local experts lead you to the most pristine, uncrowded waves along the Atlantic coast.</p>
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
            <h2 className="font-headline-lg text-headline-lg text-primary">The Azul Approach</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Surf guiding at Azul is more than just transportation; it's about unlocking the secrets of the Moroccan coast. Our philosophy is rooted in deep local knowledge, respect for the ocean, and a commitment to curating the perfect session for your ability level.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We obsess over the charts, understanding how every subtle shift in swell direction, tide, and wind affects the myriad of reefs, points, and beach breaks hidden along our shoreline. Whether you seek peeling point breaks or punchy wedges, we ensure you are in the right place at the exact right time.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">schedule</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Tide-perfect timing for optimal wave quality.</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">explore</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Exclusive access to uncrowded, off-the-radar spots.</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary mr-4 mt-1">person_search</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Tailored wave selection matching your skill and style.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t border-surface-variant">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-headline-lg text-headline-lg text-primary">Join the Search</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Ready to discover the hidden gems of the Moroccan coastline? Book your premium surf guiding package today.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-[#E76F51] text-white px-8 py-4 font-label-md text-label-md uppercase tracking-wider rounded-DEFAULT hover:bg-[#d55e42] transition-all shadow-[0_4px_14px_0_rgba(231,111,81,0.25)] hover:shadow-[0_6px_20px_rgba(231,111,81,0.23)] hover:-translate-y-0.5 text-center"
          >
            Book Your Guide
          </Link>
        </div>
      </section>
    </main>
  );
}
