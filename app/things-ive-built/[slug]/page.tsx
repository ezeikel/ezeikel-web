import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faGlobe,
  faImage,
  faCircleExclamation,
  faLightbulb,
  faCheck,
  faBookOpen,
  faEnvelope,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faApple,
  faGooglePlay,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity/client';
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

export const revalidate = 3600;

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string): Promise<SanityProject | null> {
  return client.fetch(projectBySlugQuery, { slug });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Ezeikel Pemberton`,
    description: project.tagline || project.description,
    openGraph: {
      title: project.title,
      description: project.tagline || project.description || '',
      type: 'website',
      images: project.image
        ? [
            {
              url: urlFor(project.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/things-ive-built" className="hover:text-primary">
                Things I&apos;ve Built
              </Link>
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
              <span className="text-foreground">{project.title}</span>
            </nav>

            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {project.category && (
                    <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground">
                      {project.category}
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-sm font-medium',
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

                <div>
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {project.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-lg text-muted-foreground">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {project.url && (
                    <Button asChild>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  {project.appStoreUrl && (
                    <Button asChild variant="outline">
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faApple} className="mr-2" />
                        App Store
                      </a>
                    </Button>
                  )}
                  {project.playStoreUrl && (
                    <Button asChild variant="outline">
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faGooglePlay} className="mr-2" />
                        Play Store
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button asChild variant="outline">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex gap-8 rounded-xl border border-border bg-secondary/50 p-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-3xl font-bold text-foreground">
                          {metric.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Screenshots */}
              <div className="space-y-4">
                {project.screenshots && project.screenshots.length > 0 ? (
                  project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                    >
                      <img
                        src={urlFor(screenshot.asset).width(800).url()}
                        alt={
                          screenshot.alt ||
                          `${project.title} screenshot ${index + 1}`
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-secondary/50">
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="mb-4 text-4xl text-muted-foreground/50"
                      />
                      <p className="text-muted-foreground">
                        Screenshots coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        {(project.problem || project.solution) && (
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-8 md:grid-cols-2">
                {project.problem && (
                  <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          className="text-foreground"
                        />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        The Problem
                      </h2>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className="text-foreground"
                        />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">
                        The Solution
                      </h2>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
                Key Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* My Role */}
        {project.role && project.role.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
                My Role
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.role.map((role) => (
                  <span
                    key={role}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-muted-foreground"
                    />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Interested in this project?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Read more about the development process on my blog or get in touch
              to discuss.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                  Read the blog
                </Link>
              </Button>
              <Button asChild>
                <Link href="/about#contact">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Get in touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
