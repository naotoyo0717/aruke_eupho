import { getServerSession } from "next-auth"
import { authOptions } from "../lib/nextAuth";
import  prisma from "@/app/lib/prisma"


// ログインユーザー取得
const getCurrentUser = async () => {
    'use server';
    try {
        //　セッション情報取得
        const session = await getServerSession(authOptions)
        
        // ログインしていない場合
        if (!session?.user?.email) {
            return null
        }

        // ログインユーザー取得
        const response = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            }
        })

        if (!response) {
            return null
        }

        return response

    // なぜかエラーが出る。訳がわからない。
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (error) {
        return null
    }
}

export default getCurrentUser