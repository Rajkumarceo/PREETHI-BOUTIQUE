import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      toggleWishlist: (product) => set((state) => {
        const isSaved = state.wishlist.some(item => item.id === product.id);
        if (isSaved) {
          return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
        }
        return { wishlist: [...state.wishlist, product] };
      }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'preethi-storage',
    }
  )
);
