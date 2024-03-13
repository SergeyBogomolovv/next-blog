import { db } from '@/lib/db'

export const findPostById = async (id: string) => {
  const post = await db.post.findUnique({ where: { id } })
  return post
}
