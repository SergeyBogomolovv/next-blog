'use server'

import { findPostById } from '@/data/posts'
import { EditPostSchema } from '@/schemas'
import * as z from 'zod'
import { currentUser } from './current-user'
import { db } from '@/lib/db'
import { postRevalidate } from './post-revalidation'
import { del, put } from '@vercel/blob'
import { v4 as uuid } from 'uuid'

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
  let imageName = post.image
  const image = imageData?.get('image')
  if (image) {
    await del(post.image)
    const fileName = uuid() + '.jpg'
    const blob = await put(fileName, image, {
      access: 'public',
    })
    imageName = blob.url
  }
  await db.post.update({
    where: { id: postId },
    data: { ...values, image: imageName },
  })
  postRevalidate()
  return { succes: 'Post updated' }
}
