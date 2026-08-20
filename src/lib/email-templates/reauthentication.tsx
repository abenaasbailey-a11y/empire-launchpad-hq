import * as React from 'react'

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
} from '@react-email/components'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code — Her Empire Era</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandText}>HER EMPIRE ERA</Text>
        </Section>
        <Hr style={goldDivider} />
        <Heading style={h1}>Confirm Your Identity</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Section style={{ textAlign: 'center' as const, margin: '25px 0' }}>
          <Text style={codeStyle}>{token}</Text>
        </Section>
        <Hr style={blushDivider} />
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can
          safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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
const codeStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '32px',
  fontWeight: 'bold' as const,
  color: '#c9a35e',
  letterSpacing: '8px',
  margin: '0 25px 10px',
}
const footer = { fontSize: '12px', color: '#999999', margin: '20px 25px 30px' }
