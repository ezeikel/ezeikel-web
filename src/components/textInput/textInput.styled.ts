import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex: 1;
    svg {
      margin-right: var(--spacing-small);
    }
  }
`;

export const Label = styled.label`
  display: flex;
  margin-bottom: var(--spacing-small);
  font-size: 1.6rem;
`;
