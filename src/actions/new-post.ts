'use server'
import { getUserById } from '@/data/user'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NewPostSchema } from '@/schemas'
import * as z from 'zod'
import { postRevalidate } from './post-revalidation'
import { put } from '@vercel/blob'
import { v4 as uuid } from 'uuid'

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
    postRevalidate()
    return { succes: 'Post sent' }
  } catch (error) {
    console.log(error)
    return { error: 'Something went wrong on server' }
  }
}
