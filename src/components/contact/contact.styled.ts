import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    max-width: 874px;
    padding: var(--spacing-large);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    > div {
      margin-bottom: var(--spacing-huge);
    }
    button {
      max-width: 154px;
    }
  }
`;

export const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;
