import { Formik } from "formik";
import * as Yup from "yup";
import addToMailchimp from "gatsby-plugin-mailchimp";
import TextInput from "../textInput/textInput";
import Button from "../button/button";
import { StyledForm } from "./subscribeForm.styled";

const subsribeFormSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
});

const SubscribeForm = () => {
  return (
    <Formik
      initialValues={{ fullName: "", email: "" }}
      validationSchema={subsribeFormSchema}
      onSubmit={async (
        { fullName, email },
        { setSubmitting, setErrors, resetForm },
      ) => {
        const [firstName, lastName] = fullName.trim().split(" ");

        const listData = {
          FNAME: firstName,
          LNAME: lastName,
        };

        // remove undefined properties
        Object.keys(listData).forEach((key) =>
          listData[key] === undefined ? delete listData[key] : {},
        );

        try {
          const result = await addToMailchimp(
            email.toLocaleLowerCase(),
            listData,
          );

          if (typeof window === "undefined") {
            return;
          }

          if (result.result === "error") {
            // track custom event - https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
            window.gtag("event", "email_list_signup_fail", {
              fullName,
              email,
            });
          } else {
            // track custom event - https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
            window.gtag("event", "email_list_signup_success", {
              fullName,
              email,
            });

            resetForm();
          }
        } catch (error) {
          console.error({ error });

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
      {({ isSubmitting }) => (
        <StyledForm>
          <div>Join the email list and never miss a post.</div>
          <div>
            <TextInput name="fullName" type="text" placeholder="Kanye West" />
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
