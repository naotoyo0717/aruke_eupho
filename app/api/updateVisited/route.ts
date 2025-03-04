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
            return NextResponse.json({ error: 'ユーザー情報を取得できませんでした。' }, { status: 400 });
        }

        // `visited`がfalseの場合、該当レコードの`visited`カラムを`false`に更新
        if (!visited) {
            const updatedSpot = await prisma.userSpot.updateMany({
                where: {
                    userId,
                    spotId,
                },
                data: {
                    visited: false,
                },
            });

            // 更新結果をレスポンスとして返す
            if (updatedSpot.count === 0) {
                return NextResponse.json({ message: '該当する行が見つかりませんでした。' }, { status: 404 });
            }

            return NextResponse.json({ message: '行の更新に成功しました。', updatedSpot });
        }

        // `visited`がtrueの場合は、レコードを更新または作成
        const updatedSpot = await prisma.userSpot.upsert({
            where: {
                userId_spotId: {
                    userId,
                    spotId,
                },
            },
            update: {
                visited: true,
            },
            create: {
                userId,
                spotId,
                visited: true,
                selected: false,
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
