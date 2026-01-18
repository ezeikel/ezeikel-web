import type { PlatformStats, ContentItem } from './types';

const { YOUTUBE_API_KEY } = process.env;
const { YOUTUBE_CHANNEL_ID } = process.env;

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

type YouTubeChannelResponse = {
  items: {
    id: string;
    snippet: {
      title: string;
      customUrl: string;
    };
    statistics: {
      subscriberCount: string;
      viewCount: string;
      videoCount: string;
    };
  }[];
};

type YouTubeVideosResponse = {
  items: {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: { url: string };
      };
      publishedAt: string;
    };
  }[];
};

type YouTubeVideoStatsResponse = {
  items: {
    id: string;
    statistics: {
      viewCount: string;
      likeCount: string;
      commentCount: string;
    };
  }[];
};

export async function getYouTubeStats(): Promise<PlatformStats | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube API not configured');
    return null;
  }

  try {
    const url = `${BASE_URL}/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeChannelResponse = await response.json();
    const channel = data.items?.[0];

    if (!channel) {
      return null;
    }

    return {
      platform: 'youtube',
      followers: parseInt(channel.statistics.subscriberCount, 10),
      engagement: 4.8, // Would need to calculate from video stats
      displayName: channel.snippet.title,
      username: channel.snippet.customUrl?.replace('@', '') || 'ezeikel',
      url: `https://youtube.com/${channel.snippet.customUrl || YOUTUBE_CHANNEL_ID}`,
    };
  } catch (error) {
    console.error('YouTube stats error:', error);
    return null;
  }
}

export async function getRecentYouTubeVideos(
  maxResults = 5,
): Promise<ContentItem[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return [];
  }

  try {
    // Get recent videos
    const searchUrl = `${BASE_URL}/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`;
    const searchResponse = await fetch(searchUrl, {
      next: { revalidate: 3600 },
    });

    if (!searchResponse.ok) {
      throw new Error(`YouTube search error: ${searchResponse.status}`);
    }

    const searchData: YouTubeVideosResponse = await searchResponse.json();
    const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

    // Get video statistics
    const statsUrl = `${BASE_URL}/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const statsResponse = await fetch(statsUrl, { next: { revalidate: 3600 } });
    const statsData: YouTubeVideoStatsResponse = await statsResponse.json();

    // Combine data
    return searchData.items.map((item) => {
      const stats = statsData.items.find((s) => s.id === item.id.videoId);
      return {
        id: item.id.videoId,
        platform: 'youtube' as const,
        type: 'video' as const,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        url: `https://youtube.com/watch?v=${item.id.videoId}`,
        views: stats ? parseInt(stats.statistics.viewCount, 10) : undefined,
        likes: stats ? parseInt(stats.statistics.likeCount, 10) : undefined,
        comments: stats
          ? parseInt(stats.statistics.commentCount, 10)
          : undefined,
        publishedAt: item.snippet.publishedAt,
      };
    });
  } catch (error) {
    console.error('YouTube videos error:', error);
    return [];
  }
}
