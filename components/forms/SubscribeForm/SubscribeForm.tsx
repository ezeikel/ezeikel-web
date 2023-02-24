'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from '../inputs/TextInput/TextInput';
import Button from '../../Button/Button';

const subscribeFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const SubscribeForm = () => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={subscribeFormSchema}
    onSubmit={async ({ email }, { setSubmitting, resetForm }) => {
      try {
        await axios.post('/api/subscribe', { email });

        // TODO: display a toast message to the user

        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error({ error });
      }
    }}
  >
    {({ isSubmitting, values }) => (
      <Form className="flex flex-col w-full max-w-4xl self-center mb-8">
        <div className="text-xl font-normal text-center mb-8">
          Join the email list and never miss a post.
        </div>
        <div className="flex flex-wrap justify-center items-center ml-[calc(-1*16px)] mt-[calc(-1*16px)]">
          <TextInput
            name="email"
            type="email"
            placeholder="kanye@yeezy.com"
            className="ml-4 mt-4 shrink-0 grow-[2]"
          />
          <Button
            className="max-w-xs ml-4 mt-4 shadow-md md:flex-1 shrink-0 grow-[1] disabled:opacity-50"
            type="submit"
            disabled={values.email === '' || isSubmitting}
          >
            {isSubmitting ? 'Joining' : 'Join'}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default SubscribeForm;
