"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LinkItem = {
  id: string
  title: string
  url: string
  icon?: string
  featured?: boolean
  order: number
}

// Placeholder data - replace with your data source
const initialLinks: LinkItem[] = [
  {
    id: "1",
    title: "Latest YouTube Video",
    url: "https://youtube.com/@yourusername",
    icon: "fa-youtube",
    featured: true,
    order: 0,
  },
  {
    id: "2",
    title: "Follow me on TikTok",
    url: "https://tiktok.com/@yourusername",
    icon: "fa-tiktok",
    featured: false,
    order: 1,
  },
  {
    id: "3",
    title: "Connect on LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "fa-linkedin",
    featured: false,
    order: 2,
  },
]

const iconOptions = [
  { value: "fa-youtube", label: "YouTube" },
  { value: "fa-tiktok", label: "TikTok" },
  { value: "fa-instagram", label: "Instagram" },
  { value: "fa-twitter", label: "Twitter" },
  { value: "fa-linkedin", label: "LinkedIn" },
  { value: "fa-github", label: "GitHub" },
  { value: "fa-globe", label: "Website" },
  { value: "fa-mobile-screen", label: "App" },
  { value: "fa-car", label: "Car" },
  { value: "fa-microphone", label: "Microphone" },
  { value: "fa-briefcase", label: "Briefcase" },
  { value: "fa-envelope", label: "Email" },
  { value: "fa-link", label: "Link" },
]

const AdminLinksPage = () => {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)
  const [editingId, setEditingId] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      title: "",
      url: "",
      icon: "fa-link",
      featured: false,
    },
    onSubmit: async ({ value }) => {
      const newLink: LinkItem = {
        id: Date.now().toString(),
        title: value.title,
        url: value.url,
        icon: value.icon,
        featured: value.featured,
        order: links.length,
      }
      
      // TODO: Replace with your API call
      setLinks([...links, newLink])
      form.reset()
    },
  })

  const handleDelete = (id: string) => {
    // TODO: Replace with your API call
    setLinks(links.filter((link) => link.id !== id))
  }

  const handleToggleFeatured = (id: string) => {
    // TODO: Replace with your API call
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, featured: !link.featured } : link
      )
    )
  }

  const moveLink = (id: string, direction: "up" | "down") => {
    const index = links.findIndex((link) => link.id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === links.length - 1)
    ) {
      return
    }

    const newLinks = [...links]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]]
    
    // Update order values
    newLinks.forEach((link, i) => {
      link.order = i
    })
    
    // TODO: Replace with your API call
    setLinks(newLinks)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </Link>
              <h1 className="text-xl font-bold text-foreground">Manage Links</h1>
            </div>
            <Link href="/links" target="_blank">
              <Button variant="outline" size="sm">
                <i className="fa-solid fa-external-link mr-2" aria-hidden="true" />
                View Page
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Link Form */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Add New Link</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="space-y-4">
                {/* Title Field */}
                <form.Field
                  name="title"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "Title is required" : undefined,
                  }}
                >
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Title
                      </label>
                      <input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="e.g., Latest YouTube Video"
                        className={cn(
                          "w-full rounded-lg border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                          field.state.meta.errors.length > 0
                            ? "border-red-500"
                            : "border-border"
                        )}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-500">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* URL Field */}
                <form.Field
                  name="url"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "URL is required"
                      if (!value.startsWith("http") && !value.startsWith("/")) {
                        return "URL must start with http:// https:// or /"
                      }
                      return undefined
                    },
                  }}
                >
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        URL
                      </label>
                      <input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="https://youtube.com/watch?v=..."
                        className={cn(
                          "w-full rounded-lg border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                          field.state.meta.errors.length > 0
                            ? "border-red-500"
                            : "border-border"
                        )}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-1 text-sm text-red-500">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Icon Field */}
                <form.Field name="icon">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Icon
                      </label>
                      <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </form.Field>

                {/* Featured Toggle */}
                <form.Field name="featured">
                  {(field) => (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={field.state.value}
                        onClick={() => field.handleChange(!field.state.value)}
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          field.state.value ? "bg-primary" : "bg-secondary"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                            field.state.value && "translate-x-5"
                          )}
                        />
                      </button>
                      <label className="text-sm font-medium text-foreground">
                        Featured (highlight this link)
                      </label>
                    </div>
                  )}
                </form.Field>

                {/* Submit Button */}
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-plus mr-2" aria-hidden="true" />
                          Add Link
                        </>
                      )}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>

          {/* Links List */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Current Links ({links.length})
            </h2>
            <div className="space-y-3">
              {links.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                  <i className="fa-solid fa-link mb-2 text-2xl text-muted-foreground" aria-hidden="true" />
                  <p className="text-muted-foreground">No links yet. Add your first link!</p>
                </div>
              ) : (
                links.map((link, index) => (
                  <div
                    key={link.id}
                    className={cn(
                      "group rounded-xl border p-4 transition-colors",
                      link.featured
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          link.featured ? "bg-primary/10" : "bg-secondary"
                        )}
                      >
                        <i
                          className={`fa-brands ${link.icon} text-foreground`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">{link.title}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {link.url}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => moveLink(link.id, "up")}
                          disabled={index === 0}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                          aria-label="Move up"
                        >
                          <i className="fa-solid fa-chevron-up text-xs" aria-hidden="true" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => moveLink(link.id, "down")}
                          disabled={index === links.length - 1}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                          aria-label="Move down"
                        >
                          <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true" />
                        </button>

                        {/* Toggle Featured */}
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(link.id)}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                            link.featured
                              ? "text-primary hover:bg-primary/10"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                          aria-label={link.featured ? "Remove featured" : "Make featured"}
                        >
                          <i
                            className={`fa-${link.featured ? "solid" : "regular"} fa-star text-xs`}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(link.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <i className="fa-solid fa-trash text-xs" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminLinksPage
