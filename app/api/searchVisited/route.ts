import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // visited が true のスポットを取得
        const visitedSpots = await prisma.userSpot.findMany({
            where: {
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
