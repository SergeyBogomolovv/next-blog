'use client'
import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import LogoutButton from './logout-button'
import { IoMdSettings } from 'react-icons/io'
import { ExitIcon } from '@radix-ui/react-icons'
import { MdAdminPanelSettings } from 'react-icons/md'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function UserButton() {
  const session = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'} className='w-full'>
          <Avatar className='w-6 h-6 mr-2'>
            <AvatarImage src={session?.data?.user?.image || ''} />
            <AvatarFallback className='bg-black dark:bg-white'>
              <FaUser className='text-white dark:text-black' />
            </AvatarFallback>
          </Avatar>
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        {session?.data?.user?.role === 'ADMIN' && (
          <Link href={'/admin'}>
            <DropdownMenuItem>
              <MdAdminPanelSettings className='w-4 h-4 mr-2' />
              Admin
            </DropdownMenuItem>
          </Link>
        )}
        <Link href={'/settings'}>
          <DropdownMenuItem>
            <IoMdSettings className='w-4 h-4 mr-2' />
            Settings
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='w-4 h-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
