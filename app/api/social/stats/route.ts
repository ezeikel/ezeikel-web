import { NextResponse } from 'next/server';
import { getAggregatedStats, getRecentContent } from '@/lib/social';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const [stats, content] = await Promise.all([
      getAggregatedStats(),
      getRecentContent(),
    ]);

    return NextResponse.json({
      success: true,
      stats,
      recentContent: content.slice(0, 10), // Limit to 10 most recent
    });
  } catch (error) {
    console.error('Social stats API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
      },
      { status: 500 },
    );
  }
}
