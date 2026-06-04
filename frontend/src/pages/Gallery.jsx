import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop pt-24 pb-12 max-w-container-max mx-auto text-center animate-in fade-in duration-300">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">Moments Capturés</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Plongez dans l'essence de Mirleft. Une collection visuelle de nos vagues, de notre sanctuaire et des instants de quiétude partagés sur la côte marocaine.
        </p>
      </section>

      {/* Minimalist Filters */}
      <section className="w-full px-margin-mobile md:px-margin-desktop pb-12 max-w-container-max mx-auto flex justify-center">
        <div className="flex flex-wrap justify-center gap-8">
          <button className="font-label-md text-label-md uppercase tracking-wider text-primary border-b border-primary pb-1 cursor-pointer">Tous</button>
          <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-transparent cursor-pointer">Surf</button>
          <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-transparent cursor-pointer">L'hébergement</button>
          <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-transparent cursor-pointer">Yoga</button>
          <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-transparent cursor-pointer">Paysages</button>
        </div>
      </section>

      {/* Curated Grid Gallery (Bento Style) */}
      <section className="w-full px-margin-mobile md:px-margin-desktop pb-section-padding max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[repeat(4,minmax(250px,auto))] gap-gutter">
          {/* Feature Image - Spans 2 cols, 2 rows */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Surfer catching a wave at sunset" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBilzCyNBkLwwhCp9znkfUH2nUuN7RVcQxAaQFmZTn8QUAyk-0eylAM18ehpHAf0ki3MfJDRIa9BAn37hDgSAgeDu2bN347jwgLFt2TsRJ8kqtxz94Y206nFSFRA-QpeXadlEE57yLtuSvl-0x03XS2drQFpMNehTiLyfq_lQ1Yeh0CEH_ggrF9Tdc2UEvdtfPv7nICIIVYPFtHFX7vvj6OMdSwzFJxhfYfFk4F2_WZbDaPvrJQAwuwufOgh9OTJ6HMy2_UcxZ30Xk"
            />
          </div>
          {/* Standard Vertical - Spans 2 rows */}
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Woman practicing yoga overlooking the ocean" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD9y7Gdn0X9Nq8Y1QU5DU2PnT4VL2zcesL7U9KmTOuBjWzi1okHY6fO32cErHa-LAbNI7zqL2VUYmDc9aOgX2-jjuok6W1RT4qSlCMBMTtPmnl4aEeGEdaxx5dsv5qRAnzQzaSotFFW8sHo_ocIkhGMQ9cRuu1ohkRpllzS-X7e1AwMuUHms4lIu4BBfBxy3RJBNAkiw3xpyJoPzm-WxyETR72DCAqUJzpnDyTfTZgHuebN32K3O4DieMpCZswwOj7bj7sTZqs9HQ"
            />
          </div>
          {/* Small Square */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Minimalist bedroom interior" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFkQEfPNRuielU7NFIvj_2ntzHdU0ix--Ik-IKyuFE8FMZY3he8IrkqXGzJwAC2928jpeCfZqeUwujB0qu6LwQQ4Zb4NuqxJyZWeLnJaqgQsFATbvN0q9GLejDjGXN1dGLumnY_NlFNooFOi_BNGsZD4ZyVAwulh_X_ZUu5hUAeeYwpB42S_8Nm3PEt3XwhWKJWuPR7qmgH0c8jjJfQVvO80O_Ey2nEUPqopUhSPSj8sGyESpjC1qIdVTqQCvgDSyRfMgsteY2SEo"
            />
          </div>
          {/* Small Square */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Traditional Moroccan mint tea set" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsCT1Sn-CYONU6-_SCu7zNqxuFGjb9kr_JsJdXByXOXpywxgNfTCwDjCgSpkYSWUVFQsshvKpZdYtRSOvaQ_ZtZkfzeSXPJLdfof8izhkqb3_Ltm4r144p_BWHiQ8jQRwn39D73bfkMUX6ltcVnRAZJcwcLWX3Du2Kq52n14-8Dx1DrFv0G4j8YHPHMpHsX2s0Crkka5wBgVCJMKY-GFvlMnwurANICMmfePZKb998bM9mtRoq0wUqRlJXJMoQ5lJRrwIve1lZVEM"
            />
          </div>
          {/* Wide Horizontal - Spans 2 cols */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Empty sandy beach at dawn" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdO0qHBpaLP_zOATAbp2xvu8tr2B_v2LEkZhgOoUvfZXPaogcq5t2S8e7xSq_sGjFYMIOblb6fdi9qaU5miwT0qCquRxIRVM6WvcJyk4XOSgk34imEaur_QYrjcvfEPKd-8J7hFWRnguxfPvkU0UsuX-vXLNCTei_PdJBbKB3ak_KJbsvsOzvBXxZS4577JkfCS-rE2xDmlcWQYJoH2-gPFLdahU8u2NSLY6-vbJmxNzw4YJ9PfwCxoB-5DLPt1coc8HrPAEJk-Ao"
            />
          </div>
          {/* Standard Square */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Surfboards leaning against a wall" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWQ97lTxs87yg1vjbiOKxQmxx7oakEk-0dQ2_d3Kize0kzP1oysrWnll2gO6nEjD6XbE3QZutS-zYoC70W8VqlqqY2b1nJZ6qZnCX3Sa6OVOxeocVJN70VUkNqHQq00x-af1NyiwnWFNj9jgKue7x3db1s9Z-vaUiXjn5m1TKo4CBGt6LLMxD8LieDa-iR-_sijaOgyvTL4QiP6kbneuxuXA5blCn9H8srpp10J7RY2umTQfgDVYhlSWiZbSr7pEeql6-86dw1HOA"
            />
          </div>
          {/* Standard Square */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden bg-surface-container-low rounded-lg ambient-shadow">
            <img 
              alt="Rooftop terrace view" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiHxEd85xYPhEB7fEK_JxZvlDjjVQkiuSvgZz6x_Vq6HLHU1DNGF2sEc5DmbDq_UazEMEjLgMXWdJzMlkt5qYyD_BEDDsN-wo-Fr4rdPgLAq_9ySrmVKyYEo0wgLJLGoJPjS-1dQrO7n7kYUti2m3QJGQxIxzquZ8xfEfEvbvoUs4gw9l_C3F1cHWQmc8d7-HO1i_f544X_H4gGr1-cJLgL7lqj5TgvNH76jIi1GqGPfJUvoEbj4qM90EWzWwx3vmVRXIs9z1svVE"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-section-padding bg-surface-container-lowest border-t border-surface-variant">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Prêt à vivre l'expérience ?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Rejoignez-nous à Mirleft pour une retraite inoubliable où l'océan dicte le rythme. Réservez votre séjour et trouvez votre équilibre.
          </p>
          <Link 
            to="/surf-packages" 
            className="inline-block bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-lg hover-lift text-center cursor-pointer"
          >
            Découvrir Nos Packages
          </Link>
        </div>
      </section>
    </main>
  );
}
