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

type ContactEnquiryTeamEmailProps = {
  fullName: string;
  email: string;
  message: string;
};

const ContactEnquiryTeamEmail = ({
  fullName,
  email,
  message,
}: ContactEnquiryTeamEmailProps) => {
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
        <Preview>New Enquiry from {fullName}</Preview>
        <Body className="bg-[#f6f9fc] font-primary">
          <Container className="bg-white mx-auto pt-[20px] pb-[48px] mb-[64px]">
            <Section className="px-[48px]">
              <Text className="text-[#525f7f] text-base text-left">
                A new client enquiry has been received. Here are the details:
              </Text>
              <Text className="text-[#525f7f] text-base text-left mt-2">
                Name: {fullName}
              </Text>
              <Text className="text-[#525f7f] text-base text-left">
                Email: {email}
              </Text>
              <Text className="text-[#525f7f] text-base text-left mt-2">
                Message: {message}
              </Text>
              <Text className="text-[#525f7f] text-base text-left mt-4">
                Please review and follow up accordingly.
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

export default ContactEnquiryTeamEmail;
