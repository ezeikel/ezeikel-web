"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { useInView } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

const useCountUp = (end: number | string, duration = 2000, inView = false) => {
  const numericEnd = typeof end === "string" ? Number.parseInt(end.replace(/\D/g, ""), 10) : end
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!inView || Number.isNaN(numericEnd)) return
    
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * numericEnd))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [numericEnd, duration, inView])
  
  return count
}

type Highlight = {
  metric: string
  label: string
  description: string
}

const CareerHighlights = ({ highlights }: { highlights: Highlight[] }) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const years = useCountUp("5", 1500, isInView)
  const apps = useCountUp("2", 1500, isInView)
  const followers = useCountUp("100", 1500, isInView)
  
  const getAnimatedMetric = (metric: string, index: number) => {
    if (index === 0) return `${years}+`
    if (index === 1) return apps.toString()
    if (index === 2) return `${followers}K+`
    return metric
  }
  
  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Career Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <p className="mb-1 text-3xl font-bold text-foreground">
                {index < 3 ? getAnimatedMetric(item.metric, index) : item.metric}
              </p>
              <p className="mb-2 font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const expertise = [
  { skill: "React / React Native", level: "Expert" },
  { skill: "TypeScript", level: "Expert" },
  { skill: "Next.js", level: "Expert" },
  { skill: "AI / LLM Integration", level: "Advanced" },
  { skill: "Node.js", level: "Advanced" },
  { skill: "Fintech / Payments", level: "Advanced" },
  { skill: "PostgreSQL", level: "Advanced" },
  { skill: "AWS / Cloud", level: "Intermediate" },
]

const highlights = [
  {
    metric: "5+",
    label: "Years in Software Engineering",
    description: "Building production apps at scale",
  },
  {
    metric: "2",
    label: "Apps Shipped to App Stores",
    description: "From idea to live product",
  },
  {
    metric: "100K+",
    label: "Social Following",
    description: "Building in public, sharing knowledge",
  },
  {
    metric: "Senior",
    label: "Engineering Experience",
    description: "Leading projects and mentoring developers",
  },
]

const whatIBring = [
  {
    title: "Full-Stack Product Thinking",
    description: "I don't just write code - I understand product, UX, and how to ship features that users love.",
    icon: "fa-lightbulb",
  },
  {
    title: "Indie Hacker Mindset",
    description: "I've built and launched my own apps. I know how to move fast, prioritise, and get things done.",
    icon: "fa-rocket",
  },
  {
    title: "Content & Communication",
    description: "With 100K+ followers, I know how to explain complex topics simply and advocate for good practices.",
    icon: "fa-comments",
  },
  {
    title: "Continuous Learner",
    description: "Always exploring new tech, sharing what I learn, and bringing fresh ideas to the team.",
    icon: "fa-graduation-cap",
  },
]

const quickLinks = [
  { label: "Things I've Built", href: "/things-ive-built", icon: "fa-cube" },
  { label: "GitHub", href: "https://github.com/yourusername", icon: "fa-github", external: true, brand: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "fa-linkedin", external: true, brand: true },
  { label: "Content", href: "/content", icon: "fa-play" },
]

const HireMePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to opportunities
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                <i className="fa-solid fa-brain text-primary" aria-hidden="true" />
                AI & Fintech Specialist
              </div>
            </div>
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Senior Engineer in Fintech & AI
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
              I build AI-powered products and have deep experience in fintech. From early-stage startups 
              to established financial institutions, I&apos;ve shipped software that handles money, data, and 
              intelligent automation at scale.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="/cv.pdf" download>
                  <i className="fa-solid fa-download mr-2" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about#contact">
                  Get in Touch
                  <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Industry Experience */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Industry Experience</h2>
            <p className="mb-8 text-muted-foreground">
              I&apos;ve worked across the fintech and AI landscape, from regulated financial services to cutting-edge AI startups.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Fintech */}
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <i className="fa-solid fa-building-columns text-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Fintech</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Building financial products that move money, assess risk, and serve millions of customers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    Lendable
                  </span>
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    Clearstake
                  </span>
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    Barclays
                  </span>
                </div>
              </div>
              
              {/* AI */}
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <i className="fa-solid fa-brain text-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">AI & Machine Learning</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Shipping AI-powered features and products, from LLM integrations to intelligent automation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    AI Startups
                  </span>
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    LLM Apps
                  </span>
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                    Side Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Highlights */}
        <CareerHighlights highlights={highlights} />

        {/* Core Expertise */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Core Expertise</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {expertise.map((item) => (
                <div
                  key={item.skill}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-5 py-4"
                >
                  <span className="font-medium text-foreground">{item.skill}</span>
                  <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I Bring */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">What I Bring to a Team</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {whatIBring.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <i className={`fa-solid ${item.icon} text-lg text-foreground`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Learn More About Me</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <i className={`${link.brand ? "fa-brands" : "fa-solid"} ${link.icon} text-lg`} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    {link.label}
                    {link.external && (
                      <i className="fa-solid fa-arrow-up-right-from-square ml-1.5 text-xs text-muted-foreground" aria-hidden="true" />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* UAE Relocation */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <i className="fa-solid fa-plane text-foreground" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Relocating to UAE</h2>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    I&apos;m actively looking to relocate to <span className="font-medium text-foreground">Dubai</span> or{" "}
                    <span className="font-medium text-foreground">Abu Dhabi</span>. I visit twice a year and 
                    am serious about making it my permanent home. The UAE&apos;s booming fintech scene and AI investment 
                    make it the perfect next step for my career.
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Interested in roles at companies like <span className="text-foreground">Noon</span>,{" "}
                    <span className="text-foreground">Careem</span>, <span className="text-foreground">Property Finder</span>,{" "}
                    <span className="text-foreground">Wio</span>, or sovereign wealth funds like{" "}
                    <span className="text-foreground">ADIA</span>.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Fintech Startups
                    </span>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      AI Companies
                    </span>
                    <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                      Sovereign Wealth Funds
                    </span>
                    <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                      Remote or On-site
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Button asChild variant="outline">
                    <Link href="/about#globe">
                      See My Journey
                      <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Interested?</h2>
            <p className="mb-8 text-muted-foreground">
              I&apos;d love to hear about your opportunity. Let&apos;s chat about how I can contribute to your team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="mailto:hire@ezeikel.com">
                  <i className="fa-solid fa-envelope mr-2" aria-hidden="true" />
                  hire@ezeikel.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/cv.pdf" download>
                  <i className="fa-solid fa-file-pdf mr-2" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HireMePage
