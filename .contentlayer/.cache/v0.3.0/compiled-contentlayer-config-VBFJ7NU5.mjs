// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
var computedFields = {
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw)
  },
  slug: {
    type: "string",
    // eslint-disable-next-line no-underscore-dangle
    resolve: (doc) => doc._raw.flattenedPath
  },
  structuredData: {
    type: "object",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image ? `https://ezeikel.com${doc.image}` : `https://ezeikel.com/api/og?title=${doc.title}`,
      // eslint-disable-next-line no-underscore-dangle
      url: `https://ezeikel.com/blog/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: "Ezeikel Pemberton"
      }
    })
  }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  // BUG: using useMDXComponent from next-contentlayer/hooks doesn't seem to work
  // contentType: 'mdx',
  fields: {
    title: {
      type: "string",
      required: true
    },
    publishedAt: {
      type: "string",
      required: true
    },
    summary: {
      type: "string",
      required: true
    },
    image: {
      type: "string"
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post]
  // mdx: {
  //   remarkPlugins: [remarkGfm],
  //   rehypePlugins: [
  //     rehypeSlug,
  //     [
  //       rehypePrettyCode,
  //       {
  //         theme: 'one-dark-pro',
  //         onVisitLine(node) {
  //           // Prevent lines from collapsing in `display: grid` mode, and allow empty
  //           // lines to be copy/pasted
  //           if (node.children.length === 0) {
  //             node.children = [{ type: 'text', value: ' ' }];
  //           }
  //         },
  //         onVisitHighlightedLine(node) {
  //           node.properties.className.push('line--highlighted');
  //         },
  //         onVisitHighlightedWord(node) {
  //           node.properties.className = ['word--highlighted'];
  //         },
  //       },
  //     ],
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         properties: {
  //           className: ['anchor'],
  //         },
  //       },
  //     ],
  //   ],
  // },
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-VBFJ7NU5.mjs.map
