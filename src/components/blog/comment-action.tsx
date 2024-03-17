'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import { HiDotsVertical } from 'react-icons/hi'
import { Comment } from '@prisma/client'
import { useCurrentUser } from '@/hooks/use-current-user'
import { MdDeleteForever } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { useTransition } from 'react'
import { deleteComment } from '@/actions/comment'
import { toast } from 'sonner'
import EditCommentModal from './edit-comment'

interface Props {
  comment: Comment
}

export default function CommentAction({ comment }: Props) {
  const user = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const isDeleteButton = user?.role === 'ADMIN' || user?.id === comment.authorId
  const deleteHandler = () => {
    startTransition(() => {
      deleteComment(comment.id)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          }
          if (data.succes) {
            toast.success(data.succes)
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'}>
          <HiDotsVertical className='w-6 h-6' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit flex items-center gap-2 p-0 border-0 bg-transparent'>
        {user?.id === comment.authorId && (
          <EditCommentModal comment={comment}>
            <Button disabled={isPending} variant={'outline'}>
              <CiEdit className='w-5 h-5 ' />
            </Button>
          </EditCommentModal>
        )}
        {isDeleteButton && (
          <Button
            disabled={isPending}
            variant={'destructive'}
            onClick={deleteHandler}
          >
            <MdDeleteForever className='w-5 h-5 ' />
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
