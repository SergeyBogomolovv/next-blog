'use client'
import { CommentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSucces from '../form-succes'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Orbitron } from 'next/font/google'
import { cn } from '@/lib/utils'
import { comment } from '@/actions/comment'
import { MdAddComment } from 'react-icons/md'
import { useCurrentUser } from '@/hooks/use-current-user'
const font = Orbitron({ subsets: ['latin'], weight: 'variable' })

export default function CommentForm({ postId }: { postId: string }) {
  const user = useCurrentUser()
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: '',
    },
  })
  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    startTransition(() => {
      setError('')
      setSucces('')
      comment(values, postId)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.succes) {
            form.reset()
            setSucces(data.succes)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }
  return (
    <Card className='w-full'>
      <CardHeader>
        <h1
          className={cn(
            'text-2xl font-extrabold tracking-widest',
            font.className
          )}
        >
          Comments
        </h1>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      placeholder='Type here...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-4'>
              {user ? (
                <Button disabled={isPending} type='submit'>
                  <MdAddComment className='w-5 h-5 mr-2' />
                  Add comment
                </Button>
              ) : (
                <FormError message={'Authorize to leave a comment'} />
              )}
            </div>
            <FormError message={error} />
            <FormSucces message={succes} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
