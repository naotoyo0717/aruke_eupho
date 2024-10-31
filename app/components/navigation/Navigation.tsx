'use client'

import { User } from '@prisma/client'
import Menu from '@/app/components/navigation/Menu'
import Link from "next/link"

type NavigationProps = {
    currentUser: User | null
}

//ナビゲーション
const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {
    return (
        <header className="shadow-lg shadow-grey-100">
            <div className="container mx-auto flex max-w-screen-sm items-center justify-between px-5">
                <Link href="/signin" className="cursor-pointer text-xl font-bold">
                    あああ
                </Link>
                
                <div className='flex items-center justify-center space-x-2'>
                    <Menu currentUser={currentUser} />
                </div>
            </div>
        </header>
    )
}

export default Navigation