import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import { VscGitPullRequestNewChanges } from 'react-icons/vsc'
import { CiClock2 } from 'react-icons/ci'
import { MdPublic } from 'react-icons/md'
import { BsBan } from 'react-icons/bs'

export default function SuggestionDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          {/* <Link href={'/my-suggestions'}> */}
          <FaCreativeCommonsSamplingPlus className='h-6 w-6 mr-2' />
          Suggestions
          {/* </Link> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={'/new-suggestion'}>
            <VscGitPullRequestNewChanges className='w-4 h-4 mr-2' />
            Suggest a Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/my-suggestions'}>
            <CiClock2 className='w-4 h-4 mr-2' />
            Waiting
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/my-suggestions/published'}>
            <MdPublic className='w-4 h-4 mr-2' />
            Published
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/my-suggestions/declined'}>
            <BsBan className='w-4 h-4 mr-2' />
            Declined
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
