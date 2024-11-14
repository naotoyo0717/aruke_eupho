import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET リクエストに対する処理
export async function GET() {
    try {
        // データベースから Spot データを取得
        const spots = await prisma.spot.findMany();
        return NextResponse.json(spots);
    } catch (error) {
        console.error('spotを取得できませんでした。:', error);
        return NextResponse.json({ error: 'spotのfetchに失敗しました。' }, { status: 500 });
    }
}
