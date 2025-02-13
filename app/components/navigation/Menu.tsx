import { usePathname } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { User } from "@prisma/client"

import useProfileModel from '@/app/hooks/useProfileModal'
import MenuItem from '@/app/components/navigation/MenuItem'
import Image from 'next/image'

type MenuProps = {
    currentUser: User | null
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)
    const profileModel = useProfileModel()
    const pathname = usePathname()

    // メニューオープン
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    useEffect(() => {
        // localStorage を使用してリロードフラグを保存
        if (pathname === "/top" && !localStorage.getItem("reloaded")) {
            localStorage.setItem("reloaded", "true")
            setTimeout(() => {
                window.location.reload() // 100ms 後にリロード
            }, 100)
        }
    }, [pathname]) // pathnameを依存配列に追加
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
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-grey-100">
                    <div className="cursor-pointer">
                        <MenuItem
                            label="プロフィール"
                            onClick={() => {
                                profileModel.onOpen()
                                setIsOpen(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu