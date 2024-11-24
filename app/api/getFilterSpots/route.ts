import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter');

  let parsedFilter = filter ? parseInt(filter, 10) : 0;

  try {
    let filteredSpots;
    let unCheckedSpots;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'ユーザーIDが見つかりません。' });
    }

    const userId = currentUser.id;

    if (parsedFilter === 0) {
      filteredSpots = await prisma.spot.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } else if (parsedFilter === 1) {
      filteredSpots = await prisma.spot.findMany({
        where: {
          standard: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } else if (parsedFilter === 2) {
      unCheckedSpots = await prisma.userSpot.findMany({
        where: {
          userId: userId,
          visited: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      // unCheckedSpots から spotId を取り出し
      const checkedSpotIds = unCheckedSpots.map((spot) => spot.spotId);

      // spotId に一致しないスポットを取得
      filteredSpots = await prisma.spot.findMany({
        where: {
          NOT: {
            id: {
              in: checkedSpotIds, // 取り出したspotIdが含まれないスポットを取得
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });

      console.log({ unCheckedSpots });
    } else if (parsedFilter === 3) {
      unCheckedSpots = await prisma.userSpot.findMany({
        where: {
          userId: userId,
          visited: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      // unCheckedSpots から spotId を取り出し
      const checkedSpotIds = unCheckedSpots.map((spot) => spot.spotId);

      // spotId に一致しないスポットを取得
      filteredSpots = await prisma.spot.findMany({
        where: {
            id: {
              in: checkedSpotIds, // 取り出したspotIdが含まれないスポットを取得
            },
          },
        orderBy: {
          id: 'asc',
        },
      });

      console.log({ unCheckedSpots });
    } else {
      parsedFilter = parsedFilter - 3;
      filteredSpots = await prisma.spot.findMany({
        where: {
          nearStation: parsedFilter,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    return NextResponse.json(filteredSpots);
  } catch (error) {
    console.error('Failed to fetch filtered spots', error);
    return NextResponse.json({ error: 'Failed to fetch filtered spots' }, { status: 500 });
  }
}
