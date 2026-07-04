'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-10 border-t border-white/5 relative overflow-hidden select-none">
       {/* ARTISTIC BACKGROUND BRANDING */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-[12vw] font-black text-white/[0.015] tracking-tighter leading-none text-center whitespace-nowrap"
          >
             SHREENAL BAWARIA
          </motion.div>
       </div>

       <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
             
             {/* THE VISION */}
             <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                <div className="space-y-3">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-[#a855f7]" />
                      <span className="text-[#a855f7] text-[9px] font-bold tracking-[0.5em] uppercase">THE VISION</span>
                   </div>
                   <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
                      ARCHIVING IDENTITY <span className="text-[#a855f7]">SINCE 2018.</span>
                   </h2>
                </div>
                
                <p className="text-white/60 text-base lg:text-lg max-w-lg font-medium leading-relaxed italic">
                   &quot;Every drop of paint is a conversation. Every artifact is a legacy.&quot;
                </p>
             </div>

             {/* NAVIGATION & CONNECT */}
             <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-10 pt-2">
                {/* EXPLORE */}
                <div className="space-y-6">
                   <div className="text-[9px] font-bold tracking-[0.4em] text-[#a855f7] uppercase">EXPLORE</div>
                   <div className="flex flex-col gap-3 lg:gap-4">
                      {['ARCHIVE', 'THE PROCESS', 'ABOUT'].map(item => (
                         <a key={item} href={item === 'THE PROCESS' ? '#process' : `#${item.toLowerCase().replace(' ', '')}`} className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-all">
                            <span className="w-0 h-[1px] bg-[#a855f7] group-hover:w-4 transition-all" />
                            {item}
                         </a>
                      ))}
                   </div>
                </div>

                {/* SOCIAL CHANNELS */}
                <div className="space-y-6">
                   <div className="text-[9px] font-bold tracking-[0.4em] text-[#a855f7] uppercase">SOCIAL</div>
                   <div className="flex flex-col gap-3 lg:gap-4">
                      {[
                        { name: 'INSTAGRAM', url: 'https://www.instagram.com/psycartist.customs/' },
                        { name: 'WHATSAPP', url: '#' }
                      ].map(item => (
                         <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-all">
                            <span className="w-0 h-[1px] bg-[#a855f7] group-hover:w-4 transition-all" />
                            {item.name}
                         </a>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* FINAL SIGNATURE */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2">
               <span className="font-black text-lg tracking-tighter text-white uppercase">SHREENAL</span>
               <span className="font-black text-lg tracking-tighter text-[#a855f7] uppercase">BAWARIA.</span>
               <span className="text-[8px] text-white/10 tracking-[0.4em] uppercase ml-2 hidden md:block">| &copy; 2026 DIGITAL STUDIO</span>
             </div>

             <div className="flex gap-6 text-[8px] text-white/20 tracking-[0.4em] uppercase">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
       </div>

       {/* CORNER ACCENT */}
       <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a855f7]/5 blur-[80px] rounded-full -mb-24 -mr-24 pointer-events-none" />
    </footer>
  );
}
