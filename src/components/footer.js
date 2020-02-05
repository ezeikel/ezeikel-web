import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import SocialLinks from "./socialLinks";

const Wrapper = styled.footer`
  background-color: #333333;
  padding: 32px;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  grid-row-gap: var(--spacing-large);
  text-align: center;
  @media (min-width: 768px) {
    grid-template-rows: auto 1fr auto auto;
    grid-template-columns: 1fr 2fr 1fr;
    form {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
      display: grid;
      grid-template-columns: 3fr 1fr;
      grid-template-rows: auto 1fr;
      grid-column-gap: var(--spacing-medium);
      grid-row-gap: var(--spacing-large);
      label {
        grid-row: 1 / span 1;
        grid-column: 1 / -1;
      }
      input {
        grid-column: 1 / span 1;
      }
      button {
        grid-column: 2 / -1;
      }
    }
  }
  form {
    display: grid;
    grid-template-rows: auto 1fr;
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
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    text-align: left;
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
  @media (min-width: 768px) {
    grid-row: 3 / span 1;
    grid-column: 1 / span 1;
    text-align: left;
    justify-content: start;
  }
`;

const Copyright = styled.section`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: var(--spacing-medium);
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
  @media (min-width: 768px) {
    grid-row: 4 / span 1;
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    grid-template-rows: 1fr;
    span {
      grid-column: 2 / -1;
      grid-row: 1 / span 1;
      &:nth-of-type(2) {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
      }
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
        <span>&copy; 2020 Ezeikel. All rights reserved</span>
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
