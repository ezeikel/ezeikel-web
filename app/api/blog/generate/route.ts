import { NextResponse } from 'next/server';
import { generateRandomBlogPost, getBlogTopicStats } from '@/app/actions/blog';

export const maxDuration = 300; // 5 minutes for AI generation

export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Check for Vercel cron header
      const vercelCron = request.headers.get('x-vercel-cron');
      if (!vercelCron) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Get current stats
    const stats = await getBlogTopicStats();

    if (stats.remainingCount === 0) {
      return NextResponse.json({
        success: true,
        message: 'All topics have been covered',
        stats,
      });
    }

    // Generate a new blog post
    const result = await generateRandomBlogPost();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          stats,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      postId: result.postId,
      slug: result.slug,
      topic: result.topic,
      remainingTopics: stats.remainingCount - 1,
    });
  } catch (error) {
    console.error('Blog generation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: Request) {
  return GET(request);
}
