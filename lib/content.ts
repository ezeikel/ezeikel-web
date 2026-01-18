/**
 * Content Types and Data
 *
 * TODO: Connect to live social media APIs for real-time content data
 * - YouTube Data API v3 for video stats, playlists, and channel info
 * - TikTok API (or scraping service) for video views/likes
 * - Instagram Graph API for reels and posts
 *
 * Implementation notes:
 * - Create API routes at /api/social/youtube, /api/social/tiktok, /api/social/instagram
 * - Cache responses with ISR (revalidate: 3600) to avoid rate limits
 * - Fall back to hardcoded data if APIs fail
 * - Consider using a service like SocialBlade or similar for unified stats
 *
 * Environment variables needed:
 * - YOUTUBE_API_KEY (already in .env.local.example)
 * - YOUTUBE_CHANNEL_ID
 * - TIKTOK_ACCESS_TOKEN (requires TikTok developer account)
 * - INSTAGRAM_ACCESS_TOKEN (requires Facebook/Meta developer account)
 */

export type ContentItem = {
  id: string
  title: string
  description: string
  platform: "YouTube" | "TikTok" | "Instagram" | "Shorts"
  thumbnail: string
  duration: string
  views: string // TODO: Fetch from API - currently hardcoded
  likes: string // TODO: Fetch from API - currently hardcoded
  date: string
  href: string
  series?: string
  featured?: boolean
}

export type ContentSeries = {
  id: string
  name: string
  description: string
  thumbnail: string
  videoCount: number
  href: string
}

// TODO: Fetch series/playlists from YouTube Data API
// Example: GET https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId={CHANNEL_ID}&key={API_KEY}
export const contentSeries: ContentSeries[] = [
  {
    id: "1",
    name: "Building Parking Ticket Pal",
    description: "Full dev log series documenting the creation of Parking Ticket Pal from idea to launch.",
    thumbnail: "/parking-ticket-pal-series-thumb.jpg",
    videoCount: 12, // TODO: Fetch from API - playlist.contentDetails.itemCount
    href: "#", // TODO: Link to actual YouTube playlist
  },
  {
    id: "2",
    name: "Chunky Crayon Dev Log",
    description: "Behind the scenes of building a kids colouring app with React Native and Expo.",
    thumbnail: "/chunky-crayon-series-thumb.jpg",
    videoCount: 8, // TODO: Fetch from API - playlist.contentDetails.itemCount
    href: "#", // TODO: Link to actual YouTube playlist
  },
]

// TODO: Fetch content items from social media APIs
// Hardcoded data for now - replace with API calls when ready
// Structure:
//   1. Create /api/content/videos route that aggregates from YouTube, TikTok, Instagram
//   2. Use ISR with revalidate: 3600 (1 hour) to cache results
//   3. Merge and sort by date, applying filters
export const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Building a React Native App from Scratch - Part 1",
    description: "Starting a new indie app project. Watch as I set up the development environment and plan features.",
    platform: "YouTube",
    thumbnail: "/content-thumbnail-1.jpg",
    duration: "15:32",
    views: "24K",
    likes: "1.2K",
    date: "Jan 15, 2026",
    href: "https://youtube.com/watch?v=example1",
    series: "Building Parking Ticket Pal",
    featured: true,
  },
  {
    id: "2",
    title: "Day in the life of a UK indie dev",
    description: "A typical day building apps, creating content, and managing the business side of indie hacking.",
    platform: "TikTok",
    thumbnail: "/content-thumbnail-2.jpg",
    duration: "0:58",
    views: "156K",
    likes: "12K",
    date: "Jan 12, 2026",
    href: "https://tiktok.com/@ezeikel.dev/video/example2",
    featured: true,
  },
  {
    id: "3",
    title: "My coding setup tour 2026",
    description: "Full tour of my home office setup, gear, and the tools I use daily for coding and content creation.",
    platform: "Instagram",
    thumbnail: "/content-thumbnail-3.jpg",
    duration: "1:24",
    views: "89K",
    likes: "8.5K",
    date: "Jan 10, 2026",
    href: "https://instagram.com/reel/example3",
    featured: true,
  },
  {
    id: "4",
    title: "How I built Parking Ticket Pal in 3 months",
    description:
      "The complete story from idea to App Store, including challenges, tech decisions, and lessons learned.",
    platform: "YouTube",
    thumbnail: "/content-thumbnail-4.jpg",
    duration: "22:10",
    views: "18K",
    likes: "980",
    date: "Jan 5, 2026",
    href: "https://youtube.com/watch?v=example4",
    series: "Building Parking Ticket Pal",
  },
  {
    id: "5",
    title: "React Native vs Flutter in 60 seconds",
    description: "Quick comparison of the two most popular cross-platform frameworks.",
    platform: "Shorts",
    thumbnail: "/content-thumbnail-5.jpg",
    duration: "0:59",
    views: "245K",
    likes: "18K",
    date: "Jan 3, 2026",
    href: "https://youtube.com/shorts/example5",
  },
  {
    id: "6",
    title: "Adding AI to my indie app",
    description: "Integrating OpenAI into Parking Ticket Pal to generate appeal letters.",
    platform: "YouTube",
    thumbnail: "/content-thumbnail-6.jpg",
    duration: "18:45",
    views: "12K",
    likes: "750",
    date: "Dec 28, 2025",
    href: "https://youtube.com/watch?v=example6",
    series: "Building Parking Ticket Pal",
  },
  {
    id: "7",
    title: "The truth about indie hacking income",
    description: "Real numbers and honest talk about making money as an indie developer.",
    platform: "TikTok",
    thumbnail: "/content-thumbnail-7.jpg",
    duration: "1:45",
    views: "320K",
    likes: "28K",
    date: "Dec 25, 2025",
    href: "https://tiktok.com/@ezeikel.dev/video/example7",
  },
  {
    id: "8",
    title: "Designing app icons that stand out",
    description: "My process for creating memorable app icons.",
    platform: "Instagram",
    thumbnail: "/content-thumbnail-8.jpg",
    duration: "2:10",
    views: "45K",
    likes: "4.2K",
    date: "Dec 20, 2025",
    href: "https://instagram.com/reel/example8",
  },
]

export const getContentByPlatform = (platform: string): ContentItem[] => {
  if (platform === "All") return contentItems
  return contentItems.filter((item) => item.platform === platform)
}

export const getFeaturedContent = (): ContentItem[] => {
  return contentItems.filter((item) => item.featured)
}
