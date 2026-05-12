"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Search, Package, Clock, Truck, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracking(true);
    }
  };

  const timeline = [
    { icon: <Package className="w-5 h-5" />, title: "Order Placed", date: "Oct 24, 2026 - 10:30 AM", status: "completed" },
    { icon: <Clock className="w-5 h-5" />, title: "Processing", date: "Oct 25, 2026 - 02:15 PM", status: "completed" },
    { icon: <Truck className="w-5 h-5" />, title: "Shipped", date: "Oct 26, 2026 - 09:00 AM", status: "active" },
    { icon: <CheckCircle2 className="w-5 h-5" />, title: "Delivered", date: "Estimated: Oct 28, 2026", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-sandal-bg flex flex-col">
      <Header onCartClick={() => router.push('/cart')} />

      <main className="flex-1 flex flex-col items-center py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[600px] bg-white p-8 md:p-12 rounded-sm shadow-sm border border-sandal-dark/10"
        >
          <h1 className="font-serif italic text-3xl text-obsidian mb-2 text-center">Track Your Order</h1>
          <p className="text-obsidian/60 text-sm text-center mb-8">Enter your Order ID to see real-time updates.</p>

          <form onSubmit={handleTrack} className="flex gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/40" />
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g., PB-45892" 
                className="w-full border border-sandal-dark/30 rounded-sm py-3 pl-12 pr-4 focus:border-nykaa-pink outline-none transition-colors"
                required
              />
            </div>
            <button type="submit" className="bg-nykaa-pink text-white px-8 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm">
              Track
            </button>
          </form>

          {isTracking && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-sandal-dark/10 pt-8"
            >
              <h3 className="font-bold text-sm text-obsidian uppercase tracking-widest mb-8">Order Status: <span className="text-nykaa-pink">In Transit</span></h3>
              
              <div className="relative pl-8 space-y-10">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-sandal-dark/20" />
                
                {timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Status Dot/Icon */}
                    <div className={`absolute -left-[39px] w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white z-10 transition-colors ${
                      step.status === 'completed' ? 'border-nykaa-pink text-nykaa-pink' : 
                      step.status === 'active' ? 'border-nykaa-pink bg-nykaa-pink text-white' : 
                      'border-sandal-dark/30 text-obsidian/30'
                    }`}>
                      {step.icon}
                    </div>
                    
                    <div>
                      <h4 className={`font-bold text-sm ${step.status === 'pending' ? 'text-obsidian/50' : 'text-obsidian'}`}>{step.title}</h4>
                      <p className="text-xs text-obsidian/50 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
