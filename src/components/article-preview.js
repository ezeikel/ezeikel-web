import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #a0a0a0;
  text-decoration: none;
  display: inline-block;
  padding: 0.33333rem 0.5rem;
  line-height: 1;
  border-radius: 2px;
  border: 1px solid #a0a0a0;
  margin-right: 0.5em;
`;

const Title = styled.h3`
  font-size: 1.5em;
`;

export default ({ article }) => (
  <Wrapper>
    <Img alt="" fluid={article.heroImage.fluid} />
    <Title>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </Title>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </Wrapper>
);
