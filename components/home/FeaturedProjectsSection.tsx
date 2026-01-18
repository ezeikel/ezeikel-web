"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type Project = {
  id: string
  name: string
  tagline: string
  description: string
  techStack: string[]
  href: string
  status: "Live" | "Beta" | "Coming Soon"
  category: string
}

const projects: Project[] = [
  {
    id: "chunky-crayon",
    name: "Chunky Crayon",
    tagline: "A delightful colouring app for kids",
    description: "Digital colouring designed for little hands. Large tools, curated illustrations, and zero ads.",
    techStack: ["React Native", "Expo", "TypeScript"],
    href: "/things-ive-built/chunky-crayon",
    status: "Live",
    category: "Consumer App",
  },
  {
    id: "parking-ticket-pal",
    name: "Parking Ticket Pal",
    tagline: "Never miss a deadline again",
    description: "Track, manage, and appeal UK parking tickets with AI-powered letter generation.",
    techStack: ["React Native", "Expo", "AI"],
    href: "/things-ive-built/parking-ticket-pal",
    status: "Live",
    category: "Consumer App",
  },
  {
    id: "devlog-cli",
    name: "DevLog CLI",
    tagline: "Track coding progress from terminal",
    description: "A developer journal that lives where you work. Log, track streaks, and export for standups.",
    techStack: ["Node.js", "TypeScript", "SQLite"],
    href: "/things-ive-built/devlog-cli",
    status: "Beta",
    category: "Dev Tool",
  },
  {
    id: "next-project",
    name: "Something New",
    tagline: "Currently in stealth mode",
    description: "Combining AI and developer productivity. Subscribe to get updates when it launches.",
    techStack: ["Next.js", "AI"],
    href: "/things-ive-built",
    status: "Coming Soon",
    category: "Experiment",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
}

const FeaturedProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/40"
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-12"
        >
          <p className="mb-2 text-sm font-medium text-primary">{projects.length} Projects</p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Things I&apos;ve Built
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            A collection of apps, tools, and experiments I&apos;m always tending to.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
            >
              <Link
                href={project.href}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-border hover:shadow-sm"
              >
                <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-xs font-medium text-muted-foreground">
                    {project.category}
                  </span>
                  <span className={`text-xs font-medium ${
                    project.status === "Live" 
                      ? "text-green-600" 
                      : project.status === "Beta"
                      ? "text-amber-600"
                      : "text-muted-foreground"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div variants={cardVariants}>
            <Link
              href="/things-ive-built"
              className="group flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-transparent p-6 transition-all duration-300 hover:border-primary/50 hover:bg-secondary/30"
            >
              <i className="fa-solid fa-arrow-right mb-3 text-xl text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                View all projects
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjectsSection
