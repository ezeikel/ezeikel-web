import React from "react";
import styled from "styled-components";
import Button from "./button";
import InstagramCard from "./instagramCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 var(--spacing-large);
  > section {
    &:first-of-type {
      flex: 0 1 auto;
      max-width: 750px;
      /* border: 1px solid green; */
      h1 {
        font-family: var(--font-family-secondary);
        font-size: 9.537rem;
        font-weight: 700;
        color: var(--color-primary);
        margin: 0 0 var(--spacing-medium);
      }
      h3 {
        font-size: 4.883rem;
        font-weight: 400;
        color: var(--color-primary);
        margin: 0 0 var(--spacing-huge);
      }
    }
    &:nth-of-type(2) {
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      /* border: 1px solid red; */
    }
  }
`;

const Hero = () => {
  return <Wrapper>
    <section>
      <h1>Ezeikel.</h1>
      <h3>I love solving problems with JavaScript and building beautiful UIs.</h3>
      <Button title="Let's talk" />
    </section>
    <section><InstagramCard /></section>

  </Wrapper>;
};

export default Hero;
