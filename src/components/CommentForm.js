import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const CommentFormSchema = Yup.object().shape({
  text: Yup.string(),
});

const StyledForm = styled(Form)`
  input {
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CommentForm = () => {
  return (
    <Formik
      initalValues={{ text: "" }}
      validationSchema={CommentFormSchema}
      onSubmit={({ text }, { resetForm }) => {
        console.log({ text });
      }}
    >
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextInput name="text" type="text" placeholder="Add a comment..." />
        </StyledForm>
      )}
    </Formik>
  );
};

export default CommentForm;
