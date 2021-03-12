import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding: 0 var(--spacing-large);
  font-size: 2rem;
  color: #777c9b;
  margin-bottom: var(--spacing-huge);
`;

const Nav = styled.nav`
  ul {
    display: flex;
    li {
      & + li {
        margin-left: var(--spacing-large);
      }
    }
  }
`;

const Header = () => (
  <Wrapper>
    <div>Hello</div>
    <Nav>
      <ul>
        {/* <li>Work</li>
        <li>About</li> */}
        <li>Blog</li>
        {/* <li>Speaking</li> */}
      </ul>
    </Nav>
  </Wrapper>
);

export default Header;
