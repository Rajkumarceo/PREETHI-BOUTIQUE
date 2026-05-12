"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

export default function SizeFitModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-offwhite w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-obsidian/10 flex justify-between items-center bg-offwhite">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-obsidian" strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-obsidian">Find Your Size</h2>
              </div>
              <button onClick={onClose} className="text-obsidian hover:text-gold-200 transition-colors">
                <X strokeWidth={1} />
              </button>
            </div>
            
            <div className="p-8 space-y-6 bg-offwhite">
              <p className="font-sans text-sm text-obsidian/70">
                Enter your measurements below and we'll recommend the perfect fit based on this garment's exact dimensions.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-obsidian/60 mb-2">Height (cm)</label>
                  <input type="number" placeholder="165" className="w-full border border-obsidian/20 bg-transparent px-4 py-3 font-sans outline-none focus:border-obsidian transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-obsidian/60 mb-2">Bust (inches)</label>
                  <input type="number" placeholder="34" className="w-full border border-obsidian/20 bg-transparent px-4 py-3 font-sans outline-none focus:border-obsidian transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-obsidian/60 mb-2">Waist (inches)</label>
                  <input type="number" placeholder="28" className="w-full border border-obsidian/20 bg-transparent px-4 py-3 font-sans outline-none focus:border-obsidian transition-colors" />
                </div>
              </div>

              <button className="w-full bg-obsidian text-offwhite py-4 mt-4 font-sans text-xs uppercase tracking-widest hover:bg-gold-200 hover:text-obsidian transition-colors">
                Calculate Size
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
