'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConcierge() {
  const [activeArticles, setActiveArticles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleArticle = (article: string) => {
    setActiveArticles(prev => 
      prev.includes(article) ? prev.filter(a => a !== article) : [...prev, article]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const articleCategories = [
    'Shoes (Sneakers, Boots, Heels)',
    'Apparels (Denim, Leather Jackets, T-shirts)',
    'Accessories (Handbags, Wallets, Passport Covers)',
    'Electronics (Controllers, Guitars)',
    'Other'
  ];

  return (
    <section id="contact" className="bg-[#030303] text-white py-20 lg:py-40 relative overflow-hidden border-t border-white/5 select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#a855f7]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Content: Key Info */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-16">
            <div className="space-y-4 lg:space-y-6">
              <span className="text-[#a855f7] text-[10px] font-bold tracking-[0.8em] uppercase block">ORDER CONCIERGE</span>
              <h2 className="text-5xl md:text-[5vw] font-black leading-[0.9] tracking-tighter uppercase">
                CURATE YOUR<br />
                <span className="text-[#a855f7]" style={{ WebkitTextStroke: '1px var(--color-accent)', color: 'transparent' }}>STORY.</span>
              </h2>
            </div>
            
            <div className="space-y-8 lg:space-y-10">
               <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-[#a855f7] text-[9px] font-bold tracking-[0.4em] uppercase">Investment</h3>
                  <div className="text-white/40 text-base lg:text-lg leading-relaxed max-w-md">
                     Customisation ranges between <span className="text-white font-bold">INR 25,000 - 50,000</span> and scales with design complexity.
                     <br/><br/>
                     <span className="text-white/80 font-bold italic">Exclusive 1-of-1 designs begin at INR 60,000.</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[#a855f7] text-[9px] font-bold tracking-[0.4em] uppercase">Terms</h3>
                  <ul className="text-white/40 text-sm space-y-3 max-w-sm">
                     <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#a855f7] mt-0.5 shrink-0" />
                        <span>INR 10,000 non-refundable advance to initiate mockups.</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#a855f7] mt-0.5 shrink-0" />
                        <span>Charges do not include the base article or shipping.</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#a855f7] mt-0.5 shrink-0" />
                        <span>Ship your article to us or we can source it for you.</span>
                     </li>
                  </ul>
               </div>

               <div className="space-y-2 pt-4">
                  <div className="text-[9px] font-bold tracking-[0.4em] text-[#a855f7] uppercase">Global Studio</div>
                  <div className="text-lg lg:text-xl font-light tracking-widest text-white/80 hover:text-[#a855f7] transition-colors cursor-pointer">STUDIO@PSYCARTISTCUSTOMS.COM</div>
               </div>
            </div>
          </div>

          {/* Right Form: The Concierge Application */}
          <div className="lg:col-span-7 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2rem] lg:rounded-[3rem] shadow-3xl min-h-[500px] flex flex-col justify-center">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center py-10 space-y-6 lg:space-y-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 lg:w-20 lg:h-20 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full flex items-center justify-center text-[#a855f7] mb-2 text-glow"
                >
                  <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12" />
                </motion.div>
                
                <div className="space-y-3">
                  <span className="text-[#a855f7] text-[9px] font-bold tracking-[0.5em] uppercase">APPLICATION SECURED</span>
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter leading-none uppercase">
                    THE DIALOGUE<br />
                    <span className="text-[#a855f7] text-glow">BEGINS.</span>
                  </h3>
                </div>

                <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-sm font-medium">
                  Your project vision has been transmitted to the archive. Shreenal will personally review your application and connect within 12–24 hours via WhatsApp.
                </p>

                <div className="w-12 h-[1px] bg-white/10 my-4" />

                <div className="flex flex-col items-center gap-2">
                  <span className="text-white/30 text-[8px] font-bold tracking-widest uppercase">ESTIMATED RESPONSE</span>
                  <span className="text-[#a855f7] text-[10px] font-bold tracking-widest uppercase">TODAY // 12-24 HOURS</span>
                </div>

                <button 
                  onClick={() => { setSubmitted(false); setActiveArticles([]); }}
                  className="mt-6 text-[9px] font-bold tracking-[0.4em] text-white/30 hover:text-white transition-colors uppercase border-b border-white/10 hover:border-white pb-1"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </motion.div>
            ) : (
              <form className="space-y-8 lg:space-y-10" onSubmit={handleSubmit}>
                
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  <div className="space-y-3 group">
                    <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase group-focus-within:text-[#a855f7] transition-colors">FULL NAME *</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#a855f7] transition-all text-base lg:text-lg font-light tracking-widest" placeholder="ALEXANDER VANE" required />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase group-focus-within:text-[#a855f7] transition-colors">WHATSAPP *</label>
                    <input type="tel" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#a855f7] transition-all text-base lg:text-lg font-light tracking-widest" placeholder="+91 00000 00000" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                   <div className="space-y-3 group">
                      <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase group-focus-within:text-[#a855f7] transition-colors">SOCIAL HANDLE *</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#a855f7] transition-all text-base lg:text-lg font-light tracking-widest" placeholder="@INSTAGRAM" required />
                   </div>
                   <div className="space-y-3 group">
                      <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase group-focus-within:text-[#a855f7] transition-colors">DO YOU HAVE THE ARTICLE? *</label>
                      <div className="flex gap-8 pt-1">
                         {['YES', 'NO'].map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                               <input type="radio" name="hasArticle" className="hidden peer" />
                               <div className="w-3.5 h-3.5 rounded-full border border-white/20 peer-checked:bg-[#a855f7] peer-checked:border-[#a855f7] transition-all" />
                               <span className="text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white transition-colors uppercase">{opt}</span>
                            </label>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Article Selection */}
                <div className="space-y-4 lg:space-y-6">
                  <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase">ARTICLES *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                     {articleCategories.map(article => (
                        <div 
                          key={article} 
                          onClick={() => toggleArticle(article)}
                          className={`p-3 lg:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                             activeArticles.includes(article) ? 'bg-[#a855f7]/10 border-[#a855f7] text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20'
                          }`}
                        >
                           <span className="text-[10px] font-bold tracking-widest uppercase">{article}</span>
                           {activeArticles.includes(article) && <CheckCircle2 className="w-4 h-4 text-[#a855f7]" />}
                        </div>
                     ))}
                  </div>
                </div>

                {/* Queries */}
                <div className="space-y-3 group">
                  <label className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase group-focus-within:text-[#a855f7] transition-colors">PROJECT VISION</label>
                  <textarea rows={2} className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#a855f7] transition-all text-base lg:text-lg font-light tracking-widest resize-none" placeholder="Describe your dream customisation..." />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                  <div className="flex items-center gap-4 text-white/20">
                     <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                     <span className="text-[8px] lg:text-[9px] font-bold tracking-widest uppercase">Response time: 12-24 Hours</span>
                  </div>
                  
                  <button type="submit" className="w-full md:w-fit group relative flex items-center gap-6 px-10 py-5 bg-[#a855f7] text-black font-black text-xs tracking-[0.4em] uppercase overflow-hidden transition-all hover:bg-white active:scale-95">
                    SUBMIT APPLICATION
                    <Send className="w-4 h-4 transition-all group-hover:translate-x-2" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
