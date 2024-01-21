/* eslint-disable import/prefer-default-export */

import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import ContactEnquiryClientEmail from '@/emails/ContactEnquiryClientEmail';
import ContactEnquiryTeamEmail from '@/emails/ContactEnquiryTeamEmail';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: NextRequest) {
  const { fullName, email, message } = await request.json();

  // email to team
  await resend.emails.send({
    from: 'enquiries@ezeikel.dev',
    to: 'hi@ezeikel.dev',
    subject: `Action Required: Enquiry Received from ${fullName}`,
    react: ContactEnquiryTeamEmail({
      fullName,
      email,
      message,
    }),
  });

  // email to client
  await resend.emails.send({
    from: 'no-reply@ezeikel.dev',
    to: email,
    subject: `We've Received Your Enquiry, ${fullName}!`,
    react: ContactEnquiryClientEmail({
      fullName,
    }),
  });

  return Response.json(
    {
      message: 'Email sent successfully.',
    },
    {
      status: 200,
    },
  );
}
