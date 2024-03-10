import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='flex flex-col items-center my-12 container'>
      <div className='flex items-center justify-between w-full'>
        <Skeleton className='md:w-[300px] w-[250px] h-[35px]' />
        <Skeleton className='md:w-[150px] w-[50px] h-[35px]' />
      </div>
      <Separator className='my-10' />
      <div className='grid md:grid-cols-2 gap-8'>
        <Skeleton className='w-[650px] h-[612px]' />
        <Skeleton className='w-[650px] h-[612px]' />
        <Skeleton className='w-[650px] h-[612px]' />
      </div>
    </div>
  )
}

export default Loading
