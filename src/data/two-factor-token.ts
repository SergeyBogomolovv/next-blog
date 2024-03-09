'use server'
import { db } from '@/lib/db'

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const token = await db.twoFactorToken.findFirst({
      where: { email },
    })
    return token
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    })
    return twoFactorToken
  } catch (error) {
    return null
  }
}
