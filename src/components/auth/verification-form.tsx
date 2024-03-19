'use client'
import CardWrapper from '@/components/auth/card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import FormError from '../form-error'
import FormSucces from '../form-succes'

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const onSubmit = useCallback(() => {
    if (!token) {
      setError('missing token')
      return
    }
    newVerification(token)
      .then((data) => {
        if (data.succes) {
          setSucces(data.succes)
          router.push('/auth/login')
          return
        }
        if (data.error) {
          setError(data.error)
        }
      })
      .catch(() => setError('Something went wrong'))
  }, [token])
  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <CardWrapper
      headerLabel='Verify your email'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='flex items-center w-full justify-center'>
        {!succes && !error && <BeatLoader color='white' />}
        <FormSucces message={succes} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
