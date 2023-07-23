import type { Metadata } from 'next';
import Link from 'next/link';
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });

  return (
    <div className="max-w-[600] m-auto">
      <h1 className="font-display text-3xl font-bold mb-8">
        Check out my blog
      </h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map(({ slug, title }) => (
          <li key={slug}>
            <h2 className="text-lg">
              <Link
                href={`/blog/${slug}`}
                className="text-blue-700 hover:text-blue-900"
              >
                {title}
              </Link>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
