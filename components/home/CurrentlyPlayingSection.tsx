"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const games = [
  { title: "Call of Duty", subtitle: "Warzone / Black Ops 6" },
  { title: "Battlefield 2042", subtitle: "Conquest" },
  { title: "Undisputed", subtitle: "Boxing" },
]

const PSN_TAG = "YourPSNTag"
const TWITCH_URL = "https://twitch.tv/yourusername"

// Update with your latest stream VOD
const LATEST_STREAM = {
  title: "Late Night Warzone Ranked Grind",
  thumbnail: "/stream-thumbnail.jpg",
  duration: "2:34:18",
  date: "3 days ago",
  url: "https://twitch.tv/yourusername/videos",
}

const CurrentlyPlayingSection = () => {
  const [copied, setCopied] = useState(false)

  const copyPSN = async () => {
    await navigator.clipboard.writeText(PSN_TAG)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="rounded-2xl border border-border/60 bg-card overflow-hidden"
        >
          <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">
            {/* Left - Latest Stream Video */}
            <Link
              href={LATEST_STREAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video md:aspect-auto md:h-full bg-secondary"
            >
              <Image
                src={LATEST_STREAM.thumbnail || "/placeholder.svg"}
                alt={LATEST_STREAM.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white">
                  <i className="fa-solid fa-play ml-1" aria-hidden="true" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                {LATEST_STREAM.duration}
              </div>
              {/* Twitch badge */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                <i className="fa-brands fa-twitch" aria-hidden="true" />
                VOD
              </div>
            </Link>

            {/* Right - Info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col h-full">
                {/* Stream info */}
                <div className="mb-6">
                  <Link
                    href={LATEST_STREAM.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <p className="text-xs font-medium text-purple-500 mb-1">Latest Stream</p>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {LATEST_STREAM.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{LATEST_STREAM.date}</p>
                  </Link>
                </div>

                {/* Currently Playing */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-gamepad text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium text-muted-foreground">Currently Playing</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {games.map((game) => (
                      <div
                        key={game.title}
                        className="rounded-lg bg-secondary/70 px-3 py-2"
                      >
                        <p className="text-sm font-medium text-foreground">{game.title}</p>
                        <p className="text-xs text-muted-foreground">{game.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PSN and Twitch */}
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={copyPSN}
                    className="group flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-colors hover:border-primary/50"
                  >
                    <i className="fa-brands fa-playstation text-blue-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{PSN_TAG}</span>
                    {copied ? (
                      <i className="fa-solid fa-check text-xs text-green-500" aria-hidden="true" />
                    ) : (
                      <i className="fa-regular fa-copy text-xs text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
                    )}
                  </button>

                  <Link
                    href={TWITCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                  >
                    <i className="fa-brands fa-twitch" aria-hidden="true" />
                    <span>Follow on Twitch</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CurrentlyPlayingSection
