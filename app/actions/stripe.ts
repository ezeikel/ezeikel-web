'use server';

import { stripe, getProductById } from '@/lib/stripe';
import { headers } from 'next/headers';

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_BASE_URL || 'https://ezeikel.dev';

export type CheckoutResult = {
  success: boolean;
  url?: string;
  error?: string;
};

/**
 * Create a Stripe checkout session for a product
 */
export async function createCheckoutSession(
  productId: string,
  customerEmail?: string,
): Promise<CheckoutResult> {
  try {
    const product = getProductById(productId);

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
      customer_email: customerEmail,
      metadata: {
        productId: product.id,
        productType: product.type,
      },
    });

    if (!session.url) {
      return { success: false, error: 'Failed to create checkout session' };
    }

    return { success: true, url: session.url };
  } catch (error) {
    console.error('Checkout session error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Checkout failed',
    };
  }
}

/**
 * Retrieve checkout session details
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      success: true,
      session: {
        id: session.id,
        status: session.status,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_email,
        metadata: session.metadata,
      },
    };
  } catch (error) {
    console.error('Get session error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get session',
    };
  }
}

/**
 * Create a custom amount checkout (for donations/support)
 */
export async function createCustomCheckout(
  amountInCents: number,
  description: string,
  customerEmail?: string,
): Promise<CheckoutResult> {
  try {
    if (amountInCents < 100) {
      return { success: false, error: 'Minimum amount is $1' };
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Support',
              description,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
      customer_email: customerEmail,
      metadata: {
        type: 'custom-support',
      },
    });

    if (!session.url) {
      return { success: false, error: 'Failed to create checkout session' };
    }

    return { success: true, url: session.url };
  } catch (error) {
    console.error('Custom checkout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Checkout failed',
    };
  }
}
