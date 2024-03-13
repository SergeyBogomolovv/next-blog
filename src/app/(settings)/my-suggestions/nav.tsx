'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBan } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { MdPublic } from 'react-icons/md'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className='flex gap-4 md:flex-row flex-col w-full items-center justify-center'>
      <Button
        asChild
        variant={pathname === '/my-suggestions' ? 'default' : 'outline'}
        className='w-full'
      >
        <Link href={'/my-suggestions'}>
          <CiClock2 className='w-5 h-5 mr-2' />
          Waiting
        </Link>
      </Button>
      <Button
        asChild
        variant={
          pathname === '/my-suggestions/published' ? 'default' : 'outline'
        }
        className='w-full'
      >
        <Link href={'/my-suggestions/published'}>
          <MdPublic className='w-5 h-5 mr-2' />
          Published
        </Link>
      </Button>
      <Button
        asChild
        variant={
          pathname === '/my-suggestions/declined' ? 'default' : 'outline'
        }
        className='w-full'
      >
        <Link href={'/my-suggestions/declined'}>
          <BsBan className='w-5 h-5 mr-2' />
          Declined
        </Link>
      </Button>
    </nav>
  )
}
