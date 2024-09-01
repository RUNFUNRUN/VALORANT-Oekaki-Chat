import { prisma } from '@/client';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const pageSize = 20;

  const searchParams = req.nextUrl.searchParams;
  const cursor = Number.parseInt(searchParams.get('cursor') ?? '0');
  const width = Number.parseInt(searchParams.get('width') ?? '26');

  if (width !== 26 && width !== 27) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (Number.isNaN(cursor)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    const artsCount = await prisma.art.count({
      where: {
        width,
      },
    });

    if (cursor > artsCount) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const arts = await prisma.art.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        width,
      },
      skip: cursor,
      take: pageSize,
    });

    const next = cursor + pageSize < artsCount ? cursor + pageSize : null;

    return NextResponse.json({ success: true, data: arts, next });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
