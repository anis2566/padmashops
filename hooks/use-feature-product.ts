import { create } from "zustand";

interface AssignFeatureProductState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAssignFeatureProduct = create<AssignFeatureProductState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false}),
}));


interface FeatureProductState {
  open: boolean;
  productId: string;
  onOpen: (productId: string) => void;
  onClose: () => void;
}

export const useFeatureProduct = create<FeatureProductState>()((set) => ({
  open: false,
  productId: "",
  onOpen: (productId) => set({ open: true, productId }),
  onClose: () => set({ open: false, productId: "" }),
}));