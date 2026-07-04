'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // PRE-LOAD HERO ASSETS FOR SEAMLESS PERFORMANCE
  useEffect(() => {
    const heroAssets = [
      '/plain.png',
      '/design.png',
      '/shoes_showcase.png',
      '/bag_showcase.png',
      '/wallet_showcase.png',
      '/controller_showcase.png'
    ];

    heroAssets.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // CONTROL LUXURY TRANSITION TIMELINE (Exactly 2.2 seconds to initiate exit cross-fade)
  useEffect(() => {
    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 2200);

    return () => clearTimeout(completeTimer);
  }, []);

  const firstName = "SHREENAL".split("");
  const lastName = "BAWARIA.".split("");

  // Premium editorial ease curve
  const luxEase = [0.16, 1, 0.3, 1] as [number, number, number, number]; 

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
      exit={{ 
        opacity: 0, 
        scale: 1.03,
        filter: 'blur(15px)',
        transition: { duration: 0.65, ease: luxEase } 
      }}
    >
      {/* 1. OVERSIZED BLURRED BACKGROUND TYPOGRAPHY (Exhibition vibe) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(40px)' }}
          animate={{ 
            opacity: 0.02, 
            scale: 1,
            filter: 'blur(20px)'
          }}
          transition={{ duration: 2.5, ease: luxEase }}
          className="font-sans font-black text-[35vw] text-white tracking-tighter uppercase"
        >
          SB
        </motion.div>
      </div>

      {/* 2. SOFTEST AMBIENT DUST PARTICLES (Luxury focus) */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-30">
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[20%] left-[30%] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[60%] left-[80%] animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute w-[1.5px] h-[1.5px] bg-[#a855f7] rounded-full top-[40%] left-[70%] animate-ping" style={{ animationDuration: '5s' }} />
      </div>

      {/* 3. TYPOGRAPHY-DRIVEN BRAND REVEAL */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 lg:gap-6 px-10">
        {/* Curated Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 10, letterSpacing: '0.4em' }}
          animate={{ opacity: 0.35, y: 0, letterSpacing: '0.6em' }}
          transition={{ duration: 1.2, delay: 0.2, ease: luxEase }}
          className="text-white text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.6em] mb-2"
        >
          THE ART ARCHIVE OF
        </motion.span>

        {/* Master Identity Layout */}
        <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-2">
          {/* FirstName: PSYC */}
          <motion.div 
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.3em' }}
            transition={{ duration: 2, ease: luxEase }}
            className="flex items-center text-white font-sans font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.3em] pl-[0.3em]"
          >
            {firstName.map((char, index) => (
              <span key={index} className="inline-block overflow-hidden h-[1.2em] relative">
                <motion.span
                  initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.3 + index * 0.05, 
                    ease: luxEase 
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>

          {/* LastName: ARTIST. */}
          <motion.div 
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.3em' }}
            transition={{ duration: 2, ease: luxEase }}
            className="flex items-center text-[#a855f7] font-sans font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.3em] pl-[0.3em] text-glow"
          >
            {lastName.map((char, index) => (
              <span key={index} className="inline-block overflow-hidden h-[1.2em] relative">
                <motion.span
                  initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6 + index * 0.05, 
                    ease: luxEase 
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* 4. GILDED PURPLE ACCENT LINE */}
        <div className="relative w-40 md:w-60 h-[1.5px] mt-6 overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: luxEase }}
            className="w-full h-full bg-gradient-to-r from-transparent via-[#a855f7]/60 to-transparent origin-center"
          />
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
          />
        </div>

        {/* Exhibition volume identifier */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="flex gap-8 text-[7px] md:text-[8px] font-bold tracking-[0.4em] text-white uppercase mt-4"
        >
          <span>EXHIBIT VOL. 002</span>
          <span>{"//"}</span>
          <span>1-OF-1 COLLECTIBLES</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
