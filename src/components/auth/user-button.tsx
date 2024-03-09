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
import { Button } from '../ui/button'
import { ExitIcon } from '@radix-ui/react-icons'

export default function UserButton() {
  const user = useCurrentUser()
  console.log('dfsf')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-purple-800'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
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
