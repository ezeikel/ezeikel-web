import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: var(--spacing-large);
    margin-bottom: var(--spacing-huge);
  }

  > a {
    font-size: 2rem;
    font-family: var(--font-family-secondary);
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

export const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;
