import { PortableText, type PortableTextComponents } from 'next-sanity';
import type { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={urlFor(value.asset).width(800).url()}
              alt={value.alt || ''}
              width={800}
              height={450}
              className="h-auto w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-secondary p-4">
        {value.filename && (
          <div className="mb-2 text-xs text-muted-foreground">
            {value.filename}
          </div>
        )}
        <code className="font-mono text-sm text-foreground">{value.code}</code>
      </pre>
    ),
  },
};

type PortableTextContentProps = {
  value: PortableTextBlock[];
};

export default function PortableTextContent({ value }: PortableTextContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
