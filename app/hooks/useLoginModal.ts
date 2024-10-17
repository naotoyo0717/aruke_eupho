import { create } from 'zustand'
import { ModelTypes } from '@/app/types'

// ログイン状態管理
const useLoginModel = create<ModelTypes>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useLoginModel