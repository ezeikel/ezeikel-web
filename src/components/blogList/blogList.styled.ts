import styled from "styled-components";

export const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: var(--spacing-large);

  li {
    padding: var(--spacing-large);
    border: 1px solid #f4f5f5;
    border-radius: 4px;

    h3 {
      font-size: 3.1325rem;
      font-family: var(--font-family-secondary);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-small);
    }

    p {
      font-size: 2rem;
      line-height: 1.3;
      font-weight: 400;
      color: var(--color-tertiary);
      margin: 0;
    }
  }
`;

export const ImageWrapper = styled.div`
  margin: 0 0 var(--spacing-medium);
`;
