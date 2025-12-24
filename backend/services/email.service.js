import { transporter } from "../config/email.config.js";
import { Verification_Email_Template, Welcome_Email_Template } from "../templates/email.template.js";


export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Verify your Email", 
            text: "Verify your Email", 
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}
export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_FROM,

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}", name)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}