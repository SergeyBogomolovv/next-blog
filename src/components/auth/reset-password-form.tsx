'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { ResetShema } from '@/schemas'
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
import { resetPassword } from '@/actions/reset'

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: z.infer<typeof ResetShema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error)
        setSucces(data?.succes)
      })
    })
  }
  const form = useForm<z.infer<typeof ResetShema>>({
    resolver: zodResolver(ResetShema),
    defaultValues: {
      email: '',
    },
  })
  return (
    <CardWrapper
      headerLabel='Reset password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='example@email.com'
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetPasswordForm
