'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { NewPostSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSucces from '../form-succes'
import { IoMdSend } from 'react-icons/io'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import { CiImageOn } from 'react-icons/ci'
import { addpost } from '@/actions/new-post'

const NewSuggestionForm = () => {
  const [image, setImage] = useState<string | undefined>()
  const [file, setFile] = useState<any>()
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const onSubmit = (values: z.infer<typeof NewPostSchema>) => {
    if (!file) {
      setError('Image is required!')
      return
    }
    setError('')
    setSucces('')
    startTransition(() => {
      addpost(values, file)
        .then((data) => {
          if (data.error) {
            form.reset()
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

  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
          <h1 className='text-2xl font-semibold tracking-widest'>
            Post Suggestion
          </h1>
          <p className='text-muted-foreground text-sm'>
            Want to see new post in our blog?
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {image && (
          <Image
            src={image}
            alt=''
            width={500}
            height={500}
            className='w-full mb-4'
          />
        )}
        <input
          accept='.jpg, .jpeg, .png, .webp, .img'
          disabled={isPending}
          onChange={(e) => {
            if (e.target.files?.length) {
              const image = URL.createObjectURL(e.target.files[0])
              const formData = new FormData()
              formData.append('image', e.target.files[0])
              setFile(formData)
              setError('')
              setImage(image)
            }
          }}
          type='file'
          hidden
          ref={inputRef}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <Button
                variant={image ? 'outline' : 'default'}
                type='button'
                onClick={() => inputRef.current?.click()}
                className='w-full'
              >
                <CiImageOn className='w-5 h-5 mr-2' />
                {image ? 'Change image' : 'Upload image'}
              </Button>
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
              <IoMdSend className='w-5 h-5 mr-2' />
              Send
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default NewSuggestionForm
