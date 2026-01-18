import { NextResponse } from 'next/server';
import { getTwitchStreamStatus } from '@/lib/social';

export const revalidate = 60; // Revalidate every minute for live status

export async function GET() {
  try {
    const streamStatus = await getTwitchStreamStatus();

    return NextResponse.json({
      success: true,
      ...streamStatus,
    });
  } catch (error) {
    console.error('Twitch API error:', error);
    return NextResponse.json(
      {
        success: false,
        isLive: false,
        error: error instanceof Error ? error.message : 'Failed to fetch status',
      },
      { status: 500 },
    );
  }
}
