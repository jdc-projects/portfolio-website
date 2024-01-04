'use server'

import { assert } from 'console'
import { createTransport } from 'nodemailer'
import yn from 'yn'

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: yn(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactEmail(senderName: string, senderEmail: string, senderMessage: string): Promise<boolean> {
  assert(/^[a-zA-Z ]+$/.test(senderName))
  assert(/^\S+@\S+$/.test(senderEmail))
  assert(/^[a-zA-Z ]+$/.test(senderMessage))

  const info = await transporter.sendMail({
    from: '"Portfolio Website Contact" <' + process.env.SMTP_FROM + '>',
    to: process.env.SMTP_CONTACT_TO,
    subject: senderName + " - Portfolio Website Contact Me",
    text: senderName + ' - ' + senderEmail + '\n' + senderMessage,
    html: '<h1>' + senderName + ' - ' + senderEmail + '</h1><p>' + senderMessage + '</p>',
  });

  return (
    info.accepted.length !== 0 &&
    info.rejected.length === 0
  )
}
