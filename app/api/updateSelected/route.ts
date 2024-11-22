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
        const { spotId, selected } = await request.json();

        // データ型のバリデーション
        if (typeof userId !== 'string' || typeof spotId !== 'number' || typeof selected !== 'boolean') {
            return NextResponse.json({ error: '入力データが不正です。' }, { status: 400 });
        }

        // `selected`の値に基づいて処理
        if (selected) {
            // `selected`が`false`の場合、該当レコードの`selected`カラムを`false`に更新
            const updatedSpot = await prisma.userSpot.updateMany({
                where: {
                    userId,
                    spotId,
                },
                data: {
                    selected: false,
                },
            });

            // 更新結果をレスポンスとして返す
            if (updatedSpot.count === 0) {
                return NextResponse.json({ message: '該当する行が見つかりませんでした。' }, { status: 404 });
            }

            return NextResponse.json({ message: '行の更新に成功しました。', updatedSpot });
        }

        // `selected`が`true`の場合は、レコードを更新または作成
        const updatedSpot = await prisma.userSpot.upsert({
            where: {
                userId_spotId: {
                    userId,
                    spotId,
                },
            },
            update: {
                selected: true,
            },
            create: {
                userId,
                spotId,
                visited: false, // 新規作成時、`visited`はデフォルトで`false`
                selected: true,
            },
        });

        return NextResponse.json(updatedSpot);
    } catch (error) {
        console.error('Failed to update selected status:', error);
        return NextResponse.json({ error: 'Failed to update selected status' }, { status: 500 });
    } finally {
        // PrismaClientを明示的に閉じる
        await prisma.$disconnect();
    }
}
