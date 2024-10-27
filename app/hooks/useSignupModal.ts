import { create } from 'zustand'
import { ModelTypes } from '@/app/types'
// サインアップ状態管理
const useSignupModel = create<ModelTypes>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useSignupModel