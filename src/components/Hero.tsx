"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#f9f5f0]">
      <img 
        src="/hero_wedding_saree.png" 
        alt="Wedding Collection" 
        className="absolute inset-0 w-full h-full object-cover object-left"
      />
      {/* Gradient overlay to ensure text readability on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f9f5f0]/40 to-[#f9f5f0] w-full h-full md:w-[60%] md:left-[40%]"></div>
      
      <div className="absolute inset-0 flex flex-col items-end justify-center px-4 md:px-24">
        <div className="w-full md:w-[50%] flex flex-col items-center text-center z-10 mr-0 lg:mr-24 pt-10">
          
          {/* Lotus / Mandala Icon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b08d57" strokeWidth="1" className="mx-auto text-gold-200 fill-[#b08d57]">
              <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2Z" fillOpacity="0.8"/>
              <path d="M12 22C12 22 17 19 21 15C25 11 21 7 21 7C21 7 17 11 12 15C7 11 3 7 3 7C3 7 -1 11 3 15C7 19 12 22 12 22Z" fillOpacity="0.6"/>
              <path d="M12 18C12 18 16 16 19 13C22 10 21 6 21 6C21 6 18 8 12 12C6 8 3 6 3 6C3 6 2 10 5 13C8 16 12 18 12 18Z" fillOpacity="0.4"/>
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="w-12 h-[1px] bg-[#b08d57] relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#b08d57] rotate-45"></div>
            </div>
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#735353] font-medium">
              Made For Your
            </p>
            <div className="w-12 h-[1px] bg-[#b08d57] relative">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#b08d57] rotate-45"></div>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[11px] sm:text-[13px] tracking-[0.25em] uppercase text-[#735353] font-medium mb-4"
          >
            Special Moments
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full flex justify-center mb-8"
          >
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[110px] leading-none text-peach-maroon tracking-wider font-medium text-center z-10 w-full">
              WEDDING
            </h2>
            <h3 className="font-script text-5xl md:text-7xl lg:text-[90px] text-[#cca052] absolute top-1/2 md:top-[60%] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap transform -rotate-2">
              Collection
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2 text-[#cca052]">
               <div className="w-6 h-[1px] bg-[#cca052]"></div>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                 <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="currentColor"/>
               </svg>
               <div className="w-6 h-[1px] bg-[#cca052]"></div>
            </div>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="font-sans text-[#4a3b3b] text-sm md:text-[15px] leading-relaxed mb-8 max-w-md mx-auto tracking-wide"
          >
            Timeless elegance in every thread.<br />
            Crafted for a lifetime of memories.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-peach-maroon text-[#cca052] px-8 py-3 rounded-full font-sans text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-[#3d1018] transition-colors shadow-lg"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* Bottom Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-start justify-center gap-8 md:gap-16 mt-16 border-t border-[#b08d57]/30 pt-6 w-full max-w-xl mx-auto"
          >
            <div className="flex flex-col items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#735353" strokeWidth="1">
                 <path d="M12 22C12 22 17 19 21 15C25 11 21 7 21 7C21 7 17 11 12 15C7 11 3 7 3 7C3 7 -1 11 3 15C7 19 12 22 12 22Z" />
              </svg>
              <span className="font-sans text-[10px] font-medium text-[#735353] tracking-widest uppercase text-center w-20">Premium Fabrics</span>
            </div>
            <div className="flex flex-col items-center gap-3 border-l border-[#b08d57]/30 pl-8 md:pl-16">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#735353" strokeWidth="1">
                 <circle cx="12" cy="12" r="10" />
                 <path d="M12 2V6M12 18V22M2 12H6M18 12H22" />
                 <path d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
              </svg>
              <span className="font-sans text-[10px] font-medium text-[#735353] tracking-widest uppercase text-center w-20">Timeless Designs</span>
            </div>
            <div className="flex flex-col items-center gap-3 border-l border-[#b08d57]/30 pl-8 md:pl-16">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#735353" strokeWidth="1">
                 <path d="M12 22C12 22 21 16 21 10C21 5 16 2 12 6C8 2 3 5 3 10C3 16 12 22 12 22Z" />
              </svg>
              <span className="font-sans text-[10px] font-medium text-[#735353] tracking-widest uppercase text-center w-20">Made for Memories</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
