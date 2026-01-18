'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon?: string;
  featured?: boolean;
};

// Placeholder data - replace with your data source
const links: LinkItem[] = [
  {
    id: '1',
    title: 'Latest YouTube Video',
    url: 'https://youtube.com/@yourusername',
    icon: 'fa-youtube',
    featured: true,
  },
  {
    id: '2',
    title: 'Follow me on TikTok',
    url: 'https://tiktok.com/@yourusername',
    icon: 'fa-tiktok',
  },
  {
    id: '3',
    title: 'Connect on LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'fa-linkedin',
  },
  {
    id: '4',
    title: 'Check out my GitHub',
    url: 'https://github.com/yourusername',
    icon: 'fa-github',
  },
  {
    id: '5',
    title: 'Download Chunky Crayon',
    url: 'https://apps.apple.com/app/chunky-crayon',
    icon: 'fa-mobile-screen',
  },
  {
    id: '6',
    title: 'Download Parking Ticket Pal',
    url: 'https://apps.apple.com/app/parking-ticket-pal',
    icon: 'fa-car',
  },
  {
    id: '7',
    title: 'Book me for Speaking',
    url: '/speaking',
    icon: 'fa-microphone',
  },
  {
    id: '8',
    title: 'Hire Me',
    url: '/hire-me',
    icon: 'fa-briefcase',
  },
];

const socialLinks = [
  {
    icon: 'fa-twitter',
    url: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
  {
    icon: 'fa-instagram',
    url: 'https://instagram.com/yourusername',
    label: 'Instagram',
  },
  {
    icon: 'fa-youtube',
    url: 'https://youtube.com/@yourusername',
    label: 'YouTube',
  },
  {
    icon: 'fa-tiktok',
    url: 'https://tiktok.com/@yourusername',
    label: 'TikTok',
  },
  {
    icon: 'fa-github',
    url: 'https://github.com/yourusername',
    label: 'GitHub',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const LinksPage = () => (
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-lg px-6 py-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        {/* Avatar */}
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-secondary">
          <Image
            src="/avatar-placeholder.jpg"
            alt="Ezeikel"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name & Bio */}
        <h1 className="mb-1 text-xl font-bold text-foreground">Ezeikel</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Software Engineer & Content Creator
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label={social.label}
            >
              <i
                className={`fa-brands ${social.icon} text-sm`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {links.map((link) => {
          const isExternal = link.url.startsWith('http');
          const LinkComponent = isExternal ? 'a' : Link;
          const linkProps = isExternal
            ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
            : { href: link.url };

          return (
            <motion.div key={link.id} variants={itemVariants}>
              <LinkComponent
                {...linkProps}
                className={`group flex w-full items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                  link.featured
                    ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {link.icon && (
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      link.featured
                        ? 'bg-primary-foreground/20'
                        : 'bg-secondary'
                    }`}
                  >
                    <i
                      className={`${link.icon.startsWith('fa-') && !link.icon.includes('fa-brands') ? 'fa-solid' : 'fa-brands'} ${link.icon} ${
                        link.featured
                          ? 'text-primary-foreground'
                          : 'text-foreground'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                )}
                <span
                  className={`flex-1 font-medium ${
                    link.featured
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {link.title}
                </span>
                <i
                  className={`fa-solid fa-arrow-right text-sm transition-transform group-hover:translate-x-1 ${
                    link.featured
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                  aria-hidden="true"
                />
              </LinkComponent>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <i className="fa-solid fa-globe" aria-hidden="true" />
          ezeikel.com
        </Link>
      </motion.div>
    </div>
  </div>
);

export default LinksPage;
