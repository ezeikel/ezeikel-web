import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: var(--spacing-large);

  li {
    padding: var(--spacing-large);
    border: 1px solid #f4f5f5;
    border-radius: 4px;

    h3 {
      font-size: 3.1325rem;
      font-family: var(--font-family-secondary);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-small);
    }

    p {
      font-size: 2rem;
      line-height: 1.3;
      font-weight: 400;
      color: var(--color-tertiary);
      margin: 0;
    }
  }
`;

const ImageWrapper = styled.div`
  margin: 0 0 var(--spacing-medium);
`;

const BlogList = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <li>
          <Link to={post.slug}>
            <ImageWrapper>
              <GatsbyImage
                image={post.heroImage}
                alt="hero image"
                placeholder="blurred"
                layout="fullWidth"
                objectFit="cover"
                objectPosition="center top"
              />
            </ImageWrapper>
            <div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </Wrapper>
  );
};

export default BlogList;
