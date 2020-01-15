import React from "react";
import styled from "styled-components";
import Hamburger from "./hamburger";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  height: var(--header-height);
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  padding: 50px;
`;

const Ezeikel = styled.span`
  font-size: 48px;
  color: var(--color-white);
  font-weight: bold;
  span {
    color: #2DE1C2;
  }
`;

const Header = () => (
  <Wrapper>
    <Ezeikel>
      Ezeikel<span>.</span>
    </Ezeikel>
    <Hamburger />
  </Wrapper>
);

export default Header;
