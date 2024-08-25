import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // Ensure quantity is included
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

export const useCartStore = create<CartStore>((set,get) => ({
  cart: [],
  addToCart: (item) => set((state) => {
    // Check if item already exists in cart
    const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      const updatedCart = [...state.cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + item.quantity,
      };
      return { cart: updatedCart };
    } else {
      // If item does not exist, add new item
      return { cart: [...state.cart, item] };
    }
  }),
  removeFromCart: (id) => set((state) => {
    // Remove item from cart or decrease quantity if more than 1
    const updatedCart = state.cart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          // Decrease quantity if more than 1
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
        // Do not add item if quantity is 1
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as CartItem[]);
    
    return { cart: updatedCart };
  }),
  clearCart: () => set(() => ({ cart: [] })),
  getTotalCount: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }
}));
