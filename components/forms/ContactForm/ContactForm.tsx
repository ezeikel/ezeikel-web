'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from '@/components/forms/inputs/TextInput/TextInput';
import TextareaInput from '@/components/forms/inputs/TextareaInput/TextareaInput';
import Button from '@/components/Button/Button';

const contactFormSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
});

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ fullName: '', email: '', message: '' }}
      validationSchema={contactFormSchema}
      onSubmit={async ({ fullName, email, message }, { resetForm }) => {
        try {
          await axios.post('/api/email/contact', {
            fullName,
            email,
            message,
          });
        } catch (error) {
          console.error({ error });
        }

        resetForm();
      }}
    >
      {({ values, isSubmitting }) => (
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
          <Button
            type="submit"
            className="max-w-xs"
            disabled={values.email === '' || isSubmitting}
          >
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
