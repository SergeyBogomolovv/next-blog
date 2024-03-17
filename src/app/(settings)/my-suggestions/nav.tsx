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
import { BsBan } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { FaCaretDown } from 'react-icons/fa'
import { MdPublic } from 'react-icons/md'

export default function NavTest() {
  const pathname = usePathname()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'secondary'} asChild>
          <div>
            {pathname === '/my-suggestions' && (
              <CiClock2 className='w-4 h-4 mr-2' />
            )}
            {pathname === '/my-suggestions/published' && (
              <MdPublic className='w-4 h-4 mr-2' />
            )}
            {pathname === '/my-suggestions/declined' && (
              <BsBan className='w-4 h-4 mr-2' />
            )}
            {pathname === '/my-suggestions' && 'Waiting'}
            {pathname === '/my-suggestions/published' && 'Published'}
            {pathname === '/my-suggestions/declined' && 'Declined'}
            <FaCaretDown className='w-3 h-3 ml-2' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <Link href={'/my-suggestions'}>
          <DropdownMenuItem>
            <CiClock2 className='w-4 h-4 mr-2' />
            Waiting
          </DropdownMenuItem>
        </Link>
        <Link href={'/my-suggestions/published'}>
          <DropdownMenuItem>
            <MdPublic className='w-4 h-4 mr-2' />
            Published
          </DropdownMenuItem>
        </Link>
        <Link href={'/my-suggestions/declined'}>
          <DropdownMenuItem>
            <BsBan className='w-4 h-4 mr-2' />
            Declined
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
