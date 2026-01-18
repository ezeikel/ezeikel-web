import type { Variants, Easing } from 'framer-motion';

// Standard easing curves - typed as tuples for framer-motion compatibility
export const easeOutQuart: Easing = [0.25, 0.4, 0.25, 1];
export const easeInOutQuart: Easing = [0.76, 0, 0.24, 1];
export const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

// Reusable animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutQuart,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOutQuart,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutQuart,
    },
  },
};
