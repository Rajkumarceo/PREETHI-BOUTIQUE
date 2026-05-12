"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#FFFDFB]">
      {/* Subtle Peach Glow Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sandal-pink/20 to-transparent"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sandal-pink/10 blur-[120px] rounded-full mix-blend-multiply opacity-50"></div>
         <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-[#FFE5B4]/20 blur-[150px] rounded-full mix-blend-multiply opacity-50"></div>
      </div>

      <div className="relative z-10">
        <Header onCartClick={() => router.push('/cart')} />
        <main>
        {/* Banner */}
        <div className="relative w-full h-[60vh] md:h-[85vh] bg-soft-gray overflow-hidden">
           <img src="/hero_banner_new.png" alt="Banner" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
           <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent"></div>
           
           <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-4 text-center">
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-sandal-pink mb-4"
             >
               The Festive Edit
             </motion.p>
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-wide drop-shadow-lg"
             >
               Elegance Redefined
             </motion.h2>
             <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-5 rounded-[30px] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-obsidian transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] group flex items-center gap-3 mx-auto"
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                }}
             >
               Explore Collection
               <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
             </motion.button>
           </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
           <p className="text-[11px] text-obsidian/60 font-medium tracking-widest uppercase">Home <span className="mx-2 text-sandal-dark/50">/</span> Women <span className="mx-2 text-sandal-dark/50">/</span> <span className="text-sandal-dark">Indian Wear</span></p>
        </div>

        <ProductGrid onCartOpen={() => router.push('/cart')} />
      </main>
      
        {/* Footer */}
        <footer className="bg-obsidian text-white py-20 px-4 md:px-8 lg:px-16 mt-20 border-t border-sandal-dark/20 relative z-10">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h1 className="font-serif text-[28px] font-bold tracking-tight uppercase flex flex-col leading-none mb-6">
                <span className="text-sandal-dark tracking-wide">PREETHI</span>
                <span className="font-sans text-[10px] font-medium tracking-[0.3em] mt-1 text-white/60">BOUTIQUE</span>
              </h1>
              <p className="text-sm text-white/60 leading-relaxed font-light">Crafting timeless elegance and preserving heritage through exquisite Indian craftsmanship.</p>
            </div>
            <div>
              <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-widest text-sandal-dark">Explore</h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li><a href="/about" className="hover:text-sandal-pink transition-colors cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-sandal-pink transition-colors">Our Artisans</a></li>
                <li><a href="#" className="hover:text-sandal-pink transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-widest text-sandal-dark">Assistance</h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li><a href="#" className="hover:text-sandal-pink transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-sandal-pink transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-sandal-pink transition-colors">Contact Concierge</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-widest text-sandal-dark">Newsletter</h4>
              <p className="text-sm text-white/60 mb-4 font-light">Subscribe to receive updates on new arrivals and private sales.</p>
              <div className="flex border-b border-sandal-dark/50 pb-2">
                 <input type="email" placeholder="Email Address" className="bg-transparent text-sm w-full outline-none placeholder:text-white/30 font-light" />
                 <button className="text-sandal-dark font-sans text-xs uppercase tracking-widest hover:text-sandal-pink transition-colors px-2">Join</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
