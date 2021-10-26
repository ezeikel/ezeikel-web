import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    font-size: 1.6rem;
    padding: var(--spacing-medium);
    border-radius: var(--border-radius);
    border: 1px solid #efefef;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  margin-bottom: var(--spacing-small);
  font-size: 1.6rem;
`;
