'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/pro-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@/components/ui/button';

const technologies = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS 4',
  'Three.js',
  'Framer Motion',
  'Sanity CMS',
  'Stripe',
  'Cal.com',
  'Resend',
  'React Email',
  'TanStack Form',
  'Zod',
  'PostHog',
  'Sentry',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const ThisWebsiteShowcase = () => (
  <section className="border-b border-border bg-gradient-to-br from-primary/5 via-transparent to-secondary/30 py-12 md:py-16">
    <div className="mx-auto max-w-6xl px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FontAwesomeIcon icon={faCode} className="text-lg text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">This Website</h2>
          <p className="text-sm text-muted-foreground">
            The site you&apos;re currently browsing
          </p>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-sm"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Left - Title & Description */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-xl font-semibold text-foreground">
                ezeikel.com
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Personal portfolio featuring a blog, 3D interactive globe,
              newsletter integration, scheduling, payment processing, and social
              media integration.
            </p>
          </div>

          {/* Right - CTA */}
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <a
              href="https://github.com/ezeikel/ezeikel-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="mr-2" />
              View Source
            </a>
          </Button>
        </div>

        {/* Tech Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {technologies.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ThisWebsiteShowcase;
