import { create } from 'zustand'
import { ModelTypes } from '@/app/types'

// プロフィール状態管理
const useProfileModel = create<ModelTypes>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useProfileModel