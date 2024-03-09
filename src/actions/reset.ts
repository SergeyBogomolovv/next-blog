'use server'
import { getUserByEmail } from '@/data/user'
import { sendResetTokenEmail } from '@/lib/mail'
import { generateResetPasswordToken } from '@/lib/tokens'
import { ResetShema } from '@/schemas'
import { z } from 'zod'

export const resetPassword = async (values: z.infer<typeof ResetShema>) => {
  const validatedFields = ResetShema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }
  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'ivalid email' }
  }
  const resetToken = await generateResetPasswordToken(email)
  await sendResetTokenEmail(resetToken.email, resetToken.token)
  return { succes: 'Reset email sent' }
}
