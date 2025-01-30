import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Review } from '@/app/types';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const spotId = searchParams.get('spotId');

    const parsedSpotId = spotId ? parseInt(spotId, 10) : 0;

    try {
        const reviews = await prisma.reviewSpot.findMany({
            where: {
                spotId: parsedSpotId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                userId: true,
                createdAt: true,
                user: {
                    select: {
                        image: true,
                        name: true,
                    },
                },
            },
        });

        const reviewsWithMappedData: Review[] = reviews.map(review => ({
            id: review.id,
            userId: review.userId,
            userName: review.user.name ?? '名無しさん',
            userImage: review.user.image ?? '/default.png',
            title: review.title,
            content: review.content,
            createdAt: review.createdAt,
        }));
        console.log("あああああ");
        return NextResponse.json(reviewsWithMappedData);
    } catch (error) {
        console.error('reviewsを取得できませんでした。:', error);
        return NextResponse.json({ error: 'reviewsのfetchに失敗しました。' }, { status: 500 });
    }
}
