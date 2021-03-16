import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import TextInput from "./textInput";
import Button from "./button";

const contactSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string(),
  message: Yup.string(),
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-large);

  form {
    display: flex;
    flex-direction: column;
    max-width: 874px;
    padding: var(--spacing-large);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    > div {
      margin-bottom: var(--spacing-huge);
      label {
        font-size: 1.8rem;
        &[for="message"] {
          display: flex;
          flex-direction: column;
          > span {
            display: flex;
            margin-bottom: var(--spacing-small);
          }
        }
      }
      input, textarea {
        font-size: 1.6rem;
      }

      textarea {
        border-radius: var(--border-radius);
      }

      .input + .input, .input + label {
        margin-top: var(--spacing-medium);
      }
    }
    button {
      max-width: 154px;
    }

  }
`;

const Title = styled.h2`
  font-size: 7.279rem;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-huge);
`;

const Contact = () => {
  return (
    <Wrapper>
      <Title>Let's talk</Title>
      {/* <p>If you think I could help solve a problem or even if you just want to chat, feel free to shoot me a message.</p> */}
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={contactSchema}
        onSubmit={async (
          { fullName, email, message },
          { resetForm }
        ) => {
          console.log({ fullName, email, message });

          resetForm();
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>
              <TextInput name="fullName" type="text" placeholder="Kanye West" label="Full name" className="input" />
              <TextInput name="email" type="email" placeholder="kanye@yeezy.com" label="Email" className="input"/>
              <label htmlFor="message">
                <span>Message</span>
                <TextareaAutosize
                  minRows={4}
                  id="message"
                  label="message"
                  name="message"
                  autoFocus
                  onChange={handleChange}
                  value={values.message}
                  placeholder="Build me a website for £1m please"
                />
              </label>
            </div>
            <Button type="submit" title="Send" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Contact;
