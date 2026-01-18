import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'takenAt',
      title: 'Taken At',
      type: 'date',
    }),
    defineField({
      name: 'camera',
      title: 'Camera',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Aerial / Drone', value: 'aerial' },
          { title: 'Travel', value: 'travel' },
          { title: 'Street', value: 'street' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Nature', value: 'nature' },
          { title: 'Architecture', value: 'architecture' },
          { title: 'Other', value: 'other' },
        ],
      },
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
      location: 'location',
      media: 'image',
    },
    prepare({ title, location, media }) {
      return {
        title: title || 'Untitled',
        subtitle: location,
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
    {
      title: 'Date Taken',
      name: 'takenAtDesc',
      by: [{ field: 'takenAt', direction: 'desc' }],
    },
  ],
});
