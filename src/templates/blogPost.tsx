import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import Layout from "../components/layout/layout";
import { Wrapper, Heading, ImageWrapper, Body } from "./blogPost.styled";

const BlogPost = ({ data }) => {
  const {
    title,
    body: {
      childMarkdownRemark: { html: body },
    },
  } = data.contentfulBlogPost;
  const heroImage = getImage(data.contentfulBlogPost.heroImage);

  return (
    <Layout>
      <Wrapper>
        <Helmet title={title} />
        <Heading>{title}</Heading>
        <ImageWrapper>
          <GatsbyImage
            image={heroImage}
            alt="hero image"
            placeholder="blurred"
            layout="fullWidth"
            objectFit="cover"
            objectPosition="center top"
            style={{}}
          />
        </ImageWrapper>
        <Body
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </Wrapper>
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
