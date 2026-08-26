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
  accessUntil?: string
  testMode?: boolean
}

const Email = ({
  firstName,
  planName = 'Empire Member',
  accessUntil = '',
  testMode,
}: Props) => (
  <EmpireLayout
    preview="Your membership is set to end — here is what happens next"
    title="Your cancellation is confirmed"
    testMode={testMode}
  >
    <Text style={paragraph}>
      {firstName ? `${firstName}, ` : ''}we have cancelled the automatic renewal on your{' '}
      {planName} membership. Nothing has been switched off — you keep full access for the time you
      have already paid for.
    </Text>

    <Section style={detailBox}>
      <Text style={detailLabel}>Plan</Text>
      <Text style={detailValue}>{planName}</Text>
      <Text style={detailLabel}>Access continues until</Text>
      <Text style={{ ...detailValue, margin: '2px 0 0' }}>
        {accessUntil || 'the end of your current billing period'}
      </Text>
    </Section>

    <Text style={paragraph}>
      Until then, Victoria AI, the Empire Prompt Vault and the Opportunity Center stay open. After
      that date you will not be charged again.
    </Text>

    <Text style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/membership`} style={button}>
        Keep my membership
      </Link>
    </Text>

    <Text style={smallNote}>
      Changed your mind? You can restart any time from Billing &amp; account in your dashboard, and
      your saved work will still be there.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: 'Your membership cancellation is confirmed',
  displayName: 'Membership cancellation scheduled',
  previewData: {
    firstName: 'Abenaa',
    planName: 'Empire Member',
    accessUntil: 'September 26, 2026',
  },
} satisfies TemplateEntry
