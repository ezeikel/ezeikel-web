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
  padding: 32px;
  height: 80px;
  @media (min-width: 768px) {
    padding: 50px;
    height: 180px;
  }
`

const Ezeikel = styled.span`
  font-size: 30px;
  color: var(--color-white);
  font-weight: bold;
  span {
    color: #2de1c2;
  }
  a {
    color: var(--color-white);
  }
  @media (min-width: 768px) {
    font-size: 48px;
  }
`

const Header = () => (
  <Wrapper>
    <Ezeikel>
      <Link to={"/"}>Ezeikel<span>.</span></Link>
    </Ezeikel>
    <Hamburger />
  </Wrapper>
);

export default Header;
