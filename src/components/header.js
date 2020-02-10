import React from "react";
import styled from "styled-components";
import Hamburger from "./hamburger";
import { Link } from "gatsby";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  height: var(--header-height);
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 var(--spacing-large);
  height: 80px;
  @media (min-width: 768px) {
    height: var(--header-height);
  }
`;

const Ezeikel = styled.span`
  font-size: 30px;
  color: var(--color-white);
  font-weight: 600;
  span {
    color: var(--color-primary);
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

const Header = () => (
  <Wrapper>
    <Ezeikel>
      <StyledLink to={"/"}>
        Ezeikel<span>.</span>
      </StyledLink>
    </Ezeikel>
    <Hamburger />
  </Wrapper>
);

export default Header;
