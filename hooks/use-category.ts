import { create } from "zustand";

interface CategoryState {
  open: boolean;
  categoryId: string;
  onOpen: (categoryId: string) => void;
  onClose: () => void;
}

export const useCategory = create<CategoryState>()((set) => ({
  open: false,
  categoryId: "",
  onOpen: (categoryId) => set({ open: true, categoryId }),
  onClose: () => set({ open: false, categoryId: "" }),
}));
