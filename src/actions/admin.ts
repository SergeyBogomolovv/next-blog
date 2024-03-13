'use server'

import { findPostById } from '@/data/posts'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { postRevalidate } from './post-revalidation'

export const setPostAccepted = async (postId: string) => {
  const session = await auth()
  if (session?.user.role !== UserRole.ADMIN) {
    return { error: 'You have no acces' }
  }
  const post = await findPostById(postId)
  if (!post) return { error: 'Something went wrong' }
  await db.post.update({ where: { id: post.id }, data: { status: 'accepted' } })
  postRevalidate()
  return { succes: 'Post accepted' }
}

export const setPostDeclined = async (postId: string) => {
  const session = await auth()
  if (session?.user.role !== UserRole.ADMIN) {
    return { error: 'You have no acces' }
  }
  const post = await findPostById(postId)
  if (!post) return { error: 'Something went wrong' }
  await db.post.update({ where: { id: post.id }, data: { status: 'declined' } })
  postRevalidate()
  return { succes: 'Post declined' }
}
