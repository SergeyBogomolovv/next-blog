import RoleGate from '@/components/role-gate'
import { Card, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import Navbar from './nav'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 justify-center w-full'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center gap-10'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
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
