import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req : Request) {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('spotId');

    const parsedTarget = target ? parseInt(target, 10) : 0;

    try {
        const spot = await prisma.spot.findMany({
            where: {
                id: parsedTarget,
            },
        });
        return NextResponse.json(spot);
        
    } catch (error) {
        console.error('対象のスポットを取得できませんでした。：',error);
        return NextResponse.json({ error: 'getSpot失敗。'}, {status: 500});
    }
}