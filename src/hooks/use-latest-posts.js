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
                  excerpt(pruneLength: 280)
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
      return {
        ...post,
        excerpt: post.body.childMarkdownRemark.excerpt,
        readingTime: post.body.childMarkdownRemark.fields.readingTime.text,
      };
    });
};

export default useLatesPosts;
