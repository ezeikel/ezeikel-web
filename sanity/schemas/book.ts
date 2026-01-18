import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Reading Status',
      type: 'string',
      options: {
        list: [
          { title: 'Currently Reading', value: 'currently-reading' },
          { title: 'Finished', value: 'finished' },
          { title: 'Want to Read', value: 'want-to-read' },
        ],
      },
      initialValue: 'want-to-read',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'takeaway',
      title: 'Key Takeaway',
      type: 'text',
      rows: 3,
      description: 'A brief summary of what you learned or liked about this book',
    }),
    defineField({
      name: 'review',
      title: 'Full Review',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'goodreadsUrl',
      title: 'Goodreads URL',
      type: 'url',
    }),
    defineField({
      name: 'amazonUrl',
      title: 'Amazon URL',
      type: 'url',
    }),
    defineField({
      name: 'finishedAt',
      title: 'Finished At',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fiction', value: 'fiction' },
          { title: 'Self-Improvement', value: 'self-improvement' },
          { title: 'Tech & Business', value: 'tech-business' },
          { title: 'Biography', value: 'biography' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'favorite',
      title: 'All-Time Favorite',
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
      author: 'author',
      status: 'status',
      media: 'cover',
    },
    prepare({ title, author, status, media }) {
      const statusEmoji =
        status === 'currently-reading'
          ? '📖'
          : status === 'finished'
            ? '✅'
            : '📚';
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: author,
        media,
      };
    },
  },
});
