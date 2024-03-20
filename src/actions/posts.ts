'use server'

import { db } from '@/lib/db'
import { currentUser } from './current-user'
import { findPostById } from '@/data/posts'
import { UserRole } from '@prisma/client'
import { EditPostSchema } from '@/schemas'
import * as z from 'zod'
import { NewPostSchema } from '@/schemas'
import { getUserById } from '@/data/user'
import { revalidateTag } from 'next/cache'
import { uploadPostImage } from '@/lib/upload-to-cloud'
import { s3 } from '@/lib/yandex-cloud'

export const deletePost = async (id: string) => {
  const user = await currentUser()
  const post = await findPostById(id)
  if (post?.authorId === user?.id || user?.role === UserRole.ADMIN) {
    await db.comment.deleteMany({ where: { postId: post?.id } })
    await db.post.delete({ where: { id } })
    if (post?.image) await s3.Remove(post.image)
    revalidateTag('posts')
    return { succes: 'Post deleted' }
  }
  return { error: 'No acces' }
}

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
  if (imageData instanceof FormData) {
    const image = imageData.get('image')
    if (image) {
      const isRemoved = await s3.Remove(post.image)
      if (!isRemoved) return { error: 'Cannot remove file' }
      const upload = await uploadPostImage(image)
      if (!upload) return { error: 'Cannot upload file' }
      imageName = upload
    }
  }
  await db.post.update({
    where: { id: postId },
    data: { ...values, image: imageName },
  })
  revalidateTag('posts')
  return { succes: 'Post updated' }
}

export const addpost = async (
  values: z.infer<typeof NewPostSchema>,
  fileData: FormData
) => {
  try {
    const image = fileData.get('image')
    const validateFields = NewPostSchema.safeParse(values)
    if (!validateFields) {
      return { error: 'Invalid fields' }
    }
    if (!image) return { error: 'Image is required' }
    const imageName = await uploadPostImage(image)
    if (!imageName) return { error: 'Unable to load image' }
    const user = await currentUser()
    const dbUser = await getUserById(user?.id)
    if (!dbUser) return { error: 'User not found' }
    await db.post.create({
      data: {
        title: values.title,
        content: values.content,
        authorId: dbUser.id,
        image: imageName,
      },
    })
    revalidateTag('posts')
    return { succes: 'Post sent' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong on server' }
  }
}
