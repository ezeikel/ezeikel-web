import React from "react";
import styled from "styled-components";
import SocialLinks from "./socialLinks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: linear-gradient(to bottom, #1E3C72, #2A5298);
  position: relative;
  min-height: 70vh;
  padding: 50px;
  padding-top: 180px;
`;

const Headline = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  h2 {
    font-size: 48px;
    line-height: 60px;
    color: #2DE1C2;
    font-weight: 300;
    margin: 0;
  }
  h1 {
    font-size: 72px;
    line-height: 90px;
    color: var(--color-white);
    margin: 0 0 8px 0;
    span {
      color: #2DE1C2;
    }
  }
  p {
    margin: 0 0 32px 0;
    font-size: 30px;
    color: var(--color-white);
    font-weight: 300;
  }
`;

const StyledButton = styled.button`
  background-color: #FF595E;
  color: var(--color-white);
  border-radius: 4px;
  padding: 16px;
  width: 180px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: var(--box-shadow);
  margin-bottom: 116px;
`;

const Hero = () => (
  <Wrapper>
    <Headline>
      <h2>Freelance</h2>
      <h1>Front End Developer<span>.</span></h1>
      <p>I love solving problems with JavaScript and building beautiful UIs.</p>
      <StyledButton>Hire me</StyledButton>
    </Headline>
    <SocialLinks />
  </Wrapper>
);

export default Hero;