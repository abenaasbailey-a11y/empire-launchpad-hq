import type { ComponentType } from 'react'

import { template as membershipReceipt } from './membership-receipt'
import { template as membershipCancelScheduled } from './membership-cancel-scheduled'
import { template as membershipEnded } from './membership-ended'
import { template as membershipPaymentFailed } from './membership-payment-failed'
import { template as serviceRequestConfirmation } from './service-request-confirmation'
import { template as onboardingReminder } from './onboarding-reminder'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'membership-receipt': membershipReceipt,
  'membership-cancel-scheduled': membershipCancelScheduled,
  'membership-ended': membershipEnded,
  'membership-payment-failed': membershipPaymentFailed,
  'service-request-confirmation': serviceRequestConfirmation,
}
