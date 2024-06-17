import { create } from "zustand";

interface BannerState {
  open: boolean;
  bannerId: string;
  onOpen: (bannerId: string) => void;
  onClose: () => void;
}

export const useBanner = create<BannerState>()((set) => ({
  open: false,
  bannerId: "",
  onOpen: (bannerId) => set({ open: true, bannerId }),
  onClose: () => set({ open: false, bannerId: "" }),
}));
