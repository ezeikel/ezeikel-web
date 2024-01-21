import * as React from 'react';
import {
  Tailwind,
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Hr,
  Text,
} from '@react-email/components';

type ContactEnquiryClientEmailProps = {
  fullName: string;
};

const ContactEnquiryClientEmail = ({
  fullName,
}: ContactEnquiryClientEmailProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              primary:
                '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Preview>Thank You for Reaching Out, {fullName}!</Preview>
        <Body className="bg-[#f6f9fc] font-primary">
          <Container className="bg-white mx-auto pt-[20px] pb-[48px] mb-[64px]">
            <Section className="px-[48px]">
              <Text className="text-[#525f7f] text-base text-left">
                Thank you for reaching out! Your enquiry has been recieved and I
                will get back to you as soon as possible.
              </Text>
              <Text className="text-[#525f7f] text-base text-left">
                — Ezeikel
              </Text>
              <Hr className="border-[#e6ebf1] my-[20px]" />
              <Text className="text-[#8898aa] text-xs">
                Pop Brixton, 49 Brixton Station Rd, London SW9 8PQ
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEnquiryClientEmail;
