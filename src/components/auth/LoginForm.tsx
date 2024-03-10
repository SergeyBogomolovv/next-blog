'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
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
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const URL_ERROR =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email is already in use'
      : ''
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [showTwoFactor, setShowTwofactor] = useState<boolean>()
  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSucces('')
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data.error) {
            form.reset()
            setError(data.error)
          }
          if (data.succes) {
            form.reset()
            setSucces(data.succes)
          }
          if (data.twoFactor) {
            setShowTwofactor(true)
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <CardWrapper
      headerLabel='Welcome back!'
      backButtonLabel='Dont have an account?'
      backButtonHref='/auth/registration'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two factor code</FormLabel>
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
            )}
            {!showTwoFactor && (
              <>
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
                          type='email'
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
                      <Button
                        size='sm'
                        variant='link'
                        asChild
                        className='px-0 font-normal'
                      >
                        <Link href='/auth/reset'>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormError message={error || URL_ERROR} />
            <FormSucces message={succes} />
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
            size='lg'
          >
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm