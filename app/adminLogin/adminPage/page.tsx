// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/lib/nextAuth"
import { notFound } from "next/navigation"
import getCurrentUser from '@/app/actions/getCurrentUser'

export default async function AdminPage() {
    const currentUser = await getCurrentUser()
    // const session = await getServerSession(authOptions)

    if (currentUser?.isAdmin === false) {
        // 認証されていない、または管理者でない場合は 404 を表示
        notFound()
    }

    return (
        <div>
            管理者ページです
        </div>
    )
}
