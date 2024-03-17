'use client'

import { changeLogo } from '@/actions/settings'
import Image from 'next/image'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { CiImageOn } from 'react-icons/ci'
import FormError from './form-error'
import FormSucces from './form-succes'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useSession } from 'next-auth/react'

export default function ChangeLogoButton() {
  const { update, data: session } = useSession()
  const [image, setImage] = useState<string | undefined>()
  const [file, setFile] = useState<any>()
  const [error, setError] = useState<string | undefined>()
  const [succes, setSucces] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const user = useCurrentUser()
  const onSubmit = () => {
    if (!file) {
      setError('Image is required!')
      return
    }
    setError('')
    setSucces('')
    startTransition(() => {
      changeLogo(file)
        .then((data) => {
          if (data.error) {
            setError(data.error)
            toast.error(data.error)
          }
          if (data.succes) {
            setImage(undefined)
            setFile(null)
            setSucces(data.succes)
            toast.success(data.succes)
            update()
          }
        })
        .catch(() => setError('Something went wrong'))
    })
  }

  return (
    <div className='flex md:flex-row flex-col gap-4 justify-between items-center rounded-lg border p-3 shadow-md'>
      <div className='flex items-center gap-4'>
        <Image
          src={image || user?.image || '/noavatar.png'}
          alt=''
          width={500}
          height={500}
          className='md:w-16 md:h-16 w-full aspect-square object-cover rounded-lg'
        />
        <div className='hidden md:block'>
          <FormError message={error} />
          <FormSucces message={succes} />
        </div>
      </div>

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
      {image ? (
        <Button
          variant={image ? 'outline' : 'default'}
          type='button'
          onClick={onSubmit}
          className='w-full md:w-fit'
        >
          Submit
        </Button>
      ) : (
        <Button
          variant={image ? 'outline' : 'default'}
          type='button'
          onClick={() => inputRef.current?.click()}
          className='w-full md:w-fit'
        >
          <CiImageOn className='w-5 h-5 mr-2' />
          Change Logo
        </Button>
      )}
    </div>
  )
}
