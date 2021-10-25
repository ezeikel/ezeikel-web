import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding: 0 var(--spacing-large);
  margin-bottom: var(--spacing-huge);
  a {
    font-size: 2rem;
    color: #777c9b;
  }
`;

export const Nav = styled.nav`
  ul {
    display: flex;
    li {
      & + li {
        margin-left: var(--spacing-large);
      }
    }
  }
`;
