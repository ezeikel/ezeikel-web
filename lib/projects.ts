export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  iconBg: string;
  techStack: string[];
  status: 'Live' | 'Beta' | 'Coming Soon' | 'Experiment';
  category: 'Consumer Apps' | 'Dev Tools' | 'Experiments';
  features: string[];
  links: {
    website?: string;
    appStore?: string;
    playStore?: string;
    github?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  role: string[];
  screenshots: string[];
  problem: string;
  solution: string;
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'chunky-crayon',
    name: 'Chunky Crayon',
    tagline: 'A delightful colouring app for kids',
    description:
      'Chunky Crayon is a digital colouring app designed specifically for young children. With large, easy-to-use tools and a curated library of age-appropriate illustrations, it makes creative play accessible and fun for little hands.',
    icon: 'fa-palette',
    iconBg: 'bg-pink-100 text-pink-600',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Skia'],
    status: 'Live',
    category: 'Consumer Apps',
    features: [
      'Intuitive touch controls designed for small fingers',
      '50+ curated colouring pages for different age groups',
      'Kid-safe with no ads or in-app purchases',
      'Save and share completed artwork',
    ],
    links: {
      website: 'https://chunkycrayon.app',
      appStore: 'https://apps.apple.com/app/chunky-crayon',
      playStore:
        'https://play.google.com/store/apps/details?id=com.chunkycrayon',
    },
    metrics: [
      { label: 'Downloads', value: '25K+' },
      { label: 'Rating', value: '4.8' },
      { label: 'Reviews', value: '500+' },
    ],
    role: ['Product Design', 'Development', 'Marketing'],
    screenshots: [
      '/chunky-crayon-screenshot-1.jpg',
      '/chunky-crayon-screenshot-2.jpg',
    ],
    problem:
      'Most colouring apps are designed for adults or older children, with tiny buttons and complex features that frustrate young kids and their parents.',
    solution:
      'I built Chunky Crayon with oversized touch targets, simple gestures, and a carefully curated library of illustrations that are engaging but not overstimulating for toddlers and young children.',
  },
  {
    id: '2',
    slug: 'parking-ticket-pal',
    name: 'Parking Ticket Pal',
    tagline: 'Never miss a parking ticket deadline again',
    description:
      'Parking Ticket Pal helps UK drivers track, manage, and appeal parking tickets. Upload a photo of your ticket, get automatic deadline reminders, and access appeal letter templates to fight unfair fines.',
    icon: 'fa-car',
    iconBg: 'bg-blue-100 text-blue-600',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'Postgres',
      'Stripe',
      'AI',
    ],
    status: 'Live',
    category: 'Consumer Apps',
    features: [
      'OCR scanning to extract ticket details from photos',
      'Automatic deadline tracking and push notifications',
      'AI-powered appeal letter generation',
      'Success rate tracking and analytics',
    ],
    links: {
      website: 'https://parkingticketpal.co.uk',
      appStore: 'https://apps.apple.com/app/parking-ticket-pal',
      playStore:
        'https://play.google.com/store/apps/details?id=com.parkingticketpal',
    },
    metrics: [
      { label: 'Users', value: '8K+' },
      { label: 'Appeals Filed', value: '2.5K' },
      { label: 'Success Rate', value: '67%' },
    ],
    role: ['Product Design', 'Full-Stack Development', 'AI Integration'],
    screenshots: [
      '/parking-ticket-pal-screenshot-1.jpg',
      '/parking-ticket-pal-screenshot-2.jpg',
    ],
    problem:
      "Parking tickets in the UK have strict deadlines and confusing appeal processes. Many people pay fines they could have successfully appealed simply because they missed a deadline or didn't know how to respond.",
    solution:
      'I created an app that uses AI to scan tickets, track deadlines, and generate professional appeal letters based on common grounds for dismissal, making the appeal process accessible to everyone.',
  },
  {
    id: '3',
    slug: 'devlog-cli',
    name: 'DevLog CLI',
    tagline: 'Track your coding progress from the terminal',
    description:
      'A command-line tool for developers who want to maintain a coding journal without leaving their terminal. Log what you worked on, track streaks, and export summaries for standups.',
    icon: 'fa-terminal',
    iconBg: 'bg-green-100 text-green-600',
    techStack: ['Node.js', 'TypeScript', 'SQLite'],
    status: 'Beta',
    category: 'Dev Tools',
    features: [
      'Quick logging with natural language input',
      'Streak tracking and productivity stats',
      'Export to Markdown for sharing',
      'Git integration for automatic context',
    ],
    links: {
      github: 'https://github.com/ezeikel/devlog-cli',
    },
    role: ['Development'],
    screenshots: [],
    problem:
      'Keeping a developer journal is valuable for reflection and standups, but switching to a separate app breaks focus and workflow.',
    solution:
      'DevLog CLI lets developers log their work in seconds without leaving the terminal, with smart defaults that capture context from the current git repository.',
  },
  {
    id: '4',
    slug: 'next-project',
    name: 'Something New',
    tagline: 'Currently in stealth mode',
    description:
      "I'm working on something exciting that combines AI and developer productivity. Stay tuned for updates by following me on social media or subscribing to the newsletter.",
    icon: 'fa-rocket',
    iconBg: 'bg-purple-100 text-purple-600',
    techStack: ['React', 'Next.js', 'AI', 'Postgres'],
    status: 'Coming Soon',
    category: 'Experiments',
    features: ['Coming soon...'],
    links: {},
    role: ['Everything'],
    screenshots: [],
    problem: 'To be revealed...',
    solution: 'To be revealed...',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
};
