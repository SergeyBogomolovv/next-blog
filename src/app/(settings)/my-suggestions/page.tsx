import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'

const MyPostsPage = () => {
  return (
    <div className='w-full flex flex-col gap-10'>
      <Card>
        <CardHeader>
          <h1 className='text-2xl text-center font-bold tracking-widest'>
            You have no suggestions yet
          </h1>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            But if you want to add new post to our blog, go to 'Suggest a post'
            or press the button below. Our admins will check your suggestion.
          </p>
        </CardContent>
        <CardFooter>
          <Button className='w-full' asChild>
            <Link href={'/new-suggestion'}>Suggest new post</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MyPostsPage
