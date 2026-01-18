import 'server-only';
import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Legacy export for backwards compatibility
export const stripe = {
  get checkout() {
    return getStripe().checkout;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

export type ProductType = 'template' | 'guide' | 'consultation' | 'support';

export type Product = {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number;
  currency: 'gbp' | 'usd';
  type: ProductType;
  featured?: boolean;
};

// Shop products - these should match Stripe products
// Replace priceId values with actual Stripe price IDs after creating products in Stripe
// All prices in GBP (pounds sterling)
export const SHOP_PRODUCTS: Product[] = [
  // Templates
  {
    id: 'expo-starter-kit',
    name: 'React Native Expo Starter Kit',
    description:
      'Production-ready boilerplate with authentication, payments, push notifications, and more. Ship your app in days, not months.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 119, // GBP
    currency: 'gbp',
    type: 'template',
    featured: true,
  },
  {
    id: 'notion-dev-workflow',
    name: 'Developer Workflow Kit',
    description:
      'My complete Notion setup for managing projects, tracking content, and staying productive as an indie hacker.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 15, // GBP
    currency: 'gbp',
    type: 'template',
  },

  // Guides
  {
    id: 'ship-your-app-guide',
    name: 'Ship Your First App',
    description:
      'A comprehensive guide on going from idea to the App Store. Everything I learned shipping Chunky Crayon and Parking Ticket Pal.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 25, // GBP
    currency: 'gbp',
    type: 'guide',
  },

  // Consultations
  {
    id: 'code-review',
    name: '1:1 Code Review',
    description:
      '60-minute live code review session. I\'ll review your React Native app, provide feedback, and answer questions.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 120, // GBP
    currency: 'gbp',
    type: 'consultation',
  },
  {
    id: 'career-chat',
    name: 'Career Chat',
    description:
      '30-minute call to discuss your dev career, transitioning to indie hacking, or building in public.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 60, // GBP
    currency: 'gbp',
    type: 'consultation',
  },

  // Support tiers
  {
    id: 'support-coffee',
    name: 'Buy Me a Coffee',
    description: 'A small thank you for my work.',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 4, // GBP
    currency: 'gbp',
    type: 'support',
  },
  {
    id: 'support-lunch',
    name: 'Buy Me Lunch',
    description: 'Really appreciate your support!',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 12, // GBP
    currency: 'gbp',
    type: 'support',
  },
  {
    id: 'support-dinner',
    name: 'Buy Me Dinner',
    description: 'You\'re amazing - thank you!',
    priceId: 'price_xxx', // TODO: Replace with actual Stripe price ID
    price: 25, // GBP
    currency: 'gbp',
    type: 'support',
  },
];

export function getProductById(id: string): Product | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByType(type: ProductType): Product[] {
  return SHOP_PRODUCTS.filter((p) => p.type === type);
}

export function getFeaturedProducts(): Product[] {
  return SHOP_PRODUCTS.filter((p) => p.featured);
}
