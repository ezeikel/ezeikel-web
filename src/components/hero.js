import React from "react";
import styled from "styled-components";
import Button from "./button";
import InstagramCard from "./instagramCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 var(--spacing-large);
  margin-top: -64px;
  > section {
    margin-top: 64px;
    &:first-of-type {
      flex: 0 1 auto;
      max-width: 750px;

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
        color: #545977;
        margin: 0 0 var(--spacing-medium);
      }
      h4 {
        font-weight: 400;
        color: #777c9b;
        font-size: 2.5rem;
        margin: 0 0 var(--spacing-huge);
        a {
          text-decoration: underline;
          color: #777c9b;
        }
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
      <h4>Lead Web Engineer and JavaScript All-Rounder at <a href="https://sparksapp.io" target="_blank">Sparks</a></h4>
      <Button title="Let's talk" />
    </section>
    <section><InstagramCard /></section>

  </Wrapper>;
};

export default Hero;
