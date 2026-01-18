'use client';

import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

type StatItem = {
  platform: string;
  icon: string;
  followers: string;
  followersNum: number;
  engagement: string;
  color: string;
};

const stats: StatItem[] = [
  {
    platform: 'Instagram',
    icon: 'fa-instagram',
    followers: '103K',
    followersNum: 103000,
    engagement: '5.2%',
    color: 'text-pink-500',
  },
  {
    platform: 'TikTok',
    icon: 'fa-tiktok',
    followers: '78K',
    followersNum: 78000,
    engagement: '8.1%',
    color: 'text-foreground',
  },
  {
    platform: 'YouTube',
    icon: 'fa-youtube',
    followers: '45K',
    followersNum: 45000,
    engagement: '4.8%',
    color: 'text-red-500',
  },
  {
    platform: 'X/Twitter',
    icon: 'fa-x-twitter',
    followers: '12K',
    followersNum: 12000,
    engagement: '3.2%',
    color: 'text-foreground',
  },
  {
    platform: 'LinkedIn',
    icon: 'fa-linkedin-in',
    followers: '8K',
    followersNum: 8000,
    engagement: '6.5%',
    color: 'text-blue-600',
  },
];

const AnimatedCounter = ({
  value,
  suffix = '',
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted =
          latest >= 1000
            ? `${Math.floor(latest / 1000)}K`
            : Math.floor(latest).toString();
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const StatsSnapshot = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border bg-secondary/30 py-16 md:py-24"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </motion.div>

      <motion.div style={{ scale }} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Creator Stats
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Building an engaged community across platforms, sharing dev content
            and indie hacking stories.
          </p>
        </motion.div>

        {/* Total Followers Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
          className="mb-12 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-card px-8 py-6 text-center"
          >
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
              Total Reach
            </p>
            <p className="text-5xl font-bold text-foreground md:text-6xl">
              <AnimatedCounter value={246} suffix="K+" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              followers across all platforms
            </p>
          </motion.div>
        </motion.div>

        {/* Platform Breakdown */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.platform}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-lg"
            >
              <motion.i
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 300,
                }}
                className={`fa-brands ${stat.icon} mb-3 text-2xl ${stat.color}`}
                aria-hidden="true"
              />
              <p className="mb-1 text-2xl font-bold text-foreground">
                {stat.followers}
              </p>
              <p className="mb-2 text-sm text-muted-foreground">
                {stat.platform}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-xs text-accent"
              >
                <i className="fa-solid fa-chart-line mr-1" aria-hidden="true" />
                {stat.engagement} engagement
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* For Brands CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link
              href="/media-kit"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <i className="fa-solid fa-briefcase" aria-hidden="true" />
              View full media kit for brands
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsSnapshot;
