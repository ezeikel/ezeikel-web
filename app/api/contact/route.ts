import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  sendEmail,
  delay,
  RESEND_RATE_LIMIT_DELAY,
  ADMIN_EMAILS,
} from '@/lib/resend';
import ContactConfirmationEmail from '@/emails/ContactConfirmationEmail';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Please enter a message (at least 10 characters)'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 },
      );
    }

    const { name, email, message } = result.data;

    // Send admin notification first
    for (let i = 0; i < ADMIN_EMAILS.length; i++) {
      if (i > 0) {
        await delay(RESEND_RATE_LIMIT_DELAY);
      }
      await sendEmail({
        to: ADMIN_EMAILS[i],
        subject: `New contact from ${name}`,
        react: AdminNotificationEmail({
          type: 'contact',
          name,
          email,
          message,
        }),
      });
    }

    // Wait for rate limit
    await delay(RESEND_RATE_LIMIT_DELAY);

    // Send confirmation to user
    try {
      await sendEmail({
        to: email,
        subject: 'Thanks for reaching out!',
        react: ContactConfirmationEmail({ name }),
      });
    } catch (confirmError) {
      // Don't fail the request if confirmation fails
      console.error('Failed to send confirmation email:', confirmError);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to send message',
      },
      { status: 500 },
    );
  }
}
