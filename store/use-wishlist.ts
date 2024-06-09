import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ProductWithFeature } from "@/@types";

interface WishlistState {
  wishlist: ProductWithFeature[];
  addToWishlist: (product: ProductWithFeature) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product) => {
        set((state) => {
          const cartIndex = state.wishlist.findIndex(
            (item) => item.id === product.id
          );

          if (cartIndex > -1) {
            return state;
          } else {
            return {
              ...state,
              wishlist: [
                ...state.wishlist,
                {
                  ...product,
                  stocks: product.stocks,
                },
              ],
            };
          }
        });
      },
      removeFromWishlist: (productId: string) => {
        set((state) => ({
          ...state,
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }));
      },
    }),
    {
      name: "user-wishlist",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);