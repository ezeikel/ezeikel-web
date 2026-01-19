'use client';

/**
 * Media Kit Page
 *
 * TODO: Connect to live social media APIs for real-time stats
 *
 * Implementation plan:
 * 1. Create /api/social/stats endpoint that aggregates follower counts from:
 *    - YouTube Data API v3 (channels.list - statistics.subscriberCount)
 *    - Instagram Graph API (me?fields=followers_count)
 *    - TikTok API (user/info - follower_count)
 *    - Twitter/X API v2 (users/:id - public_metrics.followers_count)
 *    - LinkedIn API (organizationsLookup - follower count for company pages)
 *
 * 2. Cache with ISR (revalidate: 3600) to avoid rate limits
 *
 * 3. Use existing /api/social/stats route structure (already exists but returns hardcoded data)
 *
 * 4. Environment variables needed (add to .env.local):
 *    - YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID (already in .env.local.example)
 *    - INSTAGRAM_ACCESS_TOKEN (Facebook/Meta developer account)
 *    - TIKTOK_ACCESS_TOKEN (TikTok developer account)
 *    - TWITTER_BEARER_TOKEN (Twitter developer account)
 *    - LINKEDIN_ACCESS_TOKEN (LinkedIn developer account)
 *
 * 5. Fallback to hardcoded values if API calls fail
 */

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBriefcase,
  faEnvelope,
  faMicrophone,
  faPaperPlane,
  faPlay,
  faPuzzlePiece,
  faStar,
  faVideo,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const useCountUp = (
  end: number,
  duration = 2000,
  start = 0,
  inView = false,
) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - (1 - progress) ** 3;
      setCount(Math.floor(easeOut * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start, inView]);

  return count;
};

const KeyMetrics = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const followers = useCountUp(246, 2000, 0, isInView);
  const impressions = useCountUp(2.5, 2000, 0, isInView);
  const engagement = useCountUp(5.8, 2000, 0, isInView);

  return (
    <div ref={ref} className="mb-12 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center">
        <p className="mb-2 text-5xl font-bold text-foreground">{followers}K+</p>
        <p className="text-muted-foreground">Total Followers</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="mb-2 text-5xl font-bold text-foreground">
          {impressions.toFixed(1)}M+
        </p>
        <p className="text-muted-foreground">Monthly Impressions</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="mb-2 text-5xl font-bold text-foreground">
          {engagement.toFixed(1)}%
        </p>
        <p className="text-muted-foreground">Avg Engagement Rate</p>
      </div>
    </div>
  );
};

// TODO: Fetch from /api/social/stats endpoint - currently hardcoded
// These stats should be fetched server-side and passed as props, or fetched client-side with SWR
const platformStats: {
  platform: string;
  icon: IconDefinition;
  handle: string;
  followers: string;
  avgViews: string;
  engagement: string;
  color: string;
  bgColor: string;
}[] = [
  {
    platform: 'Instagram',
    icon: faInstagram,
    handle: '@ezeikel.dev',
    followers: '103K', // TODO: Fetch from Instagram Graph API
    avgViews: '45K', // TODO: Calculate from recent posts
    engagement: '5.2%', // TODO: Calculate from likes/comments vs followers
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
  },
  {
    platform: 'TikTok',
    icon: faTiktok,
    handle: '@ezeikel.dev',
    followers: '78K', // TODO: Fetch from TikTok API
    avgViews: '120K', // TODO: Calculate from recent videos
    engagement: '8.1%', // TODO: Calculate from engagement metrics
    color: 'text-foreground',
    bgColor: 'bg-secondary',
  },
  {
    platform: 'YouTube',
    icon: faYoutube,
    handle: '@ezeikel',
    followers: '45K', // TODO: Fetch from YouTube Data API v3
    avgViews: '15K', // TODO: Calculate from recent videos
    engagement: '4.8%', // TODO: Calculate from likes/comments vs views
    color: 'text-red-500',
    bgColor: 'bg-red-100',
  },
  {
    platform: 'X/Twitter',
    icon: faXTwitter,
    handle: '@ezeikel',
    followers: '12K', // TODO: Fetch from Twitter/X API v2
    avgViews: '8K', // TODO: Calculate from impressions
    engagement: '3.2%', // TODO: Calculate from engagement rate
    color: 'text-foreground',
    bgColor: 'bg-secondary',
  },
  {
    platform: 'LinkedIn',
    icon: faLinkedinIn,
    handle: 'ezeikel-pemberton',
    followers: '8K', // TODO: Fetch from LinkedIn API
    avgViews: '5K', // TODO: Calculate from post impressions
    engagement: '6.5%', // TODO: Calculate from engagement metrics
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
];

// TODO: Aggregate from platform APIs - currently hardcoded
// totalFollowers should be sum of all platform followers
// demographics and locations available from YouTube Analytics and Instagram Insights APIs
const audienceData = {
  totalFollowers: '246K+', // TODO: Sum from all platforms
  monthlyImpressions: '2.5M+', // TODO: Aggregate from analytics APIs
  avgEngagement: '5.8%', // TODO: Calculate weighted average
  demographics: [
    // TODO: Fetch from YouTube Analytics API (reports.query) or Instagram Insights
    { label: '18-24', percentage: 35 },
    { label: '25-34', percentage: 45 },
    { label: '35-44', percentage: 15 },
    { label: '45+', percentage: 5 },
  ],
  topLocations: ['UK', 'USA', 'Germany', 'India', 'Canada'], // TODO: Fetch from analytics APIs
  contentThemes: [
    'Software Development',
    'Indie Hacking',
    'Tech Reviews',
    'Gaming Setups',
    'Productivity',
  ],
};

const contentExamples = [
  {
    title: 'Building apps in public',
    platform: 'YouTube',
    thumbnail: '/content-thumbnail-1.jpg',
    stats: '24K views',
  },
  {
    title: 'Day in the life content',
    platform: 'TikTok',
    thumbnail: '/content-thumbnail-2.jpg',
    stats: '156K views',
  },
  {
    title: 'Tech setup tours',
    platform: 'Instagram',
    thumbnail: '/content-thumbnail-3.jpg',
    stats: '89K views',
  },
  {
    title: 'Dev tutorials',
    platform: 'YouTube',
    thumbnail: '/content-thumbnail-4.jpg',
    stats: '18K views',
  },
];

const collaborationFormats: {
  title: string;
  description: string;
  icon: IconDefinition;
}[] = [
  {
    title: 'Sponsored Videos & Reels',
    description:
      'Dedicated content featuring your product or service, tailored to my audience of developers and tech enthusiasts.',
    icon: faVideo,
  },
  {
    title: 'App & Product Integrations',
    description:
      'Natural integration of your product into my development workflow, app builds, or content creation process.',
    icon: faPuzzlePiece,
  },
  {
    title: 'Tech & Tool Reviews',
    description:
      'Honest, in-depth reviews of developer tools, software, hardware, and tech products.',
    icon: faStar,
  },
  {
    title: 'Speaking & Workshops',
    description:
      'Virtual or in-person talks about indie hacking, React Native, content creation, or tech careers.',
    icon: faMicrophone,
  },
];

const MediaKitPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      {/* Hero */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FontAwesomeIcon icon={faBriefcase} className="text-primary" />
            </div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Media Kit
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Stats & Partnerships
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            For brands and partners. Here&apos;s who I reach, my content themes,
            and how we can work together to create authentic, engaging content.
          </p>
        </div>
      </section>

      {/* Audience Snapshot */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Audience Snapshot
          </h2>

          {/* Key Metrics */}
          <KeyMetrics />

          {/* Demographics & Themes */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Age Demographics */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">
                Age Demographics
              </h3>
              <div className="space-y-3">
                {audienceData.demographics.map((demo) => (
                  <div key={demo.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {demo.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {demo.percentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Locations */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">
                Top Locations
              </h3>
              <div className="space-y-2">
                {audienceData.topLocations.map((location, index) => (
                  <div key={location} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{location}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Themes */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">
                Content Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {audienceData.contentThemes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Breakdown */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Platform Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-left text-sm font-semibold text-foreground">
                    Platform
                  </th>
                  <th className="pb-4 text-left text-sm font-semibold text-foreground">
                    Handle
                  </th>
                  <th className="pb-4 text-right text-sm font-semibold text-foreground">
                    Followers
                  </th>
                  <th className="pb-4 text-right text-sm font-semibold text-foreground">
                    Avg Views
                  </th>
                  <th className="pb-4 text-right text-sm font-semibold text-foreground">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody>
                {platformStats.map((stat) => (
                  <tr
                    key={stat.platform}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}
                        >
                          <FontAwesomeIcon icon={stat.icon} />
                        </div>
                        <span className="font-medium text-foreground">
                          {stat.platform}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {stat.handle}
                    </td>
                    <td className="py-4 text-right font-semibold text-foreground">
                      {stat.followers}
                    </td>
                    <td className="py-4 text-right text-muted-foreground">
                      {stat.avgViews}
                    </td>
                    <td className="py-4 text-right">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        {stat.engagement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Content Examples */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Content Examples
              </h2>
              <p className="mt-1 text-muted-foreground">
                A glimpse of what I create
              </p>
            </div>
            <Link
              href="/content"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all content
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured large card */}
            <div className="group relative md:col-span-2 lg:row-span-2 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                <img
                  src={contentExamples[0].thumbnail || '/placeholder.svg'}
                  alt={contentExamples[0].title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <FontAwesomeIcon icon={faYoutube} />
                    {contentExamples[0].platform}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {contentExamples[0].title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {contentExamples[0].stats}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="ml-1 text-xl text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller cards */}
            {contentExamples.slice(1).map((example) => {
              const platformIcon =
                example.platform === 'YouTube'
                  ? faYoutube
                  : example.platform === 'TikTok'
                    ? faTiktok
                    : faInstagram;
              return (
                <div
                  key={example.title}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={example.thumbnail || '/placeholder.svg'}
                      alt={example.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="ml-0.5 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        <FontAwesomeIcon
                          icon={platformIcon}
                          className="text-muted-foreground"
                        />
                        {example.platform}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {example.stats}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {example.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collaboration Formats */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Ways to Work Together
          </h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            I&apos;m selective about partnerships to ensure authenticity. Here
            are the collaboration formats that work best for my audience.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {collaborationFormats.map((format) => (
              <div
                key={format.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FontAwesomeIcon
                    icon={format.icon}
                    className="text-primary"
                  />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {format.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {format.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border bg-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mb-8 text-muted-foreground">
            Interested in a partnership? Get in touch to discuss how we can
            create authentic content that resonates with my audience.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="font-semibold">
              <a href="mailto:partnerships@ezeikel.dev">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about#contact">
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Contact Form
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MediaKitPage;
