import { create } from "zustand";

interface AssignPopularProductState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAssignPopularProduct = create<AssignPopularProductState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false}),
}));


interface PopularProductState {
  open: boolean;
  productId: string;
  onOpen: (productId: string) => void;
  onClose: () => void;
}

export const usePopularProduct = create<PopularProductState>()((set) => ({
  open: false,
  productId: "",
  onOpen: (productId) => set({ open: true, productId }),
  onClose: () => set({ open: false, productId: "" }),
}));