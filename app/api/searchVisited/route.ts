import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // visited が true のスポットを取得
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'ユーザーIDが見つかりません。'})
        }

        const userId = currentUser.id;

        const visitedSpots = await prisma.userSpot.findMany({
            where: {
                userId : userId,
                visited: true,
            },
            select: {
                spotId: true,
            },
        });

        return NextResponse.json(visitedSpots);
    } catch (error) {
        console.error('Failed to fetch visited spots:', error);
        return NextResponse.json({ error: 'Failed to fetch visited spots' }, { status: 500 });
    }
}
