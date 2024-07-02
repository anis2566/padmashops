import { ProductWithFeature } from "@/@types";
import { create } from "zustand";

interface OrderState {
  open: boolean;
  productId: string;
  product: ProductWithFeature | null;
  onOpen: (productId: string, product: ProductWithFeature) => void;
  onClose: () => void;
}

export const useQuickOrder = create<OrderState>()((set) => ({
  open: false,
  productId: "",
  product: null,
  onOpen: (productId, product) => set({ open: true, productId, product }),
  onClose: () => set({ open: false, productId: "", product: null }),
}));
