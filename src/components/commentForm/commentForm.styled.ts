/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import { Form } from "formik";

export const StyledForm = styled(Form)`
  .text-input {
    border: 1px solid #dbdbdb;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    padding: var(--spacing-medium);
    input {
      font-size: 1.6rem;
      border: 0;
      padding: 0;
    }
  }
`;
