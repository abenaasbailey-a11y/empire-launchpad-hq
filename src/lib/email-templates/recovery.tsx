import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your password — Her Empire Era</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandText}>HER EMPIRE ERA</Text>
        </Section>
        <Hr style={goldDivider} />
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>
          We received a request to reset your password for {siteName}. Click the
          button below to choose a new password and regain access to your
          empire.
        </Text>
        <Section style={{ textAlign: 'center' as const, margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>
            Reset Password
          </Button>
        </Section>
        <Hr style={blushDivider} />
        <Text style={footer}>
          If you didn't request a password reset, you can safely ignore this
          email. Your password will not be changed.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '0', maxWidth: '560px', margin: '0 auto' }
const header = { backgroundColor: '#1a1612', padding: '28px 25px', textAlign: 'center' as const }
const brandText = {
  fontSize: '18px',
  fontWeight: 'bold' as const,
  letterSpacing: '4px',
  color: '#c9a35e',
  margin: '0',
  fontFamily: 'Georgia, "Times New Roman", serif',
}
const goldDivider = {
  border: 'none',
  borderTop: '3px solid #c9a35e',
  margin: '0',
}
const blushDivider = {
  border: 'none',
  borderTop: '1px solid #e8d5d0',
  margin: '30px 0 0',
}
const h1 = {
  fontSize: '26px',
  fontWeight: 'normal' as const,
  color: '#1a1612',
  margin: '30px 25px 20px',
  fontFamily: 'Georgia, "Times New Roman", serif',
}
const text = {
  fontSize: '15px',
  color: '#5a534b',
  lineHeight: '1.6',
  margin: '0 25px 20px',
}
const button = {
  backgroundColor: '#c9a35e',
  color: '#1a1612',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '6px',
  padding: '14px 36px',
  textDecoration: 'none',
  letterSpacing: '1px',
}
const footer = { fontSize: '12px', color: '#999999', margin: '20px 25px 30px' }
