import { create } from "zustand";

interface CustomerState {
  open: boolean;
  customerId: string;
  onOpen: (customerId: string) => void;
  onClose: () => void;
}

export const useCustomer = create<CustomerState>()((set) => ({
  open: false,
  customerId: "",
  onOpen: (customerId) => set({ open: true, customerId }),
  onClose: () => set({ open: false, customerId: "" }),
}));
