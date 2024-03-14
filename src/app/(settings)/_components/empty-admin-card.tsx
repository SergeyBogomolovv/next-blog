import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
interface Props {
  type: 'latest' | 'accepted' | 'declined'
}

export default function EmptyAdminCard({ type }: Props) {
  return (
    <Card>
      <CardHeader>
        <h1 className='text-2xl text-center font-bold tracking-widest flex items-center justify-center'>
          {type === 'latest' && <CheckCircledIcon className='w-7 h-7 mr-2' />}
          {type === 'latest' && 'All suggestions checked!'}
          {type === 'accepted' && 'Hm, our blog is empty'}
          {type === 'declined' && 'No declined Suggestions'}
        </h1>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground text-center'>
          It seems that there is no suggestions yet
        </p>
      </CardContent>
    </Card>
  )
}
