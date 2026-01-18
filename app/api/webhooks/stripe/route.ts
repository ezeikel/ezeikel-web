import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, getProductById } from '@/lib/stripe';
import {
  sendEmail,
  delay,
  RESEND_RATE_LIMIT_DELAY,
  ADMIN_EMAILS,
} from '@/lib/resend';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 },
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 },
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 },
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const productId = session.metadata?.productId;
  const customerEmail = session.customer_email;

  console.log('Checkout completed:', {
    sessionId: session.id,
    productId,
    customerEmail,
    amountTotal: session.amount_total,
  });

  // Get product details
  const product = productId ? getProductById(productId) : null;

  // Send admin notification
  try {
    for (let i = 0; i < ADMIN_EMAILS.length; i++) {
      if (i > 0) {
        await delay(RESEND_RATE_LIMIT_DELAY);
      }
      await sendEmail({
        to: ADMIN_EMAILS[i],
        subject: `New purchase: ${product?.name || 'Support'}`,
        react: AdminNotificationEmail({
          type: 'contact',
          name: customerEmail || 'Customer',
          email: customerEmail || 'unknown',
          message: `New purchase: ${product?.name || 'Custom amount'}`,
          additionalInfo: {
            'Product ID': productId || 'N/A',
            'Amount': `${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase()}`,
            'Session ID': session.id,
          },
        }),
      });
    }
  } catch (emailError) {
    console.error('Failed to send purchase notification:', emailError);
  }

  // TODO: Send purchase confirmation to customer
  // TODO: Deliver digital products (if applicable)
}
