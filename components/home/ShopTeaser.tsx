'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  {
    id: 'starter-kit',
    name: 'React Native Expo Starter Kit',
    description:
      'Production-ready boilerplate with auth, payments, and push notifications. Ship your app faster.',
    price: '$99',
    tag: 'Coming Soon',
    icon: 'fa-mobile-screen',
    featured: true,
  },
  {
    id: 'ship-guide',
    name: 'Ship Your First App',
    description:
      'Step-by-step guide from idea to App Store. Learn from real launches.',
    price: '$29',
    tag: 'PDF Guide',
    icon: 'fa-book',
    featured: false,
  },
];

const tipOptions = [
  { label: 'Coffee', amount: '$5', icon: 'fa-mug-hot' },
  { label: 'Lunch', amount: '$15', icon: 'fa-utensils' },
  { label: 'Dinner', amount: '$30', icon: 'fa-champagne-glasses' },
];

const ShopTeaser = () => {
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

  return (
    <section ref={sectionRef} className="border-t border-border py-16 md:py-24">
      <motion.div style={{ opacity }} className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Resources & Support
            </h2>
            <p className="text-muted-foreground">
              Tools, guides, and ways to support my work.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary"
          >
            <Link href="/shop">
              Browse all
              <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Featured Products - 2 columns */}
          <div className="space-y-4 lg:col-span-2">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href="/shop"
                className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <i
                    className={`fa-solid ${product.icon} text-xl text-foreground`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {product.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="text-lg font-bold text-foreground sm:text-xl">
                  {product.price}
                </div>
              </Link>
            ))}
          </div>

          {/* Tip Jar */}
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <i
                  className="fa-solid fa-heart text-foreground"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Support My Work
                </h3>
                <p className="text-xs text-muted-foreground">Buy me a coffee</p>
              </div>
            </div>

            <div className="mb-4 space-y-2">
              {tipOptions.map((tip) => (
                <button
                  key={tip.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all hover:border-primary hover:bg-secondary/50"
                >
                  <span className="flex items-center gap-2">
                    <i
                      className={`fa-solid ${tip.icon} text-muted-foreground`}
                      aria-hidden="true"
                    />
                    <span className="text-foreground">{tip.label}</span>
                  </span>
                  <span className="font-medium text-foreground">
                    {tip.amount}
                  </span>
                </button>
              ))}
            </div>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/shop#support">
                Custom amount
                <i
                  className="fa-solid fa-arrow-right ml-2"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ShopTeaser;
