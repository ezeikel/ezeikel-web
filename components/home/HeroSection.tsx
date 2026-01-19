'use client';

import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCar,
  faCheckCircle,
  faCode,
  faPlay,
  faSpinnerThird,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Newsletter signup:', value.email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    },
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto max-w-6xl px-6"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                variants={itemVariants}
                className="text-sm font-semibold uppercase tracking-widest text-primary"
              >
                UK Based Senior Software Engineer & JavaScript All-Rounder
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                Building apps, sharing the journey.
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-pretty text-lg text-muted-foreground md:text-xl"
              >
                Building apps, shipping products, and sharing the entire journey
                online. Founder of{' '}
                <a
                  href="https://chunkycrayon.com?utm_source=ezeikel.com&utm_medium=website&utm_campaign=hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Chunky Crayon
                </a>{' '}
                and{' '}
                <a
                  href="https://parkingticketpal.com?utm_source=ezeikel.com&utm_medium=website&utm_campaign=hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Parking Ticket Pal
                </a>
                .
              </motion.p>
            </div>

            {/* Newsletter Form */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Get updates on new projects, videos, and behind-the-scenes
                content.
              </p>
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="text-sm font-medium">
                      You&apos;re in! Check your inbox to confirm.
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <form.Field
                      name="email"
                      validators={{
                        onChange: ({ value }) =>
                          !value
                            ? 'Email is required'
                            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                              ? 'Please enter a valid email'
                              : undefined,
                      }}
                    >
                      {(field) => (
                        <div className="flex-1">
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="h-12 bg-card"
                            aria-label="Email address"
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-xs text-red-500">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                        </div>
                      )}
                    </form.Field>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 w-full font-semibold sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <FontAwesomeIcon
                              icon={faSpinnerThird}
                              spin
                              className="mr-2"
                            />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            Subscribe
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-2"
                            />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
              <p className="text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/things-ive-built">
                    View my projects
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="ghost" size="lg">
                  <Link href="/content">
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Watch latest video
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl"
              />
              <div className="relative aspect-square w-72 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:w-96">
                <img
                  src="/ezeikel-hero.jpg"
                  alt="Ezeikel Pemberton"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating badges with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
                  >
                    <FontAwesomeIcon icon={faCode} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Chunky Crayon
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Kids colouring app
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -right-4 -top-4 rounded-xl bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20"
                  >
                    <FontAwesomeIcon icon={faCar} className="text-accent" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Parking Ticket Pal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ticket management
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
