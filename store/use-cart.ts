import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; 

import { ProductWithFeature } from "@/@types";

interface CartItem {
  product: ProductWithFeature;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  updateSize: (productId: string, size: string) => void;
  updateColor: (productId: string, color: string) => void;
  resetCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const cart = get().cart;
        const existingItem = cart.find(cartItem => cartItem.product.id === item.product.id);

        if (existingItem) {
          // Update quantity if item already exists in cart
          set({
            cart: cart.map(cartItem =>
              cartItem.product.id === item.product.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
          });
        } else {
          // Add new item to cart
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (productId: string) => {
        set({
          cart: get().cart.filter(cartItem => cartItem.product.id !== productId),
        });
      },

      incrementQuantity: (productId: string) => {
        set({
          cart: get().cart.map(cartItem =>
            cartItem.product.id === productId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        });
      },

      decrementQuantity: (productId: string) => {
        set({
          cart: get().cart.map(cartItem =>
            cartItem.product.id === productId && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        });
      },

      updateSize: (productId: string, size: string) => {
        set({
          cart: get().cart.map(cartItem =>
            cartItem.product.id === productId
              ? { ...cartItem, size }
              : cartItem
          ),
        });
      },

      updateColor: (productId: string, color: string) => {
        set({
          cart: get().cart.map(cartItem =>
            cartItem.product.id === productId
              ? { ...cartItem, color }
              : cartItem
          ),
        });
      },

      resetCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "user-cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
