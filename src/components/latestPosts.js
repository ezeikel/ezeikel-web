import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import useLatesPosts from "../hooks/use-latest-posts";
import PostPreview from "./postPreview";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: var(--spacing-large);
    margin-bottom: var(--spacing-huge);
  }

  > a {
    font-size: 2rem;
    font-family: var(--font-family-secondary);
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;

const LatestPosts = () => {
  const posts = useLatesPosts();

  return (
    <Wrapper>
      <Title>Posts</Title>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
      <Link to="/blog">All posts</Link>
    </Wrapper>
  );
};

export default LatestPosts;
