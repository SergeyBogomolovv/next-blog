'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verificationtoken'
import { db } from '@/lib/db'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) return { error: 'Token is not exist' }
  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token has expired' }
  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: 'User is not exist' }
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })
  await db.verifactionToken.delete({ where: { id: existingToken.id } })
  return { succes: 'Email verified' }
}
