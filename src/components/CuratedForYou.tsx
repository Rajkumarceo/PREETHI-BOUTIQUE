"use client";

import { motion } from "framer-motion";

const items = [
  { id: 1, name: "Ivory Chikankari", price: "₹ 14,500", img: "/product_lehenga_chikankari.png" },
  { id: 2, name: "Midnight Velvet", price: "₹ 22,000", img: "/product_velvet.png" },
  { id: 3, name: "Rose Organza", price: "₹ 18,500", img: "/product_anarkali.png" },
  { id: 4, name: "Emerald Silk", price: "₹ 28,000", img: "/product_saree_silk.png" },
  { id: 5, name: "Mustard Haldi Edit", price: "₹ 16,000", img: "/product_lehenga_chikankari.png" },
];

export default function CuratedForYou() {
  return (
    <section className="py-20 pl-4 md:pl-8 lg:pl-16">
      <div className="mb-10 pr-4 md:pr-8 lg:pr-16 flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-obsidian mb-2">Curated for You</h2>
          <p className="font-sans text-sm text-obsidian/60 uppercase tracking-widest">Discover our finest</p>
        </div>
        <a href="#" className="font-sans text-xs border-b border-obsidian pb-1 uppercase tracking-wider hidden sm:block">View All</a>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide pr-4 md:pr-8 lg:pr-16">
        {items.map((item) => (
          <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center cursor-pointer group">
            <div className="w-full h-[400px] md:h-[450px] overflow-hidden mb-4 relative">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-offwhite text-obsidian px-6 py-2 font-sans text-xs uppercase tracking-widest scale-95 group-hover:scale-100 transition-transform duration-300">
                  Quick View
                </button>
              </div>
            </div>
            <h3 className="font-serif text-xl text-obsidian">{item.name}</h3>
            <p className="font-sans text-sm text-obsidian/70 mt-1">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
