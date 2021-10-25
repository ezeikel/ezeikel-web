import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -64px;
  > section {
    margin-top: 64px;
    &:first-of-type {
      flex: 0 1 auto;
      max-width: 750px;

      h1 {
        font-family: var(--font-family-secondary);
        font-size: 9.537rem;
        font-weight: 700;
        color: var(--color-primary);
        margin: 0 0 var(--spacing-large);
      }
      h3 {
        font-size: 4.883rem;
        line-height: 1.2;
        font-weight: 400;
        color: var(--color-secondary);
        margin: 0 0 var(--spacing-medium);
      }
      h4 {
        font-weight: 400;
        line-height: 1.5;
        color: var(--color-tertiary);
        font-size: 2.5rem;
        margin: 0 0 var(--spacing-huge);
        a {
          text-decoration: underline;
          color: var(--color-tertiary);
        }
      }
    }
    &:nth-of-type(2) {
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
    }
  }
import styled from "styled-components";`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -32px;
  margin-left: -32px;
  button {
    flex: 1 0 auto;
    margin-top: var(--spacing-large);
    margin-left: var(--spacing-large);
    @media (min-width: 375px) {
      flex: 0 0 auto;
    }
  }
`;
