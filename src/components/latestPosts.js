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
  }
`;

const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
`;

const LatestPosts = () => {
  const posts = useLatesPosts();

  console.log({ posts });

  return (
    <Wrapper>
      <Title>Posts</Title>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostPreview post={post} />
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default LatestPosts;
