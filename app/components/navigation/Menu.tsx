'use Client'

import { useCallback, useState } from "react"
import { signOut } from "next-auth/react"
import { User } from "@prisma/client"

import useLoginModel from '@/app/hooks/useLoginModal'
import useSignupModel from '@/app/hooks/useSignupModal'
import useProfileModel from '@/app/hooks/useProfileModal'
import MenuItem from '@/app/components/navigation/MenuItem'
import Image from 'next/image'

type MenuProps = {
    currentUser: User | null
}

// メニュー
const Menu: React.FC<MenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)
    const loginModel = useLoginModel()
    const signupModel = useSignupModel()
    const profileModel = useProfileModel()

        // メニューオープン
        const toggleOpen = useCallback(() => {
            setIsOpen((value) => !value)
        },[])

        return (
            <div className="relative">
                <div className="relative h-12 w-12 cursor-pointer" onClick={toggleOpen}>
                <Image
                    src={currentUser?.image || '/default.png'}
                    className="rounded-full object-cover"
                    alt="avator"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                />
                {/*　認証デバッグ用
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>{currentUser?.name}でログイン中</div>
                <div>{currentUser?.image}</div> */}
                </div>

                {isOpen && (
                    <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-grey-100">
                        <div className="cursor-pointer">
                            {currentUser ? (
                                <>
                                    <MenuItem
                                        label="プロフィール"
                                        onClick={() => {
                                            profileModel.onOpen()
                                            setIsOpen(false)
                                        }}
                                    />
                                    <MenuItem
                                        label="ログアウト"
                                        onClick={() => {
                                            signOut()
                                            setIsOpen(false)
                                        }}
                                    />
                                </>
                            ): (
                                <>
                                    <MenuItem
                                        label="ログイン"
                                        onClick={() => {
                                            loginModel.onOpen()
                                            setIsOpen(false)
                                        }}
                                    />
                                    <MenuItem
                                        label="サインアップ"
                                        onClick={() => {
                                            signupModel.onOpen()
                                            setIsOpen(false)
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

        )
}

export default Menu 