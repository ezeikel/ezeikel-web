import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short description of the post for previews',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'object',
      fields: [
        defineField({
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
        defineField({
          name: 'credit',
          title: 'Image Credit',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            withFilename: true,
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Scheduled', value: 'scheduled' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        }),
      ],
    }),
    defineField({
      name: 'generationMeta',
      title: 'Generation Metadata',
      type: 'object',
      description: 'Metadata about AI-generated content',
      fields: [
        defineField({
          name: 'isGenerated',
          title: 'AI Generated',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'topic',
          title: 'Topic',
          type: 'string',
        }),
        defineField({
          name: 'generatedAt',
          title: 'Generated At',
          type: 'datetime',
        }),
        defineField({
          name: 'model',
          title: 'Model Used',
          type: 'string',
        }),
        defineField({
          name: 'imageSource',
          title: 'Image Source',
          type: 'string',
          options: {
            list: [
              { title: 'Manual', value: 'manual' },
              { title: 'Pexels', value: 'pexels' },
              { title: 'Gemini', value: 'gemini' },
              { title: 'DALL-E', value: 'dalle' },
            ],
          },
        }),
        defineField({
          name: 'pexelsPhotoId',
          title: 'Pexels Photo ID',
          type: 'string',
          description: 'Used for deduplication',
        }),
        defineField({
          name: 'imagePrompt',
          title: 'Image Generation Prompt',
          type: 'text',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage.asset',
      status: 'status',
    },
    prepare({ title, author, media, status }) {
      const statusEmoji =
        status === 'published' ? '✅' : status === 'scheduled' ? '📅' : '📝';
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: author ? `by ${author}` : 'No author',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
