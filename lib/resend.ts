import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

const isProduction = process.env.NODE_ENV === 'production';

let _resend: Resend | null = null;
let _mailtrapTransport: nodemailer.Transporter | null = null;

/**
 * Get Resend client with lazy initialization (production only)
 */
export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

/**
 * Get Mailtrap transport for local development
 */
function getMailtrapTransport(): nodemailer.Transporter {
  if (!_mailtrapTransport) {
    _mailtrapTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
      port: parseInt(process.env.MAIL_PORT || '2525'),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  return _mailtrapTransport;
}

/**
 * Delay utility for rate limiting (Resend allows 2 req/sec)
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Rate limit delay between emails (600ms to stay under 2/sec)
 */
export const RESEND_RATE_LIMIT_DELAY = 600;

/**
 * Email sender configuration
 */
export const FROM_EMAIL = 'Ezeikel <hi@ezeikel.dev>';
export const ADMIN_EMAILS = ['hi@ezeikel.dev'];

type SendEmailOptions = {
  to: string;
  subject: string;
  react: React.ReactElement;
};

/**
 * Send an email using Resend in production or Mailtrap in development
 */
export async function sendEmail(options: SendEmailOptions) {
  if (isProduction && process.env.RESEND_API_KEY) {
    // Use Resend in production
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      react: options.react,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { id: data?.id, provider: 'resend' as const };
  }
  // Use Mailtrap for local development
  const html = await render(options.react);
  const mailtrapTransport = getMailtrapTransport();
  const result = await mailtrapTransport.sendMail({
    from: FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html,
  });

  console.log('Mailtrap email sent:', result.messageId);
  return { id: result.messageId, provider: 'mailtrap' as const };
}

/**
 * Add a contact to Resend Audiences for marketing emails
 */
export async function addToResendAudience(
  email: string,
  firstName: string,
  lastName?: string,
) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!isProduction) {
    console.log('[DEV] Would add to Resend Audience:', {
      email,
      firstName,
      lastName,
      audienceId,
    });
    return { success: true, dev: true };
  }

  if (!audienceId) {
    console.warn('RESEND_AUDIENCE_ID not configured, skipping audience add');
    return { success: false, reason: 'no_audience_id' };
  }

  try {
    const resend = getResend();

    const result = await resend.contacts.create({
      audienceId,
      email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    console.log('Added contact to Resend Audience:', { email, result });
    return { success: true, data: result };
  } catch (error) {
    // Handle duplicate contact gracefully
    console.error('Failed to add to Resend Audience:', error);
    return { success: false, error };
  }
}
