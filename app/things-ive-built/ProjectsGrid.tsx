'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/pro-solid-svg-icons';
import { cn } from '@/lib/utils';
import type { SanityProject } from '@/lib/sanity/types';

type ProjectsGridProps = {
  projects: SanityProject[];
  categories: string[];
};

export default function ProjectsGrid({
  projects,
  categories,
}: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((project) => {
      const cat = project.category || 'Experiments';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <>
      {/* Filter Tabs */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted-foreground">
              Filter:
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = categoryCounts[category] || 0;
                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                      activeCategory === category
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        'flex h-5 min-w-5 items-center justify-center rounded-full text-xs',
                        activeCategory === category
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

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                href={`/things-ive-built/${project.slug.current}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-sm"
              >
                <h2 className="mb-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h2>
                <p className="mb-2 text-sm font-medium text-primary/70">
                  {project.tagline}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {project.category || 'Experiments'}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      project.status === 'Live'
                        ? 'text-green-600'
                        : project.status === 'Beta'
                          ? 'text-amber-600'
                          : 'text-muted-foreground',
                    )}
                  >
                    {project.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="mb-4 text-4xl text-muted-foreground/50"
              />
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
