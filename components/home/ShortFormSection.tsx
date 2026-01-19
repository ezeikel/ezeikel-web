'use client';

import { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faVolumeXmark,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ShortVideo = {
  id: string;
  title: string;
  platform: 'TikTok' | 'YouTube Shorts' | 'Reels';
  thumbnail: string;
  handle: string;
  views: string;
  href: string;
};

const shortVideos: ShortVideo[] = [
  {
    id: '1',
    title: 'POV: You finally fix the bug at 2am',
    platform: 'TikTok',
    thumbnail: '/developer-coding-at-night-dark-room-screen-glow.jpg',
    handle: '@jakebuilds',
    views: '245K',
    href: '#',
  },
  {
    id: '2',
    title: 'Building an app in public Day 1',
    platform: 'YouTube Shorts',
    thumbnail: '/software-developer-working-on-laptop-macbook-codin.jpg',
    handle: '@jakebuilds',
    views: '89K',
    href: '#',
  },
  {
    id: '3',
    title: 'React Native tip you NEED to know',
    platform: 'Reels',
    thumbnail: '/mobile-app-development-react-native-code-on-screen.jpg',
    handle: '@jakebuilds',
    views: '512K',
    href: '#',
  },
  {
    id: '4',
    title: 'My honest income as an indie dev',
    platform: 'TikTok',
    thumbnail: '/indie-developer-entrepreneur-lifestyle-laptop-coff.jpg',
    handle: '@jakebuilds',
    views: '1.2M',
    href: '#',
  },
  {
    id: '5',
    title: 'How I got 100K downloads',
    platform: 'YouTube Shorts',
    thumbnail: '/app-store-success-celebration-developer-happy.jpg',
    handle: '@jakebuilds',
    views: '678K',
    href: '#',
  },
  {
    id: '6',
    title: 'Coding setup tour 2024',
    platform: 'Reels',
    thumbnail: '/developer-desk-setup-multiple-monitors-aesthetic.jpg',
    handle: '@jakebuilds',
    views: '324K',
    href: '#',
  },
  {
    id: '7',
    title: 'Day in the life of a UK dev',
    platform: 'TikTok',
    thumbnail: '/young-developer-urban-london-city-lifestyle.jpg',
    handle: '@jakebuilds',
    views: '892K',
    href: '#',
  },
];

const platformIcons: Record<string, IconDefinition> = {
  TikTok: faTiktok,
  'YouTube Shorts': faYoutube,
  Reels: faInstagram,
};

const platformColors = {
  TikTok: 'bg-foreground text-background',
  'YouTube Shorts': 'bg-red-500 text-white',
  Reels:
    'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white',
};

const ShortFormSection = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5],
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? shortVideos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === shortVideos.length - 1 ? 0 : prev + 1));
  };

  const getVisibleVideos = () => {
    const videos = [];
    for (let i = -3; i <= 3; i++) {
      const index = (activeIndex + i + shortVideos.length) % shortVideos.length;
      videos.push({ ...shortVideos[index], position: i });
    }
    return videos;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24"
    >
      <motion.div style={{ opacity }} className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quick Bits
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Dev tips, app updates, and behind-the-scenes moments in 60 seconds
            or less.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div style={{ y }} className="relative h-[480px] md:h-[560px]">
          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:border-primary"
            aria-label="Previous video"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:border-primary"
            aria-label="Next video"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </motion.button>

          {/* Video Cards Fan Layout */}
          <div className="relative flex h-full items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleVideos().map((video) => {
                const isCenter = video.position === 0;
                const absPosition = Math.abs(video.position);

                // Calculate transforms for fan effect
                const xOffset =
                  video.position * (isCenter ? 0 : 85 + absPosition * 15);
                const scale = isCenter
                  ? 1
                  : Math.max(0.65 - absPosition * 0.08, 0.5);
                const rotation = video.position * 3;
                const zIndex = 10 - absPosition;
                const opacity = isCenter
                  ? 1
                  : Math.max(0.7 - absPosition * 0.15, 0.3);
                const yOffset = isCenter ? 0 : 20 + absPosition * 15;

                return (
                  <motion.div
                    key={`${video.id}-${video.position}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      scale,
                      rotate: rotation,
                      opacity,
                      zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() =>
                      !isCenter &&
                      setActiveIndex(
                        shortVideos.findIndex((v) => v.id === video.id),
                      )
                    }
                    className={`absolute cursor-pointer ${!isCenter ? 'pointer-events-auto' : ''}`}
                    style={{ zIndex }}
                  >
                    <motion.div
                      whileHover={isCenter ? { y: -8 } : { scale: 1.05 }}
                      className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                        isCenter
                          ? 'h-[400px] w-[225px] md:h-[480px] md:w-[270px]'
                          : 'h-[320px] w-[180px] md:h-[380px] md:w-[214px]'
                      }`}
                      style={{
                        boxShadow: isCenter
                          ? '0 25px 50px -12px rgba(0,0,0,0.25)'
                          : '0 10px 25px -5px rgba(0,0,0,0.15)',
                      }}
                    >
                      {/* Video Thumbnail */}
                      <img
                        src={video.thumbnail || '/placeholder.svg'}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Platform Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${platformColors[video.platform]}`}
                      >
                        <FontAwesomeIcon
                          icon={platformIcons[video.platform]}
                          className="text-sm"
                        />
                      </motion.div>

                      {/* Play Button (center card only) */}
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm"
                          >
                            <FontAwesomeIcon
                              icon={faPlay}
                              className="ml-1 text-lg text-foreground"
                            />
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p
                          className={`mb-1 font-semibold leading-tight text-white ${isCenter ? 'text-base' : 'text-sm'}`}
                        >
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2 text-white/80">
                          <span className={isCenter ? 'text-sm' : 'text-xs'}>
                            {video.handle}
                          </span>
                          <span className="text-white/50">·</span>
                          <span className={isCenter ? 'text-sm' : 'text-xs'}>
                            {video.views} views
                          </span>
                        </div>
                      </div>

                      {/* Sound Icon (center card only) */}
                      {isCenter && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="absolute right-3 top-14 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                          aria-label="Toggle sound"
                        >
                          <FontAwesomeIcon
                            icon={faVolumeXmark}
                            className="text-xs"
                          />
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            Follow along on your favourite platform
          </p>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="sm">
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTiktok} className="mr-2" />
                  TikTok
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="sm">
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                  YouTube
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="sm">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                  Instagram
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ShortFormSection;
