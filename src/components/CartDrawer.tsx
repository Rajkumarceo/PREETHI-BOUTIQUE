"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart } = useStore();
  const router = useRouter();
  
  const currentTotal = cart.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);
  const targetForGift = 10000;
  const progress = Math.min((currentTotal / targetForGift) * 100, 100);
  const remaining = targetForGift - currentTotal;

  // Recommendations: products not in cart
  const recommendations = products.filter(p => !cart.some(c => c.id === p.id)).slice(0, 3);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/40 z-[60] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white/90 backdrop-blur-xl z-[70] shadow-2xl flex flex-col border-l border-white/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-sandal-dark/10 flex justify-between items-center">
              <h2 className="font-serif italic text-xl text-obsidian">Your Shopping Bag ({cart.reduce((a,b)=>a+b.quantity,0)})</h2>
              <button onClick={onClose} className="text-obsidian hover:text-nykaa-pink transition-colors">
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-sandal-pink/20 p-5 border-b border-sandal-dark/10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-bold text-obsidian uppercase tracking-widest">
                  {remaining > 0 ? `Add ₹${remaining.toLocaleString('en-IN')} for Free Shipping` : "🎉 Free Shipping Unlocked"}
                </p>
                <span className="text-[10px] font-bold text-nykaa-pink tracking-widest">₹{targetForGift.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-1.5 bg-sandal-dark/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 1 }}
                  className="h-full bg-nykaa-pink"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-obsidian/50">
                  <p className="font-serif italic text-lg mb-2">Your bag is empty</p>
                  <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-nykaa-pink">Continue Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/60 rounded-sm shadow-sm border border-sandal-dark/10">
                    <img src={item.image} alt={item.name} className="w-20 h-28 object-cover rounded-sm" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif italic text-lg text-obsidian line-clamp-1">{item.brand}</h3>
                        <p className="text-[11px] text-obsidian/60 font-bold tracking-wider uppercase line-clamp-1 mt-0.5">{item.name}</p>
                        <p className="text-[10px] text-obsidian/40 uppercase tracking-widest mt-2">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-obsidian">₹{item.salePrice.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-obsidian/40 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-obsidian/40 hover:text-nykaa-pink transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Recommendations */}
              {cart.length > 0 && (
                <div className="pt-6 border-t border-sandal-dark/10 mt-6">
                  <h4 className="font-bold text-[10px] text-obsidian uppercase tracking-widest mb-4">Complete The Look</h4>
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {recommendations.map(rec => (
                       <div key={rec.id} className="w-32 flex-shrink-0">
                         <img src={rec.image} alt={rec.name} className="w-full h-40 object-cover rounded-sm mb-2" />
                         <p className="text-[10px] font-bold text-obsidian truncate">{rec.brand}</p>
                         <p className="text-[10px] text-obsidian/60 truncate mb-1">{rec.name}</p>
                         <p className="text-[10px] font-bold text-nykaa-pink">₹{rec.salePrice.toLocaleString('en-IN')}</p>
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-sandal-dark/10 bg-white/80 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-obsidian">Grand Total</span>
                  <span className="text-xl font-serif text-obsidian">₹{currentTotal.toLocaleString('en-IN')}</span>
                </div>
                
                <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-nykaa-pink text-white py-4 font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shadow-lg">
                  Checkout Securely <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
