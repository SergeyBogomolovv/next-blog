import Post from '@/components/blog/post'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getAllPosts } from '@/data/posts'
import { cn } from '@/lib/utils'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { CiBookmarkPlus } from 'react-icons/ci'

const font = Orbitron({ subsets: ['latin'], weight: 'variable' })

const PostsPage = async () => {
  const posts = await getAllPosts()
  return (
    <main className='flex flex-col items-center my-12 container'>
      <div className='flex items-center justify-between w-full'>
        <h1
          className={cn(
            'md:text-4xl sm:text-3xl text-2xl font-extrabold tracking-widest',
            font.className
          )}
        >
          Yoshimura blog
        </h1>
        <Button variant={'outline'} asChild>
          <Link href={'/new-suggestion'}>
            <CiBookmarkPlus className='w-5 h-5 sm:mr-2' />
            <span className='sm:block hidden'>Suggest a post</span>
          </Link>
        </Button>
      </div>
      <Separator className='my-5' />
      <div className='grid md:grid-cols-2 gap-8'>
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            comments={post.comments}
            post={post}
          />
        ))}
      </div>
    </main>
  )
}

export default PostsPage
