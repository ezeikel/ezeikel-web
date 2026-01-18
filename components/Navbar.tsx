'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Primary nav items - always visible on desktop
const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/things-ive-built', label: "Things I've Built" },
  { href: '/content', label: 'Content' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
  { href: '/hire-me', label: 'Hire Me' },
];

// Secondary nav items - inside "More" dropdown
const moreLinks = [
  { href: '/library', label: 'Library' },
  { href: '/photography', label: 'Photography' },
  { href: '/uses', label: 'Uses' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/media-kit', label: 'Media Kit' },
];

// All links for mobile menu
const allLinks = [...primaryLinks, ...moreLinks];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  // Check if current page is in "More" section
  const isMoreActive = moreLinks.some((link) => pathname === link.href);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMoreOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          ezeikel.com
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            </li>
          ))}

          {/* More Dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                'relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary',
                isMoreActive ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              More
              <i
                className={cn(
                  'fa-solid fa-chevron-down text-[10px] transition-transform duration-200',
                  moreOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
              {isMoreActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-border/60 bg-card p-2 shadow-lg"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
                        pathname === link.href
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          <i
            className={cn('fa-solid', isOpen ? 'fa-xmark' : 'fa-bars')}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block py-3 text-sm font-medium transition-colors hover:text-primary',
                      pathname === link.href
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
