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
  name?: string
  serviceType?: string
  businessName?: string
  budget?: string
  requestRef?: string
}

const Email = ({
  name,
  serviceType = 'your service',
  businessName,
  budget,
  requestRef,
}: Props) => (
  <EmpireLayout
    preview={`We received your ${serviceType} request`}
    title="Your request is in"
  >
    <Text style={paragraph}>
      {name ? `${name}, ` : ''}
      thank you for submitting your request. We've received your project
      details and will review them right away.
    </Text>

    <Text style={paragraph}>
      Here's what happens next:
    </Text>

    <Section style={{ margin: '0 0 20px', paddingLeft: '4px' }}>
      <Text style={{ ...smallNote, margin: '0 0 6px' }}>
        1. We review your request within one business day.
      </Text>
      <Text style={{ ...smallNote, margin: '0 0 6px' }}>
        2. We email you a fixed quote with a secure invoice — no surprises, no
        payment until you approve.
      </Text>
      <Text style={{ ...smallNote, margin: '0 0 6px' }}>
        3. Once approved, your finished work is delivered within the stated
        turnaround, with one round of revisions included.
      </Text>
    </Section>

    <Section style={detailBox}>
      <Text style={detailLabel}>Service requested</Text>
      <Text style={detailValue}>{serviceType}</Text>
      {businessName ? (
        <>
          <Text style={detailLabel}>Business</Text>
          <Text style={detailValue}>{businessName}</Text>
        </>
      ) : null}
      {budget ? (
        <>
          <Text style={detailLabel}>Budget noted</Text>
          <Text style={detailValue}>{budget}</Text>
        </>
      ) : null}
      {requestRef ? (
        <>
          <Text style={detailLabel}>Request reference</Text>
          <Text style={{ ...detailValue, margin: '2px 0 0' }}>{requestRef}</Text>
        </>
      ) : null}
    </Section>

    <Text style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/join`} style={button}>
        Join free while you wait
      </Link>
    </Text>

    <Text style={smallNote}>
      Questions or want to add details? Reply to this email or write to us at{' '}
      <Link href="mailto:support@yourempireconcierge.com" style={{ color: '#c9a227' }}>
        support@yourempireconcierge.com
      </Link>
      .
    </Text>

    <Text style={smallNote}>
      No payment has been taken. You'll approve your fixed quote before any
      work begins.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: (data: Record<string, unknown>) =>
    `We received your ${(data?.['serviceType'] as string) ?? 'service'} request`,
  displayName: 'Service request confirmation',
  previewData: {
    name: 'Abenaa',
    serviceType: 'Government Grant Writing',
    businessName: 'Her Empire Era LLC',
    budget: '$500',
    requestRef: 'SR-2026-0042',
  },
} satisfies TemplateEntry
