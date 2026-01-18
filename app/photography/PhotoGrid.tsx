'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

type Photo = {
  id: string;
  title: string;
  image: string;
  category: string;
  location?: string;
  camera?: string;
  featured?: boolean;
};

type Category = {
  id: string;
  label: string;
};

type PhotoGridProps = {
  photos: Photo[];
  categories: Category[];
};

export default function PhotoGrid({ photos, categories }: PhotoGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((photo) => photo.category === activeCategory);
  }, [photos, activeCategory]);

  return (
    <>
      {/* Filter Tabs */}
      <section className="border-b border-border py-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeCategory === category.id
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {filteredPhotos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border border-border/60 bg-secondary',
                    (index === 0 || index === 5) &&
                      'sm:col-span-2 sm:row-span-2',
                  )}
                >
                  <div
                    className={cn(
                      'relative',
                      index === 0 || index === 5
                        ? 'aspect-square sm:aspect-[4/3]'
                        : 'aspect-[4/3]',
                    )}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="font-medium text-white">{photo.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-white/70">
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <i
                            className="fa-solid fa-location-dot"
                            aria-hidden="true"
                          />
                          {photo.location}
                        </span>
                      )}
                      {photo.camera && (
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-camera" aria-hidden="true" />
                          {photo.camera}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <i
                className="fa-solid fa-camera mb-4 text-4xl text-muted-foreground/50"
                aria-hidden="true"
              />
              <p className="text-muted-foreground">
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
