import { Card, CardHeader } from '@/components/ui/card'
import NavTest from './nav'

const SuggestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 justify-center'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center gap-10'>
            <h1 className='md:text-2xl text-xl font-semibold'>
              My Suggestions
            </h1>
            <NavTest />
          </div>
        </CardHeader>
      </Card>
      <div className='space-y-8'>{children}</div>
    </div>
  )
}

export default SuggestionsLayout
