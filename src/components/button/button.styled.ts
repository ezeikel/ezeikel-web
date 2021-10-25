import styled from "styled-components";

export const Default = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: var(--color-white);
  padding: var(--spacing-medium) var(--spacing-large);
  font-size: 2rem;
  font-weight: 500;
`;

export const Outline = styled.button`
  border: 2px solid var(--color-primary);
  cursor: pointer;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  color: var(--color-primary);
  padding: var(--spacing-medium) var(--spacing-large);
  font-size: 2rem;
  font-weight: 500;
`;
