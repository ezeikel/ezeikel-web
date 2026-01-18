'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  featured: boolean;
};

type Category = {
  title: string;
  slug: string;
};

type BlogPostsGridProps = {
  posts: BlogPost[];
  categories: Category[];
};

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

export default function BlogPostsGrid({
  posts,
  categories,
}: BlogPostsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts;
    return posts.filter(
      (post) =>
        post.categorySlug === activeCategory ||
        post.category === activeCategory,
    );
  }, [posts, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    posts.forEach((post) => {
      const slug = post.categorySlug;
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [posts]);

  return (
    <>
      {/* Category Filter */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted-foreground">
              Filter:
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = categoryCounts[category.slug] || 0;
                return (
                  <button
                    type="button"
                    key={category.slug}
                    onClick={() => setActiveCategory(category.slug)}
                    className={cn(
                      'group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                      activeCategory === category.slug
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                    )}
                  >
                    {category.title}
                    <span
                      className={cn(
                        'flex h-5 min-w-5 items-center justify-center rounded-full text-xs',
                        activeCategory === category.slug
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
              >
                {/* Image */}
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {post.featured && (
                      <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Featured
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                      <i
                        className={`fa-solid ${categoryIcons[post.category] || 'fa-file-alt'} text-muted-foreground`}
                        aria-hidden="true"
                      />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h2>

                  <p className="mb-4 flex-grow text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      Read more
                      <i
                        className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="py-16 text-center">
              <i
                className="fa-solid fa-file-lines mb-4 text-4xl text-muted-foreground/50"
                aria-hidden="true"
              />
              <p className="text-muted-foreground">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
