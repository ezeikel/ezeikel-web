import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../textInput";
import { StyledForm } from "./commentForm.styled";

const commentFormSchema = Yup.object().shape({
  text: Yup.string(),
});

const CommentForm = () => {
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={commentFormSchema}
      onSubmit={({ text }, { resetForm }) => {
        // TODO: take text put it inside message input in contact form
        console.log({ text }); // eslint-disable-line

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
