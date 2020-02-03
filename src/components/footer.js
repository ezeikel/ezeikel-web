import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

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
      background-color: #FF575A;
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
    </Wrapper>
  );
}

export default Footer;
