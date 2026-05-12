"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { products as initialProducts } from "@/data/products";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductGrid({ onCartOpen }: { onCartOpen?: () => void }) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const saleParam = searchParams.get('sale');

  // Unique values for filters
  const brands = Array.from(new Set(initialProducts.map(p => p.brand)));
  const fabrics = Array.from(new Set(initialProducts.map(p => p.fabric)));

  const toggleFilter = (type: 'brand' | 'fabric', value: string) => {
    if (type === 'brand') {
      setSelectedBrands(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else {
      setSelectedFabrics(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(p => {
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchFabric = selectedFabrics.length === 0 || selectedFabrics.includes(p.fabric);
      
      let matchCategory = true;
      if (categoryParam) {
        matchCategory = p.category.toLowerCase() === categoryParam.toLowerCase();
      }

      let matchSearch = true;
      if (searchParam) {
        const query = searchParam.toLowerCase();
        matchSearch = p.name.toLowerCase().includes(query) || 
                      p.brand.toLowerCase().includes(query) || 
                      p.category.toLowerCase().includes(query);
      }

      let matchSale = true;
      if (saleParam === 'true') {
        matchSale = p.discountPercentage > 0;
      }

      return matchBrand && matchFabric && matchCategory && matchSearch && matchSale;
    });

    if (sortBy === 'price_low') {
      result = result.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'price_high') {
      result = result.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === 'newest') {
      // Simulate newest by sorting by id reverse
      result = result.sort((a, b) => b.id.localeCompare(a.id));
    }
    // popular is default

    return result;
  }, [selectedBrands, selectedFabrics, sortBy, categoryParam, searchParam, saleParam]);

  const clearFilters = () => {
    router.push('/');
    setSelectedBrands([]);
    setSelectedFabrics([]);
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-12 relative z-10">
      {/* Smart Filter Sidebar */}
      <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpenMobile ? 'block' : 'hidden md:block'}`}>
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-sandal-dark/20">
           <h2 className="text-sm font-sans font-bold text-obsidian uppercase tracking-widest">Refine</h2>
           {isFilterOpenMobile && <button onClick={() => setIsFilterOpenMobile(false)} className="text-xs font-bold md:hidden">CLOSE</button>}
        </div>
        
        <div className="space-y-8">
          {/* Brand Accordion */}
          <div className="border-b border-sandal-dark/10 pb-6">
            <button className="w-full flex justify-between items-center font-sans font-medium text-xs text-obsidian mb-5 uppercase tracking-widest">
              Brand <ChevronDown className="w-4 h-4 text-obsidian/50" />
            </button>
            <div className="space-y-4">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-4 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleFilter('brand', brand); }}>
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${selectedBrands.includes(brand) ? 'bg-sandal-dark border-sandal-dark' : 'border-obsidian/20 group-hover:border-sandal-dark'}`}>
                    {selectedBrands.includes(brand) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                  </div>
                  <span className="text-xs font-light tracking-wide text-obsidian/80 group-hover:text-obsidian">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric Accordion */}
          <div className="border-b border-sandal-dark/10 pb-6">
            <button className="w-full flex justify-between items-center font-sans font-medium text-xs text-obsidian mb-5 uppercase tracking-widest">
              Fabric <ChevronDown className="w-4 h-4 text-obsidian/50" />
            </button>
            <div className="space-y-4">
              {fabrics.map(fabric => (
                <label key={fabric} className="flex items-center gap-4 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleFilter('fabric', fabric); }}>
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${selectedFabrics.includes(fabric) ? 'bg-sandal-dark border-sandal-dark' : 'border-obsidian/20 group-hover:border-sandal-dark'}`}>
                    {selectedFabrics.includes(fabric) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                  </div>
                  <span className="text-xs font-light tracking-wide text-obsidian/80 group-hover:text-obsidian">{fabric}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-4 border-b border-sandal-dark/20 gap-4">
          <div>
            <h1 className="text-2xl font-serif italic text-obsidian capitalize">
              {searchParam ? `Search: ${searchParam}` : categoryParam ? `${categoryParam} Collection` : "Women's Indian Wear"} 
              <span className="font-sans text-xs font-light text-obsidian/50 ml-2 tracking-widest not-italic">({filteredProducts.length} Items)</span>
            </h1>
            {(searchParam || categoryParam || saleParam || selectedBrands.length > 0 || selectedFabrics.length > 0) && (
              <button onClick={clearFilters} className="text-nykaa-pink text-[10px] uppercase tracking-widest font-bold mt-2 flex items-center gap-1 hover:text-sandal-dark transition-colors">
                <X className="w-3 h-3" /> Clear All Filters
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => setIsFilterOpenMobile(!isFilterOpenMobile)} className="md:hidden flex items-center gap-2 border border-sandal-dark/20 px-4 py-2 text-xs uppercase tracking-widest font-medium">
               <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
            <div className="hidden sm:flex items-center gap-3 relative">
               <div 
                 onClick={() => setIsSortOpen(!isSortOpen)}
                 className="flex items-center gap-3 border border-sandal-dark/20 px-5 py-2.5 cursor-pointer hover:border-sandal-dark transition-colors bg-white z-10"
               >
                 <span className="text-xs text-obsidian font-medium uppercase tracking-widest">
                   Sort: {sortBy === 'popular' ? 'Popular' : sortBy === 'newest' ? 'Newest' : sortBy === 'price_low' ? 'Price: Low to High' : 'Price: High to Low'}
                 </span>
                 <ChevronDown className={`w-4 h-4 text-obsidian/60 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
               </div>
               
               <AnimatePresence>
                 {isSortOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="absolute top-full right-0 mt-2 w-48 bg-white border border-sandal-dark/20 shadow-xl z-50 flex flex-col"
                   >
                     {[
                       { id: 'popular', label: 'Popular' },
                       { id: 'newest', label: 'Newest Arrivals' },
                       { id: 'price_low', label: 'Price: Low to High' },
                       { id: 'price_high', label: 'Price: High to Low' }
                     ].map(option => (
                       <button
                         key={option.id}
                         onClick={() => {
                           setSortBy(option.id);
                           setIsSortOpen(false);
                         }}
                         className={`text-left px-5 py-3 text-xs uppercase tracking-widest font-medium hover:bg-sandal-dark/5 transition-colors ${sortBy === option.id ? 'text-nykaa-pink' : 'text-obsidian'}`}
                       >
                         {option.label}
                       </button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onCartOpen={onCartOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
