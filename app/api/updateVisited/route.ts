import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        // リクエストボディからデータを取得
        const { userId, spotId, visited } = await request.json();

        // データ型のバリデーション
        if (typeof userId !== 'string' || typeof spotId !== 'number' || typeof visited !== 'boolean') {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
        }

        // UserSpotテーブルを更新（存在しない場合は作成）
        const updatedSpot = await prisma.userSpot.upsert({
            where: {
                userId_spotId: {
                    userId: userId,
                    spotId: spotId
                }
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

        return NextResponse.json(updatedSpot);
    } catch (error) {
        console.error('Failed to update visited status:', error);
        return NextResponse.json({ error: 'Failed to update visited status' }, { status: 500 });
    } finally {
        // PrismaClientを明示的に閉じる
        await prisma.$disconnect();
    }
}
