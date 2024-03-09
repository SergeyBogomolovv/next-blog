'use server'
import { getResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import * as bcrypt from 'bcryptjs'
import { NewPasswordSchema } from '@/schemas'
import { z } from 'zod'
import { db } from '@/lib/db'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: 'Missing token' }
  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }
  const { password, passwordAgain } = validatedFields.data
  if (password !== passwordAgain) return { error: 'Passwords doesnot match' }
  const existingToken = await getResetTokenByToken(token)
  if (!existingToken) return { error: 'Invalid token' }
  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token has expired' }
  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: 'user does not exist' }
  const hashedPassword = await bcrypt.hash(password, 7)
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })
  await db.resetToken.delete({ where: { id: existingToken.id } })
  return { succes: 'Password chanched' }
}
