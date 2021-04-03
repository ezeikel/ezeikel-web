import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";

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

const BlogPage = () => {
  return (
    <Layout pageTitle="Blog">
      <div>
        <Heading>Writing</Heading>
        <Subheading>A collection of my thoughts and blog posts.</Subheading>
      </div>
    </Layout>
  );
};

export default BlogPage;
