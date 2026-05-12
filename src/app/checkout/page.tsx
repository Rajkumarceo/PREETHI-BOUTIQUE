"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ArrowLeft, CheckCircle2, CreditCard, Wallet, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  const currentTotal = cart.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);

  const handlePlaceOrder = () => {
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-sandal-bg flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-[1000px] flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Checkout Form */}
        <div className="flex-1">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-obsidian hover:text-nykaa-pink transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-12">
            <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-nykaa-pink' : 'text-obsidian/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-nykaa-pink text-white' : 'bg-sandal-dark/20 text-obsidian/50'}`}>1</div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Shipping</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-nykaa-pink' : 'bg-sandal-dark/20'}`} />
            <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-nykaa-pink' : 'text-obsidian/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-nykaa-pink text-white' : 'bg-sandal-dark/20 text-obsidian/50'}`}>2</div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Payment</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-nykaa-pink' : 'bg-sandal-dark/20'}`} />
            <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-nykaa-pink' : 'text-obsidian/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-nykaa-pink text-white' : 'bg-sandal-dark/20 text-obsidian/50'}`}>3</div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Done</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-8 md:p-12 rounded-[30px] apple-shadow border border-sandal-dark/10"
              >
                <h2 className="font-serif italic text-3xl text-obsidian mb-8">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-obsidian uppercase tracking-widest">First Name</label>
                    <input type="text" className="border-b border-sandal-dark/30 py-3 focus:border-nykaa-pink outline-none transition-colors bg-transparent" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-obsidian uppercase tracking-widest">Last Name</label>
                    <input type="text" className="border-b border-sandal-dark/30 py-3 focus:border-nykaa-pink outline-none transition-colors bg-transparent" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-[10px] font-bold text-obsidian uppercase tracking-widest">Address</label>
                  <input type="text" className="border-b border-sandal-dark/30 py-3 focus:border-nykaa-pink outline-none transition-colors bg-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-obsidian uppercase tracking-widest">City</label>
                    <input type="text" className="border-b border-sandal-dark/30 py-3 focus:border-nykaa-pink outline-none transition-colors bg-transparent" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-obsidian uppercase tracking-widest">Pincode</label>
                    <input type="text" className="border-b border-sandal-dark/30 py-3 focus:border-nykaa-pink outline-none transition-colors bg-transparent" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-obsidian text-white py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:bg-sandal-dark transition-colors apple-shadow">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-8 md:p-12 rounded-[30px] apple-shadow border border-sandal-dark/10"
              >
                <h2 className="font-serif italic text-3xl text-obsidian mb-8">Payment Method</h2>
                <div className="space-y-4 mb-10">
                  <label className={`flex items-center gap-4 p-5 border rounded-[20px] cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-nykaa-pink bg-nykaa-pink/5' : 'border-sandal-dark/20 hover:border-nykaa-pink/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-nykaa-pink w-4 h-4" />
                    <Wallet className="w-6 h-6 text-nykaa-pink" />
                    <span className="font-bold text-sm text-obsidian tracking-wide">UPI (GPay, PhonePe, Paytm)</span>
                  </label>
                  <label className={`flex items-center gap-4 p-5 border rounded-[20px] cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-nykaa-pink bg-nykaa-pink/5' : 'border-sandal-dark/20 hover:border-nykaa-pink/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-nykaa-pink w-4 h-4" />
                    <CreditCard className="w-6 h-6 text-nykaa-pink" />
                    <span className="font-bold text-sm text-obsidian tracking-wide">Credit / Debit Card</span>
                  </label>
                  <label className={`flex items-center gap-4 p-5 border rounded-[20px] cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-nykaa-pink bg-nykaa-pink/5' : 'border-sandal-dark/20 hover:border-nykaa-pink/50'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-nykaa-pink w-4 h-4" />
                    <Truck className="w-6 h-6 text-nykaa-pink" />
                    <span className="font-bold text-sm text-obsidian tracking-wide">Cash on Delivery</span>
                  </label>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 border border-obsidian text-obsidian py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:bg-obsidian hover:text-white transition-colors">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="flex-1 bg-nykaa-pink text-white py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity apple-shadow">
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 md:p-16 rounded-[40px] apple-shadow border border-sandal-dark/10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="font-serif italic text-5xl text-obsidian mb-6">Order Confirmed!</h2>
                <p className="text-obsidian/60 mb-10 max-w-md text-lg font-light leading-relaxed">Thank you for shopping with Preethi Boutique. Your luxury ethnic wear will be handcrafted and shipped soon.</p>
                <div className="bg-sandal-bg p-6 border border-sandal-dark/20 rounded-[20px] w-full mb-10 max-w-sm">
                  <p className="text-[10px] uppercase font-bold text-obsidian tracking-widest mb-2">Order Number</p>
                  <p className="font-mono text-2xl text-nykaa-pink">#PB-{Math.floor(Math.random() * 90000) + 10000}</p>
                </div>
                <button onClick={() => router.push('/track-order')} className="w-full max-w-sm bg-obsidian text-white py-5 rounded-[20px] font-bold text-xs uppercase tracking-widest hover:bg-sandal-dark transition-colors apple-shadow">
                  Track Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-3xl p-8 rounded-[40px] apple-shadow border border-sandal-dark/20 sticky top-24">
            <h3 className="font-serif italic text-2xl text-obsidian mb-8 pb-6 border-b border-sandal-dark/10 flex items-center justify-between">
              Order Summary
              <span className="text-sm font-sans font-bold text-obsidian/50 not-italic uppercase tracking-widest">{cart.length} Items</span>
            </h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 items-center">
                  <div className="w-20 h-24 rounded-[16px] overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[10px] text-nykaa-pink uppercase tracking-widest mb-1">{item.brand}</p>
                    <p className="text-sm font-serif text-obsidian mb-2 line-clamp-1">{item.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-obsidian/50 bg-sandal-dark/5 px-3 py-1 rounded-full">Qty: {item.quantity}</span>
                      <span className="font-bold text-sm text-obsidian">₹{(item.salePrice * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-sandal-dark/10 pt-6 space-y-4 mb-8">
              <div className="flex justify-between text-obsidian/70">
                <span>Subtotal</span>
                <span className="font-medium text-obsidian">₹{currentTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-obsidian/70">
                <span>Shipping</span>
                <span className="font-bold text-nykaa-pink tracking-widest uppercase text-xs">Complimentary</span>
              </div>
            </div>
            
            <div className="border-t border-sandal-dark/10 pt-6">
              <div className="flex justify-between items-end">
                <span className="font-sans text-sm font-bold uppercase tracking-widest text-obsidian">Total</span>
                <span className="font-serif italic text-4xl text-nykaa-pink">₹{currentTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
