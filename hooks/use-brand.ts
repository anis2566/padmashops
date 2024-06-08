import { create } from "zustand";

interface BrandState {
  open: boolean;
  brandId: string;
  onOpen: (brandId: string) => void;
  onClose: () => void;
}

export const useBrand = create<BrandState>()((set) => ({
  open: false,
  brandId: "",
  onOpen: (brandId) => set({ open: true, brandId }),
  onClose: () => set({ open: false, brandId: "" }),
}));
