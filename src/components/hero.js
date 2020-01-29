import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import SocialLinks from "./socialLinks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #1e3c72, #2a5298);
  padding: var(--header-height) var(--spacing-large) var(--spacing-large)
    var(--spacing-large);
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Headline = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
  h2 {
    font-size: 36px;
    color: #2de1c2;
    font-weight: 300;
    margin: 0 0 8px 0;
    text-align: center;
    letter-spacing: 1px;
  }
  h1 {
    font-size: 48px;
    line-height: 1;
    color: var(--color-white);
    margin: 0 0 32px 0;
    text-align: center;
    font-weight: 600;
    letter-spacing: 1px;
    span {
      color: #2de1c2;
    }
  }
  p {
    margin: 0 auto 64px auto;
    font-size: 18px;
    line-height: 1.5;
    color: var(--color-white);
    font-weight: 300;
    text-align: center;
  }
  @media (min-width: 768px) {
    flex: 1 0 50%;
    margin-bottom: 0;
    padding-right: var(--spacing-large);
    h2 {
      font-size: 48px;
      line-height: 60px;
      text-align: left;
      margin: 100px 0 24px 0;
    }
    h1 {
      font-size: 72px;
      margin: 0 0 24px 0;
      text-align: left;
      font-weight: 600;
    }
    p {
      font-size: 30px;
      line-height: 1.5;
      text-align: left;
      margin: 0 0 76px 0;
    }
  }
`;

const StyledButton = styled.button`
  background-color: #ff595e;
  color: var(--color-white);
  border: 4px solid #ff595e;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 3px 6px rgba(255, 89, 94, 0.16);
  @media (min-width: 768px) {
    width: auto;
    padding: 16px 32px;
  }
`;

const SecondaryButton = styled.button`
  color: var(--color-white);
  border: 4px solid var(--color-white);
  background-color: transparent;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  @media (min-width: 768px) {
    width: auto;
    padding: 16px 48px;
  }
`;

const StyledSocialLinks = styled(SocialLinks)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    margin-top: auto;
  }
`;

const Buttons = styled.span`
  button + button {
    margin: 32px 0 0 0;
  }
  @media (min-width: 768px) {
    margin-bottom: 128px;
    button + button {
      margin: 0 0 0 32px;
    }
  }
`;

const Hero = ({ data }) => {
  return (
    <Wrapper>
      <Headline>
        <h2>Freelance</h2>
        <h1>
          Front End Developer<span>.</span>
        </h1>
        <p>
          I love solving problems with JavaScript and building beautiful UIs.
        </p>
        <Buttons>
          <StyledButton>Check out my work</StyledButton>
          <SecondaryButton>Hire me</SecondaryButton>
        </Buttons>
        <StyledSocialLinks />
      </Headline>
    </Wrapper>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        ezeikelImage: file(relativePath: { eq: "ezeikel.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        kanyeImage: file(relativePath: { eq: "kanye.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        nipseyImage: file(relativePath: { eq: "nipsey.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, maxHeight: 150, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Hero data={data} {...props} />}
  />
);
