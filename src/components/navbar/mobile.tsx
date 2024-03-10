'use client'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { IoMenu } from 'react-icons/io5'
import ThemeSwitch from '../theme-switch'
import Link from 'next/link'
import UserButton from '../auth/user-button'
import { BsFillPersonFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { FaHome } from 'react-icons/fa'
import { TbWorldQuestion } from 'react-icons/tb'
import { SiApostrophe } from 'react-icons/si'

export default function MobileNav() {
  const session = useSession()
  return (
    <Sheet>
      <SheetTrigger>
        <Button className='md:hidden'>
          <IoMenu className='mr-2 w-5 h-5' />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col items-center'>
        <SheetHeader>
          <SheetTitle>Site Navigation</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col flex-grow gap-2 w-full'>
          <Button variant='outline' className='w-full' asChild>
            <Link href={'/'}>
              <FaHome className='h-5 w-5 mr-2' />
              Home
            </Link>
          </Button>
          <Button variant='outline' className='w-full' asChild>
            <Link href={'/posts'}>
              <SiApostrophe className='h-5 w-5 mr-2' />
              Blog
            </Link>
          </Button>
          <Button variant='outline' className='w-full' asChild>
            <Link href={'/about'}>
              <TbWorldQuestion className='h-5 w-5 mr-2' />
              About
            </Link>
          </Button>
          {session.data?.user ? (
            <UserButton />
          ) : (
            <Button variant={'outline'} asChild>
              <Link href={'/auth/login'}>
                <BsFillPersonFill className='h-5 w-5 mr-2' />
                Login
              </Link>
            </Button>
          )}
        </div>
        <SheetFooter>
          <ThemeSwitch />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
