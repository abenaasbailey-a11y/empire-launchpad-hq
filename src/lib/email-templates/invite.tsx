import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to Her Empire Era</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandText}>HER EMPIRE ERA</Text>
        </Section>
        <Hr style={goldDivider} />
        <Heading style={h1}>You've Been Invited</Heading>
        <Text style={text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Accept your invitation to create your account and step into a
          community of women building, launching, and growing their empires.
        </Text>
        <Section style={{ textAlign: 'center' as const, margin: '30px 0' }}>
          <Button style={button} href={confirmationUrl}>
            Accept Invitation
          </Button>
        </Section>
        <Hr style={blushDivider} />
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this
          email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

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
const link = { color: '#c9a35e', textDecoration: 'underline' }
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
