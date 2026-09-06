import { Resend } from 'resend';

const apiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

export async function sendDownloadEmail(to: string, ebookTitle: string, downloadUrl: string) {
  if (!apiKey || !fromEmail) {
    throw new Error('RESEND_API_KEY / RESEND_FROM_EMAIL is not set');
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: fromEmail,
    to,
    subject: `Your download: ${ebookTitle}`,
    html: `
      <p>Thanks for your purchase!</p>
      <p><a href="${downloadUrl}">Download ${ebookTitle}</a></p>
      <p>This link expires in 7 days.</p>
    `,
  });
}
