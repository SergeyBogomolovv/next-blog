'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUser } from 'react-icons/fa'

export default function Navbar() {
  const pathname = usePathname()
  const user = useCurrentUser()
  return (
    <nav className='bg-background flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm'>
      <div className='flex gap-x-2'>
        <Button
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
        >
          <Link href={'/my-posts'}>My Posts</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
        >
          <Link href={'/new-post'}>New Post</Link>
        </Button>
        {user?.role === 'ADMIN' && (
          <Button
            asChild
            variant={pathname === '/admin' ? 'default' : 'outline'}
          >
            <Link href={'/admin'}>Admin</Link>
          </Button>
        )}

        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href={'/settings'}>Settings</Link>
        </Button>
      </div>
      <Button asChild variant={pathname === '/info' ? 'default' : 'outline'}>
        <Link href={'/info'}>
          <Avatar className='w-6 h-6 mr-2'>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className='bg-black dark:bg-white'>
              <FaUser className='text-white dark:text-black' />
            </AvatarFallback>
          </Avatar>
          Profile
        </Link>
      </Button>
    </nav>
  )
}
