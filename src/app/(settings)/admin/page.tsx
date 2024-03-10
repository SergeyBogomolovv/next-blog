'use client'

import { admin } from '@/actions/admin'
import FormSucces from '@/components/form-succes'
import RoleGate from '@/components/role-gate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import { toast } from 'sonner'

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('OK')
      } else {
        toast.error('ERROR')
      }
    })
  }
  const onActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error)
      }
      if (data.succes) {
        toast.success(data.succes)
      }
    })
  }
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSucces message='You are allowed to see this content' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server-action</p>
          <Button onClick={onActionClick}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API-route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage
