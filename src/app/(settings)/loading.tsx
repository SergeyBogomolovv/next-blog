import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-grow items-center justify-center'>
      <div className='md:w-[800px] w-full m-5 flex flex-col gap-y-10 md:p-10 sm:p-8 p-6 rounded-lg'>
        <Skeleton className='w-11/12 mx-auto h-[30px]' />
        <Skeleton className='w-11/12 mx-auto h-[30px]' />
        <Skeleton className='w-11/12 mx-auto h-[30px]' />
      </div>
    </div>
  )
}
