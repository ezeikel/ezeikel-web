import React from "react";
import styled from "styled-components";
import SubscribeForm from "./subscribeForm";
import SocialLinks from "./socialLinks";

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  padding: var(--spacing-large);
  text-align: center;
  color: var(--color-white);
  margin-top: var(--spacing-huge);
  h1 {
    font-family: var(--font-family-secondary);
    font-size: 4.8rem;
    font-weight: 700;
    margin: 0 0 var(--spacing-large);
    @media (min-width: 768px) {
      text-align: left;
      margin: 0 0 var(--spacing-medium);
    }
  }
`;

const Follow = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--spacing-large);
  span {
    display: flex;
    margin-bottom: var(--spacing-medium);
    font-size: 2rem;
    font-weight: 700;
    @media (min-width: 768px) {
      margin-bottom: var(--spacing-small);
    }
  }
`;

const Copyright = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  > div {
    &:last-of-type {
      span {
        color: var(--color-like);
      }
    }
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <h1>Ezeikel.</h1>
      <SubscribeForm />
      <Follow>
        <span>Follow</span>
        <SocialLinks size="3x" fill="#9B9B9B" />
      </Follow>
      <Copyright>
        <div>&copy; {new Date().getFullYear()} Ezeikel.</div>
        <div>
          Made with <span>♡</span> in South London.
        </div>
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
