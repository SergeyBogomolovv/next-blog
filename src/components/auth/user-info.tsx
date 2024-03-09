import { ExtendedUser } from '@/auth'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
interface Props {
  user?: ExtendedUser
  label: string
}
export default function UserInfo({ user, label }: Props) {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>ID</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Name</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.name}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Email</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Role</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.role}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>2FA</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
