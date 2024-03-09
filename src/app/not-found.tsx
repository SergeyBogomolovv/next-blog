import BackButton from '@/components/return-button'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center h-full flex-col gap-10'>
      <h1 className='text-6xl font-extrabold'>
        Sorry, this page did not found
      </h1>
      <BackButton>
        <Button size='lg'>Return</Button>
      </BackButton>
    </div>
  )
}

export default NotFoundPage
