/* eslint-disable import/prefer-default-export */

import { NextRequest } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return Response.json(
      { error: 'Email is required' },
      {
        status: 400,
      },
    );
  }

  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: 'subscribed',
      },
    );

    return Response.json(
      { result: 'success' },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      { error },
      {
        status: 500,
      },
    );
  }
}
