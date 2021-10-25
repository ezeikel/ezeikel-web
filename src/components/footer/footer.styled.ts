import styled from "styled-components";

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  padding: var(--spacing-large);
  text-align: center;
  color: var(--color-white);
  margin-top: var(--spacing-huge);
  h1 {
    font-family: var(--font-family-secondary);
    font-size: 4.8rem;
    font-weight: 700;
    margin: 0 0 var(--spacing-large);
    @media (min-width: 768px) {
      text-align: left;
      margin: 0 0 var(--spacing-medium);
    }
  }
`;

export const Follow = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--spacing-large);
`;

export const Copyright = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  > div {
    &:last-of-type {
      span {
        color: var(--color-like);
      }
    }
  }
`;
