'use server'

import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'

export const admin = async () => {
  const session = await auth()
  if (session?.user.role === UserRole.ADMIN) {
    return { succes: 'Allowed' }
  } else {
    return { error: 'Forbiden' }
  }
}
