import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Layout from "../components/layout";
import BlogList from "../components/blogList";

const Heading = styled.h1`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-large);
`;

const Subheading = styled.h2`
  font-size: 3.125rem;
  color: var(--color-primary);
  margin: 0 0 var(--spacing-large);
  font-weight: 400;
`;

const BlogPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.edges.map(({ node }) => {
    const excerpt = node.body.childMarkdownRemark.excerpt;
    const description = node.description.childMarkdownRemark.rawMarkdownBody;
    const readingTime = node.body.childMarkdownRemark.fields.readingTime.text;
    const heroImage = getImage(node.heroImage);
    const slug = node.slug;
    const tags = node.tags;
    const title = node.title;

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
