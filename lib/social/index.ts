/**
 * Social Media Integration
 *
 * TODO: Connect remaining platforms for live stats
 *
 * Currently implemented:
 * - YouTube (via youtube.ts) - requires YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID
 * - Twitch (via twitch.ts) - requires TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET
 *
 * TODO: Implement:
 * - Instagram (create instagram.ts) - requires Meta/Facebook developer account
 *   - API: Instagram Graph API
 *   - Endpoint: GET /{user-id}?fields=followers_count,media_count
 *   - Requires: INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID
 *
 * - TikTok (create tiktok.ts) - requires TikTok developer account
 *   - API: TikTok API for Business or TikTok Display API
 *   - Endpoint: GET /user/info
 *   - Requires: TIKTOK_ACCESS_TOKEN
 *
 * - Twitter/X (create twitter.ts) - requires Twitter developer account
 *   - API: Twitter API v2
 *   - Endpoint: GET /2/users/:id with public_metrics
 *   - Requires: TWITTER_BEARER_TOKEN
 *
 * - LinkedIn (create linkedin.ts) - requires LinkedIn developer account
 *   - API: LinkedIn Marketing API
 *   - Note: Personal profiles have limited API access; company pages have better support
 *   - Requires: LINKEDIN_ACCESS_TOKEN
 */

import type { AggregatedStats, PlatformStats, ContentItem } from './types';
import { getYouTubeStats, getRecentYouTubeVideos } from './youtube';
import { getTwitchStats, getTwitchStreamStatus } from './twitch';

export * from './types';
export * from './youtube';
export * from './twitch';

// Fallback stats when APIs aren't configured (from media kit)
// TODO: Update these values periodically or remove once all APIs are connected
const FALLBACK_STATS: PlatformStats[] = [
  {
    platform: 'instagram',
    followers: 103000,
    engagement: 5.2,
    displayName: 'Ezeikel',
    username: 'ezeikel.dev',
    url: 'https://instagram.com/ezeikel.dev',
  },
  {
    platform: 'tiktok',
    followers: 78000,
    engagement: 8.1,
    displayName: 'Ezeikel',
    username: 'ezeikel.dev',
    url: 'https://tiktok.com/@ezeikel.dev',
  },
  {
    platform: 'youtube',
    followers: 45000,
    engagement: 4.8,
    displayName: 'Ezeikel',
    username: 'ezeikel',
    url: 'https://youtube.com/@ezeikel',
  },
  {
    platform: 'twitter',
    followers: 12000,
    engagement: 3.2,
    displayName: 'Ezeikel',
    username: 'ezeikel',
    url: 'https://x.com/ezeikel',
  },
  {
    platform: 'linkedin',
    followers: 8000,
    engagement: 6.5,
    displayName: 'Ezeikel Pemberton',
    username: 'ezeikel',
    url: 'https://linkedin.com/in/ezeikel',
  },
  {
    platform: 'twitch',
    followers: 2000,
    engagement: 0,
    displayName: 'Ezeikel',
    username: 'ezeikel',
    url: 'https://twitch.tv/ezeikel',
  },
];

/**
 * Get aggregated stats from all platforms
 * Uses live API data where available, falls back to static data
 */
export async function getAggregatedStats(): Promise<AggregatedStats> {
  const platforms: PlatformStats[] = [];

  // Try to get live stats from configured APIs
  const [youtubeStats, twitchStats] = await Promise.all([
    getYouTubeStats().catch(() => null),
    getTwitchStats().catch(() => null),
  ]);

  // Build platform list, preferring live data
  for (const fallback of FALLBACK_STATS) {
    if (fallback.platform === 'youtube' && youtubeStats) {
      platforms.push(youtubeStats);
    } else if (fallback.platform === 'twitch' && twitchStats) {
      platforms.push(twitchStats);
    } else {
      // Use fallback for platforms without API integration
      platforms.push(fallback);
    }
  }

  // Calculate totals
  const totalFollowers = platforms.reduce((sum, p) => sum + p.followers, 0);
  const averageEngagement =
    platforms.reduce((sum, p) => sum + p.engagement, 0) / platforms.length;

  // Estimate monthly impressions (rough calculation)
  const monthlyImpressions = Math.round(totalFollowers * 10); // ~10x followers per month

  return {
    totalFollowers,
    monthlyImpressions,
    averageEngagement: Math.round(averageEngagement * 10) / 10,
    platforms,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get recent content from all platforms
 */
export async function getRecentContent(): Promise<ContentItem[]> {
  const content: ContentItem[] = [];

  try {
    const youtubeVideos = await getRecentYouTubeVideos(5);
    content.push(...youtubeVideos);
  } catch (error) {
    console.error('Failed to get YouTube content:', error);
  }

  // TODO: Add Instagram, TikTok content when APIs are configured

  // Sort by date
  return content.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
