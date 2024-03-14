'use server'
import * as z from 'zod'
import { SettingsSchema } from '@/schemas'
import { currentUser } from './current-user'
import { getUserByEmail, getUserById } from '@/data/user'
import { db } from '@/lib/db'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { signOut } from '@/lib/auth'
import { saveFile } from '@/service/file-service'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }
  const user = await currentUser()
  if (!user) return { error: 'Unauthorized' }
  const dbUser = await getUserById(user.id)
  if (!dbUser) return { error: 'Unauthorized' }
  if (user.isOAuth) {
    validatedFields.data.email = undefined
    validatedFields.data.isTwoFactorEnabled = undefined
  }
  if (validatedFields.data.email && validatedFields.data.email !== user.email) {
    const existingUser = await getUserByEmail(validatedFields.data.email)
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'This email is already in use' }
    }
    const verificationToken = await generateVerificationToken(
      validatedFields.data.email
    )
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    await db.user.update({
      where: { id: user.id },
      data: { email: validatedFields.data.email, emailVerified: null },
    })
    await signOut()
    return { succes: 'Verification email sent' }
  }
  await db.user.update({
    where: { id: user.id },
    data: { ...validatedFields.data },
  })
  return { succes: 'Settings updated' }
}
export const changeLogo = async (data: FormData) => {
  const image = data.get('image')
  if (!image) return { error: 'Invalid fields' }
  const user = await currentUser()
  const dbUser = await getUserById(user?.id)
  if (!dbUser) return { error: 'No acces' }
  try {
    const newLogoName = await saveFile(image)
    await db.user.update({
      where: { id: dbUser.id },
      data: { image: newLogoName },
    })
    return { succes: 'Logo updated', logo: newLogoName }
  } catch (error) {
    return { error: 'InvalidFile' }
  }
}
