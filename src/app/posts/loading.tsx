import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='flex flex-col items-center my-12 container w-full'>
      <div className='flex items-center justify-between w-full'>
        <Skeleton className='md:w-[300px] w-[250px] h-[35px]' />
        <Skeleton className='md:w-[150px] w-[50px] h-[35px]' />
      </div>
      <Separator className='my-10' />
      <div className='grid md:grid-cols-2 gap-8 w-full'>
        <Skeleton className='w-full md:h-[612px] h-[400px]' />
        <Skeleton className='w-full md:h-[612px] h-[400px]' />
        <Skeleton className='w-full md:h-[612px] h-[400px]' />
      </div>
    </div>
  )
}

export default Loading
