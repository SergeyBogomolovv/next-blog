'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsBan, BsCheck2Circle } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { MdPublic } from 'react-icons/md'

interface Props {
  admin?: boolean
}

enum ButtonVariants {
  outline = 'outline',
  default = 'default',
}

export default function Navbar({ admin }: Props) {
  const pathname = usePathname()
  const [accepted, setAccepted] = useState<ButtonVariants>(
    ButtonVariants.outline
  )
  const [latest, setLatest] = useState<ButtonVariants>(ButtonVariants.outline)
  const [declined, setDeclined] = useState<ButtonVariants>(
    ButtonVariants.outline
  )
  useEffect(() => {
    setAccepted(ButtonVariants.outline)
    setLatest(ButtonVariants.outline)
    setDeclined(ButtonVariants.outline)
    if (admin && pathname === '/admin') {
      setLatest(ButtonVariants.default)
    }
    if (!admin && pathname === '/my-suggestions') {
      setLatest(ButtonVariants.default)
    }
    if (admin && pathname === '/admin/accepted') {
      setAccepted(ButtonVariants.default)
    }
    if (!admin && pathname === '/my-suggestions/published') {
      setAccepted(ButtonVariants.default)
    }
    if (admin && pathname === '/admin/declined') {
      setDeclined(ButtonVariants.default)
    }
    if (!admin && pathname === '/my-suggestions/declined') {
      setDeclined(ButtonVariants.default)
    }
  }, [pathname])

  return (
    <nav className='flex gap-4 md:flex-row flex-col w-full items-center justify-center'>
      <Button asChild variant={latest} className='w-full'>
        <Link href={admin ? '/admin' : '/my-suggestions'}>
          <CiClock2 className='w-5 h-5 mr-2' />
          {admin ? 'Latest' : 'Waiting'}
        </Link>
      </Button>
      <Button asChild variant={accepted} className='w-full'>
        <Link href={admin ? '/admin/accepted' : '/my-suggestions/published'}>
          {admin ? (
            <BsCheck2Circle className='w-5 h-5 mr-2' />
          ) : (
            <MdPublic className='w-5 h-5 mr-2' />
          )}
          {admin ? 'Accepted' : 'Published'}
        </Link>
      </Button>
      <Button asChild variant={declined} className='w-full'>
        <Link href={admin ? '/admin/declined' : '/my-suggestions/declined'}>
          <BsBan className='w-5 h-5 mr-2' />
          Declined
        </Link>
      </Button>
    </nav>
  )
}
