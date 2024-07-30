import { auth } from '@/auth';
import { prisma } from '@/client';
import { shareArtSchema } from '@/schemas';
import type { ShareArtResponse } from '@/types';
import { flattenArray } from '@/utils';
import { NextResponse } from 'next/server';

export const POST = auth(async (req) => {
  const session = req.auth;
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 },
    );
  }

  const account = await prisma.account.findUnique({
    where: { access_token: session.accessToken },
  });
  if (!account) {
    return NextResponse.json(
      { success: false, error: 'Account not found' },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: account.userId },
  });
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 401 },
    );
  }

  const result = shareArtSchema.safeParse(await req.json());
  if (!result ?? !result.data) {
    return NextResponse.json(
      { success: false, error: 'ascii data is valid' },
      { status: 500 },
    );
  }

  const post = await prisma.art.create({
    data: {
      userId: user.id,
      title: result.data.title,
      description: result.data.description,
      body: flattenArray(result.data.ascii),
      width: result.data.width,
      height: result.data.height,
    },
  });

  const resJson: ShareArtResponse = {
    success: true,
    slug: post.slug.toString(),
  };

  return NextResponse.json(resJson);
});
