import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  sendEmail,
  addToResendAudience,
  delay,
  RESEND_RATE_LIMIT_DELAY,
  ADMIN_EMAILS,
} from '@/lib/resend';
import NewsletterWelcomeEmail from '@/emails/NewsletterWelcomeEmail';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 },
      );
    }

    const { email } = result.data;

    // Add to Resend Audience (production only, logs in dev)
    await addToResendAudience(email, email.split('@')[0]);

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to the newsletter!',
      react: NewsletterWelcomeEmail({ email }),
    });

    // Wait for rate limit
    await delay(RESEND_RATE_LIMIT_DELAY);

    // Send admin notification
    try {
      for (let i = 0; i < ADMIN_EMAILS.length; i++) {
        if (i > 0) {
          await delay(RESEND_RATE_LIMIT_DELAY);
        }
        await sendEmail({
          to: ADMIN_EMAILS[i],
          subject: `New newsletter subscriber: ${email}`,
          react: AdminNotificationEmail({
            type: 'newsletter',
            name: email.split('@')[0],
            email,
          }),
        });
      }
    } catch (adminError) {
      // Don't fail the request if admin notification fails
      console.error('Failed to send admin notification:', adminError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to subscribe',
      },
      { status: 500 },
    );
  }
}
