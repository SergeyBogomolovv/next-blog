'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsBan, BsCheck2Circle } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { FaCaretDown } from 'react-icons/fa'

export default function NavigationButton() {
  const pathname = usePathname()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'secondary'} asChild>
          <div>
            {pathname === '/admin' && <CiClock2 className='w-4 h-4 mr-2' />}
            {pathname === '/admin/accepted' && (
              <BsCheck2Circle className='w-4 h-4 mr-2' />
            )}
            {pathname === '/admin/declined' && (
              <BsBan className='w-4 h-4 mr-2' />
            )}
            {pathname === '/admin' && 'Latest'}
            {pathname === '/admin/accepted' && 'Accepted'}
            {pathname === '/admin/declined' && 'Declined'}
            <FaCaretDown className='w-3 h-3 ml-2' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <Link href={'/admin'}>
          <DropdownMenuItem>
            <CiClock2 className='w-4 h-4 mr-2' />
            Latest
          </DropdownMenuItem>
        </Link>
        <Link href={'/admin/accepted'}>
          <DropdownMenuItem>
            <BsCheck2Circle className='w-4 h-4 mr-2' />
            Accepted
          </DropdownMenuItem>
        </Link>
        <Link href={'/admin/declined'}>
          <DropdownMenuItem>
            <BsBan className='w-4 h-4 mr-2' />
            Declined
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
