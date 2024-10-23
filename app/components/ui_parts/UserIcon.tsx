'use Client'
import { User } from "@prisma/client"
import Image from 'next/image'

type IconProps = {
    currentUser: User | null
}

const UserIcon: React.FC<IconProps> = ({ currentUser }) => {
    return (
        <Image
            src={currentUser?.image || '/default.png'}
            alt="avator"
            width={500}
            height={500}
        />
    )
}

export default UserIcon