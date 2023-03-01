import type { Metadata } from 'next';
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts } from 'contentlayer/generated';

type PoscardProps = {
  title: string;
  publishedAt: string;
  slug: string;
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

const PostCard = ({ title, publishedAt, slug }: PoscardProps) => {
  return (
    <div className="mb-6">
      <time dateTime={publishedAt} className="block text-sm text-slate-600">
        {format(parseISO(publishedAt), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link
          href={`/blog/${slug}`}
          className="text-blue-700 hover:text-blue-900"
        >
          {title}
        </Link>
      </h2>
    </div>
  );
};

export default async function BlogPage() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
}
