"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="border-t border-border bg-primary/5 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mb-2 flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
          >
            <i className="fa-solid fa-envelope text-xl text-primary" aria-hidden="true" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          Get dev & indie app updates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 text-muted-foreground"
        >
          Join the newsletter for behind-the-scenes content, new project announcements, and coding tips. No spam,
          unsubscribe anytime.
        </motion.p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
              className="rounded-lg bg-green-100 p-4 text-green-700"
            >
              <motion.i
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="fa-solid fa-check-circle mr-2"
                aria-hidden="true"
              />
              Thanks for subscribing! Check your inbox to confirm.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-3 sm:flex-row"
            >
              <motion.div
                animate={{
                  boxShadow: isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.2)" : "0 0 0 0px rgba(59, 130, 246, 0)",
                }}
                transition={{ duration: 0.2 }}
                className="flex-grow rounded-md"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="bg-background"
                />
              </motion.div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-7 left-0 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
              <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                <Button type="submit" className="font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default NewsletterSection
