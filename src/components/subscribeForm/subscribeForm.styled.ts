/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import { Form } from "formik";

export const StyledForm = styled(Form)`
  align-self: center;
  margin-bottom: var(--spacing-large);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 874px;
  > div {
    &:first-of-type {
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
      margin-bottom: var(--spacing-large);
    }
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-left: calc(-1 * var(--spacing-medium));
      margin-top: calc(-1 * var(--spacing-medium));
      > div,
      > button {
        margin-left: var(--spacing-medium);
        margin-top: var(--spacing-medium);
      }
      > div {
        flex: 2 0 auto;
      }
      > button {
        flex: 1 0 auto;
      }
    }
  }
  button {
    max-width: 160px;
    margin-left: var(--spacing-medium);
    box-shadow: var(--box-shadow);
    @media (min-width: 768px) {
      flex: 1;
    }
  }
`;
