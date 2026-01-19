'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faDatabase,
  faDiagramProject,
  faLeaf,
  faMobileScreen,
  faRobot,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faAws,
  faJs,
  faNodeJs,
  faReact,
  faShopify,
  faStripe,
} from '@fortawesome/free-brands-svg-icons';

type Tech = {
  name: string;
  icon: IconDefinition;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
};

const techStack: Tech[] = [
  // Frontend
  { name: 'React', icon: faReact, category: 'frontend' },
  { name: 'Next.js', icon: faReact, category: 'frontend' }, // Using React icon as placeholder
  { name: 'TypeScript', icon: faJs, category: 'frontend' }, // Using JS icon as placeholder
  { name: 'JavaScript', icon: faJs, category: 'frontend' },
  // Mobile
  { name: 'React Native', icon: faMobileScreen, category: 'mobile' },
  { name: 'Expo', icon: faMobileScreen, category: 'mobile' }, // Using mobile icon as placeholder
  // Backend
  { name: 'Node.js', icon: faNodeJs, category: 'backend' },
  { name: 'PostgreSQL', icon: faDatabase, category: 'backend' },
  { name: 'MongoDB', icon: faLeaf, category: 'backend' },
  // Tools & Integrations
  { name: 'Stripe', icon: faStripe, category: 'tools' },
  { name: 'Shopify', icon: faShopify, category: 'tools' },
  { name: 'AWS', icon: faAws, category: 'tools' },
  { name: 'Vercel', icon: faReact, category: 'tools' }, // Using React icon as placeholder
  { name: 'OpenAI', icon: faRobot, category: 'tools' },
  { name: 'GraphQL', icon: faDiagramProject, category: 'tools' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/50 bg-secondary/20 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Tech Stack
          </h2>
          <p className="text-lg text-foreground">
            Technologies I work with daily
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <FontAwesomeIcon
                icon={tech.icon}
                className="text-base text-muted-foreground transition-colors group-hover:text-primary"
              />
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* SEO-friendly text (visually hidden but readable by search engines) */}
        <p className="sr-only">
          Ezeikel Pemberton is a Senior Software Engineer specializing in React,
          React Native, Expo, TypeScript, JavaScript, Next.js, Node.js,
          PostgreSQL, MongoDB, Stripe, Shopify, AWS, Vercel, OpenAI, and GraphQL
          development. Based in London, UK.
        </p>
      </div>
    </section>
  );
};

export default TechStackSection;
