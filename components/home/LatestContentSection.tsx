'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { Button } from '@/components/ui/button';

type ContentItem = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  href: string;
  description: string;
};

const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Building a React Native App from Scratch',
    thumbnail: '/coding-tutorial-thumbnail-dark-theme.jpg',
    duration: '15:32',
    views: '24K',
    href: '#',
    description:
      'Complete walkthrough of setting up and building your first React Native app with Expo.',
  },
  {
    id: '2',
    title: 'Full Expo Router Tutorial for Beginners',
    thumbnail: '/developer-lifestyle-content-thumbnail.jpg',
    duration: '28:45',
    views: '56K',
    href: '#',
    description: 'Learn file-based routing in Expo from zero to deployment.',
  },
  {
    id: '3',
    title: 'How I Built Chunky Crayon in 30 Days',
    thumbnail: '/desk-setup-gaming-developer-aesthetic.jpg',
    duration: '42:10',
    views: '89K',
    href: '#',
    description:
      'The full story behind building and launching my kids colouring app.',
  },
  {
    id: '4',
    title: 'How I Built Parking Ticket Pal',
    thumbnail: '/app-development-case-study-thumbnail.jpg',
    duration: '22:10',
    views: '18K',
    href: '#',
    description:
      'From idea to App Store - building a ticket management app with AI.',
  },
  {
    id: '5',
    title: 'TypeScript Tips That Changed My Code',
    thumbnail: '/coding-tutorial-thumbnail-dark-theme.jpg',
    duration: '18:24',
    views: '34K',
    href: '#',
    description: 'Advanced TypeScript patterns I use in every project.',
  },
];

const LatestContentSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? contentItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === contentItems.length - 1 ? 0 : prev + 1));
  };

  const getVisibleVideos = () => {
    const videos = [];
    for (let i = -2; i <= 2; i++) {
      const index =
        (activeIndex + i + contentItems.length) % contentItems.length;
      videos.push({ ...contentItems[index], position: i });
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
            Long Form
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Full tutorials, build logs, and in-depth coding sessions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:border-primary"
            aria-label="Previous video"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background hover:border-primary"
            aria-label="Next video"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </motion.button>

          {/* Video Cards */}
          <div className="relative flex h-[320px] md:h-[380px] items-center justify-center px-16">
            <AnimatePresence mode="popLayout">
              {getVisibleVideos().map((video) => {
                const isCenter = video.position === 0;
                const absPosition = Math.abs(video.position);

                const xOffset =
                  video.position * (isCenter ? 0 : 280 + absPosition * 40);
                const scale = isCenter
                  ? 1
                  : Math.max(0.75 - absPosition * 0.1, 0.55);
                const zIndex = 10 - absPosition;
                const itemOpacity = isCenter
                  ? 1
                  : Math.max(0.6 - absPosition * 0.2, 0.3);

                return (
                  <motion.div
                    key={`${video.id}-${video.position}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      x: xOffset,
                      scale,
                      opacity: itemOpacity,
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
                        contentItems.findIndex((v) => v.id === video.id),
                      )
                    }
                    className={`absolute cursor-pointer ${!isCenter ? 'pointer-events-auto' : ''}`}
                    style={{ zIndex }}
                  >
                    <motion.a
                      href={isCenter ? video.href : undefined}
                      whileHover={isCenter ? { y: -8 } : { scale: 1.05 }}
                      className={`group block overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all ${
                        isCenter
                          ? 'w-[480px] md:w-[560px]'
                          : 'w-[320px] md:w-[380px]'
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${isCenter ? 'aspect-video' : 'aspect-video'}`}
                      >
                        <img
                          src={video.thumbnail || '/placeholder.svg'}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* YouTube Badge */}
                        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                          <i
                            className="fa-brands fa-youtube"
                            aria-hidden="true"
                          />
                          YouTube
                        </div>
                        {/* Duration */}
                        <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                          {video.duration}
                        </div>
                        {/* Play overlay */}
                        {isCenter && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                              <i
                                className="fa-solid fa-play ml-1 text-xl text-foreground"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {isCenter && (
                        <div className="p-5">
                          <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>
                          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {video.views} views
                          </p>
                        </div>
                      )}
                    </motion.a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline">
              <Link
                href="https://youtube.com/@yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-youtube mr-2 text-red-500"
                  aria-hidden="true"
                />
                Subscribe on YouTube
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LatestContentSection;
