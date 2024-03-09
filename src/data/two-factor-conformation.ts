'use server'

import { db } from '@/lib/db'

export const getTwoFactorConformationByUserId = async (id: string) => {
  try {
    const twoFactorConformation = await db.twoFactorConformation.findUnique({
      where: { userId: id },
    })
    return twoFactorConformation
  } catch (error) {
    return null
  }
}
