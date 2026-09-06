import type { APIRoute } from 'astro';
import { CONTACT_SUBJECTS, sendContactEmail } from '../../lib/contact-mailer';

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  // Honeypot: real visitors never see or fill this field (hidden via CSS).
  // A filled value means a bot — pretend success without sending anything.
  if (String(form.get('company') ?? '').trim() !== '') {
    return redirect('/contact?sent=true');
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const subject = String(form.get('subject') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  const isValidSubject = (CONTACT_SUBJECTS as readonly string[]).includes(subject);
  if (!name || !email || !message || !isValidSubject || !EMAIL_PATTERN.test(email)) {
    return redirect('/contact?error=invalid');
  }

  try {
    await sendContactEmail({ name, email, subject, message });
  } catch (err) {
    console.error('Failed to send contact email', err);
    return redirect('/contact?error=send-failed');
  }

  return redirect('/contact?sent=true');
};
