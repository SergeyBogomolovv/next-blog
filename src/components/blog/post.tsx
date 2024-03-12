import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Orbitron } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import Link from 'next/link'

const font = Orbitron({ subsets: ['latin'], weight: '600' })
import { FaReadme } from 'react-icons/fa6'
interface Props {
  title: string
  image: string
  description: string
  comments: number
  id: string
}

export default function Post({
  title,
  image,
  description,
  comments,
  id,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <h2 className={cn('text-2xl tracking-wide', font.className)}>
          {title}
        </h2>
      </CardHeader>
      <Image
        src={`/${image}`}
        alt=''
        width={500}
        height={500}
        className='w-full object-cover aspect-video'
      />
      <Separator className='mb-6' />
      <CardContent>
        <p className='text-sm'>{description}</p>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <div>Comments: {comments}</div>
        <Button size='sm' variant={'outline'} asChild>
          <Link href={`${process.env.BASE_URL}/posts/${id}`}>
            <FaReadme className='mr-2 w-4 h-4' />
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
