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
import { useCurrentUser } from '@/hooks/use-current-user'
import { GoBrowser } from 'react-icons/go'

export default function UserButton() {
  const user = useCurrentUser()
  const avatar = user?.image?.startsWith('avatars/')
    ? `https://next-blog.storage.yandexcloud.net/${user?.image}`
    : user?.image

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full'>
        <Button variant={'outline'} asChild>
          <div className='w-full'>
            <Avatar className='w-6 h-6 mr-2'>
              <AvatarImage
                src={avatar || ''}
                className='aspect-square object-cover'
              />
              <AvatarFallback className='bg-black dark:bg-white'>
                <FaUser className='text-white dark:text-black' />
              </AvatarFallback>
            </Avatar>
            Profile
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {user?.role === 'ADMIN' && (
          <Link href={'/admin'}>
            <DropdownMenuItem>
              <MdAdminPanelSettings className='w-4 h-4 mr-2' />
              Dashboard
            </DropdownMenuItem>
          </Link>
        )}
        <Link href={'/my-suggestions'}>
          <DropdownMenuItem>
            <GoBrowser className='w-4 h-4 mr-2' />
            My posts
          </DropdownMenuItem>
        </Link>
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
