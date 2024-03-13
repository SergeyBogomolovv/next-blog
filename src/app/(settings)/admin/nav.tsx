'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBan, BsCheck2Circle } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className='flex gap-4 md:flex-row flex-col w-full items-center justify-center'>
      <Button
        asChild
        variant={pathname === '/admin' ? 'default' : 'outline'}
        className='w-full'
      >
        <Link href={'/admin'}>
          <CiClock2 className='w-5 h-5 mr-2' />
          Latest
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === '/admin/accepted' ? 'default' : 'outline'}
        className='w-full'
      >
        <Link href={'/admin/accepted'}>
          <BsCheck2Circle className='w-5 h-5 mr-2' />
          Accepted
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === '/admin/declined' ? 'default' : 'outline'}
        className='w-full'
      >
        <Link href={'/admin/declined'}>
          <BsBan className='w-5 h-5 mr-2' />
          Declined
        </Link>
      </Button>
    </nav>
  )
}
