import nodemailer from "nodemailer";

const from = '"Wanderlist" <info@wanderlist.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Wanderlist",
    text: `
    Welcome to Wanderlist. Please confirmation your email.
    
    ${user.generateConfirmationUrl()}
    `
  };

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset your password, follow the link below.
    
    ${user.generateResetPasswordLink()}
    `
  };

  transport.sendMail(email);
}
