'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutArtist from '@/components/AboutArtist';
import ReelsShowcase from '@/components/ReelsShowcase';
import ArchiveGrid from '@/components/ArchiveGrid';
import Craftsmanship from '@/components/Craftsmanship';
import OrderConcierge from '@/components/OrderConcierge';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#030303]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="studio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Header />
            <Hero />
            <AboutArtist />
            <ReelsShowcase />
            <ArchiveGrid />
            <Craftsmanship />
            <OrderConcierge />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
