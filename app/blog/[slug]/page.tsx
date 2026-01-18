import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity/client';
import {
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from '@/lib/sanity/queries';
import type { SanityPost } from '@/lib/sanity/types';
import PortableTextContent from '@/components/PortableTextContent';

export const revalidate = 3600;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string): Promise<SanityPost | null> {
  return client.fetch(postBySlugQuery, { slug });
}

async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(postsQuery);
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featuredImage?.asset
        ? [
            {
              url: urlFor(post.featuredImage.asset)
                .width(1200)
                .height(630)
                .url(),
              width: 1200,
              height: 630,
              alt: post.featuredImage.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
    },
  };
}

const categoryIcons: Record<string, string> = {
  Dev: 'fa-code',
  Product: 'fa-cube',
  'Indie Hacking': 'fa-rocket',
  'Creator Life': 'fa-lightbulb',
  'Case Study': 'fa-folder-open',
  Tech: 'fa-microchip',
  AI: 'fa-robot',
  Lifestyle: 'fa-heart',
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different post)
  const allPosts = await getAllPosts();
  const category = post.categories?.[0];
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p._id !== post._id &&
        p.categories?.some((c) => c._id === category?._id),
    )
    .slice(0, 2);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const readTime = estimateReadTime(post.body);
  const categoryTitle = post.categories?.[0]?.title || 'Uncategorized';

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              <i
                className="fa-solid fa-chevron-right text-xs"
                aria-hidden="true"
              />
              <span className="text-foreground">{categoryTitle}</span>
            </nav>

            {/* Category & Read Time */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground">
                <i
                  className={`fa-solid ${categoryIcons[categoryTitle] || 'fa-file-alt'} text-muted-foreground`}
                  aria-hidden="true"
                />
                {categoryTitle}
              </span>
              <span className="text-sm text-muted-foreground">{readTime}</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {post.author?.image ? (
                  <img
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-sm font-semibold">
                      {post.author?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('') || 'EP'}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {post.author?.name || 'Ezeikel Pemberton'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {post.featuredImage?.asset && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-4xl px-6 py-8">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={urlFor(post.featuredImage.asset).width(1200).url()}
                  alt={post.featuredImage.alt || post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              {post.featuredImage.credit && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Photo: {post.featuredImage.credit}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            {post.body && <PortableTextContent value={post.body} />}

            {/* Tags from categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <p className="mb-4 text-sm font-medium text-foreground">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span
                      key={cat._id}
                      className="rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 border-t border-border pt-8">
              <p className="mb-4 text-sm font-medium text-foreground">
                Share this article
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://ezeikel.dev/blog/${post.slug.current}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Share on X/Twitter"
                >
                  <i className="fa-brands fa-x-twitter" aria-hidden="true" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://ezeikel.dev/blog/${post.slug.current}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategory =
                    relatedPost.categories?.[0]?.title || 'Uncategorized';
                  const relatedReadTime = estimateReadTime(relatedPost.body);
                  return (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug.current}`}
                      className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                    >
                      {relatedPost.featuredImage?.asset && (
                        <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={urlFor(relatedPost.featuredImage.asset)
                              .width(128)
                              .height(96)
                              .url()}
                            alt={relatedPost.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-center">
                        <span className="mb-2 flex w-fit items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          <i
                            className={`fa-solid ${categoryIcons[relatedCategory] || 'fa-file-alt'} text-muted-foreground`}
                            aria-hidden="true"
                          />
                          {relatedCategory}
                        </span>
                        <h3 className="font-semibold text-foreground group-hover:text-primary">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {relatedReadTime}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Enjoyed this article?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Subscribe to get notified when I publish new posts about building
              products, coding, and indie hacking.
            </p>
            <Button asChild>
              <Link href="/#newsletter">
                <i className="fa-solid fa-envelope mr-2" aria-hidden="true" />
                Subscribe to newsletter
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function estimateReadTime(body?: unknown[]): string {
  if (!body) return '3 min read';

  const text = body
    .filter(
      (block): block is { _type: string; children?: { text?: string }[] } =>
        typeof block === 'object' &&
        block !== null &&
        '_type' in block &&
        block._type === 'block',
    )
    .map((block) => block.children?.map((child) => child.text || '').join(''))
    .join(' ');

  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}
