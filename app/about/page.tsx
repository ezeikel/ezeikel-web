'use client';

import type React from 'react';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBrain,
  faBriefcase,
  faBuilding,
  faCamera,
  faCheckCircle,
  faCode,
  faDatabase,
  faEnvelope,
  faFlag,
  faHelicopter,
  faLayerGroup,
  faMobileScreen,
  faPalette,
  faPaperPlane,
  faPlane,
  faRocket,
  faSpinnerThird,
  faUsers,
  faVideo,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faReact,
  faShopify,
  faStripe,
  faTiktok,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const InteractiveGlobe = dynamic(
  () => import('@/components/InteractiveGlobe'),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-[300px] items-center justify-center sm:h-[350px] md:h-[450px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-32 w-32 animate-pulse rounded-full bg-secondary/50 sm:h-40 sm:w-40 md:h-48 md:w-48" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faSpinnerThird} spin />
            Loading globe...
          </div>
        </div>
      </div>
    ),
  },
);

const skills: { name: string; icon: IconDefinition; color: string }[] = [
  { name: 'React', icon: faReact, color: 'text-cyan-500' },
  { name: 'React Native', icon: faMobileScreen, color: 'text-blue-500' },
  { name: 'Expo', icon: faLayerGroup, color: 'text-foreground' },
  { name: 'TypeScript', icon: faCode, color: 'text-blue-600' },
  { name: 'Postgres', icon: faDatabase, color: 'text-blue-700' },
  { name: 'Shopify', icon: faShopify, color: 'text-green-500' },
  { name: 'Stripe', icon: faStripe, color: 'text-purple-500' },
  { name: 'AI/ML', icon: faBrain, color: 'text-pink-500' },
];

const timeline: {
  year: string;
  title: string;
  description: string;
  icon: IconDefinition;
}[] = [
  {
    year: '2026',
    title: 'Scaling indie apps',
    description:
      'Growing Chunky Crayon and Parking Ticket Pal while building new products and expanding content reach.',
    icon: faRocket,
  },
  {
    year: '2025',
    title: '100K+ followers milestone',
    description:
      'Crossed 100K followers across platforms while launching Parking Ticket Pal and growing Chunky Crayon.',
    icon: faUsers,
  },
  {
    year: '2024',
    title: 'Launched Chunky Crayon',
    description:
      "Built and shipped my first successful indie app, featured in the App Store's Apps We Love.",
    icon: faPalette,
  },
  {
    year: '2023',
    title: 'Started content creation',
    description:
      'Began documenting my journey as a developer on TikTok and YouTube, building an audience.',
    icon: faVideo,
  },
  {
    year: '2020',
    title: 'Went full-time indie',
    description:
      'Left my full-time job to focus on building my own products and pursuing indie hacking.',
    icon: faFlag,
  },
  {
    year: '2018',
    title: 'Senior Engineer at tech startup',
    description:
      'Led frontend development at a London tech startup, working with React and React Native.',
    icon: faBriefcase,
  },
];

const currentlyBuilding = [
  {
    title: 'Chunky Crayon v2',
    description:
      'Major update with new drawing tools and collaborative features for kids.',
    status: 'In development',
  },
  {
    title: 'New indie app (stealth)',
    description:
      'Something exciting in the AI space. Stay tuned for the announcement.',
    status: 'Research',
  },
  {
    title: 'YouTube growth',
    description:
      'Aiming to hit 100K subscribers with more dev logs and tutorials.',
    status: 'Ongoing',
  },
  {
    title: 'This website',
    description:
      'Continuously improving my personal site with new features and content.',
    status: 'Always',
  },
];

const socialLinks: {
  href: string;
  icon: IconDefinition;
  label: string;
  handle: string;
}[] = [
  {
    href: 'https://instagram.com/ezeikel.dev',
    icon: faInstagram,
    label: 'Instagram',
    handle: '@ezeikel.dev',
  },
  {
    href: 'https://tiktok.com/@ezeikel.dev',
    icon: faTiktok,
    label: 'TikTok',
    handle: '@ezeikel.dev',
  },
  {
    href: 'https://youtube.com/@ezeikel',
    icon: faYoutube,
    label: 'YouTube',
    handle: '@ezeikel',
  },
  {
    href: 'https://twitter.com/ezeikel',
    icon: faXTwitter,
    label: 'X/Twitter',
    handle: '@ezeikel',
  },
  {
    href: 'https://linkedin.com/in/ezeikel',
    icon: faLinkedinIn,
    label: 'LinkedIn',
    handle: '/in/ezeikel',
  },
  {
    href: 'https://github.com/ezeikel',
    icon: faGithub,
    label: 'GitHub',
    handle: '@ezeikel',
  },
];

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Content */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Hey, I&apos;m Ezeikel
                </h1>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    I&apos;m a{' '}
                    <span className="font-medium text-foreground">
                      UK-based software engineer
                    </span>{' '}
                    with deep experience in{' '}
                    <span className="font-medium text-foreground">fintech</span>{' '}
                    and <span className="font-medium text-foreground">AI</span>.
                    I&apos;ve spent most of my career building products at the
                    intersection of finance and technology.
                  </p>
                  <p>
                    From lending platforms at{' '}
                    <span className="font-medium text-foreground">
                      Lendable
                    </span>{' '}
                    to verification systems at{' '}
                    <span className="font-medium text-foreground">
                      Clearstake
                    </span>{' '}
                    and banking tech at{' '}
                    <span className="font-medium text-foreground">
                      Barclays
                    </span>
                    , I&apos;ve shipped software that handles real money and
                    real risk. Currently, I&apos;m working at an AI startup.
                  </p>
                  <p>
                    On the side, I build indie apps like{' '}
                    <Link
                      href="/things-ive-built/chunky-crayon"
                      className="text-primary hover:underline"
                    >
                      Chunky Crayon
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/things-ive-built/parking-ticket-pal"
                      className="text-primary hover:underline"
                    >
                      Parking Ticket Pal
                    </Link>
                    , and share my journey with 100K+ followers across social
                    media.
                  </p>
                </div>

                {/* Skills */}
                <div className="pt-4">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Tech I work with
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                      >
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className={skill.color}
                        />
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                  <div className="relative aspect-[3/4] w-72 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:w-80">
                    <Image
                      src="/ezeikel-about.png"
                      alt="Ezeikel Pemberton"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground">
              My Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div
                      className={`ml-12 flex-1 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <span className="text-sm font-bold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-1 text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background md:relative md:left-auto">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-sm text-primary"
                      />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where I'm Headed */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-primary">
                    Where I&apos;m Headed
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    London to Dubai
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    While I&apos;m currently based in{' '}
                    <span className="font-medium text-foreground">London</span>,
                    I&apos;m actively working toward relocating to the{' '}
                    <span className="font-medium text-foreground">UAE</span>.
                  </p>
                  <p>
                    Dubai and Abu Dhabi have become second homes to me. I visit
                    twice a year and have fallen in love with the energy, the
                    tech scene, and the opportunity to build something
                    meaningful there.
                  </p>
                  <p>
                    I&apos;m particularly excited about the fintech and tech
                    ecosystem with companies like Careem, Noon, and emerging
                    players pushing boundaries in the region.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                    <FontAwesomeIcon
                      icon={faPlane}
                      className="text-muted-foreground"
                    />
                    Open to UAE roles
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="text-muted-foreground"
                    />
                    Remote or On-site
                  </span>
                </div>
              </div>
              <div>
                <InteractiveGlobe />
              </div>
            </div>
          </div>
        </section>

        {/* Currently Reading */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Currently Reading
              </h2>
              <Link
                href="/library"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View full library
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    The Pragmatic Programmer
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Reading
                  </span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  David Thomas & Andrew Hunt
                </p>
                <p className="text-muted-foreground">
                  Classic guide to becoming a better developer. Re-reading for
                  fresh insights.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Atomic Habits
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Reading
                  </span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  James Clear
                </p>
                <p className="text-muted-foreground">
                  Building better systems for productivity and personal growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photography */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Photography
              </h2>
              <Link
                href="/photography"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View gallery
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>

            <p className="mb-8 max-w-2xl text-muted-foreground">
              When I&apos;m not coding, I&apos;m often behind a lens capturing
              moments from my travels and everyday life.
            </p>

            {/* Photo Grid Preview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-secondary sm:col-span-2 sm:row-span-2 sm:aspect-square">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faHelicopter}
                      className="mb-2 text-4xl text-muted-foreground/50"
                    />
                    <p className="text-sm text-muted-foreground/50">
                      Dubai Skyline
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    DJI Mavic Pro
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="mb-2 text-2xl text-muted-foreground/50"
                    />
                    <p className="text-xs text-muted-foreground/50">
                      London Streets
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium text-white">
                    Canon 5D Mk3
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="mb-2 text-2xl text-muted-foreground/50"
                    />
                    <p className="text-xs text-muted-foreground/50">
                      Tokyo Night
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium text-white">
                    Osmo Pocket 3
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faHelicopter}
                      className="mb-2 text-2xl text-muted-foreground/50"
                    />
                    <p className="text-xs text-muted-foreground/50">
                      Beach Aerial
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium text-white">
                    DJI Mavic Pro
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="mb-2 text-2xl text-muted-foreground/50"
                    />
                    <p className="text-xs text-muted-foreground/50">
                      Abu Dhabi
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium text-white">
                    Canon 5D Mk3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Currently Building */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
              Currently Building
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {currentlyBuilding.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-border bg-secondary/30 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    Whether you want to collaborate, have a question, or just
                    want to say hi, I&apos;d love to hear from you.
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@ezeikel.dev"
                    className="flex items-center gap-3 text-primary hover:text-primary/80"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    hello@ezeikel.dev
                  </a>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Social
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <FontAwesomeIcon
                            icon={social.icon}
                            className="text-foreground"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {social.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {social.handle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  Send a Message
                </h3>

                {isSubmitted ? (
                  <div className="rounded-lg bg-green-100 p-6 text-center text-green-700">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mb-2 text-3xl"
                    />
                    <p className="font-medium">Thanks for your message!</p>
                    <p className="mt-1 text-sm">
                      I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="What would you like to chat about?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={5}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-100 p-4 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FontAwesomeIcon
                            icon={faSpinnerThird}
                            spin
                            className="mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="ml-2"
                          />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
