import React from 'react'
import { Comment, User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser } from 'react-icons/fa'
import { Separator } from '../ui/separator'
import CommentAction from './comment-action'
import { currentUser } from '@/actions/current-user'

interface Props {
  comment: Comment
  author: User
}

export default async function CommentCard({ comment, author }: Props) {
  const user = await currentUser()
  const date = comment.createdAt.toLocaleDateString()
  const avatar = author?.image?.startsWith('avatars/')
    ? `https://next-blog.storage.yandexcloud.net/${author?.image}`
    : user?.image
  return (
    <div className='flex justify-between gap-4 items-center'>
      <div className='flex gap-4 w-full items-center'>
        <Avatar className='w-12 h-12'>
          <AvatarImage
            src={avatar || ''}
            className='aspect-square object-cover'
          />
          <AvatarFallback className='bg-black dark:bg-white p-2'>
            <FaUser className='text-white dark:text-black h-full w-full' />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-x-2 items-center'>
            <p className='text-lg font-semibold'>{author.name}</p>
            <Separator orientation='vertical' />
            <p className='text-muted-foreground text-sm'>{date}</p>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
      {user && <CommentAction comment={comment} />}
    </div>
  )
}
