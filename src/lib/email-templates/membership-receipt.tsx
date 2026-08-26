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
  paidOn?: string
  renewsOn?: string
  invoiceUrl?: string
  isRenewal?: boolean
  testMode?: boolean
}

const Email = ({
  firstName,
  planName = 'Empire Member',
  amount = '',
  paidOn = '',
  renewsOn = '',
  invoiceUrl,
  isRenewal,
  testMode,
}: Props) => (
  <EmpireLayout
    preview={isRenewal ? `Your ${planName} renewal receipt` : `Welcome to ${planName}`}
    title={isRenewal ? 'Your membership renewed' : 'Welcome to your empire era'}
    testMode={testMode}
  >
    <Text style={paragraph}>
      {firstName ? `${firstName}, ` : ''}
      {isRenewal
        ? `your ${planName} membership renewed and your access continues without interruption.`
        : `your ${planName} membership is active. Victoria AI, the Empire Prompt Vault and the Opportunity Center are unlocked and waiting for you.`}
    </Text>

    <Section style={detailBox}>
      <Text style={detailLabel}>Plan</Text>
      <Text style={detailValue}>{planName}</Text>
      {amount ? (
        <>
          <Text style={detailLabel}>Amount paid</Text>
          <Text style={detailValue}>{amount}</Text>
        </>
      ) : null}
      {paidOn ? (
        <>
          <Text style={detailLabel}>Paid on</Text>
          <Text style={detailValue}>{paidOn}</Text>
        </>
      ) : null}
      {renewsOn ? (
        <>
          <Text style={{ ...detailLabel }}>Next renewal</Text>
          <Text style={{ ...detailValue, margin: '2px 0 0' }}>{renewsOn}</Text>
        </>
      ) : null}
    </Section>

    <Text style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/dashboard`} style={button}>
        Open my dashboard
      </Link>
    </Text>

    {invoiceUrl ? (
      <Text style={smallNote}>
        Need the full invoice?{' '}
        <Link href={invoiceUrl} style={{ color: '#c9a227' }}>
          View or download it here
        </Link>
        .
      </Text>
    ) : null}

    <Text style={smallNote}>
      You can change plans or cancel any time from Billing &amp; account in your dashboard.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: (data: Record<string, unknown>) =>
    data?.['isRenewal']
      ? `Your ${(data?.['planName'] as string) ?? 'Empire Member'} renewal receipt`
      : `Welcome to ${(data?.['planName'] as string) ?? 'Empire Member'} — your receipt`,
  displayName: 'Membership receipt',
  previewData: {
    firstName: 'Abenaa',
    planName: 'Empire Member',
    amount: '$19.99 USD',
    paidOn: 'August 26, 2026',
    renewsOn: 'September 26, 2026',
    invoiceUrl: 'https://invoice.stripe.com/example',
    isRenewal: false,
  },
} satisfies TemplateEntry
