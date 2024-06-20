import nodemailer from 'nodemailer';
import config from '../../config';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});
export const sendEmail = async (
  to: string,
  subject: string,
  emailTemplate: string,
) => {
  transporter.sendMail({
    from: `Indiano Travel <${config.email.user}>`,
    to,
    subject,
    html: emailTemplate,
  });
};
