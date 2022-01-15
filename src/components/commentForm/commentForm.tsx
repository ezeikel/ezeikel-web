import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../textInput/textInput";

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
        <Form onSubmit={handleSubmit}>
          <TextInput
            name="text"
            type="text"
            placeholder="Add a comment..."
            leftIcon="smile"
            className="border-x-0 border-b-0 border-t rounded-none rounded-b"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
