import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'ユーザーIDが見つかりません。' }, { status: 401 });
        }

        const userId = currentUser.id;
        const { spotId, visited } = await request.json();

        // データ型のバリデーション
        if (typeof userId !== 'string' || typeof spotId !== 'number' || typeof visited !== 'boolean') {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }

        // 最新のUserSpotデータを更新または作成
        const updatedSpot = await prisma.userSpot.upsert({
            where: {
                userId_spotId: {
                    userId,
                    spotId,
                },
            },
            update: {
                visited: visited,
            },
            create: {
                userId,
                spotId,
                visited,
            },
        });

        // 古いレコードの削除処理
        await prisma.userSpot.deleteMany({
            where: {
                userId,
                spotId,
                id: {
                    not: updatedSpot.id, // 最新のレコード以外を削除
                },
            },
        });

        return NextResponse.json(updatedSpot);
    } catch (error) {
        console.error('Failed to update visited status:', error);
        return NextResponse.json({ error: 'Failed to update visited status' }, { status: 500 });
    } finally {
        // PrismaClientを明示的に閉じる
        await prisma.$disconnect();
    }
}
