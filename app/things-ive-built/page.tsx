import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCube,
  faArrowRight,
  faPalette,
  faCode,
  faRocket,
  faMobile,
  faGlobe,
  faHeart,
  faMusic,
  faCamera,
  faGamepad,
  faBook,
  faShoppingCart,
  faUtensils,
  faDumbbell,
  faPlane,
  faCar,
  faHome,
  faBriefcase,
  faGraduationCap,
  faMedkit,
  faLeaf,
  faPaw,
  faStar,
  faBolt,
  faLightbulb,
  faChartLine,
  faUsers,
  faComments,
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faWallet,
  faCreditCard,
  faShieldAlt,
  faLock,
  faKey,
  faCloud,
  faDatabase,
  faServer,
  faCog,
  faWrench,
  faTools,
  faMagic,
  faGift,
  faTrophy,
  faMedal,
  faFlag,
  faBell,
  faEnvelope,
  faPhone,
  faVideo,
  faMicrophone,
  faHeadphones,
  faFilm,
  faImage,
  faFileAlt,
  faFolder,
  faSearch,
  faFilter,
  faSort,
  faEdit,
  faTrash,
  faPlus,
  faMinus,
  faCheck,
  faTimes,
  faInfo,
  faQuestion,
  faExclamation,
  faCircle,
  faSquare,
  faHexagon,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faAppStoreIos,
  faApple,
  faGooglePlay,
} from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity/client';
import { projectsQuery, publishedAppsQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';
import ProjectsGrid from './ProjectsGrid';
import ThisWebsiteShowcase from './ThisWebsiteShowcase';

// Map FontAwesome class names to icon definitions for dynamic icons from Sanity
const iconMap: Record<string, IconDefinition> = {
  'fa-cube': faCube,
  'fa-palette': faPalette,
  'fa-code': faCode,
  'fa-rocket': faRocket,
  'fa-mobile': faMobile,
  'fa-globe': faGlobe,
  'fa-heart': faHeart,
  'fa-music': faMusic,
  'fa-camera': faCamera,
  'fa-gamepad': faGamepad,
  'fa-book': faBook,
  'fa-shopping-cart': faShoppingCart,
  'fa-utensils': faUtensils,
  'fa-dumbbell': faDumbbell,
  'fa-plane': faPlane,
  'fa-car': faCar,
  'fa-home': faHome,
  'fa-briefcase': faBriefcase,
  'fa-graduation-cap': faGraduationCap,
  'fa-medkit': faMedkit,
  'fa-leaf': faLeaf,
  'fa-paw': faPaw,
  'fa-star': faStar,
  'fa-bolt': faBolt,
  'fa-lightbulb': faLightbulb,
  'fa-chart-line': faChartLine,
  'fa-users': faUsers,
  'fa-comments': faComments,
  'fa-calendar': faCalendar,
  'fa-clock': faClock,
  'fa-map-marker-alt': faMapMarkerAlt,
  'fa-wallet': faWallet,
  'fa-credit-card': faCreditCard,
  'fa-shield-alt': faShieldAlt,
  'fa-lock': faLock,
  'fa-key': faKey,
  'fa-cloud': faCloud,
  'fa-database': faDatabase,
  'fa-server': faServer,
  'fa-cog': faCog,
  'fa-wrench': faWrench,
  'fa-tools': faTools,
  'fa-magic': faMagic,
  'fa-gift': faGift,
  'fa-trophy': faTrophy,
  'fa-medal': faMedal,
  'fa-flag': faFlag,
  'fa-bell': faBell,
  'fa-envelope': faEnvelope,
  'fa-phone': faPhone,
  'fa-video': faVideo,
  'fa-microphone': faMicrophone,
  'fa-headphones': faHeadphones,
  'fa-film': faFilm,
  'fa-image': faImage,
  'fa-file-alt': faFileAlt,
  'fa-folder': faFolder,
  'fa-search': faSearch,
  'fa-filter': faFilter,
  'fa-sort': faSort,
  'fa-edit': faEdit,
  'fa-trash': faTrash,
  'fa-plus': faPlus,
  'fa-minus': faMinus,
  'fa-check': faCheck,
  'fa-times': faTimes,
  'fa-info': faInfo,
  'fa-question': faQuestion,
  'fa-exclamation': faExclamation,
  'fa-circle': faCircle,
  'fa-square': faSquare,
  'fa-hexagon': faHexagon,
};

const getIcon = (iconClass?: string): IconDefinition => {
  if (!iconClass) return faCube;
  return iconMap[iconClass] || faCube;
};

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
              {projects.length + 1} Projects
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

        {/* This Website Showcase */}
        <ThisWebsiteShowcase />

        {/* Published Apps - Featured Section */}
        {publishedApps.length > 0 && (
          <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FontAwesomeIcon
                    icon={faAppStoreIos}
                    className="text-lg text-primary"
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
                            <FontAwesomeIcon
                              icon={getIcon(app.icon)}
                              className="text-2xl"
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
                              <FontAwesomeIcon
                                icon={faApple}
                                className="mr-2"
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
                              <FontAwesomeIcon
                                icon={faGooglePlay}
                                className="mr-2"
                              />
                              Play Store
                            </a>
                          </Button>
                        )}
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/things-ive-built/${app.slug.current}`}>
                            View Details
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-2"
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
