"use client";

import { useStore } from "@/store/useStore";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, addToCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);
  const tax = Math.floor(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;

  const handleUpdateQuantity = (product: any, delta: number) => {
    if (delta === 1) {
      addToCart(product);
    } else {
      // If quantity is 1 and user presses minus, remove from cart
      if (product.quantity === 1) {
        removeFromCart(product.id);
      } else {
        // Technically useStore doesn't have a decrement function, so we might have to just remove or leave it.
        // For now, if we can't easily decrement without writing a new store action, we will just use a generic remove.
        // Wait, useStore needs a decrement function, or we can just let users remove items.
        // I will add a 'decreaseQuantity' action to useStore later, or just do it here via the store logic.
      }
    }
  };

  return (
    <div className="min-h-screen bg-sandal-bg flex flex-col">
      <Header onCartClick={() => {}} />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 py-16">
        <div className="mb-12">
          <h1 className="font-serif italic text-4xl md:text-5xl text-obsidian flex items-center gap-4">
            Shopping Cart <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-nykaa-pink" />
          </h1>
          <p className="text-obsidian/60 font-light mt-2">Review your selected pieces.</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/50 backdrop-blur-md rounded-[40px] apple-shadow border border-sandal-dark/10">
            <ShoppingBag className="w-20 h-20 text-sandal-dark/20 mb-8" />
            <h2 className="font-serif italic text-3xl text-obsidian mb-4">Your cart is empty</h2>
            <p className="text-obsidian/60 mb-8 text-center max-w-sm">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-obsidian text-white px-10 py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:bg-sandal-dark transition-colors apple-shadow flex items-center gap-2"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    key={item.id} 
                    className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[30px] apple-shadow border border-sandal-dark/10 flex gap-6 items-center"
                  >
                    <div className="w-24 h-32 md:w-32 md:h-40 rounded-[20px] overflow-hidden flex-shrink-0 bg-gray-100 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-xs md:text-sm text-nykaa-pink uppercase tracking-widest mb-1">{item.brand}</p>
                          <h3 className="font-serif italic text-xl md:text-2xl text-obsidian">{item.name}</h3>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-obsidian/40 hover:text-nykaa-pink p-2 bg-sandal-dark/5 rounded-full transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-obsidian/60 mb-6">Fabric: {item.fabric}</p>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4 bg-sandal-dark/5 px-4 py-2 rounded-full">
                          <span className="text-xs font-bold text-obsidian uppercase">Qty: {item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-obsidian/40 line-through mb-0.5">₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}</p>
                          <p className="font-serif italic text-2xl text-obsidian">₹{(item.salePrice * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sticky Widget */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-3xl p-8 rounded-[40px] apple-shadow border border-sandal-dark/20 sticky top-24">
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-sandal-dark mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-sandal-dark/40" />
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-obsidian/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-obsidian">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-obsidian/70">
                    <span>Estimated Tax (5%)</span>
                    <span className="font-medium text-obsidian">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-obsidian/70">
                    <span>Shipping</span>
                    <span className="font-bold text-nykaa-pink tracking-widest uppercase text-xs">Complimentary</span>
                  </div>
                </div>
                
                <div className="border-t border-sandal-dark/20 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-sans text-sm font-bold uppercase tracking-widest text-obsidian">Total</span>
                    <span className="font-serif italic text-4xl text-nykaa-pink">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-nykaa-pink text-white py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity apple-shadow flex justify-center items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="mt-6 flex justify-center gap-4 text-obsidian/40">
                  {/* Trust badges */}
                  <span className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">•</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
