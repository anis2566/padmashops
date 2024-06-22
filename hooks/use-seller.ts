import { create } from "zustand";

interface ChangeStatusState {
  open: boolean;
  sellerId: string;
  onOpen: (sellerId: string) => void;
  onClose: () => void;
}

export const useSellerStatus = create<ChangeStatusState>()((set) => ({
  open: false,
  sellerId: "",
  onOpen: (sellerId) => set({ open: true, sellerId }),
  onClose: () => set({ open: false, sellerId: "" }),
}));


interface SellerStatus {
  open: boolean;
  sellerId: string;
  onOpen: (sellerId: string) => void;
  onClose: () => void;
}

export const useSeller = create<SellerStatus>()((set) => ({
  open: false,
  sellerId: "",
  onOpen: (sellerId) => set({ open: true, sellerId }),
  onClose: () => set({ open: false, sellerId: "" }),
}));


interface SellerRegistrationState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegistration = create<SellerRegistrationState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true}),
  onClose: () => set({ open: false}),
}));


