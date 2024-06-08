import { create } from "zustand";

interface AddressState {
  open: boolean;
  addressId: string;
  onOpen: (addressId: string) => void;
  onClose: () => void;
}

export const useAddress = create<AddressState>()((set) => ({
  open: false,
  addressId: "",
  onOpen: (addressId) => set({ open: true, addressId }),
  onClose: () => set({ open: false, addressId: "" }),
}));
