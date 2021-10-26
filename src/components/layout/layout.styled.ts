import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: var(--spacing-large) 1fr var(--spacing-large);
  grid-template-rows: 1fr;
  grid-row-gap: var(--spacing-huge);
  > * {
    grid-column: 2 / -2;
  }
  > .full-width {
    grid-column: 1 / -1;
  }
`;
