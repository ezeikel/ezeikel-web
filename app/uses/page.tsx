import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faDesktop,
  faLayerGroup,
  faVideo,
  faChair,
  faGamepad,
  faArrowUpRightFromSquare,
} from '@fortawesome/pro-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type UseItem = {
  name: string;
  description: string;
  href?: string;
};

type UseCategory = {
  title: string;
  icon: IconDefinition;
  description?: string;
  items: UseItem[];
};

const usesData: UseCategory[] = [
  {
    title: 'Editor & Terminal',
    icon: faCode,
    items: [
      {
        name: 'VS Code',
        description:
          'My editor of choice. Been using it since 2017. Fast, extensible, and the TypeScript support is unmatched.',
        href: 'https://code.visualstudio.com',
      },
      {
        name: 'Warp',
        description:
          "Modern terminal with AI built-in. Switched from iTerm2 and haven't looked back.",
        href: 'https://warp.dev',
      },
      {
        name: 'GitHub Copilot',
        description:
          'AI pair programmer. Genuinely speeds up my workflow, especially for boilerplate.',
        href: 'https://github.com/features/copilot',
      },
      {
        name: 'Fira Code',
        description:
          'Font with ligatures. Makes code look cleaner. Free alternative to Operator Mono.',
        href: 'https://github.com/tonsky/FiraCode',
      },
      {
        name: 'One Dark Pro',
        description:
          'My VS Code theme. Clean, easy on the eyes, good contrast.',
      },
    ],
  },
  {
    title: 'Desktop Apps',
    icon: faDesktop,
    items: [
      {
        name: 'Raycast',
        description:
          'Spotlight replacement on steroids. Snippets, window management, clipboard history - all in one.',
        href: 'https://raycast.com',
      },
      {
        name: 'Arc Browser',
        description:
          'Replaced Chrome. Spaces, split views, and the Little Arc feature is brilliant.',
        href: 'https://arc.net',
      },
      {
        name: 'Figma',
        description: 'For all design work. Mockups, thumbnails, app designs.',
        href: 'https://figma.com',
      },
      {
        name: 'Notion',
        description:
          'Second brain. Notes, content planning, project docs all live here.',
        href: 'https://notion.so',
      },
      {
        name: 'CleanShot X',
        description:
          'Screenshot and screen recording tool. Worth every penny for content creation.',
        href: 'https://cleanshot.com',
      },
      {
        name: '1Password',
        description:
          'Password manager. Shared vaults with family. CLI integration for dev work.',
        href: 'https://1password.com',
      },
    ],
  },
  {
    title: 'Development',
    icon: faLayerGroup,
    items: [
      {
        name: 'React / React Native',
        description:
          'My bread and butter. Building web and mobile apps for years now.',
        href: 'https://react.dev',
      },
      {
        name: 'Expo',
        description:
          'Makes React Native development actually enjoyable. EAS Build is a game changer.',
        href: 'https://expo.dev',
      },
      {
        name: 'Next.js',
        description:
          "Framework of choice for web apps. App Router + Server Components = chef's kiss.",
        href: 'https://nextjs.org',
      },
      {
        name: 'TypeScript',
        description:
          "Can't imagine writing JavaScript without it now. Types save so much debugging time.",
        href: 'https://typescriptlang.org',
      },
      {
        name: 'Tailwind CSS',
        description:
          "Utility-first CSS. Once you get it, you'll never go back to traditional CSS.",
        href: 'https://tailwindcss.com',
      },
      {
        name: 'Postgres',
        description:
          'Database of choice. Usually via Supabase or Neon for the DX.',
        href: 'https://postgresql.org',
      },
    ],
  },
  {
    title: 'Recording & Content',
    icon: faVideo,
    items: [
      {
        name: 'Sony A7C',
        description:
          'Main camera for videos. Compact full-frame. Great low light performance.',
        href: 'https://sony.co.uk',
      },
      {
        name: 'Sigma 24-70mm f/2.8',
        description:
          'Versatile lens that lives on my camera. Sharp and fast autofocus.',
      },
      {
        name: 'Shure SM7B',
        description:
          'The podcaster microphone. Sounds professional and forgiving on bad room acoustics.',
        href: 'https://shure.com',
      },
      {
        name: 'Elgato Wave XLR',
        description: 'Clean preamp, easy to use software. Powers the SM7B.',
        href: 'https://elgato.com',
      },
      {
        name: 'Elgato Key Light Air',
        description:
          'Two of these for my setup. App-controlled, edge-lit panels.',
        href: 'https://elgato.com',
      },
      {
        name: 'DaVinci Resolve',
        description:
          'Video editing. Free and incredibly powerful. Colour grading is elite.',
        href: 'https://blackmagicdesign.com/products/davinciresolve',
      },
    ],
  },
  {
    title: 'Desk Setup',
    icon: faChair,
    items: [
      {
        name: 'Apple MacBook Pro 16" M3 Max',
        description:
          'Main machine. 64GB RAM. Handles anything I throw at it without fans spinning.',
      },
      {
        name: 'Apple Studio Display',
        description:
          '27" 5K monitor. Expensive but the clarity is unmatched. Great webcam built-in.',
      },
      {
        name: 'Apple Magic Keyboard',
        description:
          'Touch ID version. Clean, minimal, works perfectly with macOS.',
      },
      {
        name: 'Logitech MX Master 3S',
        description:
          'Best mouse for productivity. Horizontal scroll wheel is essential for timelines.',
        href: 'https://logitech.com',
      },
      {
        name: 'Herman Miller Aeron',
        description:
          'Worth every penny for long coding sessions. My back thanks me.',
        href: 'https://hermanmiller.com',
      },
      {
        name: 'Fully Jarvis Standing Desk',
        description:
          'Sit-stand desk. Bamboo top. Smooth motor, good cable management.',
        href: 'https://fully.com',
      },
    ],
  },
  {
    title: 'Gaming',
    icon: faGamepad,
    items: [
      {
        name: 'PlayStation 5',
        description:
          'Main gaming platform. COD, Battlefield, Undisputed are in heavy rotation.',
      },
      {
        name: 'LG C3 55" OLED',
        description:
          'Gaming TV. 4K 120Hz, VRR support, incredible picture quality.',
        href: 'https://lg.com',
      },
      {
        name: 'SteelSeries Arctis Nova Pro',
        description:
          'Gaming headset. Dual wireless, hot-swap batteries, great audio.',
        href: 'https://steelseries.com',
      },
      {
        name: 'Backbone One',
        description:
          'Controller for iPhone gaming. Remote Play from PS5 anywhere.',
        href: 'https://playbackbone.com',
      },
    ],
  },
];

const UsesPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      {/* Hero */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 text-sm font-medium text-primary">/uses</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            What I Use
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A living document of the tools, software, and hardware I use daily
            for development, content creation, and gaming. I update this page
            whenever my setup changes.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Curious about something not listed?{' '}
            <Link
              href="/about"
              className="font-medium text-foreground underline decoration-primary/30 underline-offset-2 hover:text-primary hover:decoration-primary"
            >
              Get in touch
            </Link>{' '}
            and I&apos;ll add it.
          </p>
        </div>
      </section>

      {/* Uses Sections */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-16">
            {usesData.map((category) => (
              <div key={category.title}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="text-foreground"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>

                {/* Items List */}
                <ul className="space-y-6">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="border-l-2 border-border pl-4 hover:border-primary transition-colors"
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="ml-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </h3>
                        </a>
                      ) : (
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                      )}
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Note */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Some links may be affiliate links. If you purchase through them, I
            may earn a small commission at no extra cost to you. I only
            recommend products I genuinely use and love.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default UsesPage;
