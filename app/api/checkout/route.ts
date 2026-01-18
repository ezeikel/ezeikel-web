import { NextResponse } from 'next/server';
import { getStripe, getProductById, SHOP_PRODUCTS } from '@/lib/stripe';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(request: Request) {
  try {
    const { productId, customAmount } = await request.json();

    // Validate input
    if (!productId && !customAmount) {
      return NextResponse.json(
        { error: 'Product ID or custom amount is required' },
        { status: 400 },
      );
    }

    const stripe = getStripe();

    // Handle custom support amount (in GBP)
    if (customAmount) {
      const amount = Math.max(1, Math.floor(Number(customAmount)));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: 'Support My Work',
                description: `Custom support amount - thank you for your generosity!`,
              },
              unit_amount: amount * 100, // Convert to pence
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${BASE_URL}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/shop?canceled=true`,
        metadata: {
          type: 'support',
          customAmount: amount.toString(),
          currency: 'gbp',
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Handle predefined product
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if product has a valid price ID
    if (product.priceId === 'price_xxx') {
      // Product not yet configured in Stripe, use price_data instead
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: product.currency || 'gbp',
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price * 100, // Convert to pence
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${BASE_URL}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/shop?canceled=true`,
        metadata: {
          productId: product.id,
          type: product.type,
          currency: product.currency || 'gbp',
        },
        customer_email: undefined, // Let Stripe collect email
      });

      return NextResponse.json({ url: session.url });
    }

    // Use predefined Stripe price
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${BASE_URL}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/shop?canceled=true`,
      metadata: {
        productId: product.id,
        type: product.type,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    if (error instanceof Error && error.message.includes('STRIPE_SECRET_KEY')) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    );
  }
}
