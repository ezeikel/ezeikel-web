import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Layout from "../components/layout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-size: 6.1rem;
  line-height: 54px;
  font-family: var(--font-family-tertiary);
  font-weight: 500;
  text-align: center;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 472px;
  margin-bottom: var(--spacing-huge);
`;

const Body = styled.div`
  color: var(--color-secondary);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-tertiary);
    margin: 0 0 var(--spacing-huge);
    font-weight: 500;
    color: var(--color-primary);
  }
  h2 {
    font-size: 3.125rem;
  }
  h3 {
    font-size: 2.5rem;
  }
  p,
  ul,
  ol {
    font-size: 2.1rem;
    font-weight: 400;
    line-height: 1.5;
  }
  p {
    margin: 0;
    & + p {
      margin-top: var(--spacing-large);
    }
    & + h1,
    & + h2,
    & + h3 {
      margin-top: var(--spacing-large);
    }
  }
  ul,
  ol {
    margin: var(--spacing-large) 0;
    list-style-type: initial;
  }
  a {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const BlogPost = ({ data }) => {
  console.log({ data });

  const title = data.contentfulBlogPost.title;
  const body = data.contentfulBlogPost.body.childMarkdownRemark.html;
  const heroImage = getImage(data.contentfulBlogPost.heroImage);
  // const publishDate = data.contentfulBlogPost.publishDate;
  // const tags = data.contentfulBlogPost.tags;

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
