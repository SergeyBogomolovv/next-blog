import { Skeleton } from '@/components/ui/skeleton'

const LoadingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center container flex-grow w-full'>
      <div className='grid md:grid-cols-2 gap-10 justify-center items-center container my-10 w-full'>
        <div className='flex flex-col gap-10'>
          <Skeleton className='w-8/12 h-[45px]' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
          </div>
          <div className='grid md:grid-cols-3 gap-6'>
            <Skeleton className='w-full h-[200px]' />
            <Skeleton className='w-full h-[200px]' />
            <Skeleton className='w-full h-[200px]' />
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
            <Skeleton className='w-full h-2' />
          </div>
        </div>
        <Skeleton className='w-full h-full md:block hidden' />
      </div>
    </div>
  )
}

export default LoadingPage
