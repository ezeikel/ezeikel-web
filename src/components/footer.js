import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "./button";
import SocialLinks from "./socialLinks";
import TextInput from "./textInput";

const newsletterFormSchema = Yup.object().shape({
  email: Yup.string(),
});

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  padding: var(--spacing-large);
  text-align: center;
  color: var(--color-white);
  h1 {
    font-family: var(--font-family-secondary);
    font-size: 4.8rem;
    font-weight: 700;
    margin: 0 0 var(--spacing-large);
    text-align: left;
  }
`;

const StyledForm = styled(Form)`
  align-self: center;
  margin-bottom: var(--spacing-large);
  display: flex;
  flex-direction: column;
  max-width: 615px;
  > div {
    display: flex;
    &:first-of-type {
      font-size: 2.5rem;
      font-weight: 400;
      margin-bottom: var(--spacing-large);

    }
  }
  .input {
    flex: 1;
  }
  button {
    flex: 1;
    max-width: 160px;
    margin-left: var(--spacing-medium);
  }
`;

const Follow = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--spacing-large);
  span {
    display: flex;
    margin-bottom: var(--spacing-medium);
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Copyright = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  > div {
    &:last-of-type {
      span {
        color: var(--color-like);
      }
    }
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <h1>Ezeikel.</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={newsletterFormSchema}
        onSubmit={async (
          { email },
          { resetForm }
        ) => {
          console.log({ email });

          resetForm();
        }}
      >
        {() => (
          <StyledForm>
            <div>Subscribe to the mailing list and never miss a post.</div>
            <div>
              <TextInput name="email" type="email" placeholder="kanye@yeezy.com" className="input"/>
              <Button type="submit" title="Send" />
            </div>
          </StyledForm>
        )}
      </Formik>
      <Follow>
        <span>Follow</span>
        <SocialLinks size="4x" fill="#9B9B9B" />
      </Follow>
      <Copyright>
        <div>&copy; {new Date().getFullYear()} Ezeikel.</div>
        <div>
          Made with <span>♡</span> in South London.
        </div>
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
