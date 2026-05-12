"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import HeaderTicker from "./HeaderTicker";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const { cart, wishlist } = useStore();
  const router = useRouter();
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const categories = ["Suits", "Kurtas", "Bottoms", "Luxe Saree"];

  return (
    <>
      <HeaderTicker />
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`sticky top-0 z-50 w-full ${isScrolled ? 'glassmorphism border-b border-sandal-dark/10 shadow-[0_4px_20px_rgba(203,165,144,0.1)]' : 'bg-sandal-bg'}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-[80px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer mr-8" onClick={() => router.push('/')}>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden">
                   <img src="/pb_favicon.png" alt="PB" className="w-full h-full object-cover" />
                 </div>
                 <h1 className="font-serif text-[24px] font-bold tracking-tight text-obsidian flex flex-col leading-none">
                   <span className="text-obsidian">Preethi</span>
                   <span className="font-sans text-[9px] font-bold tracking-[0.3em] mt-1 text-nykaa-pink uppercase">Boutique</span>
                 </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-10 h-full items-center font-medium">
              {categories.map((cat) => (
                <div 
                  key={cat}
                  className="h-full flex items-center border-b-2 border-transparent hover:border-nykaa-pink transition-colors relative"
                  onMouseEnter={() => setHoveredMenu(cat)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button 
                    onClick={() => router.push(`/?category=${cat.toLowerCase()}`)}
                    className="text-[13px] text-obsidian hover:text-nykaa-pink transition-colors uppercase tracking-[0.1em] font-bold"
                  >
                    {cat}
                  </button>
                  <AnimatePresence>
                    {hoveredMenu === cat && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-sandal-dark/10 p-8 flex gap-12 z-[150] rounded-[24px] apple-shadow"
                      >
                        <div className="flex-1 flex flex-col justify-center">
                           <h4 className="text-nykaa-pink font-bold mb-6 uppercase text-xs tracking-[0.2em] border-b border-sandal-dark/10 pb-2">Explore {cat}</h4>
                           <ul className="space-y-5">
                             <li onClick={() => router.push(`/?category=${cat.toLowerCase()}&sort=new`)} className="text-sm hover:text-nykaa-pink cursor-pointer font-bold tracking-wide text-obsidian flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[2px] bg-nykaa-pink transition-all duration-300"></span> New Arrivals</li>
                             <li onClick={() => router.push(`/?category=${cat.toLowerCase()}&sort=bestsellers`)} className="text-sm hover:text-nykaa-pink cursor-pointer font-bold tracking-wide text-obsidian flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[2px] bg-nykaa-pink transition-all duration-300"></span> Bestsellers</li>
                             <li onClick={() => router.push(`/?category=${cat.toLowerCase()}&sort=premium`)} className="text-sm hover:text-nykaa-pink cursor-pointer font-bold tracking-wide text-obsidian flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[2px] bg-nykaa-pink transition-all duration-300"></span> Premium Edit</li>
                             <li onClick={() => router.push(`/?category=${cat.toLowerCase()}&sale=true`)} className="text-sm hover:text-nykaa-pink cursor-pointer font-bold tracking-wide text-nykaa-pink flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[2px] bg-nykaa-pink transition-all duration-300"></span> Sale</li>
                           </ul>
                        </div>
                        <div 
                          onClick={() => {
                            let link = "/";
                            if (cat === "Suits") link = "/?category=suits&sort=premium";
                            if (cat === "Kurtas") link = "/?category=kurtas&sort=new";
                            if (cat === "Bottoms") link = "/?category=bottoms";
                            if (cat === "Luxe Saree") link = "/?category=luxe%20saree";
                            router.push(link);
                          }}
                          className="flex-1 bg-sandal-bg p-4 rounded-[16px] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer border border-sandal-dark/20 apple-shadow hover:shadow-lg transition-all"
                        >
                           {cat === "Suits" && <img src="/peach_gold_dress_1.png" alt="Featured" className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-700" />}
                           {cat === "Kurtas" && <img src="/peach_gold_kurta_4.png" alt="Featured" className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-700" />}
                           {cat === "Bottoms" && <img src="/peach_gold_bottoms_6.png" alt="Featured" className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-700" />}
                           {cat === "Luxe Saree" && <img src="/peach_gold_saree_2.png" alt="Featured" className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-700" />}
                           
                           <h4 className="text-obsidian font-bold text-xs tracking-widest uppercase relative z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                             {cat === "Suits" ? "The Masterpiece" : cat === "Kurtas" ? "Festive Kurtas" : cat === "Bottoms" ? "Chikankari" : "The Silk Route"}
                           </h4>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Adaptive Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block relative z-[100]">
              <div className="relative">
                <button 
                  onClick={() => {
                    if (searchQuery.trim() !== '') {
                      setIsSearchActive(false);
                      router.push(`/?search=${searchQuery}`);
                    }
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <Search className="w-4 h-4 text-obsidian/50 hover:text-nykaa-pink transition-colors cursor-pointer" />
                </button>
                <input 
                  type="text" 
                  placeholder="Search designer wear..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchActive(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim() !== '') {
                      setIsSearchActive(false);
                      router.push(`/?search=${searchQuery}`);
                    }
                  }}
                  className="w-full bg-white border border-sandal-dark/20 text-sm rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:border-nykaa-pink focus:ring-1 focus:ring-nykaa-pink transition-all placeholder:text-gray-400 font-medium"
                />
              </div>

              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchActive && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/10 z-40" 
                      onClick={() => setIsSearchActive(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[120%] left-0 w-full bg-white rounded-[20px] shadow-2xl border border-sandal-dark/10 overflow-hidden z-50 p-6"
                    >
                      {searchQuery.length === 0 ? (
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-4">Recent Searches</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Banarasi Saree', 'Velvet Anarkali', 'Bridal Lehenga', 'Silk Kurta'].map((term) => (
                              <button 
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                  setIsSearchActive(false);
                                  router.push(`/?search=${term}`);
                                }}
                                className="px-4 py-2 bg-sandal-dark/5 hover:bg-sandal-pink/20 rounded-full text-xs font-medium text-obsidian transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-4">Related Products</h4>
                          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {/* We simulate matching products by passing search term to URL or just linking to home. For a real app we'd filter `products` from data */}
                            <div 
                              className="flex items-center gap-4 p-2 hover:bg-sandal-dark/5 rounded-[12px] cursor-pointer transition-colors"
                              onClick={() => {
                                setIsSearchActive(false);
                                router.push(`/?search=${searchQuery}`);
                              }}
                            >
                              <div className="w-12 h-12 bg-sandal-pink/20 rounded-md flex items-center justify-center">
                                <Search className="w-5 h-5 text-nykaa-pink" />
                              </div>
                              <div>
                                <p className="font-bold text-sm text-obsidian">Search for "{searchQuery}"</p>
                                <p className="text-xs text-obsidian/50">View all matching items</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-obsidian hover:text-nykaa-pink transition-colors cursor-pointer relative z-50 pointer-events-auto"
              >
                <User strokeWidth={1.5} className="w-5 h-5" />
              </button>
              <button onClick={() => router.push('/wishlist')} className="text-obsidian hover:text-nykaa-pink transition-colors relative hidden sm:block">
                <Heart strokeWidth={1.5} className="w-5 h-5" />
                {wishlist.length > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 bg-sandal-dark text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                     {wishlist.length}
                   </span>
                )}
              </button>
              <button onClick={onCartClick} className="text-obsidian hover:text-nykaa-pink transition-colors relative flex items-center gap-2">
                <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-nykaa-pink text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full border-t border-sandal-dark/10 flex justify-around items-center py-4 z-[100] lg:hidden glassmorphism shadow-[0_-5px_20px_rgba(203,165,144,0.1)] pointer-events-auto">
        <button className="flex flex-col items-center text-nykaa-pink">
          <Menu strokeWidth={2} className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase">Menu</span>
        </button>
        <button className="flex flex-col items-center text-obsidian/60 hover:text-nykaa-pink relative">
          <Heart strokeWidth={2} className="w-5 h-5 mb-1" />
          {wishlist.length > 0 && <span className="absolute -top-1 right-1 bg-sandal-dark text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlist.length}</span>}
          <span className="text-[9px] font-bold tracking-widest uppercase">Saved</span>
        </button>
        <button onClick={onCartClick} className="flex flex-col items-center text-obsidian/60 hover:text-nykaa-pink relative">
          <ShoppingBag strokeWidth={2} className="w-5 h-5 mb-1" />
          {cart.length > 0 && <span className="absolute -top-1 right-1 bg-nykaa-pink text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
          <span className="text-[9px] font-bold tracking-widest uppercase">Bag</span>
        </button>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-sandal-pink/20 backdrop-blur-2xl"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-md p-10 rounded-[24px] shadow-2xl w-full max-w-sm border border-sandal-dark/20 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-sandal-pink mx-auto flex items-center justify-center mb-6">
                 <User className="w-8 h-8 text-sandal-dark" />
              </div>
              <h2 className="font-serif italic text-3xl text-obsidian mb-2">Welcome Back</h2>
              <p className="text-xs text-obsidian/60 mb-8 font-light tracking-wide">Sign in to your Preethi Boutique account</p>
              
              <div className="space-y-4 mb-8">
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-sandal-dark/30 py-3 outline-none text-sm placeholder:text-obsidian/40 focus:border-nykaa-pink transition-colors" />
                <input type="password" placeholder="Password" className="w-full bg-transparent border-b border-sandal-dark/30 py-3 outline-none text-sm placeholder:text-obsidian/40 focus:border-nykaa-pink transition-colors" />
              </div>
              
              <button 
                onClick={() => {
                  setIsLoginModalOpen(false);
                  router.push('/dashboard');
                }} 
                className="w-full bg-sandal-dark text-white py-4 rounded-[16px] font-bold text-xs uppercase tracking-widest hover:bg-obsidian transition-colors shadow-lg"
              >
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
