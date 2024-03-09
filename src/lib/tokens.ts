import { getVerificationTokenByEmail } from '@/data/verificationtoken'
import { v4 as uuid } from 'uuid'
import { db } from './db'
import crypto from 'crypto'
import { getResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
export const generateVerificationToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await db.verifactionToken.delete({ where: { id: existingToken.id } })
  }
  const verifactionToken = await db.verifactionToken.create({
    data: { email, token, expires },
  })
  return verifactionToken
}

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await getResetTokenByEmail(email)
  if (existingToken) {
    await db.resetToken.delete({ where: { id: existingToken.id } })
  }
  const resetToken = await db.resetToken.create({
    data: { email, token, expires },
  })
  return resetToken
}
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await getTwoFactorTokenByEmail(email)
  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } })
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: { token, email, expires },
  })
  return twoFactorToken
}
