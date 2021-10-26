import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/layout/layout";
import BlogList from "../components/blogList/blogList";
import { Heading, Subheading } from "./blog.styled";

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
        <Heading>Writing</Heading>
        <Subheading>A collection of my thoughts and blog posts.</Subheading>
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
