'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    step: '01',
    title: 'THE DIALOGUE',
    desc: 'Every masterpiece begins with a deep consultation. We discuss your ideas, inspirations, and specific requirements to translate your story into a conceptual blueprint.',
    image: '/process_vision.png',
    tags: ['Consultation', 'Storytelling']
  },
  {
    step: '02',
    title: 'THE BLUEPRINT',
    desc: 'Based on our discussion, we prepare digital mockups. This is where you share your inputs, adding or deleting elements until the design perfectly reflects your vision.',
    image: '/process_blueprint.png',
    tags: ['Design Planning', 'Feedback']
  },
  {
    step: '03',
    title: 'THE ALCHEMY',
    desc: 'The curation begins. Using permanent, water-resistant pigments, we spend 1.5 to 2 weeks meticulously hand-painting every detail of your 1-of-1 design.',
    image: '/process_painting.png',
    tags: ['1.5-2 Weeks', 'Curation']
  },
  {
    step: '04',
    title: 'THE LEGACY',
    desc: 'All custom artworks are durable and fadeproof. The final piece is sealed and delivered in a custom luxury presentation drawer box, complete with a signed certificate.',
    image: '/process_finishing.png',
    tags: ['Durable Finish', 'Fadeproof']
  }
];

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Craftsmanship() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pin = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: `-${(stages.length - 1) * 100}vw`,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${sectionRef.current?.offsetWidth || 0}`,
            invalidateOnRefresh: true,
          }
        }
      );
      return () => pin.kill();
    });

    return () => mm.revert();
  }, [isMounted]);

  if (!isMounted) return <section className="h-screen bg-black" />;

  return (
    <div ref={triggerRef} id="process" className="relative overflow-hidden bg-black select-none">
      
      {/* RESPONSIVE SCROLL CONTAINER - HORIZONTAL ON DESKTOP, VERTICAL ON MOBILE */}
      <div 
        ref={sectionRef} 
        className="flex flex-col lg:flex-row lg:h-screen lg:w-[400vw] relative bg-black"
      >
        {stages.map((stage) => (
          <section 
            key={stage.step} 
            className="min-h-screen lg:h-screen w-full lg:w-screen flex items-center justify-center relative px-6 md:px-12 lg:px-20 py-20 lg:py-0 lg:pt-24 overflow-hidden border-b border-white/5 lg:border-none"
          >
            {/* Background Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-white/[0.008] z-0 pointer-events-none">
              {stage.step}
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center z-10">
              
              {/* Image Section - Framed for Luxury */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative aspect-square lg:aspect-[4/5] max-h-[50vh] lg:max-h-[75vh] w-full rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10"
              >
                <Image 
                  src={stage.image} 
                  alt={stage.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 lg:hidden text-4xl font-black text-white/20">{stage.step}</div>
              </motion.div>

              {/* Content Section - Scaled for Mobile */}
              <div className="space-y-6 lg:space-y-14">
                <div className="space-y-3 lg:space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[#a855f7] text-glow text-[10px] lg:text-xs font-bold tracking-[0.5em] uppercase">{stage.step}</span>
                    <div className="w-8 lg:w-12 h-[1px] bg-[#a855f7]/30" />
                    <span className="text-white/20 text-[9px] lg:text-[10px] font-bold tracking-[0.3em] uppercase">THE PROCESS</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                    {stage.title.split(' ')[0]}<br/>
                    <span className="text-[#a855f7] text-glow">{stage.title.split(' ')[1] || ''}</span>
                  </h2>
                </div>

                <p className="text-white/50 text-sm md:text-lg lg:text-xl leading-relaxed max-w-xl">
                  {stage.desc}
                </p>

                <div className="flex flex-wrap gap-3 pt-2 lg:pt-4">
                  {stage.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-full border border-white/10 text-[8px] lg:text-[10px] font-bold tracking-widest text-white/40 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
