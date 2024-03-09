import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

const font = Poppins({ subsets: ['latin'], weight: ['600'] })
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-center items-center'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-extrabold drop-shadow-md text-white',
            font.className
          )}
        >
          Auth
        </h1>
        <p className='text-white text-large'>A simple auth service</p>
        <div>
          <LoginButton>
            <Button size='lg'>Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
