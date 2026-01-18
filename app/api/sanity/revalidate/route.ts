import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';

type SanityWebhookPayload = {
  _type: string;
  slug?: { current: string };
};

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad Request' },
        { status: 400 },
      );
    }

    const revalidatedPaths: string[] = [];

    // Revalidate based on document type
    switch (body._type) {
      case 'post':
        revalidatePath('/blog');
        revalidatedPaths.push('/blog');
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`);
          revalidatedPaths.push(`/blog/${body.slug.current}`);
        }
        break;

      case 'project':
        revalidatePath('/things-ive-built');
        revalidatedPaths.push('/things-ive-built');
        if (body.slug?.current) {
          revalidatePath(`/things-ive-built/${body.slug.current}`);
          revalidatedPaths.push(`/things-ive-built/${body.slug.current}`);
        }
        break;

      case 'book':
        revalidatePath('/library');
        revalidatedPaths.push('/library');
        break;

      case 'equipment':
        revalidatePath('/uses');
        revalidatedPaths.push('/uses');
        break;

      case 'photo':
        revalidatePath('/photography');
        revalidatedPaths.push('/photography');
        break;

      case 'author':
      case 'category':
        // Revalidate blog pages when authors or categories change
        revalidatePath('/blog');
        revalidatedPaths.push('/blog');
        break;

      default:
        // Revalidate home page for any other changes
        revalidatePath('/');
        revalidatedPaths.push('/');
    }

    return NextResponse.json({
      message: 'Revalidation successful',
      revalidated: true,
      paths: revalidatedPaths,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 },
    );
  }
}
