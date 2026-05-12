"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, onCartOpen }: { product: Product, onCartOpen?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const router = useRouter();

  const isSaved = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    if (onCartOpen) onCartOpen();
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    router.push('/checkout');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 bg-soft-gray rounded-[24px] shadow-sm group-hover:apple-shadow transition-shadow duration-500 border border-sandal-dark/5">
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-0 z-10 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-r-lg">
            <span className="text-[10px] font-bold text-obsidian uppercase tracking-widest">
              {product.badge}
            </span>
          </div>
        )}
        <button 
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-md hover:text-nykaa-pink hover:scale-110 transition-all duration-300 pointer-events-auto"
        >
          <Heart className="w-4 h-4" fill={isSaved ? "var(--color-crimson)" : "none"} stroke={isSaved ? "var(--color-crimson)" : "currentColor"} />
        </button>

        {/* Single Source of Truth Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-105" 
        />

        {/* Quick Action Overlay - Add to Cart & Buy Now */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
              className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-sandal-dark/10 flex flex-col p-3 gap-2 shadow-[0_-5px_15px_rgba(203,165,144,0.15)] pointer-events-auto"
            >
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 border border-sandal-dark text-sandal-dark py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sandal-dark hover:text-white transition-colors"
              >
                <ShoppingBag className="w-3 h-3" /> Add to Cart
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-nykaa-pink text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity"
              >
                <Zap className="w-3 h-3" /> Buy Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-start px-1 mt-2">
        <h3 className="font-bold text-sm text-obsidian line-clamp-1">{product.brand}</h3>
        <p className="text-[12px] text-obsidian/70 line-clamp-1 mb-1.5 font-medium tracking-wide">{product.name}</p>
        
        {/* Pricing Logic */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[14px] text-obsidian">₹{product.salePrice.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-obsidian/40 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="text-[10px] font-bold text-nykaa-pink ml-1">{product.discountPercentage}% Off</span>
        </div>
      </div>
    </motion.div>
  );
}
