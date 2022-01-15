import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextInput from "../textInput/textInput";
import TextareaInput from "../textareaInput/textareaInput";
import Button from "../button/button";

const contactFormSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
});

const Contact = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-display font-bold text-7xl text-navy-blue mb-16">
        Let&apos;s talk
      </h2>
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
          <Form className="flex flex-col max-w-4xl p-8 shadow-lg rounded">
            <div className="mb-16 space-y-4">
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
            <Button type="submit" title="Send" className="max-w-xs" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
