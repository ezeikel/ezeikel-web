import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type ContactConfirmationEmailProps = {
  name: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ezeikel.dev';

export default function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>Thanks for reaching out!</Heading>
            <Text style={paragraph}>Hi {name},</Text>
            <Text style={paragraph}>
              I've received your message and will get back to you as soon as
              possible, usually within 24-48 hours.
            </Text>
            <Text style={paragraph}>
              In the meantime, feel free to check out my latest content:
            </Text>
            <Text style={paragraph}>
              <Link href={`${baseUrl}/blog`} style={link}>
                Read my blog
              </Link>
              {' | '}
              <Link href={`${baseUrl}/things-ive-built`} style={link}>
                See what I've built
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Best,
              <br />
              Ezeikel
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f8f7f4',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  color: '#1d1d1d',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '16px 0',
};

const paragraph = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
};

const footer = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
};
