'use server'

import { db } from '@/lib/db'
import { currentUser } from './current-user'
import { findPostById } from '@/data/posts'
import { UserRole } from '@prisma/client'
import { postRevalidate } from './post-revalidation'
import { deleteFile } from '@/service/file-service'

export const deletePost = async (id: string) => {
  const user = await currentUser()
  const post = await findPostById(id)

  if (post?.authorId === user?.id || user?.role === UserRole.ADMIN) {
    try {
      await db.post.delete({ where: { id } })
      if (post?.image) deleteFile(post?.image)
      postRevalidate()
      return { succes: 'Post deleted' }
    } catch (error) {
      return { error: 'Something went wrong' }
    }
  }

  return { error: 'No acces' }
}
