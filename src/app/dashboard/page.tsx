"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Package, Heart, ShoppingBag, Settings, LogOut, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { wishlist, cart } = useStore();

  const recentOrders = [
    { id: "PB-45892", date: "Oct 24, 2026", status: "In Transit", total: "₹18,499" },
    { id: "PB-45102", date: "Sep 12, 2026", status: "Delivered", total: "₹24,000" },
  ];

  return (
    <div className="min-h-screen bg-sandal-bg flex flex-col">
      <Header onCartClick={() => router.push('/cart')} />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Profile Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-72 flex-shrink-0"
          >
            <div className="bg-white rounded-[30px] p-8 apple-shadow border border-sandal-dark/10 text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-sandal-pink/30 mx-auto flex items-center justify-center mb-4 border-2 border-sandal-dark/20">
                <span className="font-serif italic text-4xl text-sandal-dark">A</span>
              </div>
              <h2 className="font-serif italic text-2xl text-obsidian">Ananya Sharma</h2>
              <p className="text-xs font-bold text-obsidian/50 uppercase tracking-widest mt-1">Premium Member</p>
            </div>

            <nav className="flex flex-col space-y-2">
              <button className="flex items-center gap-4 w-full p-4 bg-obsidian text-white rounded-[16px] font-bold text-xs uppercase tracking-widest transition-colors apple-shadow">
                <Package className="w-4 h-4" /> My Orders
              </button>
              <button onClick={() => router.push('/wishlist')} className="flex items-center gap-4 w-full p-4 hover:bg-white text-obsidian rounded-[16px] font-bold text-xs uppercase tracking-widest transition-colors hover:apple-shadow">
                <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
              </button>
              <button onClick={() => router.push('/cart')} className="flex items-center gap-4 w-full p-4 hover:bg-white text-obsidian rounded-[16px] font-bold text-xs uppercase tracking-widest transition-colors hover:apple-shadow">
                <ShoppingBag className="w-4 h-4" /> Bag ({cart.length})
              </button>
              <button className="flex items-center gap-4 w-full p-4 hover:bg-white text-obsidian rounded-[16px] font-bold text-xs uppercase tracking-widest transition-colors hover:apple-shadow">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button onClick={() => router.push('/')} className="flex items-center gap-4 w-full p-4 hover:bg-white text-nykaa-pink rounded-[16px] font-bold text-xs uppercase tracking-widest transition-colors hover:apple-shadow mt-8">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </nav>
          </motion.aside>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-8"
          >
            <div className="mb-10">
              <h1 className="font-serif italic text-4xl text-obsidian mb-2">My Profile</h1>
              <p className="text-obsidian/60 text-sm font-light">Manage your orders, tracking, and saved products.</p>
            </div>

            {/* Active Orders Widget */}
            <div className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl border border-sandal-dark/20 rounded-[30px] p-8 apple-shadow relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif italic text-2xl text-obsidian">Recent Orders</h3>
                <Link href="/track-order" className="text-nykaa-pink font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-obsidian transition-colors">
                  Track Packages <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between bg-white/50 p-4 rounded-[20px] border border-sandal-dark/10 hover:border-sandal-dark/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-sandal-pink/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-sandal-dark" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-obsidian">{order.id}</p>
                        <p className="text-xs text-obsidian/60">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-bold text-sm text-obsidian">{order.total}</p>
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        order.status === 'In Transit' ? 'bg-nykaa-pink/10 text-nykaa-pink' : 'bg-sandal-dark/10 text-sandal-dark'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added Products (Cart Quick View) */}
            <div className="bg-white rounded-[30px] p-8 apple-shadow border border-sandal-dark/10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif italic text-2xl text-obsidian">Added to Bag</h3>
                <Link href="/cart" className="text-sandal-dark font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-obsidian transition-colors">
                  View Cart <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-sandal-dark/20 mx-auto mb-4" />
                  <p className="text-obsidian/50 font-medium">Your bag is currently empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="group relative rounded-[20px] overflow-hidden border border-sandal-dark/10">
                      <div className="aspect-[3/4] w-full bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md p-3">
                        <p className="text-[10px] font-bold text-obsidian uppercase tracking-widest truncate">{item.brand}</p>
                        <p className="text-xs font-serif text-obsidian/70">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
