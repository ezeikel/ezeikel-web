import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faInstagram,
  faTiktok,
  faYoutube,
  faXTwitter,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const socialLinks: { href: string; icon: IconDefinition; label: string }[] = [
  {
    href: 'https://instagram.com/ezeikel.dev',
    icon: faInstagram,
    label: 'Instagram',
  },
  {
    href: 'https://tiktok.com/@ezeikel.dev',
    icon: faTiktok,
    label: 'TikTok',
  },
  {
    href: 'https://youtube.com/@ezeikel',
    icon: faYoutube,
    label: 'YouTube',
  },
  {
    href: 'https://twitter.com/ezeikel',
    icon: faXTwitter,
    label: 'X/Twitter',
  },
  {
    href: 'https://linkedin.com/in/ezeikel',
    icon: faLinkedinIn,
    label: 'LinkedIn',
  },
  { href: 'https://github.com/ezeikel', icon: faGithub, label: 'GitHub' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/things-ive-built', label: "Things I've Built" },
  { href: '/content', label: 'Content' },
  { href: '/blog', label: 'Blog' },
  { href: '/library', label: 'Library' },
  { href: '/photography', label: 'Photography' },
  { href: '/uses', label: 'Uses' },
  { href: '/shop', label: 'Shop' },
  { href: '/hire-me', label: 'Hire Me' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/media-kit', label: 'Media Kit' },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground"
          >
            ezeikel.com
          </Link>
          <p className="text-sm text-muted-foreground">
            UK-based software engineer, indie app founder, and content creator.
            Building apps and sharing the journey.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Connect</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ezeikel Pemberton. All rights
          reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Made with <span className="text-red-600">♡</span> in{' '}
          <span className="font-semibold text-foreground">South London</span>.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
