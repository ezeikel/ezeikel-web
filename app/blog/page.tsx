import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { client, urlFor } from '@/lib/sanity/client';
import { postsQuery, categoriesQuery } from '@/lib/sanity/queries';
import type { SanityPost, SanityCategory } from '@/lib/sanity/types';
import BlogPostsGrid from './BlogPostsGrid';

export const revalidate = 3600; // Revalidate every hour

async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(postsQuery);
}

async function getCategories(): Promise<SanityCategory[]> {
  return client.fetch(categoriesQuery);
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  // Format posts for the client component
  const formattedPosts = posts.map((post) => ({
    id: post._id,
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.featuredImage?.asset
      ? urlFor(post.featuredImage.asset).width(600).height(340).url()
      : null,
    category: post.categories?.[0]?.title || 'Uncategorized',
    categorySlug: post.categories?.[0]?.slug.current || 'uncategorized',
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
    readTime: estimateReadTime(post.body),
    featured: false,
  }));

  const formattedCategories = [
    { title: 'All', slug: 'all' },
    ...categories.map((cat) => ({
      title: cat.title,
      slug: cat.slug.current,
    })),
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Blog
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Thoughts on building products, coding, indie hacking, and the
              creator life. Lessons learned from shipping apps and growing an
              audience.
            </p>
          </div>
        </section>

        <BlogPostsGrid posts={formattedPosts} categories={formattedCategories} />
      </main>
      <Footer />
    </div>
  );
}

// Helper to estimate read time from Portable Text
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
