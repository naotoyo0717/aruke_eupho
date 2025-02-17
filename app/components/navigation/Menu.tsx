import { usePathname } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { User } from "@prisma/client"

import useProfileModel from '@/app/hooks/useProfileModal'
import MenuItem from '@/app/components/navigation/MenuItem'
import Image from 'next/image'
import styles from '@/app/statics/styles/navigationIcon.module.css'

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
    }, [pathname])

    return (
        <div className={styles.menuContainer}>
            <div className={styles.avatarContainer} onClick={toggleOpen}>
                <Image
                    width={150}
                    height={150}
                    src={currentUser?.image || '/default.png'}
                    className={styles.avatarImage}
                    alt="avatar"
                    // fill
                />
            </div>

            {isOpen && (
                <div className={styles.dropdownMenu}>
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
