'use client'

import { signOut } from 'next-auth/react'

interface Props {
  children?: React.ReactNode
}
export default function LogoutButton({ children }: Props) {
  const onClick = () => {
    signOut()
  }
  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}
