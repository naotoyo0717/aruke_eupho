import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';

const prisma = new PrismaClient();

export async function POST() {
    try {
        const currentUser = await getCurrentUser();
        const userId = currentUser?.id;

        // バリデーション: userIdが文字列かどうか確認
        if (typeof userId !== 'string') {
            return NextResponse.json({ error: 'userIdは必須' }, { status: 400 });
        }

        // 特定のユーザーのselectedをすべてfalseに更新
        const result = await prisma.userSpot.updateMany({
            where: {
                userId: userId,
                selected: true,
            },
            data: {
                selected: false,
            },
        });

        return NextResponse.json({ message: 'selectedをfalseに更新しました。', updatedCount: result.count });
    } catch (error) {
        console.error('Error updating selected:', error);
        return NextResponse.json({ error: '更新中にエラーが発生しました。' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
