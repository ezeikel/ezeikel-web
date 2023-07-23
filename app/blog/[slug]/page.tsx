import type { Metadata } from 'next';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import Balancer from 'react-wrap-balancer';
import { format, formatDistanceToNow } from 'date-fns';
import { Tweet } from 'react-tweet';
import components from '../../../lib/tweet-components';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;

  const ogImage = image
    ? `https://ezeikel.com${image}`
    : `https://ezeikel.com/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://ezeikel.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// custom MDX components
const mdxComponents: MDXComponents = {
  // override the default <a> element to use the next/link component.
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // TODO: render StaticTweet components in MDX
  // StaticTweet: () => <Tweet />,
  Tweet: ({ id }) => <Tweet id={id} components={components} />,
};

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((p) => p.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  // FIX: async server component + useMDXComponenr hook - https://github.com/vercel/next.js/issues/49267#issuecomment-1535932088
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <article className="prose prose-quoteless prose-neutral dark:prose-invert mx-0 md:mx-auto ">
      <h1 className="font-bold font-display text-3xl">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div>
        {`${format(
          new Date(post.publishedAt),
          'MMMM d, yyyy',
        )} (${formatDistanceToNow(new Date(post.publishedAt))} ago)`}
      </div>
      <MDXContent components={mdxComponents} />
      <div> {post.readingTime.text}</div>
    </article>
  );
}
