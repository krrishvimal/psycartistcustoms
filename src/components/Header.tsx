'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState('12:00 PM');

  // UPDATE LIVE MUMBAI TIME
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()).toUpperCase());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // DETECT SCROLL FOR GLASSMORPHISM TRANSITION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#archive' },
    { name: 'PROCESS', href: '#process' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-center items-center bg-transparent pointer-events-none"
      >
        <div 
          className={`
            relative w-full max-w-[1200px] rounded-full px-4 sm:px-6 lg:px-10 py-3 lg:py-4 flex justify-between items-center pointer-events-auto transition-all duration-500
            ${scrolled ? 'glass-header-scrolled' : 'glass-header'}
          `}
        >
          {/* LEFT: Logo with dynamic letter-spacing hover */}
          <motion.div 
            whileHover={{ letterSpacing: '0.08em' }}
            className="flex items-center cursor-pointer select-none font-sans font-black text-sm md:text-base tracking-normal uppercase transition-all duration-300"
          >
            <span className="text-white">SHREENAL</span>
            <span className="text-[#a855f7] ml-1 text-glow-white">BAWARIA.</span>
          </motion.div>
          
          {/* CENTER: Live Studio Status & Location (Desktop Only) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2.5 select-none pointer-events-none opacity-40 hover:opacity-80 transition-opacity duration-300">
            <span className="font-sans text-[8px] font-bold tracking-[0.4em] text-white">{time}</span>
            <span className="w-1.5 h-[1px] bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" style={{ animationDuration: '2s' }} />
              <span className="font-sans text-[8px] font-bold tracking-[0.4em] text-[#a855f7]">ACTIVE</span>
            </div>
          </div>

          {/* RIGHT: Navigation Links with dynamic sliding pill (Desktop Only) */}
          <div 
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-1 relative"
          >
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <motion.a 
                  href={link.href} 
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="relative px-3 lg:px-5 py-2 text-[8px] font-bold tracking-[0.4em] uppercase text-white/85 hover:text-white transition-colors duration-300 z-10 flex items-center justify-center"
                >
                  <span className="relative z-10">{link.name}</span>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#a855f7]/10 border border-[#a855f7]/25 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
                {index < navLinks.length - 1 && (
                  <div className="w-[1px] h-3 bg-white/10 self-center" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* RIGHT: Mobile Menu Trigger (Mobile Only) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto"
          >
            MENU
          </button>
        </div>
      </motion.nav>

      {/* FULL SCREEN EDITORIAL MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-3xl flex flex-col justify-between p-8 md:p-16 pt-32 md:pt-40 pointer-events-auto select-none"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold tracking-[0.4em] text-white cursor-pointer transition-all hover:bg-white hover:text-black"
            >
              CLOSE
            </button>

            {/* Large Editorial Links */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-black tracking-tighter text-white hover:text-[#a855f7] transition-colors uppercase leading-none"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom Metadata inside mobile overlay */}
            <div className="flex flex-col gap-2 pt-8 border-t border-white/5">
              <span className="text-[#a855f7] text-[9px] font-bold tracking-[0.4em] uppercase">SHREENAL BAWARIA DIGITAL STUDIO</span>
              <div className="flex items-center justify-between text-white/40 text-[8px] tracking-[0.3em] uppercase">
                <span>MUMBAI // GMT+5:30</span>
                <span>ACTIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
