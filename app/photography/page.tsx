import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { client, urlFor } from '@/lib/sanity/client';
import { photosQuery, featuredPhotosQuery } from '@/lib/sanity/queries';
import type { SanityPhoto } from '@/lib/sanity/types';
import PhotoGrid from './PhotoGrid';

export const revalidate = 3600;

export const metadata = {
  title: 'Photography | Ezeikel',
  description:
    'A collection of photos captured with my Canon 5D Mk3, DJI Osmo Pocket 3, and Mavic Pro drone.',
};

async function getPhotos(): Promise<SanityPhoto[]> {
  return client.fetch(photosQuery);
}

const gear = [
  {
    name: 'Canon 5D Mark III',
    type: 'Camera',
    description: 'My main camera for portraits and travel photography',
    icon: 'fa-camera',
  },
  {
    name: 'DJI Osmo Pocket 3',
    type: 'Gimbal Camera',
    description: 'Compact stabilized camera for video and street photography',
    icon: 'fa-video',
  },
  {
    name: 'DJI Mavic Pro',
    type: 'Drone',
    description: 'For aerial shots and cinematic drone footage',
    icon: 'fa-helicopter',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'aerial', label: 'Aerial / Drone' },
  { id: 'travel', label: 'Travel' },
  { id: 'street', label: 'Street' },
];

export default async function PhotographyPage() {
  const photos = await getPhotos();

  // Transform photos for the client component
  const formattedPhotos = photos.map((photo) => ({
    id: photo._id,
    title: photo.title || 'Untitled',
    image: urlFor(photo.image).width(800).height(600).url(),
    category: photo.category || 'other',
    location: photo.location,
    camera: photo.camera,
    featured: photo.featured,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 text-sm font-medium text-primary">
              Creative Outlet
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Photography
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              When I&apos;m not writing code, I&apos;m often behind a lens. A
              collection of moments captured during my travels and everyday
              explorations.
            </p>
          </div>
        </section>

        {/* Gear Section */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">My Gear</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {gear.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <i
                      className={`fa-solid ${item.icon} text-foreground`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PhotoGrid photos={formattedPhotos} categories={categories} />

        {/* CTA */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Want to collaborate?
            </h2>
            <p className="mb-8 text-muted-foreground">
              I&apos;m occasionally available for creative projects, events, and
              collaborations.
            </p>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Get in touch
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
