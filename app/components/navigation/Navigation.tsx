'use client'

import { User } from '@prisma/client';
import Menu from '@/app/components/navigation/Menu';
import Link from "next/link";
import styles from "@/app/statics/styles/navigation.module.css";
import DrawerMenu from './DrawerMenu';

type NavigationProps = {
    currentUser: User | null
}

//ナビゲーション
const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {
    return (
        <header>
            <div className={styles.navigation}>
                <div className={styles.menuIcon}>
                    <DrawerMenu/>
                </div>
                <div className={styles.title}>
                        <Link href="/signin">
                            <h1>歩け！聖地巡礼 ♪</h1>
                        </Link>
                    </div>
                <div className={styles.container2}>
                    {/* <div className={styles.visitCount}>
                    </div> */}
                    <div className={styles.userIcon}>
                        <Menu currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation