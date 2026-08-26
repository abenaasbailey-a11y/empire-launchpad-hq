import React from 'react'
import { Link, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import {
  EmpireLayout,
  SITE_URL,
  button,
  detailBox,
  detailLabel,
  detailValue,
  paragraph,
  smallNote,
} from './empire-layout'

interface Props {
  firstName?: string
  planName?: string
  amount?: string
  retryOn?: string
  invoiceUrl?: string
  testMode?: boolean
}

const Email = ({
  firstName,
  planName = 'Empire Member',
  amount = '',
  retryOn = '',
  invoiceUrl,
  testMode,
}: Props) => (
  <EmpireLayout
    preview="We could not process your membership payment"
    title="We could not take your payment"
    testMode={testMode}
  >
    <Text style={paragraph}>
      {firstName ? `${firstName}, ` : ''}your bank declined the latest payment for your {planName}{' '}
      membership. Your access is still on for now — updating your card is all it takes to keep it
      that way.
    </Text>

    <Section style={detailBox}>
      <Text style={detailLabel}>Plan</Text>
      <Text style={detailValue}>{planName}</Text>
      {amount ? (
        <>
          <Text style={detailLabel}>Amount due</Text>
          <Text style={detailValue}>{amount}</Text>
        </>
      ) : null}
      <Text style={detailLabel}>What happens next</Text>
      <Text style={{ ...detailValue, margin: '2px 0 0' }}>
        {retryOn ? `We will try again on ${retryOn}` : 'We will automatically try again shortly'}
      </Text>
    </Section>

    <Text style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/dashboard`} style={button}>
        Update my card
      </Link>
    </Text>

    {invoiceUrl ? (
      <Text style={smallNote}>
        You can also pay this invoice directly{' '}
        <Link href={invoiceUrl} style={{ color: '#c9a227' }}>
          here
        </Link>
        .
      </Text>
    ) : null}

    <Text style={smallNote}>
      Open Billing &amp; account in your dashboard to change your payment method in a few taps.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: 'Action needed: your membership payment did not go through',
  displayName: 'Membership payment failed',
  previewData: {
    firstName: 'Abenaa',
    planName: 'Empire Member',
    amount: '$19.99 USD',
    retryOn: 'August 29, 2026',
  },
} satisfies TemplateEntry
