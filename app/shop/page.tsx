'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faRocket,
  faBook,
  faCode,
  faComments,
  faMugHot,
  faBurger,
  faUtensils,
  faCheckCircle,
  faTimes,
  faInfoCircle,
  faCheck,
  faArrowRight,
  faHeart,
  faSpinnerThird,
} from '@fortawesome/pro-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'boilerplate' | 'guide' | 'consultation' | 'support';
  icon: IconDefinition;
  featured?: boolean;
  comingSoon?: boolean;
  features?: string[];
  href?: string;
};

// Products with prices in GBP
const products: Product[] = [
  {
    id: 'ez-stack',
    name: 'EZ Stack',
    description:
      'Ship web and mobile apps from one codebase. Turborepo monorepo with Next.js, Expo, auth, payments, database, and more.',
    price: 149, // GBP
    originalPrice: 199,
    category: 'boilerplate',
    icon: faRocket,
    featured: true,
    comingSoon: true,
    features: [
      'Next.js 16 + Expo SDK 54 monorepo',
      'Turborepo with pnpm workspaces',
      'Auth (Google, Apple, Facebook, Magic Link)',
      'Stripe (web) + RevenueCat (mobile) payments',
      'Prisma + Neon PostgreSQL',
      'Tailwind CSS 4 + NativeWind',
      'shadcn/ui components',
      'Sanity CMS + Blog',
      'PostHog analytics + Sentry',
      'React Email + Resend',
      'EAS Build configuration',
      'Cal.com scheduling',
      'Lifetime updates',
    ],
  },
  {
    id: 'ship-your-app-guide',
    name: 'Ship Your First App',
    description:
      'A comprehensive guide on going from idea to the App Store. Everything I learned shipping Chunky Crayon and Parking Ticket Pal.',
    price: 25, // GBP
    category: 'guide',
    icon: faBook,
    comingSoon: true,
    features: [
      '40+ page PDF guide',
      'App Store Optimization tips',
      'Marketing on a budget',
      'Common pitfalls to avoid',
    ],
  },
  {
    id: 'code-review',
    name: '1:1 Code Review',
    description:
      "60-minute live code review session. I'll review your React or React Native app, provide feedback, and answer questions.",
    price: 120, // GBP
    category: 'consultation',
    icon: faCode,
    features: [
      '60-minute video call',
      'Architecture review',
      'Performance tips',
      'Recording provided',
    ],
  },
  {
    id: 'career-chat',
    name: 'Career Chat',
    description:
      '30-minute call to discuss your dev career, transitioning to indie hacking, or building in public.',
    price: 60, // GBP
    category: 'consultation',
    icon: faComments,
    features: [
      '30-minute video call',
      'Career advice',
      'Indie hacker insights',
      'Follow-up email',
    ],
  },
];

type SupportTier = {
  id: string;
  name: string;
  price: number;
  icon: IconDefinition;
  description: string;
};

// Support tiers with prices in GBP
const supportTiers: SupportTier[] = [
  {
    id: 'coffee',
    name: 'Buy me a coffee',
    price: 4, // GBP
    icon: faMugHot,
    description: 'A small thank you',
  },
  {
    id: 'lunch',
    name: 'Buy me lunch',
    price: 12, // GBP
    icon: faBurger,
    description: 'Really appreciate it',
  },
  {
    id: 'dinner',
    name: 'Buy me dinner',
    price: 25, // GBP
    icon: faUtensils,
    description: "You're amazing",
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'boilerplate', label: 'Boilerplates' },
  { id: 'guide', label: 'Guides' },
  { id: 'consultation', label: 'Consultations' },
];

// Component to handle search params (must be wrapped in Suspense)
const CheckoutStatus = ({
  onSuccess,
  onCanceled,
}: {
  onSuccess: () => void;
  onCanceled: () => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      onSuccess();
      window.history.replaceState({}, '', '/shop');
    }
    if (searchParams.get('canceled') === 'true') {
      onCanceled();
      window.history.replaceState({}, '', '/shop');
    }
  }, [searchParams, onSuccess, onCanceled]);

  return null;
};

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSupport, setSelectedSupport] = useState('coffee');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCanceled, setShowCanceled] = useState(false);

  const handleCheckout = async (productId: string) => {
    setIsLoading(productId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleSupportCheckout = async () => {
    const amount = customAmount
      ? Number(customAmount)
      : supportTiers.find((t) => t.id === selectedSupport)?.price;
    if (!amount || amount < 1) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading('support');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: customAmount ? undefined : `support-${selectedSupport}`,
          customAmount: customAmount || undefined,
        }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      activeCategory === 'all' || product.category === activeCategory,
  );

  const featuredProduct = products.find((p) => p.featured);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Handle checkout redirect status */}
      <Suspense fallback={null}>
        <CheckoutStatus
          onSuccess={() => setShowSuccess(true)}
          onCanceled={() => setShowCanceled(true)}
        />
      </Suspense>
      <main>
        {/* Success Message */}
        {showSuccess && (
          <div className="border-b border-green-200 bg-green-50 px-6 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-600"
                />
                <p className="text-green-800">
                  <span className="font-semibold">
                    Thank you for your purchase!
                  </span>{' '}
                  Check your email for confirmation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="text-green-600 hover:text-green-800"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}

        {/* Canceled Message */}
        {showCanceled && (
          <div className="border-b border-amber-200 bg-amber-50 px-6 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-amber-600"
                />
                <p className="text-amber-800">
                  Checkout was canceled. No charge was made.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCanceled(false)}
                className="text-amber-600 hover:text-amber-800"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-medium text-primary">Shop</p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Tools & Resources
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Templates, guides, and consultations to help you ship faster and
                grow as a developer. Everything I wish I had when starting out.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Product */}
        {featuredProduct && (
          <section className="border-b border-border bg-secondary/30 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Featured
                    </span>
                    {featuredProduct.comingSoon && (
                      <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h2 className="mb-3 text-3xl font-bold text-foreground">
                    {featuredProduct.name}
                  </h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    {featuredProduct.description}
                  </p>

                  {featuredProduct.features && (
                    <ul className="mb-8 grid gap-2 sm:grid-cols-2">
                      {featuredProduct.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-primary"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        £{featuredProduct.price}
                      </span>
                      {featuredProduct.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          £{featuredProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      disabled={
                        featuredProduct.comingSoon ||
                        isLoading === featuredProduct.id
                      }
                      size="lg"
                      onClick={() =>
                        !featuredProduct.comingSoon &&
                        handleCheckout(featuredProduct.id)
                      }
                    >
                      {isLoading === featuredProduct.id ? (
                        <>
                          <FontAwesomeIcon
                            icon={faSpinnerThird}
                            className="mr-2 animate-spin"
                          />
                          Processing...
                        </>
                      ) : featuredProduct.comingSoon ? (
                        'Join Waitlist'
                      ) : (
                        <>
                          Buy Now
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ml-2"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-12">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                      <FontAwesomeIcon
                        icon={featuredProduct.icon}
                        className="text-4xl text-primary"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Preview coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    activeCategory === category.id
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Products */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts
                .filter((p) => !p.featured)
                .map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                        <FontAwesomeIcon
                          icon={product.icon}
                          className="text-lg text-foreground"
                        />
                      </div>
                      {product.comingSoon && (
                        <span className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          Soon
                        </span>
                      )}
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>

                    {product.features && (
                      <ul className="mb-4 space-y-1">
                        {product.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-primary"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="text-2xl font-bold text-foreground">
                        £{product.price}
                      </span>
                      <Button
                        variant="outline"
                        disabled={
                          product.comingSoon || isLoading === product.id
                        }
                        className="bg-transparent"
                        onClick={() =>
                          !product.comingSoon && handleCheckout(product.id)
                        }
                      >
                        {isLoading === product.id ? (
                          <FontAwesomeIcon
                            icon={faSpinnerThird}
                            className="animate-spin"
                          />
                        ) : product.comingSoon ? (
                          'Notify Me'
                        ) : product.category === 'consultation' ? (
                          'Book'
                        ) : (
                          'Buy'
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-2xl text-primary"
              />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Support My Work
            </h2>
            <p className="mb-8 text-muted-foreground">
              If you enjoy my content or found my projects helpful, consider
              supporting me. Every bit helps me keep creating and building in
              public.
            </p>

            {/* Support Tiers */}
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              {supportTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedSupport(tier.id)}
                  className={cn(
                    'flex flex-col items-center rounded-2xl border-2 px-6 py-4 transition-all',
                    selectedSupport === tier.id
                      ? 'border-primary bg-card shadow-sm'
                      : 'border-border/60 bg-card hover:border-border',
                  )}
                >
                  <FontAwesomeIcon
                    icon={tier.icon}
                    className={cn(
                      'mb-2 text-2xl',
                      selectedSupport === tier.id
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  />
                  <span className="mb-1 text-sm font-medium text-foreground">
                    {tier.name}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    £{tier.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                Or enter a custom amount:
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="10"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-24 rounded-lg border border-border bg-card py-2 pl-7 pr-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleSupportCheckout}
              disabled={isLoading === 'support'}
            >
              {isLoading === 'support' ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinnerThird}
                    className="mr-2 animate-spin"
                  />
                  Processing...
                </>
              ) : (
                <>
                  Support with £
                  {customAmount ||
                    supportTiers.find((t) => t.id === selectedSupport)?.price}
                  <FontAwesomeIcon icon={faHeart} className="ml-2" />
                </>
              )}
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              Payments securely processed via Stripe
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What payment methods do you accept?',
                  a: 'All payments are processed securely through Stripe. You can pay with any major credit card, Apple Pay, or Google Pay.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: "Yes, I offer a 14-day money-back guarantee on all digital products. If you're not satisfied, just reach out.",
                },
                {
                  q: 'How do consultations work?',
                  a: "After booking, you'll receive a calendar link to schedule your session. We'll meet via Google Meet or Zoom at your chosen time.",
                },
                {
                  q: 'Do boilerplates include updates?',
                  a: 'Yes, all boilerplates include lifetime updates. When I improve them, you get the latest version for free.',
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border/60 bg-card p-6"
                >
                  <h3 className="mb-2 font-semibold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Have a custom request?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Need something specific? Let&apos;s chat about custom
              boilerplates, consulting packages, or collaborations.
            </p>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="mailto:hello@ezeikel.com">
                Get in Touch
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
