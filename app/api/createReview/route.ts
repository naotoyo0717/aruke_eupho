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
        const { spotId, title, content } = await request.json();

        if (typeof userId !== 'string' || typeof spotId !== 'number' || typeof title !== 'string' || typeof content !== 'string') {
            return NextResponse.json({ error: '入力データが不正です。' }, { status: 400 });
        }

        const createReview = await prisma.reviewSpot.create({
            data: {
                title,
                content,
                userId,
                spotId,
            },
        });

        return NextResponse.json(createReview);
    } catch (error) {
        console.error('Failed to create review status:', error);
        return NextResponse.json({ error: 'Failed to create review status' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}