import { useStaticQuery, graphql } from "gatsby";

const useLatesPosts = () => {
  const { allContentfulBlogPost } = useStaticQuery(
    graphql`
      query Posts {
        allContentfulBlogPost(
          limit: 6
          sort: { fields: [publishDate], order: DESC }
        ) {
          edges {
            node {
              title
              body {
                childMarkdownRemark {
                  excerptAst(pruneLength: 180)
                  fields {
                    readingTime {
                      text
                    }
                  }
                }
              }
              slug
              publishDate(formatString: "MMMM Do, YYYY")
              tags
              description {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `
  );

  return allContentfulBlogPost.edges
    .map((edge) => edge.node)
    .map((post) => {
      // doing this to remove heading from excerpt
      const paragraphs = post.body.childMarkdownRemark?.excerptAst.children.filter(
        (element) => element.tagName === "p"
      );

      let firstParagraph;

      if (paragraphs.length) {
        firstParagraph = paragraphs[0].children[0].value;
      }

      return {
        ...post,
        excerpt: firstParagraph,
        readingTime: post.body.childMarkdownRemark?.fields.readingTime.text,
      };
    });
};

export default useLatesPosts;
