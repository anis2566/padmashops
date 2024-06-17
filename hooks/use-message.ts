import { Message } from "@prisma/client";
import { create } from "zustand";

interface MessageState {
  open: boolean;
  message: Message | null;
  onOpen: (message: Message) => void;
  onClose: () => void;
}

export const useMessage = create<MessageState>()((set) => ({
  open: false,
  message: null,
  onOpen: (message) => set({ open: true, message }),
  onClose: () => set({ open: false, message: null }),
}));
