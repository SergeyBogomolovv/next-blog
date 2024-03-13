import { cn } from '@/lib/utils'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
const font = Orbitron({ subsets: ['latin'], weight: ['600'] })

export default function Links() {
  const links = [
    { href: '/posts', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]
  return (
    <div className='flex items-center gap-8 flex-row'>
      <Link
        href={'/'}
        className={cn(
          'text-2xl text-black dark:text-white font-semibold',
          font.className
        )}
      >
        Eto Yoshimura
      </Link>
      <div className='md:flex hidden items-center gap-2 flex-row'>
        {links.map((link) => (
          <Button key={link.href} variant='link' asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
