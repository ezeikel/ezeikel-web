import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faCode,
  faBullhorn,
  faRocket,
  faVideo,
  faChartLine,
  faMicrophone,
  faLaptopCode,
  faUsers,
  faPodcast,
  faCalendarPlus,
  faEnvelope,
} from '@fortawesome/pro-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Speaking | Ezeikel Pemberton',
  description:
    'Book Ezeikel Pemberton for your next conference, meetup, or private workshop. Topics include React, React Native, TypeScript, and building in public.',
};

type Topic = {
  title: string;
  description: string;
  icon: IconDefinition;
  isBrand?: boolean;
};

const topics: Topic[] = [
  {
    title: 'React & React Native',
    description: 'Building performant, accessible apps for web and mobile.',
    icon: faReact,
    isBrand: true,
  },
  {
    title: 'TypeScript',
    description: 'Type-safe JavaScript that scales with your team.',
    icon: faCode,
  },
  {
    title: 'Building in Public',
    description: 'Growing an audience while shipping products.',
    icon: faBullhorn,
  },
  {
    title: 'Indie Hacking',
    description: 'From idea to App Store - the solo founder journey.',
    icon: faRocket,
  },
  {
    title: 'Content Creation for Devs',
    description: 'Turning your expertise into engaging content.',
    icon: faVideo,
  },
  {
    title: 'Career Growth',
    description: 'Navigating the path from junior to senior engineer.',
    icon: faChartLine,
  },
];

type Format = {
  title: string;
  duration: string;
  description: string;
  icon: IconDefinition;
};

const formats: Format[] = [
  {
    title: 'Conference Talk',
    duration: '30-45 min',
    description: 'Polished presentations for large audiences with Q&A.',
    icon: faMicrophone,
  },
  {
    title: 'Workshop',
    duration: '2-4 hours',
    description: 'Hands-on sessions where attendees build something real.',
    icon: faLaptopCode,
  },
  {
    title: 'Meetup / Lunch & Learn',
    duration: '20-30 min',
    description: 'Casual talks for smaller, more intimate groups.',
    icon: faUsers,
  },
  {
    title: 'Podcast / Interview',
    duration: '45-60 min',
    description: 'Conversations about tech, indie hacking, and content.',
    icon: faPodcast,
  },
];

const SpeakingPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      {/* Hero */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-sm font-medium text-primary">
            Available for Bookings
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Speaking & Workshops
          </h1>
          <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
            I love sharing what I&apos;ve learned about building apps, growing
            an audience, and navigating the tech industry. If you&apos;d like me
            to speak at your conference, run a workshop for your team, or appear
            on your podcast, I&apos;d love to hear from you.
          </p>
          <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
            I typically speak about{' '}
            <span className="font-medium text-foreground">React</span>,{' '}
            <span className="font-medium text-foreground">React Native</span>,{' '}
            <span className="font-medium text-foreground">TypeScript</span>,{' '}
            <span className="font-medium text-foreground">
              building in public
            </span>
            , and the{' '}
            <span className="font-medium text-foreground">
              indie hacker journey
            </span>
            .
          </p>
          <Button asChild size="lg">
            <a href="mailto:speaking@ezeikel.com">
              Get in touch
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Topics I Speak About
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <FontAwesomeIcon
                    icon={topic.icon}
                    className="text-foreground"
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Speaking Formats
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {formats.map((format) => (
              <div
                key={format.title}
                className="rounded-2xl border border-border/60 bg-card p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <FontAwesomeIcon
                      icon={format.icon}
                      className="text-foreground"
                    />
                  </div>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                    {format.duration}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {format.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Speaking - Placeholder */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Past & Upcoming
          </h2>
          <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/20 p-8 text-center">
            <FontAwesomeIcon
              icon={faCalendarPlus}
              className="mb-4 text-3xl text-muted-foreground/50"
            />
            <p className="mb-2 font-medium text-foreground">Coming soon</p>
            <p className="text-sm text-muted-foreground">
              Past talks and upcoming events will be listed here. Be the first
              to book me!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            Whether it&apos;s a conference keynote, a hands-on workshop, or a
            podcast chat, I&apos;d love to connect with your audience.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a href="mailto:speaking@ezeikel.com">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                speaking@ezeikel.com
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/media-kit">
                View Media Kit
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SpeakingPage;
