import { Separator } from '../ui/separator'
import Links from './links'
import UserButton from '../auth/user-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import ThemeSwitch from '../theme-switch'
import { FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import MobileNav from './mobile'
import { auth } from '@/lib/auth'

export default async function Navbar() {
  const session = await auth()
  return (
    <>
      <div className='flex justify-between items-center py-3 lg:px-20 px-3 sm:px-8 md:px-12'>
        <Links />
        <MobileNav />
        <div className='md:flex gap-8 items-center hidden'>
          <Button variant={'outline'} asChild>
            <Link href={'/my-suggestions'}>
              <FaCreativeCommonsSamplingPlus className='h-6 w-6 mr-2' />
              Suggestions
            </Link>
          </Button>
          {session?.user ? (
            <UserButton />
          ) : (
            <Button variant={'outline'} asChild>
              <Link href={'/auth/login'}>
                <BsFillPersonFill className='h-6 w-6 mr-2' />
                Login
              </Link>
            </Button>
          )}
          <ThemeSwitch />
        </div>
      </div>
      <Separator />
    </>
  )
}
