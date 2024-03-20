import { Post, User, UserRole } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Orbitron } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import SuggestionStatusComponent from './suggestion-status'
import UserCard from '../user-card'
import SuggestionButtons from './suggestion-buttons'
import { currentUser } from '@/actions/current-user'

interface Props {
  post: Post
  showAdminFeatures?: boolean
  author: User
}

const font = Orbitron({ weight: 'variable', subsets: ['latin'] })

export default async function Suggestion({
  showAdminFeatures,
  post,
  author,
}: Props) {
  const user = await currentUser()
  const postDate = post.createdAt.toDateString()

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
          src={`https://next-blog.storage.yandexcloud.net/${post.image}`}
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
          <SuggestionStatusComponent status={post.status} />
        )}
        {showAdminFeatures && user?.role === UserRole.ADMIN ? (
          <>
            {showAdminFeatures && post.status !== 'waiting' ? (
              <SuggestionButtons type='admin-checked' post={post} />
            ) : (
              <SuggestionButtons type='admin' post={post} />
            )}
          </>
        ) : (
          <SuggestionButtons type='user' post={post} />
        )}
      </CardFooter>
    </Card>
  )
}
