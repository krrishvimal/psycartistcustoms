'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ReelCardProps {
  mp4: string;
  id: string;
  title: string;
  tag: string;
  maxDuration?: number;
  index: number;
}

function ReelCard({ mp4, id, title, tag, maxDuration, index }: ReelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRectRef = useRef<SVGRectElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay/pause based on scroll visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      // Stagger play triggers based on index to prevent GPU decoder spikes
      const delay = index * 150;
      const playTimeout = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }, delay);
      
      return () => clearTimeout(playTimeout);
    } else {
      video.pause();
      setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    }
  }, [isInView, index]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const requestRef = useRef<number | null>(null);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  useEffect(() => {
    const updateProgress = () => {
      const video = videoRef.current;
      if (!video) return;

      if (maxDuration && video.currentTime >= maxDuration) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }

      const duration = maxDuration || video.duration;
      if (duration > 0) {
        const progressPct = (video.currentTime / duration) * 100;
        if (progressRectRef.current) {
          progressRectRef.current.setAttribute('stroke-dashoffset', (100 - progressPct).toString());
        }
      }

      if (!video.paused && !video.ended) {
        requestRef.current = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, maxDuration]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onClick={togglePlay}
      className="group relative w-full aspect-[9/16] max-h-[65vh] lg:max-h-[70vh] max-w-[340px] md:max-w-none mx-auto rounded-3xl overflow-hidden border border-white/5 bg-[#050505] cursor-pointer shadow-2xl hover:border-white/10 transition-all duration-500 transform-gpu will-change-transform"
    >
      <video
        ref={videoRef}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
      >
        <source src={mp4.replace('.mp4', '.webm')} type="video/webm" />
        <source src={mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dimming & Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10 opacity-70 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

      {/* Corner Metadata Details */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none z-20">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full bg-[#a855f7] ${isPlaying ? 'animate-ping' : ''}`} />
          <span className="text-[9px] font-bold tracking-[0.4em] text-white/50 uppercase">
            {tag}
          </span>
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] text-[#a855f7]">
          PSYC // {id}
        </span>
      </div>

      {/* Center Interactive Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          animate={{ scale: isPlaying ? 0.9 : 1, opacity: isPlaying ? 0 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
        >
          {isPlaying ? <Pause className="w-6 h-6 ml-0" /> : <Play className="w-6 h-6 ml-1 text-[#a855f7]" />}
        </motion.div>
      </div>

      {/* Bottom Interface Details */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5 pointer-events-none">
            <span className="text-[8px] font-bold tracking-[0.5em] text-[#a855f7]/60 uppercase">PROCESS REEL</span>
            <span className="text-sm font-black text-white tracking-widest uppercase">{title}</span>
          </div>

          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#a855f7] hover:text-black hover:border-[#a855f7] transition-all duration-300 pointer-events-auto shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* Dynamic Golden Border Progress Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
        <rect
          ref={progressRectRef}
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="22"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100}
        />
      </svg>
      
      {/* Museum Lighting Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a855f7]/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
    </motion.div>
  );
}

export default function ReelsShowcase() {
  const reels = [
    {
      mp4: '/reel1.mp4',
      id: '01',
      title: 'Obsession & Paint',
      tag: 'PROCESS SHOT'
    },
    {
      mp4: '/reel2.mp4',
      id: '02',
      title: 'Precision Rhinestones',
      tag: 'CREATIVE FLOW'
    },
    {
      mp4: '/reel3.mp4',
      id: '03',
      title: 'Cherry Blossom Strokes',
      tag: 'CREATIVE PROCESS'
    }
  ];

  return (
    <section id="process-videos" className="relative min-h-screen bg-[#030303] text-white flex items-center py-24 lg:py-32 px-6 lg:px-20 overflow-hidden select-none border-t border-white/5">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/3 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/3 blur-[100px] rounded-full pointer-events-none -ml-32 -mt-32" />

      <div className="container mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#a855f7]" />
              <span className="text-[#a855f7] text-[9px] lg:text-[10px] font-bold tracking-[0.8em] uppercase">
                STUDIO IN ACTION
              </span>
              <div className="w-8 h-[1px] bg-[#a855f7]" />
            </div>
            
            <h2 className="font-bodoni text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight mt-4 mb-3">
              Behind the <span className="italic text-[#a855f7] text-glow">Strokes.</span>
            </h2>
            
            <p className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-light max-w-md leading-relaxed">
              Curated process reels showing the obsessive detail, technique, and creative energy poured into every custom piece.
            </p>
          </motion.div>
        </div>

        {/* Triple Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {reels.map((reel, idx) => (
            <ReelCard
              key={reel.id}
              mp4={reel.mp4}
              id={reel.id}
              title={reel.title}
              tag={reel.tag}
              index={idx}
            />
          ))}
        </div>

      </div>

      <style jsx global>{`
        .font-bodoni { font-family: var(--font-serif), serif !important; }
      `}</style>
    </section>
  );
}
