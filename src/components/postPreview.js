import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-medium);
`;

const Title = styled.h4`
  font-size: 3.125rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  font-weight: 500;
  margin: 0 0 var(--spacing-small) 0;
`;

const Excerpt = styled.p`
  font-size: 2rem;
  color: #777c9b;
  font-weight: 400;
  line-height: 26px;
  margin: 0 0 var(--spacing-medium) 0;
`;

const ReadMore = styled.div`
  a {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 2rem;
    font-weight: 400;
    color: #233044;
    margin-right: var(--spacing-small);
  }
`;

const PostPreview = ({ post }) => (
  <Wrapper>
    <Title>{post.title}</Title>
    <Excerpt
      dangerouslySetInnerHTML={{
        __html: post.description.childMarkdownRemark.html,
      }}
    />
    <Excerpt>{post.excerpt}</Excerpt>
    <ReadMore>
      <Link to={`/blog/${post.slug}`}>
        <span>Read</span>
        <FontAwesomeIcon
          icon={["far", "long-arrow-right"]}
          color="var(--color-primary)"
          size="2x"
        />
      </Link>
    </ReadMore>
  </Wrapper>
);

export default PostPreview;
