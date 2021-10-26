/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  li {
    svg path {
      transition: fill 0.3s ease-in-out;
    }
    @media (min-width: 768px) {
      &:hover {
        svg path {
          fill: var(--color-white);
        }
      }
    }
  }
  li + li {
    margin-left: var(--spacing-large);
  }
`;
