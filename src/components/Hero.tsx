"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const subscribeResize = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getDesktopSnapshot = () => {
  return window.innerWidth >= 1024;
};

const getServerDesktopSnapshot = () => {
  return false;
};

export default function Hero() {
  const isDesktop = React.useSyncExternalStore(subscribeResize, getDesktopSnapshot, getServerDesktopSnapshot);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeToggle, setActiveToggle] = React.useState<'without' | 'with'>('without');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setIsHovered(false);
  };

  const handleTap = () => {
    setActiveToggle(prev => prev === 'with' ? 'without' : 'with');
  };

  const maskValue = React.useMemo(() => {
    if (isDesktop && isHovered) {
      return `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`;
    }
    if (activeToggle === 'with') {
      return `radial-gradient(circle 200% at center, black 100%, transparent 100%)`;
    }
    return `radial-gradient(circle 0% at center, black 100%, transparent 100%)`;
  }, [isDesktop, isHovered, mousePos, activeToggle]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-[#030303] overflow-hidden selection:bg-[#a855f7] selection:text-black font-sans cursor-auto"
    >
      {/* 1. CENTER BACKGROUND WATERMARK - LUXURY EDITORIAL SERIF */}
      <div className="absolute inset-x-0 top-[18vh] z-0 flex justify-center items-center pointer-events-none select-none lg:hidden">
        <span className="font-bodoni text-[16vw] font-bold text-white/[0.02] tracking-[0.25em] uppercase">
          PSYC
        </span>
      </div>

      {/* 2. BASE IMAGE LAYER (PRISTINE SNEAKER) */}
      <div 
        onClick={handleTap}
        className="absolute inset-0 lg:inset-0 z-5 flex items-center justify-center lg:block cursor-pointer pointer-events-auto"
      >
        <div className="relative w-full h-[52vh] lg:h-full lg:w-full max-w-[95vw] lg:max-w-none mt-6 lg:mt-0">
          <Image 
            src="/plain.png" 
            alt="Pristine Footwear Base" 
            fill 
            priority
            className="object-contain lg:object-cover object-center hero-image-render"
          />
        </div>
      </div>

      {/* 3. INTERACTIVE REVEAL LAYER (PSYCHEDELIC CUSTOM MASTERPIECE) */}
      <motion.div 
        onClick={handleTap}
        className="absolute inset-0 lg:inset-0 z-10 flex items-center justify-center lg:block cursor-pointer pointer-events-auto"
        initial={{ opacity: 0 }}
        style={{ 
          WebkitMaskImage: maskValue,
          maskImage: maskValue
        }}
        animate={{
          opacity: (isDesktop && isHovered) || activeToggle === 'with' ? 1 : 0
        }}
        transition={{ 
          opacity: { duration: 0.35, ease: "easeInOut" }
        }}
      >
        <div className="relative w-full h-[52vh] lg:h-full lg:w-full max-w-[95vw] lg:max-w-none mt-6 lg:mt-0">
          <Image 
            src="/design.png" 
            alt="Hand-painted Reveal Design" 
            fill 
            priority
            className="object-contain lg:object-cover object-center hero-image-render"
          />
        </div>
      </motion.div>

      {/* 3.8 SOFT GRADIENT VIGNETTE FOR CRITICAL CONTRAST ON MOBILE */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-[#030303] via-[#030303]/90 to-transparent z-15 pointer-events-none lg:hidden" />

      {/* 3.9 HORIZONTAL GRADIENT VIGNETTE ON DESKTOP FOR TEXT READABILITY & IMAGE BLENDING */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent z-15 pointer-events-none" />

      {/* 4. EDITORIAL UI CONTENT (TOP LAYER) */}
      <div className="absolute inset-0 z-20 pointer-events-none pb-12 lg:pb-20 pt-8 lg:pt-14 px-6 md:px-10 lg:px-20 flex flex-col justify-end lg:justify-start gap-4 lg:gap-8">
        
        {/* Top Header Row - Hidden on Mobile */}
        <div className="hidden lg:flex justify-between items-start mt-24 lg:mt-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-[#a855f7] text-[8px] tracking-[0.4em] font-bold uppercase mb-1">ART // EXPRESSION // IDENTITY</span>
            <div className="h-[1px] w-12 bg-[#a855f7]/40" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-end gap-1"
          >
            <span className="text-white text-[8px] tracking-[0.4em] font-medium opacity-40">ALCHEMY // SERIES 002</span>
            <span className="text-[#a855f7] text-[8px] tracking-[0.4em] font-bold uppercase">1-OF-1 COLLECTIBLES</span>
          </motion.div>
        </div>

        {/* Middle Main Content Row */}
        <div className="flex items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-lg flex flex-col gap-4 lg:gap-6"
          >
            {/* Interactive hint prompt for mobile */}
            <span className="text-[#a855f7] text-[8px] tracking-[0.3em] uppercase font-bold opacity-75 mb-1 block lg:hidden animate-pulse">
              [ TAP SNEAKER TO REVEAL THE ART ]
            </span>
            
            <h1 className="font-bodoni text-4xl md:text-5xl lg:text-7xl xl:text-[5.5rem] text-white leading-[0.85] tracking-tight">
              WEARABLE<br/>
              ART . MADE TO <span className="text-[#a855f7] text-glow">STAND<br/>APART.</span>
            </h1>
            <p className="text-white/40 text-[9px] md:text-[11px] tracking-[0.2em] leading-relaxed max-w-sm uppercase font-light -mt-2 lg:-mt-4">
              Hand-painted customized sneakers, handbags, wallets, and accessories. Elevating everyday items into luxury digital artifacts.
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .font-bodoni { font-family: var(--font-serif), serif !important; }
        .font-sans { font-family: var(--font-sans), sans-serif; }
      `}</style>
    </section>
  );
}
