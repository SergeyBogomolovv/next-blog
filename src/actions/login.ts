'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/lib/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail'
import * as bcrypt from 'bcryptjs'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { db } from '@/lib/db'
import { getTwoFactorConformationByUserId } from '@/data/two-factor-conformation'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }
  const { email, password, code } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'invalid credentials' }
  }
  const isValidPassword = await bcrypt.compare(password, existingUser.password)
  if (!isValidPassword) return { error: 'Invalid password' }
  if (!existingUser.emailVerified) {
    const verifactionToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(verifactionToken.email, verifactionToken.token)
    return { succes: 'Confirmation email sent!' }
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      if (!twoFactorToken) {
        return { error: 'Invalid token' }
      }
      if (twoFactorToken.token !== code) {
        console.log(code)
        return { error: 'Invalid token' }
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) {
        return { error: 'token has expired' }
      }
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })
      const existingTwoFactorConformation =
        await getTwoFactorConformationByUserId(existingUser.id)
      if (existingTwoFactorConformation) {
        await db.twoFactorConformation.delete({
          where: { id: existingTwoFactorConformation.id },
        })
      }
      await db.twoFactorConformation.create({
        data: { userId: existingUser.id },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)
      return { twoFactor: true }
    }
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid credentials' }
        default:
          return { error: 'something went wrong' }
      }
    }
    throw error
  }

  return { succes: '' }
}
