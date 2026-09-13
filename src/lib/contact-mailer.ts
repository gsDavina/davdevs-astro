import { Resend } from 'resend';

export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Feedback',
  'Bug Report',
  'Collaboration / Work Inquiry',
  'E-book / Purchase Support',
  'Other',
] as const;
export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

const apiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const toEmail = import.meta.env.CONTACT_TO_EMAIL;

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactEmail(submission: ContactSubmission) {
  if (!apiKey || !fromEmail || !toEmail) {
    throw new Error('RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_TO_EMAIL is not set');
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: submission.email,
    subject: `[Dav/Devs Contact] ${submission.subject} — ${submission.name}`,
    text: `From: ${submission.name} <${submission.email}>\nSubject: ${submission.subject}\n\n${submission.message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(submission.name)} &lt;${escapeHtml(submission.email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(submission.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(submission.message).replace(/\n/g, '<br>')}</p>
    `,
  });
}
