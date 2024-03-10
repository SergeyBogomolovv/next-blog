import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex items-center justify-center flex-grow'>
      <div className='w-[400px] h-[550px] flex flex-col border rounded-lg p-10 gap-6'>
        <Skeleton className='w-3/12 mx-auto h-[25px]' />
        <Skeleton className='w-5/12 mx-auto h-[15px]' />
        <div className='grid gap-6 mt-5'>
          <div className='grid gap-3'>
            <Skeleton className='w-3/12 h-[15px]' />
            <Skeleton className='w-full h-[30px]' />
          </div>
          <div className='grid gap-3'>
            <Skeleton className='w-3/12 h-[15px]' />
            <Skeleton className='w-full h-[30px]' />
          </div>
          <div className='grid gap-3'>
            <Skeleton className='w-3/12 h-[15px]' />
            <Skeleton className='w-full h-[30px]' />
          </div>
          <Skeleton className='w-full h-[35px]' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Skeleton className='w-full h-[30px]' />
          <Skeleton className='w-full h-[30px]' />
        </div>
      </div>
    </div>
  )
}
