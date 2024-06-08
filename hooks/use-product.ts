import { create } from "zustand";

interface ProductState {
  open: boolean;
  productId: string;
  onOpen: (productId: string) => void;
  onClose: () => void;
}

export const useProduct = create<ProductState>()((set) => ({
  open: false,
  productId: "",
  onOpen: (productId) => set({ open: true, productId }),
  onClose: () => set({ open: false, productId: "" }),
}));
