import { Card, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export default function SettingsLoading() {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-col gap-10'>
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-40' />
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
      </CardHeader>
    </Card>
  )
}
