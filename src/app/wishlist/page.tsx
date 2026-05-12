"use client";

import { useStore } from "@/store/useStore";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-sandal-bg flex flex-col">
      <Header onCartClick={() => router.push('/cart')} />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 py-16">
        <div className="mb-12 border-b border-sandal-dark/20 pb-6 flex items-end justify-between">
          <div>
            <h1 className="font-serif italic text-4xl text-obsidian flex items-center gap-4">
              My Wishlist <Heart className="w-8 h-8 text-nykaa-pink" fill="currentColor" />
            </h1>
            <p className="text-obsidian/60 text-sm font-light mt-2">Saved items to elevate your wardrobe.</p>
          </div>
          <p className="text-xs font-bold text-obsidian uppercase tracking-widest">{wishlist.length} Items</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="w-16 h-16 text-sandal-dark/20 mb-6" />
            <h2 className="font-serif italic text-2xl text-obsidian mb-2">Your wishlist is empty</h2>
            <p className="text-obsidian/60 mb-8">Save your favorite styles to access them quickly later.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-obsidian text-white px-8 py-4 rounded-[16px] font-bold text-xs uppercase tracking-widest hover:bg-sandal-dark transition-colors apple-shadow"
            >
              Discover Styles
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16">
            <AnimatePresence>
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} onCartOpen={() => router.push('/cart')} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
