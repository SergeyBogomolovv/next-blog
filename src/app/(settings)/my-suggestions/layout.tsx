import RoleGate from '@/components/role-gate'
import { Card, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import Navbar from './nav'

const SuggestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 justify-center-center'>
      <Card>
        <CardHeader>
          <h1 className='text-2xl tracking-widest font-semibold text-center mb-3'>
            My Suggestions
          </h1>
          <Navbar />
        </CardHeader>
      </Card>
      <div className='space-y-8'>{children}</div>
    </div>
  )
}

export default SuggestionsLayout
