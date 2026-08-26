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
  nextStepTitle?: string
  nextStepBody?: string
  completedCount?: number
  totalSteps?: number
}

const Email = ({
  name,
  nextStepTitle = 'Meet Victoria',
  nextStepBody = 'Tell Victoria your offer and audience — she drafts content, pricing and plans in your voice.',
  completedCount = 0,
  totalSteps = 3,
}: Props) => (
  <EmpireLayout
    preview={`Your next move: ${nextStepTitle}`}
    title="Pick up where you left off"
  >
    <Text style={paragraph}>
      {name ? `${name}, ` : ''}
      your Her Empire Era membership is active and waiting. You've finished{' '}
      {completedCount} of {totalSteps} first moves — one short session is all it
      takes to keep building.
    </Text>

    <Section style={detailBox}>
      <Text style={detailLabel}>Your next move</Text>
      <Text style={detailValue}>{nextStepTitle}</Text>
      <Text style={{ ...smallNote, margin: '8px 0 0' }}>{nextStepBody}</Text>
    </Section>

    <Section style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/welcome`} style={button}>
        Resume where I left off
      </Link>
    </Section>

    <Text style={smallNote}>
      Your progress is saved to your account, so nothing is lost. You can also{' '}
      <Link href={`${SITE_URL}/dashboard`} style={{ color: '#c9a227' }}>
        visit your dashboard
      </Link>{' '}
      any time.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Your next move: ${data['nextStepTitle'] ?? 'Meet Victoria'}`,
  displayName: 'Onboarding reminder',
  previewData: {
    name: 'Abenaa',
    nextStepTitle: 'Browse the Prompt Vault',
    nextStepBody:
      '56 ready-to-run prompts for marketing, grants, résumés and content.',
    completedCount: 1,
    totalSteps: 3,
  },
} satisfies TemplateEntry
