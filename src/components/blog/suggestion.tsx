'use client'
import { Post, User, UserRole } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Orbitron } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { Separator } from '../ui/separator'
import { BsBan } from 'react-icons/bs'
import { BsCheck2Circle } from 'react-icons/bs'
import { useCurrentUser } from '@/hooks/use-current-user'
import SuggestionStatusComponent from './suggestion-status'
import UserCard from '../user-card'

interface Props {
  post: Post
  showAdminFeatures?: boolean
  author: User
}

const font = Orbitron({ weight: 'variable', subsets: ['latin'] })

export default function Suggestion({ showAdminFeatures, post, author }: Props) {
  const postDate = post.createdAt.toLocaleDateString()
  const currentUser = useCurrentUser()
  console.log(post.image)
  return (
    <Card>
      <CardHeader>
        <h1 className={cn(font.className, 'text-2xl font-bold tracking-wide')}>
          {post.title}
        </h1>
        <p className='text-muted-foreground text-sm'>Date: {postDate}</p>
      </CardHeader>
      <CardContent>
        {showAdminFeatures && author && (
          <UserCard label='Author' user={author} />
        )}
        <Image
          src={`/${post.image}`}
          alt=''
          width={500}
          height={500}
          className='aspect-video w-full object-cover rounded-lg my-5'
        />
        <p className='text-muted-foreground text-sm'>{post.content}</p>
      </CardContent>
      <Separator className='mb-5' />
      <CardFooter className='flex flex-col gap-6'>
        {!showAdminFeatures && (
          <>
            <SuggestionStatusComponent status={post.status} />
          </>
        )}
        <div className='grid grid-cols-2 gap-6 w-full'>
          {showAdminFeatures && currentUser?.role === UserRole.ADMIN ? (
            <>
              <Button variant={'succes'}>
                <BsCheck2Circle className='w-5 h-5 mr-2' />
                Accept
              </Button>
              <Button variant={'destructive'}>
                <BsBan className='w-5 h-5 mr-2' />
                Decline
              </Button>
            </>
          ) : (
            <>
              <Button variant={'outline'}>
                <CiEdit className='w-5 h-5 mr-2' />
                Edit
              </Button>
              <Button variant={'destructive'}>
                <MdDeleteForever className='w-5 h-5 mr-2' />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
