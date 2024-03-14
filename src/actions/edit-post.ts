'use server'

import { findPostById } from '@/data/posts'
import { EditPostSchema } from '@/schemas'
import * as z from 'zod'
import { currentUser } from './current-user'
import { db } from '@/lib/db'
import { deleteFile, saveFile } from '@/service/file-service'
import { postRevalidate } from './post-revalidation'

export const editPost = async (
  values: z.infer<typeof EditPostSchema>,
  postId: string,
  imageData?: FormData
) => {
  const validatedFields = EditPostSchema.safeParse(values)
  if (!validatedFields) return { error: 'Invalid fields' }
  const post = await findPostById(postId)
  if (!post) return { error: 'Post not found' }
  const user = await currentUser()
  if (user?.id !== post.authorId) return { error: 'No acces' }
  let fileName = post.image
  if (imageData instanceof FormData) {
    const image = imageData?.get('image')
    fileName = await saveFile(image)
    deleteFile(post.image)
  }
  await db.post.update({
    where: { id: postId },
    data: { ...values, image: fileName },
  })
  postRevalidate()
  return { succes: 'Post updated' }
}
