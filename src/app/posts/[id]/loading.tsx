import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className='container my-10 flex flex-col items-center xl:w-9/12 lg:w-10/12 md:w-11/12 w-full'>
      <div className='flex md:flex-row flex-col gap-3 md:justify-between w-full'>
        <Skeleton className='h-[45px] w-4/12' />
        <div className='flex items-center gap-4 md:self-end w-full'>
          <Skeleton className='h-[40px] w-3/12' />
          <Skeleton className='h-[40px] w-3/12' />
        </div>
      </div>
      <Separator className='mb-5 mt-3' />
      <Skeleton className='lg:w-10/12 w-full aspect-video object-cover rounded-md' />
      <Separator className='my-5' />
      <div className='flex flex-col gap-2 w-full'>
        <Skeleton className='h-[10px] w-full' />
        <Skeleton className='h-[10px] w-full' />
        <Skeleton className='h-[10px] w-full' />
        <Skeleton className='h-[10px] w-full' />
        <Skeleton className='h-[10px] w-full' />
      </div>
      <Separator className='my-5' />
      <Skeleton className='h-[100px] w-full' />
      <div className='flex flex-col gap-10 mt-8 w-full justify-start'>
        <div className='items-center flex gap-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='w-full flex flex-col gap-2'>
            <Skeleton className='h-[13px] w-4/12' />
            <Skeleton className='h-[10px] w-full' />
          </div>
        </div>
        <div className='items-center flex gap-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='w-full flex flex-col gap-2'>
            <Skeleton className='h-[13px] w-4/12' />
            <Skeleton className='h-[10px] w-full' />
          </div>
        </div>
      </div>
    </main>
  )
}
