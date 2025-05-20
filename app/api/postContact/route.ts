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
        console.log(userId);
        const { email, title, content } = await request.json();

        if (typeof userId !== 'string' || typeof email !== 'string' || typeof title !== 'string' || typeof content !== 'string') {
            return NextResponse.json({ error: '入力データが不正です。' }, { status: 400 });
        }

        const createContact = await prisma.contact.create({
            data: {
                userId,
                email,
                title,
                content,
            },
        });

        return NextResponse.json(createContact);
    } catch (error) {
        console.error('Failed to create review status:', error);
        return NextResponse.json({ error: 'Failed to create contact status' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}