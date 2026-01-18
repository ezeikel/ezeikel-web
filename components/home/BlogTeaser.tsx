'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  href: string;
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How I Built and Launched Chunky Crayon in 3 Months',
    excerpt:
      'The complete story of building a kids colouring app as a solo developer, from idea to App Store.',
    category: 'Case Study',
    readTime: '8 min read',
    date: 'Jan 10, 2026',
    href: '/blog/chunky-crayon-launch',
  },
  {
    id: '2',
    title: 'My Tech Stack for Indie Apps in 2026',
    excerpt:
      'Why I chose React Native, Expo, TypeScript, and Postgres for my indie projects.',
    category: 'Dev Log',
    readTime: '5 min read',
    date: 'Jan 5, 2026',
    href: '/blog/tech-stack-2026',
  },
  {
    id: '3',
    title: 'Growing to 100K Followers as a Dev Creator',
    excerpt:
      'Lessons learned from building an audience while shipping products as an indie hacker.',
    category: 'Creator Life',
    readTime: '6 min read',
    date: 'Dec 28, 2025',
    href: '/blog/100k-followers',
  },
];

const categoryIcons: Record<string, string> = {
  'Case Study': 'fa-folder-open',
  'Dev Log': 'fa-code',
  'Creator Life': 'fa-lightbulb',
  Product: 'fa-cube',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const BlogTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              From the Blog
            </h2>
            <p className="text-muted-foreground">
              Thoughts on building products, coding, and the creator life.
            </p>
          </div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:text-primary"
            >
              <Link href="/blog">
                View all articles
                <i
                  className="fa-solid fa-arrow-right ml-2"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              custom={index}
              style={{ y: index === 1 ? y : 0 }} // Middle card parallax
            >
              <Link
                href={post.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <i
                        className={`fa-solid ${categoryIcons[post.category] || 'fa-file-alt'} text-muted-foreground`}
                        aria-hidden="true"
                      />
                      {post.category}
                    </motion.span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="mb-4 flex-grow text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Read more{' '}
                      <i
                        className="fa-solid fa-arrow-right ml-1"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTeaser;
