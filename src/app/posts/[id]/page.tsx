import CommentForm from '@/components/blog/comment-form'
import { Separator } from '@/components/ui/separator'
import UserCard from '@/components/user-card'
import { getCommentsByPostId } from '@/data/comments'
import { findPostById } from '@/data/posts'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Comment from '@/components/blog/comment'

const poppins = Poppins({ subsets: ['latin'], weight: ['600'] })

const Post = async ({ params }: { params: { id: string } }) => {
  const post = await findPostById(params.id)
  const comments = await getCommentsByPostId(params.id)
  const date = post?.createdAt.toLocaleDateString()
  const time = post?.createdAt.toLocaleTimeString()

  return (
    <main className='container my-10 flex flex-col flex-grow items-center xl:w-9/12 lg:w-10/12 md:w-11/12 w-full'>
      {post ? (
        <>
          <div className='flex md:flex-row flex-col gap-3 md:justify-between w-full'>
            <h1
              className={cn(
                'md:text-4xl text-2xl font-extrabold tracking-wide',
                poppins.className
              )}
            >
              {post.title}
            </h1>
            <div className='flex items-center gap-4 md:self-end'>
              <UserCard user={post.author} label='Author' />
              <div className='text-sm text-muted-foreground'>
                <p>Published: {date}</p>
                <p>At: {time}</p>
              </div>
            </div>
          </div>
          <Separator className='mb-5 mt-3' />
          <Image
            src={`https://next-blog.storage.yandexcloud.net/${post.image}`}
            alt=''
            width={1000}
            height={1000}
            className='lg:w-10/12 w-full aspect-video object-cover rounded-md'
          />
          <Separator className='mt-5' />
          <div className='text-muted-foreground my-5'>
            <p>{post.content}</p>
          </div>
          <CommentForm postId={post.id} />
          <div className='flex flex-col gap-10 mt-8 w-full justify-start'>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                author={comment.author}
                comment={comment}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  )
}

export default Post
