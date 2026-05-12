"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/data/products";
import { Heart, MapPin, Ruler } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const params = useParams();
  const { addToCart } = useStore();
  const router = useRouter();
  
  // Just use the first product as mock
  const product = products[0];

  return (
    <div className="relative bg-white min-h-screen">
      <Header onCartClick={() => router.push('/cart')} />
      
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-12 relative">
        
        {/* Single Source of Truth Hero Image */}
        <div className="w-full md:w-[60%] flex flex-col gap-4">
          <div className="w-full relative aspect-[3/4] rounded-sm overflow-hidden border border-sandal-dark/10 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Pinned Buy Box */}
        <div className="w-full md:w-[40%]">
          <div className="sticky top-[100px] flex flex-col pt-4">
             <h2 className="font-bold text-xl text-obsidian">{product.brand}</h2>
             <h1 className="text-gray-500 text-lg mb-4">{product.name}</h1>
             
             {/* Price */}
             <div className="flex items-center gap-3 mb-6">
                <span className="font-bold text-2xl text-obsidian">₹{product.salePrice.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-vibrant-pink font-bold text-lg">{product.discountPercentage}% Off</span>
             </div>

             <div className="w-full h-[1px] bg-gray-200 mb-6" />

             {/* Size Selector */}
             <div className="mb-8">
               <div className="flex justify-between items-center mb-3">
                 <span className="font-bold text-sm text-obsidian uppercase">Select Size</span>
                 <button className="text-nykaa-pink text-xs font-bold uppercase flex items-center gap-1 hover:text-nykaa-pink-light">
                   <Ruler className="w-4 h-4" /> Size Guide
                 </button>
               </div>
               <div className="flex gap-3">
                 {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                   <button key={size} className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center font-bold text-sm hover:border-nykaa-pink hover:text-nykaa-pink transition-colors">
                     {size}
                   </button>
                 ))}
               </div>
             </div>

             {/* Add to Bag Actions */}
             <div className="flex gap-4 mb-8">
               <button 
                 onClick={() => {
                   addToCart(product);
                   router.push('/cart');
                 }}
                 className="flex-1 bg-nykaa-pink text-white font-bold text-sm uppercase tracking-wide py-4 rounded-sm hover:bg-nykaa-pink-light transition-colors"
               >
                 Add to Bag
               </button>
               <button className="w-14 border border-gray-300 rounded-sm flex items-center justify-center hover:border-nykaa-pink text-gray-500 hover:text-nykaa-pink transition-colors">
                 <Heart className="w-5 h-5" />
               </button>
             </div>

             {/* Delivery Pincode Validator */}
             <div className="border border-gray-200 rounded-sm p-4 mb-8">
               <h3 className="font-bold text-sm text-obsidian flex items-center gap-2 mb-3">
                 <MapPin className="w-4 h-4 text-gray-500" /> Check Delivery Details
               </h3>
               <div className="flex gap-2">
                 <input type="text" placeholder="Enter Pincode" className="flex-1 border-b border-gray-300 py-2 text-sm outline-none focus:border-nykaa-pink transition-colors" />
                 <button className="text-nykaa-pink font-bold text-sm uppercase hover:text-nykaa-pink-light transition-colors px-2">Check</button>
               </div>
               <p className="text-xs text-gray-500 mt-2">Enter pincode to check delivery date & availability</p>
             </div>
             
             {/* Product Details */}
             <div>
               <h3 className="font-bold text-sm text-obsidian mb-2">Product Details</h3>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Elevate your ethnic wardrobe with this beautifully crafted ensemble. Made from premium {product.fabric}, this outfit offers exceptional comfort and style. Perfect for festive occasions and celebrations.
               </p>
             </div>
          </div>
        </div>
      </main>

    </div>
  );
}
