import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextInput from "../textInput/textInput";
import TextareaInput from "../textareaInput/textareaInput";
import Button from "../button/button";
import { Wrapper, Title } from "./contact.styled";

const contactFormSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
});

const Contact = () => {
  return (
    <Wrapper>
      <Title>Let&apos;s talk</Title>
      {/* <p>If you think I could help solve a problem or even if you just want to chat, feel free to shoot me a message.</p> */}
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={contactFormSchema}
        onSubmit={async ({ fullName, email, message }, { resetForm }) => {
          try {
            await axios.post("/.netlify/functions/contact", {
              fullName,
              email,
              message,
            });

            if (typeof window === "undefined") {
              return;
            }

            window.gtag("event", "contact_form_submit_success", {
              fullName,
              email,
              message,
            });
          } catch (error) {
            console.error({ error });

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
