'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import CardWrapper from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSucces from '../form-succes'
import { newPassword } from '@/actions/new-password'
import { useRouter, useSearchParams } from 'next/navigation'

const NewPasswordPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setSucces('')
    setError('')
    if (!token) {
      setError('missing token')
      return
    }
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error)
        setSucces(data?.succes)
        if (data.succes) {
          router.push('/auth/login')
        }
      })
    })
  }
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      passwordAgain: '',
    },
  })
  return (
    <CardWrapper
      headerLabel='New password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='123456'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordAgain'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password again</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='123456'
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
            Change password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordPasswordForm
