import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import TextInput from "./textInput";
import addToMailchimp from "gatsby-plugin-mailchimp";
import Button from "./button";

const subsribeFormSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  email: Yup.string().email().required(),
});

const StyledForm = styled(Form)`
  align-self: center;
  margin-bottom: var(--spacing-large);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 874px;
  @media (min-width: 768px) {
    margin-bottom: var(--spacing-medium);
  }
  > div {
    &:first-of-type {
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
      margin-bottom: var(--spacing-large);
    }
    &:nth-of-type(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-left: calc(-1 * var(--spacing-medium));
      margin-top: calc(-1 * var(--spacing-medium));
      > div,
      > button {
        margin-left: var(--spacing-medium);
        margin-top: var(--spacing-medium);
      }
      > div {
        flex: 2 0 auto;
      }
      > button {
        flex: 1 0 auto;
      }
      /* > div {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .input {
          flex: 1;
          max-width: 432px;
          box-shadow: var(--box-shadow);

          & + .input {
            margin-left: var(--spacing-medium);
          }
        }
      } */
    }
  }
  button {
    max-width: 160px;
    margin-left: var(--spacing-medium);
    box-shadow: var(--box-shadow);
    @media (min-width: 768px) {
      flex: 1;
    }
  }
`;

const SubscribeForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", email: "" }}
      validationSchema={subsribeFormSchema}
      onSubmit={async (
        { firstName, email },
        { setSubmitting, setErrors, resetForm }
      ) => {
        // TODO: add first name here
        const listData = {};

        try {
          const result = await addToMailchimp(email, listData);

          console.log({ result });

          if (result.result === "error") {
            // track custom event - https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
            typeof window !== "undefined" &&
              window.gtag("event", "email_list_signup_fail", {
                firstName,
                email,
              });
          } else {
            // track custom event - https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
            typeof window !== "undefined" &&
              window.gtag("event", "email_list_signup_success", {
                firstName,
                email,
              });

            resetForm();
          }
        } catch (error) {
          console.error({ error });

          typeof window !== "undefined" &&
            window.gtag("event", "email_list_signup_fail", {
              firstName,
              email,
            });

          if (error.message === "Timeout") {
            // TODO: should be generic error instead of email
            setErrors({
              email:
                "Looks like you are using an ad blocking browser that's preventing this form from being submitted - please temporarily toggle off the 'Ads and trackers blocked' settings and then re-submit the form.",
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <StyledForm>
          <div>Join the email list and never miss a post.</div>
          <div>
            <TextInput name="firstName" type="text" placeholder="Kanye" />
            <TextInput
              name="email"
              type="email"
              placeholder="kanye@yeezy.com"
            />
            <Button type="submit" title={isSubmitting ? "Joining" : "Join"} />
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SubscribeForm;
