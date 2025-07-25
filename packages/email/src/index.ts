import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import type { ReactElement } from 'react';
import { Resend } from 'resend';
import { keys } from '../keys';

const env = keys();

export const getResend = () => {
  if (!env.RESEND_TOKEN) {
    throw new Error('RESEND_TOKEN is required for Resend service');
  }
  return new Resend(env.RESEND_TOKEN);
};

// Nodemailer transporter for local development
const createSMTPTransporter = () => {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
  });
};

// Email service that switches between Resend and SMTP based on environment
export const emailService = {
  async send(options: {
    to: string | string[];
    subject: string;
    template: ReactElement;
    from?: string;
  }) {
    const isDevelopment = env.NODE_ENV === 'development';

    if (isDevelopment) {
      // Use MailHog for local development
      const transporter = createSMTPTransporter();

      const emailHTML = await render(options.template);

      const result = await transporter.sendMail({
        from: options.from || env.SMTP_FROM,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: emailHTML,
      });

      return result;
    }
    if (!(env.RESEND_TOKEN && env.RESEND_FROM)) {
      throw new Error(
        'RESEND_TOKEN and RESEND_FROM must be set for production email'
      );
    }

    const resend = getResend();
    return await resend.emails.send({
      from: options.from || env.RESEND_FROM,
      to: options.to,
      subject: options.subject,
      react: options.template,
    });
  },
};

export const smtpTransporter = createSMTPTransporter();
