import Post from '@/components/blog/post'
import SuggestModal from '@/components/blog/suggest-modal'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Orbitron } from 'next/font/google'

const font = Orbitron({ subsets: ['latin'], weight: ['600'] })

const PostsPage = () => {
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
        <SuggestModal />
      </div>

      <Separator className='my-5' />
      <div className='grid md:grid-cols-2 gap-8'>
        <Post
          id='1'
          comments={10}
          image='kaneki.webp'
          title='Kaneki ken'
          description=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora perspiciatis, explicabo rerum dolore molestiae distinctio. Fugiat, illo praesentium fugit repudiandae tenetur velit aliquid non reiciendis atque explicabo voluptatum architecto quaerat.'
        />
        <Post
          id='2'
          comments={3}
          image='touka.avif'
          title='Kirishima Touka'
          description=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora perspiciatis, explicabo rerum dolore molestiae distinctio. Fugiat, illo praesentium fugit repudiandae tenetur velit aliquid non reiciendis atque explicabo voluptatum architecto quaerat.'
        />
        <Post
          id='3'
          comments={5}
          image='nishaki.jpeg'
          title='Nishaki Nishua'
          description=' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora perspiciatis, explicabo rerum dolore molestiae distinctio. Fugiat, illo praesentium fugit repudiandae tenetur velit aliquid non reiciendis atque explicabo voluptatum architecto quaerat.'
        />
      </div>
    </main>
  )
}

export default PostsPage
