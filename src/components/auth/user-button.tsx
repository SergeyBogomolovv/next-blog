'use client'

import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from './logout-button'
import { IoMdSettings } from 'react-icons/io'
import { ExitIcon } from '@radix-ui/react-icons'
import { MdAdminPanelSettings } from 'react-icons/md'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function UserButton() {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'}>
          <Avatar className='w-6 h-6 mr-2'>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className='bg-black dark:bg-white'>
              <FaUser className='text-white dark:text-black' />
            </AvatarFallback>
          </Avatar>
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        {user?.role === 'ADMIN' && (
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
