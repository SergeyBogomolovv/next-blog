'use server'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 7)
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'This email is already taken' }
  }
  await db.user.create({ data: { name, email, password: hashedPassword } })
  const verifactionToken = await generateVerificationToken(email)
  await sendVerificationEmail(verifactionToken.email, verifactionToken.token)

  return { succes: 'Confirmation email sent' }
}
