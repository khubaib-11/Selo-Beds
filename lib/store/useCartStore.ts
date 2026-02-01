import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  variantId: string; // Crucial: we track the specific size/price combo
  productId: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.variantId === newItem.variantId,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.variantId === newItem.variantId
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (variantId) =>
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        }),

      updateQuantity: (variantId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item,
          ),
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "mattress-cart-storage", // key in localStorage
    },
  ),
);
