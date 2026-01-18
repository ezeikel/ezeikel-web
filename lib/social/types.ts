export type Platform =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitter'
  | 'linkedin'
  | 'twitch';

export type PlatformStats = {
  platform: Platform;
  followers: number;
  engagement: number;
  displayName: string;
  username: string;
  url: string;
};

export type ContentItem = {
  id: string;
  platform: Platform;
  type: 'video' | 'image' | 'post';
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  url: string;
  views?: number;
  likes?: number;
  comments?: number;
  publishedAt: string;
};

export type AggregatedStats = {
  totalFollowers: number;
  monthlyImpressions: number;
  averageEngagement: number;
  platforms: PlatformStats[];
  lastUpdated: string;
};

export type TwitchStreamStatus = {
  isLive: boolean;
  title?: string;
  gameName?: string;
  viewerCount?: number;
  thumbnailUrl?: string;
  startedAt?: string;
};
