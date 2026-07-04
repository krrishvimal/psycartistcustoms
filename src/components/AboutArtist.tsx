'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function AboutArtist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <>
      {/* SIGNATURE GAP SECTION */}
      <div className="w-full py-20 lg:py-32 relative flex items-center justify-center overflow-hidden bg-[#030303] select-none pointer-events-none">
        {/* Ghost Background */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-[18vw] xl:text-[14vw] 2xl:text-[10vw] font-black text-white/[0.015] uppercase tracking-tighter whitespace-nowrap z-0 overflow-hidden"
        >
          PSYC ARTIST PSYC ARTIST
        </motion.div>

        {/* Premium Statement */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
           <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-bodoni text-white text-3xl lg:text-5xl tracking-tight leading-tight"
           >
             every piece is a story
           </motion.p>
           <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-bodoni text-[#a855f7] text-3xl lg:text-5xl tracking-tight leading-tight italic text-glow"
           >
             every stroke is intentional
           </motion.p>
        </div>

        <style jsx global>{`
          .font-bodoni { font-family: var(--font-serif), serif !important; }
        `}</style>
      </div>

      <section ref={containerRef} id="about" className="relative min-h-screen bg-[#030303] overflow-hidden border-b border-white/5 pb-20 lg:pb-0">
        
        {/* BACKGROUND TEXTURE */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none select-none">
          <h2 className="text-[40vw] font-black tracking-tighter rotate-12">STUDIO</h2>
        </div>

        <div className="container mx-auto px-6 lg:px-20 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* IMAGE COLUMN */}
            <div className="order-1 lg:order-2 lg:col-span-7 relative">
              <motion.div 
                style={{ y: imgY }}
                className="relative w-full aspect-[4/5] lg:aspect-[4/5] max-h-[60vh] lg:max-h-[80vh] overflow-hidden rounded-[2rem] lg:rounded-[3rem] shadow-2xl group border border-white/5"
              >
                <Image 
                  src="/artist.jpg" 
                  alt="Shreenal Bawaria (PsycArtist)" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-[1px] bg-[#a855f7]" />
                      <span className="text-[#a855f7] text-[9px] font-bold tracking-[0.5em] uppercase">THE VISIONARY</span>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* TEXT COLUMN */}
            <div className="order-2 lg:order-1 lg:col-span-5 space-y-10 lg:space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-5xl md:text-7xl lg:text-[6.5vw] xl:text-[6vw] 2xl:text-[5vw] leading-[0.8] font-black tracking-tighter uppercase mb-4">
                  SHREENAL<br/>
                  <span className="text-[#a855f7] text-glow">BAWARIA.</span>
                </h2>
                <div className="w-20 h-[1px] bg-[#a855f7]/40" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-white text-xl lg:text-3xl font-light italic leading-tight max-w-lg">
                  &quot;I don&apos;t just paint sneakers; I <span className="text-[#a855f7] font-bold">turn ideas into wearable art</span>.&quot;
                </p>
                <div className="text-white/40 text-sm lg:text-base leading-relaxed max-w-sm font-medium space-y-2">
                  <p>Redefining street culture through high-end, custom hand-painted collectibles. Every piece is curated using premium pigments and techniques, ensuring a legacy of durability.</p>
                  <ul className="space-y-1 text-white/50 text-xs tracking-wider uppercase font-bold pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0" />
                      <span>100% Water & Scratch-Resistant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0" />
                      <span>Bespoke 1-of-1 Commissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0" />
                      <span>Ships Internationally</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-10 pt-4">
                {[
                  { label: 'CRAFT TIME', value: '120+' },
                  { label: 'EDITIONS', value: '1 OF 1' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  >
                    <div className="text-3xl lg:text-5xl font-black text-white tracking-tighter">
                      {stat.value}
                      {stat.label === 'CRAFT TIME' && <span className="text-xs text-[#a855f7] ml-1">HRS</span>}
                    </div>
                    <div className="text-[8px] lg:text-[9px] text-[#a855f7]/60 font-bold tracking-[0.4em] uppercase mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
