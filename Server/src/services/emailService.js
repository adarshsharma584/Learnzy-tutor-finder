import ejs from  "ejs"
import path from "path";
import { readFileSync} from "fs"
import { sendEmail } from "../config/mailer.js";

const templateDirectory = path.resolve("src/templates/email")

const loadTemplate = function (templatePath) {
  try {
    return readFileSync(path.join(templateDirectory, templatePath), "utf-8")
  } catch (error) {
    console.log("Error while loading template: ", error) 
  }
}

const renderTemplate = function (template, context) {
  try {
    return ejs.render(template, context)
  } catch (error) {
    console.log("Error while rendering template: ", error)
  }
}

const templates = {
  verification: {
    subject: "Verify your Learnzy account",
    html: loadTemplate("verification/verification.html.ejs"),
    text: loadTemplate("verification/verification.text.ejs")
  },
  resetPassword: {
    subject: "Password Reset Instructions",
    html: loadTemplate("resetPassword/resetPassword.html.ejs"),
    text: loadTemplate("resetPassword/resetPassword.text.ejs")
  }
}

const sendVerificationEmail = async (to, name, verificationCode) => {
  const html = renderTemplate(templates.verification.html, { email: to, name, verificationCode })
  const text = renderTemplate(templates.verification.text, { email: to, name, verificationCode })
  const subject = templates.verification.subject
  await sendEmail(to, subject, text, html)
}

const SendResetPasswordInstruction = async (to, resetPasswordUrl) => {
  const html = renderTemplate(templates.resetPassword.html, { email: to, resetPasswordUrl })
  const text = renderTemplate(templates.resetPassword.text, { email: to, resetPasswordUrl })
  const subject = templates.resetPassword.subject
  await sendEmail(to, subject, text, html)
}

export { sendVerificationEmail, SendResetPasswordInstruction }