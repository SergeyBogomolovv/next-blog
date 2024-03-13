'use client'
import { setPostAccepted, setPostDeclined } from '@/actions/admin'
import { Button } from '../ui/button'
import { Post } from '@prisma/client'
import { BsBan, BsCheck2Circle } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { deletePost } from '@/actions/posts'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
  post: Post
  type: 'admin' | 'user' | 'admin-checked'
}

export default function SuggestionButtons({ post, type }: Props) {
  const [pending, startTransition] = useTransition()
  const declinehandler = () => {
    startTransition(() => {
      setPostDeclined(post.id).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.succes) {
          toast.success(data.succes)
        }
      })
    })
  }
  const accepthandler = () => {
    startTransition(() => {
      setPostAccepted(post.id).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.succes) {
          toast.success(data.succes)
        }
      })
    })
  }
  const deletehandler = () => {
    startTransition(() => {
      deletePost(post.id).then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.succes) {
          toast.success(data.succes)
        }
      })
    })
  }

  return (
    <div className='grid grid-cols-2 gap-6 w-full'>
      {type === 'admin' && (
        <>
          <Button disabled={pending} onClick={accepthandler} variant={'succes'}>
            <BsCheck2Circle className='w-5 h-5 mr-2' />
            Accept
          </Button>
          <Button
            disabled={pending}
            onClick={deletehandler}
            variant={'destructive'}
          >
            <BsBan className='w-5 h-5 mr-2' />
            Decline
          </Button>
        </>
      )}
      {type === 'user' && (
        <>
          <Button disabled={pending} variant={'outline'}>
            <CiEdit className='w-5 h-5 mr-2' />
            Edit
          </Button>
          <Button
            disabled={pending}
            onClick={deletehandler}
            variant={'destructive'}
          >
            <MdDeleteForever className='w-5 h-5 mr-2' />
            Delete
          </Button>
        </>
      )}
      {type === 'admin-checked' && (
        <>
          {post.status === 'accepted' ? (
            <Button
              disabled={pending}
              onClick={declinehandler}
              variant={'outline'}
            >
              <BsBan className='w-5 h-5 mr-2' />
              Decline
            </Button>
          ) : (
            <Button
              disabled={pending}
              onClick={accepthandler}
              variant={'outline'}
            >
              <BsCheck2Circle className='w-5 h-5 mr-2' />
              Accept
            </Button>
          )}
          <Button
            disabled={pending}
            onClick={deletehandler}
            variant={'destructive'}
          >
            <MdDeleteForever className='w-5 h-5 mr-2' />
            Delete
          </Button>
        </>
      )}
    </div>
  )
}
