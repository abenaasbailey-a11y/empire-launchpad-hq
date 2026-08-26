import React from 'react'
import { Link, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmpireLayout, SITE_URL, button, paragraph, smallNote } from './empire-layout'

interface Props {
  firstName?: string
  planName?: string
  testMode?: boolean
}

const Email = ({ firstName, planName = 'Empire Member', testMode }: Props) => (
  <EmpireLayout
    preview="Your membership access has ended"
    title="Your membership has ended"
    testMode={testMode}
  >
    <Text style={paragraph}>
      {firstName ? `${firstName}, ` : ''}your {planName} membership has now ended and you will not
      be charged again. Thank you for building with us.
    </Text>

    <Text style={paragraph}>
      Your account and everything you saved are still here. The moment you want Victoria AI and the
      Empire Prompt Vault back, one tap restores them.
    </Text>

    <Text style={{ margin: '0 0 20px' }}>
      <Link href={`${SITE_URL}/membership`} style={button}>
        Restart my membership
      </Link>
    </Text>

    <Text style={smallNote}>
      If this cancellation was not intentional, reply to this email and we will sort it out.
    </Text>
  </EmpireLayout>
)

export const template = {
  component: Email,
  subject: 'Your Her Empire Era membership has ended',
  displayName: 'Membership ended',
  previewData: { firstName: 'Abenaa', planName: 'Empire Member' },
} satisfies TemplateEntry
