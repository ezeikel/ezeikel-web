import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout/layout";

const BlogPost = ({ data }) => {
  const {
    title,
    body: {
      childMarkdownRemark: { html: body },
    },
  } = data.contentfulBlogPost;
  const heroImage = getImage(data.contentfulBlogPost.heroImage);

  return (
    <Layout pageTitle={title}>
      <div className="flex flex-col">
        <h1 className="text-6xl font-medium text-center text-navy-blue mb-16 font-blog">
          {title}
        </h1>
        <div className="flex flex-col max-h-[472px] mb-16">
          <GatsbyImage
            image={heroImage}
            alt="hero image"
            className="object-cover object-top"
          />
        </div>
        <div
          className="blog-post-body"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH)
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      tags
    }
  }
`;

export default BlogPost;
