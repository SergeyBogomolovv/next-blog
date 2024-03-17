'use server'
import { db } from '@/lib/db'

export const getCommentsByPostId = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: { postId },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return comments
}
export const getCommentById = async (id: string) => {
  const comment = await db.comment.findUnique({
    where: { id },
  })
  return comment
}
