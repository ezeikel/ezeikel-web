import { Form, Formik } from "formik";
import * as Yup from "yup";
import addToMailchimp from "gatsby-plugin-mailchimp";
import TextInput from "../textInput/textInput";
import Button from "../button/button";

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
        <Form className="flex flex-col w-full max-w-4xl self-center mb-8">
          <div className="text-xl font-normal text-center mb-8">
            Join the email list and never miss a post.
          </div>
          <div className="flex flex-wrap justify-center items-center ml-[calc(-1*16px)] mt-[calc(-1*16px)]">
            <TextInput
              name="fullName"
              type="text"
              placeholder="Kanye West"
              className="ml-4 mt-4 shrink-0 grow-[2]"
            />
            <TextInput
              name="email"
              type="email"
              placeholder="kanye@yeezy.com"
              className="ml-4 mt-4 shrink-0 grow-[2]"
            />
            <Button
              className="max-w-xs ml-4 mt-4 shadow-md md:flex-1 shrink-0 grow-[1]"
              type="submit"
              title={isSubmitting ? "Joining" : "Join"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubscribeForm;
