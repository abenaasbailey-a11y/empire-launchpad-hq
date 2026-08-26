import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export const SITE_URL = 'https://herempireera.com'

export const colors = {
  ink: '#0f0d0b',
  gold: '#c9a227',
  goldSoft: '#e6cf8b',
  cream: '#f7f1e6',
  body: '#2b2620',
  muted: '#6f665a',
  line: '#e7ddcc',
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: '0',
  padding: '0',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '0 0 32px',
}

const header = {
  backgroundColor: colors.ink,
  padding: '32px 32px 28px',
  textAlign: 'center' as const,
}

const brand = {
  color: colors.gold,
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  margin: '0',
}

const headline = {
  color: colors.cream,
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '400' as const,
  margin: '14px 0 0',
}

const content = {
  padding: '28px 32px 8px',
}

const footer = {
  padding: '0 32px',
}

const footerText = {
  color: colors.muted,
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '0 0 6px',
}

export const paragraph = {
  color: colors.body,
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 16px',
}

export const smallNote = {
  color: colors.muted,
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

export const button = {
  display: 'inline-block',
  backgroundColor: colors.ink,
  color: colors.goldSoft,
  fontSize: '13px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  padding: '14px 26px',
  borderRadius: '999px',
}

export const detailBox = {
  backgroundColor: colors.cream,
  border: `1px solid ${colors.line}`,
  borderRadius: '12px',
  padding: '18px 20px',
  margin: '0 0 20px',
}

export const detailLabel = {
  color: colors.muted,
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  margin: '0',
}

export const detailValue = {
  color: colors.ink,
  fontSize: '16px',
  margin: '2px 0 14px',
}

interface LayoutProps {
  preview: string
  title: string
  testMode?: boolean | undefined
  children: React.ReactNode
}

export const EmpireLayout = ({ preview, title, testMode, children }: LayoutProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img
            src={`${SITE_URL}/icon-192x192.png`}
            width="52"
            height="52"
            alt="Her Empire Era"
            style={{ margin: '0 auto 4px', display: 'block' }}
          />
          <Text style={brand}>Her Empire Era</Text>
          <Heading as="h1" style={headline}>
            {title}
          </Heading>
        </Section>
        <Section style={content}>
          {testMode ? (
            <Text style={smallNote}>
              Test mode — this message relates to a test-mode subscription, not a real charge.
            </Text>
          ) : null}
          {children}
        </Section>
        <Hr style={{ borderColor: colors.line, margin: '24px 32px' }} />
        <Section style={footer}>
          <Text style={footerText}>
            Manage your membership any time from your{' '}
            <Link href={`${SITE_URL}/dashboard`} style={{ color: colors.gold }}>
              dashboard
            </Link>
            .
          </Text>
          <Text style={footerText}>Her Empire Era LLC · {SITE_URL}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)
