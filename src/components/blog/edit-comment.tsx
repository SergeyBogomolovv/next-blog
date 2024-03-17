import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import { Comment } from '@prisma/client'
import { AiOutlineFileDone } from 'react-icons/ai'

import { Textarea } from '../ui/textarea'
import FormError from '../form-error'
import FormSucces from '../form-succes'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentSchema } from '@/schemas'
import * as z from 'zod'
import { toast } from 'sonner'
import { editComment } from '@/actions/comment'

interface Props {
  comment: Comment
  children: React.ReactNode
}

export default function EditCommentModal({ children, comment }: Props) {
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: comment.content,
    },
  })

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      editComment(values, comment.id)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.succes) {
            setSucces(data.succes)
            toast.success(data.succes)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => {
          setError('')
          setSucces('')
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        {...field}
                        placeholder='Comment content'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSucces message={succes} />
            </div>
            <Button
              disabled={isPending}
              type='submit'
              className='w-full'
              size='lg'
            >
              <AiOutlineFileDone className='w-5 h-5 mr-2' />
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
