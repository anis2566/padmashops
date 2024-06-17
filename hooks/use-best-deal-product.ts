import { create } from "zustand";

interface AssignBestDealProductState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAssignBestDealProduct = create<AssignBestDealProductState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false}),
}));


interface BestDealProductState {
  open: boolean;
  productId: string;
  onOpen: (productId: string) => void;
  onClose: () => void;
}

export const useBestDealProduct = create<BestDealProductState>()((set) => ({
  open: false,
  productId: "",
  onOpen: (productId) => set({ open: true, productId }),
  onClose: () => set({ open: false, productId: "" }),
}));