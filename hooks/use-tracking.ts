import { create } from "zustand";

interface TrackingState {
  open: boolean;
  orderId: string;
  onOpen: (orderId: string) => void;
  onClose: () => void;
}

export const useTracking = create<TrackingState>()((set) => ({
  open: false,
  orderId: "",
  onOpen: (orderId) => set({ open: true, orderId }),
  onClose: () => set({ open: false, orderId: "" }),
}));
