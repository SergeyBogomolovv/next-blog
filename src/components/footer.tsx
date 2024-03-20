import React from 'react'
import { Separator } from './ui/separator'
import { FaGithub } from 'react-icons/fa'
import { Button } from './ui/button'
import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa'

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className='flex justify-between items-center py-2 container dark:bg-black bg-white text-muted-foreground text-sm'>
        <div className='space-x-2'>
          <Button asChild variant={'ghost'}>
            <Link href={'https://github.com/SergeyBogomolovv'} target='blank'>
              <FaGithub className='w-4 h-4 mr-2' />
              Github
            </Link>
          </Button>
          <Button asChild variant={'ghost'}>
            <Link href={'https://t.me/grekassoq'} target='blank'>
              <FaTelegram className='w-4 h-4 mr-2' />
              Teleram
            </Link>
          </Button>
        </div>
        <p>2024 - Gerax</p>
      </footer>
    </>
  )
}
