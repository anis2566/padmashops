import { create } from 'zustand'

interface WithdrawState {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const useWithdraw = create<WithdrawState>()((set) => ({
  open: false,
  onOpen: () => set((state) => ({ open: true })),
  onClose: () => set((state) => ({ open: false })),
}))


interface WithdrawStatusState {
  open: boolean
  withdrawId:string
  onOpen: (withdrawId: string) => void
  onClose: () => void
}

export const useWithdrawStatus = create<WithdrawStatusState>()((set) => ({
  open: false,
  withdrawId: "",
  onOpen: (withdrawId: string) => set((state) => ({ open: true, withdrawId })),
  onClose: () => set((state) => ({ open: false, withdrawId: "" })),
}))