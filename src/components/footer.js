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
    @media (min-width: 768px) {
      text-align: left;
    }
  }
`;

const StyledForm = styled(Form)`
  align-self: center;
  margin-bottom: var(--spacing-large);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 874px;
  > div {
    &:first-of-type {
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
      margin-bottom: var(--spacing-large);
    }
    &:nth-of-type(2) {
      display: flex;
      justify-content: center;
    }
  }
  .input {
    flex: 1;
    max-width: 432px;
    box-shadow: var(--box-shadow);
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
        onSubmit={async ({ email }, { resetForm }) => {
          console.log({ email });

          resetForm();
        }}
      >
        {() => (
          <StyledForm>
            <div>Subscribe to the email list and never miss a post.</div>
            <div>
              <TextInput
                name="email"
                type="email"
                placeholder="kanye@yeezy.com"
                className="input"
              />
              <Button type="submit" title="Send" />
            </div>
          </StyledForm>
        )}
      </Formik>
      <Follow>
        <span>Follow</span>
        <SocialLinks size="3x" fill="#9B9B9B" />
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
