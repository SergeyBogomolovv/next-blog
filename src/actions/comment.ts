'use server'
import { findPostById } from '@/data/posts'
import { CommentSchema } from '@/schemas'
import * as z from 'zod'
import { currentUser } from './current-user'
import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { getCommentById } from '@/data/comments'

export const comment = async (
  values: z.infer<typeof CommentSchema>,
  postId: string
) => {
  const validatedFields = CommentSchema.safeParse(values)
  if (!validatedFields.success) return { error: 'Invalid fields' }
  const post = await findPostById(postId)
  if (!post) return { error: 'Post not found' }
  const user = await currentUser()
  if (!user?.id) return { error: 'Please authorize' }
  await db.comment.create({
    data: { content: values.content, authorId: user.id, postId: post.id },
  })
  revalidateTag('comments')
  return { succes: 'Comment sent!' }
}

export const deleteComment = async (commentId: string) => {
  const comment = await getCommentById(commentId)
  if (!comment) return { error: 'Comment not found' }
  const user = await currentUser()
  if (user?.id !== comment.authorId || user.role !== 'ADMIN') {
    return { error: 'No acces' }
  }
  await db.comment.delete({ where: { id: commentId } })
  revalidateTag('comments')
  return { succes: 'Comment deleted' }
}

export const editComment = async (
  values: z.infer<typeof CommentSchema>,
  commentId: string
) => {
  const validatedFields = CommentSchema.safeParse(values)
  if (!validatedFields) return { error: 'Invalid fields' }
  const comment = await getCommentById(commentId)
  if (!comment) return { error: 'Comment not found' }
  const user = await currentUser()
  if (user?.id !== comment.authorId) return { error: 'No acces' }
  await db.comment.update({
    where: { id: comment.id },
    data: { ...values },
  })
  revalidateTag('comments')
  return { succes: 'Comment updated' }
}
