'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/schemas'
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
import { register } from '@/actions/register'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      register(values).then((data) => {
        if (data.succes) {
          setSucces(data.succes)
          return
        }
        if (data.error) {
          setError(data.error)
        }
      })
    })
  }

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel='Already have an account?'
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} placeholder='Gerax' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type='password'
                      {...field}
                      placeholder='******'
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
            Registration
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
