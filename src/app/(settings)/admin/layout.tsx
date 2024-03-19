import RoleGate from '@/components/role-gate'
import { Card, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import Navbar from './nav'
import { BeatLoader } from 'react-spinners'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 justify-center'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center gap-10'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <div className='flex items-center w-full justify-center'></div>
            <Navbar />
          </div>
        </CardHeader>
      </Card>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className='space-y-8'>{children}</div>
      </RoleGate>
    </div>
  )
}

export default AdminLayout
