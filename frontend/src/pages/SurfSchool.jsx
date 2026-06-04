import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function SurfSchool() {
  const { openBookingModal } = useBooking();
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[819px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="A wide panoramic shot of the Mirleft coastline at sunrise, with soft golden light reflecting on the waves"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgYmD76TNWKazPo3xh-U4NshhEPeIlfI1LLoZjt9ivAR8qGTLcSj6GPbXWoqwBkrYRsPXgsZvDTRn1RsB7EwssLqQDziJBXoQ7_Llo4f19R_xp8ZMto9o98ZK6taBol17FyR0aNmBJzI-Qg-6dLNb9d0tKbFxHryczLH4Qijku2Vqh0T6OTeha916CnVJho9s9PeKGaAlpPcaxSLxPV9CwO5ZcNZ7_I8CUZ68dtYjIjf3Y-pCMZDbOp4g45R8LHKKDlsfq-NV8Ip4"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl text-white">
            <h1 className="font-display-lg text-display-lg mb-6">Surf School</h1>
            <p className="font-body-lg text-body-lg text-white/90 mb-10 max-w-lg">
              Master the Atlantic swell with our ISA-certified coaches. Experience the perfect balance of Moroccan tradition and world-class surf instruction in the warm waters of Mirleft.
            </p>
            <button 
              onClick={() => openBookingModal('Surf Lessons Only')}
              className="inline-block bg-[#E76F51] text-white px-10 py-4 font-label-md text-label-md uppercase tracking-widest shadow-xl hover:bg-[#d65d41] transition-all transform hover:scale-105 text-center cursor-pointer"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Program Levels */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-20">
          <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-4 block">Tailored Progression</span>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Our Surf Programs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Beginner */}
          <div className="bg-surface-container-lowest p-10 shadow-[0_20px_50px_rgba(0,95,115,0.05)] border-t-4 border-primary transition-transform hover:-translate-y-2">
            <div className="mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">waves</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4">Beginner</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              For those standing up for the first time. We focus on ocean safety, paddling technique, and finding your balance.
            </p>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Soft-top boards &amp; wetsuits
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> 2-hour daily sessions
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Beach theory &amp; safety
              </li>
            </ul>
          </div>

          {/* Intermediate */}
          <div className="bg-surface-container-lowest p-10 shadow-[0_20px_50px_rgba(0,95,115,0.05)] border-t-4 border-primary transition-transform hover:-translate-y-2">
            <div className="mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">air</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4">Intermediate</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Refine your turns, understand wave selection, and start navigating the line-up with confidence and style.
            </p>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Video analysis sessions
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Hardboard transition
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Wave reading skills
              </li>
            </ul>
          </div>

          {/* Advanced */}
          <div className="bg-surface-container-lowest p-10 shadow-[0_20px_50px_rgba(0,95,115,0.05)] border-t-4 border-primary transition-transform hover:-translate-y-2">
            <div className="mb-8">
              <span className="material-symbols-outlined text-primary text-4xl">tsunami</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4">Advanced</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Push your limits on Mirleft's famous reef breaks. Advanced maneuvers, speed generation, and big wave tactics.
            </p>
            <ul className="space-y-4 font-body-md text-body-md text-on-surface">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Personalized coaching
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Reef break guiding
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Performance feedback
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="bg-surface-container-low py-section-padding overflow-hidden">
        <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em]">Our Philosophy</span>
            <h2 className="font-headline-lg text-headline-lg leading-tight">Quiet Precision, Absolute Safety</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Our coaching philosophy is built on the pillars of individual attention and sustainable progress. We limit group sizes to 4 students per instructor, ensuring you receive the technical feedback needed to improve while maintaining the highest safety standards in the water.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <span className="block font-headline-md text-primary mb-2">4:1</span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-xs">Student-Coach Ratio</span>
              </div>
              <div>
                <span className="block font-headline-md text-primary mb-2">ISA</span>
                <span className="font-body-md text-on-surface-variant uppercase tracking-wider text-xs">Global Certification</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl"></div>
            <img 
              className="relative z-10 shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700 w-full object-cover" 
              alt="Small group of surfers listening intently to a professional coach on a pristine Moroccan beach"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy0CijWnQkafIMHdWbdRomcsbOyKuhDlKPqWPqOQf3yuFrl13-WXvkTSqxgeMNXSG5hoOSeQZ3eXVXNas-wjDRJLAM2Nzas67Q7vGMzSEIP4d6igFXuKYrlqw76r11BlxO6lQi-nLKnXV2jjEygQhC7whT9JNIVpSE8ROAELmcF3_gao4Qb1d2op6w8wHPrrTgLqanbfREkEHYAbxiCVg_P-zIRYIZTYD_AFcIWMAU_4qOBHA_6kFmNHvwNyCJ6OgFxesh0jmpxXo"
            />
          </div>
        </div>
      </section>

      {/* Equipment & Facilities */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Premium Gear &amp; Setup</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">We provide only the best equipment to ensure your comfort and performance.</p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-[800px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Row of premium, high-quality surfboards of various sizes and shapes neatly arranged"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClIpJIRoI5Fmqn374jPujOthLonRE5aXkOZOKQxXixpMlvvcn40OsTbMQ-B5NLqgQ3FwYRIPKPgvOIyrEQsRmIyZ1YHht574QYw-r9QjiTkjVHwmYs9Baossu7OBEZvrWuJVYQaW821Ng3SwE1G_Y9xc4zO98CXJUd_kVEPjWhly2IwHW3GeWLY3RK7H3IwzDJ379kOingOzesbAp5SgzJZRNALBrhFuLrfnukMEoi3QSIzjTfwDl37Pil4iq_y-PhoBVCMfIhzMY"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/80 to-transparent">
              <h4 className="text-white font-headline-md">High-Performance Quiver</h4>
            </div>
          </div>
          <div className="md:col-span-2 relative overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Premium wetsuits drying in the sun at a beachfront surf camp in Morocco"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARYCHMKrGoD6kW-yOzEuXKFgtqVX4FH6Z6wtlUNjXX5svfIV5sELz9tXtCU85tufJGhHyTPc4nrmNW7-oGzp9SRGTOHrOd9tBqnCQocHDH5xJAM-k_PzbftOj5RoqkFuzvE3ghO3da8r_DJQnKvRRPjnaXRNLQSK9BBKaXPGT6d6GxxTJOvO2Wl8JW8lDr5V-xVsbp_uIXUGrxU9qHHT_eFLkSFDxlswoH5FdthZ-TND6TeXEqQZ8Vh-0GXYokuSvAHWDy_8kgIVE"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/80 to-transparent">
              <h4 className="text-white font-headline-md">Elite Wetsuits</h4>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Stylish, minimalist beachside lounge area with comfortable seating and ocean views"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxah3nR6oJSr5Et6eHDBUpLQOl0CGhtsxmZjbH_r85JfjqwqfWjLgDuATjmqySSJsn8s9A_tGGgyp2RZzT4QYMjenprn9rPFXRkApfW33xMRDCkXpAUpL418uoi7lasQIWowwS5kdjOdzRp1r6kwWsjXr1Tu2hwiGvn93G06sGGo3gQ9M8q3P7gHaihXRHBs3Z4ecjojWv8ZQ-9TTjB0bWs18G1PSTPk2rk2PLbxxIS5R1vuqaygVbi7CoVvN5kuCnXcJ4xCr2g_c"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent text-center">
              <h4 className="text-white font-label-md uppercase">Beachside Lounge</h4>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Beautifully designed outdoor shower area at the surf school using stone and wood"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACibUzNR3ImspinfWYbOjILaQzrGXTSew2dm0Xzns8ajWLdHI1o26sRYN9WDqy3MGW30fC8ZqPFj47hdKdYEyCRFjufrQ2At3wgK-8rr9u52UnVHvXoBQdAOXysgBd8dJCu9svHVVMDUCK1o3vbM-jrc3uGnd0Vjp_jEOCeACqORKKbhRtsgIqb4TX1QAiea_FYu8UYnN7ZYjT2i8f7FODi11YdAbqGq3jumbOQUtwyeWu12YM4uc518TasiacnyTy9Y7kYVtofuc"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent text-center">
              <h4 className="text-white font-label-md uppercase">Hot Showers</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-section-padding bg-surface-container-highest">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-4 block">The Team</span>
              <h2 className="font-headline-lg text-headline-lg">Coached by Professionals</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Our lead coaches are not just surfers; they are ocean educators dedicated to your safety and style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img 
                className="w-48 h-64 object-cover" 
                alt="Portrait of Youssef Ait, Head Instructor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqUF6_V5Zl2xakqhwewbbetd9hzTttN7ZUI4CYTK8sHZ5s2flWLz7uNmr-KGWE0XTmlpNJEDvL70BU10xYaueom8EFV_naVeKJa00-pqa7zGMMUvCQoxwvT2_XnfSkB5nnjfdbx7B6gc5t2MZyORmecI0Sabw8UlAYpOWzhNhGjzSBcjl9rLQgyfEdUOo5fF5sP_as7mFXnsB77PJ0ypaBtUBETm3No1hesrvNRDP_FWpqIBkGoi0atyHATTK8cU3_HhBNpwmF6xo"
              />
              <div className="space-y-4">
                <h3 className="font-headline-md">Youssef Ait</h3>
                <span className="font-label-md text-primary uppercase text-xs tracking-widest">Head Instructor | ISA Level 2</span>
                <p className="font-body-md text-on-surface-variant italic">"Surfing is more than a sport; it's a conversation with the Atlantic. I'm here to help you find your voice on the waves."</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img 
                className="w-48 h-64 object-cover" 
                alt="Portrait of Sarah Miller, Lead Coach"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPX7vTU60uGZB4vEMO11G0VxBdRqoQbCw2_g50JH20VfFPgoF-BHnqQHSsRaQzAR5KtMlZJ7zSwsyXojLnUlrdviJ7N5MzXMpbETxeIsVlMIOz04JFRVALKN-jdxoi6m2ZQ9T6PDV1gz6qq0o68VE7fukcANN321C-t77J7EoilHAp0xMMnc5fwIv4jZkYpxXmFpvmD_Ym-6-6N8MQ3TLoqR3A-DCOLy0blE6tiAZkGKWxfPA8-XGQMMlatVfzijf2Z8M55wTZuGQ"
              />
              <div className="space-y-4">
                <h3 className="font-headline-md">Sarah Miller</h3>
                <span className="font-label-md text-primary uppercase text-xs tracking-widest">Lead Coach | Ocean Safety Expert</span>
                <p className="font-body-md text-on-surface-variant italic">"Safety is our foundation. Once you feel secure, the ocean becomes your playground. My goal is to build that confidence."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-surface-container-low p-6 transition-all" defaultOpen>
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase tracking-wider text-on-surface">
                What should I bring to my lesson?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
                We provide everything you need for surfing including boards and wetsuits. You only need to bring a swimsuit, a towel, high-factor sunscreen, and a bottle of water.
              </p>
            </details>
            <details className="group bg-surface-container-low p-6 transition-all">
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase tracking-wider text-on-surface">
                Are there age requirements?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
                Our lessons are open to anyone from age 8 to 80. For children under 12, we recommend private lessons to ensure personalized attention and safety.
              </p>
            </details>
            <details className="group bg-surface-container-low p-6 transition-all">
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase tracking-wider text-on-surface">
                How safe is surfing in Mirleft?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
                Safety is our top priority. We choose the best surf spots daily based on tide and swell conditions suited to your level. All our instructors are lifeguard certified.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-section-padding overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary opacity-90"></div>
          <img 
            className="w-full h-full object-cover" 
            alt="Stunning deep blue Atlantic sunset with long rhythmic waves"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8g11Ce-1Y-r6vXpTdm1LVPxlPjEyNQr0KApY--AX8g3iVLmqotTY5Ih9jqfMFqKXR5jUnEBeRwL1VKsCqRcgt0y-_qEIto1CN1u1dO-QvOIYumVA1eEm0rXy8HZgnsReuX5NhdyzXttw4Vj7C-zI05dudBzf3VwqNDgNllZ-fYxVribrixzxxX-qLjhJSMH8TDFMrJb1iFo-Ko9pty8UuXt2e2icVlyahoWbNmvw4xyv92weQh6zx0UIol5JJ-jmmfMTEaA7mqFs"
          />
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto text-white">
          <h2 className="font-display-lg text-display-lg mb-8">Ready to Catch Your First Wave?</h2>
          <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto mb-12">
            Spaces are limited for our small-group sessions. Book your professional surf experience in Mirleft today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => openBookingModal('Surf Lessons Only')}
              className="inline-block bg-[#E76F51] text-white px-12 py-5 font-label-md text-label-md uppercase tracking-[0.2em] shadow-2xl hover:bg-[#d65d41] transition-all transform hover:scale-105 text-center cursor-pointer"
            >
              Book Your Lesson
            </button>
            <Link 
              to="/surf-packages" 
              className="inline-block border border-white text-white px-12 py-5 font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all text-center cursor-pointer"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
