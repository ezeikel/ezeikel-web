'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'ezeikel-web-studio',
  title: 'ezeikel.dev Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    codeInput(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.divider(),
            S.listItem()
              .title('Authors')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
            S.divider(),
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('Books')
              .schemaType('book')
              .child(S.documentTypeList('book').title('Books')),
            S.listItem()
              .title('Equipment')
              .schemaType('equipment')
              .child(S.documentTypeList('equipment').title('Equipment')),
            S.listItem()
              .title('Photos')
              .schemaType('photo')
              .child(S.documentTypeList('photo').title('Photos')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
