import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
interface Props {
  variant: 'published' | 'default' | 'declined'
}
export default function EmptySuggestionsCard({ variant }: Props) {
  return (
    <Card>
      <CardHeader>
        <h1 className='text-2xl text-center font-bold tracking-widest'>
          {variant === 'declined' && 'You have no declined suggestions yet'}
          {variant === 'default' && 'You have no suggestions yet'}
          {variant === 'published' && 'You have no published suggestions yet'}
        </h1>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          But if you want to add new post to our blog, go to 'Suggest a post' or
          press the button below. Our admins will check your suggestion.
        </p>
      </CardContent>
      <CardFooter>
        <Button className='w-full' asChild>
          <Link href={'/new-suggestion'}>Suggest new post</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
