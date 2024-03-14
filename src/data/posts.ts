import { db } from '@/lib/db'

export const findPostById = async (id: string) => {
  const post = await db.post.findUnique({
    where: { id },
    include: { comments: true, author: true },
  })
  return post
}
export const getAllPosts = async () => {
  const posts = await db.post.findMany({
    where: { status: 'accepted' },
    include: { comments: true, author: true },
  })
  return posts
}
