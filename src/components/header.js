import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding: 0 var(--spacing-large);
  margin-bottom: var(--spacing-huge);
  a {
    font-size: 2.5rem;
    color: #777c9b;
  }
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
    <div>
      <Link to="/">Hello</Link>
    </div>
    <Nav>
      <ul>
        {/* <li>
          <Link to="/work">Work</Link>
        </li> */}
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        {/* <li>
          <Link to="/speaking">Speaking</Link>
        </li> */}
      </ul>
    </Nav>
  </Wrapper>
);

export default Header;
