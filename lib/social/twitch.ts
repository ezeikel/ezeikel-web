import type { PlatformStats, TwitchStreamStatus } from './types';

const { TWITCH_CLIENT_ID } = process.env;
const { TWITCH_CLIENT_SECRET } = process.env;
const TWITCH_USERNAME = process.env.TWITCH_USERNAME || 'ezeikel';

let accessToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  // Check if token is still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error('Twitch credentials not configured');
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(`Twitch auth error: ${response.status}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 minute early

  return accessToken!;
}

async function twitchFetch(endpoint: string) {
  const token = await getAccessToken();

  return fetch(`https://api.twitch.tv/helix${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': TWITCH_CLIENT_ID!,
    },
    next: { revalidate: 60 }, // Cache for 1 minute (stream status changes frequently)
  });
}

export async function getTwitchStats(): Promise<PlatformStats | null> {
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    console.warn('Twitch API not configured');
    return null;
  }

  try {
    const response = await twitchFetch(`/users?login=${TWITCH_USERNAME}`);

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.status}`);
    }

    const data = await response.json();
    const user = data.data?.[0];

    if (!user) {
      return null;
    }

    // Get follower count
    const followersResponse = await twitchFetch(
      `/channels/followers?broadcaster_id=${user.id}`,
    );
    const followersData = await followersResponse.json();

    return {
      platform: 'twitch',
      followers: followersData.total || 0,
      engagement: 0, // Would need stream data to calculate
      displayName: user.display_name,
      username: user.login,
      url: `https://twitch.tv/${user.login}`,
    };
  } catch (error) {
    console.error('Twitch stats error:', error);
    return null;
  }
}

export async function getTwitchStreamStatus(): Promise<TwitchStreamStatus> {
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    return { isLive: false };
  }

  try {
    const response = await twitchFetch(
      `/streams?user_login=${TWITCH_USERNAME}`,
    );

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.status}`);
    }

    const data = await response.json();
    const stream = data.data?.[0];

    if (!stream) {
      return { isLive: false };
    }

    return {
      isLive: true,
      title: stream.title,
      gameName: stream.game_name,
      viewerCount: stream.viewer_count,
      thumbnailUrl: stream.thumbnail_url
        ?.replace('{width}', '320')
        ?.replace('{height}', '180'),
      startedAt: stream.started_at,
    };
  } catch (error) {
    console.error('Twitch stream status error:', error);
    return { isLive: false };
  }
}
