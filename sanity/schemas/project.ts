import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short one-liner about the project',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'FontAwesome icon class (e.g., fa-palette)',
    }),
    defineField({
      name: 'iconBg',
      title: 'Icon Background',
      type: 'string',
      description: 'Tailwind classes for icon background (e.g., bg-pink-100 text-pink-600)',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'Live' },
          { title: 'Beta', value: 'Beta' },
          { title: 'Coming Soon', value: 'Coming Soon' },
          { title: 'Experiment', value: 'Experiment' },
          { title: 'Archived', value: 'Archived' },
        ],
      },
      initialValue: 'Live',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Consumer Apps', value: 'Consumer Apps' },
          { title: 'Dev Tools', value: 'Dev Tools' },
          { title: 'Experiments', value: 'Experiments' },
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'appStoreUrl',
      title: 'App Store URL',
      type: 'url',
    }),
    defineField({
      name: 'playStoreUrl',
      title: 'Play Store URL',
      type: 'url',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'role',
      title: 'My Role',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'logo',
    },
    prepare({ title, status, media }) {
      const statusEmoji =
        status === 'Live'
          ? '🟢'
          : status === 'Beta'
            ? '🟡'
            : status === 'Coming Soon'
              ? '🔵'
              : '⚫';
      return {
        title: `${statusEmoji} ${title}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
