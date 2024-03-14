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
import { Comment, Post, User } from '@prisma/client'
import UserCard from '../user-card'
interface Props {
  post: Post
  comments: Comment[]
  author: User
}

export default function PostCard({ post, comments, author }: Props) {
  return (
    <Card>
      <CardHeader>
        <h2 className={cn('text-2xl tracking-wide', font.className)}>
          {post.title}
        </h2>
      </CardHeader>
      <Image
        src={post.image}
        alt=''
        width={500}
        height={500}
        className='w-full object-cover aspect-video'
      />
      <Separator className='mb-6' />
      <CardContent className='flex flex-col gap-4'>
        <p className='text-sm'>{post.content}</p>
        <UserCard label='Author' user={author} />
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <div>Comments: {comments.length}</div>
        <Button size='sm' variant={'outline'} asChild>
          <Link href={`${process.env.BASE_URL}/posts/${post.id}`}>
            <FaReadme className='mr-2 w-4 h-4' />
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
