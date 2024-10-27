'use Client'
import { User } from "@prisma/client"
import Image from 'next/image'
import styles from "@/app/statics/styles/userIcon.module.css";

type IconProps = {
    currentUser: User | null
}

const UserIcon: React.FC<IconProps> = ({ currentUser }) => {
    return (
        <Image
            src={currentUser?.image || '/default.png'}
            alt="avator"
            width={250}
            height={250}
            className={styles.userIcon}
        />
    )
}

export default UserIcon