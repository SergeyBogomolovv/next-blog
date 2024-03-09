'use client'

import { userCurrentRole } from '@/hooks/user-current-role'
import { UserRole } from '@prisma/client'
import FormError from './form-error'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}
export default function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = userCurrentRole()
  if (role !== allowedRole) {
    return <FormError message='No acces' />
  }
  return <>{children}</>
}
