'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
};

const milestones: Milestone[] = [
  {
    year: '2015',
    title: 'Started Coding',
    description:
      'Discovered my passion for building things with code. First lines of JavaScript.',
    icon: 'fa-code',
  },
  {
    year: '2017',
    title: 'First Dev Role',
    description: 'Landed my first professional software engineering position.',
    icon: 'fa-briefcase',
  },
  {
    year: '2019',
    title: 'Went Full-Stack',
    description: 'Expanded into backend, databases, and cloud infrastructure.',
    icon: 'fa-layer-group',
  },
  {
    year: '2021',
    title: 'Senior Engineer',
    description:
      'Promoted to Senior Software Engineer. Leading projects and mentoring juniors.',
    icon: 'fa-arrow-up',
    highlight: true,
  },
  {
    year: '2022',
    title: 'Started Creating',
    description: 'Began sharing my journey on social media. First viral video.',
    icon: 'fa-video',
  },
  {
    year: '2023',
    title: 'Launched Chunky Crayon',
    description:
      'Shipped my first indie app. A colouring app designed for kids.',
    icon: 'fa-rocket',
    highlight: true,
  },
  {
    year: '2024',
    title: '100K Followers',
    description: 'Hit 100,000 followers across platforms. Community growing.',
    icon: 'fa-users',
    highlight: true,
  },
  {
    year: '2025',
    title: 'Parking Ticket Pal',
    description:
      'Launched my second app. Helping people fight unfair parking tickets.',
    icon: 'fa-car',
    highlight: true,
  },
];

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal movement - use pixels for more control
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(milestones.length - 1) * 400],
  );

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-secondary/30">
        {/* Header */}
        <div className="shrink-0 px-6 pt-16 pb-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-sm font-medium text-primary">
              The Timeline
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              My Journey
            </h2>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="h-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  style={{ width: progressWidth }}
                  className="h-full bg-primary"
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{milestones[0].year}</span>
                <span>{milestones[milestones.length - 1].year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll area */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-8 px-6"
          >
            {/* Initial spacer */}
            <div className="shrink-0 w-[calc(50vw-200px)]" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0.4, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.3 }}
                className="shrink-0"
              >
                <div
                  className={`relative w-[350px] rounded-2xl border p-6 md:p-8 ${
                    milestone.highlight
                      ? 'border-primary/30 bg-card shadow-lg'
                      : 'border-border/60 bg-card'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      milestone.highlight
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <i
                      className={`fa-solid ${milestone.icon} text-lg`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Year */}
                  <p className="mb-1 text-sm font-semibold text-primary">
                    {milestone.year}
                  </p>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Index indicator */}
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* End spacer */}
            <div className="shrink-0 w-[calc(50vw-200px)]" />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="shrink-0 pb-8 text-center"
        >
          <p className="mb-2 text-xs text-muted-foreground">
            Scroll to explore
          </p>
          <i
            className="fa-solid fa-chevron-down text-muted-foreground"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default JourneySection;
