import React from "react";
import styled from "styled-components";
import Hamburger from "./hamburger";
import Logo from "./logo";

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

const Header = () => (
  <Wrapper>
    <Logo />
    <Hamburger />
  </Wrapper>
);

export default Header;
