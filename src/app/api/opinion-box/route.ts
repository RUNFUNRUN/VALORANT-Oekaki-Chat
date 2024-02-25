import { OpinionBoxData, OpinionBoxResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const json: OpinionBoxData = await req.json();
  const content = json.content;
  try {
    if (!process.env.DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is not defined');
    }
    await fetch(process.env.DISCORD_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'valo-oekaki-chat opinion box',
        content: '```\n' + content + '\n```',
      }),
    });
    const resJson: OpinionBoxResponse = { success: true };
    return NextResponse.json(resJson, { status: 200 });
  } catch (err: any) {
    const resJson: OpinionBoxResponse = { success: false, error: err };
    return NextResponse.json(resJson, { status: 500 });
  }
};
