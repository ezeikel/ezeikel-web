import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import TextInput from "./textInput";
import TextareaInput from "./textareaInput";
import Button from "./button";

const contactFormSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
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

      .input + .input {
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
        validationSchema={contactFormSchema}
        onSubmit={async ({ fullName, email, message }, { resetForm }) => {
          try {
            const response = await axios.post("/.netlify/functions/contact", {
              fullName,
              email,
              message,
            });

            console.log({ response });

            typeof window !== "undefined" &&
              window.gtag("event", "contact_form_submit_success", {
                fullName,
                email,
                message,
              });
          } catch (error) {
            console.error({ error });

            typeof window !== "undefined" &&
              window.gtag("event", "contact_form_submit_fail", {
                fullName,
                email,
                message,
              });
          }

          resetForm();
        }}
      >
        {() => (
          <Form>
            <div>
              <TextInput
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Kanye West"
                label="Full name"
              />
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="kanye@yeezy.com"
                label="Email"
              />
              <TextareaInput
                id="message"
                name="message"
                placeholder="Build me a website for £1m please"
                label="Message"
              />
            </div>
            <Button type="submit" title="Send" />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Contact;
