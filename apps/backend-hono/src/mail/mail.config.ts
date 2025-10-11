import { createTransport } from 'nodemailer'
import {env} from 'shared/env/backend/env'

export const mail = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  }
})

mail.verify()