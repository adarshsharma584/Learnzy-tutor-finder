import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();


export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.HOST_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASS_KEY,
    },
});