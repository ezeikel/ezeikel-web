import { Formik } from "formik";

const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;

const LetsTalk = () => {
  return (
    <Wrapper>
      <Title>Let's talk</Title>
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={letsTalkSchema}
        onSubmit={async (
          { fullName, email, messagae },
          { setSubmiting, setErrors, resetForm }
        ) => {
          console.log({ fullName, email, messagae });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <TextInput name="fullName" type="text" placeholder="Full name" />
            <TextInput name="email" type="email" placeholder="Email" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
