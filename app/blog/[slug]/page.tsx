import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { allPosts } from 'contentlayer/generated';
// import { useMDXComponent } from 'next-contentlayer/hooks';

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

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // BUG: using useMDXComponent from next-contentlayer/hooks doesn't seem to work
  // const MDXContent = useMDXComponent(post.body.code);

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
          {post.publishedAt}
        </div>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
      </div>
      {/* <MDXContent /> */}
      <div
        className="cl-post-body"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </section>
  );
}
