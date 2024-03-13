import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

export default function EmptyAdminCard() {
  return (
    <Card>
      <CardHeader>
        <h1 className='text-2xl text-center font-bold tracking-widest'>
          No data
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
