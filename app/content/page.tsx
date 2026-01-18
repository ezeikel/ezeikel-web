'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { contentSeries, getContentByPlatform } from '@/lib/content';
import { cn } from '@/lib/utils';

const platforms = ['All', 'YouTube', 'TikTok', 'Instagram', 'Shorts'];

const platformIcons: Record<string, string> = {
  YouTube: 'fa-youtube',
  TikTok: 'fa-tiktok',
  Instagram: 'fa-instagram',
  Shorts: 'fa-youtube',
};

const platformColors: Record<string, string> = {
  YouTube: 'bg-red-500',
  TikTok: 'bg-foreground',
  Instagram: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
  Shorts: 'bg-red-600',
};

const ContentPage = () => {
  const [activePlatform, setActivePlatform] = useState('All');

  const filteredContent = getContentByPlatform(activePlatform);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Content
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Dev logs, coding sessions, gaming setups, and indie hacking behind
              the scenes. Follow along as I build in public and share everything
              I learn.
            </p>
          </div>
        </section>

        {/* Featured Series */}
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Featured Series
              </h2>
              <p className="mt-1 text-muted-foreground">
                Binge-worthy playlists to level up your skills
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {contentSeries.map((series, index) => (
                <a
                  key={series.id}
                  href={series.href}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={series.thumbnail || '/placeholder.svg'}
                      alt={series.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Series number badge */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white backdrop-blur-sm">
                      {index + 1}
                    </div>

                    {/* Video count badge */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <i className="fa-solid fa-list" aria-hidden="true" />
                      {series.videoCount} videos
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {series.name}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {series.description}
                      </p>
                    </div>

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                        <i
                          className="fa-solid fa-play ml-1 text-xl text-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Filter */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-2">
              <span className="mr-2 text-sm font-medium text-muted-foreground">
                Filter:
              </span>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => {
                  const count =
                    platform === 'All'
                      ? filteredContent.length
                      : getContentByPlatform(platform).length;
                  return (
                    <button
                      type="button"
                      key={platform}
                      onClick={() => setActivePlatform(platform)}
                      className={cn(
                        'group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                        activePlatform === platform
                          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                      )}
                    >
                      {platform !== 'All' && (
                        <i
                          className={`fa-brands ${platformIcons[platform]}`}
                          aria-hidden="true"
                        />
                      )}
                      {platform}
                      <span
                        className={cn(
                          'flex h-5 min-w-5 items-center justify-center rounded-full text-xs',
                          activePlatform === platform
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

        {/* Content Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            {filteredContent.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Featured large card - first item */}
                <a
                  href={filteredContent[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative md:col-span-2 lg:row-span-2 overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                    <img
                      src={filteredContent[0].thumbnail || '/placeholder.svg'}
                      alt={filteredContent[0].title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white ${platformColors[filteredContent[0].platform]}`}
                        >
                          <i
                            className={`fa-brands ${platformIcons[filteredContent[0].platform]}`}
                            aria-hidden="true"
                          />
                          {filteredContent[0].platform}
                        </span>
                        <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {filteredContent[0].duration}
                        </span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-white">
                        {filteredContent[0].title}
                      </h3>
                      <p className="mb-3 text-sm text-white/80 line-clamp-2">
                        {filteredContent[0].description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-eye" aria-hidden="true" />
                          {filteredContent[0].views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-heart" aria-hidden="true" />
                          {filteredContent[0].likes}
                        </span>
                        <span>{filteredContent[0].date}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                        <i
                          className="fa-solid fa-play ml-1 text-xl text-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </a>

                {/* Remaining cards */}
                {filteredContent.slice(1).map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                        {item.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                          <i
                            className="fa-solid fa-play ml-0.5 text-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          <i
                            className={`fa-brands ${platformIcons[item.platform]} text-muted-foreground`}
                            aria-hidden="true"
                          />
                          {item.platform}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.views} views
                        </span>
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <i
                  className="fa-solid fa-video mb-4 text-4xl text-muted-foreground/50"
                  aria-hidden="true"
                />
                <p className="text-muted-foreground">
                  No content found for this platform.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="border-t border-border bg-primary/5 py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Never miss a video
            </h2>
            <p className="mb-8 text-muted-foreground">
              Subscribe to my channels to get notified when I drop new dev logs,
              tutorials, and behind-the-scenes content.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://youtube.com/@ezeikel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
              >
                <i className="fa-brands fa-youtube" aria-hidden="true" />
                Subscribe on YouTube
              </a>
              <a
                href="https://tiktok.com/@ezeikel.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
              >
                <i className="fa-brands fa-tiktok" aria-hidden="true" />
                Follow on TikTok
              </a>
              <a
                href="https://instagram.com/ezeikel.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-6 py-3 font-medium text-white transition-colors hover:opacity-90"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContentPage;
