import { Card, CardHeader } from '@/components/ui/card'
import NavTest from './nav'

const SuggestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 justify-center-center'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold'>My Suggestions</h1>
            <NavTest />
          </div>
        </CardHeader>
      </Card>
      <div className='space-y-8'>{children}</div>
    </div>
  )
}

export default SuggestionsLayout
