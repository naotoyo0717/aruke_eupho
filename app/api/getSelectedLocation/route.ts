import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'ユーザーIDが見つかりません。' });
        }

        const userId = currentUser.id;

        // ユーザーが選択したスポットを取得
        const selectedSpots = await prisma.userSpot.findMany({
            where: {
                userId: userId,
                selected: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        // 選択されたスポットのIDリストを取得
        const selectedSpotsIds = selectedSpots.map((spot) => spot.spotId);

        // スポット情報を取得
        const selectedLocation = await prisma.spot.findMany({
            where: {
                id: {
                    in: selectedSpotsIds,
                },
            },
            orderBy: {
                id: 'asc',
            },
        });

        // データをクライアントに返す
        return NextResponse.json(selectedLocation);

    } catch (error) {
        console.error('Failed to fetch getSelectedLocation', error);
        return NextResponse.json({ error: 'Failed to fetch getSelectedLocation' }, { status: 500 });
    }
}
