import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type AdminNotificationEmailProps = {
  type: 'contact' | 'newsletter' | 'hire';
  name: string;
  email: string;
  message?: string;
  additionalInfo?: Record<string, string>;
};

export default function AdminNotificationEmail({
  type,
  name,
  email,
  message,
  additionalInfo,
}: AdminNotificationEmailProps) {
  const typeLabels = {
    contact: 'New Contact Form Submission',
    newsletter: 'New Newsletter Subscriber',
    hire: 'New Hire Request',
  };

  return (
    <Html>
      <Head />
      <Preview>{typeLabels[type]} from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>{typeLabels[type]}</Heading>

            <Section style={infoBox}>
              <Text style={label}>Name</Text>
              <Text style={value}>{name}</Text>

              <Text style={label}>Email</Text>
              <Text style={value}>{email}</Text>

              {message && (
                <>
                  <Text style={label}>Message</Text>
                  <Text style={value}>{message}</Text>
                </>
              )}

              {additionalInfo &&
                Object.entries(additionalInfo).map(([key, val]) => (
                  <div key={key}>
                    <Text style={label}>{key}</Text>
                    <Text style={value}>{val}</Text>
                  </div>
                ))}
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Received at {new Date().toLocaleString('en-GB', {
                timeZone: 'Europe/London',
              })}
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

const infoBox = {
  backgroundColor: '#f8f7f4',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const label = {
  color: '#737373',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '12px 0 4px',
};

const value = {
  color: '#1d1d1d',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 8px',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
};

const footer = {
  color: '#737373',
  fontSize: '12px',
};
