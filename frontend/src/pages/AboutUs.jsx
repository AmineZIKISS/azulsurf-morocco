import React from 'react';

export default function AboutUs() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[819px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="The Mirleft coastline in Morocco during golden hour with rolling Atlantic waves" 
            className="w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnsONffTwGcxwp8gimhmt9I64kDmnTjQ8off_q5Ylq8m0VbrNegUSfiqiG0GSYQ53Kcy5fKkNenJAPaosOJ7mU_viTzf6ADbZZ_E5b2Rv2jI9M1RYwHk2HBF3iaqoT_DzwbmuiJYP5FNnWFCq0212NwlTVI1sXm8uLpSXlAJLXyJYFOA3zOMBhiA8bhDESXcuiSkCsOIziWYiUy_IChdtRQuYgwrzQn2p-Vmo7mLwr8TaY45RPOIpgZfL8OeD-TDI1GuJ_H1DUZB0"
          />
          <div className="absolute inset-0 bg-surface/30 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 drop-shadow-md">
            Where Moroccan Tradition Meets the Ocean's Rhythm
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl bg-surface/80 p-6 rounded-lg backdrop-blur-sm">
            Azul Surf Mirleft is more than a destination; it's a sanctuary. We blend the raw beauty of the Atlantic coast with refined luxury, offering a space to decompress, connect, and ride the waves of profound tranquility.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 md:col-start-2">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Our Origins</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
              A Vision Born from the Salt Air
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              The story of Azul begins with a deep reverence for the untamed beauty of Mirleft. Seeking an escape from the relentless pace of modern life, our founders discovered a rare intersection here: consistent, world-class surf breaks framed by towering ochre cliffs, all steeped in the warm, unhurried culture of southern Morocco.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We envisioned a retreat that didn't just accommodate surfers, but elevated the entire experience. A place where minimalist design principles allow the natural surroundings to speak, and where every detail—from the thread count of the linens to the locally sourced ingredients in our kitchen—reflects a commitment to mindful luxury.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8 relative mt-12 md:mt-0">
            <div className="absolute -inset-4 bg-[#FDFBF7] rounded-xl shadow-[0_8px_30px_rgb(0,95,115,0.04)] z-0"></div>
            <img 
              alt="Interior layout of a minimalist luxury surf camp lounge with warm beige tones" 
              className="relative z-10 w-full h-[500px] object-cover rounded-lg shadow-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnTPpUizL-LDovbEPUCD-KHQoP_5pzmTQgy9--esBgvXWYYR-0v_TCDN3yAClTKa4CArZAJx4jqKyPTwUNCYDwR6G9a6s-SKha3DI3a78VTEqtnQ-tEGe4KUbRRCHgrJyI-EbaN99INrkZGapp0e3TsujOdR-eeIoLzaLU93JlNEU7rFm30OgC__GdrSNX-zKNfBbrF8v-U9OXMAPCJ_-WVjPU5cw2Qra8mSPtlHbYtVPZ3xerVrZx_radoUPRvLBzt5ft-VAQNR4"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
