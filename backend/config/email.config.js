import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.HOST_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASS_KEY,
    },
});
