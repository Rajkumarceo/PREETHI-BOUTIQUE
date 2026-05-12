"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";

const filters = {
  Craft: ["Chikankari", "Zardosi", "Block Print", "Gota Patti"],
  Fabric: ["Pure Georgette", "Organza", "Banarasi Silk", "Velvet"],
  "Sleeve/Neckline": ["Sweetheart", "V-Neck", "Full Sleeves", "Sleeveless"],
};

export default function StyleMatrixFilter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/40 z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[350px] bg-offwhite z-50 shadow-2xl flex flex-col border-r border-gold-200/30"
          >
            <div className="p-6 border-b border-obsidian/10 flex justify-between items-center bg-offwhite">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-obsidian" strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-obsidian">Style Matrix</h2>
              </div>
              <button onClick={onClose} className="text-obsidian hover:text-gold-200 transition-colors">
                <X strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-obsidian/60 mb-4">{category}</h3>
                  <div className="space-y-3">
                    {options.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-obsidian/30 flex items-center justify-center group-hover:border-obsidian transition-colors">
                          <div className="w-2 h-2 bg-obsidian opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <span className="font-sans text-sm text-obsidian group-hover:text-gold-200 transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-obsidian/10 bg-offwhite">
              <button className="w-full bg-obsidian text-offwhite py-3 font-sans text-xs uppercase tracking-widest hover:bg-gold-200 hover:text-obsidian transition-colors">
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
