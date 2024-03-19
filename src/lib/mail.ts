import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'geraxfn@gmail.com',
    pass: 'rvsm epcq nzcf obmm',
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: `Confirm your email`,
    text: '',
    html: `<p>Click <a href=${confirmLink}>here</a></p>`,
  })
}

export const sendResetTokenEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: `Next auth`,
    text: 'Password reset',
    html: `<p>To reset a password click <a href=${confirmLink}>here</a></p>`,
  })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your two factor code`,
    text: '',
    html: `<p>Your code to sign in is ${token}</p>`,
  })
}
