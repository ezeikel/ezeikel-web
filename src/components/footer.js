import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import SocialLinks from "./socialLinks";

const Wrapper = styled.footer`
  background-color: #333333;
  padding: 32px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-large);
  text-align: center;
  form {
    display: grid;
    grid-template-rows: auto repeat(2, 1fr);
    grid-row-gap: var(--spacing-medium);
    label {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-white);
    }
    input {
      font-size: 18px;
      padding: 16px;
      border-radius: 4px;
      border: 0;
      outline: 0;
    }
    button {
      background-color: #ff575a;
      font-size: 16px;
      padding: 16px;
      color: var(--color-white);
      font-weight: 500;
      border-radius: 4px;
    }
  }
`;

const Ezeikel = styled.span`
  font-size: 30px;
  color: var(--color-white);
  font-weight: 600;
  span {
    color: #2de1c2;
  }
  a {
    color: var(--color-white);
  }
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const StyledLink = styled(Link)`
  letter-spacing: 1px;
`;

const Follow = styled.section`
  color: var(--color-white);
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-medium);
  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const Copyright = styled.section`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: var(--var-spacing-medium);
  span {
    &:first-of-type {
      font-size: 16px;
      color: var(--color-white);
      span {
        color: var(--color-red);
      }
    }
    &:last-of-type {
      font-size: 16px;
      color: var(--color-white);
    }
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Ezeikel>
        <StyledLink to={"/"}>
          Ezeikel<span>.</span>
        </StyledLink>
      </Ezeikel>
      <form>
        <label>Subscribe to my Newsletter</label>
        <input placeholder="kanye@yeezy.com" />
        <button>Subscribe</button>
      </form>
      <Follow>
        <span>Follow</span>
        <SocialLinks size="4x" fill="#9B9B9B" />
      </Follow>
      <Copyright>
        <span>
          Made with <span>♡</span> in South London.
        </span>
        <span>2020 &copy; Ezeikel. All rights reserved</span>
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
