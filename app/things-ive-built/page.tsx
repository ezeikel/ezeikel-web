import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity/client';
import { projectsQuery, publishedAppsQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';
import ProjectsGrid from './ProjectsGrid';

export const revalidate = 3600;

async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(projectsQuery);
}

async function getPublishedApps(): Promise<SanityProject[]> {
  return client.fetch(publishedAppsQuery);
}

export default async function ThingsIveBuiltPage() {
  const [projects, publishedApps] = await Promise.all([
    getProjects(),
    getPublishedApps(),
  ]);

  const categories = ['All', 'Consumer Apps', 'Dev Tools', 'Experiments'];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-2 text-sm font-medium text-primary">
              {projects.length} Projects
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Things I&apos;ve Built
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A collection of apps, tools, and experiments I&apos;m always
              tending to.
            </p>
          </div>
        </section>

        {/* Published Apps - Featured Section */}
        {publishedApps.length > 0 && (
          <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <i
                    className="fa-brands fa-app-store-ios text-lg text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Published Apps
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    React Native apps live on the App Store & Play Store
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {publishedApps.map((app) => (
                  <div
                    key={app._id}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-md"
                  >
                    {/* App Header */}
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${app.iconBg || 'bg-primary/10 text-primary'}`}
                          >
                            <i
                              className={`fa-solid text-2xl ${app.icon || 'fa-cube'}`}
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {app.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {app.tagline}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Live
                        </span>
                      </div>

                      <p className="mb-4 text-muted-foreground">
                        {app.description}
                      </p>

                      {/* Tech Stack */}
                      {app.technologies && app.technologies.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {app.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metrics */}
                      {app.metrics && app.metrics.length > 0 && (
                        <div className="mb-4 flex gap-6 rounded-xl border border-border/50 bg-secondary/50 p-4">
                          {app.metrics.map((metric) => (
                            <div key={metric.label}>
                              <p className="text-xl font-bold text-foreground">
                                {metric.value}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Download Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {app.appStoreUrl && (
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={app.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa-brands fa-apple mr-2"
                                aria-hidden="true"
                              />
                              App Store
                            </a>
                          </Button>
                        )}
                        {app.playStoreUrl && (
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={app.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa-brands fa-google-play mr-2"
                                aria-hidden="true"
                              />
                              Play Store
                            </a>
                          </Button>
                        )}
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/things-ive-built/${app.slug.current}`}>
                            View Details
                            <i
                              className="fa-solid fa-arrow-right ml-2"
                              aria-hidden="true"
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ProjectsGrid projects={projects} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
