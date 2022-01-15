import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/layout/layout";
import BlogList from "../components/blogList/blogList";

const BlogPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.edges.map(({ node }) => {
    const {
      body: {
        childMarkdownRemark: {
          excerpt,
          fields: {
            readingTime: { text: readingTime },
          },
        },
      },
      description: {
        childMarkdownRemark: { rawMarkdownBody: description },
      },
    } = node;
    const heroImage = getImage(node.heroImage);
    const { slug, tags, title } = node;

    return {
      title,
      excerpt,
      description,
      heroImage,
      readingTime,
      slug,
      tags,
    };
  });

  return (
    <Layout pageTitle="Blog">
      <div>
        <h1 className="font-display font-bold text-navy-blue mb-8 text-7xl">
          Writing
        </h1>
        <h2 className="text-navy-blue mb-8 font-normal text-3xl">
          A collection of my thoughts and blog posts.
        </h2>
      </div>
      <BlogList posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query BlogPageQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 180)
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
          heroImage {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          description {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`;

export default BlogPage;
