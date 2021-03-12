import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const CommentFormSchema = Yup.object().shape({
  text: Yup.string(),
});

const StyledForm = styled(Form)`
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

const CommentForm = () => {
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={CommentFormSchema}
      onSubmit={({ text }, { resetForm }) => {
        console.log({ text });

        resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextInput
            name="text"
            type="text"
            placeholder="Add a comment..."
            leftIcon="smile"
            className="text-input"
          />
        </StyledForm>
      )}
    </Formik>
  );
};

export default CommentForm;
