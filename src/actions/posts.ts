'use server'

import { db } from '@/lib/db'
import { currentUser } from './current-user'
import { findPostById } from '@/data/posts'
import { UserRole } from '@prisma/client'
import { EditPostSchema } from '@/schemas'
import * as z from 'zod'
import { del, put } from '@vercel/blob'
import { v4 as uuid } from 'uuid'
import { NewPostSchema } from '@/schemas'
import { auth } from '@/lib/auth'
import { getUserById } from '@/data/user'
import { revalidateTag } from 'next/cache'

export const deletePost = async (id: string) => {
  const user = await currentUser()
  const post = await findPostById(id)
  if (post?.authorId === user?.id || user?.role === UserRole.ADMIN) {
    try {
      await db.post.delete({ where: { id } })
      if (post?.image) await del(post.image)
      await db.comment.deleteMany({ where: { postId: post?.id } })
      revalidateTag('posts')
      return { succes: 'Post deleted' }
    } catch (error) {
      return { error: 'Something went wrong' }
    }
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
  revalidateTag('posts')
  return { succes: 'Post updated' }
}
export const addpost = async (
  values: z.infer<typeof NewPostSchema>,
  fileData: FormData
) => {
  try {
    const image = fileData.get('image')
    if (!image) return { error: 'Image is required' }
    const fileName = uuid() + '.jpg'
    const blob = await put(fileName, image, {
      access: 'public',
    })
    const validateFields = NewPostSchema.safeParse(values)
    if (!validateFields) {
      return { error: 'Invalid fields' }
    }
    const session = await auth()
    const dbUser = await getUserById(session?.user.id)
    if (!dbUser) return { error: 'User not found' }
    await db.post.create({
      data: {
        title: values.title,
        content: values.content,
        authorId: dbUser.id,
        image: blob.url,
      },
    })

    revalidateTag('posts')
    return { succes: 'Post sent' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong on server' }
  }
}
