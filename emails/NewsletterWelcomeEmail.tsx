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

type NewsletterWelcomeEmailProps = {
  email: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ezeikel.dev';

export default function NewsletterWelcomeEmail({
  email,
}: NewsletterWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>Welcome to the newsletter!</Heading>

            <Text style={paragraph}>
              Thanks for subscribing! You&apos;ll now receive updates on:
            </Text>

            <ul style={list}>
              <li style={listItem}>
                New blog posts about indie hacking and building products
              </li>
              <li style={listItem}>Tech tutorials and development tips</li>
              <li style={listItem}>
                Behind-the-scenes of my content creation journey
              </li>
              <li style={listItem}>
                Exclusive insights and early access to new projects
              </li>
            </ul>

            <Text style={paragraph}>
              In the meantime, check out some of my most popular content:
            </Text>

            <Section style={linkBox}>
              <Link href={`${baseUrl}/blog`} style={linkButton}>
                Read the Blog
              </Link>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              You&apos;re receiving this because you subscribed at ezeikel.dev.
              <br />
              <Link
                href={`${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`}
                style={unsubscribeLink}
              >
                Unsubscribe
              </Link>
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

const list = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.8',
  margin: '16px 0',
  paddingLeft: '24px',
};

const listItem = {
  margin: '8px 0',
};

const linkBox = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const linkButton = {
  backgroundColor: '#1d1d1d',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
};

const footer = {
  color: '#737373',
  fontSize: '12px',
  lineHeight: '1.6',
  textAlign: 'center' as const,
};

const unsubscribeLink = {
  color: '#737373',
  textDecoration: 'underline',
};
