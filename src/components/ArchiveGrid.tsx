'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useRef, memo } from 'react';
import Image from 'next/image';

const archiveItems = [
  { 
    id: '01', 
    title: 'SNEAKERS', 
    image: '/shoes_showcase.png',
    ref: '#PA-442',
    craft: '120 HOURS',
    tag: 'MASTERPIECE'
  },
  { 
    id: '02', 
    title: 'HANDBAGS', 
    image: '/bag_showcase.png',
    ref: '#PA-215',
    craft: '85 HOURS',
    tag: 'ARTISAN'
  },
  { 
    id: '03', 
    title: 'WALLETS', 
    image: '/wallet_showcase.png',
    ref: '#PA-098',
    craft: '45 HOURS',
    tag: 'COLLECTIBLE'
  },
  { 
    id: '04', 
    title: 'CONTROLLERS', 
    image: '/controller_showcase.png',
    ref: '#PA-731',
    craft: '65 HOURS',
    tag: 'LIMITED'
  },
];

interface ArchiveCardProps {
  item: {
    id: string;
    title: string;
    image: string;
    ref: string;
    craft: string;
    tag: string;
  };
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const ArchiveCard = memo(({ item, index, hoveredId, setHoveredId }: ArchiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const isHovered = hoveredId === item.id;
  const isDimmed = hoveredId !== null && !isHovered;
  const isStaggered = index % 2 === 1;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => {
        setHoveredId(null);
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-[#050505] transition-all duration-500 ${isDimmed ? 'scale-[0.98]' : 'scale-100'} ${isStaggered ? 'lg:translate-y-12' : ''}`}
    >
      <Image 
        src={item.image} 
        alt={item.title} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`} 
      />
      
      {/* Dimming Overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-all duration-700 pointer-events-none ${isDimmed ? 'bg-black/60 backdrop-blur-[2px] grayscale' : 'bg-transparent'}`}
      />

      {/* Main Content Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700 z-20" />
      
      {/* Archive Header Detail */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-[9px] font-bold tracking-[0.4em] text-white/40 uppercase group-hover:text-[#a855f7] transition-colors">
            {item.ref}
          </span>
        </div>
        <span className={`text-[8px] font-black tracking-[0.3em] px-2 py-1 rounded-sm border transition-all duration-500 ${isHovered ? 'text-[#a855f7] border-[#a855f7]/20 bg-[#a855f7]/5 text-glow' : 'text-transparent border-transparent'}`}>
          {item.tag}
        </span>
      </div>

      {/* Center ID Number */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] transition-opacity duration-500 ${isHovered ? 'opacity-0' : ''}`}>
        <span className="text-[20vw] font-black tracking-tighter text-white">{item.id}</span>
      </div>

      {/* Technical Data */}
      <div className={`absolute top-1/2 left-8 transform -translate-y-1/2 z-30 transition-all duration-700 delay-100 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold tracking-[0.5em] text-[#a855f7] uppercase">Process Duration</span>
          <span className="text-2xl font-black text-white tracking-tighter">{item.craft}</span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-30">
        <div className="flex flex-col gap-1">
          <span className={`text-[10px] font-bold tracking-[0.5em] uppercase text-white/90 transition-all duration-500 ${isHovered ? '-translate-y-2' : 'translate-y-0'}`}>
            {item.title}
          </span>
          <div className={`h-[1px] bg-[#a855f7] transition-all duration-700 ${isHovered ? 'w-full' : 'w-0'}`} />
        </div>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#a855f7] border-[#a855f7] text-black' : 'bg-transparent border-white/10 text-white'}`}>
          <ArrowRight className="w-4 h-4 transition-colors" />
        </div>
      </div>

      {/* Museum Lighting Glow */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-[#a855f7]/10 via-transparent to-white/5 transition-opacity duration-700 pointer-events-none z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
});

ArchiveCard.displayName = 'ArchiveCard';

export default function ArchiveGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="archive" className="relative min-h-screen bg-[#030303] text-white flex items-center py-32 px-6 lg:px-20 overflow-hidden select-none border-t border-white/5">
      
      {/* Atmospheric Background Auras */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a855f7]/3 blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="container mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-[1px] bg-[#a855f7]" />
                <span className="text-[#a855f7] text-[11px] font-bold tracking-[0.8em] uppercase">MUSEUM ARCHIVE</span>
              </div>
              <h2 className="text-[12vw] lg:text-[5vw] font-black leading-[0.82] tracking-tighter uppercase">
                THE<br />
                <span className="text-white/30 italic font-light lowercase font-serif px-2">Alchemy</span><br />
                <span className="text-[#a855f7] text-glow">OF IDENTITY.</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:col-span-4 pb-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="space-y-10">
              <p className="text-white/40 text-sm leading-relaxed tracking-widest uppercase font-bold max-w-xs">
                A definitive collection of objects transformed through obsession, narrative, and soul.
              </p>
              <div className="flex items-center gap-6 group cursor-pointer w-fit">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#a855f7] transition-all group-hover:tracking-[0.7em]">Discover All Works</span>
                <div className="w-16 h-[1px] bg-[#a855f7] group-hover:w-24 transition-all duration-700" />
                <ArrowRight className="w-4 h-4 text-[#a855f7]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Masterpiece Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {archiveItems.map((item, index) => (
            <ArchiveCard 
              key={item.id} 
              item={item} 
              index={index} 
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>

        {/* Signature Line */}
        <div className="mt-24 h-[1px] w-full bg-white/5 relative flex justify-center overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            whileInView={{ x: '100%' }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-[#a855f7]/60 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
