import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Post } from '@prisma/client'
import { AiOutlineFileDone } from 'react-icons/ai'

import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import FormError from '../form-error'
import FormSucces from '../form-succes'
import { useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditPostSchema } from '@/schemas'
import * as z from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'
import { editPost } from '@/actions/posts'

interface Props {
  post: Post
  children: React.ReactNode
}

export default function EditPostModal({ children, post }: Props) {
  const [image, setImage] = useState<string | undefined>()
  const [file, setFile] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const form = useForm<z.infer<typeof EditPostSchema>>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  })

  const onSubmit = (values: z.infer<typeof EditPostSchema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      editPost(values, post.id, file)
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
          setFile('')
          setImage('')
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <Image
          src={
            image || `https://next-blog.storage.yandexcloud.net/${post.image}`
          }
          alt=''
          width={500}
          height={500}
          onClick={() => inputRef.current?.click()}
          className='w-full aspect-video object-cover rounded-md cursor-pointer'
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder='Title'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder='Post content'
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
        <input
          accept='.jpg, .jpeg, .png, .webp, .img'
          disabled={isPending}
          onChange={(e) => {
            if (e.target.files?.length) {
              const image = URL.createObjectURL(e.target.files[0])
              const formData = new FormData()
              formData.append('image', e.target.files[0])
              setFile(formData)
              setImage(image)
            }
          }}
          type='file'
          hidden
          ref={inputRef}
        />
      </DialogContent>
    </Dialog>
  )
}
