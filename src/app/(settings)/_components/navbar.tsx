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
    <nav className='bg-secondary flex md:flex-row flex-col gap-2 justify-between items-center p-4 rounded-xl shadow-sm'>
      <div className='flex gap-2 md:flex-row flex-col w-full'>
        <Button
          asChild
          variant={
            pathname.startsWith('/my-suggestions') ? 'default' : 'outline'
          }
        >
          <Link href={'/my-suggestions'}>My Suggestions</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname.startsWith('/new-suggestion') ? 'default' : 'outline'
          }
        >
          <Link href={'/new-suggestion'}>Suggest a Post</Link>
        </Button>
        {user?.role === 'ADMIN' && (
          <Button
            asChild
            variant={pathname.startsWith('/admin') ? 'default' : 'outline'}
          >
            <Link href={'/admin'}>Dashboard</Link>
          </Button>
        )}

        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href={'/settings'}>Settings</Link>
        </Button>
      </div>
      <Button
        asChild
        variant={pathname === '/info' ? 'default' : 'outline'}
        className='w-full md:w-auto'
      >
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
