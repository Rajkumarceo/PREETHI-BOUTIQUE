"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-obsidian min-h-screen text-white selection:bg-nykaa-pink selection:text-white pb-32">
      <Header onCartClick={() => router.push('/cart')} />

      {/* Cinematic Hero */}
      <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src="/about_hero_peach_gold.png" alt="Heritage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.5 }}
             className="font-serif italic text-6xl md:text-9xl text-sandal-bg tracking-tighter mb-6"
           >
             The Atelier
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="font-sans text-xs md:text-sm uppercase tracking-[0.5em] text-sandal-dark font-bold"
           >
             Crafting Legacies Since 2012
           </motion.p>
        </div>
      </div>

      {/* Chapter I: The Vision */}
      <div className="max-w-[1200px] mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="md:col-span-5"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-sandal-dark mb-4 border-b border-sandal-dark/30 pb-4 inline-block">Chapter I</p>
          <h2 className="font-serif italic text-4xl md:text-6xl text-white mb-8">The Vision</h2>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Preethi Boutique began not as a store, but as a sanctuary for India's fading textile arts. In a world of fast fashion, we chose the slow, deliberate path of the artisan. Every thread is a deliberate choice, every weave a testament to patience.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-7 h-[600px] rounded-[2px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <img src="/peach_gold_dress_1.png" alt="The Vision" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Chapter II: The Hands That Create */}
      <div className="max-w-[1400px] mx-auto px-4 py-32">
        <div className="text-center mb-24">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-sandal-dark mb-4">Chapter II</p>
          <h2 className="font-serif italic text-5xl md:text-7xl text-white">Mastery of Craft</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
           <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-[500px] group overflow-hidden relative">
             <img src="/peach_gold_kurta_4.png" alt="Craft" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-700" />
           </motion.div>
           <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-[500px] md:mt-24 group overflow-hidden relative">
             <img src="/peach_gold_saree_2.png" alt="Craft" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-700" />
           </motion.div>
           <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="h-[500px] group overflow-hidden relative">
             <img src="/peach_gold_lehenga_3.png" alt="Craft" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-700" />
           </motion.div>
        </div>
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="text-white/60 text-xl leading-loose font-light">
            We collaborate with over 40 master artisan families across Varanasi, Lucknow, and Kanchipuram. By preserving traditional looms and ancient dyeing techniques, we don't just create garments—we curate wearable history.
          </p>
        </div>
      </div>

      {/* Chapter III: The Future */}
      <div className="border-t border-white/10 mt-32 pt-32 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif italic text-4xl md:text-6xl text-sandal-dark mb-10">Minimalism Meets Heritage</h2>
          <p className="text-white/80 text-lg md:text-2xl leading-relaxed font-light mb-16">
            The modern woman is complex, dynamic, and forward-looking. She deserves a wardrobe that honors her ancestral roots while speaking the clean, powerful language of contemporary design. This is our promise.
          </p>
          <button onClick={() => router.push('/')} className="bg-white text-obsidian px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-sandal-pink transition-colors">
            Enter The Boutique
          </button>
        </motion.div>
      </div>
    </div>
  );
}
