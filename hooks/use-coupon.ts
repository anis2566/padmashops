import { create } from "zustand";

interface CouponState {
  open: boolean;
  couponId: string;
  onOpen: (couponId: string) => void;
  onClose: () => void;
}

export const useCoupon = create<CouponState>()((set) => ({
  open: false,
  couponId: "",
  onOpen: (couponId) => set({ open: true, couponId }),
  onClose: () => set({ open: false, couponId: "" }),
}));
